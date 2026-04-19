# Feature Specification: Personal Portfolio Platform

**Feature Branch**: `001-portfolio-platform`  
**Created**: 2026-04-19  
**Status**: Draft  
**Input**: User description: "Personal Portfolio Platform - Full-stack React+Vite+Capacitor+Supabase platform with portfolio, resume, blog, apps hub, AdSense monetization, GA4/GSC analytics, admin-only CMS, public-first architecture, mobile apps, SEO optimization, and complete legal compliance"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Public Content Discovery (Priority: P1)

A visitor discovers the portfolio website through Google search, browses published blog articles, views portfolio projects, and reads the resume without needing to create an account or log in. The visitor can contact the site owner through a contact form and subscribe to the newsletter.

**Why this priority**: This is the core value proposition - public content must be accessible without friction to maximize reach, SEO performance, and user engagement. Without this, the platform has no audience.

**Independent Test**: Can be fully tested by visiting the public website as an anonymous user, navigating through blog posts, portfolio projects, and resume sections, and successfully submitting the contact form. Delivers immediate value by showcasing the owner's work and enabling visitor engagement.

**Acceptance Scenarios**:

1. **Given** a visitor arrives at the homepage, **When** they browse blog articles, **Then** they can read full articles without encountering login prompts
2. **Given** a visitor views a portfolio project, **When** they click on project details, **Then** they see complete project information including images, tech stack, and demo links
3. **Given** a visitor wants to contact the owner, **When** they fill out the contact form, **Then** the submission is recorded and the owner receives a notification
4. **Given** a visitor wants updates, **When** they subscribe to the newsletter, **Then** their email is stored and they receive a confirmation
5. **Given** a visitor browses the resume, **When** they view experience and skills sections, **Then** all information is displayed in a professional, readable format

---

### User Story 2 - Admin Content Management (Priority: P1)

The site owner logs into the admin dashboard using secure authentication, creates and publishes blog articles with rich text editing and SEO metadata, manages portfolio projects with images and descriptions, updates resume sections, and moderates comments and contact form submissions.

**Why this priority**: Without admin control, there's no way to manage content. This is equally critical as public access because the owner must be able to create and update content that visitors consume.

**Independent Test**: Can be fully tested by logging into the admin dashboard, creating a new blog article with SEO metadata, publishing it, and verifying it appears on the public site. Delivers immediate value by enabling content creation and management.

**Acceptance Scenarios**:

1. **Given** the owner visits /admin, **When** they enter valid credentials, **Then** they are authenticated and see the admin dashboard
2. **Given** the owner is in the admin dashboard, **When** they create a new blog article with title, content, and SEO metadata, **Then** the article is saved as a draft
3. **Given** the owner has a draft article, **When** they publish it, **Then** the article appears on the public blog immediately
4. **Given** the owner views contact submissions, **When** they mark a submission as read or replied, **Then** the status is updated and tracked
5. **Given** the owner manages portfolio projects, **When** they upload images and add project details, **Then** the project is saved and displayed on the public portfolio page

---

### User Story 3 - AdSense Monetization Setup (Priority: P2)

The site owner configures Google AdSense integration from the admin dashboard, places ad units on specific pages (blog articles, portfolio), enables cookie consent banner for GDPR compliance, and monitors ad performance metrics including impressions and estimated revenue.

**Why this priority**: Monetization is a key business goal but depends on having content and traffic first. This can be implemented after core content management is working.

**Independent Test**: Can be fully tested by connecting AdSense account in admin integrations panel, enabling ad placements on blog articles, verifying cookie consent banner appears for new visitors, and confirming ads display after consent. Delivers value by enabling passive income generation.

**Acceptance Scenarios**:

1. **Given** the owner is in admin integrations, **When** they connect their AdSense account with publisher ID, **Then** the integration is verified and marked as active
2. **Given** AdSense is connected, **When** the owner enables ad placements on blog articles, **Then** ad units appear in designated positions (in-article, below-article, sidebar)
3. **Given** a visitor arrives at the site, **When** they first visit any page, **Then** a cookie consent banner appears requesting permission for ads and analytics
4. **Given** a visitor consents to cookies, **When** they browse content, **Then** AdSense ads load and display appropriately
5. **Given** ads are running, **When** the owner views the monetization dashboard, **Then** they see impressions, clicks, and estimated revenue metrics

---

### User Story 4 - SEO & Analytics Integration (Priority: P2)

The site owner connects Google Analytics 4 and Google Search Console from the admin dashboard, views real-time visitor metrics, analyzes top-performing content, monitors keyword rankings and indexing status, and receives notifications when new content is indexed by Google.

**Why this priority**: Analytics and SEO are critical for growth but require content to exist first. This enables data-driven content strategy and optimization.

**Independent Test**: Can be fully tested by connecting GA4 and GSC accounts in admin integrations, publishing a blog article, verifying the article is auto-submitted to Google Indexing API, and viewing analytics data in the admin dashboard. Delivers value by providing actionable insights for content optimization.

**Acceptance Scenarios**:

1. **Given** the owner is in admin integrations, **When** they connect GA4 with measurement ID, **Then** tracking begins and real-time visitor data appears in the dashboard
2. **Given** the owner is in admin integrations, **When** they connect Google Search Console with site verification, **Then** search performance data (queries, impressions, clicks) is accessible
3. **Given** the owner publishes a new blog article, **When** the publish action completes, **Then** the article URL is automatically submitted to Google Indexing API
4. **Given** the owner views the analytics dashboard, **When** they select a date range, **Then** they see visitor metrics including page views, unique visitors, traffic sources, and top pages
5. **Given** the owner views the search console dashboard, **When** they review keyword rankings, **Then** they see queries, average position, impressions, and click-through rates

---

### User Story 5 - Mobile App Experience (Priority: P3)

Visitors install the native mobile app (iOS or Android) from app stores, receive push notifications for new blog posts, use native share functionality to share content, and experience optimized mobile navigation with haptic feedback and native UI elements.

**Why this priority**: Mobile apps extend reach and engagement but are not essential for the core platform to function. This can be implemented after the web platform is stable.

**Independent Test**: Can be fully tested by building and installing the mobile app, subscribing to push notifications, receiving a notification when a new article is published, and using the native share sheet to share content. Delivers value by increasing engagement and enabling mobile-first users to access content conveniently.

**Acceptance Scenarios**:

1. **Given** a user installs the mobile app, **When** they open it for the first time, **Then** they see the same content as the web version with mobile-optimized navigation
2. **Given** a user enables push notifications, **When** the owner publishes a new blog article, **Then** the user receives a push notification with the article title
3. **Given** a user reads an article in the app, **When** they tap the share button, **Then** the native share sheet appears with options to share via messaging, social media, or email
4. **Given** a user navigates the app, **When** they interact with buttons and UI elements, **Then** haptic feedback provides tactile confirmation
5. **Given** a user views portfolio projects in the app, **When** they swipe through project images, **Then** smooth animations and native gestures enhance the experience

---

### User Story 6 - Feature Flags & Customization (Priority: P3)

The site owner toggles major platform sections (blog, portfolio, apps hub, newsletter, comments) on or off from the admin dashboard without code changes, customizes site appearance with theme settings, and manages legal pages (privacy policy, terms of service, cookie policy) with a rich text editor.

**Why this priority**: Feature flags and customization enhance flexibility but are not critical for initial launch. This can be implemented after core features are stable.

**Independent Test**: Can be fully tested by disabling the blog section via feature flags in admin, verifying the blog navigation disappears from the public site, re-enabling it, and confirming it reappears. Delivers value by allowing phased rollout and quick feature toggling without deployments.

**Acceptance Scenarios**:

1. **Given** the owner is in admin feature flags, **When** they disable the blog section, **Then** blog navigation is hidden from the public site and blog routes return 404
2. **Given** the owner is in admin site settings, **When** they update the site tagline and primary color, **Then** changes are reflected immediately on the public site
3. **Given** the owner is in admin legal pages, **When** they edit the privacy policy with the rich text editor, **Then** the updated policy is saved and displayed on the public privacy page
4. **Given** the owner enables the newsletter feature, **When** visitors subscribe, **Then** email addresses are collected and the owner can export the subscriber list
5. **Given** the owner enables comments on blog articles, **When** visitors submit comments, **Then** comments are held for moderation and the owner can approve or reject them

---

### Edge Cases

- What happens when a visitor tries to access /admin without authentication? → They are redirected to the login page
- How does the system handle invalid AdSense publisher IDs? → The integration shows an error status and provides troubleshooting guidance
- What happens when Google Indexing API rate limits are exceeded? → Failed submissions are queued and retried with exponential backoff
- How does the system handle image uploads exceeding size limits? → The upload is rejected with a clear error message indicating the maximum file size
- What happens when a visitor submits a contact form with invalid email format? → Client-side validation prevents submission and displays an error message
- How does the system handle concurrent edits to the same blog article? → Last write wins, with a warning if the article was modified since the editor loaded it
- What happens when AdSense ads fail to load due to ad blockers? → The ad slots remain empty without breaking page layout
- How does the system handle visitors who decline cookie consent? → Ads and analytics scripts are not loaded, and the site remains fully functional for content consumption
- What happens when a visitor tries to subscribe to the newsletter with an already-registered email? → The system displays a message indicating they're already subscribed
- How does the system handle database connection failures? → Public pages show a maintenance message, admin dashboard shows detailed error information

## Requirements *(mandatory)*

### Functional Requirements

#### Public Content Access
- **FR-001**: System MUST display published blog articles to anonymous visitors without requiring authentication
- **FR-002**: System MUST display portfolio projects with images, descriptions, tech stack, and links to anonymous visitors
- **FR-003**: System MUST display resume sections (experience, education, skills, certifications) to anonymous visitors
- **FR-004**: System MUST provide a contact form that anonymous visitors can submit without authentication
- **FR-005**: System MUST provide a newsletter subscription form that anonymous visitors can submit without authentication
- **FR-006**: System MUST display all AdSense-required legal pages (Privacy Policy, Terms of Service, Cookie Policy, Disclaimer, DMCA, About, Contact) to anonymous visitors

#### Admin Authentication & Authorization
- **FR-007**: System MUST authenticate admin users via email/password, magic link, Google OAuth, or GitHub OAuth
- **FR-008**: System MUST protect all /admin routes with authentication, redirecting unauthenticated users to login
- **FR-009**: System MUST enforce row-level security policies allowing public SELECT on published content and admin-only INSERT/UPDATE/DELETE
- **FR-010**: System MUST support two-factor authentication (TOTP) for admin accounts
- **FR-011**: System MUST log all admin actions (content creation, updates, deletions, settings changes) in an audit log

#### Content Management System
- **FR-012**: Admin MUST be able to create, edit, publish, schedule, and delete blog articles with rich text editor
- **FR-013**: Admin MUST be able to add SEO metadata (title, description, keywords, Open Graph tags) to blog articles
- **FR-014**: Admin MUST be able to upload and manage images for blog articles with automatic optimization
- **FR-015**: Admin MUST be able to create, edit, and delete portfolio projects with images, descriptions, tech stack, and links
- **FR-016**: Admin MUST be able to update resume sections (experience, education, skills, certifications) with structured data
- **FR-017**: Admin MUST be able to create, edit, and delete apps in the apps hub with descriptions, icons, and links
- **FR-018**: Admin MUST be able to moderate comments (approve, reject, delete) on blog articles
- **FR-019**: Admin MUST be able to view and manage contact form submissions with status tracking (new, read, replied, archived)
- **FR-020**: Admin MUST be able to view and export newsletter subscribers

#### AdSense Integration
- **FR-021**: System MUST display a cookie consent banner to first-time visitors requesting permission for ads and analytics
- **FR-022**: System MUST load AdSense scripts only after visitor consent is obtained
- **FR-023**: Admin MUST be able to configure AdSense publisher ID and ad slot IDs from the admin dashboard
- **FR-024**: Admin MUST be able to enable/disable ad placements on specific page types (blog articles, portfolio, apps hub)
- **FR-025**: System MUST display ad units in designated positions (in-article, below-article, sidebar, header, mobile-sticky)
- **FR-026**: Admin MUST be able to view ad performance metrics (impressions, clicks, estimated revenue) in the monetization dashboard
- **FR-027**: System MUST provide an AdSense compliance checker validating all requirements before application submission

#### Analytics & Search Console Integration
- **FR-028**: System MUST integrate Google Analytics 4 with configurable measurement ID
- **FR-029**: System MUST track page views, events, and conversions in GA4 after visitor consent
- **FR-030**: Admin MUST be able to view real-time and historical analytics data in the admin dashboard
- **FR-031**: System MUST integrate Google Search Console with site verification
- **FR-032**: Admin MUST be able to view search performance data (queries, impressions, clicks, average position) in the admin dashboard
- **FR-033**: System MUST automatically submit new/updated/deleted URLs to Google Indexing API on publish/update/delete actions
- **FR-034**: System MUST generate and auto-submit XML sitemaps to Google Search Console on content changes
- **FR-035**: Admin MUST be able to view Core Web Vitals metrics from Google Search Console in the admin dashboard

#### SEO Optimization
- **FR-036**: System MUST generate SEO-friendly URLs (slugs) for all content types
- **FR-037**: System MUST render meta tags (title, description, keywords, Open Graph, Twitter Card) for all public pages
- **FR-038**: System MUST generate structured data (Schema.org JSON-LD) for articles, portfolio projects, and person profile
- **FR-039**: System MUST generate XML sitemaps including all published content with priority and change frequency
- **FR-040**: System MUST implement canonical URLs to prevent duplicate content issues
- **FR-041**: System MUST serve optimized images in modern formats (WebP, AVIF) with responsive sizes

#### Mobile App Features
- **FR-042**: System MUST build native iOS and Android apps from the same codebase using Capacitor
- **FR-043**: Mobile apps MUST support push notifications for new blog posts
- **FR-044**: Mobile apps MUST provide native share functionality using device share sheets
- **FR-045**: Mobile apps MUST implement haptic feedback for user interactions
- **FR-046**: Mobile apps MUST control status bar appearance and splash screen

#### Feature Flags & Customization
- **FR-047**: Admin MUST be able to enable/disable major platform sections (blog, portfolio, apps hub, newsletter, comments, AdSense) via feature flags
- **FR-048**: System MUST respect feature flags in both UI rendering and backend logic
- **FR-049**: Admin MUST be able to customize site appearance (colors, fonts, logo, tagline) from the admin dashboard
- **FR-050**: Admin MUST be able to edit legal pages (Privacy Policy, Terms of Service, Cookie Policy, Disclaimer, DMCA) with a rich text editor
- **FR-051**: System MUST display updated legal pages immediately after admin saves changes

#### Performance & Security
- **FR-052**: System MUST achieve Lighthouse Performance Score of 95+ on all public pages
- **FR-053**: System MUST achieve Core Web Vitals in green (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **FR-054**: System MUST implement code splitting and lazy loading for all routes and components
- **FR-055**: System MUST sanitize and validate all user inputs to prevent XSS and SQL injection
- **FR-056**: System MUST implement rate limiting on contact form and newsletter subscription endpoints
- **FR-057**: System MUST enforce HTTPS for all connections
- **FR-058**: System MUST implement security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- **FR-059**: System MUST meet WCAG 2.1 AA accessibility standards (semantic HTML, ARIA labels, keyboard navigation, color contrast)

### Key Entities

- **Admin Profile**: Represents the site owner with personal information (name, bio, tagline, avatar, contact details, social links, availability status)
- **Article**: Represents a blog post with content, metadata, SEO fields, category, tags, status (draft/published/scheduled/archived), view count, and timestamps
- **Category**: Represents a blog category with name, slug, description, icon, color, and hierarchical parent-child relationships
- **Tag**: Represents a blog tag with name, slug, and color for organizing articles
- **Portfolio Project**: Represents a work sample with title, description, images, tech stack, links (demo, repo, case study), project type, status, client information, and metrics
- **Resume Section**: Represents a section of the resume (experience, education, skills, certifications) with type, title, and sort order
- **Resume Entry**: Represents an item within a resume section with title, organization, location, dates, description, achievements, and tech used
- **App**: Represents a micro-app in the apps hub with name, description, icon, links, tech stack, status, and launch date
- **Comment**: Represents a visitor comment on content with guest name, email, body, status (pending/approved/spam/deleted), and moderation metadata
- **Contact Submission**: Represents a contact form submission with name, email, subject, message, status (new/read/replied/archived), and UTM tracking
- **Newsletter Subscriber**: Represents an email subscriber with email, name, status (active/unsubscribed/bounced), source, and tags
- **Site Settings**: Represents configuration key-value pairs organized by category (general, SEO, AdSense, GA4, GSC, legal, social)
- **Integration Config**: Represents external service connections (GA4, GSC, AdSense, SendGrid, reCAPTCHA) with connection status, config, and error tracking
- **Ad Placement**: Represents an AdSense ad unit with name, slot ID, placement position, targeting rules, and performance metrics
- **Media Asset**: Represents uploaded files with metadata (filename, type, size, URL, dimensions, alt text, tags, usage tracking)
- **Feature Flag**: Represents a toggleable feature with key, enabled status, label, and description
- **Legal Page**: Represents a legal document (privacy, terms, cookie policy, disclaimer, DMCA) with editable content and publication status

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can browse all published content (blog, portfolio, resume) without encountering authentication barriers
- **SC-002**: Admin can create and publish a blog article with SEO metadata in under 5 minutes
- **SC-003**: Public pages achieve Lighthouse Performance Score of 95+ and all Core Web Vitals in green
- **SC-004**: New blog articles are indexed by Google within 24 hours of publication via Indexing API
- **SC-005**: Cookie consent banner appears for first-time visitors and ads load only after consent is granted
- **SC-006**: Admin dashboard displays real-time visitor metrics from GA4 within 30 seconds of page load
- **SC-007**: Contact form submissions are delivered to admin within 1 minute with email notification
- **SC-008**: Mobile apps install successfully on iOS and Android devices and display all content from the web platform
- **SC-009**: Feature flags toggle platform sections on/off without requiring code deployments
- **SC-010**: All AdSense compliance requirements pass validation in the admin compliance checker before application submission
- **SC-011**: System handles 1,000 concurrent visitors without performance degradation
- **SC-012**: Admin can moderate 100 comments in under 10 minutes using bulk actions
- **SC-013**: SEO metadata and structured data are present on 100% of published content pages
- **SC-014**: Platform meets WCAG 2.1 AA accessibility standards verified by automated testing tools
- **SC-015**: Admin receives notifications for new contact submissions, comments, and newsletter subscriptions within 1 minute

## Assumptions

- Visitors have stable internet connectivity and modern web browsers (Chrome, Firefox, Safari, Edge) released within the last 2 years
- The site owner has existing Google accounts for AdSense, Analytics, and Search Console
- The site owner will provide their own domain name and handle DNS configuration
- Initial content (blog articles, portfolio projects, resume data) will be created manually by the admin after platform deployment
- Mobile app distribution will be handled through standard app store submission processes (Apple App Store, Google Play Store)
- The platform will be deployed on a reliable hosting provider with 99.9% uptime SLA (Vercel, Netlify, or similar)
- Supabase free tier or paid plan will be used for backend services (database, auth, storage, edge functions)
- The site owner will handle legal compliance for their specific jurisdiction (GDPR, CCPA, etc.) using the provided legal page templates
- Email delivery for notifications will use a transactional email service (SendGrid, Mailgun, or Supabase Edge Functions with SMTP)
- Image optimization and CDN delivery will be handled by the hosting provider or a dedicated service (Cloudinary, Imgix, or similar)
- The platform will support English language content initially, with internationalization as a future enhancement
- AdSense approval will be pursued after the platform has at least 20 published blog articles and consistent traffic
- Push notifications for mobile apps will use Firebase Cloud Messaging (FCM) for both iOS and Android
- The site owner will be the sole admin user; multi-admin support is out of scope for v1
- Analytics data will be cached in Supabase for historical analysis beyond GA4's default retention period
