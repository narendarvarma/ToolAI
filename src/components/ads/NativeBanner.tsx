"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import AdWrapper from "./AdWrapper"

/**
 * NativeBanner - Adsterra Native Banner Ad Component
 * 
 * Features:
 * - Shows after main content on tool pages and homepage
 * - Uses Next.js Script component for proper loading
 * - Prevents duplicate script loading with ref tracking
 * - Client-side only rendering
 * - Lazy initialization for performance
 * 
 * Placement:
 * - Homepage: After hero section
 * - Tool pages: After main content
 */
export default function NativeBanner() {
  const [isMounted, setIsMounted] = useState(false)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Prevent duplicate script loading
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    // Cleanup on unmount
    return () => {
      scriptLoaded.current = false
    }
  }, [])

  if (!isMounted) {
    return (
      <AdWrapper>
        <div 
          className="h-[250px] bg-gray-100 animate-pulse rounded-lg" 
          aria-hidden="true"
          role="presentation"
        />
      </AdWrapper>
    )
  }

  return (
    <AdWrapper>
      <Script
        id="adsterra-native-banner-script"
        src="https://pl29888573.effectivecpmnetwork.com/0b70b5c822a4cf26d551af68c04a9c8c/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
      />
      <div id="container-0b70b5c822a4cf26d551af68c04a9c8c" />
    </AdWrapper>
  )
}
