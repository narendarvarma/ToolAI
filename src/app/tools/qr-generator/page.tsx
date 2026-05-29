"use client"

import { useState } from "react"
import { Download, QrCode } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function QRGenerator() {
  const [text, setText] = useState("")
  const [size, setSize] = useState(200)
  const [color, setColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")

  const qrUrl = text
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=${color.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}`
    : ""

  const downloadQR = () => {
    if (qrUrl) {
      const link = document.createElement("a")
      link.download = "qrcode.png"
      link.href = qrUrl
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">QR Generator</h1>
        <p className="text-gray-400 text-base text-center mb-8">Generate QR codes instantly</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Enter Text or URL</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="https://example.com"
            />
          </div>

          {/* Size Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">
              Size: {size}px
            </label>
            <input
              type="range"
              min="100"
              max="500"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-2 bg-[#0B0F1A] rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
            />
          </div>

          {/* Color Pickers */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">QR Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                />
              </div>
            </div>
          </div>

          {/* QR Code Display */}
          {text && (
            <div className="mb-6 flex justify-center">
              <img
                src={qrUrl}
                alt="QR Code"
                className="rounded-xl"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={downloadQR}
            disabled={!text}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-2">
              <Download className="h-5 w-5" />
              Download QR Code
            </div>
          </button>
        </div>

        {/* Single bottom ad */}
        <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Enter your text or URL in the input field",
          "Adjust the size using the slider (100-500px)",
          "Choose QR code and background colors",
          "Download your QR code as PNG image"
        ]} />

        {/* Social Share */}
        <SocialShare title="QR Generator - Create QR codes instantly" />

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




