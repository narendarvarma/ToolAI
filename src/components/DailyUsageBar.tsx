"use client"

interface Props {
  used: number
  limit: number
  remaining: number
  loaded?: boolean
}

export default function DailyUsageBar({ used, limit, remaining, loaded = true }: Props) {
  const percent = Math.min((used / limit) * 100, 100)
  const isFull  = remaining === 0
  const isLow   = remaining === 1

  const barColor = isFull ? '#ef4444' : isLow ? '#f59e0b' : '#eab308'

  if (!loaded) return null

  return (
    <div style={{
      background: '#0f172a',
      border: `1px solid ${isFull ? '#ef444455' : '#ffffff15'}`,
      borderRadius: 10,
      padding: '10px 14px',
      marginBottom: 14,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 7,
      }}>
        <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'Segoe UI, sans-serif' }}>
          Daily Usage:{' '}
          <strong style={{ color: '#e2e8f0' }}>{used}/{limit} requests</strong>
        </span>
        <span style={{
          fontSize: 12, fontWeight: 700, fontFamily: 'Segoe UI, sans-serif',
          color: isFull ? '#ef4444' : isLow ? '#f59e0b' : '#22c55e',
        }}>
          {remaining} remaining
        </span>
      </div>

      <div style={{
        width: '100%', height: 6,
        background: '#1e293b', borderRadius: 99, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: 99,
          width: `${percent}%`,
          background: barColor,
          transition: 'width 0.5s ease',
        }} />
      </div>

      {isFull && (
        <p style={{ fontSize: 11, color: '#ef4444', marginTop: 6, margin: '6px 0 0', fontFamily: 'Segoe UI, sans-serif' }}>
          ⚠️ Daily limit reached. Resets at midnight.
        </p>
      )}
      {isLow && !isFull && (
        <p style={{ fontSize: 11, color: '#f59e0b', marginTop: 6, margin: '6px 0 0', fontFamily: 'Segoe UI, sans-serif' }}>
          ⚡ Only 1 request left for today.
        </p>
      )}
    </div>
  )
}
