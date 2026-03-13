import { useState, useEffect } from 'react'
import Soleil from '@/media/logo_meteo/Soleil.png'
import SoleilNuageux from '@/media/logo_meteo/Soleil_nuageux.png'
import Nuageux from '@/media/logo_meteo/Nuageux.png'
import Pluvieux from '@/media/logo_meteo/Pluvieux.png'
import Orage from '@/media/logo_meteo/Orage.png'
import MascotteIdle from '@/media/mascotte/idle.png'
import WeeklyChart from '@/components/WeeklyChart'
import { getCheckinHistory, getWeeklySummary, getWeeklyFactors } from '../../services/checkinService'
import { getUserInfo } from '../../services/userService'

const CAUSE_LABELS = {
  WORKLOAD: 'Charge / Rythme',
  RELATIONS: 'Relations / Ambiance',
  MOTIVATION: 'Sens / Motivation',
  CLARITY: 'Organisation / Clarté',
  RECOGNITION: 'Reconnaissance',
  BALANCE: 'Équilibre pro/perso'
}

export default function MeEmployee() {
  const periodMap = {
    Semaine: 'week',
    Mois: 'month',
    Année: 'year'
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [selectedPeriod, setSelectedPeriod] = useState('Semaine')
  const [isLoading, setIsLoading] = useState(true)
  const [isPeriodSwitching, setIsPeriodSwitching] = useState(false)
  const [selectedCause, setSelectedCause] = useState(null)
  
  // États pour les données
  const [weeklySummary, setWeeklySummary] = useState(null)
  const [weeklyFactors, setWeeklyFactors] = useState(null)
  const [periodCache, setPeriodCache] = useState({ summaries: {}, factors: {} })
  const [moodDeltaVsPreviousWeek, setMoodDeltaVsPreviousWeek] = useState(null)
  
  // États pour le niveau et XP (provenant de l'API)
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [maxXp, setMaxXp] = useState(100)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)

    // Charger les informations utilisateur au démarrage
    loadUserInfo()
    loadData()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
  
  // Charger les informations utilisateur (niveau, XP)
  const loadUserInfo = async () => {
    try {
      const userInfo = await getUserInfo()
      setLevel(userInfo.current_level || 1)
      setXp(userInfo.total_xp || 0)
      
      // Calculer maxXp selon le niveau (formule: niveau * 100)
      const calculatedMaxXp = (userInfo.current_level || 1) * 100
      setMaxXp(calculatedMaxXp)
    } catch (error) {
      console.error('Erreur lors du chargement des infos utilisateur:', error)
    }
  }

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [
        weekSummary,
        monthSummary,
        yearSummary,
        weekFactors,
        monthFactors,
        yearFactors,
        monthHistory
      ] = await Promise.all([
        getWeeklySummary(null, 'week'),
        getWeeklySummary(null, 'month'),
        getWeeklySummary(null, 'year'),
        getWeeklyFactors(null, 'week'),
        getWeeklyFactors(null, 'month'),
        getWeeklyFactors(null, 'year'),
        getCheckinHistory(30)
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
      setPeriodCache({ summaries, factors })
      setWeeklySummary(summaries[currentPeriod] || summaries.week || null)
      setWeeklyFactors(factors[currentPeriod] || factors.week || null)
      
      // Calcul dynamique de la variation d'humeur vs semaine précédente à partir des données du mois.
      const monthWeekdayHistory = monthHistory.filter(item => {
        const date = new Date(item.date)
        const dayOfWeek = date.getDay()
        return dayOfWeek >= 1 && dayOfWeek <= 5
      })

      const completedMonthEntries = monthWeekdayHistory.filter(
        item => item.status === 'completed' && item.moodValue !== null && item.moodValue !== undefined
      )

      if (completedMonthEntries.length === 0) {
        setMoodDeltaVsPreviousWeek(null)
      } else {
        const latestTimestamp = Math.max(...completedMonthEntries.map(item => new Date(item.date).getTime()))
        const latestDate = new Date(latestTimestamp)
        latestDate.setHours(0, 0, 0, 0)

        const dayOffset = (latestDate.getDay() + 6) % 7 // Lundi=0 ... Dimanche=6
        const currentWeekStart = new Date(latestDate)
        currentWeekStart.setDate(latestDate.getDate() - dayOffset)
        const currentWeekEnd = new Date(currentWeekStart)
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6)

        const previousWeekStart = new Date(currentWeekStart)
        previousWeekStart.setDate(currentWeekStart.getDate() - 7)
        const previousWeekEnd = new Date(currentWeekEnd)
        previousWeekEnd.setDate(currentWeekEnd.getDate() - 7)

        const getAverageForRange = (entries, start, end) => {
          const ranged = entries.filter(item => {
            const date = new Date(item.date)
            date.setHours(0, 0, 0, 0)
            return date >= start && date <= end
          })

          if (ranged.length === 0) return null
          const sum = ranged.reduce((acc, item) => acc + item.moodValue, 0)
          return sum / ranged.length
        }

        const currentWeekAvg = getAverageForRange(completedMonthEntries, currentWeekStart, currentWeekEnd)
        const previousWeekAvg = getAverageForRange(completedMonthEntries, previousWeekStart, previousWeekEnd)

        if (currentWeekAvg === null || previousWeekAvg === null) {
          setMoodDeltaVsPreviousWeek(null)
        } else {
          // Conversion 0-100 vers 0-10 pour l'affichage de delta.
          setMoodDeltaVsPreviousWeek((currentWeekAvg - previousWeekAvg) / 10)
        }
      }
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      setMoodDeltaVsPreviousWeek(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getMoodIcon = (moodValue) => {
    if (moodValue > 80) return Soleil
    if (moodValue >= 60) return SoleilNuageux
    if (moodValue >= 40) return Nuageux
    if (moodValue >= 20) return Pluvieux
    return Orage
  }

  // Calculer les valeurs dérivées depuis les APIs de synthèse/facteurs
  const averageMoodOnTen = weeklySummary?.averageMood ?? 0
  const avgMood = averageMoodOnTen * 10
  const stats = weeklySummary?.stats || {}
  const excellentDays = stats.excellentDays || 0
  const goodDays = stats.correctDays || 0
  const difficultDays = stats.difficultDays || 0
  const participation = weeklySummary?.participation || 0
  const totalDays = selectedPeriod === 'Semaine' ? 5 : selectedPeriod === 'Mois' ? 22 : 252

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
            const avgMoodValue = completed.reduce((sum, entry) => sum + entry.moodValue, 0) / completed.length
            return {
              date: items[0].date,
              status: 'completed',
              moodValue: Math.round(avgMoodValue)
            }
          }

          return {
            date: items[0].date,
            status: 'missing',
            moodValue: 0
          }
        })
    }

    return daily
      .filter((item) => item.month <= currentYearMonth)
      .map((item) => ({
        date: `${item.month}-01`,
        status: item.averageMood !== null && item.averageMood !== undefined ? 'completed' : 'missing',
        moodValue: item.averageMood !== null && item.averageMood !== undefined ? Math.round(item.averageMood * 10) : 0
      }))
  })()

  const availableCauses = weeklyFactors?.availableCauses || []

  const tags = availableCauses.map((cause) => ({
    key: cause,
    label: CAUSE_LABELS[cause] || cause
  }))

  const activeBucketSource = selectedCause
    ? weeklyFactors?.byCause?.[selectedCause]
    : weeklyFactors?.summary

  const influenceFactors = (activeBucketSource?.buckets || []).map((bucket) => ({
    label: bucket.label,
    value: Number.isFinite(bucket.percent) ? bucket.percent : 0,
    count: Number.isFinite(bucket.count) ? bucket.count : 0
  }))

  useEffect(() => {
    if (selectedCause && !availableCauses.includes(selectedCause)) {
      setSelectedCause(null)
    }
  }, [selectedCause, availableCauses])
  
  // Obtenir l'icône météo basée sur la moyenne
  const currentMoodIcon = getMoodIcon(avgMood)

  if (isLoading) {
    return (
      <div className="container" style={{paddingTop: 40, textAlign: 'center'}}>
        <div className="card" style={{padding: 40}}>
          <div style={{fontSize: 16, color: '#757575'}}>Chargement...</div>
        </div>
      </div>
    )
  }

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
              color: 'var(--text)',
              marginBottom: 8
            }}>
              Ton espace personnel
            </h1>
            <p style={{
              fontSize: 16,
              color: 'var(--muted)',
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
            background: 'var(--card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <img src={currentMoodIcon} alt="Météo" style={{ width: '50px', height: '50px' }} />
          </div>
        </div>

        {/* Titre résumé */}
        <div className="card" style={{ padding: isMobile ? '20px' : '32px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
              Ta synthèse cette semaine
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
                Semaine globalement positive
              </h3>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#2F2F33', margin: 0, lineHeight: 1.4 }}>
                Ta semaine montre une dynamique stable avec une humeur moyenne de 8/10 et une participation solide (4 check-ins sur 5). Un léger creux apparaît en milieu de semaine, lié à la charge et à ton rythme de travail, avant un retour à un climat plus serein. Globalement, les ressentis dominants restent positifs et témoignent d'une semaine plutôt équilibrée.
              </p>
            </div>
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
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Humeur moyenne</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                    {(avgMood / 10).toFixed(1).replace('.', ',')}
                  </span>
                  <span style={{ fontSize: 20, fontWeight: 400, color: 'var(--muted)' }}>/10</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>
              {moodDeltaVsPreviousWeek === null
                ? 'Comparaison indisponible'
                : `${moodDeltaVsPreviousWeek >= 0 ? '+' : ''}${moodDeltaVsPreviousWeek.toFixed(1).replace('.', ',')} vs semaine dernière`}
            </div>
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
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Participation</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                    {participation}
                  </span>
                  <span style={{ fontSize: 20, fontWeight: 400, color: 'var(--muted)' }}>
                    /{totalDays} jours
                  </span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>
              {Math.round((participation / totalDays) * 100)}% {selectedPeriod === 'Semaine' ? 'cette semaine' : selectedPeriod === 'Mois' ? 'ce mois' : 'cette année'}
            </div>
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
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Niveau</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{level}</span>
                  <span style={{ fontSize: 20, fontWeight: 400, color: 'var(--muted)' }}>niv.</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>{xp}/{maxXp} XP</div>
            <div style={{
              marginTop: 10,
              width: '100%',
              height: 8,
              background: '#E7EAFD',
              borderRadius: 20,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${Math.max(0, Math.min(100, Math.round((xp / Math.max(maxXp, 1)) * 100)))}%`,
                height: '100%',
                background: '#0748EA',
                borderRadius: 20
              }} />
            </div>
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
          <div className="card" style={{ padding: isMobile ? '20px' : '24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text)' }}>
              Evolution sur {selectedPeriod === 'Semaine' ? 'la semaine' : selectedPeriod === 'Mois' ? 'le mois' : 'l\'année'}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 20px 0' }}>
              Tes humeurs quotidiennes {selectedPeriod === 'Semaine' ? 'cette semaine' : selectedPeriod === 'Mois' ? 'ce mois' : 'cette année'}
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

            {/* Graphique WeeklyChart */}
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
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--text)' }}>{excellentDays}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>Jour Excellent</div>
              </div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--text)' }}>{goodDays}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>Jours corrects</div>
              </div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--text)' }}>{difficultDays}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>Jour difficile</div>
              </div>
            </div>
          </div>

          {/* Facteurs d'influence */}
          <div className="card" style={{ padding: isMobile ? '20px' : '24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px 0', color: 'var(--text)' }}>
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
      </div>
    </div>
  )
}
