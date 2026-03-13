import { useState, useEffect, useRef } from 'react'
import MascotteIdle from '@/media/mascotte/idle.png'
import HumaLoading from '@/media/HUMA-loading.gif'
import WeeklyChart from '@/components/WeeklyChart'
import { getTeamStats, getWeeklySummary, getWeeklyFactors, getWeeklyInsight, generateWeeklyAnalysisReport } from '../../services/teamService'

// Mapping des causes anglaises vers français
const CAUSE_LABELS = {
  'WORKLOAD': 'Charge / Rythme',
  'RELATIONS': 'Relations / Ambiance',
  'MOTIVATION': 'Sens / Motivation',
  'CLARITY': 'Organisation / Clarté',
  'RECOGNITION': 'Reconnaissance',
  'BALANCE': 'Équilibre pro/perso'
}

const ALL_CAUSES = ['WORKLOAD', 'RELATIONS', 'MOTIVATION', 'CLARITY', 'RECOGNITION', 'BALANCE']

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
  const [weeklyInsight, setWeeklyInsight] = useState(null)
  const [aiReport, setAiReport] = useState(null)
  
  // Référence pour le scroll automatique
  const aiResultsRef = useRef(null)

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
      const [stats, summary, factors, insight] = await Promise.all([
        getTeamStats(),
        getWeeklySummary(null, period),
        getWeeklyFactors(null, period),
        getWeeklyInsight()
      ])

      console.log('Team stats:', stats)
      console.log('Weekly summary:', summary)
      console.log('Weekly factors:', factors)

      setTeamStats(stats)
      setWeeklySummary(summary)
      setWeeklyFactors(factors)
      setWeeklyInsight(insight)
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

  // Scroll automatique vers les résultats IA après génération
  useEffect(() => {
    if (aiReport && !isGenerating && aiResultsRef.current) {
      setTimeout(() => {
        aiResultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 100)
    }
  }, [aiReport, isGenerating])

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      const report = await generateWeeklyAnalysisReport()
      console.log('AI Report generated:', report)
      setAiReport(report)
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error)
      // TODO: Afficher un message d'erreur à l'utilisateur
    } finally {
      setIsGenerating(false)
    }
  }

  // Calculer les valeurs à partir des données API
  const teamScore = weeklySummary?.dashboard?.qvtBarometer?.value ?? 0
  const insightAverageMood = weeklyInsight?.metrics?.averageMood
  const insightTopCauses = weeklyInsight?.metrics?.topCauses || []
  const insightParticipationRate = weeklyInsight?.metrics?.participationRate || 0
  const insightParticipation = weeklyInsight?.metrics?.participation || 0

  const climateTitle = insightAverageMood !== null && insightAverageMood !== undefined
    ? `Moyenne hebdo: ${String(insightAverageMood).replace('.', ',')}/10`
    : weeklyInsight?.generated
      ? 'Synthèse hebdomadaire de l\'équipe'
      : 'Pas de synthèse disponible'

  const climateDescription = weeklyInsight?.summaryText || (
    insightTopCauses.length > 0
      ? `Les principales influences sont : ${insightTopCauses.slice(0, 3).map(cause => CAUSE_LABELS[cause] || cause).join(', ')}.`
      : 'Pas encore de données disponibles pour cette semaine.'
  )
  
  // Adapter les donnees API equipe au format attendu par WeeklyChart (comme dans la page Moi)
  const teamChartData = (() => {
    const daily = weeklySummary?.daily || []
    if (daily.length === 0) return []
    const now = new Date()
    const todayLocal = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

    if (selectedPeriod === 'Semaine') {
      return daily.map((item) => ({
        date: item.date,
        status: item.moodValue !== null && item.moodValue !== undefined ? 'completed' : 'missing',
        moodValue: item.moodValue ?? 0
      }))
    }

    if (selectedPeriod === 'Mois') {
      // Ne pas afficher les jours futurs du mois en cours.
      const visibleDaily = daily.filter((item) => item.date <= todayLocal)
      if (visibleDaily.length === 0) return []

      const groupedByWeek = {}

      visibleDaily.forEach((item) => {
        const date = new Date(item.date)
        const weekOfMonth = Math.floor((date.getDate() - 1) / 7)
        if (!groupedByWeek[weekOfMonth]) groupedByWeek[weekOfMonth] = []
        groupedByWeek[weekOfMonth].push(item)
      })

      return Object.keys(groupedByWeek)
        .sort((a, b) => Number(a) - Number(b))
        .map((weekKey) => {
          const items = groupedByWeek[weekKey]
          const completed = items.filter((entry) => entry.moodValue !== null && entry.moodValue !== undefined)

          if (completed.length > 0) {
            const avgMood = completed.reduce((sum, entry) => sum + entry.moodValue, 0) / completed.length
            return {
              date: items[0].date,
              status: 'completed',
              moodValue: Math.round(avgMood)
            }
          }

          return {
            date: items[0].date,
            status: 'missing',
            moodValue: 0
          }
        })
    }

    // Annee: l'API renvoie averageMood sur 10, WeeklyChart attend moodValue sur 100
    // Ne pas afficher les mois futurs de l'annee en cours.
    return daily
      .filter((item) => item.month <= currentYearMonth)
      .map((item) => ({
      date: `${item.month}-01`,
      status: item.averageMood !== null && item.averageMood !== undefined ? 'completed' : 'missing',
      moodValue: item.averageMood !== null && item.averageMood !== undefined ? Math.round(item.averageMood * 10) : 0
      }))
  })()

  // Facteurs d'influence: afficher les 6 causes, meme si absentes de la reponse.
  // Le backend expose les volumes par cause dans byCause[cause].totalCheckins.
  const causeMentions = ALL_CAUSES.reduce((acc, cause) => {
    acc[cause] = weeklyFactors?.byCause?.[cause]?.totalCheckins || 0
    return acc
  }, {})
  const totalCauseMentions = Object.values(causeMentions).reduce((sum, value) => sum + value, 0)

  const influenceFactors = ALL_CAUSES.map((cause) => {
    const count = causeMentions[cause] || 0
    const percentage = totalCauseMentions > 0 ? Math.round((count / totalCauseMentions) * 100) : 0
    return {
      cause,
      label: CAUSE_LABELS[cause] || cause,
      value: percentage,
      count
    }
  })

  // Stats basées sur le résumé hebdomadaire
  const stats = weeklySummary?.stats || {}
  const excellentDays = stats.excellentDays || 0
  const goodDays = stats.correctDays || 0
  const difficultDays = stats.difficultDays || 0
  
  const tags = ALL_CAUSES.map(cause => CAUSE_LABELS[cause])

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

  const clampedTeamScore = Math.max(0, Math.min(10, Number(teamScore) || 0))
  const cursorPos = calculateCursorPosition(clampedTeamScore)

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

        {/* Carte Climat de l'equipe (seule sur sa ligne) */}
        <div className="card" style={{ padding: isMobile ? '20px' : '32px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
              Synthese de la semaine
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 18 }}>
            <img
              src={MascotteIdle}
              alt="Mascotte HUMA"
              style={{
                width: isMobile ? 58 : 72,
                height: isMobile ? 58 : 72,
                objectFit: 'contain',
                flexShrink: 0
              }}
            />

            <div style={{
              position: 'relative',
              background: '#F2F6FF',
              padding: isMobile ? '14px 16px' : '16px 20px',
              borderRadius: 10,
              border: '1px solid #C8D9FC',
              flex: 1
            }}>
              <div style={{
                position: 'absolute',
                left: -7,
                top: '50%',
                width: 14,
                height: 14,
                background: '#D7DEE9',
                borderLeft: '1px solid #B9C8EE',
                borderBottom: '1px solid #B9C8EE',
                transform: 'translateY(-50%) rotate(45deg)'
              }} />

              <h3 style={{ fontSize: isMobile ? 20 : 20, fontWeight: 700, margin: '0 0 10px 0', color: '#2F2F33', lineHeight: 1.1 }}>
                {climateTitle}
              </h3>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#2F2F33', margin: 0, lineHeight: 1.4 }}>
                {climateDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Ligne KPI : Humeur, Participation, Barometre QVT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 20
        }}>
          <div className="card" style={{ padding: isMobile ? '20px' : '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#0748EA',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18
              }}>☀</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)' }}>Humeur moyenne</h3>
            </div>
            <div style={{ fontSize: 44, fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: 6 }}>
              {insightAverageMood !== null && insightAverageMood !== undefined ? String(insightAverageMood).replace('.', ',') : '--'}
              <span style={{ fontSize: 30, fontWeight: 400, color: 'var(--muted)' }}>/10</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>Moyenne sur la semaine</p>
          </div>

          <div className="card" style={{ padding: isMobile ? '20px' : '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#0748EA',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18
              }}>✦</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)' }}>Participation</h3>
            </div>
            <div style={{ fontSize: 44, fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: 6 }}>
              {insightParticipationRate}
              <span style={{ fontSize: 30, fontWeight: 400, color: 'var(--muted)' }}> %</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>{insightParticipation} reponses actives cette semaine</p>
          </div>

          <div className="card" style={{ padding: isMobile ? '20px' : '24px' }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px 0', color: '#1A1F36' }}>
              Barometre QVT equipe
            </h3>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <div style={{ position: 'relative', width: 220, height: 120 }}>
                <svg width="220" height="110" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="qvtBlueGradient" x1="35" y1="100" x2="205" y2="100" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#DCE7FD" />
                      <stop offset="60%" stopColor="#8FB0F2" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>

                  {/* Arc degrade bleu */}
                  <path
                    d="M 35,100 A 85,85 0 0,1 205,100"
                    fill="none"
                    stroke="url(#qvtBlueGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />

                  {/* Curseur */}
                  <circle cx={cursorPos.x} cy={cursorPos.y} r="9" fill="#2C2C2C" />
                  <circle cx={cursorPos.x} cy={cursorPos.y} r="6" fill="none" stroke="white" strokeWidth="2.5" />
                </svg>

                <div style={{
                  position: 'absolute',
                  bottom: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 42, fontWeight: 700, color: '#1A1F36', lineHeight: 1 }}>
                    {clampedTeamScore.toFixed(1).replace('.', ',')}
                    <span style={{ fontSize: 26, fontWeight: 400, color: 'var(--muted)' }}>/10</span>
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, textAlign: 'center' }}>
              Indice annuel evolutif
            </p>
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

            {/* Graphique identique a la page Moi */}
            <div style={{ marginBottom: 24 }}>
              <WeeklyChart data={teamChartData} period={selectedPeriod} />
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

        {/* Section Résultats IA (uniquement pour les managers) */}
        {isManager && aiReport && (
          <div ref={aiResultsRef} style={{ marginTop: 40 }}>
            {/* Stats Overview */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
              gap: 16, 
              marginBottom: 32 
            }}>
              <div className="card" style={{ padding: 24, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ 
                    padding: 8, 
                    background: '#d1fae5', 
                    borderRadius: 8,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>Points forts identifiés</p>
                    <p style={{ fontSize: 32, fontWeight: 600, color: 'var(--text)', margin: '4px 0' }}>
                      {aiReport.strengths?.length || 0}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>École fonctionnelle</p>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 24, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ 
                    padding: 8, 
                    background: '#fef3c7', 
                    borderRadius: 8,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>Causes du mal-être</p>
                    <p style={{ fontSize: 32, fontWeight: 600, color: 'var(--text)', margin: '4px 0' }}>
                      {aiReport.weaknesses?.length || 0}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>À traiter en priorité</p>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 24, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ 
                    padding: 8, 
                    background: '#dbeafe', 
                    borderRadius: 8,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>Actions recommandées</p>
                    <p style={{ fontSize: 32, fontWeight: 600, color: 'var(--text)', margin: '4px 0' }}>
                      {aiReport.recommendedActions?.length || 0}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>Gain estimé +35%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Points forts et Points faibles */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 32,
              marginBottom: 32
            }}>
              {/* Points forts */}
              <div className="card" style={{ padding: isMobile ? 24 : 32, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Points forts identifiés</h2>
                </div>

                <div style={{ 
                  background: '#d1fae5', 
                  border: '1px solid #6ee7b7',
                  borderRadius: 8, 
                  padding: 16, 
                  marginBottom: 24 
                }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#064e3b', margin: 0 }}>
                    {aiReport.overview?.summary || "L'équipe fonctionne humainement. Il faut capitaliser sur la cohésion."}
                  </p>
                </div>

                <div style={{ marginTop: 24 }}>
                  {aiReport.strengths?.map((item, i) => {
                    const colors = ['#10b981', '#059669', '#34d399', '#6ee7b7']
                    return (
                      <div key={i} style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 13, color: 'var(--text)' }}>{item.title}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.weight}%</span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: 8,
                          background: '#d1fae5',
                          borderRadius: 20,
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${item.weight}%`,
                            height: '100%',
                            background: colors[i % colors.length],
                            borderRadius: 20
                          }} />
                        </div>
                      </div>
                    )
                  }) || []}
                </div>
              </div>

              {/* Points faibles */}
              <div className="card" style={{ padding: isMobile ? 24 : 32, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Points faibles majeurs</h2>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)', background: 'var(--bg)', padding: '4px 8px', borderRadius: 4 }}>
                    Causes du mal-être
                  </span>
                </div>

                <div style={{ 
                  background: '#fef3c7', 
                  border: '1px solid #fde68a',
                  borderRadius: 8, 
                  padding: 16, 
                  marginBottom: 24 
                }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#78350f', margin: 0 }}>
                    ⚠️ Tant que la charge et le rythme ne sont pas traités, aucune activité d'équipe ne compensera durablement.
                  </p>
                </div>

                <div style={{ marginTop: 24 }}>
                  {aiReport.weaknesses?.map((item, i) => {
                    const colors = ['#f59e0b', '#f97316', '#fb923c', '#fdba74', '#fed7aa']
                    return (
                      <div key={i} style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{item.title}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.weight}%</span>
                        </div>
                        <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 8px 0' }}>{item.description}</p>
                        <div style={{
                          width: '100%',
                          height: 8,
                          background: '#fef3c7',
                          borderRadius: 20,
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${item.weight}%`,
                            height: '100%',
                            background: colors[i % colors.length],
                            borderRadius: 20
                          }} />
                        </div>
                      </div>
                    )
                  }) || []}
                </div>
              </div>
            </div>

            {/* Actions concrètes */}
            <div className="card" style={{ padding: isMobile ? 24 : 32, border: '1px solid var(--border)', marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Actions concrètes recommandées</h2>
              </div>

              <div style={{ 
                background: '#dbeafe', 
                border: '1px solid #93c5fd',
                borderRadius: 8, 
                padding: 16, 
                marginBottom: 24 
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#1e3a8a', margin: 0 }}>
                  Classement par priorité et efficacité corrective estimée
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 24
              }}>
                {aiReport.recommendedActions?.map((action, i) => {
                  const priorityStyles = {
                    'Critique': { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b' },
                    'Très élevée': { bg: '#ffedd5', border: '#fdba74', text: '#9a3412' },
                    'Élevée': { bg: '#fef3c7', border: '#fde68a', text: '#78350f' },
                    'Moyenne': { bg: '#dbeafe', border: '#93c5fd', text: '#1e3a8a' },
                    'Complémentaire': { bg: '#f1f5f9', border: '#cbd5e1', text: '#334155' }
                  }
                  const style = priorityStyles[action.priority] || priorityStyles['Complémentaire']
                  
                  return (
                    <div key={i} style={{ 
                      border: '1px solid var(--border)', 
                      borderRadius: 8, 
                      padding: 20,
                      transition: 'box-shadow 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <h3 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 12, minHeight: '3rem', fontSize: 15 }}>
                        {action.title}
                      </h3>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 500,
                          background: style.bg,
                          border: `1px solid ${style.border}`,
                          color: style.text
                        }}>
                          {action.priority}
                        </span>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          background: '#d1fae5',
                          border: '1px solid #6ee7b7',
                          color: '#065f46',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                          </svg>
                          {action.estimatedImpact}
                        </span>
                      </div>

                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {action.checklist?.map((item, idx) => (
                          <li key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                            <input 
                              type="checkbox" 
                              style={{ 
                                marginTop: 4,
                                width: 16,
                                height: 16,
                                cursor: 'pointer'
                              }} 
                            />
                            <span style={{ fontSize: 14, color: 'var(--text)' }}>{item}</span>
                          </li>
                        )) || []}
                      </ul>
                    </div>
                  )
                }) || []}
              </div>
            </div>

            {/* Activités d'équipe */}
            <div style={{ 
              background: 'var(--bg)', 
              borderRadius: 8, 
              padding: isMobile ? 24 : 32, 
              border: '2px dashed var(--border)',
              marginBottom: 32
            }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Activités d'équipe recommandées</h2>
                  <p style={{ fontSize: 14, color: 'var(--muted)', margin: '4px 0 0 0' }}>Complément, pas substitution</p>
                </div>
              </div>

              <div style={{ 
                background: '#e2e8f0', 
                borderRadius: 8, 
                padding: 16, 
                marginBottom: 24,
                display: 'flex',
                gap: 12
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <p style={{ fontSize: 14, color: '#334155', margin: 0 }}>
                  Ces activités amplifient les effets positifs. Elles ne remplacent jamais une charge maîtrisée et des priorités claires. 
                  <span style={{ fontWeight: 500 }}> Bien utilisées, elles peuvent soutenir jusqu'à +30% d'amélioration perçue.</span>
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 24
              }}>
                {aiReport.teamActivities?.map((activity, i) => (
                  <div key={i} className="card" style={{ 
                    padding: 20,
                    border: '1px solid var(--border)',
                    transition: 'box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: 20,
                        fontSize: 14,
                        fontWeight: 600,
                        background: parseInt(activity.estimatedImpact) >= 15 ? '#d1fae5' : '#dbeafe',
                        border: parseInt(activity.estimatedImpact) >= 15 ? '1px solid #6ee7b7' : '1px solid #93c5fd',
                        color: parseInt(activity.estimatedImpact) >= 15 ? '#065f46' : '#1e3a8a'
                      }}>
                        {activity.estimatedImpact}
                      </span>
                    </div>

                    <h3 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 8, minHeight: '3rem', fontSize: 15 }}>
                      {activity.title}
                    </h3>

                    <p style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      background: 'var(--bg)',
                      padding: '4px 8px',
                      borderRadius: 4,
                      marginBottom: 12,
                      display: 'inline-block'
                    }}>
                      {activity.format}
                    </p>

                    <div style={{ marginBottom: 12 }}>
                      <p style={{ 
                        fontSize: 11, 
                        fontWeight: 500, 
                        color: 'var(--muted)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        margin: '0 0 4px 0' 
                      }}>
                        Objectif
                      </p>
                      <p style={{ fontSize: 14, color: 'var(--text)', margin: 0 }}>{activity.objective}</p>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <p style={{ 
                        fontSize: 11, 
                        fontWeight: 500, 
                        color: 'var(--muted)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        margin: '0 0 8px 0' 
                      }}>
                        Principe
                      </p>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {activity.bullets?.map((bullet, idx) => (
                          <li key={idx} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 14, color: 'var(--text)' }}>
                            <span style={{ color: 'var(--muted)' }}>•</span>
                            <span>{bullet}</span>
                          </li>
                        )) || []}
                      </ul>
                    </div>

                    <div style={{ 
                      paddingTop: 12, 
                      marginTop: 12, 
                      borderTop: '1px solid var(--border)' 
                    }}>
                      <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
                        <span style={{ fontWeight: 500 }}>Impact :</span> {activity.benefit}
                      </p>
                    </div>
                  </div>
                )) || []}
              </div>
            </div>

            {/* Message clé */}
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: 8,
              padding: isMobile ? 24 : 32,
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', margin: 0 }}>Message clé à retenir</h2>
                <span style={{ marginLeft: 'auto', fontSize: 12, background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 4 }}>
                  Manager
                </span>
              </div>

              <div style={{ marginBottom: 24 }}>
                {[
                  { text: 'Les activités d\'équipe amplifient les effets positifs.', color: '#10b981' },
                  { text: 'Elles ne remplacent jamais une charge maîtrisée et des priorités claires.', color: '#f59e0b' },
                  { text: 'Bien utilisées, elles peuvent soutenir jusqu\'à +30% d\'amélioration perçue, mais uniquement si les actions structurelles sont engagées.', color: '#3b82f6' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path d="M9 11l3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                      {item.text.includes('+30%') ? (
                        <>
                          {item.text.split('+30%')[0]}
                          <span style={{ fontWeight: 600 }}>+30%</span>
                          {item.text.split('+30%')[1]}
                        </>
                      ) : item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ 
                borderTop: '1px solid rgba(255,255,255,0.2)', 
                paddingTop: 24 
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
                  Si tu veux, je peux aussi :
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: 12
                }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    padding: 16,
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  >
                    <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>📊 Présentation managériale</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      Transformer ce rapport en présentation
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    padding: 16,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    display: 'flex',
                    gap: 12
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                        Calendrier combinant actions + activités sur 3 mois
                      </p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                        Planification concrète
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
