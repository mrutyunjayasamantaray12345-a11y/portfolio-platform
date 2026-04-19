# Data Model

**Feature**: Personal Portfolio Platform
**Date**: 2026-04-19
**Status**: Completed

## Overview

This document defines the complete data model for the Personal Portfolio Platform, including all entities, attributes, relationships, validation rules, and state transitions.

---

## Entity Definitions

### 1. Admin Profile

**Purpose**: Represents the site owner with personal information and settings.

**Attributes**:
- `id` (UUID, PK): References auth.users, single admin user
- `full_name` (TEXT): Display name
- `bio` (TEXT): Professional bio/about text
- `tagline` (TEXT): Short tagline/headline
- `avatar_url` (TEXT): Profile picture URL
- `cover_url` (TEXT): Cover/banner image URL
- `email` (TEXT): Contact email
- `phone` (TEXT): Contact phone number
- `location` (TEXT): City, country
- `website_url` (TEXT): Personal website URL
- `github_url` (TEXT): GitHub profile URL
- `linkedin_url` (TEXT): LinkedIn profile URL
- `twitter_url` (TEXT): Twitter/X profile URL
- `youtube_url` (TEXT): YouTube channel URL
- `instagram_url` (TEXT): Instagram profile URL
- `availability` (ENUM): 'open', 'freelance', 'unavailable'
- `created_at` (TIMESTAMPTZ): Record creation timestamp
- `updated_at` (TIMESTAMPTZ): Last update timestamp

**Relationships**:
- One-to-one with auth.users
- Referenced by audit_logs for admin actions

**Validation Rules**:
- Email must be valid format
- URLs must be valid format
- Availability must be one of defined enum values

**State Transitions**: None (static profile data)

---

### 2. Article

**Purpose**: Represents a blog post with content, metadata, and SEO fields.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `title` (TEXT, NOT NULL): Article title
- `slug` (TEXT, UNIQUE, NOT NULL): URL-friendly slug
- `excerpt` (TEXT): Short summary
- `content` (TEXT): Full article content (rich text/markdown)
- `cover_image` (TEXT): Cover image URL
- `category_id` (UUID, FK): References categories
- `status` (ENUM): 'draft', 'published', 'scheduled', 'archived'
- `featured` (BOOLEAN, DEFAULT false): Featured article flag
- `allow_comments` (BOOLEAN, DEFAULT true): Enable comments
- `views_count` (INTEGER, DEFAULT 0): View counter
- `likes_count` (INTEGER, DEFAULT 0): Like counter
- `read_time_mins` (INTEGER): Estimated reading time
- `seo_title` (TEXT): SEO meta title
- `seo_description` (TEXT): SEO meta description
- `seo_keywords` (TEXT[]): SEO keywords array
- `og_image` (TEXT): Open Graph image URL
- `canonical_url` (TEXT): Canonical URL for SEO
- `schema_markup` (JSONB): Schema.org structured data
- `gsc_indexed` (BOOLEAN, DEFAULT false): Google Search Console indexed flag
- `gsc_last_pinged` (TIMESTAMPTZ): Last Indexing API submission
- `published_at` (TIMESTAMPTZ): Publication timestamp
- `scheduled_at` (TIMESTAMPTZ): Scheduled publication time
- `created_at` (TIMESTAMPTZ): Record creation timestamp
- `updated_at` (TIMESTAMPTZ): Last update timestamp

**Relationships**:
- Many-to-one with categories
- Many-to-many with tags (via article_tags junction)
- One-to-many with comments

**Validation Rules**:
- Title required, max 200 characters
- Slug required, unique, lowercase, alphanumeric + hyphens
- Status must be one of defined enum values
- Published_at required when status = 'published'
- Scheduled_at required when status = 'scheduled'
- SEO title max 60 characters
- SEO description max 160 characters

**State Transitions**:
```
draft → published (manual publish)
draft → scheduled (set scheduled_at)
scheduled → published (automatic at scheduled_at)
published → archived (manual archive)
archived → published (manual restore)
```

---

### 3. Category

**Purpose**: Represents a blog category for organizing articles.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `name` (TEXT, UNIQUE): Category name
- `slug` (TEXT, UNIQUE): URL-friendly slug
- `description` (TEXT): Category description
- `icon` (TEXT): Icon identifier or URL
- `color` (TEXT): Hex color code
- `parent_id` (UUID, FK): Self-referential for hierarchical categories
- `sort_order` (INTEGER): Display order
- `is_active` (BOOLEAN, DEFAULT true): Active flag

**Relationships**:
- Self-referential (parent-child hierarchy)
- One-to-many with articles

**Validation Rules**:
- Name required, unique
- Slug required, unique, lowercase, alphanumeric + hyphens
- Color must be valid hex code (#RRGGBB)
- Parent_id must reference existing category (no circular references)

**State Transitions**: None (active/inactive toggle only)

---

### 4. Tag

**Purpose**: Represents a blog tag for flexible article categorization.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `name` (TEXT, UNIQUE): Tag name
- `slug` (TEXT, UNIQUE): URL-friendly slug
- `color` (TEXT): Hex color code

**Relationships**:
- Many-to-many with articles (via article_tags junction)

**Validation Rules**:
- Name required, unique
- Slug required, unique, lowercase, alphanumeric + hyphens
- Color must be valid hex code (#RRGGBB)

**State Transitions**: None

---

### 5. Article Tags (Junction Table)

**Purpose**: Many-to-many relationship between articles and tags.

**Attributes**:
- `article_id` (UUID, FK): References articles
- `tag_id` (UUID, FK): References tags
- PRIMARY KEY (article_id, tag_id)

**Relationships**:
- Many-to-one with articles
- Many-to-one with tags

**Validation Rules**:
- Both foreign keys required
- Unique combination of article_id and tag_id

**State Transitions**: None

---

### 6. Portfolio Project

**Purpose**: Represents a work sample or project in the portfolio.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `title` (TEXT, NOT NULL): Project title
- `slug` (TEXT, UNIQUE): URL-friendly slug
- `short_desc` (TEXT): Short description
- `full_desc` (TEXT): Full project description
- `cover_image` (TEXT): Cover image URL
- `images` (TEXT[]): Array of image URLs
- `demo_url` (TEXT): Live demo URL
- `repo_url` (TEXT): Source code repository URL
- `case_study_url` (TEXT): Case study URL
- `tech_stack` (TEXT[]): Technologies used
- `category` (TEXT): Project category
- `project_type` (ENUM): 'web', 'mobile', 'design', 'oss', 'client', 'personal'
- `status` (ENUM): 'live', 'wip', 'archived', 'concept'
- `featured` (BOOLEAN, DEFAULT false): Featured project flag
- `pinned` (BOOLEAN, DEFAULT false): Pinned to top flag
- `client_name` (TEXT): Client name (if applicable)
- `client_url` (TEXT): Client website URL
- `start_date` (DATE): Project start date
- `end_date` (DATE): Project end date
- `sort_order` (INTEGER): Display order
- `metrics` (JSONB): Project metrics (users, performance, etc.)
- `testimonial` (TEXT): Client testimonial
- `testimonial_by` (TEXT): Testimonial author
- `views_count` (INTEGER, DEFAULT 0): View counter
- `created_at` (TIMESTAMPTZ): Record creation timestamp
- `updated_at` (TIMESTAMPTZ): Last update timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Title required
- Slug required, unique, lowercase, alphanumeric + hyphens
- Project_type must be one of defined enum values
- Status must be one of defined enum values
- URLs must be valid format
- End_date must be after start_date

**State Transitions**:
```
concept → wip (start development)
wip → live (launch project)
live → archived (archive project)
archived → live (restore project)
```

---

### 7. Resume Section

**Purpose**: Represents a section of the resume (experience, education, skills, etc.).

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `section_type` (ENUM): 'experience', 'education', 'skills', 'certifications', 'awards', 'languages', 'publications', 'volunteering', 'courses', 'interests', 'references'
- `title` (TEXT): Section title override
- `sort_order` (INTEGER): Display order
- `is_visible` (BOOLEAN, DEFAULT true): Visibility flag

**Relationships**:
- One-to-many with resume_entries

**Validation Rules**:
- Section_type required, must be one of defined enum values
- Sort_order required for display ordering

**State Transitions**: None (visibility toggle only)

---

### 8. Resume Entry

**Purpose**: Represents an item within a resume section (job, degree, skill, etc.).

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `section_id` (UUID, FK): References resume_sections
- `title` (TEXT): Entry title (job title, degree, skill name, etc.)
- `organization` (TEXT): Company, school, institution
- `organization_url` (TEXT): Organization website URL
- `location` (TEXT): City, country
- `start_date` (DATE): Start date
- `end_date` (DATE): End date (null if current)
- `is_current` (BOOLEAN, DEFAULT false): Currently active flag
- `description` (TEXT): Entry description
- `achievements` (TEXT[]): Array of achievements/bullet points
- `tech_used` (TEXT[]): Technologies used (for experience)
- `grade` (TEXT): Grade/GPA (for education)
- `credential_url` (TEXT): Certificate/credential URL
- `level` (INTEGER): Skill level (1-5 for skills)
- `category` (TEXT): Skill category
- `icon_url` (TEXT): Icon URL
- `sort_order` (INTEGER): Display order within section
- `is_featured` (BOOLEAN, DEFAULT false): Featured entry flag

**Relationships**:
- Many-to-one with resume_sections

**Validation Rules**:
- Section_id required
- Title required
- End_date must be after start_date (if both present)
- Is_current must be true if end_date is null
- Level must be 1-5 (for skills section)

**State Transitions**: None

---

### 9. App

**Purpose**: Represents a micro-app in the apps hub.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `name` (TEXT, NOT NULL): App name
- `slug` (TEXT, UNIQUE): URL-friendly slug
- `description` (TEXT): Short description
- `long_desc` (TEXT): Full description
- `icon_url` (TEXT): App icon URL
- `cover_image` (TEXT): Cover image URL
- `app_url` (TEXT): App URL (internal or external)
- `repo_url` (TEXT): Source code repository URL
- `tech_stack` (TEXT[]): Technologies used
- `category` (TEXT): App category
- `status` (ENUM): 'live', 'beta', 'wip', 'archived'
- `is_internal` (BOOLEAN): Internal vs external app flag
- `featured` (BOOLEAN, DEFAULT false): Featured app flag
- `sort_order` (INTEGER): Display order
- `launch_date` (DATE): Launch date
- `platform` (TEXT[]): Platforms (web, ios, android, desktop)
- `screenshots` (TEXT[]): Array of screenshot URLs
- `changelog` (JSONB): Version changelog

**Relationships**: None (standalone entity)

**Validation Rules**:
- Name required
- Slug required, unique, lowercase, alphanumeric + hyphens
- Status must be one of defined enum values
- App_url required if is_internal = false

**State Transitions**:
```
wip → beta (beta release)
beta → live (public release)
live → archived (archive app)
archived → live (restore app)
```

---

### 10. Comment

**Purpose**: Represents a visitor comment on content (blog articles, portfolio, apps).

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `content_type` (ENUM): 'article', 'portfolio', 'app'
- `content_id` (UUID): References content (article_id, project_id, app_id)
- `guest_name` (TEXT, NOT NULL): Commenter name
- `guest_email` (TEXT): Commenter email
- `body` (TEXT, NOT NULL): Comment text
- `parent_id` (UUID, FK): Self-referential for replies
- `status` (ENUM): 'published', 'spam', 'deleted'
- `spam_score` (FLOAT): Spam detection score (0-1)
- `ip_address` (TEXT): Commenter IP address (hashed)
- `user_agent` (TEXT): Browser user agent
- `likes_count` (INTEGER, DEFAULT 0): Like counter
- `created_at` (TIMESTAMPTZ): Record creation timestamp

**Relationships**:
- Self-referential (parent-child for replies)
- Polymorphic relationship with articles, portfolio_projects, apps

**Validation Rules**:
- Content_type required, must be one of defined enum values
- Content_id required
- Guest_name required
- Body required, max 2000 characters
- Status must be one of defined enum values
- Spam_score must be 0-1

**State Transitions**:
```
published (auto-approved on creation)
published → spam (admin marks as spam or spam filter detects)
published → deleted (admin deletes)
spam → published (admin restores)
```

---

### 11. Contact Submission

**Purpose**: Represents a contact form submission from a visitor.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `name` (TEXT): Submitter name
- `email` (TEXT): Submitter email
- `subject` (TEXT): Message subject
- `message` (TEXT): Message body
- `budget` (TEXT): Project budget (optional)
- `project_type` (TEXT): Project type (optional)
- `status` (ENUM): 'new', 'read', 'replied', 'archived'
- `ip_address` (TEXT): Submitter IP address (hashed)
- `source_page` (TEXT): Page where form was submitted
- `utm_source` (TEXT): UTM source parameter
- `utm_medium` (TEXT): UTM medium parameter
- `utm_campaign` (TEXT): UTM campaign parameter
- `replied_at` (TIMESTAMPTZ): Reply timestamp
- `created_at` (TIMESTAMPTZ): Record creation timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Email required, valid format
- Message required, max 5000 characters
- Status must be one of defined enum values

**State Transitions**:
```
new (on creation)
new → read (admin views)
read → replied (admin replies)
replied → archived (admin archives)
archived → read (admin restores)
```

---

### 12. Newsletter Subscriber

**Purpose**: Represents an email subscriber to the newsletter.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `email` (TEXT, UNIQUE): Subscriber email
- `name` (TEXT): Subscriber name (optional)
- `status` (ENUM): 'active', 'unsubscribed', 'bounced'
- `source` (TEXT): Subscription source
- `tags` (TEXT[]): Subscriber tags
- `subscribed_at` (TIMESTAMPTZ): Subscription timestamp
- `unsubscribed_at` (TIMESTAMPTZ): Unsubscription timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Email required, unique, valid format
- Status must be one of defined enum values

**State Transitions**:
```
active (on subscription)
active → unsubscribed (user unsubscribes)
active → bounced (email bounces)
unsubscribed → active (user re-subscribes)
```

---

### 13. Site Settings

**Purpose**: Represents configuration key-value pairs for site settings.

**Attributes**:
- `key` (TEXT, PK): Setting key
- `value` (JSONB): Setting value (flexible JSON)
- `category` (TEXT): Setting category ('general', 'seo', 'adsense', 'ga4', 'gsc', 'legal', 'social')
- `updated_at` (TIMESTAMPTZ): Last update timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Key required, unique
- Category must be one of defined values
- Value must be valid JSON

**State Transitions**: None

---

### 14. Integration Config

**Purpose**: Represents external service connections and their configuration.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `service` (TEXT, UNIQUE): Service name ('ga4', 'gsc', 'adsense', 'sendgrid', 'recaptcha', 'upstash')
- `is_connected` (BOOLEAN, DEFAULT false): Connection status
- `config` (JSONB): Service-specific configuration
- `status` (TEXT): 'active', 'error', 'pending', 'not_configured'
- `last_verified` (TIMESTAMPTZ): Last verification timestamp
- `last_error` (TEXT): Last error message
- `created_at` (TIMESTAMPTZ): Record creation timestamp
- `updated_at` (TIMESTAMPTZ): Last update timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Service required, unique
- Config must be valid JSON
- Status must be one of defined values

**State Transitions**:
```
not_configured → pending (admin starts setup)
pending → active (verification succeeds)
pending → error (verification fails)
active → error (connection fails)
error → active (reconnection succeeds)
```

---

### 15. Ad Placement

**Purpose**: Represents an AdSense ad unit configuration.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `name` (TEXT): Placement name
- `slot_id` (TEXT): AdSense slot ID
- `placement` (TEXT): Position ('in-article-1', 'in-article-2', 'below-article', 'sidebar', 'header', 'mobile-sticky')
- `ad_format` (TEXT): Ad format
- `is_active` (BOOLEAN, DEFAULT true): Active flag
- `page_targets` (TEXT[]): Target pages
- `content_targets` (TEXT[]): Target content types
- `ab_variant` (TEXT): A/B test variant
- `impressions` (INTEGER, DEFAULT 0): Impression counter
- `revenue_cents` (INTEGER, DEFAULT 0): Revenue in cents

**Relationships**: None (standalone entity)

**Validation Rules**:
- Name required
- Slot_id required
- Placement must be one of defined values

**State Transitions**: None (active/inactive toggle only)

---

### 16. Media Asset

**Purpose**: Represents uploaded files with metadata.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `filename` (TEXT): Stored filename
- `original_name` (TEXT): Original filename
- `file_type` (TEXT): File type (image, video, document)
- `mime_type` (TEXT): MIME type
- `size_bytes` (INTEGER): File size in bytes
- `url` (TEXT): Public URL
- `thumbnail_url` (TEXT): Thumbnail URL
- `width` (INTEGER): Image width (if image)
- `height` (INTEGER): Image height (if image)
- `alt_text` (TEXT): Alt text for accessibility
- `caption` (TEXT): Image caption
- `tags` (TEXT[]): Asset tags
- `folder` (TEXT): Organization folder
- `used_in` (JSONB): Usage tracking (articles, projects, etc.)
- `created_at` (TIMESTAMPTZ): Upload timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Filename required, unique
- File_type required
- Size_bytes max 5MB (5,242,880 bytes)
- URL required

**State Transitions**: None

---

### 17. Notification

**Purpose**: Represents admin notifications for events.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `type` (TEXT): Notification type ('new_comment', 'new_contact', 'new_subscriber', 'gsc_error', 'indexing_fail')
- `title` (TEXT): Notification title
- `body` (TEXT): Notification body
- `action_url` (TEXT): Action URL
- `is_read` (BOOLEAN, DEFAULT false): Read flag
- `created_at` (TIMESTAMPTZ): Creation timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Type required
- Title required

**State Transitions**:
```
unread (on creation)
unread → read (admin views)
```

---

### 18. Redirect

**Purpose**: Represents URL redirects for SEO and migration.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `from_path` (TEXT, UNIQUE): Source path
- `to_path` (TEXT): Destination path
- `status_code` (INTEGER, DEFAULT 301): HTTP status code
- `is_active` (BOOLEAN, DEFAULT true): Active flag
- `hit_count` (INTEGER, DEFAULT 0): Usage counter

**Relationships**: None (standalone entity)

**Validation Rules**:
- From_path required, unique
- To_path required
- Status_code must be 301, 302, 307, or 308

**State Transitions**: None (active/inactive toggle only)

---

### 19. Audit Log

**Purpose**: Represents admin action audit trail.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `action` (TEXT): Action performed
- `resource_type` (TEXT): Resource type (article, project, etc.)
- `resource_id` (UUID): Resource identifier
- `old_value` (JSONB): Previous value
- `new_value` (JSONB): New value
- `ip_address` (TEXT): Admin IP address
- `created_at` (TIMESTAMPTZ): Action timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Action required
- Resource_type required

**State Transitions**: None (append-only log)

---

### 20. Feature Flag

**Purpose**: Represents toggleable platform features.

**Attributes**:
- `key` (TEXT, PK): Feature key ('blog', 'portfolio', 'apps_hub', 'newsletter', 'comments', 'adsense')
- `is_enabled` (BOOLEAN, DEFAULT true): Enabled flag
- `label` (TEXT): Display label
- `description` (TEXT): Feature description
- `updated_at` (TIMESTAMPTZ): Last update timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Key required, unique
- Label required

**State Transitions**: None (enabled/disabled toggle only)

---

### 21. Legal Page

**Purpose**: Represents editable legal documents.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `page_type` (TEXT, UNIQUE): Page type ('privacy', 'terms', 'cookie_policy', 'disclaimer', 'dmca')
- `title` (TEXT): Page title
- `content` (TEXT): Page content (rich text)
- `last_updated` (DATE): Last update date
- `is_published` (BOOLEAN, DEFAULT true): Published flag
- `updated_at` (TIMESTAMPTZ): Last update timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Page_type required, unique, must be one of defined values
- Title required
- Content required

**State Transitions**: None (published/unpublished toggle only)

---

### 22. GSC Data Cache

**Purpose**: Caches Google Search Console data for admin dashboard.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `data_type` (TEXT): Data type ('queries', 'pages', 'indexing', 'vitals', 'coverage')
- `date_range` (TEXT): Date range ('7d', '28d', '90d')
- `payload` (JSONB): Cached data
- `fetched_at` (TIMESTAMPTZ): Fetch timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Data_type required
- Date_range required
- Payload must be valid JSON
- Fetched_at must be within 90 days (auto-delete older)

**State Transitions**: None (cache refresh only)

---

### 23. GA4 Data Cache

**Purpose**: Caches Google Analytics 4 data for admin dashboard.

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `report_type` (TEXT): Report type ('overview', 'realtime', 'pages', 'audience', 'events')
- `date_range` (TEXT): Date range ('7d', '28d', '90d')
- `payload` (JSONB): Cached data
- `fetched_at` (TIMESTAMPTZ): Fetch timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Report_type required
- Date_range required
- Payload must be valid JSON
- Fetched_at must be within 90 days (auto-delete older)

**State Transitions**: None (cache refresh only)

---

### 24. Page View

**Purpose**: Tracks page views for analytics (optional, can use GA4 only).

**Attributes**:
- `id` (UUID, PK): Unique identifier
- `page_path` (TEXT): Page path
- `page_title` (TEXT): Page title
- `referrer` (TEXT): Referrer URL
- `user_agent` (TEXT): Browser user agent
- `ip_hash` (TEXT): Hashed IP address
- `country` (TEXT): Country code
- `device_type` (TEXT): Device type (mobile, tablet, desktop)
- `session_id` (TEXT): Session identifier
- `duration_secs` (INTEGER): Time on page
- `created_at` (TIMESTAMPTZ): View timestamp

**Relationships**: None (standalone entity)

**Validation Rules**:
- Page_path required
- Created_at required

**State Transitions**: None (append-only log)

---

## Entity Relationship Diagram

```
admin_profile (1) ──────────────────────────────────────────────────────────┐
                                                                             │
                                                                             │
categories (1) ────< articles (M) >──── article_tags (M) >──── tags (M)    │
     │                    │                                                  │
     │ (self-ref)         │                                                  │
     │                    │                                                  │
     └────────────────────┴──────────────< comments (M)                     │
                                                                             │
portfolio_projects (1) ────────────────< comments (M)                       │
                                                                             │
apps_hub (1) ──────────────────────────< comments (M)                       │
                                                                             │
resume_sections (1) ────< resume_entries (M)                                │
                                                                             │
contact_submissions (standalone)                                            │
newsletter_subscribers (standalone)                                         │
site_settings (standalone)                                                  │
integration_config (standalone)                                             │
ad_placements (standalone)                                                  │
media_assets (standalone)                                                   │
notifications (standalone) ─────────────────────────────────────────────────┤
redirects (standalone)                                                      │
audit_logs (standalone) ────────────────────────────────────────────────────┤
feature_flags (standalone)                                                  │
legal_pages (standalone)                                                    │
gsc_data_cache (standalone)                                                 │
ga4_data_cache (standalone)                                                 │
page_views (standalone)                                                     │
                                                                             │
                                                                             │
All audit_logs reference admin_profile ──────────────────────────────────────┘
```

---

## Summary

- **24 entities** defined with complete attributes, relationships, validation rules, and state transitions
- **3 main content types**: Articles (blog), Portfolio Projects, Apps
- **Admin-only entities**: Admin Profile, Audit Logs, Notifications
- **Public interaction entities**: Comments, Contact Submissions, Newsletter Subscribers
- **Configuration entities**: Site Settings, Integration Config, Feature Flags, Legal Pages
- **Analytics entities**: GSC Data Cache, GA4 Data Cache, Page Views
- **Supporting entities**: Categories, Tags, Resume Sections/Entries, Media Assets, Ad Placements, Redirects

All entities support the constitutional principles of public-first architecture, admin-only mutation control, and data-driven decisions.
