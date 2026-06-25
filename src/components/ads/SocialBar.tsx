"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

/**
 * SocialBar - Adsterra Social Bar Ad Component
 * 
 * Features:
 * - Loads once globally (placed in layout.tsx)
 * - Uses Next.js Script component for proper loading
 * - Prevents duplicate script loading with ref tracking
 * - Client-side only rendering
 * - No hydration errors
 * 
 * Placement: Add to app/layout.tsx before closing body tag
 */
export default function SocialBar() {
  const scriptLoaded = useRef(false)

  useEffect(() => {
    // Prevent duplicate script loading
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    // Cleanup on unmount
    return () => {
      scriptLoaded.current = false
    }
  }, [])

  return (
    <Script
      id="adsterra-social-bar-script"
      src="https://pl29888574.effectivecpmnetwork.com/d3/39/08/d3390841dc3e359313014541f7f58247.js"
      strategy="afterInteractive"
    />
  )
}
