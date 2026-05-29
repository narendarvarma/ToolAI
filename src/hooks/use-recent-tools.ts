"use client"

import { useEffect } from "react"

interface RecentTool {
  name: string
  url: string
  icon: string
}

export function useRecentTools(toolPath: string, toolName: string, toolIcon: string) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const recentTools: RecentTool[] = JSON.parse(localStorage.getItem("toolhub_recent") || "[]")
    const newTool: RecentTool = { name: toolName, url: toolPath, icon: toolIcon }
    const updated = [newTool, ...recentTools.filter((t: RecentTool) => t.url !== toolPath)].slice(0, 5)
    localStorage.setItem("toolhub_recent", JSON.stringify(updated))
  }, [toolPath, toolName, toolIcon])
}
