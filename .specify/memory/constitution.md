<!--
Sync Impact Report:
Version: 1.0.0 (Initial constitution)
Modified Principles: N/A (new constitution)
Added Sections: All core principles, architecture constraints, quality standards, governance
Removed Sections: N/A
Templates Status:
  ✅ plan-template.md - aligned with principles
  ✅ spec-template.md - aligned with requirements structure
  ✅ tasks-template.md - aligned with task categorization
Follow-up TODOs: None
-->

# Personal Portfolio Platform Constitution

## Core Principles

### I. Public-First Architecture
The platform MUST maintain a strict two-layer model: public content accessible without authentication, admin control behind authentication. Public visitors MUST NEVER encounter login screens, registration forms, or authentication barriers. All published content (blog, portfolio, resume, apps) MUST be readable by anonymous users with zero friction.

**Why**: Maximizes reach, SEO performance, and user experience. Authentication complexity only where necessary (admin dashboard).

**How to apply**: Every feature decision must answer: "Does the public need to log in for this?" If no, implement as anonymous-accessible. RLS policies enforce public reads, admin writes.

### II. AdSense Compliance by Design
All Google AdSense requirements MUST be built into the platform from day one. Required legal pages (Privacy Policy, Terms of Service, Cookie Policy, Disclaimer, DMCA, About, Contact) MUST exist and be accessible. Cookie consent MUST be obtained before loading ads or analytics. AdSense compliance checker MUST validate all requirements before application submission.

**Why**: AdSense approval is a primary monetization goal. Non-compliance delays approval by weeks or results in rejection.

**How to apply**: Every new feature must consider AdSense policy impact. Legal pages must be admin-editable. Cookie consent must gate all tracking scripts. Compliance checker must validate before launch.

### III. Performance & Core Web Vitals
The platform MUST achieve Lighthouse Performance Score 95+, all Core Web Vitals in green (LCP < 2.5s, FID < 100ms, CLS < 0.1). First Contentful Paint MUST be < 1.5s, Time to Interactive < 2.5s. Code splitting, lazy loading, and CDN delivery are mandatory. Images MUST be optimized and served via modern formats (WebP, AVIF).

**Why**: SEO rankings depend on Core Web Vitals. Poor performance kills user engagement and AdSense revenue.

**How to apply**: Every component must be code-split. Images must be lazy-loaded. Bundle size must be monitored. GSC dashboard tracks Core Web Vitals compliance.

### IV. SEO-First Content Strategy
Every content type (blog articles, portfolio projects, apps) MUST have complete SEO metadata: title, description, keywords, Open Graph tags, structured data (Schema.org). Sitemaps MUST auto-generate and submit to Google Search Console on every publish. Google Indexing API MUST notify Google of new/updated/deleted URLs immediately.

**Why**: Organic search is the primary traffic source. Proper SEO metadata and indexing are non-negotiable for discovery.

**How to apply**: All content models include SEO fields. React Helmet Async manages meta tags. Edge Functions handle sitemap generation and Indexing API calls. GSC integration tracks indexing status.

### V. Admin-Only Mutation Control
All content creation, editing, deletion, and configuration changes MUST require admin authentication. Public users can only read published content and submit limited forms (contact, newsletter, comments with moderation). Supabase RLS policies MUST enforce this at the database level. Edge Functions with service_role handle admin mutations.

**Why**: Security and content quality control. Prevents spam, vandalism, and unauthorized changes.

**How to apply**: RLS policies allow public SELECT only. All INSERT/UPDATE/DELETE operations go through authenticated Edge Functions. Admin routes protected by Supabase Auth guards.

### VI. Mobile-First Responsive Design
The platform MUST be fully responsive across all device sizes (mobile, tablet, desktop). Capacitor integration MUST enable native iOS and Android apps from the same codebase. Mobile-specific features (push notifications, haptics, native share) MUST be implemented. Touch targets MUST meet accessibility standards (44x44px minimum).

**Why**: Mobile traffic dominates. Native apps extend reach and engagement. Responsive design is table stakes.

**How to apply**: Tailwind mobile-first breakpoints. Capacitor plugins for native features. Test on real devices. Mobile-specific ad placements.

### VII. Analytics & Data-Driven Decisions
Google Analytics 4 and Google Search Console MUST be integrated and accessible from admin dashboard. Real-time visitor tracking, event tracking, conversion funnels, keyword rankings, and Core Web Vitals MUST be visible. Admin dashboard MUST display actionable insights (top pages, traffic sources, search queries, ad performance).

**Why**: Data informs content strategy, SEO optimization, and monetization decisions. Blind optimization is guesswork.

**How to apply**: GA4 and GSC APIs pull data into admin dashboard. Custom events track user actions. Data cached in Supabase for historical analysis. Compliance with GDPR via cookie consent.

### VIII. Accessibility (WCAG 2.1 AA)
The platform MUST meet WCAG 2.1 AA standards. Semantic HTML, ARIA labels, keyboard navigation, screen reader support, sufficient color contrast (4.5:1 minimum), and focus indicators are mandatory. Forms MUST have clear labels and error messages. Images MUST have alt text.

**Why**: Accessibility is a legal requirement in many jurisdictions and expands audience reach. Good accessibility improves SEO.

**How to apply**: Use semantic HTML elements. Test with screen readers. Automated accessibility testing in CI/CD. Manual audits before major releases.

### IX. Feature Flags for Flexibility
Major platform sections (blog, portfolio, apps hub, newsletter, comments, AdSense) MUST be toggleable via feature flags stored in database. Admin dashboard MUST provide UI to enable/disable features without code changes. Feature flags MUST control both UI visibility and backend logic.

**Why**: Allows phased rollout, A/B testing, and quick disabling of problematic features without deployments.

**How to apply**: Feature flags table in Supabase. React context provides flag state. Components check flags before rendering. Edge Functions respect flags.

### X. Security & Privacy by Default
All user inputs MUST be sanitized and validated. SQL injection, XSS, CSRF protections MUST be enforced. Supabase RLS policies MUST prevent unauthorized data access. Personal data (emails, IPs) MUST be handled per GDPR/CCPA. Rate limiting MUST prevent abuse. HTTPS MUST be enforced. Security headers (CSP, HSTS, X-Frame-Options) MUST be configured.

**Why**: Security breaches destroy trust and violate legal requirements. Privacy compliance is mandatory for AdSense and GDPR.

**How to apply**: Zod schemas validate all inputs. Supabase RLS enforces access control. Edge Functions implement rate limiting. Legal pages document data handling. Cookie consent gates tracking.

## Architecture Constraints

### Technology Stack (Non-Negotiable)
- **Frontend**: React 18+, Vite 5+, TypeScript 5+, Tailwind CSS, Shadcn/UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions, Realtime)
- **State Management**: TanStack Query (server state), Zustand (UI state)
- **Routing**: React Router v6+
- **Forms**: React Hook Form + Zod validation
- **Mobile**: Capacitor 6+
- **Analytics**: Google Analytics 4, Google Search Console
- **Monetization**: Google AdSense
- **Testing**: Vitest (unit), Playwright (E2E)
- **CI/CD**: GitHub Actions

**Why**: This stack is proven, modern, and optimized for the platform's requirements. Changing core technologies requires constitutional amendment.

**How to apply**: All new features must use these technologies. Proposals for alternatives require justification and approval.

### Database Schema Stability
Database schema changes MUST be versioned and migrated via Supabase migrations. Breaking changes MUST include migration scripts and rollback plans. RLS policies MUST be tested before deployment. Schema changes affecting public APIs MUST be backward-compatible or versioned.

**Why**: Database is the source of truth. Schema instability breaks features and loses data.

**How to apply**: All schema changes via migration files. Test migrations in staging. Document breaking changes. Version APIs if schema changes affect contracts.

### Component Architecture
Components MUST follow feature-based organization under `src/features/`. Shared components live in `src/shared/components/`. Each feature owns its components, hooks, types, and API calls. Cross-feature dependencies MUST be minimized and explicit.

**Why**: Feature-based organization scales better than type-based. Clear boundaries prevent spaghetti code.

**How to apply**: New features get their own directory under `src/features/`. Shared utilities extracted only when used by 3+ features. No circular dependencies.

## Quality Standards

### Code Quality
- TypeScript strict mode MUST be enabled
- ESLint and Prettier MUST pass with zero warnings
- Code coverage MUST be > 80% for critical paths (auth, payments, data mutations)
- No `any` types except in explicitly justified cases
- All functions MUST have clear single responsibilities
- Magic numbers and strings MUST be extracted to constants

### Testing Requirements
- Unit tests for all business logic and utilities
- Integration tests for API routes and database operations
- E2E tests for critical user flows (admin login, content publishing, contact form)
- Visual regression tests for key pages
- Accessibility tests in CI/CD pipeline
- Performance budgets enforced (bundle size, Lighthouse scores)

### Documentation Requirements
- README MUST include setup instructions, tech stack, and architecture overview
- API routes MUST be documented with request/response schemas
- Complex algorithms MUST have inline comments explaining WHY, not WHAT
- Database schema MUST be documented with ERD and field descriptions
- Deployment process MUST be documented with step-by-step instructions

### Git Workflow
- Feature branches MUST follow naming convention: `feature/description`, `fix/description`, `docs/description`
- Commits MUST follow Conventional Commits format: `type(scope): description`
- Pull requests MUST include description, testing notes, and screenshots for UI changes
- Main branch MUST always be deployable
- No direct commits to main; all changes via PR
- Squash merge preferred for clean history

## Governance

### Amendment Process
This constitution supersedes all other development practices. Amendments require:
1. Written proposal with rationale and impact analysis
2. Review of affected templates and documentation
3. Version bump following semantic versioning (MAJOR.MINOR.PATCH)
4. Update of all dependent artifacts (templates, docs, scripts)
5. Commit message: `docs: amend constitution to vX.Y.Z (summary)`

### Compliance Verification
All PRs and code reviews MUST verify compliance with constitutional principles. Violations MUST be flagged and corrected before merge. Complexity and deviations MUST be justified in PR descriptions.

### Living Document
This constitution is a living document. As the platform evolves, principles may be added, refined, or (rarely) removed. The version history tracks all changes and rationale.

**Version**: 1.0.0 | **Ratified**: 2026-04-19 | **Last Amended**: 2026-04-19
