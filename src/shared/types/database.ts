export interface Database {
  public: {
    Tables: {
      admin_profile: {
        Row: {
          id: string
          full_name: string
          bio: string | null
          tagline: string | null
          avatar_url: string | null
          cover_url: string | null
          email: string | null
          phone: string | null
          location: string | null
          website_url: string | null
          github_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          availability: 'open' | 'freelance' | 'unavailable'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['admin_profile']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['admin_profile']['Insert']>
      }
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
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tags']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tags']['Insert']>
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
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          honeypot: string | null
          status: 'new' | 'read' | 'replied' | 'archived' | 'spam'
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_submissions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          status: 'pending' | 'active' | 'unsubscribed' | 'bounced'
          subscribed_at: string
          unsubscribed_at: string | null
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['newsletter_subscribers']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>
      }
      feature_flags: {
        Row: {
          key: string
          is_enabled: boolean
          description: string | null
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['feature_flags']['Row'], 'updated_at'>
        Update: Partial<Database['public']['Tables']['feature_flags']['Insert']>
      }
    }
  }
}

