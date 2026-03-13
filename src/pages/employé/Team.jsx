import { useState, useEffect, useRef } from 'react'
import MascotteIdle from '@/media/mascotte/idle.png'
import MascotteIdleStar from '@/media/mascotte/idle_star.png'
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

export default function Nous() {
  const periodMap = {
    'Semaine': 'week',
    'Mois': 'month',
    'Année': 'year'
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [selectedPeriod, setSelectedPeriod] = useState('Semaine')
  const [isManager, setIsManager] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPeriodSwitching, setIsPeriodSwitching] = useState(false)
  const [selectedCause, setSelectedCause] = useState(null)
  
  // États pour les données
  const [teamStats, setTeamStats] = useState(null)
  const [weeklySummary, setWeeklySummary] = useState(null)
  const [weeklyFactors, setWeeklyFactors] = useState(null)
  const [periodCache, setPeriodCache] = useState({ summaries: {}, factors: {} })
  const [weeklyInsight, setWeeklyInsight] = useState(null)
  const [aiReport, setAiReport] = useState(null)
  
  // Référence pour le scroll automatique
  const aiResultsRef = useRef(null)

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const smoothScrollToElement = (element, duration = 950) => {
    if (!element) return

    const startY = window.scrollY
    const targetY = element.getBoundingClientRect().top + window.scrollY - 96
    const distance = targetY - startY
    const startTime = performance.now()

    const easeInOutCubic = (t) => {
      if (t < 0.5) return 4 * t * t * t
      return 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeInOutCubic(progress)

      window.scrollTo(0, startY + distance * easedProgress)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

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

  const loadData = async () => {
    setIsLoading(true)
    try {
      // Précharger toutes les périodes d'un coup pour éviter les rechargements au switch.
      const [stats, insight, weekSummary, monthSummary, yearSummary, weekFactors, monthFactors, yearFactors] = await Promise.all([
        getTeamStats(),
        getWeeklyInsight(),
        getWeeklySummary(null, 'week'),
        getWeeklySummary(null, 'month'),
        getWeeklySummary(null, 'year'),
        getWeeklyFactors(null, 'week'),
        getWeeklyFactors(null, 'month'),
        getWeeklyFactors(null, 'year')
      ])

      const summaries = {
        week: weekSummary,
        month: monthSummary,
        year: yearSummary
      }

      const factors = {
        week: weekFactors,
        month: monthFactors,
        year: yearFactors
      }

      const currentPeriod = periodMap[selectedPeriod] || 'week'

      console.log('Team stats:', stats)
      console.log('Weekly summary cache:', summaries)
      console.log('Weekly factors cache:', factors)

      setTeamStats(stats)
      setPeriodCache({ summaries, factors })
      setWeeklySummary(summaries[currentPeriod] || summaries.week || null)
      setWeeklyFactors(factors[currentPeriod] || factors.week || null)
      setWeeklyInsight(insight)
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Changer de période sans recharger: on bascule sur les données déjà en cache.
  useEffect(() => {
    const period = periodMap[selectedPeriod] || 'week'
    const nextSummary = periodCache.summaries[period]
    const nextFactors = periodCache.factors[period]

    if (!nextSummary && !nextFactors) return

    setIsPeriodSwitching(true)
    setWeeklySummary(nextSummary || null)
    setWeeklyFactors(nextFactors || null)

    const timer = setTimeout(() => setIsPeriodSwitching(false), 220)
    return () => clearTimeout(timer)
  }, [selectedPeriod, periodCache])

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
        smoothScrollToElement(aiResultsRef.current)
      }, 100)
    }
  }, [aiReport, isGenerating])

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    const requestStartedAt = Date.now()
    try {
      const report = await generateWeeklyAnalysisReport()

      const elapsed = Date.now() - requestStartedAt
      const remainingDelay = Math.max(0, 2000 - elapsed)
      if (remainingDelay > 0) {
        await wait(remainingDelay)
      }

      console.log('AI Report generated:', report)
      setAiReport(report)
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error)
      // TODO: Afficher un message d'erreur à l'utilisateur
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReportButtonClick = () => {
    if (aiReport && aiResultsRef.current) {
      smoothScrollToElement(aiResultsRef.current)
      return
    }

    handleGenerateReport()
  }

  const handleDownloadReport = () => {
    if (!aiReport || !aiResultsRef.current) return

    const exportToPdf = async () => {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ])

      const reportElement = aiResultsRef.current
      const hiddenElements = Array.from(reportElement.querySelectorAll('[data-pdf-hide="true"]'))
      const previousDisplayValues = hiddenElements.map((element) => element.style.display)

      try {
        hiddenElements.forEach((element) => {
          element.style.display = 'none'
        })

        const canvas = await html2canvas(reportElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#FFFFFF',
          logging: false,
          windowWidth: document.documentElement.scrollWidth
        })

        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const margin = 8
        const printableWidth = pageWidth - margin * 2
        const printableHeight = pageHeight - margin * 2

        const pageHeightInPx = Math.floor((printableHeight * canvas.width) / printableWidth)
        const totalPages = Math.ceil(canvas.height / pageHeightInPx)

        for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
          if (pageIndex > 0) {
            pdf.addPage()
          }

          const sourceY = pageIndex * pageHeightInPx
          const sourceHeight = Math.min(pageHeightInPx, canvas.height - sourceY)
          const pageCanvas = document.createElement('canvas')
          pageCanvas.width = canvas.width
          pageCanvas.height = sourceHeight

          const pageContext = pageCanvas.getContext('2d')
          if (!pageContext) {
            throw new Error('Impossible de générer le contexte canvas pour l\'export PDF.')
          }

          pageContext.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sourceHeight,
            0,
            0,
            canvas.width,
            sourceHeight
          )

          const pageImage = pageCanvas.toDataURL('image/png')
          const renderedHeight = (sourceHeight * printableWidth) / canvas.width
          pdf.addImage(pageImage, 'PNG', margin, margin, printableWidth, renderedHeight, undefined, 'FAST')
        }

        const fileDate = new Date().toISOString().slice(0, 10)
        pdf.save(`rapport-analyse-hebdomadaire-${fileDate}.pdf`)
      } finally {
        hiddenElements.forEach((element, index) => {
          element.style.display = previousDisplayValues[index]
        })
      }
    }

    exportToPdf().catch((error) => {
      console.error('Erreur lors du téléchargement du PDF:', error)
    })
  }

  // Calculer les valeurs à partir des données API
  const teamScore = weeklySummary?.dashboard?.qvtBarometer?.value ?? 0
  const insightAverageMood = weeklyInsight?.metrics?.averageMood
  const insightTopCauses = weeklyInsight?.metrics?.topCauses || []
  const insightParticipationRate = weeklyInsight?.metrics?.participationRate || 0
  const insightPreviousParticipationRate = weeklyInsight?.metrics?.previousParticipationRate
  const participationRateDelta = insightPreviousParticipationRate !== null && insightPreviousParticipationRate !== undefined
    ? insightParticipationRate - insightPreviousParticipationRate
    : null
  const participationRateDeltaLabel = participationRateDelta === null
    ? 'Variation indisponible'
    : `${participationRateDelta > 0 ? '+' : ''}${String(participationRateDelta).replace('.', ',')}% vs semaine dernière`

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

  const strengthPalette = ['#1D4ED8', '#5B84E2', '#8EA8E0', '#AFC3EA']
  const rawStrengths = (aiReport?.strengths || [])
    .slice(0, 4)
    .map((item) => ({
      title: item.title,
      weight: Number.isFinite(Number(item.weight)) ? Math.max(0, Number(item.weight)) : 0
    }))

  const strengthsTotal = rawStrengths.reduce((sum, item) => sum + item.weight, 0)
  const chartStrengths = strengthsTotal > 0
    ? rawStrengths.map((item) => ({ ...item, weight: (item.weight / strengthsTotal) * 100 }))
    : []

  let accumulatedAngle = -90
  const strengthsPieSegments = chartStrengths.map((item, index) => {
    const angle = (item.weight / 100) * 360
    const segment = {
      ...item,
      color: strengthPalette[index % strengthPalette.length],
      startAngle: accumulatedAngle,
      endAngle: accumulatedAngle + angle
    }
    accumulatedAngle += angle
    return segment
  })

  const leftStrengthLabels = chartStrengths.filter((_, index) => index % 2 === 0)
  const rightStrengthLabels = chartStrengths.filter((_, index) => index % 2 === 1)

  const pieRadius = 70
  const pieCenter = 90
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }

  const createPieSlicePath = (centerX, centerY, radius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, startAngle)
    const end = polarToCartesian(centerX, centerY, radius, endAngle)
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
    return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`
  }
  
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

  const availableCauses = weeklyFactors?.availableCauses || []

  // Si la cause sélectionnée n'existe plus (changement de période), on réinitialise le filtre.
  useEffect(() => {
    if (selectedCause && !availableCauses.includes(selectedCause)) {
      setSelectedCause(null)
    }
  }, [selectedCause, availableCauses])

  // Les barres représentent les états (buckets) globaux, ou ceux de la cause filtrée.
  const activeBucketSource = selectedCause
    ? weeklyFactors?.byCause?.[selectedCause]
    : weeklyFactors?.summary

  const influenceFactors = (activeBucketSource?.buckets || []).map((bucket) => ({
    label: bucket.label,
    value: Number.isFinite(bucket.percent) ? bucket.percent : 0,
    count: Number.isFinite(bucket.count) ? bucket.count : 0
  }))

  // Stats basées sur le résumé hebdomadaire
  const stats = weeklySummary?.stats || {}
  const excellentDays = stats.excellentDays || 0
  const goodDays = stats.correctDays || 0
  const difficultDays = stats.difficultDays || 0
  
  const tags = availableCauses.map((cause) => ({
    key: cause,
    label: CAUSE_LABELS[cause] || cause
  }))

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
              padding: isMobile
                ? (isManager ? '14px 16px 64px 16px' : '14px 16px')
                : (isManager ? '16px 20px 66px 20px' : '16px 20px'),
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

              {/* Bouton Générer un compte rendu (uniquement pour les managers) */}
              {isManager && (
                <button
                  onClick={handleReportButtonClick}
                  style={{
                    position: 'absolute',
                    right: isMobile ? 12 : 16,
                    bottom: isMobile ? 12 : 16,
                    padding: isMobile ? '10px 14px' : '10px 16px',
                    background: '#0748EA',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: isMobile ? 13 : 14,
                    fontWeight: 600,
                    marginTop: 32,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',

                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 4px 12px #0748EA'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 0px 0px #0748EA'
                  }}
                >
                  {aiReport ? 'Voir le rapport' : '✨ Générer mon rapport complet'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Ligne KPI : Humeur, Participation, Barometre QVT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 20,
          marginBottom: 24
        }}>
          <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 16, marginBottom: 16, width: '100%' }}>
              <div style={{
                width: 48,
                height: 48,
                minWidth: 48,
                minHeight: 48,
                maxWidth: 48,
                maxHeight: 48,
                aspectRatio: '1 / 1',
                flexShrink: 0,
                borderRadius: '50%',
                background: '#0748EA',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.91 13.474C11.8783 13.474 13.474 11.8783 13.474 9.91C13.474 7.94166 11.8783 6.346 9.91 6.346C7.94166 6.346 6.346 7.94166 6.346 9.91C6.346 11.8783 7.94166 13.474 9.91 13.474Z" fill="white" />
                  <path d="M9.91 1V2.782V1Z" fill="white" />
                  <path d="M9.91 17.038V18.82V17.038Z" fill="white" />
                  <path d="M3.61063 3.61063L4.86694 4.86694L3.61063 3.61063Z" fill="white" />
                  <path d="M14.9531 14.9531L16.2094 16.2094L14.9531 14.9531Z" fill="white" />
                  <path d="M1 9.91H2.782H1Z" fill="white" />
                  <path d="M17.038 9.91H18.82H17.038Z" fill="white" />
                  <path d="M4.86694 14.9531L3.61063 16.2094L4.86694 14.9531Z" fill="white" />
                  <path d="M16.2094 3.61063L14.9531 4.86694L16.2094 3.61063Z" fill="white" />
                  <path d="M9.91 1V2.782M9.91 17.038V18.82M3.61063 3.61063L4.86694 4.86694M14.9531 14.9531L16.2094 16.2094M1 9.91H2.782M17.038 9.91H18.82M4.86694 14.9531L3.61063 16.2094M16.2094 3.61063L14.9531 4.86694M13.474 9.91C13.474 11.8783 11.8783 13.474 9.91 13.474C7.94166 13.474 6.346 11.8783 6.346 9.91C6.346 7.94166 7.94166 6.346 9.91 6.346C11.8783 6.346 13.474 7.94166 13.474 9.91Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: 12, textAlign: 'left' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Humeur moyenne</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                    {insightAverageMood !== null && insightAverageMood !== undefined ? String(insightAverageMood).replace('.', ',') : '--'}
                  </span>
                  <span style={{ fontSize: 20, fontWeight: 400, color: 'var(--muted)' }}>/10</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>Moyenne sur la semaine</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 16, marginBottom: 16, width: '100%' }}>
              <div style={{
                width: 48,
                height: 48,
                minWidth: 48,
                minHeight: 48,
                maxWidth: 48,
                maxHeight: 48,
                aspectRatio: '1 / 1',
                flexShrink: 0,
                borderRadius: '50%',
                background: '#0748EA',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20
              }}>
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.1926 18.82L7.69811 7.12727L19.0309 11.6218C18.118 11.929 16.5818 12.5786 15.107 13.9744C13.1846 15.7915 12.456 17.8544 12.1838 18.82H12.1926Z" fill="white" />
                  <path d="M4.49402 9.76955L2.28188 12.2626M3.8532 6.62691L1.00024 5.34527M6.41647 4.06364L6.05656 1M10.0507 4.91513L12.3331 2.21141M12.1926 18.82L7.69811 7.12727L19.0309 11.6218C18.118 11.929 16.5818 12.5786 15.107 13.9744C13.1846 15.7915 12.456 17.8544 12.1838 18.82H12.1926Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: 12, textAlign: 'left' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Participation</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                    {insightParticipationRate}
                  </span>
                  <span style={{ fontSize: 20, fontWeight: 400, color: 'var(--muted)' }}>%</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>{participationRateDeltaLabel}</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                  Barometre QVT equipe
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <div style={{ position: 'relative', width: 170, height: 78 }}>
                <svg width="170" height="78" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    strokeWidth="10"
                    strokeLinecap="round"
                  />

                  {/* Curseur */}
                  <circle cx={cursorPos.x} cy={cursorPos.y} r="8" fill="#2C2C2C" />
                  <circle cx={cursorPos.x} cy={cursorPos.y} r="5" fill="none" stroke="white" strokeWidth="2" />
                </svg>

                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '58%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 3,
                  pointerEvents: 'none'
                }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: '#1A1F36', lineHeight: 1 }}>
                    {clampedTeamScore.toFixed(1).replace('.', ',')}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--muted)' }}>/10</span>
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
          gridTemplateColumns: isMobile ? '1fr' : '1.9fr 0.9fr',
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
                    border: selectedPeriod === period ? '1px solid #0748EA' : '1px solid #D9D9D9',
                    background: selectedPeriod === period ? '#0748EA' : 'white',
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
            <div style={{
              marginBottom: 24,
              opacity: isPeriodSwitching ? 0.45 : 1,
              transform: isPeriodSwitching ? 'translateY(6px)' : 'translateY(0)',
              transition: 'opacity 220ms ease, transform 220ms ease'
            }}>
              <WeeklyChart data={teamChartData} period={selectedPeriod} />
            </div>

            {/* Stats : Jours */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24, textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 24, color: 'var(--text)' }}>{excellentDays}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Jour Excellent</div>
              </div>
              <div>
                <div style={{ fontSize: 24, color: 'var(--text)' }}>{goodDays}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Jours corrects</div>
              </div>
              <div>
                <div style={{ fontSize: 24, color: 'var(--text)' }}>{difficultDays}</div>
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
              {tags.map((tag) => (
                <button
                  key={tag.key}
                  onClick={() => setSelectedCause((prev) => (prev === tag.key ? null : tag.key))}
                  style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  border: selectedCause === tag.key ? '1px solid #0748EA' : '1px solid #D9D9D9',
                  fontSize: 12,
                  color: selectedCause === tag.key ? '#0748EA' : 'var(--text)',
                  background: selectedCause === tag.key ? '#EEF4FF' : 'var(--card)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}>
                  {tag.label}
                </button>
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
                    borderRadius: 20,
                    transition: 'width 0.45s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Résultats IA (uniquement pour les managers) */}
        {isManager && aiReport && (
          <div ref={aiResultsRef} style={{ marginTop: 40 }}>
            <div style={{
              borderRadius: 12,
              padding: isMobile ? '16px' : '18px 20px',
              marginBottom: 24,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              justifyContent: 'space-between',
              gap: 16
            }}>
              <div>
                <h2 style={{ fontSize: isMobile ? 32 : 40, fontWeight: 700, margin: 0, color: '#1F2430', lineHeight: 1.1 }}>
                  Rapport d'analyse hebdomadaire
                </h2>
                <p style={{ fontSize: 15, color: '#4A5568', margin: '8px 0 0 0' }}>
                  Vue d'ensemble des performances et recommandations
                </p>
              </div>

              <button
                data-pdf-hide="true"
                onClick={handleDownloadReport}
                style={{
                  padding: '12px 22px',
                  background: '#0748EA',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(7,72,234,0.35)',
                  alignSelf: isMobile ? 'flex-start' : 'auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(7,72,234,0.45)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(7,72,234,0.35)'
                }}
              >
                Télécharger mon rapport
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
              gap: 24,
              alignItems: 'stretch',
              marginBottom: 32
            }}>
              <div className="card" style={{ padding: isMobile ? 20 : 28, border: '1px solid var(--border)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 10, marginBottom: 4 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#0748EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 1
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_3993_63198)">
                      <path d="M12 22.71C17.915 22.71 22.71 17.915 22.71 12C22.71 6.08507 17.915 1.29004 12 1.29004C6.08507 1.29004 1.29004 6.08507 1.29004 12C1.29004 17.915 6.08507 22.71 12 22.71Z" stroke="white" strokeWidth="1.8" strokeMiterlimit="10" />
                      <path d="M7.47021 13.4101L9.80022 15.1901C10.1802 15.4801 10.7302 15.4201 11.0402 15.0601L16.5202 8.61011" stroke="white" strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_3993_63198">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#202430', lineHeight: 1.05 }}>
                    Points forts identifiés
                  </h3>
                  <p style={{ fontSize: 14, color: '#666D7A', margin: '6px 0 0 0' }}>
                    Par ordre d'importance actuel
                  </p>
                </div>
              </div>

              <div style={{
                background: '#F2F6FF',
                border: '1px solid #C8D9FC',
                borderRadius: 10,
                padding: isMobile ? '14px 16px' : '14px 18px',
                marginTop: 18,
                marginBottom: 24
              }}>
                <p style={{ fontSize: 16, color: '#1E1E1E', margin: 0, lineHeight: 1.4 }}>
                  {aiReport.strengthsSummary || aiReport.overview?.summary || "Résumé des points forts indisponible."}
                </p>
              </div>

              {chartStrengths.length === 0 ? (
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>Aucune donnée disponible pour le camembert.</p>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr',
                  alignItems: 'center',
                  gap: isMobile ? 18 : 24,
                  marginTop: 'auto',
                  marginBottom: 'auto'
                }}>
                  <div style={{ display: 'grid', gap: 14 }}>
                    {leftStrengthLabels.map((item, index) => (
                      <div key={`left-${index}`} style={{ textAlign: isMobile ? 'left' : 'right' }}>
                        <div style={{ fontSize: 16, color: '#303644' }}>{Math.round(item.weight)}%</div>
                        <div style={{ fontSize: 14, color: '#5C6473', lineHeight: 1.25 }}>{item.title}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <svg width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="Diagramme camembert des points forts">
                      {strengthsPieSegments.map((segment, index) => (
                        <path
                          key={`slice-${index}`}
                          d={createPieSlicePath(pieCenter, pieCenter, pieRadius, segment.startAngle, segment.endAngle)}
                          fill={segment.color}
                        />
                      ))}
                    </svg>
                  </div>

                  <div style={{ display: 'grid', gap: 14 }}>
                    {rightStrengthLabels.map((item, index) => (
                      <div key={`right-${index}`} style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 16, color: '#303644' }}>{Math.round(item.weight)}%</div>
                        <div style={{ fontSize: 14, color: '#5C6473', lineHeight: 1.25 }}>{item.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>

            {/* Points faibles */}
            <div className="card" style={{ padding: isMobile ? 24 : 32, border: '1px solid var(--border)', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" fill="#0748EA" />
                    <circle cx="12" cy="12" r="12" fill="none" stroke="#8FB0F2" strokeWidth="1" />
                    <circle cx="12" cy="12" r="8.3" fill="#1D4ED8" />
                    <rect x="11" y="6.3" width="2" height="8" rx="1" fill="white" />
                    <circle cx="12" cy="16.9" r="1.4" fill="white" />
                  </svg>
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Points faibles majeurs</h2>
                  <p style={{ fontSize: 14, color: '#666D7A', margin: '6px 0 0 0' }}>
                    Poids dans l'insatisfaction globale
                  </p>
                </div>
              </div>

              <div style={{
                background: '#F2F6FF',
                border: '1px solid #C8D9FC',
                borderRadius: 8,
                padding: 16,
                marginBottom: 24
              }}>
                <p style={{ fontSize: 16, color: '#1E1E1E', margin: 0 }}>
                  {aiReport.weaknessesSummary || "Résumé des points faibles indisponible."}
                </p>
              </div>

              <div style={{ marginTop: 24 }}>
                {aiReport.weaknesses?.map((item, i) => {
                  const colors = ['#1D4ED8', '#5B84E2', '#8EA8E0', '#AFC3EA', '#D9E4FA']
                  return (
                    <div key={i} style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{item.title}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.weight}%</span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: 8,
                        background: '#E8EEFC',
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
            <div style={{ padding: isMobile ? 24 : 32, marginBottom: 32 }}>
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E3E8F5',
                borderRadius: 10,
                padding: 16,
                marginBottom: 24
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                  <img
                    src={MascotteIdleStar}
                    alt="Icône actions"
                    style={{ width: 43, height: 40, objectFit: 'contain' }}
                  />
                  <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Actions concrètes recommandées</h2>
                </div>

                <div style={{
                  background: '#F2F6FF',
                  border: '1px solid #C8D9FC',
                  borderRadius: 8,
                  padding: 16
                }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#1E1E1E', margin: 0 }}>
                    Classement par priorité et efficacité corrective estimée
                  </p>
                </div>
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
                      background: '#FFFFFF',
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

                      <ul style={{ margin: 0, paddingLeft: 18, listStyle: 'disc' }}>
                        {action.checklist?.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: 8, fontSize: 14, color: 'var(--text)' }}>
                            {item}
                          </li>
                        )) || []}
                      </ul>
                    </div>
                  )
                }) || []}
              </div>
            </div>

            {/* Activités d'équipe */}
            <div style={{padding: isMobile ? 24 : 32,
              marginBottom: 32
            }}>
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #C5D0E8',
                borderRadius: 10,
                padding: 16,
                marginBottom: 24
              }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                  <img
                    src={MascotteIdleStar}
                    alt="Icône activités"
                    style={{ width: 43, height: 40, objectFit: 'contain' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Activités d'équipe recommandées</h2>
                  </div>
                </div>

                <div style={{
                  background: '#F2F6FF',
                  borderRadius: 8,
                  padding: 16,
                  border: '1px solid #C8D9FC'
                }}>
                  <p style={{ fontSize: 14, color: '#1E1E1E', margin: '0 0 10px 0' }}>
                    Bien utilisées, elles peuvent soutenir jusqu'à +30% d'amélioration perçue.
                  </p>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 1 }}>
                      <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z" fill="#0748EA"/>
                      <g clipPath="url(#clip0_3993_63421)">
                        <path d="M15 25.71C20.915 25.71 25.71 20.915 25.71 15C25.71 9.08507 20.915 4.29004 15 4.29004C9.08507 4.29004 4.29004 9.08507 4.29004 15C4.29004 20.915 9.08507 25.71 15 25.71Z" stroke="white" strokeWidth="1.8" strokeMiterlimit="10"/>
                        <path d="M15.0001 11.2799C14.6001 11.2799 14.2601 11.1399 14.0001 10.8699C13.7401 10.5999 13.6001 10.2599 13.6001 9.85994C13.6001 9.45994 13.7301 9.12994 14.0001 8.85994C14.2701 8.57994 14.6001 8.43994 15.0001 8.43994C15.4001 8.43994 15.7501 8.57994 16.0101 8.85994C16.2701 9.13994 16.4001 9.46994 16.4001 9.85994C16.4001 10.2499 16.2701 10.5999 16.0101 10.8699C15.7501 11.1399 15.4101 11.2799 15.0001 11.2799ZM13.7501 21.0499V13.5999C13.7501 13.1299 14.1301 12.7499 14.6001 12.7499H15.4101C15.8801 12.7499 16.2601 13.1299 16.2601 13.5999V21.0499C16.2601 21.5199 15.8801 21.8999 15.4101 21.8999H14.6001C14.1301 21.8999 13.7501 21.5199 13.7501 21.0499Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_3993_63421">
                          <rect width="24" height="24" fill="white" transform="translate(3 3)"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <p style={{ fontSize: 14, color: '#1E1E1E', margin: 0, marginTop: 6 }}>
                      Ces activités amplifient les effets positifs. Elles ne remplacent jamais une charge maîtrisée et des priorités claires.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
                gap: 24
              }}>
                {aiReport.teamActivities?.map((activity, i) => (
                  <div key={i} className="card" style={{
                    padding: isMobile ? 16 : 18,
                    border: '1px solid #D1D5DB',
                    borderRadius: 8,
                    background: '#FFFFFF',
                    transition: 'box-shadow 0.2s',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                      <h3 style={{ fontWeight: 700, color: '#1F2937', margin: 0, fontSize: 16, lineHeight: 1.3 }}>
                        {activity.title}
                      </h3>
                      <span style={{
                        padding: '6px 10px',
                        borderRadius: 20,
                        fontSize: 14,
                        fontWeight: 600,
                        background: parseInt(activity.estimatedImpact) >= 15 ? '#d1fae5' : '#dbeafe',
                        border: parseInt(activity.estimatedImpact) >= 15 ? '1px solid #6ee7b7' : '1px solid #93c5fd',
                        color: parseInt(activity.estimatedImpact) >= 15 ? '#065f46' : '#1e3a8a',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}>
                        {activity.estimatedImpact}
                      </span>
                    </div>

                    <div style={{ height: 1, background: '#E5E7EB', marginBottom: 16 }} />

                    <div style={{ marginBottom: 18 }}>
                      <p style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#6B7280',
                        margin: '0 0 8px 0'
                      }}>
                        Objectif
                      </p>
                      <div style={{
                        background: '#ECEFF5',
                        borderRadius: 6,
                        padding: '10px 12px'
                      }}>
                        <p style={{ fontSize: 15, color: '#1F2937', margin: 0, lineHeight: 1.35 }}>{activity.objective}</p>
                      </div>
                    </div>

                    <div style={{ marginBottom: 18 }}>
                      <p style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#6B7280',
                        margin: '0 0 8px 0'
                      }}>
                        Principe
                      </p>

                      <p style={{
                        fontSize: 14,
                        color: '#1F2937',
                        border: '1px solid #1D4ED8',
                        borderRadius: 999,
                        padding: '4px 12px',
                        margin: '0 0 10px 0',
                        display: 'inline-block',
                        lineHeight: 1.25
                      }}>
                        {activity.format}
                      </p>

                      <div style={{
                        border: '1px solid #D1D5DB',
                        borderRadius: 6,
                        padding: '8px 12px'
                      }}>
                      <ul style={{ margin: 0, paddingLeft: 18, listStyle: 'disc' }}>
                        {activity.bullets?.map((bullet, idx) => (
                          <li key={idx} style={{ marginBottom: 6, fontSize: 14, color: '#1F2937' }}>
                            {bullet}
                          </li>
                        )) || []}
                      </ul>
                      </div>
                    </div>

                    <div style={{
                      paddingTop: 12,
                      marginTop: 'auto',
                      borderTop: '1px solid #E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10
                    }}>
                      <span style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: '#0748EA',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <g clipPath="url(#clip0_benefit_star)">
                            <path d="M11.9998 20.4L11.6998 19.11C10.9698 15.94 8.4998 13.47 5.3398 12.75L4.0498 12.45L5.3398 12.15C8.5098 11.42 10.9798 8.95 11.6998 5.79L11.9998 4.5L12.2998 5.79C13.0298 8.96 15.4998 11.43 18.6598 12.15L19.9498 12.45L18.6598 12.75C15.4898 13.48 13.0198 15.95 12.2998 19.11L11.9998 20.4Z" stroke="white" strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round"/>
                            <path d="M17.9502 7.41023L17.8002 6.86023C17.7002 6.49023 17.4102 6.21023 17.0402 6.10023L16.4902 5.95023L17.0402 5.80023C17.4102 5.70023 17.6902 5.41023 17.8002 5.04023L17.9502 4.49023L18.1002 5.04023C18.2002 5.41023 18.4902 5.69023 18.8602 5.80023L19.4102 5.95023L18.8602 6.10023C18.4902 6.20023 18.2102 6.49023 18.1002 6.86023L17.9502 7.41023Z" stroke="white" strokeWidth="0.88" strokeMiterlimit="10" strokeLinecap="round"/>
                            <path d="M4.76008 20.2199C5.54985 20.2199 6.19008 19.5796 6.19008 18.7899C6.19008 18.0001 5.54985 17.3599 4.76008 17.3599C3.97031 17.3599 3.33008 18.0001 3.33008 18.7899C3.33008 19.5796 3.97031 20.2199 4.76008 20.2199Z" stroke="white" strokeWidth="1.26" strokeMiterlimit="10" strokeLinecap="round"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_benefit_star">
                              <rect width="24" height="24" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <p style={{ fontSize: 14, color: '#6B7280', margin: 0, lineHeight: 1.3 }}>
                        {activity.benefit}
                      </p>
                    </div>
                  </div>
                )) || []}
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
