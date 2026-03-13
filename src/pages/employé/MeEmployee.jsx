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

export default function MeEmployee() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isManager, setIsManager] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('Semaine')
  const [isLoading, setIsLoading] = useState(true)
  
  // États pour les données
  const [checkinHistory, setCheckinHistory] = useState([])
  const [chartData, setChartData] = useState([]) // Données groupées pour le graphique
  const [weeklyStats, setWeeklyStats] = useState(null)
  const [avgMood, setAvgMood] = useState(0)
  const [participation, setParticipation] = useState(0)
  const [moodDistribution, setMoodDistribution] = useState({
    excellent: 0,
    good: 0,
    difficult: 0
  })
  const [influenceFactors, setInfluenceFactors] = useState([
    { label: 'Épanoui', value: 0 },
    { label: 'Serein', value: 0 },
    { label: 'Mitigé', value: 0 },
    { label: 'Sous tension', value: 0 },
    { label: 'Éprouvé', value: 0 }
  ])
  
  // États pour le niveau et XP (provenant de l'API)
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [maxXp, setMaxXp] = useState(100)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    
    // Vérifier si l'utilisateur est manager
    const managerStatus = localStorage.getItem('huma_is_manager')
    setIsManager(managerStatus === '1')
    
    // Charger les informations utilisateur au démarrage
    loadUserInfo()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    loadData()
  }, [selectedPeriod])
  
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

  // Fonction pour regrouper les données selon la période
  const groupDataByPeriod = (data, period) => {
    // Trier les données par date (du plus ancien au plus récent)
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
    
    if (period === 'Semaine') {
      // Pour la semaine, garder les 5 derniers jours ouvrés
      return sortedData.slice(-5)
    } else if (period === 'Mois') {
      // Pour le mois, regrouper par semaine (environ 4-5 points)
      const grouped = []
      const weekGroups = {}
      
      sortedData.forEach(item => {
        const date = new Date(item.date)
        // Obtenir le numéro de semaine dans le mois (0-4)
        const weekOfMonth = Math.floor((date.getDate() - 1) / 7)
        
        if (!weekGroups[weekOfMonth]) {
          weekGroups[weekOfMonth] = []
        }
        weekGroups[weekOfMonth].push(item)
      })
      
      // Calculer la moyenne pour chaque semaine (dans l'ordre)
      Object.keys(weekGroups).sort((a, b) => Number(a) - Number(b)).forEach(week => {
        const items = weekGroups[week]
        const completedItems = items.filter(i => i.status === 'completed')
        
        if (completedItems.length > 0) {
          const avgMoodValue = completedItems.reduce((sum, i) => sum + i.moodValue, 0) / completedItems.length
          grouped.push({
            date: items[0].date,
            status: 'completed',
            moodValue: Math.round(avgMoodValue)
          })
        } else if (items.length > 0) {
          grouped.push(items[0])
        }
      })
      
      return grouped
    } else {
      // Pour l'année, regrouper par mois (12 points)
      const grouped = []
      const monthGroups = {}
      
      sortedData.forEach(item => {
        const date = new Date(item.date)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        
        if (!monthGroups[monthKey]) {
          monthGroups[monthKey] = []
        }
        monthGroups[monthKey].push(item)
      })
      
      // Calculer la moyenne pour chaque mois (dans l'ordre)
      Object.keys(monthGroups).sort().forEach(month => {
        const items = monthGroups[month]
        const completedItems = items.filter(i => i.status === 'completed')
        
        if (completedItems.length > 0) {
          const avgMoodValue = completedItems.reduce((sum, i) => sum + i.moodValue, 0) / completedItems.length
          grouped.push({
            date: items[0].date,
            status: 'completed',
            moodValue: Math.round(avgMoodValue)
          })
        } else if (items.length > 0) {
          grouped.push(items[0])
        }
      })
      
      return grouped
    }
  }

  const loadData = async () => {
    setIsLoading(true)
    try {
      // Déterminer le nombre de jours selon la période
      const days = selectedPeriod === 'Semaine' ? 7 : selectedPeriod === 'Mois' ? 30 : 365
      
      // Récupérer l'historique
      const history = await getCheckinHistory(days)
      
      // Filtrer pour ne garder que les jours de semaine (lundi-vendredi)
      const weekdayHistory = history.filter(item => {
        const date = new Date(item.date)
        const dayOfWeek = date.getDay()
        return dayOfWeek >= 1 && dayOfWeek <= 5
      })
      
      setCheckinHistory(weekdayHistory)
      
      // Grouper les données pour le graphique selon la période
      const grouped = groupDataByPeriod(weekdayHistory, selectedPeriod)
      setChartData(grouped)
      
      // Calculer les statistiques
      const completedCheckins = weekdayHistory.filter(c => c.status === 'completed')
      
      // Moyenne d'humeur
      if (completedCheckins.length > 0) {
        const sum = completedCheckins.reduce((acc, c) => acc + (c.moodValue || 0), 0)
        setAvgMood(sum / completedCheckins.length)
      }
      
      // Participation (jours ouvrés avec check-in)
      const totalWeekdays = selectedPeriod === 'Semaine' ? 5 : weekdayHistory.length
      setParticipation(completedCheckins.length)
      
      // Distribution des humeurs (excellent > 80, good 60-80, difficult < 60)
      const excellent = completedCheckins.filter(c => c.moodValue > 80).length
      const good = completedCheckins.filter(c => c.moodValue >= 60 && c.moodValue <= 80).length
      const difficult = completedCheckins.filter(c => c.moodValue < 60).length
      
      setMoodDistribution({ excellent, good, difficult })
      
      // Calculer la distribution des facteurs d'influence
      const total = completedCheckins.length
      if (total > 0) {
        const epanoui = completedCheckins.filter(c => c.moodValue > 80).length
        const serein = completedCheckins.filter(c => c.moodValue >= 60 && c.moodValue <= 80).length
        const mitige = completedCheckins.filter(c => c.moodValue >= 40 && c.moodValue < 60).length
        const sousTension = completedCheckins.filter(c => c.moodValue >= 20 && c.moodValue < 40).length
        const eprouve = completedCheckins.filter(c => c.moodValue < 20).length
        
        setInfluenceFactors([
          { label: 'Épanoui', value: Math.round((epanoui / total) * 100) },
          { label: 'Serein', value: Math.round((serein / total) * 100) },
          { label: 'Mitigé', value: Math.round((mitige / total) * 100) },
          { label: 'Sous tension', value: Math.round((sousTension / total) * 100) },
          { label: 'Éprouvé', value: Math.round((eprouve / total) * 100) }
        ])
      }
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
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

  // Calculer les valeurs dérivées
  const weeklyScore = avgMood / 10
  const maxScore = 10
  const excellentDays = moodDistribution.excellent
  const goodDays = moodDistribution.good
  const difficultDays = moodDistribution.difficult
  const totalDays = selectedPeriod === 'Semaine' ? 5 : selectedPeriod === 'Mois' ? 22 : 252

  // Calculer le pourcentage pour la jauge
  const gaugePercentage = avgMood / 100
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference * 0.5
  const filledArcLength = arcLength * gaugePercentage

  const tags = ['Charge/Rythme', 'Relations/Ambiance', 'Sens/Motivation', 'Organisation/Clarté', 'Reconnaissance', 'Équilibre pro/perso']
  
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

        {/* Grille : Evolution + Facteurs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
          gap: 20,
          marginBottom: 20
        }}>
          {/* Evolution sur la semaine */}
          <div className="card" style={{ padding: isMobile ? '20px' : '24px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text)' }}>
              Evolution sur la semaine
            </h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 20px 0' }}>
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
            <div style={{ marginBottom: 24 }}>
              <WeeklyChart data={chartData} period={selectedPeriod} />
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
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Humeur moyenne</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>{(avgMood / 10).toFixed(1).replace('.', ',')}/10</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>+0,8 vs semaine dernière</div>
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
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Participation</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>{participation}/{totalDays} jours</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>{Math.round((participation/totalDays)*100)}% cette semaine</div>
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
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Niveau</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>{level}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>{xp}/{maxXp} XP</div>
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
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text)' }}>
                Badge du super héros
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 16px 0' }}>
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
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>80%</span>
              </div>
            </div>
          </div>
          <button style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: 'transparent',
            color: 'var(--text)',
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
