import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/shared/lib/supabase'

interface FeatureFlags {
  blog: boolean
  portfolio: boolean
  resume: boolean
  apps_hub: boolean
  comments: boolean
  newsletter: boolean
  contact_form: boolean
  adsense: boolean
  analytics: boolean
  mobile_apps: boolean
}

interface FeatureFlagsContextType {
  flags: FeatureFlags
  loading: boolean
  isEnabled: (key: keyof FeatureFlags) => boolean
}

const defaultFlags: FeatureFlags = {
  blog: true,
  portfolio: true,
  resume: true,
  apps_hub: true,
  comments: true,
  newsletter: true,
  contact_form: true,
  adsense: false,
  analytics: false,
  mobile_apps: false,
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined)

export function FeatureFlagsProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeatureFlags()
  }, [])

  const loadFeatureFlags = async () => {
    try {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('key, is_enabled')

      if (error) throw error

      if (data) {
        const flagsMap = data.reduce((acc, flag) => {
          acc[flag.key as keyof FeatureFlags] = flag.is_enabled
          return acc
        }, {} as Partial<FeatureFlags>)

        setFlags({ ...defaultFlags, ...flagsMap })
      }
    } catch (error) {
      console.error('Failed to load feature flags:', error)
    } finally {
      setLoading(false)
    }
  }

  const isEnabled = (key: keyof FeatureFlags) => flags[key]

  return (
    <FeatureFlagsContext.Provider value={{ flags, loading, isEnabled }}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext)
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider')
  }
  return context
}
