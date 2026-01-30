import { useState } from 'react'

const weekDays = ['L', 'M', 'M', 'J', 'V']
const chartData = [
  { day: 'L', value: 75, mood: 'Serein' },
  { day: 'M', value: 82, mood: 'Épanoui' },
  { day: 'M', value: 68, mood: 'Sous tension' },
  { day: 'J', value: 72, mood: 'Serein' },
  { day: 'V', value: 78, mood: 'Serein' },
]

export default function WeeklyChart() {
  const [hoveredIndex, setHoveredIndex] = useState(2)
  const maxValue = 100
  const chartHeight = 200
  const chartWidth = 500
  const padding = 40

  const points = chartData.map((d, i) => ({
    x: padding + (i * (chartWidth - 2 * padding)) / (chartData.length - 1),
    y: chartHeight - padding - (d.value / maxValue) * (chartHeight - 2 * padding),
    ...d,
  }))

  const pathD = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`
    const prev = points[i - 1]
    const cpX1 = prev.x + (point.x - prev.x) / 3
    const cpX2 = prev.x + (2 * (point.x - prev.x)) / 3
    return `${acc} C ${cpX1} ${prev.y}, ${cpX2} ${point.y}, ${point.x} ${point.y}`
  }, '')

  const areaPath = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`

  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '2px'
        }}>
          Evolution sur la semaine
        </h2>
        <p style={{ 
          fontSize: '13px', 
          color: '#94a3b8',
          margin: 0
        }}>
          Les humeurs quotidiennes de ton équipe cette semaine
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`} style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5B7FFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#5B7FFF" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => {
            const y = chartHeight - padding - (value / maxValue) * (chartHeight - 2 * padding)
            return (
              <line
                key={value}
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            )
          })}

          {/* Area fill */}
          <path d={areaPath} fill="url(#areaGradient)" />

          {/* Line */}
          <path d={pathD} fill="none" stroke="#5B7FFF" strokeWidth="3" strokeLinecap="round" />

          {/* Vertical line for hovered point */}
          {hoveredIndex !== null && (
            <line
              x1={points[hoveredIndex].x}
              y1={points[hoveredIndex].y}
              x2={points[hoveredIndex].x}
              y2={chartHeight - padding}
              stroke="#9ca3af"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          )}

          {/* Points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredIndex === i ? 8 : 6}
                fill="#5B7FFF"
                stroke="white"
                strokeWidth="3"
                style={{ 
                  cursor: 'pointer', 
                  transition: 'all 0.2s'
                }}
                onMouseEnter={() => setHoveredIndex(i)}
              />
            </g>
          ))}

          {/* X-axis labels */}
          {points.map((point, i) => (
            <text
              key={i}
              x={point.x}
              y={chartHeight + 5}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="14"
            >
              {weekDays[i]}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div
            style={{
              position: 'absolute',
              background: 'white',
              borderRadius: '12px',
              padding: '8px 16px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              pointerEvents: 'none',
              transition: 'all 0.2s',
              left: `${(points[hoveredIndex].x / chartWidth) * 100}%`,
              top: `${((points[hoveredIndex].y - 20) / (chartHeight + 30)) * 100}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <p style={{ 
              fontWeight: '600', 
              color: 'var(--text)', 
              fontSize: '14px',
              margin: '0 0 2px 0'
            }}>
              {chartData[hoveredIndex].mood}
            </p>
            <p style={{ 
              fontSize: '12px', 
              color: '#94a3b8',
              margin: 0
            }}>
              Charge/Rythme
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
