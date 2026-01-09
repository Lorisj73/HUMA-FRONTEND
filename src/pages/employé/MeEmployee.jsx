import { useState, useEffect } from 'react'
import Soleil from '@/media/logo_meteo/Soleil.png'

export default function MeEmployee() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [selectedPeriod, setSelectedPeriod] = useState('Semaine')

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Données en dur pour le développement
  const weeklyScore = 7.2
  const maxScore = 10
  const excellentDays = 1
  const goodDays = 3
  const difficultDays = 1

  const avgMood = 7.2
  const participation = 4
  const totalDays = 5
  const level = 5
  const xp = 350
  const maxXp = 500

  // Calculer le pourcentage pour la jauge
  const gaugePercentage = weeklyScore / maxScore
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference * 0.5
  const filledArcLength = arcLength * gaugePercentage

  const influenceFactors = [
    { label: 'Épanoui', value: 0 },
    { label: 'Serein', value: 0 },
    { label: 'Mitigé', value: 0 },
    { label: 'Sous tension', value: 0 },
    { label: 'Éprouvé', value: 0 }
  ]

  const tags = ['Charge/Rythme', 'Relations/Ambiance', 'Sens/Motivation', 'Organisation/Clarté', 'Reconnaissance', 'Équilibre pro/perso']

  return (
    <div style={{ paddingBottom: '12px' }}>
      <div className="container" style={{ maxWidth: isMobile ? '100%' : 1200 }}>

        {/* En-tête : Ton espace personnel */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24
        }}>
          <div>
            <h1 style={{
              fontSize: 32,
              margin: 0,
              fontWeight: 700,
              color: '#1E1E1E',
              marginBottom: 8
            }}>
              Ton espace personnel
            </h1>
            <p style={{
              fontSize: 16,
              color: '#757575',
              margin: 0
            }}>
              Suis ton évolution personnelle dans l'environnement de ton entreprise.
            </p>
          </div>
          {/* Logo météo en haut à droite */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <img src={Soleil} alt="Météo" style={{ width: '50px', height: '50px' }} />
          </div>
        </div>

        {/* Titre résumé */}
        <div className="card" style={{ padding: isMobile ? '20px' : '32px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#0748EA"/>
              <text x="20" y="26" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">CC</text>
            </svg>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#1E1E1E' }}>
              Ta synthèse cette semaine
            </h2>
          </div>

          <div style={{
            background: '#F7F6F4',
            padding: 20,
            borderRadius: 12
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px 0', color: '#1E1E1E' }}>
              Titre résumé
            </h3>
            <p style={{ fontSize: 14, color: '#1E1E1E', margin: 0, lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet consectetur. Porta lobortis urna dignissim proin leo libero. Nulla tellus ornare vulputate eget sodales. Ut proin nunc nibh enim neque mattis. Sed nunc varius lorem accumsan enim.
            </p>
          </div>
        </div>

        {/* Grille : Evolution + Facteurs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
          gap: 20,
          marginBottom: 20
        }}>
          {/* Evolution sur la semaine */}
          <div className="card" style={{ padding: isMobile ? '20px' : '24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0', color: '#1E1E1E' }}>
              Evolution sur la semaine
            </h3>
            <p style={{ fontSize: 14, color: '#757575', margin: '0 0 20px 0' }}>
              Tes humeurs quotidiennes cette semaine
            </p>

            {/* Boutons de filtre */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              {['Semaine', 'Mois', 'Année'].map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 20,
                    border: selectedPeriod === period ? '1px solid #1E1E1E' : '1px solid #D9D9D9',
                    background: selectedPeriod === period ? '#1E1E1E' : 'white',
                    color: selectedPeriod === period ? 'white' : '#757575',
                    fontSize: 14,
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Graphique simplifié */}
            <div style={{ position: 'relative', height: 200, background: '#F7F6F4', borderRadius: 12, padding: 20 }}>
              <svg width="100%" height="160" viewBox="0 0 500 160">
                {/* Grille */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} x1="0" y1={i * 40} x2="500" y2={i * 40} stroke="#D9D9D9" strokeWidth="0.5" />
                ))}
                {/* Courbe */}
                <path d="M 50,80 Q 150,60 250,100 T 450,80" fill="url(#gradient)" opacity="0.3" />
                <path d="M 50,80 Q 150,60 250,100 T 450,80" fill="none" stroke="#0748EA" strokeWidth="3" />
                {/* Point */}
                <circle cx="450" cy="80" r="6" fill="#1E1E1E" />
                {/* Ligne pointillée */}
                <line x1="450" y1="80" x2="500" y2="80" stroke="#303030" strokeWidth="2" strokeDasharray="4 4" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#0748EA" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
              </svg>
              {/* Labels des jours */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#757575', marginTop: 8 }}>
                {['L', 'M', 'M', 'J', 'V'].map((day, i) => (
                  <div key={i}>{day}</div>
                ))}
              </div>
              {/* Tooltip "Sous tension" */}
              <div style={{
                position: 'absolute',
                top: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'white',
                padding: '8px 12px',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #D9D9D9',
                fontSize: 12
              }}>
                <div style={{ fontWeight: 600, color: '#1E1E1E' }}>Sous tension</div>
                <div style={{ color: '#757575', fontSize: 10 }}>Charge/Rythme</div>
              </div>
            </div>

            {/* Stats : Jours */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24, textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#1E1E1E' }}>{excellentDays}</div>
                <div style={{ fontSize: 13, color: '#757575' }}>Jour Excellent</div>
              </div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#1E1E1E' }}>{goodDays}</div>
                <div style={{ fontSize: 13, color: '#757575' }}>Jours corrects</div>
              </div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#1E1E1E' }}>{difficultDays}</div>
                <div style={{ fontSize: 13, color: '#757575' }}>Jour difficile</div>
              </div>
            </div>
          </div>

          {/* Facteurs d'influence */}
          <div className="card" style={{ padding: isMobile ? '20px' : '24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px 0', color: '#1E1E1E' }}>
              Facteurs d'influence
            </h3>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {tags.map((tag, i) => (
                <span key={i} style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  border: '1px solid #D9D9D9',
                  fontSize: 12,
                  color: '#1E1E1E',
                  background: 'white'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Barres de progression */}
            {influenceFactors.map((factor, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: '#1E1E1E' }}>{factor.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1E1E1E' }}>{factor.value}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: 8,
                  background: '#E7EAFD',
                  borderRadius: 20,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${factor.value}%`,
                    height: '100%',
                    background: '#0748EA',
                    borderRadius: 20
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 cartes stats */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20, marginBottom: 24 }}>
          {/* Humeur moyenne */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#0748EA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 20
              }}>★</div>
              <div>
                <div style={{ fontSize: 13, color: '#757575', marginBottom: 4 }}>Humeur moyenne</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#1E1E1E' }}>{avgMood.toFixed(1).replace('.', ',')}/10</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: '#1E1E1E' }}>+0,8 vs semaine dernière</div>
          </div>

          {/* Participation */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#0748EA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 20
              }}>✓</div>
              <div>
                <div style={{ fontSize: 13, color: '#757575', marginBottom: 4 }}>Participation</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#1E1E1E' }}>{participation}/{totalDays} jours</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: '#1E1E1E' }}>{Math.round((participation/totalDays)*100)}% cette semaine</div>
          </div>

          {/* Niveau */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#0748EA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 20
              }}>★</div>
              <div>
                <div style={{ fontSize: 13, color: '#757575', marginBottom: 4 }}>Niveau</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#1E1E1E' }}>{level}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: '#1E1E1E' }}>{xp}/{maxXp} XP</div>
          </div>
        </div>

        {/* Badge du super héros */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#0748EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 24,
              flexShrink: 0
            }}>ⓘ</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0', color: '#1E1E1E' }}>
                Badge du super héros
              </h3>
              <p style={{ fontSize: 14, color: '#757575', margin: '0 0 16px 0' }}>
                Ce badge t'es attribué quand tu répondas au check-in pendant 5 jours consécutifs
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  flex: 1,
                  height: 12,
                  background: '#E7EAFD',
                  borderRadius: 20,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '80%',
                    height: '100%',
                    background: '#0748EA',
                    borderRadius: 20
                  }} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#1E1E1E' }}>80%</span>
              </div>
            </div>
          </div>
          <button style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: 'transparent',
            color: '#1E1E1E',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            textDecoration: 'underline',
            textAlign: 'left'
          }}>
            Voir tous mes badges et récompenses
          </button>
        </div>

      </div>
    </div>
  )
}
