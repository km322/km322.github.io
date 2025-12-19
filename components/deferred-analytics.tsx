"use client"

import { Analytics } from '@vercel/analytics/next'
import { useEffect } from 'react'

export function DeferredAnalytics() {
  useEffect(() => {
    // Analytics will load after the page has rendered
  }, [])

  return <Analytics />
}