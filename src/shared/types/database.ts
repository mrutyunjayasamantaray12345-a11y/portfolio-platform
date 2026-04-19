export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          cover_image: string | null
          category_id: string | null
          status: 'draft' | 'published' | 'scheduled' | 'archived'
          featured: boolean
          allow_comments: boolean
          views_count: number
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['articles']['Insert']>
      }
      portfolio_projects: {
        Row: {
          id: string
          title: string
          slug: string
          short_desc: string | null
          full_desc: string | null
          cover_image: string | null
          images: string[]
          demo_url: string | null
          repo_url: string | null
          tech_stack: string[]
          status: 'live' | 'wip' | 'archived' | 'concept'
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['portfolio_projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['portfolio_projects']['Insert']>
      }
      resume_sections: {
        Row: {
          id: string
          section_type: string
          title: string | null
          sort_order: number
          is_visible: boolean
        }
        Insert: Omit<Database['public']['Tables']['resume_sections']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['resume_sections']['Insert']>
      }
      resume_entries: {
        Row: {
          id: string
          section_id: string
          title: string
          organization: string | null
          location: string | null
          start_date: string | null
          end_date: string | null
          is_current: boolean
          description: string | null
          achievements: string[]
          sort_order: number
        }
        Insert: Omit<Database['public']['Tables']['resume_entries']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['resume_entries']['Insert']>
      }
    }
  }
}
