"use client"

import Link from "next/link"

export default function AdSenseDisclosure() {
  return (
    <div className="bg-[#111827]/50 border border-white/5 rounded-lg p-3 mb-4">
      <p className="text-gray-400 text-xs text-center">
        This site uses Google AdSense to display advertisements. 
        <Link href="/privacy" className="text-[#00E5FF] hover:underline ml-1">
          Learn more about our privacy policy
        </Link>
      </p>
    </div>
  )
}
