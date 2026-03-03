import { useState } from 'react'

const weekDaysLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const getMoodLabel = (moodValue) => {
  if (!moodValue) return 'Absent'
  if (moodValue <= 20) return 'Orageux'
  if (moodValue <= 40) return 'Tendu'
  if (moodValue <= 60) return 'Mitigé'
  if (moodValue <= 80) return 'Serein'
  return 'Épanoui'
}

export default function WeeklyChart({ data = [], period = 'Semaine' }) {
  // Préparer les données du graphique à partir de l'historique
  // data est un tableau d'objets { date, status, moodValue }
  
  const chartData = data.map((item, index) => {
    const date = new Date(item.date)
    let dayLabel = ''
    
    if (period === 'Semaine') {
      const dayIndex = (date.getDay() + 6) % 7 // Convertir dimanche=0 en lundi=0
      dayLabel = weekDaysLabels[dayIndex]
    } else if (period === 'Mois') {
      // Pour le mois, afficher "S1", "S2", "S3", "S4" pour les semaines
      dayLabel = `S${index + 1}`
    } else {
      // Pour l'année, afficher les mois (J, F, M, A, M, J, J, A, S, O, N, D)
      const monthLabels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
      dayLabel = monthLabels[date.getMonth()]
    }
    
    return {
      day: dayLabel,
      value: item.moodValue || 0,
      mood: getMoodLabel(item.moodValue),
      status: item.status,
      date: item.date
    }
  })

  const [hoveredIndex, setHoveredIndex] = useState(chartData.length > 0 ? chartData.length - 1 : null)
  const maxValue = 100
  const chartHeight = 200
  const chartWidth = 500
  const padding = 40

  // Si pas de données, ne rien afficher ou afficher un message
  if (chartData.length === 0) {
    return (
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '2px'
          }}>
            {period === 'Semaine' ? 'Evolution sur la semaine' : period === 'Mois' ? 'Evolution sur le mois' : 'Evolution sur l\'année'}
          </h2>
          <p style={{ 
            fontSize: '13px', 
            color: '#94a3b8',
            margin: 0
          }}>
            Aucune donnée disponible pour le moment
          </p>
        </div>
      </div>
    )
  }

  const points = chartData.map((d, i) => ({
    x: padding + (chartData.length > 1 ? (i * (chartWidth - 2 * padding)) / (chartData.length - 1) : (chartWidth - 2 * padding) / 2),
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

  // Déterminer le titre selon la période
  const getTitle = () => {
    if (period === 'Semaine') return 'Evolution sur la semaine'
    if (period === 'Mois') return 'Evolution sur le mois'
    return 'Evolution sur l\'année'
  }
  
  const getSubtitle = () => {
    if (period === 'Semaine') return 'Tes humeurs quotidiennes cette semaine'
    if (period === 'Mois') return 'Tes humeurs hebdomadaires ce mois'
    return 'Tes humeurs mensuelles cette année'
  }

  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '2px'
        }}>
          {getTitle()}
        </h2>
        <p style={{ 
          fontSize: '13px', 
          color: '#94a3b8',
          margin: 0
        }}>
          {getSubtitle()}
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
              {chartData[i]?.day || ''}
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
