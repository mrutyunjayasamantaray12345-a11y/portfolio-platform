# Portfolio Platform

A modern, full-stack personal portfolio platform built with React, Vite, Supabase, and Ant Design.

## 🚀 Features

### Public Features
- **Blog** - Publish articles with categories, tags, and SEO optimization
- **Portfolio** - Showcase projects with images, tech stack, and live demos
- **Resume** - Display professional experience, education, and skills
- **Contact Form** - Receive messages with spam protection (honeypot field)
- **Newsletter** - Collect email subscriptions
- **Apps Hub** - Feature custom web applications

### Admin Features
- **Content Management** - Create and edit blog posts, portfolio projects, and resume
- **Dashboard** - View analytics and manage content
- **Authentication** - Secure admin access with Supabase Auth
- **Feature Flags** - Toggle sections on/off dynamically

### Technical Features
- **Database** - Supabase PostgreSQL with Row Level Security (RLS)
- **Authentication** - Supabase Auth with admin role
- **Real-time** - Live updates with Supabase subscriptions
- **SEO** - Meta tags, Open Graph, and structured data
- **Mobile Apps** - iOS/Android support via Capacitor
- **Analytics** - Google Analytics 4 and Search Console integration
- **Monetization** - Google AdSense integration
- **Performance** - Optimized images, lazy loading, code splitting

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI**: Ant Design, Tailwind CSS
- **State**: TanStack Query, Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Mobile**: Capacitor 6
- **Deployment**: Vercel / Netlify

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev

# Build for production
npm run build
```

## 🗄️ Database Setup

The database schema includes 24 tables with RLS policies for public-first architecture.

## 🔐 Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Analytics 4
VITE_GA4_MEASUREMENT_ID=your_ga4_measurement_id

# Google AdSense
VITE_ADSENSE_PUBLISHER_ID=your_adsense_publisher_id
```

## 📱 Mobile Apps

Build mobile apps with Capacitor:

```bash
npx cap add ios
npx cap add android
npm run build
npx cap sync
```

## 🚀 Deployment

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

## 🔗 Links

- **Repository**: https://github.com/mrutyunjayasamantaray12345-a11y/portfolio-platform
- **Supabase Project**: https://uoyloglyjnwokejcrrac.supabase.co

## 📄 License

MIT License

---

Built with ❤️ using React, Supabase, and Ant Design
