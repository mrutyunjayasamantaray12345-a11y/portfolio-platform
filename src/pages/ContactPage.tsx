import { Typography, Form, Input, Button, Card, message } from 'antd'
import { MailOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { supabase } from '@/shared/lib/supabase'

const { Title, Paragraph } = Typography
const { TextArea } = Input

export function ContactPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
        honeypot: values.website || null,
      })

      if (error) throw error

      message.success('Message sent successfully! I\'ll get back to you soon.')
      form.resetFields()
    } catch (error) {
      console.error('Error submitting contact form:', error)
      message.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Title level={1}>Get in Touch</Title>
          <Paragraph className="text-lg text-gray-600">
            Have a question or want to work together? I'd love to hear from you!
          </Paragraph>
        </div>

        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Your name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="your.email@example.com"
                size="large"
              />
            </Form.Item>

            <Form.Item name="subject" label="Subject">
              <Input placeholder="What's this about?" size="large" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <TextArea
                rows={6}
                placeholder="Your message..."
                size="large"
              />
            </Form.Item>

            <Form.Item name="website" className="hidden">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}
