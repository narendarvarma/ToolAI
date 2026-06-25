"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import AdWrapper from "./AdWrapper"

/**
 * Banner728x90 - Adsterra 728x90 Banner Ad Component
 * 
 * Features:
 * - Shows below navbar on desktop
 * - Hidden automatically on mobile
 * - Centered banner
 * - Uses Next.js Script component for proper loading
 * - Prevents duplicate script loading with ref tracking
 * - Client-side only rendering
 * - Responsive design
 * 
 * Placement: Add to navbar component (desktop only)
 */
export default function Banner728x90() {
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
      <AdWrapper className="hidden md:block">
        <div 
          className="h-[90px] bg-gray-100 animate-pulse rounded-lg" 
          aria-hidden="true"
          role="presentation"
        />
      </AdWrapper>
    )
  }

  return (
    <AdWrapper className="hidden md:block">
      <Script
        id="adsterra-banner-728x90-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key' : '645bbec6e1a27d9c36cd2c6269e52b66',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          `
        }}
      />
      <Script
        id="adsterra-banner-728x90-script"
        src="https://www.highperformanceformat.com/645bbec6e1a27d9c36cd2c6269e52b66/invoke.js"
        strategy="afterInteractive"
      />
    </AdWrapper>
  )
}
