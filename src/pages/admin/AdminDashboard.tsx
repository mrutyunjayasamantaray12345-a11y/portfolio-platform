import { Layout, Menu, Button, Typography } from 'antd'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '@/app/providers/AuthProvider'
import {
  DashboardOutlined,
  FileTextOutlined,
  ProjectOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export function AdminDashboard() {
  const { user, signOut, isAdmin } = useAuth()
  const navigate = useNavigate()

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="p-4 text-white text-center">
          <Title level={4} className="text-white mb-0">
            Admin Panel
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: <Link to="/admin">Dashboard</Link>,
            },
            {
              key: 'articles',
              icon: <FileTextOutlined />,
              label: <Link to="/admin/articles">Articles</Link>,
            },
            {
              key: 'projects',
              icon: <ProjectOutlined />,
              label: <Link to="/admin/projects">Projects</Link>,
            },
            {
              key: 'profile',
              icon: <UserOutlined />,
              label: <Link to="/admin/profile">Profile</Link>,
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: <Link to="/admin/settings">Settings</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-6 flex items-center justify-between shadow">
          <Title level={4} className="mb-0">
            Dashboard
          </Title>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content className="m-6">
          <div className="bg-white p-6 rounded-lg min-h-full">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="articles" element={<div>Articles Management</div>} />
              <Route path="projects" element={<div>Projects Management</div>} />
              <Route path="profile" element={<div>Profile Settings</div>} />
              <Route path="settings" element={<div>Site Settings</div>} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

function DashboardHome() {
  return (
    <div>
      <Title level={2}>Welcome to Admin Dashboard</Title>
      <p>Manage your portfolio content from here.</p>
    </div>
  )
}
