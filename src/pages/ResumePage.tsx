import { Typography, Card, Timeline, Tag, Button, Spin, Empty } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase'
import { DownloadOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export function ResumePage() {
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

  const { data: sections, isLoading } = useQuery({
    queryKey: ['resume-sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resume_sections')
        .select('*, resume_entries(*)')
        .eq('is_visible', true)
        .order('sort_order')
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg mb-8">
          <Title level={1} className="text-white mb-2">
            {profile?.full_name || 'Your Name'}
          </Title>
          <Paragraph className="text-white text-lg mb-4">
            {profile?.tagline || 'Developer & Creator'}
          </Paragraph>
          <div className="flex flex-wrap gap-4 text-white">
            {profile?.email && (
              <span>
                <MailOutlined className="mr-2" />
                {profile.email}
              </span>
            )}
            {profile?.phone && (
              <span>
                <PhoneOutlined className="mr-2" />
                {profile.phone}
              </span>
            )}
            {profile?.location && (
              <span>
                <EnvironmentOutlined className="mr-2" />
                {profile.location}
              </span>
            )}
          </div>
          <div className="mt-4">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size="large"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Download PDF
            </Button>
          </div>
        </div>

        {profile?.bio && (
          <Card className="mb-8">
            <Title level={3}>About Me</Title>
            <Paragraph className="text-gray-700">{profile.bio}</Paragraph>
          </Card>
        )}

        {sections && sections.length > 0 ? (
          sections.map((section) => (
            <Card key={section.id} className="mb-8">
              <Title level={3}>{section.title || section.section_type}</Title>
              {section.resume_entries && section.resume_entries.length > 0 ? (
                <Timeline
                  items={section.resume_entries
                    .sort((a: any, b: any) => a.sort_order - b.sort_order)
                    .map((entry: any) => ({
                      children: (
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Title level={4} className="mb-1">
                                {entry.title}
                              </Title>
                              {entry.organization && (
                                <Paragraph className="text-gray-600 mb-1">
                                  {entry.organization}
                                  {entry.location && ` • ${entry.location}`}
                                </Paragraph>
                              )}
                            </div>
                            <Tag color="blue">
                              {entry.start_date && new Date(entry.start_date).getFullYear()}
                              {' - '}
                              {entry.is_current
                                ? 'Present'
                                : entry.end_date && new Date(entry.end_date).getFullYear()}
                            </Tag>
                          </div>
                          {entry.description && (
                            <Paragraph className="text-gray-700 mb-2">
                              {entry.description}
                            </Paragraph>
                          )}
                          {entry.achievements && entry.achievements.length > 0 && (
                            <ul className="list-disc list-inside text-gray-700">
                              {entry.achievements.map((achievement: string, idx: number) => (
                                <li key={idx}>{achievement}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ),
                    }))}
                />
              ) : (
                <Empty description="No entries yet" />
              )}
            </Card>
          ))
        ) : (
          <Empty description="No resume sections available" className="py-20" />
        )}
      </div>
    </div>
  )
}
