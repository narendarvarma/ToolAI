"use client"

import { useState } from 'react'
import GeneratingAnimation from '@/components/generating-animation'
import DailyUsageBar from '@/components/DailyUsageBar'
import { tokenManager } from '@/lib/token-manager'

const COLOR_THEMES: Record<string, { bg: string; accent: string; text: string; light: string; darkText: string }> = {
  'midnight-navy': { bg: '#0f3460', accent: '#185FA5', text: '#ffffff', light: '#e6f1fb', darkText: '#1a1a1a' },
  'forest-green':  { bg: '#2C5F2D', accent: '#97BC62', text: '#ffffff', light: '#eaf3de', darkText: '#1a1a1a' },
  'coral-energy':  { bg: '#F96167', accent: '#2F3C7E', text: '#ffffff', light: '#faece7', darkText: '#1a1a1a' },
  'teal-trust':    { bg: '#028090', accent: '#02C39A', text: '#ffffff', light: '#e1f5ee', darkText: '#1a1a1a' },
  'cherry-bold':   { bg: '#990011', accent: '#2F3C7E', text: '#ffffff', light: '#fcebeb', darkText: '#1a1a1a' },
}

interface Stat   { number: string; label: string; context: string }
interface Card   { icon: string; title: string; description: string }
interface Step   { label: string; description: string }
interface Column { title: string; points: string[] }

interface Slide {
  slideNumber: number
  layout: string
  icon: string
  heading?: string
  subheading?: string
  bullets?: string[]
  leftColumn?: Column
  rightColumn?: Column
  stats?: Stat[]
  quote?: string
  attribution?: string
  steps?: Step[]
  cards?: Card[]
  callToAction?: string
  contactInfo?: string
  speakerNotes?: string
}

interface PptData {
  title: string
  subtitle: string
  author: string
  colorTheme: string
  font: { heading: string; body: string }
  slides: Slide[]
}

export default function PptMaker() {
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()

  const [topic, setTopic]           = useState('')
  const [slideCount, setSlideCount] = useState(8)
  const [style, setStyle]           = useState('professional')
  const [ppt, setPpt]               = useState<PptData | null>(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [activeSlide, setActiveSlide] = useState(0)

  const generate = async () => {
    if (!topic.trim()) { setError('Please enter a topic'); return }
    if (!tokenManager.canUseRequest()) { setError('Daily limit reached. Come back tomorrow.'); return }

    setError(''); setLoading(true); setPpt(null)

    try {
      const res = await fetch('/api/generate-ppt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, slideCount, style })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      tokenManager.useRequest()
      setPpt(data.ppt)
      setActiveSlide(0)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const downloadJSON = () => {
    if (!ppt) return
    const blob = new Blob([JSON.stringify(ppt, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a'); a.href = url
    a.download = `${ppt.title || 'presentation'}.json`; a.click()
    URL.revokeObjectURL(url)
  }

  const theme = ppt ? (COLOR_THEMES[ppt.colorTheme] || COLOR_THEMES['midnight-navy']) : COLOR_THEMES['midnight-navy']

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>

      {/* Sidebar */}
      <div style={{
        width: 300, minWidth: 300, background: '#0f172a',
        borderRight: '1px solid #1e293b',
        padding: '1.5rem 1.25rem', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>
          🎞️ PPT Maker
        </h2>

        {/* Daily usage bar */}
        <DailyUsageBar used={used} limit={limit} remaining={remaining} loaded={true} />

        {/* FIXED: visible label + input styles for dark sidebar */}
        <label style={{
          fontSize: 11, fontWeight: 600, color: '#94a3b8',
          textTransform: 'uppercase', letterSpacing: '0.5px',
        }}>
          Presentation Topic *
        </label>
        <textarea
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="e.g. The Future of AI in Healthcare"
          style={{
            width: '100%', padding: '10px 12px', fontSize: 13,
            border: '1px solid #334155',
            borderRadius: 8,
            background: '#1e293b',   // dark background
            color: '#f1f5f9',        // white text — FIXES invisible text
            resize: 'none', height: 90, marginTop: 4,
            outline: 'none',
          }}
        />

        <label style={{
          fontSize: 11, fontWeight: 600, color: '#94a3b8',
          textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 10,
        }}>
          Number of Slides
        </label>
        <select
          value={slideCount}
          onChange={e => setSlideCount(Number(e.target.value))}
          style={{
            width: '100%', padding: '8px 10px', fontSize: 13,
            border: '1px solid #334155', borderRadius: 8,
            background: '#1e293b',  // dark
            color: '#f1f5f9',       // white text
            marginTop: 4,
          }}
        >
          {[5, 6, 8, 10, 12].map(n => <option key={n} value={n}>{n} slides</option>)}
        </select>

        <label style={{
          fontSize: 11, fontWeight: 600, color: '#94a3b8',
          textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 10,
        }}>
          Style
        </label>
        <select
          value={style}
          onChange={e => setStyle(e.target.value)}
          style={{
            width: '100%', padding: '8px 10px', fontSize: 13,
            border: '1px solid #334155', borderRadius: 8,
            background: '#1e293b',  // dark
            color: '#f1f5f9',       // white text
            marginTop: 4,
          }}
        >
          <option value="professional">Professional</option>
          <option value="creative">Creative</option>
          <option value="academic">Academic</option>
          <option value="startup-pitch">Startup Pitch</option>
          <option value="minimal">Minimal</option>
        </select>

        <button
          onClick={generate}
          disabled={loading || !tokenManager.canUseRequest()}
          style={{
            marginTop: 16, width: '100%', padding: 11,
            background: loading || !tokenManager.canUseRequest() ? '#334155' : '#185FA5',
            color: '#fff', fontSize: 14, fontWeight: 600,
            border: 'none', borderRadius: 10,
            cursor: loading || !tokenManager.canUseRequest() ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {loading ? '⏳ Generating...' : !tokenManager.canUseRequest() ? '🚫 Limit Reached' : '✦ Generate Presentation'}
        </button>

        {error && (
          <p style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>{error}</p>
        )}

        {/* Slide thumbnails */}
        {ppt && (
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
              Slides
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {ppt.slides.map((s, i) => (
                <button
                  key={i} onClick={() => setActiveSlide(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: 10,
                    border: activeSlide === i ? '2px solid #38bdf8' : '1px solid #334155',
                    borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                    background: activeSlide === i ? '#1e293b' : '#0f172a',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  <span style={{ fontSize: 12, color: '#f1f5f9', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {i + 1}. {s.heading || s.layout}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {ppt && (
          <button
            onClick={downloadJSON}
            style={{
              marginTop: 12, width: '100%', padding: 10,
              background: '#1e293b', color: '#38bdf8',
              fontSize: 13, fontWeight: 600, border: '1px solid #38bdf8',
              borderRadius: 8, cursor: 'pointer', transition: 'background 0.2s',
            }}
          >
            ⬇ Download JSON
          </button>
        )}
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
        {loading ? (
          <div className="w-full max-w-md flex-1">
            <GeneratingAnimation type="ppt" accentColor="#0f3460" />
          </div>
        ) : !ppt ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center gap-3">
            <div className="text-5xl">🎞️</div>
            <p className="text-base leading-relaxed">Enter a topic and click<br /><strong>Generate Presentation</strong></p>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <SlidePreview slide={ppt.slides[activeSlide]} theme={theme} font={ppt.font} total={ppt.slides.length} />

            {/* Nav */}
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                onClick={() => setActiveSlide(p => Math.max(0, p - 1))} disabled={activeSlide === 0}
                className="px-5 py-2 border border-gray-200 rounded-lg bg-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >← Prev</button>
              <span className="text-sm text-gray-500">{activeSlide + 1} / {ppt.slides.length}</span>
              <button
                onClick={() => setActiveSlide(p => Math.min(ppt.slides.length - 1, p + 1))} disabled={activeSlide === ppt.slides.length - 1}
                className="px-5 py-2 border border-gray-200 rounded-lg bg-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >Next →</button>
            </div>

            {/* Speaker notes */}
            {ppt.slides[activeSlide].speakerNotes && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs font-bold text-amber-800 mb-1 uppercase tracking-wider">🗣 Speaker Notes</p>
                <p className="text-sm text-amber-900 leading-relaxed">{ppt.slides[activeSlide].speakerNotes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ---- Slide Renderer ----
function SlidePreview({ slide, theme, font, total }: { slide: Slide; theme: typeof COLOR_THEMES[string]; font: { heading: string; body: string }; total: number }) {
  const base: React.CSSProperties = {
    width: '100%', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden',
    boxShadow: '0 8px 40px rgba(0,0,0,0.18)', position: 'relative',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '2.5rem 3rem', fontFamily: font.body,
  }

  // Helper to get text color based on background
  const getTextColor = (background: string) => {
    return background === '#fff' ? theme.darkText : theme.text
  }

  const slideNum = (
    <div style={{ position: 'absolute', bottom: 16, right: 24, fontSize: 12, opacity: 0.5, color: '#000000', fontFamily: font.body }}>
      {slide.slideNumber} / {total}
    </div>
  )

  if (slide.layout === 'title' || slide.layout === 'closing') {
    return (
      <div style={{ ...base, background: theme.bg, alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>{slide.icon}</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: theme.text, fontFamily: font.heading, margin: '0 0 12px', lineHeight: 1.2 }}>
          {slide.heading || slide.layout === 'closing' ? slide.heading : ''}
        </h1>
        {slide.subheading && <p style={{ fontSize: 18, color: theme.text, opacity: 0.75, margin: 0 }}>{slide.subheading}</p>}
        {slide.callToAction && (
          <div style={{ marginTop: 24, padding: '12px 28px', background: theme.accent, borderRadius: 30, color: '#fff', fontWeight: 600, fontSize: 16, display: 'inline-block' }}>
            {slide.callToAction}
          </div>
        )}
        {slide.contactInfo && <p style={{ fontSize: 14, color: theme.text, opacity: 0.6, marginTop: 16 }}>{slide.contactInfo}</p>}
        {slideNum}
      </div>
    )
  }

  if (slide.layout === 'bullets') {
    return (
      <div style={{ ...base, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: 32 }}>{slide.icon}</span>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#000000', fontFamily: font.heading, margin: 0 }}>{slide.heading}</h2>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(slide.bullets || []).map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: '#000000', lineHeight: 1.5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: theme.accent, flexShrink: 0, marginTop: 7 }} />
              {b}
            </li>
          ))}
        </ul>
        {slideNum}
      </div>
    )
  }

  if (slide.layout === 'two-column') {
    return (
      <div style={{ ...base, background: '#fff', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 28 }}>{slide.icon}</span>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#000000', fontFamily: font.heading, margin: 0 }}>{slide.heading}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flex: 1 }}>
          {[slide.leftColumn, slide.rightColumn].map((col, ci) => col && (
            <div key={ci} style={{ background: theme.light, borderRadius: 10, padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: theme.bg, marginBottom: 10 }}>{col.title}</p>
              {col.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13, color: '#000000', alignItems: 'flex-start' }}>
                  <span style={{ color: theme.accent, fontWeight: 700, flexShrink: 0 }}>→</span> {p}
                </div>
              ))}
            </div>
          ))}
        </div>
        {slideNum}
      </div>
    )
  }

  if (slide.layout === 'big-stat') {
    return (
      <div style={{ ...base, background: theme.bg, alignItems: 'center', textAlign: 'center' }}>
        <h2 style={{ fontSize: 22, color: theme.text, opacity: 0.8, fontFamily: font.heading, marginBottom: 24 }}>{slide.heading}</h2>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
          {(slide.stats || []).map((stat, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '20px 32px' }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', fontFamily: font.heading, lineHeight: 1 }}>{stat.number}</div>
              <div style={{ fontSize: 14, color: theme.text, opacity: 0.85, marginTop: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: theme.text, opacity: 0.6, marginTop: 4 }}>{stat.context}</div>
            </div>
          ))}
        </div>
        {slideNum}
      </div>
    )
  }

  if (slide.layout === 'quote') {
    return (
      <div style={{ ...base, background: theme.bg, alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 72, color: theme.accent, lineHeight: 0.5, marginBottom: 24, fontFamily: 'Georgia, serif' }}>"</div>
        <p style={{ fontSize: 22, color: theme.text, fontStyle: 'italic', lineHeight: 1.6, maxWidth: 560, fontFamily: font.heading, margin: '0 auto 20px' }}>
          {slide.quote}
        </p>
        <p style={{ fontSize: 14, color: theme.text, opacity: 0.65 }}>— {slide.attribution}</p>
        {slideNum}
      </div>
    )
  }

  if (slide.layout === 'timeline') {
    return (
      <div style={{ ...base, background: '#fff', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 28 }}>{slide.icon}</span>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#000000', fontFamily: font.heading, margin: 0 }}>{slide.heading}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(slide.steps || []).map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: theme.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: theme.bg, margin: '3px 0 2px' }}>{step.label}</p>
                <p style={{ fontSize: 12, color: '#000000', margin: 0 }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        {slideNum}
      </div>
    )
  }

  if (slide.layout === 'grid') {
    return (
      <div style={{ ...base, background: '#fff', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>{slide.icon}</span>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#000000', fontFamily: font.heading, margin: 0 }}>{slide.heading}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          {(slide.cards || []).map((card, i) => (
            <div key={i} style={{ background: theme.light, borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: theme.bg, margin: '0 0 4px' }}>{card.title}</p>
              <p style={{ fontSize: 11, color: '#000000', margin: 0, lineHeight: 1.5 }}>{card.description}</p>
            </div>
          ))}
        </div>
        {slideNum}
      </div>
    )
  }

  // Fallback
  return (
    <div style={{ ...base, background: '#fff' }}>
      <span style={{ fontSize: 36, marginBottom: 12 }}>{slide.icon}</span>
      <h2 style={{ fontSize: 24, color: '#000000', fontFamily: font.heading }}>{slide.heading}</h2>
      {slideNum}
    </div>
  )
}
