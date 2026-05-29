"use client"

import { useState } from "react"
import { Wifi, Activity, Download, Upload } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function InternetSpeedTest() {
  const [isTesting, setIsTesting] = useState(false)
  const [results, setResults] = useState<{ ping: number; download: number; upload: number } | null>(null)

  const runSpeedTest = async () => {
    setIsTesting(true)
    setResults(null)

    // Simulate speed test
    await new Promise(resolve => setTimeout(resolve, 1000))
    const ping = Math.floor(Math.random() * 50) + 10
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    const download = Math.floor(Math.random() * 100) + 50
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    const upload = Math.floor(Math.random() * 50) + 20

    setResults({ ping, download, upload })
    setIsTesting(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Internet Speed Test</h1>
        <p className="text-gray-400 text-base text-center mb-8">Test your internet connection speed</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Start Button */}
          <button
            onClick={runSpeedTest}
            disabled={isTesting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {isTesting ? "Testing..." : "Start Speed Test"}
          </button>

          {/* Results */}
          {results && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/8 text-center">
                <Activity className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                <p className="text-2xl font-bold text-white">{results.ping}</p>
                <p className="text-sm text-gray-400">Ping (ms)</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8 text-center">
                <Download className="h-8 w-8 mx-auto mb-2 text-[#7C3AED]" />
                <p className="text-2xl font-bold text-white">{results.download}</p>
                <p className="text-sm text-gray-400">Download (Mbps)</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-[#00E5FF]" />
                <p className="text-2xl font-bold text-white">{results.upload}</p>
                <p className="text-sm text-gray-400">Upload (Mbps)</p>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-[#00E5FF]/20">
            <div className="flex items-start gap-3">
              <Wifi className="h-5 w-5 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-400">
                Note: This is a simulated speed test for demonstration purposes. For accurate results, use a dedicated speed test service.
              </p>
            </div>
          </div>
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 text-[#00E5FF] hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}




