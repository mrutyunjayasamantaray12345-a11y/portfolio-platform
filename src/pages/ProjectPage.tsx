import { Typography, Spin, Button, Space, Tag, Carousel, Divider } from 'antd'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase'
import { GithubOutlined, LinkOutlined, ArrowLeftOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('slug', slug)
        .in('status', ['live', 'wip'])
        .single()
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

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Title level={2}>Project not found</Title>
        <Link to="/portfolio">
          <Button type="primary">Back to Portfolio</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/portfolio">
          <Button type="text" icon={<ArrowLeftOutlined />} className="mb-4">
            Back to Portfolio
          </Button>
        </Link>

        <div className="flex items-center justify-between mb-6">
          <Title level={1} className="mb-0">
            {project.title}
          </Title>
          <Space>
            {project.status === 'wip' && <Tag color="orange">In Progress</Tag>}
            {project.status === 'live' && <Tag color="green">Live</Tag>}
            {project.featured && <Tag color="gold">Featured</Tag>}
          </Space>
        </div>

        {project.short_desc && (
          <Paragraph className="text-lg text-gray-700 mb-6">
            {project.short_desc}
          </Paragraph>
        )}

        <Space size="middle" className="mb-8">
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
              <Button type="primary" icon={<LinkOutlined />} size="large">
                Live Demo
              </Button>
            </a>
          )}
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
              <Button icon={<GithubOutlined />} size="large">
                View Source
              </Button>
            </a>
          )}
        </Space>

        {project.images && project.images.length > 0 && (
          <div className="mb-8">
            <Carousel autoplay>
              {project.images.map((image: string, index: number) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {project.cover_image && (!project.images || project.images.length === 0) && (
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <Divider />

        <div className="mb-8">
          <Title level={3}>About This Project</Title>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: project.full_desc || project.short_desc || '' }}
          />
        </div>

        <Divider />

        <div className="mb-8">
          <Title level={3}>Technologies Used</Title>
          <Space size="middle" wrap>
            {project.tech_stack?.map((tech: string) => (
              <Tag key={tech} color="blue" className="text-base px-4 py-2">
                {tech}
              </Tag>
            ))}
          </Space>
        </div>

        <Divider />

        <div className="text-center">
          <Link to="/portfolio">
            <Button type="primary" size="large">
              View More Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
