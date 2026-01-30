import { useState, useEffect } from 'react'
import Soleil from '@/media/logo_meteo/Soleil.png'
import SoleilNuageux from '@/media/logo_meteo/Soleil_nuageux.png'

export default function Nous() {
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
  const teamScore = 8 // Score sur 10
  const teamMoodCounts = {
    serein: 230,
    epanoui: 110,
    mitige: 50
  }

  // Calcul de la position du curseur sur la jauge (score de 0 à 10)
  const calculateCursorPosition = (score) => {
    // Score de 0 à 10, converti en pourcentage (0 = gauche, 10 = droite)
    const percentage = score / 10 // 0 à 1
    
    // Angle de 180° (gauche) à 0° (droite)
    const angle = 180 - (percentage * 180)
    const angleRad = (angle * Math.PI) / 180
    
    // Coordonnées du centre du demi-cercle (milieu entre start et end)
    const centerX = 120 // Centre de la jauge
    const centerY = 100 // Position Y du centre (aligné avec la base)
    const radius = 85 // Rayon du demi-cercle

    const x = centerX + radius * Math.cos(angleRad)
    const y = centerY - radius * Math.sin(angleRad)

    return { x, y }
  }

  const cursorPos = calculateCursorPosition(teamScore)

  const influenceFactors = [
    { label: 'Épanoui', value: 0 },
    { label: 'Serein', value: 0 },
    { label: 'Mitigé', value: 0 },
    { label: 'Sous tension', value: 0 },
    { label: 'Éprouvé', value: 0 }
  ]

  const tags = ['Charge/Rythme', 'Relations/Ambiance', 'Sens/Motivation', 'Organisation/Clarté', 'Reconnaissance', 'Équilibre pro/perso']

  const excellentDays = 1
  const goodDays = 3
  const difficultDays = 1

  return (
    <div style={{ paddingBottom: '12px' }}>
      <div className="container" style={{ maxWidth: isMobile ? '100%' : 1200 }}>

        {/* En-tête */}
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
              color: 'var(--text)',
              marginBottom: 8
            }}>
              La météo de ton équipe
            </h1>
            <p style={{
              fontSize: 16,
              color: 'var(--muted)',
              margin: 0
            }}>
              Suis l'évolution de ton équipe au sein de l'entreprise.
            </p>
          </div>
        </div>

        {/* Grille principale : Climat + Score */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 20,
          marginBottom: 20
        }}>
          {/* Carte Climat de l'équipe */}
          <div className="card" style={{ padding: isMobile ? '20px' : '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)', marginBottom: 4 }}>
                  Climat de l'équipe
                </h2>
                <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>
                  Aujourd'hui
                </p>
              </div>
              <img src={SoleilNuageux} alt="Météo" style={{ width: '60px', height: '60px' }} />
            </div>

            {/* Titre résumé */}
            <div style={{
              background: 'var(--bg)',
              padding: 20,
              borderRadius: 12
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px 0', color: 'var(--text)' }}>
                Titre résumé
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet consectetur. Porta lobortis urna dignissim proin leo libero. Nulla tellus ornare vulputate eget sodales. Ut proin nunc nibh enim neque mattis. Sed nunc varius lorem accumsan enim.
              </p>
            </div>
          </div>

          {/* Carte Score bien-être */}
          <div className="card" style={{ padding: isMobile ? '20px' : '32px' }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)', marginBottom: 4 }}>
                Score bien-être de ton équipe
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>
                Depuis le début d'année
              </p>
            </div>

            {/* Jauge semi-circulaire */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{ position: 'relative', width: 240, height: 160 }}>
                <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    {/* Gradient arc-en-ciel pour la jauge */}
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EC221F" />
                      <stop offset="20%" stopColor="#FF7E1D" />
                      <stop offset="40%" stopColor="#FFCE00" />
                      <stop offset="60%" stopColor="#90B5F4" />
                      <stop offset="100%" stopColor="#0748EA" />
                    </linearGradient>
                    
                    {/* Ombre pour le point */}
                    <filter id="pointShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
                    </filter>
                  </defs>
                  
                  {/* Arc de la jauge - demi-cercle */}
                  <path
                    d="M 35,100 A 85,85 0 0,1 205,100"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  
                  {/* Ligne de base blanche (optionnelle) */}
                  <line x1="35" y1="100" x2="205" y2="100" stroke="white" strokeWidth="1" opacity="0.5"/>
                  
                  {/* Point indicateur de position */}
                  <g filter="url(#pointShadow)">
                    <circle
                      cx={cursorPos.x}
                      cy={cursorPos.y}
                      r="9"
                      fill="#2C2C2C"
                    />
                    <circle
                      cx={cursorPos.x}
                      cy={cursorPos.y}
                      r="6"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                    />
                  </g>
                </svg>
                
                {/* Score et label au centre */}
                <div style={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: 4 }}>
                    {teamScore.toFixed(1).replace('.', ',')}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 2 }}>/10</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                    Serein
                  </div>
                </div>
              </div>
            </div>

            {/* Stats des humeurs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>230 x serein</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>110 x épanoui</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>50 x mitigé</span>
              </div>
            </div>

            {/* Info text */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              marginTop: 20,
              padding: 16,
              background: 'var(--bg)',
              borderRadius: 8
            }}>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: '2px solid #757575',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: 'var(--muted)',
                flexShrink: 0
              }}>
                i
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                Le score bien-être de l'entreprise est actuellement de 6,8.
              </p>
            </div>
          </div>
        </div>

        {/* Grille : Evolution + Facteurs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
          gap: 20,
          marginBottom: 20
        }}>
          {/* Evolution sur la semaine */}
          <div className="card" style={{ padding: isMobile ? '20px' : '32px' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text)' }}>
              Evolution sur la semaine
            </h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 20px 0' }}>
              Les humeurs quotidiennes de ton équipe et les tiennes cette semaine
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

            {/* Légende */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 40, height: 3, background: '#303030', borderRadius: 2 }} />
                <span style={{ fontSize: 13, color: '#303030' }}>Moi</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 40, height: 3, background: '#0748EA', borderRadius: 2 }} />
                <span style={{ fontSize: 13, color: '#0748EA' }}>Mon équipe</span>
              </div>
            </div>

            {/* Graphique */}
            <div style={{ position: 'relative', height: 250, background: 'var(--bg)', borderRadius: 12, padding: 20 }}>
              <svg width="100%" height="210" viewBox="0 0 600 210">
                {/* Grille */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#D9D9D9" strokeWidth="0.5" />
                ))}
                {/* Courbe noire (Moi) */}
                <path d="M 60,100 L 150,80 L 240,140 L 330,110 L 420,90 L 510,110 L 580,95" fill="none" stroke="#303030" strokeWidth="2" />
                <circle cx="60" cy="100" r="5" fill="white" stroke="#303030" strokeWidth="2" />
                <circle cx="580" cy="95" r="5" fill="white" stroke="#303030" strokeWidth="2" />

                {/* Courbe bleue (Mon équipe) */}
                <path d="M 60,120 Q 150,90 240,140 T 420,130 L 510,140 L 580,120" fill="url(#gradientTeam)" opacity="0.3" />
                <path d="M 60,120 Q 150,90 240,140 T 420,130 L 510,140 L 580,120" fill="none" stroke="#0748EA" strokeWidth="3" />
                <circle cx="60" cy="120" r="5" fill="white" stroke="#0748EA" strokeWidth="2" />
                <circle cx="580" cy="120" r="5" fill="white" stroke="#0748EA" strokeWidth="2" />

                {/* Tooltip */}
                <g>
                  <rect x="280" y="80" width="120" height="50" rx="8" fill="white" stroke="#D9D9D9" strokeWidth="1" />
                  <text x="340" y="100" textAnchor="middle" fill="#1E1E1E" fontSize="14" fontWeight="600">Sous tension</text>
                  <text x="340" y="118" textAnchor="middle" fill="#757575" fontSize="11">Charge/Rythme</text>
                </g>

                <defs>
                  <linearGradient id="gradientTeam" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#0748EA" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
              </svg>
              {/* Labels des jours */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginTop: 8, paddingLeft: 20, paddingRight: 20 }}>
                {['L', 'M', 'M', 'J', 'V'].map((day, i) => (
                  <div key={i}>{day}</div>
                ))}
              </div>
            </div>

            {/* Stats : Jours */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24, textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--text)' }}>{excellentDays}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Jour Excellent</div>
              </div>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--text)' }}>{goodDays}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Jours corrects</div>
              </div>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--text)' }}>{difficultDays}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Jour difficile</div>
              </div>
            </div>
          </div>

          {/* Facteurs d'influence */}
          <div className="card" style={{ padding: isMobile ? '20px' : '32px' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px 0', color: 'var(--text)' }}>
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
                  color: 'var(--text)',
                  background: 'var(--card)'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Barres de progression */}
            {influenceFactors.map((factor, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: 'var(--text)' }}>{factor.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{factor.value}%</span>
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

      </div>
    </div>
  )
}
