import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { AuthProvider } from './app/providers/AuthProvider'
import { FeatureFlagsProvider } from './app/providers/FeatureFlagsProvider'
import { QueryProvider } from './app/providers/QueryProvider'
import { MainLayout } from './app/layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { ArticlePage } from './pages/ArticlePage'
import { PortfolioPage } from './pages/PortfolioPage'
import { ProjectPage } from './pages/ProjectPage'
import { ResumePage } from './pages/ResumePage'
import { AppsPage } from './pages/AppsPage'
import { ContactPage } from './pages/ContactPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <QueryProvider>
        <AuthProvider>
          <FeatureFlagsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="blog" element={<BlogPage />} />
                  <Route path="blog/:slug" element={<ArticlePage />} />
                  <Route path="portfolio" element={<PortfolioPage />} />
                  <Route path="portfolio/:slug" element={<ProjectPage />} />
                  <Route path="resume" element={<ResumePage />} />
                  <Route path="apps" element={<AppsPage />} />
                  <Route path="contact" element={<ContactPage />} />
                </Route>
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Routes>
            </BrowserRouter>
          </FeatureFlagsProvider>
        </AuthProvider>
      </QueryProvider>
    </ConfigProvider>
  )
}

export default App
