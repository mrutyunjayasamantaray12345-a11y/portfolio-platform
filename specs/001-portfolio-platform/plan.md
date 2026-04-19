# Implementation Plan: Personal Portfolio Platform

**Branch**: `001-portfolio-platform` | **Date**: 2026-04-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-portfolio-platform/spec.md`

## Summary

Build a full-stack personal portfolio platform combining blog, portfolio, resume, and apps hub with Google AdSense monetization, GA4/GSC analytics integration, and admin-only CMS. The platform follows a public-first architecture where all content is accessible without authentication, while admin controls everything from a protected dashboard. Mobile apps (iOS/Android) are built from the same codebase using Capacitor. The platform is optimized for SEO, performance (Lighthouse 95+, Core Web Vitals green), accessibility (WCAG 2.1 AA), and AdSense compliance with all required legal pages and cookie consent.

## Technical Context

**Language/Version**: TypeScript 5+, React 18+, Node.js 20+ (for build tools and Edge Functions)
**Primary Dependencies**: 
- Frontend: Vite 5+, React Router v6+, TanStack Query, Zustand, Tailwind CSS, Shadcn/UI, Framer Motion
- Backend: Supabase (PostgreSQL, Auth, Storage, Edge Functions, Realtime)
- Forms: React Hook Form, Zod
- Mobile: Capacitor 6+, @capacitor/app, @capacitor/push-notifications, @capacitor/share, @capacitor/haptics
- Analytics: Google Analytics 4 (gtag.js), Google Search Console API
- Monetization: Google AdSense
- Testing: Vitest, Playwright, Testing Library

**Storage**: Supabase PostgreSQL (structured data), Supabase Storage (images/media), Upstash Redis (rate limiting state)

**Testing**: Vitest (unit tests), Playwright (E2E tests), React Testing Library (component tests), Lighthouse CI (performance), axe-core (accessibility)

**Target Platform**: Web (modern browsers: Chrome, Firefox, Safari, Edge), iOS 15+, Android 8+

**Project Type**: Full-stack web application with native mobile apps (hybrid architecture via Capacitor)

**Performance Goals**: 
- Lighthouse Performance Score: 95+
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s
- Bundle size: < 200KB initial (gzipped)
- Image optimization: WebP/AVIF with responsive sizes
- API response time: < 200ms p95

**Constraints**: 
- Public content MUST be accessible without authentication
- All mutations MUST require admin authentication
- AdSense compliance MUST be validated before launch
- WCAG 2.1 AA accessibility MUST be met
- HTTPS MUST be enforced
- Rate limiting: 5/min, 20/hour, 100/day per IP on public forms
- Image uploads: 5MB max with automatic compression
- Analytics data retention: 90 days in Supabase cache
- Single admin user (multi-admin out of scope for v1)

**Scale/Scope**: 
- Target: 1,000 concurrent visitors without degradation
- Content: ~100 blog articles, ~50 portfolio projects, ~20 apps
- Storage: ~10GB media assets (images, files)
- Database: ~100K rows across all tables
- Mobile apps: iOS App Store + Google Play Store distribution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Public-First Architecture ✅
- **Requirement**: Public content accessible without authentication, admin control behind authentication
- **Compliance**: Spec defines strict two-layer model with RLS policies enforcing public reads, admin writes
- **Validation**: All user stories separate public access (US1) from admin control (US2-US6)

### II. AdSense Compliance by Design ✅
- **Requirement**: All AdSense requirements built in from day one
- **Compliance**: Spec includes all required legal pages, cookie consent banner, compliance checker (FR-021, FR-022, FR-027, FR-006)
- **Validation**: User Story 3 covers AdSense integration with cookie consent and compliance validation

### III. Performance & Core Web Vitals ✅
- **Requirement**: Lighthouse 95+, Core Web Vitals green, FCP < 1.5s, TTI < 2.5s
- **Compliance**: Spec mandates performance targets (FR-052, FR-053, FR-054, SC-003)
- **Validation**: Success criteria include measurable performance metrics

### IV. SEO-First Content Strategy ✅
- **Requirement**: Complete SEO metadata, auto-generated sitemaps, Google Indexing API integration
- **Compliance**: Spec requires SEO metadata for all content (FR-036 through FR-041), automatic sitemap submission (FR-034), Indexing API (FR-033)
- **Validation**: User Story 4 covers SEO & Analytics integration with GSC

### V. Admin-Only Mutation Control ✅
- **Requirement**: All mutations require admin auth, RLS policies enforce at database level
- **Compliance**: Spec defines admin-only mutations (FR-007 through FR-011), RLS policies (FR-009)
- **Validation**: User Story 2 covers admin authentication and content management

### VI. Mobile-First Responsive Design ✅
- **Requirement**: Fully responsive, Capacitor for native apps, mobile-specific features
- **Compliance**: Spec requires responsive design (FR-059), Capacitor integration (FR-042 through FR-046)
- **Validation**: User Story 5 covers mobile app experience with native features

### VII. Analytics & Data-Driven Decisions ✅
- **Requirement**: GA4 and GSC integrated, accessible from admin dashboard
- **Compliance**: Spec requires GA4 integration (FR-028 through FR-030), GSC integration (FR-031 through FR-035)
- **Validation**: User Story 4 covers analytics integration with admin dashboard visibility

### VIII. Accessibility (WCAG 2.1 AA) ✅
- **Requirement**: WCAG 2.1 AA standards, semantic HTML, ARIA labels, keyboard navigation
- **Compliance**: Spec mandates WCAG 2.1 AA compliance (FR-059, SC-014)
- **Validation**: Accessibility testing included in quality standards

### IX. Feature Flags for Flexibility ✅
- **Requirement**: Major sections toggleable via feature flags in database
- **Compliance**: Spec requires feature flags (FR-047, FR-048), admin UI for toggling (FR-047)
- **Validation**: User Story 6 covers feature flags and customization

### X. Security & Privacy by Default ✅
- **Requirement**: Input sanitization, XSS/SQL injection protection, RLS policies, GDPR/CCPA compliance
- **Compliance**: Spec requires input validation (FR-055), rate limiting (FR-056), HTTPS (FR-057), security headers (FR-058)
- **Validation**: Edge cases cover security scenarios, clarifications define rate limiting strategy

### Architecture Constraints ✅
- **Technology Stack**: Spec aligns with mandated stack (React 18+, Vite 5+, TypeScript 5+, Supabase, Capacitor 6+, GA4, GSC, AdSense)
- **Database Schema**: Spec defines comprehensive entity model with RLS policies
- **Component Architecture**: Feature-based organization implied by spec structure

**GATE STATUS**: ✅ PASSED - All constitutional principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-platform/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification (completed)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── api-routes.md    # REST API endpoints for Edge Functions
│   ├── database-schema.sql  # Supabase PostgreSQL schema
│   └── rls-policies.sql     # Row Level Security policies
├── checklists/
│   └── requirements.md  # Specification quality checklist (completed)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Web application with mobile app support
src/
├── app/                 # App entry, router, providers
│   ├── App.tsx
│   ├── router.tsx
│   └── providers/
│       ├── AuthProvider.tsx
│       ├── QueryProvider.tsx
│       ├── ThemeProvider.tsx
│       └── FeatureFlagsProvider.tsx
├── features/            # Feature-based organization
│   ├── blog/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── api/
│   ├── portfolio/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── api/
│   ├── resume/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── api/
│   ├── apps-hub/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── api/
│   ├── legal/           # Privacy, Terms, Cookie Policy, Disclaimer, DMCA
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
│   ├── admin/
│   │   ├── analytics/   # GA4 dashboard
│   │   ├── search-console/  # GSC dashboard
│   │   ├── integrations/    # Service connections
│   │   ├── monetization/    # AdSense + compliance checker
│   │   ├── content/         # Blog, portfolio, resume, apps management
│   │   ├── media/           # Media asset manager
│   │   ├── audience/        # Comments, contacts, subscribers
│   │   ├── legal-pages/     # Edit legal pages
│   │   ├── feature-flags/   # Feature flag management
│   │   ├── settings/        # Site settings
│   │   └── dashboard/       # Admin home
│   └── auth/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── types/
├── shared/
│   ├── components/
│   │   ├── ads/             # AdUnit, AdSenseConsentGuard
│   │   ├── cookie-consent/  # GDPR banner
│   │   ├── analytics/       # GA4Provider, GSCWidget
│   │   ├── ui/              # Shadcn/UI components
│   │   ├── layout/          # Header, Footer, Navigation
│   │   └── forms/           # Form components with validation
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client
│   │   ├── ga4.ts           # GA4 helpers + event tracking
│   │   ├── gsc.ts           # GSC API helpers
│   │   ├── indexing-api.ts  # Google Indexing API helpers
│   │   ├── image-optimizer.ts  # Image compression utilities
│   │   └── utils.ts         # Common utilities
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFeatureFlags.ts
│   │   ├── useAnalytics.ts
│   │   └── useMediaQuery.ts
│   ├── types/
│   │   ├── database.ts      # Supabase generated types
│   │   ├── api.ts
│   │   └── common.ts
│   └── constants/
│       ├── routes.ts
│       ├── config.ts
│       └── feature-flags.ts
├── pages/                   # Public pages
│   ├── HomePage.tsx
│   ├── BlogPage.tsx
│   ├── BlogArticlePage.tsx
│   ├── PortfolioPage.tsx
│   ├── PortfolioProjectPage.tsx
│   ├── ResumePage.tsx
│   ├── AppsHubPage.tsx
│   ├── ContactPage.tsx
│   ├── AboutPage.tsx
│   └── NotFoundPage.tsx
├── styles/
│   ├── globals.css
│   └── tailwind.css
├── main.tsx
└── vite-env.d.ts

supabase/
├── migrations/              # Database migrations
│   ├── 001_initial_schema.sql
│   ├── 002_rls_policies.sql
│   └── 003_feature_flags.sql
├── functions/               # Edge Functions
│   ├── contact-form/
│   ├── newsletter-subscribe/
│   ├── newsletter-send/
│   ├── comment-spam-filter/
│   ├── indexing-api-submit/
│   ├── sitemap-generate/
│   ├── gsc-data-fetch/
│   ├── ga4-data-fetch/
│   └── image-upload-optimize/
└── seed.sql                 # Seed data for development

tests/
├── unit/                    # Vitest unit tests
│   ├── components/
│   ├── hooks/
│   └── utils/
├── integration/             # API integration tests
│   ├── auth.test.ts
│   ├── blog.test.ts
│   └── admin.test.ts
└── e2e/                     # Playwright E2E tests
    ├── public-content.spec.ts
    ├── admin-cms.spec.ts
    ├── adsense-integration.spec.ts
    └── mobile-app.spec.ts

public/
├── favicon.svg
├── icons.svg
├── robots.txt
└── ads.txt                  # AdSense ads.txt file

ios/                         # Capacitor iOS app
android/                     # Capacitor Android app
capacitor.config.ts          # Capacitor configuration
```

**Structure Decision**: Web application architecture with feature-based organization. Frontend uses React + Vite with feature modules for blog, portfolio, resume, apps hub, legal pages, and admin dashboard. Backend uses Supabase Edge Functions for serverless logic. Mobile apps built via Capacitor from the same web codebase. Shared components and utilities extracted to `src/shared/`. Testing organized by type (unit, integration, E2E).

## Complexity Tracking

> No constitutional violations requiring justification. All principles satisfied by specification.

---

## Phase 0: Research & Technology Validation

### Research Tasks

All technical decisions are already specified in the PRD and constitution. No NEEDS CLARIFICATION items remain after spec clarification session. The following research validates implementation approaches for key technical areas:

1. **Supabase Edge Functions Best Practices**
   - Research: Optimal patterns for Edge Functions with service_role for admin mutations
   - Research: Rate limiting implementation with Upstash Redis integration
   - Research: Image upload and optimization pipeline in Edge Functions
   - Research: Email sending via SMTP in Edge Functions

2. **Google Integrations**
   - Research: Google Indexing API authentication and submission patterns
   - Research: GA4 Data API integration for admin dashboard
   - Research: GSC Data API integration for admin dashboard
   - Research: AdSense Auto-ads vs Manual ad placement best practices

3. **Performance Optimization**
   - Research: Code splitting strategies for React Router v6
   - Research: Image optimization pipeline (WebP/AVIF conversion, responsive sizes)
   - Research: Bundle size optimization techniques for Vite
   - Research: Lighthouse CI integration in GitHub Actions

4. **Mobile App Development**
   - Research: Capacitor plugin integration patterns
   - Research: Push notifications setup (Firebase Cloud Messaging)
   - Research: App store submission requirements (iOS App Store, Google Play)
   - Research: Native share sheet implementation

5. **Security & Compliance**
   - Research: Supabase RLS policy patterns for public-first architecture
   - Research: Honeypot field implementation for form spam prevention
   - Research: GDPR/CCPA compliance checklist for cookie consent
   - Research: Content Security Policy (CSP) configuration for AdSense

### Research Output Location

`specs/001-portfolio-platform/research.md`

---

## Phase 1: Design & Contracts

### Data Model

**Output**: `specs/001-portfolio-platform/data-model.md`

Entities extracted from specification:
- Admin Profile
- Article (blog posts)
- Category (blog categories)
- Tag (blog tags)
- Article Tags (junction table)
- Portfolio Project
- Resume Section
- Resume Entry
- App (apps hub)
- Comment
- Contact Submission
- Newsletter Subscriber
- Site Settings
- Integration Config
- Ad Placement
- Media Asset
- Notification
- Redirect
- Audit Log
- Feature Flag
- Legal Page
- GSC Data Cache
- GA4 Data Cache
- Page View

### Interface Contracts

**Output**: `specs/001-portfolio-platform/contracts/`

1. **Database Schema** (`database-schema.sql`):
   - Complete PostgreSQL schema with all tables, columns, types, constraints
   - Indexes for performance optimization
   - Foreign key relationships

2. **RLS Policies** (`rls-policies.sql`):
   - Public read policies for published content
   - Admin-only write policies
   - Service role policies for Edge Functions

3. **API Routes** (`api-routes.md`):
   - Edge Function endpoints
   - Request/response schemas
   - Authentication requirements
   - Rate limiting rules

4. **External API Integrations** (`external-apis.md`):
   - Google Analytics 4 API
   - Google Search Console API
   - Google Indexing API
   - Google AdSense API
   - Upstash Redis API

### Quickstart Guide

**Output**: `specs/001-portfolio-platform/quickstart.md`

Development setup instructions:
1. Prerequisites (Node.js, npm, Supabase CLI)
2. Environment variables configuration
3. Supabase project setup
4. Database migrations
5. Local development server
6. Mobile app setup (iOS/Android)
7. Testing setup
8. Deployment instructions

### Agent Context Update

Update `CLAUDE.md` to reference this plan between `<!-- SPECKIT START -->` and `<!-- SPECKIT END -->` markers.

---

## Phase 2: Task Generation

**Output**: `specs/001-portfolio-platform/tasks.md` (generated by `/speckit.tasks` command)

Tasks will be organized by user story priority (P1, P2, P3) to enable independent implementation and testing of each story as an MVP increment.

---

## Next Steps

1. ✅ Phase 0: Generate `research.md` with technology validation findings
2. ✅ Phase 1: Generate `data-model.md` with complete entity definitions
3. ✅ Phase 1: Generate `contracts/` with database schema, RLS policies, and API routes
4. ✅ Phase 1: Generate `quickstart.md` with development setup instructions
5. ✅ Phase 1: Update `CLAUDE.md` with plan reference
6. ⏭️ Phase 2: Run `/speckit.tasks` to generate actionable task list
7. ⏭️ Implementation: Execute tasks in priority order (P1 → P2 → P3)
