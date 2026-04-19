import { Typography, Form, Input, Button, Card, message, Divider } from 'antd'
import { LockOutlined, MailOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/app/providers/AuthProvider'

const { Title } = Typography

export function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth()
  const navigate = useNavigate()

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    try {
      const { error } = await signIn(values.email, values.password)
      if (error) throw error

      message.success('Login successful!')
      navigate('/admin')
    } catch (error: any) {
      message.error(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
    } catch (error: any) {
      message.error(error.message || 'Google login failed.')
      setLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setLoading(true)
    try {
      const { error } = await signInWithGithub()
      if (error) throw error
    } catch (error: any) {
      message.error(error.message || 'GitHub login failed.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Admin Login</Title>
        </div>

        <div className="space-y-3 mb-6">
          <Button
            type="default"
            icon={<GoogleOutlined />}
            size="large"
            block
            onClick={handleGoogleLogin}
            loading={loading}
          >
            Continue with Google
          </Button>
          <Button
            type="default"
            icon={<GithubOutlined />}
            size="large"
            block
            onClick={handleGithubLogin}
            loading={loading}
          >
            Continue with GitHub
          </Button>
        </div>

        <Divider>Or sign in with email</Divider>

        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
