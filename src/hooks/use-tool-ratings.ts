import { useState, useEffect } from "react"

export function useToolRatings(toolPath: string) {
  const [rating, setRating] = useState<number>(0)
  const [averageRating, setAverageRating] = useState<number>(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const stored = localStorage.getItem("toolRatings")
    if (stored) {
      const ratings = JSON.parse(stored)
      if (ratings[toolPath]) {
        setRating(ratings[toolPath].userRating || 0)
        setAverageRating(ratings[toolPath].averageRating || 0)
      }
    }
  }, [toolPath])

  const rateTool = (newRating: number) => {
    setRating(newRating)
    
    if (typeof window === 'undefined') return
    
    const stored = localStorage.getItem("toolRatings")
    const ratings = stored ? JSON.parse(stored) : {}
    
    if (!ratings[toolPath]) {
      ratings[toolPath] = { userRating: newRating, averageRating: newRating, count: 1 }
    } else {
      ratings[toolPath].userRating = newRating
      ratings[toolPath].averageRating = ((ratings[toolPath].averageRating * ratings[toolPath].count) + newRating) / (ratings[toolPath].count + 1)
      ratings[toolPath].count += 1
    }
    
    localStorage.setItem("toolRatings", JSON.stringify(ratings))
    setAverageRating(ratings[toolPath].averageRating)
  }

  const getAverageRating = (path: string): number => {
    if (typeof window === 'undefined') return 0
    const stored = localStorage.getItem("toolRatings")
    if (stored) {
      const ratings = JSON.parse(stored)
      return ratings[path]?.averageRating || 0
    }
    return 0
  }

  return { rating, averageRating, rateTool, getAverageRating, isClient }
}
