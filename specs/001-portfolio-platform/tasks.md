# Tasks: Personal Portfolio Platform

**Input**: Design documents from `/specs/001-portfolio-platform/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5, US6)
- Include exact file paths in descriptions

## Path Conventions

- Web app: `src/`, `supabase/`, `tests/` at repository root
- Paths shown below follow plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Vite + React + TypeScript project with package.json dependencies
- [ ] T002 [P] Configure Tailwind CSS with custom theme in tailwind.config.ts
- [ ] T003 [P] Set up ESLint and Prettier configuration files
- [ ] T004 [P] Configure Vitest for unit testing in vitest.config.ts
- [ ] T005 [P] Configure Playwright for E2E testing in playwright.config.ts
- [ ] T006 [P] Set up GitHub Actions CI/CD workflow in .github/workflows/ci.yml
- [ ] T007 Create Supabase project and configure environment variables in .env.local
- [ ] T008 [P] Initialize Capacitor for mobile apps with capacitor.config.ts
- [ ] T009 [P] Set up project folder structure per plan.md (src/app, src/features, src/shared, src/pages)
- [ ] T010 [P] Create base TypeScript types in src/shared/types/common.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure needed by all user stories

### Database & Authentication

- [ ] T011 Create Supabase database schema migration in supabase/migrations/001_initial_schema.sql
- [ ] T012 [P] Create RLS policies migration in supabase/migrations/002_rls_policies.sql
- [ ] T013 [P] Create feature flags seed data in supabase/migrations/003_feature_flags.sql
- [ ] T014 Initialize Supabase client in src/shared/lib/supabase.ts
- [ ] T015 [P] Create AuthProvider with Supabase Auth in src/app/providers/AuthProvider.tsx
- [ ] T016 [P] Create FeatureFlagsProvider in src/app/providers/FeatureFlagsProvider.tsx
- [ ] T017 [P] Create QueryProvider with TanStack Query in src/app/providers/QueryProvider.tsx

### Routing & Layout

- [ ] T018 Set up React Router with route definitions in src/app/router.tsx
- [ ] T019 [P] Create App component with providers in src/app/App.tsx
- [ ] T020 [P] Create base Layout component in src/shared/components/layout/Layout.tsx
- [ ] T021 [P] Create Header component with navigation in src/shared/components/layout/Header.tsx
- [ ] T022 [P] Create Footer component in src/shared/components/layout/Footer.tsx

### Shared Components

- [ ] T023 [P] Install and configure Shadcn/UI components in src/shared/components/ui/
- [ ] T024 [P] Create LoadingSpinner component in src/shared/components/ui/LoadingSpinner.tsx
- [ ] T025 [P] Create ErrorBoundary component in src/shared/components/ui/ErrorBoundary.tsx

### Security & Rate Limiting

- [ ] T026 Set up Upstash Redis for rate limiting state
- [ ] T027 [P] Create rate limiting Edge Function in supabase/functions/rate-limiter/index.ts
- [ ] T028 [P] Create honeypot field component in src/shared/components/forms/HoneypotField.tsx

---

## Phase 3: User Story 1 - Public Content Discovery (P1)

**Goal**: Visitors can browse blog, portfolio, resume, and submit contact/newsletter forms without authentication

**Independent Test**: Visit public site anonymously, navigate all content, submit forms successfully

### Blog Public Pages

- [ ] T029 [US1] Create Article model types in src/shared/types/database.ts
- [ ] T030 [US1] Create blog API hooks in src/features/blog/api/useArticles.ts
- [ ] T031 [US1] Create BlogPage component in src/features/blog/pages/BlogPage.tsx
- [ ] T032 [US1] Create BlogArticlePage component in src/features/blog/pages/BlogArticlePage.tsx
- [ ] T033 [P] [US1] Create ArticleCard component in src/features/blog/components/ArticleCard.tsx
- [ ] T034 [P] [US1] Create ArticleContent component with SEO meta tags in src/features/blog/components/ArticleContent.tsx

### Portfolio Public Pages

- [ ] T035 [US1] Create PortfolioProject model types in src/shared/types/database.ts
- [ ] T036 [US1] Create portfolio API hooks in src/features/portfolio/api/useProjects.ts
- [ ] T037 [US1] Create PortfolioPage component in src/features/portfolio/pages/PortfolioPage.tsx
- [ ] T038 [US1] Create PortfolioProjectPage component in src/features/portfolio/pages/PortfolioProjectPage.tsx
- [ ] T039 [P] [US1] Create ProjectCard component in src/features/portfolio/components/ProjectCard.tsx
- [ ] T040 [P] [US1] Create ProjectGallery component in src/features/portfolio/components/ProjectGallery.tsx

### Resume Public Page

- [ ] T041 [US1] Create Resume model types in src/shared/types/database.ts
- [ ] T042 [US1] Create resume API hooks in src/features/resume/api/useResume.ts
- [ ] T043 [US1] Create ResumePage component in src/features/resume/pages/ResumePage.tsx
- [ ] T044 [P] [US1] Create ExperienceSection component in src/features/resume/components/ExperienceSection.tsx
- [ ] T045 [P] [US1] Create EducationSection component in src/features/resume/components/EducationSection.tsx
- [ ] T046 [P] [US1] Create SkillsSection component in src/features/resume/components/SkillsSection.tsx

### Contact Form

- [ ] T047 [US1] Create ContactSubmission model types in src/shared/types/database.ts
- [ ] T048 [US1] Create contact form Edge Function in supabase/functions/contact-form/index.ts
- [ ] T049 [US1] Create ContactPage component with form in src/pages/ContactPage.tsx
- [ ] T050 [P] [US1] Create ContactForm component with validation in src/features/blog/components/ContactForm.tsx

### Newsletter Subscription

- [ ] T051 [US1] Create NewsletterSubscriber model types in src/shared/types/database.ts
- [ ] T052 [US1] Create newsletter subscribe Edge Function in supabase/functions/newsletter-subscribe/index.ts
- [ ] T053 [P] [US1] Create NewsletterForm component in src/shared/components/forms/NewsletterForm.tsx

### Homepage

- [ ] T054 [US1] Create HomePage component in src/pages/HomePage.tsx
- [ ] T055 [P] [US1] Create Hero section component in src/pages/components/HeroSection.tsx
- [ ] T056 [P] [US1] Create FeaturedArticles component in src/pages/components/FeaturedArticles.tsx
- [ ] T057 [P] [US1] Create FeaturedProjects component in src/pages/components/FeaturedProjects.tsx

---

## Phase 4: User Story 2 - Admin Content Management (P1)

**Goal**: Admin can log in, create/edit blog articles, manage portfolio projects, update resume, moderate comments/contacts

**Independent Test**: Log in to admin, create article with SEO metadata, publish it, verify on public site

### Admin Authentication

- [ ] T058 [US2] Create admin login page in src/features/auth/pages/LoginPage.tsx
- [ ] T059 [US2] Create auth middleware for admin routes in src/features/auth/hooks/useRequireAuth.ts
- [ ] T060 [P] [US2] Create LoginForm component in src/features/auth/components/LoginForm.tsx

### Admin Dashboard

- [ ] T061 [US2] Create admin dashboard layout in src/features/admin/dashboard/DashboardLayout.tsx
- [ ] T062 [US2] Create admin dashboard home in src/features/admin/dashboard/DashboardPage.tsx
- [ ] T063 [P] [US2] Create admin sidebar navigation in src/features/admin/dashboard/components/Sidebar.tsx
- [ ] T064 [P] [US2] Create stats cards component in src/features/admin/dashboard/components/StatsCards.tsx

### Blog Content Management

- [ ] T065 [US2] Create blog admin API hooks in src/features/admin/content/api/useAdminArticles.ts
- [ ] T066 [US2] Create articles list page in src/features/admin/content/pages/ArticlesListPage.tsx
- [ ] T067 [US2] Create article editor page in src/features/admin/content/pages/ArticleEditorPage.tsx
- [ ] T068 [P] [US2] Create rich text editor component (TipTap) in src/features/admin/content/components/RichTextEditor.tsx
- [ ] T069 [P] [US2] Create SEO metadata form in src/features/admin/content/components/SEOMetadataForm.tsx
- [ ] T070 [P] [US2] Create article status selector in src/features/admin/content/components/ArticleStatusSelector.tsx

### Portfolio Management

- [ ] T071 [US2] Create portfolio admin API hooks in src/features/admin/content/api/useAdminProjects.ts
- [ ] T072 [US2] Create projects list page in src/features/admin/content/pages/ProjectsListPage.tsx
- [ ] T073 [US2] Create project editor page in src/features/admin/content/pages/ProjectEditorPage.tsx
- [ ] T074 [P] [US2] Create image upload component in src/features/admin/content/components/ImageUpload.tsx
- [ ] T075 [P] [US2] Create tech stack selector in src/features/admin/content/components/TechStackSelector.tsx

### Resume Management

- [ ] T076 [US2] Create resume admin API hooks in src/features/admin/content/api/useAdminResume.ts
- [ ] T077 [US2] Create resume editor page in src/features/admin/content/pages/ResumeEditorPage.tsx
- [ ] T078 [P] [US2] Create experience entry form in src/features/admin/content/components/ExperienceEntryForm.tsx
- [ ] T079 [P] [US2] Create education entry form in src/features/admin/content/components/EducationEntryForm.tsx
- [ ] T080 [P] [US2] Create skills editor in src/features/admin/content/components/SkillsEditor.tsx

### Comments Moderation

- [ ] T081 [US2] Create Comment model types in src/shared/types/database.ts
- [ ] T082 [US2] Create comment spam filter Edge Function in supabase/functions/comment-spam-filter/index.ts
- [ ] T083 [US2] Create comments moderation page in src/features/admin/audience/pages/CommentsPage.tsx
- [ ] T084 [P] [US2] Create comment list component in src/features/admin/audience/components/CommentList.tsx
- [ ] T085 [P] [US2] Create comment actions (delete/hide) in src/features/admin/audience/components/CommentActions.tsx

### Contact Submissions Management

- [ ] T086 [US2] Create contact submissions page in src/features/admin/audience/pages/ContactSubmissionsPage.tsx
- [ ] T087 [P] [US2] Create submission detail modal in src/features/admin/audience/components/SubmissionDetailModal.tsx
- [ ] T088 [P] [US2] Create submission status updater in src/features/admin/audience/components/SubmissionStatusUpdater.tsx

### Media Asset Manager

- [ ] T089 [US2] Create MediaAsset model types in src/shared/types/database.ts
- [ ] T090 [US2] Create image optimization Edge Function in supabase/functions/image-upload-optimize/index.ts
- [ ] T091 [US2] Create media library page in src/features/admin/media/pages/MediaLibraryPage.tsx
- [ ] T092 [P] [US2] Create media grid component in src/features/admin/media/components/MediaGrid.tsx
- [ ] T093 [P] [US2] Create media upload modal in src/features/admin/media/components/MediaUploadModal.tsx

---

## Phase 5: User Story 3 - AdSense Monetization Setup (P2)

**Goal**: Admin configures AdSense, places ads, enables cookie consent, monitors ad performance

**Independent Test**: Connect AdSense in admin, enable ads on blog, verify cookie consent banner, confirm ads display

### Cookie Consent

- [ ] T094 [US3] Create cookie consent banner component in src/shared/components/cookie-consent/CookieConsentBanner.tsx
- [ ] T095 [US3] Create cookie consent context in src/shared/components/cookie-consent/CookieConsentContext.tsx
- [ ] T096 [P] [US3] Create cookie settings modal in src/shared/components/cookie-consent/CookieSettingsModal.tsx

### AdSense Integration

- [ ] T097 [US3] Create AdPlacement model types in src/shared/types/database.ts
- [ ] T098 [US3] Create AdSense integration config in src/features/admin/integrations/api/useAdSenseIntegration.ts
- [ ] T099 [US3] Create AdUnit component in src/shared/components/ads/AdUnit.tsx
- [ ] T100 [P] [US3] Create AdSenseConsentGuard wrapper in src/shared/components/ads/AdSenseConsentGuard.tsx

### AdSense Admin

- [ ] T101 [US3] Create AdSense integration page in src/features/admin/integrations/pages/AdSenseIntegrationPage.tsx
- [ ] T102 [US3] Create ad placements manager in src/features/admin/monetization/pages/AdPlacementsPage.tsx
- [ ] T103 [US3] Create monetization dashboard in src/features/admin/monetization/pages/MonetizationDashboardPage.tsx
- [ ] T104 [P] [US3] Create AdSense compliance checker in src/features/admin/monetization/components/ComplianceChecker.tsx
- [ ] T105 [P] [US3] Create ad performance charts in src/features/admin/monetization/components/AdPerformanceCharts.tsx

### Legal Pages

- [ ] T106 [US3] Create LegalPage model types in src/shared/types/database.ts
- [ ] T107 [US3] Create legal pages editor in src/features/admin/legal-pages/pages/LegalPagesEditorPage.tsx
- [ ] T108 [US3] Create public legal pages in src/features/legal/pages/ (PrivacyPage, TermsPage, CookiePolicyPage, DisclaimerPage, DMCAPage)
- [ ] T109 [P] [US3] Create legal page renderer in src/features/legal/components/LegalPageRenderer.tsx

---

## Phase 6: User Story 4 - SEO & Analytics Integration (P2)

**Goal**: Admin connects GA4/GSC, views analytics, monitors SEO, receives indexing notifications

**Independent Test**: Connect GA4/GSC in admin, publish article, verify Indexing API submission, view analytics dashboard

### Google Analytics 4

- [ ] T110 [US4] Create GA4 integration config in src/features/admin/integrations/api/useGA4Integration.ts
- [ ] T111 [US4] Create GA4 tracking script loader in src/shared/lib/ga4.ts
- [ ] T112 [US4] Create GA4Provider component in src/shared/components/analytics/GA4Provider.tsx
- [ ] T113 [US4] Create GA4 data fetch Edge Function in supabase/functions/ga4-data-fetch/index.ts
- [ ] T114 [US4] Create analytics dashboard in src/features/admin/analytics/pages/AnalyticsDashboardPage.tsx
- [ ] T115 [P] [US4] Create visitor metrics charts in src/features/admin/analytics/components/VisitorMetricsCharts.tsx
- [ ] T116 [P] [US4] Create top pages table in src/features/admin/analytics/components/TopPagesTable.tsx

### Google Search Console

- [ ] T117 [US4] Create GSC integration config in src/features/admin/integrations/api/useGSCIntegration.ts
- [ ] T118 [US4] Create GSC data fetch Edge Function in supabase/functions/gsc-data-fetch/index.ts
- [ ] T119 [US4] Create search console dashboard in src/features/admin/search-console/pages/SearchConsoleDashboardPage.tsx
- [ ] T120 [P] [US4] Create keyword rankings table in src/features/admin/search-console/components/KeywordRankingsTable.tsx
- [ ] T121 [P] [US4] Create Core Web Vitals widget in src/features/admin/search-console/components/CoreWebVitalsWidget.tsx

### Google Indexing API

- [ ] T122 [US4] Create Indexing API submit Edge Function in supabase/functions/indexing-api-submit/index.ts
- [ ] T123 [US4] Create sitemap generation Edge Function in supabase/functions/sitemap-generate/index.ts
- [ ] T124 [P] [US4] Create indexing status tracker in src/features/admin/search-console/components/IndexingStatusTracker.tsx

### SEO Optimization

- [ ] T125 [US4] Create SEO meta tags component in src/shared/components/seo/SEOMeta.tsx
- [ ] T126 [P] [US4] Create structured data generator in src/shared/lib/structured-data.ts
- [ ] T127 [P] [US4] Create Open Graph tags component in src/shared/components/seo/OpenGraphTags.tsx

---

## Phase 7: User Story 5 - Mobile App Experience (P3)

**Goal**: Users install mobile app, receive push notifications, use native share, experience mobile-optimized UI

**Independent Test**: Build/install mobile app, subscribe to push, receive notification, use native share

### Capacitor Setup

- [ ] T128 [US5] Configure Capacitor for iOS in ios/ directory
- [ ] T129 [US5] Configure Capacitor for Android in android/ directory
- [ ] T130 [P] [US5] Create Capacitor plugins wrapper in src/shared/lib/capacitor-plugins.ts

### Push Notifications

- [ ] T131 [US5] Set up Firebase Cloud Messaging project
- [ ] T132 [US5] Create push notification registration in src/features/mobile/hooks/usePushNotifications.ts
- [ ] T133 [US5] Create push notification send Edge Function in supabase/functions/push-notification-send/index.ts
- [ ] T134 [P] [US5] Create notification permission prompt in src/features/mobile/components/NotificationPermissionPrompt.tsx

### Native Features

- [ ] T135 [US5] Create native share hook in src/features/mobile/hooks/useNativeShare.ts
- [ ] T136 [P] [US5] Create haptic feedback hook in src/features/mobile/hooks/useHaptics.ts
- [ ] T137 [P] [US5] Create mobile-specific navigation in src/features/mobile/components/MobileNavigation.tsx

### Mobile Optimization

- [ ] T138 [US5] Create mobile-specific styles in src/styles/mobile.css
- [ ] T139 [P] [US5] Create mobile splash screen assets
- [ ] T140 [P] [US5] Create mobile app icons for iOS and Android

---

## Phase 8: User Story 6 - Feature Flags & Customization (P3)

**Goal**: Admin toggles features, customizes site appearance, edits legal pages

**Independent Test**: Disable blog via feature flags, verify navigation hidden, re-enable, confirm reappears

### Feature Flags Management

- [ ] T141 [US6] Create feature flags admin page in src/features/admin/feature-flags/pages/FeatureFlagsPage.tsx
- [ ] T142 [P] [US6] Create feature flag toggle component in src/features/admin/feature-flags/components/FeatureFlagToggle.tsx
- [ ] T143 [P] [US6] Create feature-gated route wrapper in src/shared/components/routing/FeatureGatedRoute.tsx

### Site Customization

- [ ] T144 [US6] Create site settings admin page in src/features/admin/settings/pages/SiteSettingsPage.tsx
- [ ] T145 [P] [US6] Create theme customizer in src/features/admin/settings/components/ThemeCustomizer.tsx
- [ ] T146 [P] [US6] Create logo uploader in src/features/admin/settings/components/LogoUploader.tsx

### Newsletter Management

- [ ] T147 [US6] Create newsletter subscribers page in src/features/admin/audience/pages/NewsletterSubscribersPage.tsx
- [ ] T148 [US6] Create newsletter composer in src/features/admin/audience/pages/NewsletterComposerPage.tsx
- [ ] T149 [US6] Create newsletter send Edge Function in supabase/functions/newsletter-send/index.ts
- [ ] T150 [P] [US6] Create subscriber export functionality in src/features/admin/audience/components/SubscriberExport.tsx

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Performance optimization, accessibility, testing, deployment

### Performance Optimization

- [ ] T151 [P] Implement code splitting for all routes in src/app/router.tsx
- [ ] T152 [P] Add lazy loading for images in src/shared/components/ui/LazyImage.tsx
- [ ] T153 [P] Configure bundle size optimization in vite.config.ts
- [ ] T154 [P] Set up Lighthouse CI in .github/workflows/lighthouse.yml

### Accessibility

- [ ] T155 [P] Add ARIA labels to all interactive elements
- [ ] T156 [P] Implement keyboard navigation for all features
- [ ] T157 [P] Add focus indicators with sufficient contrast
- [ ] T158 [P] Run axe-core accessibility tests in tests/accessibility/

### Security

- [ ] T159 [P] Configure Content Security Policy headers
- [ ] T160 [P] Add input sanitization for all user inputs
- [ ] T161 [P] Implement CSRF protection for forms
- [ ] T162 [P] Add security headers (HSTS, X-Frame-Options, etc.)

### Testing

- [ ] T163 [P] Write unit tests for critical utilities in tests/unit/
- [ ] T164 [P] Write E2E tests for public content discovery in tests/e2e/public-content.spec.ts
- [ ] T165 [P] Write E2E tests for admin CMS in tests/e2e/admin-cms.spec.ts
- [ ] T166 [P] Write E2E tests for AdSense integration in tests/e2e/adsense.spec.ts

### Deployment

- [ ] T167 Deploy Supabase project to production
- [ ] T168 [P] Configure custom domain and SSL
- [ ] T169 [P] Set up environment variables for production
- [ ] T170 [P] Deploy web app to Vercel/Netlify
- [ ] T171 [P] Submit iOS app to App Store
- [ ] T172 [P] Submit Android app to Google Play Store

---

## Dependencies & Execution Strategy

### User Story Completion Order

```
Phase 1 (Setup) → Phase 2 (Foundational) → Phase 3 (US1) + Phase 4 (US2) → Phase 5 (US3) + Phase 6 (US4) → Phase 7 (US5) + Phase 8 (US6) → Phase 9 (Polish)
```

**Critical Path**:
1. Setup + Foundational (T001-T028) - MUST complete first
2. US1 + US2 (T029-T093) - Can run in parallel, both P1 priority
3. US3 + US4 (T094-T127) - Can run in parallel after US1+US2, both P2 priority
4. US5 + US6 (T128-T150) - Can run in parallel after US3+US4, both P3 priority
5. Polish (T151-T172) - Final phase, many tasks can run in parallel

### Parallel Execution Examples

**Phase 3 (US1) Parallelization**:
- Blog pages (T029-T034) can run parallel to Portfolio pages (T035-T040)
- Resume page (T041-T046) can run parallel to Contact form (T047-T050)
- Newsletter form (T051-T053) can run parallel to Homepage (T054-T057)

**Phase 4 (US2) Parallelization**:
- Blog CMS (T065-T070) can run parallel to Portfolio CMS (T071-T075)
- Resume CMS (T076-T080) can run parallel to Comments moderation (T081-T085)
- Contact management (T086-T088) can run parallel to Media manager (T089-T093)

**Phase 5 (US3) + Phase 6 (US4) Parallelization**:
- US3 (AdSense) and US4 (Analytics/SEO) are completely independent and can run fully in parallel

### MVP Scope Recommendation

**Minimum Viable Product** = Phase 1 + Phase 2 + Phase 3 (US1) + Phase 4 (US2)

This delivers:
- ✅ Public content browsing (blog, portfolio, resume)
- ✅ Contact form and newsletter subscription
- ✅ Admin authentication and dashboard
- ✅ Full content management (blog, portfolio, resume)
- ✅ Comments moderation
- ✅ Media asset management

**Post-MVP Increments**:
- Increment 1: Add US3 (AdSense monetization)
- Increment 2: Add US4 (Analytics & SEO)
- Increment 3: Add US5 (Mobile apps)
- Increment 4: Add US6 (Feature flags & customization)
- Increment 5: Polish & optimization

---

## Task Summary

- **Total Tasks**: 172
- **Setup Phase**: 10 tasks
- **Foundational Phase**: 18 tasks
- **User Story 1 (P1)**: 29 tasks
- **User Story 2 (P1)**: 36 tasks
- **User Story 3 (P2)**: 16 tasks
- **User Story 4 (P2)**: 18 tasks
- **User Story 5 (P3)**: 13 tasks
- **User Story 6 (P3)**: 10 tasks
- **Polish Phase**: 22 tasks

**Parallel Opportunities**: 98 tasks marked with [P] can run in parallel with other tasks

**Independent Test Criteria**:
- US1: Visit public site, navigate all content, submit forms
- US2: Log in, create article, publish, verify on public site
- US3: Connect AdSense, enable ads, verify cookie consent and ad display
- US4: Connect GA4/GSC, publish article, verify indexing, view analytics
- US5: Install mobile app, receive push notification, use native share
- US6: Toggle feature flag, verify UI change, re-enable, confirm restoration

**Format Validation**: ✅ All tasks follow checklist format with checkbox, ID, optional [P] and [Story] labels, and file paths
