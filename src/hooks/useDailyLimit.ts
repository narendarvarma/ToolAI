'use client'

import { useState, useEffect } from 'react'

// ✅ ONE shared key for ALL AI tools
const SHARED_KEY = 'daily_usage_all_ai_tools'
const SHARED_LIMIT = 5

export function useDailyLimit(
  _toolKey?: string,   // kept for compatibility but ignored
  _limit?: number      // kept for compatibility but ignored
) {
  const [used, setUsed]       = useState(0)
  const [remaining, setRemaining] = useState(SHARED_LIMIT)
  const [loaded, setLoaded]   = useState(false)

  useEffect(() => {
    const today  = new Date().toDateString()
    const stored = localStorage.getItem(SHARED_KEY)
    const parsed = stored ? JSON.parse(stored) : null

    if (parsed && parsed.date === today) {
      setUsed(parsed.count)
      setRemaining(Math.max(0, SHARED_LIMIT - parsed.count))
    } else {
      // New day — reset
      localStorage.setItem(SHARED_KEY, JSON.stringify({ date: today, count: 0 }))
      setUsed(0)
      setRemaining(SHARED_LIMIT)
    }
    setLoaded(true)
  }, [])

  const increment = () => {
    const today    = new Date().toDateString()
    const newCount = used + 1
    localStorage.setItem(SHARED_KEY, JSON.stringify({ date: today, count: newCount }))
    setUsed(newCount)
    setRemaining(Math.max(0, SHARED_LIMIT - newCount))
  }

  return {
    used,
    remaining,
    limit: SHARED_LIMIT,
    canUse: remaining > 0,
    increment,
    loaded,
  }
}