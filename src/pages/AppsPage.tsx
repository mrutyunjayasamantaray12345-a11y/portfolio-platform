import { Typography, Card, Row, Col, Empty } from 'antd'
import { RocketOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export function AppsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <Title level={1}>
          <RocketOutlined className="mr-2" />
          Apps Hub
        </Title>
        <Paragraph className="text-lg text-gray-600">
          Useful tools and applications I've built
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} className="max-w-6xl mx-auto">
        <Col span={24}>
          <Empty
            description="Apps coming soon!"
            className="py-20"
          />
        </Col>
      </Row>
    </div>
  )
}
