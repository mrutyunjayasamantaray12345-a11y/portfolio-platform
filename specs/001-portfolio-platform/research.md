# Research & Technology Validation

**Feature**: Personal Portfolio Platform
**Date**: 2026-04-19
**Status**: Completed

## Overview

This document consolidates research findings for key technical decisions in the Personal Portfolio Platform implementation. All technology choices are pre-determined by the PRD and constitution; this research validates implementation approaches and identifies best practices.

---

## 1. Supabase Edge Functions Best Practices

### Decision: Use Edge Functions with service_role for admin mutations

**Rationale**:
- Edge Functions provide serverless execution at the edge (low latency)
- service_role key bypasses RLS policies for admin operations
- Deno runtime provides TypeScript support and modern APIs
- Built-in integration with Supabase Auth for authentication

**Implementation Pattern**:
```typescript
// Edge Function structure
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // 1. Verify admin authentication
  const authHeader = req.headers.get('Authorization')
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader! } } }
  )
  
  const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
  if (authError || !user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }
  
  // 2. Use service_role client for mutations
  const adminClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  
  // 3. Perform mutation
  const { data, error } = await adminClient.from('articles').insert(...)
  
  return new Response(JSON.stringify({ data, error }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

**Best Practices**:
- Always verify authentication before using service_role
- Use anon key for auth verification, service_role for mutations
- Implement request validation with Zod schemas
- Return consistent error responses
- Log all admin actions to audit_logs table

### Decision: Rate limiting with Upstash Redis

**Rationale**:
- Edge Functions are stateless; in-memory counters reset per invocation
- Upstash Redis provides serverless Redis with REST API
- Low latency (< 10ms) for rate limit checks
- Automatic expiration for time-based windows

**Implementation Pattern**:
```typescript
import { Redis } from 'https://esm.sh/@upstash/redis@1.20.1'

const redis = new Redis({
  url: Deno.env.get('UPSTASH_REDIS_REST_URL')!,
  token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!,
})

async function checkRateLimit(ip: string, action: string): Promise<boolean> {
  const keyMinute = `ratelimit:${action}:${ip}:minute`
  const keyHour = `ratelimit:${action}:${ip}:hour`
  const keyDay = `ratelimit:${action}:${ip}:day`
  
  const [minute, hour, day] = await Promise.all([
    redis.incr(keyMinute),
    redis.incr(keyHour),
    redis.incr(keyDay),
  ])
  
  // Set expiration on first increment
  if (minute === 1) await redis.expire(keyMinute, 60)
  if (hour === 1) await redis.expire(keyHour, 3600)
  if (day === 1) await redis.expire(keyDay, 86400)
  
  // Check limits: 5/min, 20/hour, 100/day
  return minute <= 5 && hour <= 20 && day <= 100
}
```

### Decision: Image upload and optimization pipeline

**Rationale**:
- 5MB max file size prevents abuse while allowing high-quality images
- Automatic WebP/AVIF conversion reduces bandwidth and improves performance
- Responsive sizes (multiple resolutions) optimize for different devices
- Supabase Storage handles file persistence and CDN delivery

**Implementation Pattern**:
```typescript
import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts'

async function optimizeImage(file: File): Promise<{ webp: Uint8Array, avif: Uint8Array, sizes: number[] }> {
  const buffer = await file.arrayBuffer()
  const image = await Image.decode(new Uint8Array(buffer))
  
  // Generate responsive sizes: 320w, 640w, 1024w, 1920w
  const sizes = [320, 640, 1024, 1920]
  const optimized = await Promise.all(
    sizes.map(async (width) => {
      const resized = image.resize(width, Image.RESIZE_AUTO)
      return {
        webp: await resized.encodeWebP(85),
        avif: await resized.encodeAVIF({ quality: 85 }),
      }
    })
  )
  
  return optimized
}
```

### Decision: Email sending via SMTP in Edge Functions

**Rationale**:
- Supabase Edge Functions support SMTP via Deno's native fetch
- No additional service costs (use existing SMTP provider)
- Transactional emails for notifications and newsletter
- Manual newsletter sending from admin dashboard

**Implementation Pattern**:
```typescript
async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Smtp2go-Api-Key': Deno.env.get('SMTP_API_KEY')!,
    },
    body: JSON.stringify({
      to: [to],
      sender: Deno.env.get('SMTP_FROM_EMAIL')!,
      subject,
      html_body: html,
    }),
  })
  
  return response.json()
}
```

**Alternatives Considered**:
- SendGrid: Additional monthly cost, overkill for simple transactional emails
- Mailgun: Similar to SendGrid, unnecessary complexity
- Supabase Auth email templates: Limited to auth-related emails only

---

## 2. Google Integrations

### Decision: Google Indexing API authentication and submission

**Rationale**:
- Indexing API notifies Google of new/updated/deleted URLs immediately
- Faster indexing than waiting for sitemap crawl (hours vs days)
- Requires service account authentication with JSON key
- 200 requests/day quota (sufficient for personal portfolio)

**Implementation Pattern**:
```typescript
import { JWT } from 'https://esm.sh/google-auth-library@8.7.0'

const jwtClient = new JWT({
  email: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL')!,
  key: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_KEY')!,
  scopes: ['https://www.googleapis.com/auth/indexing'],
})

async function submitToIndexingAPI(url: string, type: 'URL_UPDATED' | 'URL_DELETED') {
  await jwtClient.authorize()
  
  const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtClient.credentials.access_token}`,
    },
    body: JSON.stringify({ url, type }),
  })
  
  return response.json()
}
```

**Best Practices**:
- Queue failed submissions for retry with exponential backoff
- Log all submissions to track indexing status
- Handle rate limit errors (429) gracefully
- Store submission history in gsc_data_cache table

### Decision: GA4 Data API integration

**Rationale**:
- GA4 Data API provides programmatic access to analytics data
- Real-time and historical data available
- Custom dimensions and metrics supported
- OAuth2 authentication required

**Implementation Pattern**:
```typescript
import { BetaAnalyticsDataClient } from 'https://esm.sh/@google-analytics/data@3.2.0'

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL')!,
    private_key: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_KEY')!,
  },
})

async function fetchGA4Data(propertyId: string, dateRange: string) {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: dateRange, endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
  })
  
  return response.rows
}
```

**Data to Cache**:
- Overview: page views, unique visitors, sessions, bounce rate
- Top pages: most viewed pages with metrics
- Traffic sources: referrers, search engines, social media
- Real-time: active users, current page views
- Cache duration: 90 days in ga4_data_cache table

### Decision: GSC Data API integration

**Rationale**:
- GSC Data API provides search performance data
- Keyword rankings, impressions, clicks, CTR, average position
- Core Web Vitals metrics for performance monitoring
- OAuth2 authentication required

**Implementation Pattern**:
```typescript
import { google } from 'https://esm.sh/googleapis@118.0.0'

const auth = new google.auth.JWT({
  email: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL')!,
  key: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_KEY')!,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
})

const searchconsole = google.searchconsole({ version: 'v1', auth })

async function fetchGSCData(siteUrl: string, dateRange: string) {
  const response = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: dateRange,
      endDate: 'today',
      dimensions: ['query', 'page'],
      rowLimit: 1000,
    },
  })
  
  return response.data.rows
}
```

**Data to Cache**:
- Search queries: keywords, impressions, clicks, CTR, position
- Top pages: pages with most impressions/clicks
- Indexing status: indexed pages, coverage issues
- Core Web Vitals: LCP, FID, CLS metrics by page
- Cache duration: 90 days in gsc_data_cache table

### Decision: AdSense Auto-ads vs Manual placement

**Rationale**:
- Manual ad placement provides precise control over ad positions
- Auto-ads can place ads in unexpected locations
- Hybrid approach: manual placements for key positions, auto-ads as fallback
- DB-driven ad slots allow toggling without code changes

**Implementation Pattern**:
```typescript
// Manual ad placement component
function AdUnit({ slotId, format, placement }: AdUnitProps) {
  const { isEnabled } = useFeatureFlag('adsense')
  const { hasConsent } = useCookieConsent()
  
  if (!isEnabled || !hasConsent) return null
  
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
```

**Ad Placements**:
- In-article-1: After first paragraph
- In-article-2: After third paragraph
- Below-article: After article content
- Sidebar: Desktop only
- Mobile-sticky: Mobile only, bottom of screen
- Auto-ads: Enabled as fallback for unmanaged positions

---

## 3. Performance Optimization

### Decision: Code splitting strategies for React Router v6

**Rationale**:
- Route-based code splitting reduces initial bundle size
- Lazy loading defers non-critical code until needed
- React.lazy + Suspense provide built-in support
- Vite automatically generates optimized chunks

**Implementation Pattern**:
```typescript
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/HomePage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const AdminDashboard = lazy(() => import('./features/admin/dashboard/DashboardPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/blog',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <BlogPage />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <AdminDashboard />
      </Suspense>
    ),
  },
])
```

**Chunk Strategy**:
- Public pages: Separate chunks per route
- Admin pages: Separate chunk for entire admin section
- Shared components: Extracted to vendor chunk
- Analytics/AdSense: Loaded only after cookie consent

### Decision: Image optimization pipeline

**Rationale**:
- WebP/AVIF provide 30-50% smaller file sizes than JPEG/PNG
- Responsive images serve appropriate sizes for device
- Lazy loading defers offscreen images
- CDN delivery reduces latency

**Implementation Pattern**:
```typescript
function OptimizedImage({ src, alt, sizes }: ImageProps) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`
          ${src}-320w.avif 320w,
          ${src}-640w.avif 640w,
          ${src}-1024w.avif 1024w,
          ${src}-1920w.avif 1920w
        `}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`
          ${src}-320w.webp 320w,
          ${src}-640w.webp 640w,
          ${src}-1024w.webp 1024w,
          ${src}-1920w.webp 1920w
        `}
        sizes={sizes}
      />
      <img
        src={`${src}-1024w.jpg`}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}
```

### Decision: Bundle size optimization for Vite

**Rationale**:
- Vite provides automatic code splitting and tree shaking
- Manual chunk splitting for large dependencies
- Dynamic imports for non-critical features
- Bundle analysis identifies optimization opportunities

**Vite Configuration**:
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'editor': ['@tiptap/react', '@tiptap/starter-kit'],
          'analytics': ['@google-analytics/data'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
})
```

**Bundle Size Targets**:
- Initial bundle: < 200KB (gzipped)
- Route chunks: < 50KB each (gzipped)
- Vendor chunks: < 150KB total (gzipped)
- Total bundle: < 500KB (gzipped)

### Decision: Lighthouse CI integration

**Rationale**:
- Automated performance testing in CI/CD pipeline
- Fails builds if performance budgets exceeded
- Tracks performance metrics over time
- Identifies performance regressions early

**GitHub Actions Configuration**:
```yaml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      http://localhost:3000
      http://localhost:3000/blog
      http://localhost:3000/portfolio
    budgetPath: ./lighthouse-budget.json
    uploadArtifacts: true
```

**Performance Budgets**:
```json
{
  "performance": 95,
  "accessibility": 100,
  "best-practices": 95,
  "seo": 100,
  "first-contentful-paint": 1500,
  "largest-contentful-paint": 2500,
  "cumulative-layout-shift": 0.1,
  "total-blocking-time": 200
}
```

---

## 4. Mobile App Development

### Decision: Capacitor plugin integration patterns

**Rationale**:
- Capacitor provides native bridge for web-to-native communication
- Official plugins for common features (push, share, haptics)
- Platform-specific code isolated in native projects
- Web code remains platform-agnostic

**Implementation Pattern**:
```typescript
import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'
import { Share } from '@capacitor/share'
import { Haptics, ImpactStyle } from '@capacitor/haptics'

// Check if running in native app
const isNative = Capacitor.isNativePlatform()

// Push notifications
async function registerPushNotifications() {
  if (!isNative) return
  
  const permission = await PushNotifications.requestPermissions()
  if (permission.receive === 'granted') {
    await PushNotifications.register()
  }
  
  PushNotifications.addListener('registration', (token) => {
    console.log('Push token:', token.value)
    // Send token to backend
  })
  
  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('Push received:', notification)
  })
}

// Native share
async function shareContent(title: string, url: string) {
  if (!isNative) {
    // Fallback to Web Share API
    await navigator.share({ title, url })
    return
  }
  
  await Share.share({ title, url })
}

// Haptic feedback
async function triggerHaptic() {
  if (!isNative) return
  await Haptics.impact({ style: ImpactStyle.Medium })
}
```

### Decision: Push notifications setup (Firebase Cloud Messaging)

**Rationale**:
- FCM provides unified push notifications for iOS and Android
- Free tier sufficient for personal portfolio (unlimited messages)
- Capacitor Push Notifications plugin integrates with FCM
- Server-side sending via Firebase Admin SDK

**Setup Steps**:
1. Create Firebase project
2. Add iOS and Android apps to Firebase
3. Download google-services.json (Android) and GoogleService-Info.plist (iOS)
4. Configure Capacitor Push Notifications plugin
5. Implement server-side sending in Edge Function

**Edge Function for Sending Push**:
```typescript
import { initializeApp, cert } from 'https://esm.sh/firebase-admin@11.5.0/app'
import { getMessaging } from 'https://esm.sh/firebase-admin@11.5.0/messaging'

const app = initializeApp({
  credential: cert(JSON.parse(Deno.env.get('FIREBASE_SERVICE_ACCOUNT')!)),
})

async function sendPushNotification(token: string, title: string, body: string) {
  const message = {
    notification: { title, body },
    token,
  }
  
  const response = await getMessaging(app).send(message)
  return response
}
```

### Decision: App store submission requirements

**iOS App Store**:
- Apple Developer account ($99/year)
- App Store Connect setup
- Privacy policy URL required
- App icons (1024x1024 and various sizes)
- Screenshots (various device sizes)
- App description and keywords
- Review process (1-3 days)

**Google Play Store**:
- Google Play Console account ($25 one-time)
- Play Console setup
- Privacy policy URL required
- App icons (512x512 and various sizes)
- Screenshots (various device sizes)
- App description and keywords
- Review process (1-3 days)

**Common Requirements**:
- Content rating questionnaire
- Target audience declaration
- Data safety/privacy declarations
- Contact information
- Support URL

### Decision: Native share sheet implementation

**Rationale**:
- Native share sheet provides familiar UX
- Integrates with device's installed apps
- Fallback to Web Share API on web
- Simple implementation via Capacitor Share plugin

**Implementation Pattern**:
```typescript
import { Share } from '@capacitor/share'
import { Capacitor } from '@capacitor/core'

async function shareArticle(article: Article) {
  const shareData = {
    title: article.title,
    text: article.excerpt,
    url: `${window.location.origin}/blog/${article.slug}`,
  }
  
  if (Capacitor.isNativePlatform()) {
    await Share.share(shareData)
  } else if (navigator.share) {
    await navigator.share(shareData)
  } else {
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(shareData.url)
    alert('Link copied to clipboard!')
  }
}
```

---

## 5. Security & Compliance

### Decision: Supabase RLS policy patterns

**Rationale**:
- RLS policies enforce security at database level
- Public reads for published content
- Admin-only writes via service_role
- Prevents unauthorized data access even if client compromised

**Policy Patterns**:
```sql
-- Public read for published articles
CREATE POLICY "public_read_articles"
ON articles FOR SELECT
USING (status = 'published');

-- Admin-only insert (via service_role, no policy needed)
-- Edge Functions use service_role key to bypass RLS

-- Public insert for contact submissions
CREATE POLICY "public_insert_contact"
ON contact_submissions FOR INSERT
WITH CHECK (true);

-- Admin read for all content
CREATE POLICY "admin_read_all"
ON articles FOR SELECT
USING (auth.uid() IN (SELECT id FROM admin_profile));
```

**Best Practices**:
- Always use RLS policies for public-facing tables
- Service_role bypasses RLS for admin operations
- Test policies with different user contexts
- Log policy violations for security monitoring

### Decision: Honeypot field implementation

**Rationale**:
- Honeypot fields catch bots before rate limiting
- Hidden from humans via CSS
- Bots fill all fields, triggering silent rejection
- Zero user friction, no CAPTCHA needed

**Implementation Pattern**:
```typescript
// Form component
function ContactForm() {
  const [honeypot, setHoneypot] = useState('')
  
  async function handleSubmit(data: ContactFormData) {
    // Silent rejection if honeypot filled
    if (honeypot) {
      console.log('Bot detected via honeypot')
      return { success: true } // Fake success to avoid bot detection
    }
    
    // Proceed with normal submission
    await submitContactForm(data)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Visible fields */}
      <input name="name" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      
      {/* Honeypot field (hidden via CSS) */}
      <input
        name="website"
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: 'absolute', left: '-9999px' }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      <button type="submit">Send</button>
    </form>
  )
}
```

### Decision: GDPR/CCPA compliance checklist

**Requirements**:
- Cookie consent banner before loading ads/analytics
- Privacy policy explaining data collection
- Cookie policy listing all cookies used
- User rights: access, deletion, opt-out
- Data retention policies documented
- Contact information for privacy inquiries

**Implementation**:
- react-cookie-consent library for banner
- Store consent in localStorage
- Gate GA4/AdSense scripts on consent
- Provide opt-out mechanism in privacy policy
- Document data handling in legal pages

### Decision: Content Security Policy (CSP) configuration

**Rationale**:
- CSP prevents XSS attacks by restricting resource sources
- AdSense requires specific CSP directives
- GA4 requires script-src and connect-src allowances
- Strict CSP improves security posture

**CSP Configuration**:
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https: blob:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://*.supabase.co https://www.google-analytics.com",
        "frame-src https://googleads.g.doubleclick.net",
      ].join('; '),
    },
  },
})
```

---

## Summary

All technical decisions validated and implementation patterns documented. Key findings:

1. **Supabase Edge Functions**: Use service_role for admin mutations, Upstash Redis for rate limiting, native image optimization, SMTP for emails
2. **Google Integrations**: Service account auth for Indexing API, Data APIs for GA4/GSC, hybrid manual/auto-ads approach
3. **Performance**: Route-based code splitting, WebP/AVIF images, bundle size optimization, Lighthouse CI
4. **Mobile**: Capacitor plugins for native features, FCM for push notifications, native share sheet
5. **Security**: RLS policies for public-first architecture, honeypot fields for spam prevention, GDPR compliance, strict CSP

No blockers identified. Ready to proceed to Phase 1 (Design & Contracts).
