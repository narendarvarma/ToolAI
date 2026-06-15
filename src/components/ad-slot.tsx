"use client"

import { useEffect, useRef } from "react"

export default function AdSlot({ adSlot, className }: { adSlot: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const ins = document.querySelector('.adsbygoogle[data-ad-slot]')
      if (ins && !ins.getAttribute('data-adsbygoogle-status')) {
        (window as any).adsbygoogle = (window as any).adsbygoogle || []
        ;(window as any).adsbygoogle.push({})
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8360124149016637"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
