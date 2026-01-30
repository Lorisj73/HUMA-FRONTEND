import { useMemo } from 'react'
import Orage from '@/media/logo_meteo/Orage.png'
import Pluvieux from '@/media/logo_meteo/Pluvieux.png'
import Nuageux from '@/media/logo_meteo/Nuageux.png'
import SoleilNuageux from '@/media/logo_meteo/Soleil_nuageux.png'
import Soleil from '@/media/logo_meteo/Soleil.png'

/**
 * Carte affichant le score moyen de l'équipe avec une jauge semi-circulaire
 * et des barres de progression pour les différentes catégories d'humeur
 */
export default function TeamScoreCard({
  score = 7.2,
  maxScore = 10,
  categories = [
    { label: 'Épanoui', value: 85 },
    { label: 'Serein', value: 75 },
    { label: 'Mitigé', value: 45 }
  ],
  weatherValue = 85 // 0-100 pour déterminer la météo
}) {
  // Calculer l'icône météo en fonction de la valeur
  const weatherIcon = useMemo(() => {
    if (weatherValue <= 20) return Orage
    if (weatherValue <= 40) return Pluvieux
    if (weatherValue <= 60) return Nuageux
    if (weatherValue <= 80) return SoleilNuageux
    return Soleil
  }, [weatherValue])

  const weatherText = useMemo(() => {
    if (weatherValue <= 20) return 'Attention requise aujourd\'hui'
    if (weatherValue <= 40) return 'Quelques nuages aujourd\'hui'
    if (weatherValue <= 60) return 'Ambiance mitigée aujourd\'hui'
    if (weatherValue <= 80) return 'Bonne ambiance aujourd\'hui'
    return 'Tout va bien aujourd\'hui'
  }, [weatherValue])

  // Calculer le pourcentage pour la jauge (0 à 1)
  const gaugePercentage = score / maxScore
  // Calculer la longueur de l'arc (demi-cercle = 0.5 du périmètre)
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference * 0.5 // Demi-cercle
  const filledArcLength = arcLength * gaugePercentage

  return (
    <div className="card" style={{ padding: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--text)',
            marginBottom: '2px'
          }}>
            Le score de l'équipe aujourd'hui
          </h2>
          <p style={{
            fontSize: '13px',
            color: '#94a3b8',
            margin: 0
          }}>
            {weatherText}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {/* Jauge en demi-cercle */}
        <div style={{
          flex: '1 1 0',
          minWidth: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <svg width="100" height="100" style={{ transform: 'rotate(-180deg)' }}>
              {/* Arc de fond (gris) */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
              />
              {/* Arc de progression (bleu) */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#667eea"
                strokeWidth="10"
                strokeDasharray={`${filledArcLength} ${circumference}`}
                strokeLinecap="round"
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)' }}>
                {score.toFixed(1).replace('.', ',')}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>/{maxScore}</div>
            </div>
          </div>
        </div>

        {/* Barres de progression */}
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          {categories.map((item, i) => (
            <div key={i} style={{ marginBottom: i < categories.length - 1 ? '12px' : 0 }}>
              <div style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                {item.label}
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                background: '#e2e8f0',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${item.value}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
