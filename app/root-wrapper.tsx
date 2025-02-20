'use client'

import { useEffect, useState } from 'react'
import { DesktopLayout } from "./desktop-layout"
import { MobileLayout } from "./mobile-layout"
import { prompts } from '@/lib/data/default-prompts'

export default function RootWrapper() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if prompts are initialized in localStorage
    const storedConfig = localStorage.getItem('prompt-config')
    if (!storedConfig) {
      localStorage.setItem('prompt-config', JSON.stringify({ defaultCollapsed: true }))
      localStorage.setItem('prompts', JSON.stringify(prompts))
    }
    setIsInitialized(true)
  }, [])

  if (!isInitialized) {
    return null // Or a loading spinner
  }

  return (
    <div className="h-screen">
      <div className="hidden md:block">
        <DesktopLayout defaultCollapsed={undefined} navCollapsedSize={4} />
      </div>
      <div className="md:hidden">
        <MobileLayout />
      </div>
    </div>
  )
} 