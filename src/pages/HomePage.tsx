import { Typography, Button, Card, Row, Col, Space } from 'antd'
import { Link } from 'react-router-dom'
import { RocketOutlined, ReadOutlined, ProjectOutlined, FileTextOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase'

const { Title, Paragraph } = Typography

export function HomePage() {
  const { data: profile } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_profile')
        .select('*')
        .single()
      if (error) throw error
      return data
    },
  })

  const { data: featuredArticles } = useQuery({
    queryKey: ['featured-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, cover_image, published_at')
        .eq('status', 'published')
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(3)
      if (error) throw error
      return data
    },
  })

  const { data: featuredProjects } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('id, title, slug, short_desc, cover_image, tech_stack')
        .in('status', ['live', 'wip'])
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3)
      if (error) throw error
      return data
    },
  })

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <Title level={1} className="text-5xl md:text-6xl font-bold mb-4">
            {profile?.full_name || 'Your Name'}
          </Title>
          <Title level={2} className="text-2xl md:text-3xl text-gray-600 font-normal mb-6">
            {profile?.tagline || 'Developer & Creator'}
          </Title>
          <Paragraph className="text-lg text-gray-700 mb-8">
            {profile?.bio || 'Passionate about building great software and sharing knowledge through writing.'}
          </Paragraph>
          <Space size="large">
            <Link to="/portfolio">
              <Button type="primary" size="large" icon={<ProjectOutlined />}>
                View Portfolio
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="large" icon={<RocketOutlined />}>
                Get in Touch
              </Button>
            </Link>
          </Space>
        </div>
      </section>

      {featuredArticles && featuredArticles.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <Title level={2} className="text-center mb-8">
            <ReadOutlined className="mr-2" />
            Featured Articles
          </Title>
          <Row gutter={[24, 24]}>
            {featuredArticles.map((article) => (
              <Col xs={24} md={8} key={article.id}>
                <Link to={`/blog/${article.slug}`}>
                  <Card
                    hoverable
                    cover={
                      article.cover_image && (
                        <img
                          alt={article.title}
                          src={article.cover_image}
                          className="h-48 object-cover"
                        />
                      )
                    }
                  >
                    <Card.Meta
                      title={article.title}
                      description={article.excerpt}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-8">
            <Link to="/blog">
              <Button type="link" size="large">
                View All Articles →
              </Button>
            </Link>
          </div>
        </section>
      )}

      {featuredProjects && featuredProjects.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-gray-50">
          <Title level={2} className="text-center mb-8">
            <ProjectOutlined className="mr-2" />
            Featured Projects
          </Title>
          <Row gutter={[24, 24]}>
            {featuredProjects.map((project) => (
              <Col xs={24} md={8} key={project.id}>
                <Link to={`/portfolio/${project.slug}`}>
                  <Card
                    hoverable
                    cover={
                      project.cover_image && (
                        <img
                          alt={project.title}
                          src={project.cover_image}
                          className="h-48 object-cover"
                        />
                      )
                    }
                  >
                    <Card.Meta
                      title={project.title}
                      description={project.short_desc}
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech_stack?.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-8">
            <Link to="/portfolio">
              <Button type="link" size="large">
                View All Projects →
              </Button>
            </Link>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-16 text-center">
        <Title level={2} className="mb-4">Ready to work together?</Title>
        <Paragraph className="text-lg text-gray-700 mb-8">
          I'm always open to discussing new projects and opportunities.
        </Paragraph>
        <Link to="/contact">
          <Button type="primary" size="large" icon={<RocketOutlined />}>
            Let's Talk
          </Button>
        </Link>
      </section>
    </div>
  )
}
