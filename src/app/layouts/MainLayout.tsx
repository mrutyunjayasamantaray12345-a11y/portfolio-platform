import { Layout, Menu, Button, Drawer } from 'antd'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  HomeOutlined,
  ReadOutlined,
  ProjectOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  MailOutlined,
  MenuOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from '@ant-design/icons'
import { useFeatureFlags } from '../providers/FeatureFlagsProvider'

const { Header, Content, Footer } = Layout

export function MainLayout() {
  const location = useLocation()
  const { flags } = useFeatureFlags()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { key: '/', label: 'Home', icon: <HomeOutlined />, show: true },
    { key: '/blog', label: 'Blog', icon: <ReadOutlined />, show: flags.blog },
    { key: '/portfolio', label: 'Portfolio', icon: <ProjectOutlined />, show: flags.portfolio },
    { key: '/resume', label: 'Resume', icon: <FileTextOutlined />, show: flags.resume },
    { key: '/apps', label: 'Apps', icon: <AppstoreOutlined />, show: flags.apps_hub },
    { key: '/contact', label: 'Contact', icon: <MailOutlined />, show: flags.contact_form },
  ].filter(item => item.show)

  return (
    <Layout className="min-h-screen">
      <Header className="fixed top-0 z-50 w-full bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-primary">
            Portfolio
          </Link>

          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            className="hidden md:flex flex-1 justify-end border-0"
            items={menuItems.map(item => ({
              key: item.key,
              label: <Link to={item.key}>{item.label}</Link>,
              icon: item.icon,
            }))}
          />

          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden"
          />
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          onClick={() => setMobileMenuOpen(false)}
          items={menuItems.map(item => ({
            key: item.key,
            label: <Link to={item.key}>{item.label}</Link>,
            icon: item.icon,
          }))}
        />
      </Drawer>

      <Content className="mt-16">
        <Outlet />
      </Content>

      <Footer className="bg-gray-50 text-center">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center gap-4 mb-4">
            <Button
              type="text"
              icon={<GithubOutlined />}
              href="https://github.com"
              target="_blank"
              size="large"
            />
            <Button
              type="text"
              icon={<LinkedinOutlined />}
              href="https://linkedin.com"
              target="_blank"
              size="large"
            />
            <Button
              type="text"
              icon={<TwitterOutlined />}
              href="https://twitter.com"
              target="_blank"
              size="large"
            />
          </div>
          <p className="text-gray-600">
            © {new Date().getFullYear()} Personal Portfolio. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="text-gray-600 hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </Footer>
    </Layout>
  )
}
