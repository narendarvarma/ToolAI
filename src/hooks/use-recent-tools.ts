"use client"

import { useEffect } from "react"

interface RecentTool {
  name: string
  url: string
  icon: string
}

export function useRecentTools(toolPath: string, toolName?: string, toolIcon?: string) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const recentTools: RecentTool[] = JSON.parse(localStorage.getItem("gettool_recent") || "[]")
    const newTool: RecentTool = { 
      name: toolName || "Tool", 
      url: toolPath, 
      icon: toolIcon || "Tool" 
    }
    const updated = [newTool, ...recentTools.filter((t: RecentTool) => t.url !== toolPath)].slice(0, 5)
    localStorage.setItem("gettool_recent", JSON.stringify(updated))
  }, [toolPath, toolName, toolIcon])
}
