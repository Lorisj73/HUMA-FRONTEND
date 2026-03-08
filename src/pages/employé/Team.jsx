import { useState, useEffect } from 'react'
import Soleil from '@/media/logo_meteo/Soleil.png'
import SoleilNuageux from '@/media/logo_meteo/Soleil_nuageux.png'
import HumaLoading from '@/media/HUMA-loading.gif'
import { getTeamStats, getWeeklySummary, getWeeklyFactors } from '../../services/teamService'

// Mapping des causes anglaises vers français
const CAUSE_LABELS = {
  'WORKLOAD': 'Charge / Rythme',
  'RELATIONS': 'Relations / Ambiance',
  'MOTIVATION': 'Sens / Motivation',
  'CLARITY': 'Organisation / Clarté',
  'RECOGNITION': 'Reconnaissance',
  'BALANCE': 'Équilibre pro/perso'
}

export default function Nous() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [selectedPeriod, setSelectedPeriod] = useState('Semaine')
  const [isManager, setIsManager] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // États pour les données
  const [teamStats, setTeamStats] = useState(null)
  const [weeklySummary, setWeeklySummary] = useState(null)
  const [weeklyFactors, setWeeklyFactors] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    
    // Vérifier si l'utilisateur est manager
    const managerStatus = localStorage.getItem('huma_is_manager')
    setIsManager(managerStatus === '1')
    
    // Charger les données initiales
    loadData()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Recharger les données quand la période change
  useEffect(() => {
    loadData()
  }, [selectedPeriod])

  const loadData = async () => {
    setIsLoading(true)
    try {
      // Mapper le texte français vers le format API
      const periodMap = {
        'Semaine': 'week',
        'Mois': 'month',
        'Année': 'year'
      }
      const period = periodMap[selectedPeriod] || 'week'

      // Charger les données en parallèle
      const [stats, summary, factors] = await Promise.all([
        getTeamStats(),
        getWeeklySummary(null, period),
        getWeeklyFactors(null, period)
      ])

      console.log('Team stats:', stats)
      console.log('Weekly summary:', summary)
      console.log('Weekly factors:', factors)

      setTeamStats(stats)
      setWeeklySummary(summary)
      setWeeklyFactors(factors)
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Gestion du chargement avec body scroll lock
  useEffect(() => {
    if (isGenerating) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isGenerating])

  const handleGenerateReport = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 5000)
  }

  // Calculer les valeurs à partir des données API
  const teamScore = teamStats?.globalScore ? (teamStats.globalScore / 10).toFixed(1) : 0
  const moodLabel = teamStats?.moodLabel || 'Chargement...'
  
  // Distribution des humeurs (depuis les stats)
  const distribution = teamStats?.distribution || {}
  
  // Facteurs d'influence (depuis weeklyFactors) - convertir en pourcentage
  const totalCount = weeklyFactors?.summary?.count || 0
  const influenceFactors = weeklyFactors?.availableCauses?.map(cause => {
    const data = weeklyFactors.byCause[cause]
    const count = data?.count || 0
    const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
    return {
      label: CAUSE_LABELS[cause] || cause,
      value: percentage
    }
  }).sort((a, b) => b.value - a.value) || [
    { label: 'Charge / Rythme', value: 0 },
    { label: 'Relations / Ambiance', value: 0 },
    { label: 'Sens / Motivation', value: 0 },
    { label: 'Organisation / Clarté', value: 0 },
    { label: 'Reconnaissance', value: 0 },
    { label: 'Équilibre pro/perso', value: 0 }
  ]

  // Stats basées sur le résumé hebdomadaire
  const stats = weeklySummary?.stats || {}
  const excellentDays = stats.excellent || 0
  const goodDays = stats.good || 0
  const difficultDays = stats.difficult || 0
  
  const tags = weeklyFactors?.availableCauses?.map(cause => CAUSE_LABELS[cause] || cause) || [
    'Charge / Rythme', 
    'Relations / Ambiance', 
    'Sens / Motivation', 
    'Organisation / Clarté', 
    'Reconnaissance', 
    'Équilibre pro/perso'
  ]

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

  // Générer les labels de l'axe X en fonction de la période
  const getChartLabels = () => {
    if (!weeklySummary?.daily || weeklySummary.daily.length === 0) {
      // Valeurs par défaut si pas de données
      switch (selectedPeriod) {
        case 'Semaine':
          return ['L', 'M', 'M', 'J', 'V']
        case 'Mois':
          return []
        case 'Année':
          return ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
        default:
          return []
      }
    }

    const daily = weeklySummary.daily

    switch (selectedPeriod) {
      case 'Semaine':
        // Afficher les jours de la semaine (L, M, M, J, V)
        return ['L', 'M', 'M', 'J', 'V']
      
      case 'Mois':
        // Pour le mois, créer un tableau avec des labels pour certains jours seulement
        // Afficher un label tous les ~5 jours pour éviter la surcharge
        const step = Math.ceil(daily.length / 6)
        return daily.map((d, i) => {
          if (i === 0 || i === daily.length - 1 || i % step === 0) {
            const date = new Date(d.date)
            return date.getDate().toString()
          }
          return '' // Label vide pour les autres jours
        })
      
      case 'Année':
        // Pour l'année, afficher les mois
        return daily.map(d => {
          const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
          const monthIndex = parseInt(d.month.split('-')[1]) - 1
          return monthNames[monthIndex]
        })
      
      default:
        return []
    }
  }

  // Générer les chemins SVG à partir des données daily
  const generateChartPaths = () => {
    if (!weeklySummary?.daily || weeklySummary.daily.length === 0) {
      return { teamPath: '', teamPoints: [] }
    }

    const daily = weeklySummary.daily
    const svgWidth = 600
    const svgHeight = 200
    const padding = 60
    const chartWidth = svgWidth - 2 * padding
    
    // Calculer les coordonnées X et Y pour chaque point
    const points = daily.map((day, index) => {
      // Pour l'année, on utilise averageMood, sinon moodValue
      let value = selectedPeriod === 'Année' ? day.averageMood : day.moodValue
      
      // Si pas de valeur, utiliser une valeur moyenne
      if (value === null || value === undefined) {
        value = 50 // Valeur par défaut au milieu
      }
      
      // Pour semaine/mois: moodValue est 0-100, on le convertit en 0-10
      // Pour année: averageMood est déjà 0-10
      const normalizedValue = selectedPeriod === 'Année' ? value : value / 10
      
      const x = padding + (index * chartWidth) / Math.max(daily.length - 1, 1)
      // Inverser Y: 10 = haut (y petit), 0 = bas (y grand)
      const y = svgHeight - (normalizedValue / 10) * svgHeight + 10
      
      return { x, y, value: normalizedValue }
    })

    // Générer le path SVG (ligne simple)
    const teamPath = points.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`
    ).join(' ')

    return { teamPath, teamPoints: points }
  }

  const { teamPath, teamPoints } = generateChartPaths()

  // Afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="container" style={{ paddingTop: 40, textAlign: 'center' }}>
        <div className="card" style={{ padding: 40 }}>
          <div style={{ fontSize: 16, color: '#757575' }}>Chargement des données de l'équipe...</div>
        </div>
      </div>
    )
  }

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
          
          {/* Bouton Générer un compte rendu (uniquement pour les managers) */}
          {isManager && (
            <button
              onClick={handleGenerateReport}
              style={{
                padding: '12px 24px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              Générer un compte rendu
            </button>
          )}
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
                {moodLabel}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
                {Object.keys(distribution).length > 0 
                  ? `Les principales influences sont : ${Object.keys(distribution).slice(0, 3).map(cause => CAUSE_LABELS[cause] || cause).join(', ')}.`
                  : 'Pas encore de données disponibles pour aujourd\'hui.'}
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
                    {moodLabel.split(' - ')[0] || 'Serein'}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats des humeurs - Distribution basée sur les données API */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Object.entries(distribution).length > 0 ? (
                Object.entries(distribution).map(([cause, percentage]) => (
                  <div key={cause} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, color: 'var(--muted)' }}>{CAUSE_LABELS[cause] || cause}</span>
                    <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{percentage}%</span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: 14, color: 'var(--muted)', textAlign: 'center', padding: '20px 0' }}>
                  Aucune donnée disponible
                </div>
              )}
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
              Evolution sur {selectedPeriod === 'Semaine' ? 'la semaine' : selectedPeriod === 'Mois' ? 'le mois' : 'l\'année'}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 20px 0' }}>
              Les humeurs quotidiennes de ton équipe {selectedPeriod === 'Semaine' ? 'cette semaine' : selectedPeriod === 'Mois' ? 'ce mois' : 'cette année'}
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
                
                {/* Courbe bleue (Mon équipe) - Dynamique */}
                {teamPath && (
                  <>
                    <path d={teamPath} fill="none" stroke="#0748EA" strokeWidth="3" />
                    {teamPoints.map((point, i) => (
                      <circle key={i} cx={point.x} cy={point.y} r="5" fill="white" stroke="#0748EA" strokeWidth="2" />
                    ))}
                  </>
                )}

                <defs>
                  <linearGradient id="gradientTeam" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#0748EA" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
              </svg>
              {/* Labels des jours */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginTop: 8, paddingLeft: 20, paddingRight: 20 }}>
                {getChartLabels().map((label, i) => (
                  <div key={i} style={{ opacity: label ? 1 : 0, minWidth: selectedPeriod === 'Mois' ? '10px' : 'auto' }}>{label || ' '}</div>
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

      {/* Modal de chargement IA (uniquement pour les managers) */}
      {isManager && isGenerating && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: '48px',
            textAlign: 'center',
            maxWidth: '400px',
            margin: '0 20px'
          }}>
            <img 
              src={HumaLoading} 
              alt="Génération en cours" 
              style={{ 
                width: '120px', 
                height: '120px',
                marginBottom: '24px',
                display: 'block',
                margin: '0 auto 24px'
              }} 
            />
            <h3 style={{
              fontSize: 20,
              fontWeight: 600,
              margin: '0 0 12px 0',
              color: '#1E1E1E'
            }}>
              Génération en cours...
            </h3>
            <p style={{
              fontSize: 14,
              color: '#757575',
              margin: 0,
              lineHeight: 1.6
            }}>
              L'IA analyse les données de votre équipe pour générer un compte rendu personnalisé.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
