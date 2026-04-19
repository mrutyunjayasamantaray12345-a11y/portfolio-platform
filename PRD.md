# 📋 PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Personal Portfolio · Resume · Blog · App Hub · AdSense Monetization Platform

---

> **Version:** 2.0.0
> **Date:** April 16, 2026
> **Stack:** React + Vite + Capacitor + Supabase
> **Purpose:** Full-stack, AdSense-ready, extensible personal brand platform with admin superpowers
> **Model:** Public = View Only (no login) · Admin = Full Control (you only)
> **Status:** Ready for Development

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Core Architecture Philosophy](#2-core-architecture-philosophy)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Tech Stack & Architecture](#4-tech-stack--architecture)
5. [Database Schema (Supabase)](#5-database-schema-supabase)
6. [Authentication — Admin Only](#6-authentication--admin-only)
7. [AdSense Compliance — Required Pages & Rules](#7-adsense-compliance--required-pages--rules)
8. [Public-Facing Website Screens](#8-public-facing-website-screens)
9. [Blog / Article System](#9-blog--article-system)
10. [Portfolio System](#10-portfolio-system)
11. [Resume System](#11-resume-system)
12. [Apps Hub / Micro-Apps Launcher](#12-apps-hub--micro-apps-launcher)
13. [Google AdSense Integration](#13-google-adsense-integration)
14. [Google Analytics 4 Integration](#14-google-analytics-4-integration)
15. [Google Search Console Integration](#15-google-search-console-integration)
16. [Admin Dashboard — Full Feature Set](#16-admin-dashboard--full-feature-set)
17. [Admin: Content Management](#17-admin-content-management)
18. [Admin: Analytics & Monetization](#18-admin-analytics--monetization)
19. [Admin: SEO & Marketing Tools](#19-admin-seo--marketing-tools)
20. [Admin: Media & Asset Manager](#20-admin-media--asset-manager)
21. [Admin: Audience Management](#21-admin-audience-management)
22. [Admin: Site Settings & Customization](#22-admin-site-settings--customization)
23. [Admin: Integrations Hub](#23-admin-integrations-hub)
24. [Feature Flags System](#24-feature-flags-system)
25. [Capacitor / Mobile App Features](#25-capacitor--mobile-app-features)
26. [Performance, Security & Compliance](#26-performance-security--compliance)
27. [UI/UX Design System](#27-uiux-design-system)
28. [Component Library](#28-component-library)
29. [API & Integration Layer](#29-api--integration-layer)
30. [Deployment & DevOps](#30-deployment--devops)
31. [Feature Roadmap & Versioning](#31-feature-roadmap--versioning)
32. [Appendix A: Folder Structure](#appendix-a-folder-structure-full)
33. [Appendix B: Key Dependencies](#appendix-b-key-dependencies)
34. [Appendix C: Quick Start Commands](#appendix-c-quick-start-commands)
35. [Appendix D: Environment Variables](#appendix-d-environment-variables)
36. [Appendix E: AdSense Approval Checklist](#appendix-e-adsense-approval-checklist)

---

## 1. EXECUTIVE SUMMARY

This platform is a **unified personal brand machine** — combining a professional portfolio, interactive resume, monetized blog, and an extensible app launcher — all under your total control.

### What It Is

```
Portfolio + Resume + Blog + App Hub + AdSense Platform + CMS + Analytics Command Center
```

### Core Model

```
Public Visitors  →  View content, read blog, use apps, contact you
                    NO login required. Zero friction.

You (Admin)      →  Control everything from /admin
                    Full CMS. Full analytics. Full monetization control.
```

### What This Earns You

- **Passive income** via Google AdSense with full slot control from admin
- **Professional credibility** via a world-class portfolio and resume
- **Audience growth** via SEO-optimized blog with GA4 + GSC baked in
- **Discovery** from Google via structured sitemap and Indexing API
- **Total control** — edit, publish, analyze, monetize from one dashboard
- **Mobile reach** via Capacitor (iOS + Android)
- **AdSense approval** — all required pages, policies, and compliance built in from day one

---

## 2. CORE ARCHITECTURE PHILOSOPHY

### The Two-Layer Model

```
┌─────────────────────────────────────────┐
│           PUBLIC LAYER                  │
│  No login · Fast · SEO-optimized        │
│  Anyone visits, reads, and leaves       │
│  All AdSense-required pages present     │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│           ADMIN LAYER (/admin)          │
│  Only you · Full CMS · Supabase Auth    │
│  Edit everything · Analyze · Monetize   │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│           BACKEND (Supabase)            │
│  PostgreSQL · Storage · Edge Functions  │
│  RLS: public reads · admin writes       │
└─────────────────────────────────────────┘
```

### What Was Removed and Why

| Removed | Reason |
|---------|--------|
| Public user registration | Visitors don't need accounts — zero benefit, added complexity |
| Viewer role | Unnecessary; public users just read |
| Visitor user profiles | Not needed; increases attack surface |
| Complex session mgmt for public | Replaced with zero-friction anonymous access |
| Multi-user permissions | It's your site — only you need admin |

### What Was Added

| Added | Reason |
|-------|--------|
| All AdSense-required legal pages | Privacy, Disclaimer, DMCA, Cookie Policy, About, Contact built in |
| Cookie Consent Banner (GDPR) | AdSense requirement; ads only load after consent |
| Google Analytics 4 built in | Real-time and historical traffic, custom event tracking |
| Google Search Console built in | Keyword rankings, indexing, Core Web Vitals |
| Integrations Hub in Admin | One-stop panel for all external service connections |
| Feature Flags System | Toggle entire sections on/off without code changes |
| AdSense Compliance Checker | Automated pre-application checklist in admin |

---

## 3. GOALS & SUCCESS METRICS

### Business Goals

| Goal | Metric | Target |
|------|--------|--------|
| AdSense Approval | Time after launch | < 30 days |
| AdSense Revenue | Monthly RPM | $5–$50+ as traffic scales |
| Audience Growth | Monthly unique visitors | 10K in 6 months |
| Portfolio Inquiries | Contact form submissions | 5+ / month |
| SEO Ranking | GSC average position | Top 20 for 10+ keywords |
| Mobile Reach | App installs | 500+ in 3 months |
| Engagement | Avg. session duration | > 2 minutes |
| Content Velocity | Articles published | 4+ per month |
| Search Indexing | Pages indexed by Google | 95%+ of published content |

### Technical Goals

- Lighthouse Performance Score: 95+
- Core Web Vitals: All Green (verified via GSC dashboard)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s
- 99.9% Uptime via Supabase + CDN
- WCAG 2.1 AA Accessibility Compliance
- GA4 tracking: < 200ms script load impact
- Sitemap auto-submitted to GSC on every new publish
- All AdSense compliance checks passing in admin compliance panel

---

## 4. TECH STACK & ARCHITECTURE

### Frontend

```
React 18+             → UI Framework (Hooks, Context, Suspense)
Vite 5+               → Build tool (HMR, code-splitting, tree-shaking)
React Router v6+      → Client-side routing
TanStack Query        → Server state management + caching
Zustand               → Global UI state management
Framer Motion         → Animations + transitions
Tailwind CSS          → Utility-first styling
Shadcn/UI             → Component primitives
React Hook Form       → Form management
Zod                   → Schema validation
React Helmet Async    → SEO meta tags
react-cookie-consent  → GDPR-compliant cookie consent banner
```

### Backend / BaaS

```
Supabase              → PostgreSQL DB, Auth, Realtime, Storage, Edge Functions
Supabase Auth         → Admin-only: Email + Google + GitHub OAuth + Magic Link
Supabase Storage      → Images, files, media assets
Supabase Realtime     → Live comment feeds, admin notification feeds
Supabase Edge Fns     → Serverless logic (email, GSC API, Indexing API, analytics)
```

### Analytics & Search

```
Google Analytics 4    → Visitor tracking, events, conversions, funnels
Google Search Console → Keyword rankings, indexing, Core Web Vitals, coverage
gtag.js               → Unified GA4 tag (loaded only after cookie consent)
GSC Data API          → Pulls queries/pages/vitals data into admin dashboard
Google Indexing API   → Notifies Google of new/updated/deleted URLs on every publish
```

### Monetization

```
Google AdSense        → Display advertising
AdSense Auto-ads      → Fallback for unmanaged placements
All slots DB-driven   → Admin toggles slots on/off without code changes
```

### Mobile

```
Capacitor 6+          → Web → Native bridge
@capacitor/app        → App lifecycle
@capacitor/push-notifications → Push notifications
@capacitor/share      → Native share sheet
@capacitor/haptics    → Haptic feedback
@capacitor/status-bar → Status bar control
@capacitor/splash-screen → Splash screen
```

### Dev Tools

```
TypeScript 5+         → Type safety throughout
ESLint + Prettier     → Code quality
Vitest                → Unit testing
Playwright            → E2E testing
GitHub Actions        → CI/CD pipeline
```

### Architecture Pattern

```
src/
├── app/              → App entry, router, providers
├── features/
│   ├── blog/
│   ├── portfolio/
│   ├── resume/
│   ├── apps-hub/
│   ├── legal/        ← Privacy, Terms, Cookie Policy, Disclaimer, DMCA
│   ├── admin/
│   │   ├── analytics/        ← GA4 dashboard
│   │   ├── search-console/   ← GSC dashboard
│   │   ├── integrations/     ← All service connections
│   │   ├── monetization/     ← AdSense + compliance checker
│   │   ├── legal-pages/      ← Edit all legal pages
│   │   └── feature-flags/
│   └── auth/
├── shared/
│   ├── components/
│   │   ├── ads/              ← AdUnit, AdSenseConsentGuard
│   │   ├── cookie-consent/   ← GDPR banner
│   │   └── analytics/        ← GA4Provider, GSCWidget
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── ga4.ts            ← GA4 helpers + event tracking
│   │   ├── gsc.ts            ← GSC API helpers
│   │   └── indexing-api.ts   ← Google Indexing API helpers
│   └── types/
├── pages/
└── styles/
```

---

## 5. DATABASE SCHEMA (SUPABASE)

### Core Tables

#### `admin_profile` (single row — you only)

```sql
id              UUID PRIMARY KEY (references auth.users)
full_name       TEXT
bio             TEXT
tagline         TEXT
avatar_url      TEXT
cover_url       TEXT
email           TEXT
phone           TEXT
location        TEXT
website_url     TEXT
github_url      TEXT
linkedin_url    TEXT
twitter_url     TEXT
youtube_url     TEXT
instagram_url   TEXT
availability    ENUM('open','freelance','unavailable') DEFAULT 'open'
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

#### `articles`

```sql
id              UUID PRIMARY KEY
title           TEXT NOT NULL
slug            TEXT UNIQUE NOT NULL
excerpt         TEXT
content         TEXT
cover_image     TEXT
category_id     UUID (ref: categories)
status          ENUM('draft','published','scheduled','archived')
featured        BOOLEAN DEFAULT false
allow_comments  BOOLEAN DEFAULT true
views_count     INTEGER DEFAULT 0
likes_count     INTEGER DEFAULT 0
read_time_mins  INTEGER
seo_title       TEXT
seo_description TEXT
seo_keywords    TEXT[]
og_image        TEXT
canonical_url   TEXT
schema_markup   JSONB
gsc_indexed     BOOLEAN DEFAULT false
gsc_last_pinged TIMESTAMPTZ
published_at    TIMESTAMPTZ
scheduled_at    TIMESTAMPTZ
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

#### `categories`

```sql
id              UUID PRIMARY KEY
name            TEXT UNIQUE
slug            TEXT UNIQUE
description     TEXT
icon            TEXT
color           TEXT
parent_id       UUID (self-referential)
sort_order      INTEGER
is_active       BOOLEAN DEFAULT true
```

#### `tags`

```sql
id              UUID PRIMARY KEY
name            TEXT UNIQUE
slug            TEXT UNIQUE
color           TEXT
```

#### `article_tags` (junction)

```sql
article_id      UUID
tag_id          UUID
PRIMARY KEY (article_id, tag_id)
```

#### `portfolio_projects`

```sql
id              UUID PRIMARY KEY
title           TEXT NOT NULL
slug            TEXT UNIQUE
short_desc      TEXT
full_desc       TEXT
cover_image     TEXT
images          TEXT[]
demo_url        TEXT
repo_url        TEXT
case_study_url  TEXT
tech_stack      TEXT[]
category        TEXT
project_type    ENUM('web','mobile','design','oss','client','personal')
status          ENUM('live','wip','archived','concept')
featured        BOOLEAN DEFAULT false
pinned          BOOLEAN DEFAULT false
client_name     TEXT
client_url      TEXT
start_date      DATE
end_date        DATE
sort_order      INTEGER
metrics         JSONB
testimonial     TEXT
testimonial_by  TEXT
views_count     INTEGER DEFAULT 0
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

#### `resume_sections`

```sql
id              UUID PRIMARY KEY
section_type    ENUM('experience','education','skills','certifications',
                     'awards','languages','publications','volunteering',
                     'courses','interests','references')
title           TEXT
sort_order      INTEGER
is_visible      BOOLEAN DEFAULT true
```

#### `resume_entries`

```sql
id              UUID PRIMARY KEY
section_id      UUID (ref: resume_sections)
title           TEXT
organization    TEXT
organization_url TEXT
location        TEXT
start_date      DATE
end_date        DATE
is_current      BOOLEAN DEFAULT false
description     TEXT
achievements    TEXT[]
tech_used       TEXT[]
grade           TEXT
credential_url  TEXT
level           INTEGER
category        TEXT
icon_url        TEXT
sort_order      INTEGER
is_featured     BOOLEAN DEFAULT false
```

#### `apps_hub`

```sql
id              UUID PRIMARY KEY
name            TEXT NOT NULL
slug            TEXT UNIQUE
description     TEXT
long_desc       TEXT
icon_url        TEXT
cover_image     TEXT
app_url         TEXT
repo_url        TEXT
tech_stack      TEXT[]
category        TEXT
status          ENUM('live','beta','wip','archived')
is_internal     BOOLEAN
featured        BOOLEAN DEFAULT false
sort_order      INTEGER
launch_date     DATE
platform        TEXT[]
screenshots     TEXT[]
changelog       JSONB
```

#### `comments` (guest-only, no user accounts required)

```sql
id              UUID PRIMARY KEY
content_type    ENUM('article','portfolio','app')
content_id      UUID
guest_name      TEXT NOT NULL
guest_email     TEXT
body            TEXT NOT NULL
parent_id       UUID (self-referential for replies)
status          ENUM('pending','approved','spam','deleted') DEFAULT 'pending'
ip_address      TEXT
user_agent      TEXT
likes_count     INTEGER DEFAULT 0
created_at      TIMESTAMPTZ
```

#### `contact_submissions`

```sql
id              UUID PRIMARY KEY
name            TEXT
email           TEXT
subject         TEXT
message         TEXT
budget          TEXT
project_type    TEXT
status          ENUM('new','read','replied','archived') DEFAULT 'new'
ip_address      TEXT
source_page     TEXT
utm_source      TEXT
utm_medium      TEXT
utm_campaign    TEXT
replied_at      TIMESTAMPTZ
created_at      TIMESTAMPTZ
```

#### `newsletter_subscribers`

```sql
id              UUID PRIMARY KEY
email           TEXT UNIQUE
name            TEXT
status          ENUM('active','unsubscribed','bounced') DEFAULT 'active'
source          TEXT
tags            TEXT[]
subscribed_at   TIMESTAMPTZ
unsubscribed_at TIMESTAMPTZ
```

#### `site_settings`

```sql
key             TEXT PRIMARY KEY
value           JSONB
category        TEXT    -- 'general','seo','adsense','ga4','gsc','legal','social'
updated_at      TIMESTAMPTZ
```

#### `integrations_config`

```sql
id              UUID PRIMARY KEY
service         TEXT UNIQUE   -- 'ga4','gsc','adsense','sendgrid','recaptcha', etc.
is_connected    BOOLEAN DEFAULT false
config          JSONB         -- service-specific config
status          TEXT          -- 'active','error','pending','not_configured'
last_verified   TIMESTAMPTZ
last_error      TEXT
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

#### `page_views`

```sql
id              UUID PRIMARY KEY
page_path       TEXT
page_title      TEXT
referrer        TEXT
user_agent      TEXT
ip_hash         TEXT
country         TEXT
device_type     TEXT
session_id      TEXT
duration_secs   INTEGER
created_at      TIMESTAMPTZ
```

#### `ad_placements`

```sql
id              UUID PRIMARY KEY
name            TEXT
slot_id         TEXT
placement       TEXT   -- 'in-article-1','in-article-2','below-article','sidebar','header','mobile-sticky'
ad_format       TEXT
is_active       BOOLEAN DEFAULT true
page_targets    TEXT[]
content_targets TEXT[]
ab_variant      TEXT
impressions     INTEGER DEFAULT 0
revenue_cents   INTEGER DEFAULT 0
```

#### `media_assets`

```sql
id              UUID PRIMARY KEY
filename        TEXT
original_name   TEXT
file_type       TEXT
mime_type       TEXT
size_bytes      INTEGER
url             TEXT
thumbnail_url   TEXT
width           INTEGER
height          INTEGER
alt_text        TEXT
caption         TEXT
tags            TEXT[]
folder          TEXT
used_in         JSONB
created_at      TIMESTAMPTZ
```

#### `notifications`

```sql
id              UUID PRIMARY KEY
type            TEXT   -- 'new_comment','new_contact','new_subscriber','gsc_error','indexing_fail'
title           TEXT
body            TEXT
action_url      TEXT
is_read         BOOLEAN DEFAULT false
created_at      TIMESTAMPTZ
```

#### `redirects`

```sql
id              UUID PRIMARY KEY
from_path       TEXT UNIQUE
to_path         TEXT
status_code     INTEGER DEFAULT 301
is_active       BOOLEAN DEFAULT true
hit_count       INTEGER DEFAULT 0
```

#### `audit_logs`

```sql
id              UUID PRIMARY KEY
action          TEXT
resource_type   TEXT
resource_id     UUID
old_value       JSONB
new_value       JSONB
ip_address      TEXT
created_at      TIMESTAMPTZ
```

#### `feature_flags`

```sql
key             TEXT PRIMARY KEY   -- 'blog','portfolio','apps_hub','newsletter','comments','adsense'
is_enabled      BOOLEAN DEFAULT true
label           TEXT
description     TEXT
updated_at      TIMESTAMPTZ
```

#### `legal_pages`

```sql
id              UUID PRIMARY KEY
page_type       TEXT UNIQUE   -- 'privacy','terms','cookie_policy','disclaimer','dmca'
title           TEXT
content         TEXT          -- rich text, admin-editable
last_updated    DATE
is_published    BOOLEAN DEFAULT true
updated_at      TIMESTAMPTZ
```

#### `gsc_data_cache`

```sql
id              UUID PRIMARY KEY
data_type       TEXT   -- 'queries','pages','indexing','vitals','coverage'
date_range      TEXT   -- '7d','28d','90d'
payload         JSONB
fetched_at      TIMESTAMPTZ
```

#### `ga4_data_cache`

```sql
id              UUID PRIMARY KEY
report_type     TEXT   -- 'overview','realtime','pages','audience','events'
date_range      TEXT
payload         JSONB
fetched_at      TIMESTAMPTZ
```

### Row Level Security (RLS) Policies

```sql
-- Public can read published content
CREATE POLICY "public_read_articles"      ON articles          FOR SELECT USING (status = 'published');
CREATE POLICY "public_read_portfolio"     ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "public_read_apps"          ON apps_hub          FOR SELECT USING (true);
CREATE POLICY "public_read_profile"       ON admin_profile     FOR SELECT USING (true);
CREATE POLICY "public_read_legal"         ON legal_pages       FOR SELECT USING (is_published = true);

-- Public can insert (limited actions)
CREATE POLICY "public_insert_contact"     ON contact_submissions    FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_newsletter"  ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_comments"    ON comments               FOR INSERT WITH CHECK (status = 'pending');
CREATE POLICY "public_insert_pageviews"   ON page_views             FOR INSERT WITH CHECK (true);

-- All mutation operations use service_role via Edge Functions (admin only)
```

---

## 6. AUTHENTICATION — ADMIN ONLY

> Public visitors never see a login screen. Authentication exists solely to protect your admin dashboard.

### Auth Methods (Admin Only)

- **Email + Password** — primary login method
- **Magic Link** — passwordless email fallback
- **Google OAuth** — one-click admin sign-in
- **GitHub OAuth** — optional, developer convenience
- **2FA (TOTP)** — strongly recommended (Google Authenticator / Authy)

### Access Model

| Who | Access Level | Auth Required |
|-----|-------------|---------------|
| You (Admin) | Full control — every page, every action | Yes — `/admin` routes only |
| Anyone (Public) | Read-only — all published content | Never |

### Admin Route Protection

```typescript
// Applied to every /admin/* route before render
const { data: { user } } = await supabase.auth.getUser()
if (!user || user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
  return redirect('/404')  // Do NOT redirect to /login — reveals nothing
}
```

### Session Management

- JWT-based sessions via Supabase Auth
- Refresh token rotation
- Persistent sessions with secure cookie storage
- Auto-logout after configurable inactivity period (default: 4 hours)
- Active session list in Admin → Security (view and revoke any device)
- 2FA prompt enforced on every fresh login
- IP allowlist for extra lockdown (optional)

### No Public User Accounts

- No `/register` or `/login` page for public visitors
- No "sign in to comment" requirement — comments are always guest-submitted
- No user dashboards
- Reading lists use localStorage only
- Newsletter signup requires only an email address

---

## 7. ADSENSE COMPLIANCE — REQUIRED PAGES & RULES

> This section defines every page, banner, label, and behavioral rule that Google AdSense
> requires for approval AND ongoing compliance. All are built into the platform from day one.

### 7.1 Required Pages for AdSense Approval

Google AdSense requires the following pages to exist with clear navigation links before applying:

| Page | Route | Why Required | Ads Allowed |
|------|-------|--------------|-------------|
| Privacy Policy | `/privacy` | Must disclose third-party cookies (DoubleClick) | No |
| About | `/about` | Identifies who owns and operates the site | No (best practice) |
| Contact | `/contact` | Google must be able to reach you | No (near form) |
| Terms of Service | `/terms` | Defines usage rules for the site | No |
| Cookie Policy | `/cookie-policy` | Explains cookies, required for GDPR countries | No |
| Disclaimer | `/disclaimer` | Limits liability on opinions and information | No |
| DMCA Policy | `/dmca` | Handles copyright takedown requests | No |
| 404 Page | `/404` | Site must have no broken navigation | No |
| HTML Sitemap | `/sitemap` | Shows site depth and structure to reviewers | No |

All legal pages are **admin-editable** from Admin → Legal Pages. Pre-written templates are provided. The `last_updated` date is automatically displayed. Privacy Policy and Terms of Service cannot be unpublished (blocked in code — AdSense requirement).

---

### 7.2 Privacy Policy Page — `/privacy`

**Must Include (AdSense Policy Requirements):**

- Statement that third-party vendors including Google use cookies to serve ads
- Explanation that Google uses the DoubleClick cookie to serve ads based on prior visits
- Link to Google's Privacy Policy: `https://policies.google.com/privacy`
- Link to opt-out page: `https://www.google.com/settings/ads`
- What personal data is collected via forms, cookies, and analytics
- How data is used, stored, and protected
- Data retention policy
- Rights of EU/EEA visitors (GDPR): access, deletion, portability
- Rights of California residents (CCPA) if applicable
- Children's privacy (COPPA) statement
- Contact email for privacy requests
- Last updated date (auto from DB)

**Page Sections:**

```
1. Information We Collect
2. How We Use Your Information
3. Cookies & Tracking Technologies
   └── Third-Party Advertising (Google AdSense / DoubleClick)
   └── Analytics (Google Analytics 4)
4. Third-Party Links
5. Data Retention
6. Your Rights (GDPR / CCPA)
7. Children's Privacy (COPPA)
8. Changes to This Policy
9. Contact Us
```

**Technical Requirements:**

- Anchor-linked table of contents
- External links to Google policies open in new tab
- "Last Updated" date displayed prominently
- Print-friendly CSS
- **No ads on this page** (AdSense policy requirement)

---

### 7.3 About Page — `/about`

**Must Include (AdSense Requirements):**

- Your real name or professional identity
- What the site is about and its purpose
- Who the intended audience is
- Confirmation content is original and created by you
- Professional photo (strongly recommended for approval)

**Page Content:**

- Full-screen hero with large photo and name
- Site purpose statement
- Target audience declaration
- Full bio (multi-paragraph, rich text from admin profile)
- Professional journey timeline (interactive, scrollable)
- Values section (3–6 illustrated cards)
- "Currently working on" live status widget
- Availability badge (Open to Work / Freelance / Not Available)
- Skills breakdown by category
- Education highlights
- Animated stats counters
- Download resume PDF button
- GitHub contributions graph embed
- **No ads on this page** (best practice for approval credibility)

---

### 7.4 Contact Page — `/contact`

**Must Include (AdSense Requirements):**

- Working contact form that sends messages to you
- Alternatively: a clearly visible email address
- Response time expectation

**Page Content:**

- Contact form: Name, Email, Subject, Project Type, Budget, Message, Attachment, reCAPTCHA v3
- Form submits to `contact_submissions` table + admin email notification
- Alternative contact: Email (copy + mailto), LinkedIn, Calendar booking (Calendly)
- Response time: "Usually replies within 24 hours"
- FAQ accordion
- Social links
- GA4 event tracked on every submission (`contact_form_submit`)
- **No ads immediately adjacent to the form** (AdSense policy requirement)

---

### 7.5 Terms of Service Page — `/terms`

**Must Include:**

- What users are and are not allowed to do on the site
- Intellectual property and copyright ownership statement
- User-generated content rules (comments policy)
- Disclaimer of warranties
- Limitation of liability
- Advertising disclosure (Google AdSense mentioned explicitly)
- Governing law and jurisdiction
- How terms may change and user notification process
- Last updated date

**Page Sections:**

```
1. Acceptance of Terms
2. Use of the Site
3. Intellectual Property
4. User-Generated Content (comments)
5. Disclaimer of Warranties
6. Limitation of Liability
7. Third-Party Links
8. Advertising (Google AdSense disclosure)
9. Changes to Terms
10. Governing Law
11. Contact
```

- Admin-editable via Admin → Legal Pages
- **No ads on this page**

---

### 7.6 Cookie Policy Page — `/cookie-policy`

**Must Include (GDPR Requirement):**

- What cookies are and why the site uses them
- Complete list of every cookie type used
- How to opt out of each category
- Links to browser cookie management guides
- Link to Google's opt-out tool
- Last updated date

**Cookie Table (required):**

| Cookie Name | Type | Purpose | Duration | Provider |
|-------------|------|---------|----------|----------|
| `sb-auth-token` | Necessary | Admin authentication | Session | Supabase |
| `cookieConsent` | Necessary | Stores consent preferences | 1 year | This site |
| `_ga`, `_ga_*` | Analytics | Google Analytics 4 visitor tracking | 2 years | Google |
| `IDE`, `DSID` | Advertising | Google AdSense / DoubleClick ad targeting | 1 year | Google |
| `theme` | Functional | Remembers light/dark mode preference | 1 year | This site |
| `readingList` | Functional | Saved articles for offline reading | 1 year | This site |

- Includes "Update your preferences" button that reopens the consent modal
- Admin-editable
- **No ads on this page**

---

### 7.7 Disclaimer Page — `/disclaimer`

**Must Include:**

- Content is for informational purposes only
- No professional advice (legal, financial, medical) disclaimer
- Advertising and monetization disclosure (AdSense explicitly mentioned)
- Affiliate links disclosure if applicable
- Accuracy disclaimer (information may become outdated)
- External links disclaimer

**Page Sections:**

```
1. General Information Only
2. No Professional Advice
3. Advertising & Monetization Disclosure
4. External Links
5. Accuracy of Information
6. Contact
```

- Admin-editable
- **No ads on this page**

---

### 7.8 DMCA Policy Page — `/dmca`

**Must Include:**

- Statement that you respect intellectual property rights
- Process for submitting a DMCA takedown notice
- Required information for a valid takedown notice
- Your designated DMCA agent contact email
- Counter-notice procedure
- Repeat infringer policy

**Page Sections:**

```
1. Intellectual Property Notice
2. How to Submit a Takedown Request
3. Required Information for Valid Notice
4. Where to Send Notices
5. Counter-Notice Procedure
6. Repeat Infringers
```

- Admin-editable
- **No ads on this page**

---

### 7.9 Cookie Consent Banner (GDPR) — Component

**Component:** `<CookieConsentBanner />`

Appears on first visit for all users. Position: sticky bottom bar (desktop) / full-bottom sheet (mobile).

**Buttons:**
- **Accept All** — enables all cookie categories
- **Reject Non-Essential** — keeps only Necessary
- **Customize** — opens category modal

**Category Modal:**

| Category | Default | Toggleable | Blocks If Off |
|----------|---------|-----------|--------------|
| Necessary | On | No (always on) | Nothing (required) |
| Analytics | On | Yes | GA4 script |
| Advertising | Off | Yes | AdSense script |
| Functional | On | Yes | Theme/reading list persistence |

**Consent Storage:**
```typescript
// localStorage key: 'cookieConsent'
{
  analytics: boolean,
  advertising: boolean,
  functional: boolean,
  timestamp: ISO string
}
```

**Script Loading Behavior:**
```typescript
if (cookieConsent.advertising) loadAdSenseScript(publisherId)
if (cookieConsent.analytics) loadGA4Script(measurementId)
```

**Additional Requirements:**
- "Update preferences" link visible in footer at all times
- Privacy Policy and Cookie Policy links visible inside banner
- Consent must be renewed after 12 months
- Banner re-appears if consent record older than 12 months

---

### 7.10 AdSense Ad Policy Rules (Enforced in Code)

| Rule | Enforcement Method |
|------|--------------------|
| Max 3 content ad units per page | Page-level counter in `<AdUnit />`; renders null after 3 |
| No ads on admin routes | `useLocation()` check in `<AdUnit />` |
| No ads adjacent to navigation | CSS `min-distance` from nav elements enforced via design system |
| Ads must be clearly labeled | Every slot renders "Advertisement" label above it |
| No ads on legal pages | Route exclusion list in `<AdUnit />` props |
| No ads on Contact page | Route exclusion for `/contact` |
| Ads only after advertising consent | `<AdSenseConsentGuard />` wraps every `<AdUnit />` |
| Global ad disable | Admin → Monetization → Global Ad Toggle (one click) |
| No fake close buttons | Enforced via design system; flagged in compliance checker |
| AdSense script async + defer | Enforced in `loadAdSenseScript()` helper |
| No ads on 404 page | Route exclusion |
| No ads on newsletter confirm page | Route exclusion |

---

### 7.11 "Advertisement" Label Component

Every ad slot renders with a visible label per Google's policies:

```tsx
<div className="ad-slot-wrapper">
  <span className="ad-label">Advertisement</span>
  <AdSenseConsentGuard>
    <AdUnit slot="..." format="auto" responsive />
  </AdSenseConsentGuard>
</div>
```

Styling: `font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; text-align: center; margin-bottom: 4px;`

---

### 7.12 AdSense Compliance Checker — Admin Tool

Admin → Monetization → Compliance Checker

Automated checklist run before AdSense application:

**Required Pages**
```
✅ / ❌  Privacy Policy exists and is published
✅ / ❌  Privacy Policy mentions Google AdSense and DoubleClick cookies
✅ / ❌  About page exists and is published
✅ / ❌  Contact page exists with a working form
✅ / ❌  Terms of Service exists and is published
✅ / ❌  Cookie Policy exists and is published
✅ / ❌  Disclaimer exists and is published
✅ / ❌  DMCA Policy exists and is published
✅ / ❌  404 page is functional
✅ / ❌  HTML Sitemap page exists
```

**Content Quality**
```
✅ / ❌  10+ published articles exist
✅ / ❌  All published articles have 300+ words
⚠️       Articles with < 300 words listed by title
✅ / ❌  No articles flagged with prohibited content categories
✅ / ❌  All images have alt text
```

**Technical**
```
✅ / ❌  Cookie consent banner is active
✅ / ❌  AdSense only loads after advertising consent
✅ / ❌  "Advertisement" label present above all ad slots
✅ / ❌  No more than 3 ad units on any single page (automated page scan)
✅ / ❌  No ads on legal pages (automated route check)
✅ / ❌  No ads on /admin routes
✅ / ❌  Footer contains Privacy Policy, Terms, Cookie Policy links
✅ / ❌  Site has HTTPS
✅ / ❌  robots.txt allows Googlebot
✅ / ❌  Sitemap exists and is valid XML
✅ / ❌  Sitemap submitted to Google Search Console
✅ / ❌  Site is publicly accessible (not behind maintenance mode)
✅ / ❌  GA4 connected and tracking data
✅ / ❌  GSC connected and site verified
```

Each check shows Pass / Fail / Warning with a "Fix" button that deep-links to the relevant admin section.

---

### 7.13 Footer Legal Links (Required — Cannot Be Removed)

The site footer always contains these links, visible on every public page:

```
Privacy Policy  |  Terms of Service  |  Cookie Policy  |  Disclaimer  |  DMCA
```

These links are hardcoded in `<Footer />` and are NOT toggleable via feature flags. Removing them would violate AdSense policies.

---

### 7.14 Content Requirements for AdSense Approval

| Requirement | Platform Support |
|------------|-----------------|
| 10–15+ original articles | Admin compliance checker warns if below threshold |
| 300+ words per article | Word count warning in editor; shown in compliance checker |
| Original content (not scraped) | Admin responsibility; compliance checker cannot verify |
| No prohibited content categories | Admin receives warning if category matches prohibited list |
| Images with alt text | Alt text required before saving; blocked in compliance checker |
| No broken pages | 404 monitor in admin; broken link checker Edge Function |
| Site publicly accessible | Maintenance mode check in compliance checker |
| Site live and indexed | GSC integration shows indexing status in compliance checker |

---

## 8. PUBLIC-FACING WEBSITE SCREENS

### 8.1 Home Page `/`

**Hero Section**
- Full-screen animated hero with name, title, tagline
- Animated typing effect cycling roles (Developer / Designer / Creator)
- CTA buttons: "View My Work" → Portfolio, "Read Articles" → Blog
- Floating gradient mesh or particle background
- Scroll indicator animation
- Social quick links (GitHub, LinkedIn, Twitter, YouTube)

**About Snapshot**
- Photo with decorative frame
- 3–4 sentence bio (from `admin_profile` table)
- Key stats: Years experience, Projects built, Articles written, GitHub stars
- "Full Resume" CTA
- Availability badge (Open to Work / Freelance / Not Available)

**Featured Projects (3–4 cards)**
- From `portfolio_projects WHERE featured = true`
- Cover image, title, tech stack chips, demo/repo links
- Hover reveals quick-view overlay
- "All Projects →" link

**Latest Articles (3–6 cards)**
- Grid of latest published articles
- Card: cover, category badge, title, excerpt, read time, date, views
- "All Articles →" link

**Apps Showcase**
- Horizontal scrolling app cards
- App icon, name, one-liner, status badge

**Skills Strip**
- Animated scrolling marquee of tech logos

**Testimonials**
- Carousel of client/colleague testimonials

**Newsletter CTA**
- Email signup with privacy note

**Contact CTA Banner**
- "Let's Work Together" section

**Footer**
- Logo + tagline, navigation links, social icons, copyright
- Legal links (required, always visible): Privacy Policy | Terms | Cookie Policy | Disclaimer | DMCA

---

### 8.2 About Page `/about`

*(See Section 7.3 — no ads displayed here)*

- Full-screen hero with large photo
- Full bio (multi-paragraph)
- Interactive professional journey timeline
- Values section (3–6 illustrated cards)
- Fun facts / interests
- "Currently working on" live widget
- Availability badge
- Skills breakdown by category
- Education highlights
- Animated stats counters
- Download resume PDF button
- GitHub contributions graph

---

### 8.3 Portfolio Page `/portfolio`

**Header**
- Page title, total project count
- Filter: All / Web / Mobile / Design / OSS / Client / Personal
- Sort: Newest / Oldest / Most Viewed / Featured
- Search bar

**Project Grid**
- Responsive masonry or uniform grid
- Hover with quick-view modal
- Pagination or infinite scroll
- AdSense unit: between rows (desktop only, after row 3, labeled "Advertisement")

**Single Project `/portfolio/[slug]`**
- Full-width cover image/video
- Title, category, status badge
- Description + expandable case study
- Image gallery (lightbox)
- Tech stack icon grid
- Role + responsibilities
- Timeline (start → end)
- Key metrics (animated counters)
- Challenges → Solutions section
- Client testimonial (if applicable)
- Live demo + GitHub repo buttons
- Related projects
- Share buttons (Twitter, LinkedIn, copy link)
- Comment section (guest-only, moderated)
- AdSense unit: below content (1 unit, labeled "Advertisement")

---

### 8.4 Blog Page `/blog`

**Header**
- Full-text search (Supabase FTS)
- Category tabs / pill filters
- Tag cloud
- Featured article hero card

**Article Grid**
- Mixed layout: large featured + small cards
- Pagination (10/page) + Load More
- AdSense leaderboard: after article row 2 (labeled "Advertisement")

**Sidebar (desktop)**
- Author card
- Popular articles
- Category list with article counts
- Newsletter signup
- AdSense sidebar unit (300×600, labeled "Advertisement")

---

### 8.5 Single Article `/blog/[slug]`

- Reading progress bar (sticky top)
- Full-width cover image
- Article header: category, title, author, date, read time, views, share
- Article body begins
- **AdSense In-Article #1** — after first ~200 words (labeled "Advertisement")
- Rich MDX content: H1–H6 with auto-IDs, code blocks + copy, callout boxes, tables, embeds
- **AdSense In-Article #2** — midway through (articles > 1500 words only, labeled "Advertisement")
- Table of Contents (sticky sidebar on desktop / drawer on mobile)
- Related articles section
- Author bio card
- **AdSense Below-Article** — below article content (labeled "Advertisement")
- Comment section (guest-only, moderated by admin)
- Reaction bar (👍 ❤️ 🔥 👏 🔖)
- Share bar (Twitter, LinkedIn, WhatsApp, copy link, email)
- Next / Previous article navigation

> AdSense Rule Enforced: Maximum 3 AdSense for Content units per article page.
> In-Article #1 + In-Article #2 + Below-Article = 3 max.

---

### 8.6 Resume Page `/resume`

- Full resume rendered from database
- Download as PDF button
- Print-optimized CSS
- Section tabs or anchor navigation
- Experience timeline (visual + list toggle)
- Education cards
- Skills with proficiency visualization
- Certifications with verification links
- Awards, Publications, Languages sections
- References on request
- AdSense unit: sidebar (desktop only, 1 unit)

---

### 8.7 Apps Hub `/apps`

- Intro + featured app spotlight
- App grid with filters (category, platform, status)
- App cards: icon, name, description, tech, launch button
- AdSense unit: between app rows (1 unit, labeled "Advertisement")

**Single App `/apps/[slug]`**
- App icon + name + tagline
- Screenshots carousel
- Description + features list
- Tech stack + platform badges
- Launch / Install button
- Changelog / version history
- Related apps
- AdSense unit: below app info (1 unit, labeled "Advertisement")

---

### 8.8 Contact Page `/contact`

*(See Section 7.4 — no ads adjacent to form)*

- Contact form: Name, Email, Subject, Project Type, Budget, Message, Attachment, reCAPTCHA v3
- Form → `contact_submissions` + email notification
- Alternative contact: Email, LinkedIn, Calendar booking
- Response time expectation
- FAQ accordion
- Social links

---

### 8.9 Privacy Policy `/privacy`

*(See Section 7.2 for full content requirements)*

- Anchor-linked table of contents
- All required AdSense disclosures including DoubleClick
- Links to Google's privacy settings and opt-out tools
- Admin-editable content from Admin → Legal Pages
- Auto-shown last updated date
- **No ads on this page**
- Print-friendly layout

---

### 8.10 Terms of Service `/terms`

*(See Section 7.5 for full content requirements)*

- Anchor-linked sections
- Advertising disclosure explicitly mentions AdSense
- Admin-editable
- **No ads on this page**

---

### 8.11 Cookie Policy `/cookie-policy`

*(See Section 7.6 for full content requirements)*

- Full cookie table: Name, Type, Purpose, Duration, Provider
- Per-category opt-out instructions
- "Update cookie preferences" button (reopens consent modal)
- Links to Google opt-out tools
- Admin-editable
- **No ads on this page**

---

### 8.12 Disclaimer `/disclaimer`

*(See Section 7.7 for full content requirements)*

- Explicit AdSense / advertising monetization disclosure
- Admin-editable
- **No ads on this page**

---

### 8.13 DMCA Policy `/dmca`

*(See Section 7.8 for full content requirements)*

- Complete DMCA takedown procedure
- Admin-editable
- **No ads on this page**

---

### 8.14 HTML Sitemap `/sitemap`

- Human-readable sitemap listing all public pages
- Grouped by section: Blog Articles | Portfolio Projects | Apps | Pages
- Auto-generated from DB on each render
- Article count, project count, app count per section
- Useful for Googlebot during AdSense site review (demonstrates depth)
- **No ads on this page**

---

### 8.15 Search Page `/search`

- Global search bar (autofocus on route enter)
- Real-time results via Supabase FTS
- Results grouped: Articles | Projects | Apps | Pages
- Recent searches (localStorage)
- Popular searches chips
- No-results state with suggestions
- Search term logged to analytics
- AdSense unit: sidebar (1 unit, desktop only)

---

### 8.16 Category Page `/blog/category/[slug]`

- Category banner with icon, name, description
- Filtered article grid with article count
- Pagination
- AdSense unit: between rows (1 unit, labeled)

---

### 8.17 Tag Page `/blog/tag/[slug]`

- Tag name + article count
- Filtered article grid
- Pagination
- AdSense unit: between rows (1 unit, labeled)

---

### 8.18 Newsletter Confirmation `/newsletter/confirm`

- Double opt-in confirmation landing page
- Success state + "What to expect" copy
- CTA to read latest articles
- **No ads on this page**

---

### 8.19 404 Page

- Custom animated 404 illustration
- Search bar
- Navigation links back to: Home, Blog, Portfolio, Contact
- "Report a broken link" button (pre-fills contact form)
- **No ads on this page**

---

### 8.20 Article Series Page `/blog/series/[slug]`

- Series title, description, article count
- Ordered article list with read/unread indicators
- Progress indicator ("You've read 3 of 7")
- AdSense unit: sidebar (1 unit)

---

## 9. BLOG / ARTICLE SYSTEM

### Content Features

- **Rich Text Editor**: TipTap with full toolbar
- **MDX Support**: Embed React components inside articles
- **Auto-save**: Draft saved every 30 seconds
- **Version History**: Last 20 revisions kept
- **Scheduled Publishing**: Set future publish date/time
- **Article Series**: Link articles into ordered series
- **Content Blocks**: Modular block-based editing
- **Word Count Warning**: Alert if article < 300 words (AdSense requirement enforcement)

### SEO Per Article

- Auto-generated slug from title
- SEO title (60-char counter)
- Meta description (160-char counter)
- Focus keyword + density badge (green / yellow / red)
- Open Graph image uploader
- Schema.org Article markup auto-generated
- Canonical URL field
- noindex / nofollow toggles
- Sitemap priority setting
- **"Request Indexing" button** — pings Google Indexing API immediately on publish

### Reading Experience

- Estimated read time (200 WPM)
- Reading progress bar
- Font size adjuster
- Dark/light mode toggle
- Share to any platform
- Save to reading list (localStorage)
- Print-friendly version

---

## 10. PORTFOLIO SYSTEM

### Project Display

- View modes: Grid / List / Masonry / Timeline
- Filter by: Tech Stack, Category, Year, Status
- Sort by: Date, Views, Featured, Custom order (drag-and-drop in admin)
- Quick-view modal without navigating away

### Case Study Features

- Sections: Overview, Problem, Process, Solution, Results
- Before/After comparison slider
- Embedded video (YouTube / Vimeo)
- Code snippets
- Design mockup viewer
- Animated results counters
- Client testimonial block

---

## 11. RESUME SYSTEM

### Data-Driven Resume

- All content managed from Admin → Resume
- Download as PDF
- ATS-optimized PDF export
- Printable at `/resume`

### Visual Modes

- Classic list view
- Visual timeline
- Infographic mode
- Compact one-page mode

### Skill Visualization Options

Admin chooses per preference: Progress bars / Radial charts / Tag clouds / Star ratings / Hex grid

---

## 12. APPS HUB / MICRO-APPS LAUNCHER

### Architecture

- Each app is a route at `/apps/[slug]`
- App types:
  - **Internal iframe** — loads `app_url` in sandboxed iframe
  - **Internal route** — lives in `src/features/apps-hub/apps/[name]/`
  - **External link** — opens in new tab

### Built-in First Apps

1. Color Palette Generator
2. Markdown Editor (live preview)
3. JSON Formatter / Validator
4. Code Snippet Manager
5. Pomodoro Timer
6. Resume Builder (fill-in-the-blank)
7. Link Shortener

---

## 13. GOOGLE ADSENSE INTEGRATION

### Ad Placement Strategy

| Placement | Format | Pages | Max Per Page | Priority |
|-----------|--------|-------|-------------|---------|
| In-Article #1 | responsive | Article pages | 1 | Very High |
| In-Article #2 | responsive | Articles > 1500 words | 1 | High |
| Below Article | responsive | Article bottom | 1 | High |
| Sidebar sticky | 300×600 | Blog, Article (desktop) | 1 | High |
| Between article rows | leaderboard | Blog listing | 1 | Medium |
| Portfolio sidebar | responsive | Portfolio pages | 1 | Medium |
| Sticky bottom mobile | 320×50 | Mobile only | 1 | High |
| Apps Hub between cards | responsive | Apps page | 1 | Medium |

**Pages where ads are NEVER shown:**
- `/privacy`, `/terms`, `/cookie-policy`, `/disclaimer`, `/dmca`
- `/contact`, `/about`, `/newsletter/confirm`, `/404`, `/sitemap`
- All `/admin/*` routes

### `<AdUnit />` Component API

```tsx
interface AdUnitProps {
  slot: string
  format: 'auto' | 'rectangle' | 'leaderboard' | 'skyscraper'
  responsive?: boolean
  placement: 'in-article-1' | 'in-article-2' | 'below-article' |
             'sidebar' | 'between-rows' | 'mobile-sticky'
}
```

- Wrapped in `<AdSenseConsentGuard />` — renders nothing if advertising consent not given
- Auto-applies "Advertisement" label above every slot
- Enforces max 3 units per page
- Auto-excluded on admin and legal routes

### Code Management

- All slots in `ad_placements` DB table
- Admin toggles each on/off instantly without code change
- Global kill switch: Admin → Monetization → Disable All Ads
- Disable ads per page via `page_targets`
- A/B testing: two variants per slot

---

## 14. GOOGLE ANALYTICS 4 INTEGRATION

### Setup Flow (Development to Production)

```
Step 1: Create GA4 Property at analytics.google.com
        → Get Measurement ID (G-XXXXXXXXXX)

Step 2: Admin → Integrations → Google Analytics 4
        → Enter Measurement ID → Click Connect
        → Platform verifies via Measurement Protocol test hit

Step 3: Enable Data API access (for pulling reports into admin)
        → Google Cloud Console → Enable Analytics Data API
        → Create Service Account → Download JSON credentials
        → Admin → Integrations → GA4 → Upload Service Account JSON

Step 4: Click "Verify Connection"
        → Platform makes test Data API call
        → Shows green "Connected" status

Step 5: Cookie consent banner automatically gates gtag.js
        → Script only loads when user accepts analytics cookies
```

### Client-Side Tracking

```typescript
// lib/ga4.ts
export function loadGA4(measurementId: string) {
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) { window.dataLayer.push(args) }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', measurementId, { anonymize_ip: true })
}
```

### Custom Events Tracked

| Event | Trigger | Key Parameters |
|-------|---------|----------------|
| `page_view` | Every route change | `page_path`, `page_title` |
| `article_read` | Article page loaded | `article_id`, `category` |
| `article_read_complete` | Scroll > 90% | `article_id`, `read_time_secs` |
| `project_view` | Portfolio project opened | `project_id`, `project_title` |
| `app_launch` | App opened from hub | `app_id`, `app_name` |
| `contact_form_submit` | Form submitted | `project_type`, `source_page` |
| `newsletter_subscribe` | Email signup | `source_page` |
| `resume_download` | PDF downloaded | — |
| `share_click` | Share button clicked | `platform`, `content_type` |
| `search_query` | Search performed | `search_term`, `results_count` |
| `comment_submit` | Comment posted | `content_type`, `content_id` |
| `reaction_click` | Emoji reaction | `reaction_type`, `content_id` |
| `ad_consent_accept` | All cookies accepted | — |
| `ad_consent_reject` | Non-essential rejected | — |
| `outbound_link` | External link clicked | `url`, `source_page` |

### GA4 Admin Dashboard

**Connection Status Panel**
- Connected / Not Connected / Error status
- Measurement ID display
- Last data sync timestamp
- Re-verify connection button
- Disconnect button

**Overview Cards** (7d / 30d / 90d / custom)
- Total Users, New Users, Sessions, Engaged Session Rate

**Charts**
- Daily users line chart (30 days) with 7-day moving average
- Sessions by day of week (bar)
- Traffic source breakdown (organic / direct / social / referral / email)
- Device breakdown: desktop / tablet / mobile
- Top 10 countries (sortable table + world heatmap)

**Content Analytics**
- Top articles by views with 30d trend sparklines
- Top portfolio projects by views
- Most shared content
- Average scroll depth per article
- Top on-site search terms

**Real-Time Dashboard**
- Active users right now (live via Supabase Realtime + GA4 Realtime API)
- Pages being viewed right now with user counts
- Live events feed: new comment, new contact, new subscriber

**Events Dashboard**
- All custom event counts in table
- Event trends over time (multi-line chart)
- Conversion funnel: Landing → Article Read → Newsletter Signup

---

## 15. GOOGLE SEARCH CONSOLE INTEGRATION

### Setup Flow (Development to Production)

```
Step 1: Add site to Google Search Console
        → search.google.com/search-console → Add property
        → Choose "HTML tag" verification

Step 2: Admin → Integrations → Google Search Console
        → Click "Connect GSC"
        → Platform generates the verification meta tag
        → Tag added to <head> on all public pages via React Helmet

Step 3: Back in GSC → Click "Verify"
        → GSC fetches site and confirms tag

Step 4: Enable Search Console API
        → Google Cloud Console → Enable Search Console API
        → Create Service Account (or reuse the GA4 one)
        → Grant it "Owner" access to your GSC property
        → Download JSON → Upload in Admin → Integrations → GSC

Step 5: Enable Indexing API
        → Google Cloud Console → Enable Web Search Indexing API
        → Same Service Account works
        → Admin → Integrations → GSC → Indexing API → Enable

Step 6: Platform verifies all connections
        → Shows "Connected ✅" for each
```

### GSC Verification Meta Tag

Auto-injected by React Helmet when GSC is connected:

```tsx
<Helmet>
  {gscVerificationCode && (
    <meta name="google-site-verification" content={gscVerificationCode} />
  )}
</Helmet>
```

`gscVerificationCode` pulled from `site_settings WHERE key = 'gsc_verification_code'`.

### Google Indexing API — Auto-Ping on Publish

```typescript
// lib/indexing-api.ts
export async function notifyGoogle(url: string, type: 'URL_UPDATED' | 'URL_DELETED') {
  await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ url, type }),
  })
  // Updates gsc_indexed + gsc_last_pinged on the DB record
}
```

**Auto-ping triggers:**
- Article published → `URL_UPDATED`
- Article significantly edited → `URL_UPDATED`
- Article deleted or set to draft → `URL_DELETED`
- Portfolio project published → `URL_UPDATED`
- App page published → `URL_UPDATED`

### Sitemap Auto-Submit

On every new publish, sitemap is regenerated and submitted:

```typescript
// Auto-submits sitemap to GSC API on each publish
await searchConsole.sitemaps.submit({
  siteUrl: process.env.SITE_URL,
  feedpath: `${process.env.SITE_URL}/sitemap.xml`
})
```

### GSC Admin Dashboard

**Connection Status Panel**
- Connected / Not Connected / Error per API
- Property URL, Service Account email, last sync time
- Re-verify and Disconnect buttons

**Performance Overview** (7d / 28d / 90d / 16 months)
- Total Clicks, Impressions, Average CTR, Average Position
- 28-day trend comparison for each metric

**Top Queries Table**
- Keyword | Clicks | Impressions | CTR | Position
- Sortable and filterable
- "Write article for this keyword" button (opens new article editor with keyword pre-filled)
- Export to CSV

**Top Pages Table**
- Page URL | Clicks | Impressions | CTR | Position
- Click opens page in new tab
- Edit shortcut to admin article/project editor

**Indexing Status Panel**
- Total submitted URLs
- Indexed count and coverage percentage
- Errors list (not indexed, crawled not indexed, excluded)
- Per-URL: Last Crawled, Coverage Status, Fix button
- "Request Re-indexing" per URL
- Bulk "Request Indexing for All Published" button

**Core Web Vitals Panel**
- Mobile and Desktop tabs
- Good / Needs Improvement / Poor for: LCP, INP, CLS
- Affected URLs list per metric
- Fix guidance button

**Sitemaps Panel**
- All submitted sitemaps with status
- Discovered vs indexed URL counts
- Submit Sitemap + Delete Sitemap buttons

**Robots.txt Viewer**
- Current robots.txt content
- Edit button (goes to Admin → SEO → Robots.txt)
- Test URL tool (checks if Googlebot can crawl a path)

**Mobile Usability Panel**
- Usability errors and affected page counts
- Error type breakdown

**Enhancements Panel**
- Rich results status from structured data
- Schema validation errors
- Pages eligible for rich results

---

## 16. ADMIN DASHBOARD — FULL FEATURE SET

### Access

- URL: `/admin`
- Protected by Supabase Auth + admin email check
- Redirects to `/404` if unauthenticated (reveals nothing about admin existence)
- 2FA prompt on every fresh login

### Admin Layout

- Collapsible sidebar navigation (pinnable)
- Top bar: search, notifications bell, quick actions, profile dropdown
- Breadcrumb trail
- Light / Dark / System theme toggle
- Command palette (Cmd+K): search anything, run any action

### Admin Sidebar Navigation

```
📊 Dashboard
  ├── Overview (Quick Stats)
  ├── Analytics (GA4)
  ├── Search Console (GSC)
  └── Revenue Overview

📝 Content
  ├── Articles (All / New / Drafts / Scheduled / Trash)
  ├── Categories
  ├── Tags
  └── Series

🖼️ Portfolio
  ├── All Projects
  ├── New Project
  └── Categories

👤 Resume
  ├── Experience
  ├── Education
  ├── Skills
  ├── Certifications
  ├── Awards
  └── Other Sections

🚀 Apps Hub
  ├── All Apps
  ├── Add App
  └── App Templates

💰 Monetization
  ├── Ad Placements
  ├── Revenue Tracker
  ├── A/B Tests
  ├── Ad Performance
  └── ✅ Compliance Checker

📈 Analytics (GA4)
  ├── Overview
  ├── Real-Time
  ├── Content Analytics
  ├── Audience
  └── Events

🔍 Search Console (GSC)
  ├── Performance
  ├── Indexing Status
  ├── Core Web Vitals
  ├── Sitemaps
  └── Mobile Usability

🔗 Integrations Hub
  ├── Google Analytics 4
  ├── Google Search Console
  ├── Google AdSense
  ├── SendGrid / Resend
  ├── reCAPTCHA
  └── Other Services

⚙️ SEO
  ├── Site SEO Settings
  ├── Sitemap Manager
  ├── Indexing (Manual Ping)
  ├── Redirects
  ├── Robots.txt
  └── Schema Markup

📄 Legal Pages
  ├── Privacy Policy
  ├── Terms of Service
  ├── Cookie Policy
  ├── Disclaimer
  └── DMCA Policy

👥 Audience
  ├── Subscribers
  ├── Comments
  ├── Contacts
  └── Visitors

🗂️ Media
  ├── Media Library
  └── Upload Files

🚩 Feature Flags

⚙️ Settings
  ├── General
  ├── Appearance & Theme
  ├── Navigation
  ├── Social Links
  ├── Email Templates
  ├── Security
  └── Danger Zone

🔐 Account
  ├── Profile
  ├── Sessions
  └── API Keys
```

---

## 17. ADMIN: CONTENT MANAGEMENT

### Articles Manager

- Data table: sortable, filterable, bulk-selectable
- Columns: Title | Category | Status | Word Count | GSC Indexed | Views | Date | Actions
- Inline status toggle (draft ↔ published)
- Bulk actions: Publish / Unpublish / Delete / Trash / Export CSV / Request Indexing
- Filter by: Status, Category, Tag, Date Range
- Word count column with warning highlight on < 300 words

### Article Editor

**Left Panel — Editor**
- TipTap block editor with full toolbar
- H1–H6, lists, task lists, bold/italic/code/link
- Code blocks with language selector and syntax highlight preview
- Image upload (drag + drop → Supabase Storage)
- Table editor, embed blocks (YouTube, Twitter, CodePen, Figma)
- Callout blocks (info, warning, success, error)
- HTML source mode
- Word count, character count, read time (live)
- **Word count warning if < 300 words** (AdSense compliance reminder)
- Revision history panel (last 20 auto-saves)
- Full-screen / distraction-free mode

**Right Panel — Metadata**
- Title (character counter), slug (auto-generated / editable)
- Excerpt (160 char), category selector, tags, cover image
- Status: Draft / Published / Scheduled
- Scheduled date/time picker
- Featured toggle, allow comments toggle, series assignment

**SEO Panel**
- SEO title (60-char), meta description (160-char), focus keyword + density
- OG image (separate from cover), Open Graph + Twitter card preview
- Schema type, canonical URL, noindex/nofollow toggles, sitemap priority
- **"Request Indexing" button** — pings Google Indexing API on publish

### Portfolio Manager

- All Projects table with inline featured/pinned toggles
- Drag-and-drop sort order
- Project Editor: title, slug, descriptions, cover + gallery, URLs, tech stack, type/status, client info, dates, metrics, testimonial

### Resume Manager

All sections have CRUD with drag-and-drop reordering:
- Experience: title, company, location, dates, description, achievements, tech used
- Education: degree, institution, grade, dates, description
- Skills: categories, per-skill proficiency (1–10), bulk import from text
- Certifications: name, issuer, dates, credential ID/URL, badge image
- Other sections: Awards, Languages, Publications, Volunteering, Courses, Interests

**Resume Settings:** template, color theme, font, show/hide sections, section order, PDF preview/download

### Legal Pages Manager — `/admin/legal-pages`

Edit all AdSense-required legal pages from admin:
- List: Privacy Policy | Terms of Service | Cookie Policy | Disclaimer | DMCA
- Each opens TipTap editor with pre-written template (first setup)
- Rich text editing, last updated auto-set on save, published toggle, preview button
- **Privacy Policy and Terms of Service cannot be unpublished** (enforced in code)

---

## 18. ADMIN: ANALYTICS & MONETIZATION

*(See Section 14 for full GA4 dashboard spec and Section 15 for full GSC dashboard spec)*

### AdSense Revenue Tracker

- Manual monthly revenue entry (copied from AdSense dashboard)
- Revenue breakdown by ad slot
- RPM estimator: `(revenue ÷ page_views) × 1000`
- Monthly goal + progress bar
- Revenue calendar heatmap
- Revenue vs traffic correlation chart
- Year-over-year comparison

### AdSense A/B Tester

- Two placement variants, 50/50 traffic split
- Track impressions + estimated revenue per variant
- Declare winner, deactivate loser
- Statistical significance indicator

---

## 19. ADMIN: SEO & MARKETING TOOLS

### Site-Wide SEO Settings

- Site name, tagline, default OG image, default Twitter card type
- Google verification meta tag (auto-set from GSC connection)
- GA4 Measurement ID (auto-set from GA4 connection)
- Default robots: index/follow

### Robots.txt Editor

- Full CodeMirror editor
- Live preview of file content
- Test URL tool: checks if Googlebot can access a given path
- Changes deploy instantly

### Sitemap Manager

- Auto-generated XML sitemap from all published content
- Per-URL priority + change frequency
- "Regenerate Now" + "Submit to Google" buttons
- Split sitemaps for large sites (> 50,000 URLs)
- Sitemap validation tool

### Indexing Manager

- Manual URL ping: enter any URL → ping Indexing API
- Bulk indexing: select articles → request all
- Indexing log: URL | Status | Last Pinged | GSC Status
- "Re-index All Published" button

### Redirects Manager

- Add 301 / 302 redirects
- Bulk import via CSV
- Hit count per redirect
- Auto-detect broken internal links (Edge Function, runs every 24h)

### Schema Markup Manager

- Global schema: WebSite, Person, Organization
- Per-article: Article, BlogPosting, FAQPage, HowTo
- Per-project: SoftwareApplication, CreativeWork
- Structured data validator (Google Rich Results API)

---

## 20. ADMIN: MEDIA & ASSET MANAGER

- Grid / list view
- Upload: drag-and-drop, multi-file, URL import
- Stored in Supabase Storage
- Auto-generate WebP + thumbnails (small / medium / large)
- Alt text required before image can be used in articles (enforced — AdSense compliance)
- Tag and folder organization
- Search by filename, tag, type
- Bulk download + delete
- Usage tracker: shows which pages use each image
- Image editor: crop, resize, rotate
- Storage analytics: total used, by folder, by type, largest files

---

## 21. ADMIN: AUDIENCE MANAGEMENT

### Comments Manager

- Table: content, author name, page, date, status
- Moderation queue for pending comments
- Bulk approve / spam / delete
- Reply from admin, IP ban list, export CSV

### Contact Submissions

- Inbox view with unread badge
- Pipeline: New → Read → Replied → Archived
- Side drawer preview, reply via mailto, export CSV

### Newsletter Subscribers

- Full table: email, name, status, source, date
- Bulk export / unsubscribe / delete, CSV import
- Subscriber growth chart
- Send broadcast (compose + send via Edge Function → SendGrid / Resend)

---

## 22. ADMIN: SITE SETTINGS & CUSTOMIZATION

### General Settings

- Site name, tagline, description, URL, timezone, locale, date format
- Maintenance mode toggle (custom message)
- "Robots: noindex" toggle for staging environments

### Appearance & Theme

- Color scheme editor (primary, accent, bg, text, links)
- Font library (Google Fonts selector)
- Dark/light/system mode default
- Logo uploader (light + dark variants), favicon, default OG image
- Custom CSS editor (CodeMirror) with live preview

### Navigation Manager

- Main nav builder (drag-and-drop), footer nav builder, mobile nav order
- Badge labels on items

### Security Settings

- Change admin password, enable/disable 2FA
- Active sessions list (revoke any), API keys manager
- IP allowlist for admin, login attempt limit
- Audit log viewer (all admin actions with timestamps)

### Danger Zone

- Export all site data (JSON), clear page view stats, clear media cache
- Reset site settings to defaults, purge newsletter subscribers

---

## 23. ADMIN: INTEGRATIONS HUB

`/admin/integrations`

The single place to connect, configure, and monitor all external services.

### Available Integrations

| Service | Purpose | Setup |
|---------|---------|-------|
| Google Analytics 4 | Traffic analytics + events | Measurement ID + Service Account JSON |
| Google Search Console | SEO + indexing data | Domain verification + Service Account JSON |
| Google AdSense | Display ads | Publisher ID |
| Google Indexing API | Auto-ping on publish | Same Service Account as GSC |
| reCAPTCHA v3 | Bot protection | Site Key + Secret Key |
| SendGrid / Resend | Transactional email | API Key |
| Calendly | Booking embed | Embed URL |
| Ko-fi / Buy Me a Coffee | Donation button | Profile URL |
| Slack Webhook | Admin notifications | Webhook URL |
| Zapier / Make | Workflow automation | Webhook URL |

### Integration Status Dashboard

```
Service                  Status          Last Checked
─────────────────────────────────────────────────────
Google Analytics 4       ✅ Connected     2 min ago
Google Search Console    ✅ Connected     5 min ago
Google Indexing API      ✅ Active        On publish
Google AdSense           ✅ Active        —
reCAPTCHA v3             ✅ Active        —
SendGrid                 ✅ Connected     1 hr ago
Calendly                 ✅ Configured    —
Slack Webhook            ⚠️ Not tested    —
```

### GA4 Setup Panel

```
Google Analytics 4 Setup
─────────────────────────
① Measurement ID:      [ G-XXXXXXXXXX              ]

② Service Account JSON (for Data API):
   [ Upload JSON file ]  or  [ Paste JSON ]

③ Settings:
   ☑ Anonymize IP addresses (recommended)
   ☑ Send enhanced measurement events
   ☐ Debug mode (disable in production)

④ Test:  [ ▶ Test Connection ]  →  ✅ Connected — property verified

[ Save ]  [ Disconnect ]
```

### GSC Setup Panel

```
Google Search Console Setup
────────────────────────────
① Verification Meta Tag:
   <meta name="google-site-verification" content="xxxxx" />
   Auto-added to your site.   Status: ✅ Verified

② Service Account JSON (for Search Console + Indexing API):
   [ Upload JSON file ]  or  [ Paste JSON ]

③ Property URL:  [ https://yourdomain.com    ]

④ Indexing API Options:
   ☑ Auto-ping Google on every new publish
   ☑ Auto-ping on significant article edits
   ☑ Auto-ping on page deletions

⑤ Test:  [ ▶ Test Connection ]  →  ✅ Connected — 342 URLs tracked

[ Save ]  [ Disconnect ]
```

### AdSense Setup Panel

```
Google AdSense Setup
─────────────────────
① Publisher ID:  [ ca-pub-XXXXXXXXXXXXXXXX     ]

② Auto Ads:
   ☐ Enable Auto Ads (Google manages placement automatically)

③ Global Control:
   ● Ads Enabled  ○ Ads Disabled (all pages, globally)

④ Consent:
   ✅ Ads load only after advertising cookie consent
   ✅ GDPR consent integration active

⑤ Status:  ✅ Publisher ID recognized

[ Save ]
```

---

## 24. FEATURE FLAGS SYSTEM

`/admin/feature-flags`

| Flag Key | Label | Default | Effect When Disabled |
|----------|-------|---------|---------------------|
| `blog` | Blog / Articles | Enabled | Hides blog from nav, routes return 404 |
| `portfolio` | Portfolio | Enabled | Hides portfolio from nav, routes return 404 |
| `resume` | Resume | Enabled | Hides resume page |
| `apps_hub` | Apps Hub | Enabled | Hides apps section |
| `newsletter` | Newsletter Signup | Enabled | Hides all newsletter signup widgets |
| `comments` | Comment System | Enabled | Hides comment sections site-wide |
| `reactions` | Emoji Reactions | Enabled | Hides reaction bars |
| `adsense` | AdSense Ads | Enabled | Globally disables all ad units |
| `contact_form` | Contact Form | Enabled | Disables form, shows email only |
| `search` | Site Search | Enabled | Hides search UI |
| `analytics_tracking` | GA4 Tracking | Enabled | Stops GA4 event collection |
| `maintenance_mode` | Maintenance Mode | Disabled | Shows maintenance page to public |

---

## 25. CAPACITOR / MOBILE APP FEATURES

### Mobile-Specific

- Native splash screen (brand colors + logo)
- Native status bar theming
- All required icon resolutions
- Bottom navigation bar: Home | Blog | Portfolio | Apps | Profile

### Optimizations

- Swipe gestures for article navigation
- Pull-to-refresh on all lists
- Infinite scroll (no pagination buttons)
- Offline reading: last 10 articles cached via Service Worker
- Native share sheet via `@capacitor/share`
- Haptic feedback on buttons and confirmations

### Push Notifications

- New article published
- Reply to comment (admin)
- New contact form submission (admin)

### PWA Features

- Installable as Progressive Web App
- Service Worker for offline support
- Background sync
- Web Push notifications
- App manifest with all icon sizes

---

## 26. PERFORMANCE, SECURITY & COMPLIANCE

### Performance

- Code splitting by route (React.lazy + Suspense)
- Image lazy loading (IntersectionObserver)
- WebP auto-conversion in Supabase Storage
- CDN delivery via Supabase Storage / Cloudflare
- Critical CSS extraction by Vite
- Font subsetting + `font-display: swap`
- Third-party scripts (AdSense, GA4) lazy-loaded after consent
- Prefetch on hover for internal links
- Virtual scrolling for long lists
- Memoization (useMemo, useCallback, React.memo)

### Security

- Supabase RLS on every table
- CSRF protection on all mutations
- Rate limiting on contact form, search, newsletter (Edge Functions)
- Content Security Policy headers
- HTTPS enforced (HSTS)
- SQL injection impossible via Supabase parameterized queries
- XSS: DOMPurify sanitizes all user-generated content
- File upload validation: type, size, MIME
- Admin route protection on every load
- Full audit logging of all admin actions

### GDPR / Privacy Compliance

- Cookie consent banner with per-category toggles
- AdSense only loads after advertising consent
- GA4 only loads after analytics consent
- Privacy Policy admin-editable with AdSense disclosures
- Cookie Policy admin-editable with full cookie table
- Data deletion request form in Privacy Policy
- Unsubscribe link in every newsletter email
- IP anonymization in GA4

### Accessibility (WCAG 2.1 AA)

- Semantic HTML throughout
- ARIA labels on all interactive elements
- Full keyboard navigation
- Visible focus indicators
- Color contrast: 4.5:1 minimum
- Screen reader tested (NVDA, VoiceOver)
- Skip to content link
- Alt text required on all images (blocked in compliance checker if missing)

---

## 27. UI/UX DESIGN SYSTEM

### Color Palette (Admin-Customizable)

```css
--color-bg:           #0A0A0F;
--color-bg-secondary: #111118;
--color-surface:      #16161F;
--color-border:       #2A2A3A;
--color-primary:      #6C63FF;
--color-primary-dim:  #4A42DD;
--color-accent:       #FF6B6B;
--color-text:         #E8E8F0;
--color-text-muted:   #8888A0;
--color-success:      #4CAF88;
--color-warning:      #FFB347;
--color-error:        #FF5252;
```

### Typography

```
Display:  "Clash Display" or "Cabinet Grotesk"
Body:     "Satoshi" or "DM Sans"
Code:     "JetBrains Mono" (ligatures)
Accent:   "Playfair Display" (editorial quotes)
```

All fonts via `fontsource` npm — no Google Fonts network requests.

### Spacing (8pt grid)

```
xs: 4px   sm: 8px   md: 16px   lg: 24px   xl: 32px   2xl: 48px   3xl: 64px
```

### Breakpoints

```
mobile: < 640px   tablet: 640–1024px   desktop: > 1024px   wide: > 1440px
```

### Animation

- Durations: 150ms (micro), 300ms (standard), 500ms (emphasis)
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Page transitions: fade + slide up
- List items: staggered entrance (50ms delay)
- Hover: `scale(1.02)` + shadow lift
- Skeleton loaders on all async content

---

## 28. COMPONENT LIBRARY

### Layout
`<AppShell>` `<AdminShell>` `<Section>` `<PageHeader>`

### Navigation
`<Navbar>` `<MobileNav>` `<Sidebar>` `<Breadcrumb>` `<CommandPalette>`

### Cards
`<ArticleCard>` `<ProjectCard>` `<AppCard>` `<StatCard>` `<TestimonialCard>`

### Forms
`<Input>` `<Textarea>` `<Select>` `<MultiSelect>` `<DatePicker>` `<FilePicker>` `<RichTextEditor>` `<ColorPicker>` `<TagInput>` `<ToggleSwitch>` `<Slider>`

### Feedback
`<Toast>` `<Modal>` `<ConfirmDialog>` `<Tooltip>` `<Popover>` `<Skeleton>` `<Spinner>` `<EmptyState>` `<ErrorBoundary>`

### Data Display
`<DataTable>` `<Chart>` `<Badge>` `<Progress>` `<Timeline>` `<Gallery>` `<CodeBlock>` `<Avatar>` `<Tag>` `<VideoEmbed>`

### AdSense & Consent
`<AdUnit />` `<AdSenseConsentGuard />` `<CookieConsentBanner />`

### Analytics
`<GA4Provider />` `useGA4Event()` hook `<GSCWidget />`

---

## 29. API & INTEGRATION LAYER

### Supabase Client

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### API Modules

```
src/lib/api/
  articles.ts       → CRUD + search + views + indexing ping on publish
  portfolio.ts      → CRUD for projects
  resume.ts         → CRUD for all resume sections
  apps.ts           → CRUD for apps hub
  comments.ts       → Guest comment submission + moderation
  reactions.ts      → Anonymous reactions by IP
  contact.ts        → Form submission + email notification
  newsletter.ts     → Subscribe / unsubscribe / broadcast
  analytics.ts      → Page view tracking, search logging
  media.ts          → File upload / delete / list
  settings.ts       → Site settings CRUD
  legal-pages.ts    → CRUD for all legal pages
  search.ts         → Full-text search across all content
  ads.ts            → Ad placement management
  ga4.ts            → GA4 Data API calls + report caching
  gsc.ts            → GSC Search Console API + cache
  indexing.ts       → Google Indexing API helpers
  integrations.ts   → Save / load integration configs
  feature-flags.ts  → Read / write feature flag state
```

### Edge Functions

```
functions/
  send-contact-email/       → Email admin on contact form submission
  send-welcome-email/       → Welcome email to new subscribers
  send-broadcast/           → Newsletter broadcast via SendGrid / Resend
  generate-og-image/        → Dynamic OG image generation (Satori)
  generate-pdf-resume/      → PDF resume generation
  notify-admin/             → Slack / push on new contacts, comments, subscribers
  ping-indexing-api/        → Calls Google Indexing API on publish / update / delete
  submit-sitemap/           → Regenerate + submit sitemap to GSC
  fetch-gsc-data/           → Pulls GSC report data, caches in gsc_data_cache
  fetch-ga4-data/           → Pulls GA4 report data, caches in ga4_data_cache
  adsense-compliance-check/ → Runs full compliance checklist, returns results
  check-broken-links/       → Scheduled 24h link checker
```

---

## 30. DEPLOYMENT & DEVOPS

### Environments

| Env | URL | Branch | Purpose |
|-----|-----|--------|---------|
| Development | `localhost:5173` | `develop` | Local dev |
| Staging | `staging.yourdomain.com` | `staging` | QA — noindex active |
| Production | `yourdomain.com` | `main` | Live site |

> Staging always has `<meta name="robots" content="noindex">` and `robots.txt: Disallow: /` to prevent accidental Google indexing before launch.

### CI/CD Pipeline (GitHub Actions)

```yaml
on: [push, pull_request]
jobs:
  lint:        ESLint + TypeScript check
  test:        Vitest unit tests
  e2e:         Playwright tests (staging)
  build:       Vite build + bundle size check
  a11y:        Accessibility audit (axe-core)
  deploy:      Deploy to Vercel / Netlify
  ping-gsc:    Submit sitemap to GSC after production deploy
  notify:      Slack notification on success / failure
```

### Hosting

- **Recommended:** Vercel (zero-config Vite, edge network, preview URLs per PR)
- **Alternative:** Netlify
- **Self-hosted:** Docker + Nginx

### Mobile Build

```
Capacitor sync → iOS build (Xcode) → App Store
               → Android build (Gradle) → Play Store
```

### Monitoring

- Vercel Analytics: Core Web Vitals
- Sentry: error tracking
- UptimeRobot: uptime monitoring (free)
- Supabase dashboard: DB health
- GSC: crawl errors, indexing issues
- GA4: real-time traffic anomalies

---

## 31. FEATURE ROADMAP & VERSIONING

### v1.0 — Foundation (Weeks 1–4)

- [ ] Project scaffolding (Vite + React + Supabase)
- [ ] Supabase schema + RLS setup
- [ ] Admin-only auth (email, Google, GitHub OAuth, 2FA)
- [ ] Home page, About page, Contact page
- [ ] Portfolio CRUD (admin + public)
- [ ] Basic Blog (articles CRUD + article page)
- [ ] Resume page (DB-driven)
- [ ] **All 5 AdSense-required legal pages** (Privacy, Terms, Cookie Policy, Disclaimer, DMCA)
- [ ] **Cookie Consent Banner (GDPR)** — per-category toggles
- [ ] **AdSense integration + all compliance rules enforced**
- [ ] **Footer with all legal links (required)**
- [ ] **HTML Sitemap page `/sitemap`**
- [ ] Admin dashboard skeleton
- [ ] Media upload to Supabase Storage

### v1.1 — Content Power (Weeks 5–6)

- [ ] Full TipTap editor with all blocks
- [ ] SEO metadata per article / project
- [ ] XML Sitemap auto-generation
- [ ] Comment system (guest-only, moderated)
- [ ] Reactions (anonymous by IP)
- [ ] Newsletter subscribe flow
- [ ] Related articles
- [ ] Global full-text search
- [ ] Reading progress bar
- [ ] Table of Contents component
- [ ] **Word count warning in editor (< 300 words)**
- [ ] **Legal Pages Manager in admin** with pre-written templates

### v1.2 — Analytics & Monetization (Weeks 7–8)

- [ ] **GA4 integration** (client tracking + Data API + full admin dashboard)
- [ ] **GSC integration** (verification + API + full admin dashboard)
- [ ] **Google Indexing API** (auto-ping on publish / edit / delete)
- [ ] **Integrations Hub** in admin (all services)
- [ ] Page view tracking (own DB)
- [ ] Ad placements DB-driven
- [ ] AdSense A/B testing
- [ ] Revenue tracker
- [ ] **AdSense Compliance Checker** (automated pre-application checklist)
- [ ] Audit logs

### v1.3 — Apps Hub (Week 9)

- [ ] Apps Hub public page + admin CRUD
- [ ] First 3 built-in mini-apps
- [ ] App iframe sandbox

### v1.4 — Mobile & PWA (Week 10)

- [ ] Capacitor setup (iOS + Android)
- [ ] Push notifications
- [ ] Offline reading cache (Service Worker)
- [ ] Native share
- [ ] PWA manifest + service worker
- [ ] Bottom navigation bar

### v2.0 — Advanced (Month 3+)

- [ ] OG Image auto-generation (Satori)
- [ ] PDF resume auto-generation
- [ ] Newsletter broadcast system
- [ ] Article series
- [ ] Ko-fi / donation integration
- [ ] Calendly deep integration
- [ ] AI writing assistant (Claude API)
- [ ] Auto-social posting on publish
- [ ] Recommendation engine (read history)
- [ ] i18n / multi-language support
- [ ] Advanced A/B testing framework

---

## APPENDIX A: FOLDER STRUCTURE (FULL)

```
my-app/
├── android/
├── ios/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx             ← GA4Provider, QueryClient, Theme
│   ├── features/
│   │   ├── auth/
│   │   │   └── pages/                ← /admin/login (admin only)
│   │   ├── blog/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── pages/
│   │   ├── portfolio/
│   │   ├── resume/
│   │   ├── apps-hub/
│   │   │   ├── apps/                 ← Built-in mini-apps
│   │   │   ├── components/
│   │   │   └── pages/
│   │   ├── contact/
│   │   ├── legal/
│   │   │   ├── components/
│   │   │   └── pages/                ← /privacy /terms /cookie-policy /disclaimer /dmca
│   │   └── admin/
│   │       ├── analytics/            ← GA4 admin dashboard
│   │       ├── search-console/       ← GSC admin dashboard
│   │       ├── integrations/         ← Integrations Hub
│   │       ├── monetization/         ← AdSense + compliance checker
│   │       ├── content/              ← Articles, Portfolio, Resume, Apps editors
│   │       ├── legal-pages/          ← Admin editor for all legal pages
│   │       ├── feature-flags/        ← Feature flag manager
│   │       ├── seo/                  ← Sitemap, redirects, robots, indexing
│   │       ├── media/
│   │       ├── audience/
│   │       ├── settings/
│   │       └── layout/               ← AdminShell, Sidebar, TopBar
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/                   ← Shadcn primitives
│   │   │   ├── layout/               ← AppShell, Footer (with legal links), Navbar
│   │   │   ├── ads/                  ← AdUnit, AdSenseConsentGuard
│   │   │   ├── cookie-consent/       ← GDPR banner + category modal
│   │   │   ├── analytics/            ← GA4Provider, GSCWidget
│   │   │   └── seo/                  ← ReactHelmet wrappers
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── usePageView.ts
│   │   │   ├── useTheme.ts
│   │   │   ├── useGA4Event.ts        ← GA4 custom event hook
│   │   │   ├── useCookieConsent.ts   ← Consent state hook
│   │   │   └── useFeatureFlag.ts     ← Feature flag hook
│   │   ├── lib/
│   │   │   ├── supabase.ts
│   │   │   ├── ga4.ts                ← loadGA4, trackEvent helpers
│   │   │   ├── gsc.ts                ← GSC API helpers
│   │   │   ├── indexing-api.ts       ← Google Indexing API
│   │   │   └── api/                  ← All API modules
│   │   ├── stores/
│   │   │   ├── authStore.ts
│   │   │   ├── themeStore.ts
│   │   │   ├── cookieConsentStore.ts
│   │   │   └── uiStore.ts
│   │   └── types/
│   │       └── database.types.ts     ← Auto-generated by Supabase CLI
│   ├── pages/
│   │   ├── index.tsx                 ← Home
│   │   ├── about.tsx
│   │   ├── blog/
│   │   ├── portfolio/
│   │   ├── resume.tsx
│   │   ├── apps/
│   │   ├── contact.tsx
│   │   ├── search.tsx
│   │   ├── sitemap.tsx               ← HTML sitemap (required for AdSense)
│   │   ├── privacy.tsx
│   │   ├── terms.tsx
│   │   ├── cookie-policy.tsx
│   │   ├── disclaimer.tsx
│   │   ├── dmca.tsx
│   │   ├── newsletter/
│   │   │   └── confirm.tsx
│   │   ├── admin/
│   │   └── 404.tsx
│   └── styles/
│       ├── globals.css
│       └── tailwind.css
├── supabase/
│   ├── migrations/
│   ├── functions/
│   └── seed.sql
├── capacitor.config.ts
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## APPENDIX B: KEY DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.23.0",
    "@supabase/supabase-js": "^2.43.0",
    "@tanstack/react-query": "^5.37.0",
    "zustand": "^4.5.0",
    "framer-motion": "^11.2.0",
    "@tiptap/react": "^2.4.0",
    "@tiptap/starter-kit": "^2.4.0",
    "@tiptap/extension-image": "^2.4.0",
    "@tiptap/extension-code-block-lowlight": "^2.4.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.23.0",
    "recharts": "^2.12.0",
    "react-helmet-async": "^2.0.0",
    "lucide-react": "^0.383.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "date-fns": "^3.6.0",
    "dompurify": "^3.1.0",
    "react-cookie-consent": "^9.0.0",
    "google-auth-library": "^9.0.0",
    "@capacitor/core": "^6.0.0",
    "@capacitor/app": "^6.0.0",
    "@capacitor/push-notifications": "^6.0.0",
    "@capacitor/share": "^6.0.0",
    "@capacitor/haptics": "^6.0.0"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "vitest": "^1.6.0",
    "@playwright/test": "^1.44.0",
    "eslint": "^8.57.0"
  }
}
```

---

## APPENDIX C: QUICK START COMMANDS

```bash
# 1. Clone and install
git clone <your-repo>
cd my-app
npm install

# 2. Environment setup
cp .env.example .env.local
# Fill in all variables (see Appendix D)

# 3. Supabase setup
npx supabase login
npx supabase init
npx supabase db push         # Run migrations (includes legal_pages + feature_flags tables)
npx supabase db seed         # Seeds feature flags defaults + legal page templates

# 4. Generate Supabase types
npx supabase gen types typescript --local > src/shared/types/database.types.ts

# 5. Start dev server
npm run dev

# 6. Connect Google Analytics 4
#    Admin → Integrations → Google Analytics 4
#    → Enter Measurement ID (G-XXXXXXXXXX)
#    → Upload Service Account JSON (from Google Cloud Console)
#    → Click "Test Connection"

# 7. Connect Google Search Console
#    Admin → Integrations → Google Search Console
#    → Copy verification meta tag shown
#    → Add your site to search.google.com/search-console
#    → Verify with HTML tag method
#    → Upload same or separate Service Account JSON
#    → Enable Indexing API in Google Cloud Console
#    → Click "Test Connection"

# 8. Configure AdSense
#    Admin → Integrations → Google AdSense
#    → Enter Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)

# 9. Run AdSense compliance check
#    Admin → Monetization → Compliance Checker → Run All Checks

# 10. Capacitor (mobile)
npx cap add ios
npx cap add android
npx cap sync

# 11. Build + deploy
npm run build
npx vercel deploy --prod
```

---

## APPENDIX D: ENVIRONMENT VARIABLES

```bash
# ── App ────────────────────────────────────────────────────
VITE_APP_URL=https://yourdomain.com
VITE_APP_NAME="Your Name"
VITE_ADMIN_EMAIL=you@yourdomain.com

# ── Supabase ───────────────────────────────────────────────
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxx

# ── Google Analytics 4 ─────────────────────────────────────
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
# Service Account JSON uploaded via Admin UI, not an env var

# ── Google Search Console ──────────────────────────────────
VITE_GSC_VERIFICATION_CODE=xxxxxxxxxxxxxxxxxxxx
# Service Account JSON uploaded via Admin UI, not an env var

# ── Google AdSense ─────────────────────────────────────────
VITE_ADSENSE_PUB_ID=ca-pub-XXXXXXXXXXXXXXXX

# ── reCAPTCHA v3 ───────────────────────────────────────────
VITE_RECAPTCHA_SITE_KEY=6LeXXXXXXXXXXXXXXXXXXXXX

# ── Edge Functions Only (server-side, never exposed to client) ──
SUPABASE_SERVICE_KEY=eyJxxxx
SENDGRID_API_KEY=SG.xxxx
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
GSC_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
GA4_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
RECAPTCHA_SECRET_KEY=6LeXXXXXXXXXXXXXXXXXXXXX
```

---

## APPENDIX E: ADSENSE APPROVAL CHECKLIST

Run this manually before applying, or use Admin → Monetization → Compliance Checker for the automated version.

### Required Pages (All Must Be Published)

- [ ] `/privacy` — published, contains Google/DoubleClick cookie disclosure
- [ ] `/about` — published, clearly identifies you and the site's purpose
- [ ] `/contact` — published, working contact form or visible email
- [ ] `/terms` — published, includes AdSense advertising disclosure
- [ ] `/cookie-policy` — published, includes full cookie table
- [ ] `/disclaimer` — published, includes monetization disclosure
- [ ] `/dmca` — published, includes takedown contact
- [ ] `/404` — functional custom page
- [ ] `/sitemap` — HTML sitemap with all content listed
- [ ] Footer links: Privacy Policy | Terms | Cookie Policy | Disclaimer | DMCA

### Content Quality

- [ ] 10+ original, published articles
- [ ] All articles have 300+ words each
- [ ] Articles have proper titles and meta descriptions
- [ ] No duplicate or scraped content
- [ ] All images have alt text

### Technical Requirements

- [ ] Cookie consent banner is active and working
- [ ] AdSense only loads after advertising cookie consent is given
- [ ] "Advertisement" label visible above all ad slots
- [ ] Maximum 3 AdSense content units per page — enforced
- [ ] No ads on legal pages
- [ ] No ads on contact page
- [ ] No ads on admin routes
- [ ] Site has HTTPS (SSL active)
- [ ] robots.txt allows Googlebot
- [ ] XML sitemap exists at `/sitemap.xml` and is valid
- [ ] Sitemap submitted to Google Search Console
- [ ] Site publicly accessible (not under maintenance mode)
- [ ] No broken navigation links
- [ ] GA4 connected and collecting data (shows legitimate organic traffic)
- [ ] GSC connected and site verified and indexed

---

*PRD End — Version 2.0.0 — April 16, 2026*
*Single source of truth for the project. All features subject to prioritization.*
*Public = view only, no login. Admin = full control. AdSense-compliant from day one.*
#PRD.md Read PRD.md And Build The Complete Production Ready Website And Also Add Dark Mode And Light Mode And Also Add All Animations And Librabries From React Bit And Ant design mcp and use git hub mcp to completely update it and use supabase mcp to completely set up backend and you can createe your own database schemas you dont have to write PRD Database Schema Ok And Also Make Frontend Backend Database Fully Implemented Without Todos Placeholders Dummies Means Implement Each And Every Features Componenents Backend Frontend Database Full Stack Fully Implemented Without Placeholders Database Dummies Now Start Use All MCP To Completely Create The Web App Ana dMake Sure Use Ant Design React Bit Supabase And Git Hub MCP For Assets Libraries Animation And Also Use Stitch MCP To Make Design Of Web App Then Supabase MCP To Completely Make Backend Database And Make Sure Make The Full Web App Fully  3D Animated With 3D Assets And With All Sound EffectsSounds BGM Background Images And Implement Animations In Each And Every Functions Of Web App And Make The Web App Fully Interactive Even Small Small Things Has Some Work In Web App Make Each And Everything Fully Functionable Without Placeholders Dummies And Todos Make Complete 3D Supremely Animated Web App Using Supabase React Bits Ant Design GitHub Stitch.Now Start. #App.css #App.tsx #index.css #main.tsx .you have to make complete web app from scratch. And Web App Name Is Xenz.Maoe A Complete Web App From Scratch If You Want You Can Use Any Coding Language Like Typescript,React,Java,Javascript,Flutter,Html,CSS,etc dont worry you dont have to use only the languages that i mentioned you can add more