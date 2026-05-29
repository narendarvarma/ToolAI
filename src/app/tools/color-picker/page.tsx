"use client"

import { useState } from "react"
import { Palette, Copy, RefreshCw } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function ColorPicker() {
  const [hex, setHex] = useState("#00E5FF")
  const [rgb, setRgb] = useState({ r: 0, g: 229, b: 255 })
  const [hsl, setHsl] = useState({ h: 183, s: 100, l: 50 })

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }).join("")
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100; l /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255)
    }
  }

  const handleHexChange = (value: string) => {
    const validHex = /^#?[0-9A-Fa-f]{6}$/.test(value)
    if (validHex) {
      const cleanHex = value.startsWith("#") ? value : "#" + value
      const rgbValues = hexToRgb(cleanHex)
      if (rgbValues) {
        setHex(cleanHex)
        setRgb(rgbValues)
        setHsl(rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b))
      }
    } else if (value === "") {
      setHex("#000000")
      setRgb({ r: 0, g: 0, b: 0 })
      setHsl({ h: 0, s: 0, l: 0 })
    }
  }

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = Math.min(255, Math.max(0, parseInt(value) || 0))
    const newRgb = { ...rgb, [channel]: numValue }
    setRgb(newRgb)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHex(newHex)
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
  }

  const handleHslChange = (channel: 'h' | 's' | 'l', value: string) => {
    const numValue = channel === 'h' 
      ? Math.min(360, Math.max(0, parseInt(value) || 0))
      : Math.min(100, Math.max(0, parseInt(value) || 0))
    const newHsl = { ...hsl, [channel]: numValue }
    setHsl(newHsl)
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert(`Copied: ${text}`)
  }

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const newHex = rgbToHex(r, g, b)
    setHex(newHex)
    setRgb({ r, g, b })
    setHsl(rgbToHsl(r, g, b))
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Color Picker</h1>
        <p className="text-gray-400 text-base text-center mb-8">Pick, convert, and explore colors</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Color Preview */}
          <div className="mb-6">
            <div 
              className="w-full h-32 rounded-xl border border-white/8"
              style={{ backgroundColor: hex }}
            />
          </div>

          {/* Random Button */}
          <button
            onClick={generateRandomColor}
            className="w-full mb-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Random Color
            </div>
          </button>

          {/* HEX */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">HEX</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all font-mono"
                placeholder="#000000"
              />
              <button
                onClick={() => copyToClipboard(hex)}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* RGB */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">RGB</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={rgb.r}
                  onChange={(e) => handleRgbChange('r', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all font-mono"
                  placeholder="R"
                  min="0"
                  max="255"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={rgb.g}
                  onChange={(e) => handleRgbChange('g', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all font-mono"
                  placeholder="G"
                  min="0"
                  max="255"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={rgb.b}
                  onChange={(e) => handleRgbChange('b', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all font-mono"
                  placeholder="B"
                  min="0"
                  max="255"
                />
              </div>
              <button
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* HSL */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">HSL</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={hsl.h}
                  onChange={(e) => handleHslChange('h', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all font-mono"
                  placeholder="H"
                  min="0"
                  max="360"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={hsl.s}
                  onChange={(e) => handleHslChange('s', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all font-mono"
                  placeholder="S"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={hsl.l}
                  onChange={(e) => handleHslChange('l', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all font-mono"
                  placeholder="L"
                  min="0"
                  max="100"
                />
              </div>
              <button
                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
              >
                <Copy className="h-5 w-5" />
              </button>
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




