import { useState, useEffect } from "react"

export function useFavouriteTools() {
  const [favourites, setFavourites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("favouriteTools")
    if (stored) {
      setFavourites(JSON.parse(stored))
    }
  }, [])

  const toggleFavourite = (toolPath: string) => {
    setFavourites(prev => {
      const newFavourites = prev.includes(toolPath)
        ? prev.filter(path => path !== toolPath)
        : [...prev, toolPath]
      
      localStorage.setItem("favouriteTools", JSON.stringify(newFavourites))
      return newFavourites
    })
  }

  const isFavourite = (toolPath: string) => {
    return favourites.includes(toolPath)
  }

  return { favourites, toggleFavourite, isFavourite }
}
