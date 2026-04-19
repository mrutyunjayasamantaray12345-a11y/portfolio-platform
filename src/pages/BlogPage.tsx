import { Typography, Card, Row, Col, Input, Select, Spin, Empty } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase'
import { SearchOutlined, CalendarOutlined, EyeOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Search } = Input

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name')
      if (error) throw error
      return data
    },
  })

  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles', searchTerm, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select('id, title, slug, excerpt, cover_image, published_at, views_count, category_id')
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory)
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <Title level={1}>Blog</Title>
        <p className="text-lg text-gray-600">
          Thoughts, tutorials, and insights on software development
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Search
              placeholder="Search articles..."
              prefix={<SearchOutlined />}
              size="large"
              allowClear
              onSearch={setSearchTerm}
              onChange={(e) => !e.target.value && setSearchTerm('')}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              placeholder="Filter by category"
              size="large"
              className="w-full"
              allowClear
              onChange={setSelectedCategory}
              options={categories?.map(cat => ({
                label: cat.name,
                value: cat.id,
              }))}
            />
          </Col>
        </Row>
      </div>

      {isLoading ? (
        <div className="text-center py-20">
          <Spin size="large" />
        </div>
      ) : articles && articles.length > 0 ? (
        <Row gutter={[24, 24]} className="max-w-6xl mx-auto">
          {articles.map((article) => (
            <Col xs={24} md={12} lg={8} key={article.id}>
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
                  className="h-full"
                >
                  <Card.Meta
                    title={<div className="line-clamp-2">{article.title}</div>}
                    description={
                      <div className="line-clamp-3 text-gray-600">
                        {article.excerpt}
                      </div>
                    }
                  />
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>
                      <CalendarOutlined className="mr-1" />
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                    <span>
                      <EyeOutlined className="mr-1" />
                      {article.views_count}
                    </span>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="No articles found"
          className="py-20"
        />
      )}
    </div>
  )
}
