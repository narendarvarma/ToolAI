"use client"

import { useEffect } from "react"

export function useRecentTools(toolPath: string) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const recentTools = JSON.parse(localStorage.getItem("recentTools") || "[]")
    const updated = [toolPath, ...recentTools.filter((t: string) => t !== toolPath)].slice(0, 3)
    localStorage.setItem("recentTools", JSON.stringify(updated))
  }, [toolPath])
}
