import { Typography, Card, Row, Col, Tag, Button, Empty, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase'
import { GithubOutlined, LinkOutlined, RocketOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export function PortfolioPage() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['portfolio-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .in('status', ['live', 'wip'])
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <Title level={1}>Portfolio</Title>
        <Paragraph className="text-lg text-gray-600">
          A collection of projects I've worked on
        </Paragraph>
      </div>

      {projects && projects.length > 0 ? (
        <Row gutter={[24, 24]} className="max-w-6xl mx-auto">
          {projects.map((project) => (
            <Col xs={24} md={12} key={project.id}>
              <Card
                hoverable
                cover={
                  project.cover_image && (
                    <img
                      alt={project.title}
                      src={project.cover_image}
                      className="h-64 object-cover"
                    />
                  )
                }
                actions={[
                  project.demo_url && (
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <Button type="text" icon={<LinkOutlined />}>
                        Live Demo
                      </Button>
                    </a>
                  ),
                  project.repo_url && (
                    <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                      <Button type="text" icon={<GithubOutlined />}>
                        Source Code
                      </Button>
                    </a>
                  ),
                  <Link to={`/portfolio/${project.slug}`}>
                    <Button type="text" icon={<RocketOutlined />}>
                      Details
                    </Button>
                  </Link>,
                ].filter(Boolean)}
              >
                <Card.Meta
                  title={
                    <div className="flex items-center justify-between">
                      <span>{project.title}</span>
                      {project.status === 'wip' && (
                        <Tag color="orange">In Progress</Tag>
                      )}
                      {project.featured && (
                        <Tag color="gold">Featured</Tag>
                      )}
                    </div>
                  }
                  description={
                    <div>
                      <Paragraph className="text-gray-600 mb-4">
                        {project.short_desc}
                      </Paragraph>
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack?.map((tech: string) => (
                          <Tag key={tech} color="blue">
                            {tech}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="No projects yet"
          className="py-20"
        />
      )}
    </div>
  )
}
