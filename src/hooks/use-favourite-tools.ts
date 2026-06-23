import { useState, useEffect } from "react"

export function useFavouriteTools() {
  const [favourites, setFavourites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("gettool_favourites")
    if (stored) {
      setFavourites(JSON.parse(stored))
    }
  }, [])

  const toggleFavourite = (toolPath: string) => {
    setFavourites(prev => {
      if (prev.includes(toolPath)) {
        const newFavourites = prev.filter(path => path !== toolPath)
        localStorage.setItem("gettool_favourites", JSON.stringify(newFavourites))
        return newFavourites
      } else {
        if (prev.length >= 10) {
          alert("Remove a favourite to add new ones (max 10 favourites)")
          return prev
        }
        const newFavourites = [...prev, toolPath]
        localStorage.setItem("gettool_favourites", JSON.stringify(newFavourites))
        return newFavourites
      }
    })
  }

  const isFavourite = (toolPath: string) => {
    return favourites.includes(toolPath)
  }

  return { favourites, toggleFavourite, isFavourite }
}
