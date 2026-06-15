"use client"

import { useState } from "react"
import { Key, Copy, RefreshCw } from "lucide-react"
import Link from "next/link"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import { getToolContent } from "@/lib/tool-content"

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const generateUUIDs = () => {
    const newUuids = []
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID())
    }
    setUuids(newUuids)
  }

  const copyToClipboard = (uuid: string) => {
    navigator.clipboard.writeText(uuid)
    alert("UUID copied to clipboard!")
  }

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"))
    alert("All UUIDs copied to clipboard!")
  }

  const clearAll = () => {
    setUuids([])
  }

  const toolContent = getToolContent("uuid-generator")

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">UUID Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Generate unique identifiers</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Count */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Number of UUIDs</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              min="1"
              max="100"
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateUUIDs}
            className="w-full mb-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
          >
            <div className="flex items-center justify-center gap-2">
              <Key className="h-5 w-5" />
              Generate UUIDs
            </div>
          </button>

          {/* UUIDs List */}
          {uuids.length > 0 && (
            <div>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={copyAll}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Copy className="h-5 w-5" />
                    Copy All
                  </div>
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#FF4DB6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    Clear
                  </div>
                </button>
              </div>
              <div className="space-y-2">
                {uuids.map((uuid, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1 p-3 bg-white/5 rounded-xl border border-white/8 font-mono text-sm text-[#00E5FF] break-all">
                      {uuid}
                    </div>
                    <button
                      onClick={() => copyToClipboard(uuid)}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>
        <ToolContent content={toolContent} toolName="UUID Generator Online Free" toolPath="/tools/uuid-generator" />
        <RelatedTools currentToolPath="/tools/uuid-generator" currentCategory={toolContent.category} />

        <Link
          href="/"
          className="mt-6 text-[#00E5FF] hover:underline inline-block"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}



