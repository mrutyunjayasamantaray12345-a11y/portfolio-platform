import { Typography, Spin, Button, Space, Divider, Tag } from 'antd'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase'
import { CalendarOutlined, EyeOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

const { Title, Paragraph } = Typography

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*, categories(name, slug)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()
      if (error) throw error
      return data
    },
  })

  const { data: tags } = useQuery({
    queryKey: ['article-tags', article?.id],
    queryFn: async () => {
      if (!article?.id) return []
      const { data, error } = await supabase
        .from('article_tags')
        .select('tags(name, slug)')
        .eq('article_id', article.id)
      if (error) throw error
      return data.map(item => item.tags)
    },
    enabled: !!article?.id,
  })

  useEffect(() => {
    if (article?.id) {
      supabase
        .from('articles')
        .update({ views_count: (article.views_count || 0) + 1 })
        .eq('id', article.id)
        .then()
    }
  }, [article?.id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Spin size="large" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Title level={2}>Article not found</Title>
        <Link to="/blog">
          <Button type="primary">Back to Blog</Button>
        </Link>
      </div>
    )
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog">
          <Button type="text" icon={<ArrowLeftOutlined />} className="mb-4">
            Back to Blog
          </Button>
        </Link>

        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <Title level={1} className="mb-4">
          {article.title}
        </Title>

        <Space split={<Divider type="vertical" />} className="mb-6 text-gray-600">
          <span>
            <CalendarOutlined className="mr-2" />
            {new Date(article.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span>
            <EyeOutlined className="mr-2" />
            {article.views_count} views
          </span>
          {article.categories && (
            <Link to={`/blog?category=${article.categories.slug}`}>
              <Tag color="blue">{article.categories.name}</Tag>
            </Link>
          )}
        </Space>

        {article.excerpt && (
          <Paragraph className="text-lg text-gray-700 mb-8">
            {article.excerpt}
          </Paragraph>
        )}

        <Divider />

        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: article.content || '' }}
        />

        {tags && tags.length > 0 && (
          <div className="mt-8">
            <Space size="small" wrap>
              {tags.map((tag: any) => (
                <Tag key={tag.slug}>{tag.name}</Tag>
              ))}
            </Space>
          </div>
        )}

        <Divider />

        <div className="text-center">
          <Link to="/blog">
            <Button type="primary" size="large">
              Read More Articles
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
