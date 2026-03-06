import LockIcon from '@/components/LockIcon'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Orage from '@/media/logo_meteo/Orage.png'
import Pluvieux from '@/media/logo_meteo/Pluvieux.png'
import Nuageux from '@/media/logo_meteo/Nuageux.png'
import SoleilNuageux from '@/media/logo_meteo/Soleil_nuageux.png'
import Soleil from '@/media/logo_meteo/Soleil.png'
import TeamScoreCard from '@/components/TeamScoreCard'
import WeeklyChart from '@/components/WeeklyChart'
import MoodRevealCard from '@/components/MoodRevealCard'
import { checkTodayStatus, getCheckinHistory } from '../../services/checkinService'
import { getTeamStats } from '../../services/teamService'

export default function HomeEmployee() {
  const navigate = useNavigate()
  const [lastCheckin, setLastCheckin] = useState(null)
  const [checkinHistory, setCheckinHistory] = useState([])
  const [teamStats, setTeamStats] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isLoading, setIsLoading] = useState(true)
  const [userFirstName, setUserFirstName] = useState('John')
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false)

  useEffect(() => {
    console.log('🎬 HomeEmployee mounted - useEffect déclenché')
    // Récupérer le prénom de l'utilisateur
    const prenom = localStorage.getItem('huma_prenom')
    console.log('👤 Prénom récupéré:', prenom)
    if (prenom) {
      setUserFirstName(prenom)
    }
    
    console.log('🔄 Lancement de loadData()...')
    loadData()
  }, [])

  const loadData = async () => {
    console.log('🚀 HomeEmployee - Début du chargement des données...')
    setIsLoading(true)
    try {
      console.log('📡 Appel checkTodayStatus...')
      
      // Charger le statut du check-in du jour
      const todayStatus = await checkTodayStatus()
      console.log('✅ Check-in status du jour:', todayStatus)
      
      // Charger l'historique des check-ins (7 derniers jours)
      const history = await getCheckinHistory(7)
      console.log('Historique récupéré:', history)
      
      // Trier l'historique par date (du plus ancien au plus récent)
      const sortedHistory = [...history].sort((a, b) => new Date(a.date) - new Date(b.date))
      setCheckinHistory(sortedHistory)
      
      if (todayStatus && todayStatus.hasCheckedIn) {
        console.log('✅ Check-in effectué aujourd\'hui')
        setHasCheckedInToday(true)
        // Récupérer le check-in d'aujourd'hui depuis l'historique
        const today = new Date().toISOString().split('T')[0]
        console.log('Date du jour:', today)
        console.log('Historique complet:', sortedHistory)
        const todayCheckin = sortedHistory.find(c => {
          console.log('Vérification check-in:', c.date, 'starts with', today, '=', c.date && c.date.startsWith(today))
          return c.date && c.date.startsWith(today)
        })
        console.log('✅ Check-in trouvé pour aujourd\'hui:', todayCheckin)
        if (todayCheckin) {
          setLastCheckin(todayCheckin)
        } else {
          // Fallback: créer un objet minimal si le check-in existe selon l'API mais n'est pas dans l'historique
          console.warn('⚠️ Check-in existe selon l\'API mais non trouvé dans l\'historique')
          const fallbackCheckin = {
            date: today,
            moodValue: 50,
            mood: 50,
            status: 'completed'
          }
          setLastCheckin(fallbackCheckin)
        }
      } else {
        console.log('❌ Pas de check-in aujourd\'hui')
        setHasCheckedInToday(false)
        setLastCheckin(null)
      }

      // Charger les stats de l'équipe
      const stats = await getTeamStats()
      console.log('Stats de l\'équipe:', stats)
      setTeamStats(stats)
    } catch (error) {
      console.error('❌ ERREUR lors du chargement des données:', error)
      console.error('❌ Détails de l\'erreur:', error.message, error.stack)
      
      // Toujours définir hasCheckedInToday à false en cas d'erreur
      setHasCheckedInToday(false)
      setLastCheckin(null)
      
      // Fallback sur localStorage
      const history = JSON.parse(localStorage.getItem('huma_checkin_history') || '[]')
      setCheckinHistory(history)
      if (history.length > 0) {
        const today = new Date().toISOString().split('T')[0]
        const todayCheckin = history.find(c => c.date && c.date.startsWith(today))
        if (todayCheckin) {
          setHasCheckedInToday(true)
          setLastCheckin(todayCheckin)
        }
      }
    } finally {
      console.log('Fin du chargement')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getMoodImage = (moodValue) => {
    if (moodValue <= 20) return Orage
    if (moodValue <= 40) return Pluvieux
    if (moodValue <= 60) return Nuageux
    if (moodValue <= 80) return SoleilNuageux
    return Soleil
  }

  const getMoodText = (moodValue) => {
    if (moodValue <= 20) return 'très mal'
    if (moodValue <= 40) return 'mal'
    if (moodValue <= 60) return 'moyen'
    if (moodValue <= 80) return 'bien'
    return 'très bien'
  }

  // Afficher un indicateur de chargement pendant le chargement initial
  if (isLoading) {
    return (
      <div className="container" style={{paddingTop: 40, textAlign: 'center'}}>
        <div className="card" style={{padding: 40}}>
          <div style={{fontSize: 16, color: '#757575'}}>Chargement...</div>
        </div>
      </div>
    )
  }

  const weekDays = ['L', 'M', 'M', 'J', 'V']
  
  // Fonction pour obtenir les 5 derniers jours ouvrés avec leur statut
  const getWeekdayCheckIns = () => {
    const weekdayHistory = checkinHistory.filter(item => {
      const date = new Date(item.date)
      const dayOfWeek = date.getDay()
      return dayOfWeek >= 1 && dayOfWeek <= 5 // Lundi à vendredi
    }).slice(0, 5).reverse()
    
    return weekDays.map((day, index) => {
      const checkin = weekdayHistory[index]
      return {
        day,
        completed: checkin && checkin.status === 'completed',
        isCurrent: index === weekdayHistory.length - 1 && checkin && checkin.status === 'completed'
      }
    })
  }
  
  const weekdayCheckIns = getWeekdayCheckIns()

  // Calculer les données pour TeamScoreCard à partir des stats de l'équipe
  const getTeamScoreData = () => {
    if (!teamStats) {
      return {
        score: 0,
        weatherValue: 0,
        categories: [
          { label: 'Épanoui', value: 0 },
          { label: 'Serein', value: 0 },
          { label: 'Mitigé', value: 0 }
        ]
      }
    }

    // Utiliser globalScore (0-100) et distribution depuis l'API
    const globalScore = teamStats.globalScore || 0
    const score = (globalScore / 10).toFixed(1) // Convertir 0-100 en 0-10
    const distribution = teamStats.distribution || {}

    // Calculer les catégories basées sur la distribution
    // La distribution contient les dimensions (RELATIONS, CLARITY, etc.)
    // On va les convertir en Épanoui/Serein/Mitigé selon leur valeur
    
    const totalCheckins = teamStats.totalCheckins || 0
    
    if (totalCheckins === 0 || globalScore === 0) {
      return {
        score: 0,
        weatherValue: 0,
        categories: [
          { label: 'Épanoui', value: 0 },
          { label: 'Serein', value: 0 },
          { label: 'Mitigé', value: 0 }
        ]
      }
    }

    // Estimer les proportions basées sur le globalScore
    let epanouiPercent, sereinPercent, mitigePercent
    
    if (globalScore > 80) {
      // Score élevé : majorité épanoui
      epanouiPercent = 70
      sereinPercent = 25
      mitigePercent = 5
    } else if (globalScore > 60) {
      // Score moyen : majorité serein
      epanouiPercent = 30
      sereinPercent = 55
      mitigePercent = 15
    } else if (globalScore > 40) {
      // Score faible : équilibré
      epanouiPercent = 20
      sereinPercent = 40
      mitigePercent = 40
    } else {
      // Score très faible : majorité mitigé
      epanouiPercent = 10
      sereinPercent = 30
      mitigePercent = 60
    }

    return {
      score: parseFloat(score),
      weatherValue: globalScore,
      categories: [
        { label: 'Épanoui', value: epanouiPercent },
        { label: 'Serein', value: sereinPercent },
        { label: 'Mitigé', value: mitigePercent }
      ]
    }
  }

  const teamScoreData = getTeamScoreData()

  // Afficher un état de chargement
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <div style={{ 
          fontSize: 16, 
          color: 'var(--muted)' 
        }}>
          Chargement...
        </div>
      </div>
    )
  }

  // Version unlocked si un check-in a été fait aujourd'hui
  if (hasCheckedInToday && lastCheckin) {
    return (
      <div style={{ paddingBottom: '12px' }}>
        <div className="container" style={{maxWidth: isMobile ? '100%' : 1200}}>

          {/* Avatar et message de bienvenue */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 12
          }}>
            {/* Avatar avec personnage dans coin bas gauche */}
            <div style={{
              flexShrink: 0,
              filter: 'drop-shadow(0px 2px 1px rgba(12, 12, 13, 0.05))'
            }}>
              <svg width="70" height="70" viewBox="0 0 146 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_dd_avatar_unlocked)">
                  <g clipPath="url(#clip0_avatar_unlocked)">
                    <path d="M3 70C3 31.3401 34.3401 0 73 0C111.66 0 143 31.3401 143 70C143 108.66 111.66 140 73 140C34.3401 140 3 108.66 3 70Z" fill="white"/>
                    <path d="M51.5442 138.845C39.1462 150.642 24.9525 154.276 17.8248 149.169C13.9049 146.36 12.1262 140.907 11.6343 139.402C9.44429 132.69 10.905 126.532 12.1452 121.301C13.042 117.517 14.2144 114.492 15.1218 112.433C13.5508 111.617 11.3502 110.388 8.85068 108.696C4.11873 105.49 -1.15808 101.916 -4.6392 95.6492C-6.52816 92.2487 -9.13583 87.555 -7.45675 82.8443C-5.85399 78.3477 -1.22591 76.321 2.075 74.873C6.51439 72.9268 10.4153 72.7339 17.0235 72.4032C20.935 72.2082 24.185 72.2887 26.4386 72.4032C29.2858 66.853 31.9147 62.3416 33.933 59.0386C38.2431 51.9895 39.9094 50.2384 41.6606 48.8413C44.1728 46.8379 47.7896 43.6769 52.5576 44.0267C56.1617 44.2918 58.6464 46.399 60.4082 47.8894C62.1593 49.3713 64.413 51.7161 68.9583 61.5063C70.1986 64.1796 71.8416 67.9003 73.5822 72.4626C75.8676 72.8611 79.3084 73.5098 83.4637 74.4893C96.4914 77.5591 99.8432 79.9377 101.009 80.8239C103.772 82.9206 107.31 85.6088 107.912 89.8806C108.864 96.6392 101.819 102.775 99.6779 104.638C97.4963 106.538 94.6618 108.348 92.1411 109.959C89.8027 111.454 87.795 112.601 86.3767 113.379C88.0557 119.671 88.4055 124.975 88.4034 128.643C88.4013 132.917 88.3632 136.572 86.5548 140.85C85.4184 143.538 84.051 146.776 80.8667 148.783C74.8733 152.561 66.904 149.169 63.3211 147.643C60.6499 146.504 55.9539 144.049 51.5421 138.838L51.5442 138.845Z" fill="#0748EA"/>
                    <path d="M-7.45791 82.8418C-5.82547 87.4486 -1.95426 96.2679 6.82274 103.669C11.4529 107.572 16.0683 109.921 19.6045 111.348C18.7141 113.622 17.5714 116.881 16.6174 120.896C15.4768 125.7 14.1687 131.206 14.9277 138.132C15.2203 140.795 15.9284 144.67 17.8216 149.167C16.6492 148.287 14.9425 146.801 13.4924 144.543C10.412 139.752 10.5328 134.691 10.6219 130.947C10.7152 127.038 11.4508 124.083 12.1441 121.299C13.062 117.608 14.1942 114.6 15.1206 112.431C8.61842 109.77 4.2384 106.253 1.67102 103.838C-2.11115 100.279 -7.8374 94.892 -7.9964 87.2875C-8.03668 85.4219 -7.7314 83.8785 -7.45791 82.8439V82.8418Z" fill="#000F9B"/>
                    <path d="M55.9492 44.8867C58.3067 47.4816 60.8762 50.7507 63.257 54.7596C68.0187 62.7754 70.0518 70.4075 70.9846 75.7881C76.8084 76.1739 84.4342 77.2954 92.8996 80.2847C98.4668 82.2499 103.165 84.5883 106.96 86.808C106.264 85.8052 105.149 84.3487 103.538 82.8499C101.21 80.6832 98.0174 78.5802 89.092 75.9407C85.1826 74.7853 79.9355 73.4561 73.5838 72.4724C72.6319 69.0146 71.5952 66.1569 70.7323 64.0072C68.3897 58.1729 66.5219 53.6509 62.3709 49.5656C60.0494 47.2823 57.7004 45.811 55.9492 44.8867Z" fill="#838FFF"/>
                    <path d="M40.6271 104.637C46.0119 104.637 50.3772 100.271 50.3772 94.8867C50.3772 89.5019 46.0119 85.1367 40.6271 85.1367C35.2422 85.1367 30.877 89.5019 30.877 94.8867C30.877 100.271 35.2422 104.637 40.6271 104.637Z" fill="white"/>
                    <path d="M42.2602 102.829C46.3255 102.829 49.621 99.5333 49.621 95.4681C49.621 91.4029 46.3255 88.1074 42.2602 88.1074C38.195 88.1074 34.8994 91.4029 34.8994 95.4681C34.8994 99.5333 38.195 102.829 42.2602 102.829Z" fill="#2B2B2B"/>
                    <path d="M65.7638 104.637C71.1486 104.637 75.5139 100.271 75.5139 94.8867C75.5139 89.5019 71.1486 85.1367 65.7638 85.1367C60.3789 85.1367 56.0137 89.5019 56.0137 94.8867C56.0137 100.271 60.3789 104.637 65.7638 104.637Z" fill="white"/>
                    <path d="M67.396 102.829C71.4612 102.829 74.7568 99.5333 74.7568 95.4681C74.7568 91.4029 71.4612 88.1074 67.396 88.1074C63.3307 88.1074 60.0352 91.4029 60.0352 95.4681C60.0352 99.5333 63.3307 102.829 67.396 102.829Z" fill="#2B2B2B"/>
                    <path d="M28.874 88.1114C29.1136 87.4521 30.1948 84.7236 33.2668 83.0891C35.5352 81.8807 37.6786 81.9125 38.5393 81.9718" stroke="#2B2B2B" strokeWidth="1.33666" strokeMiterlimit="10"/>
                    <path d="M65.7617 82.4229C66.4529 82.3042 69.3573 81.8823 72.3042 83.731C74.4815 85.0962 75.5203 86.9725 75.8977 87.7484" stroke="#2B2B2B" strokeWidth="1.33666" strokeMiterlimit="10"/>
                    <path d="M53.7953 121.373C51.76 121.369 48.7517 120.464 48.016 118.187C47.9355 117.939 47.5093 116.62 48.1856 115.715C48.9912 114.636 50.5135 115.278 55.1521 115.293C58.135 115.302 59.3456 115.043 59.8523 115.842C60.4204 116.739 59.6021 118.17 59.4113 118.503C58.2813 120.476 55.8369 121.377 53.7953 121.373Z" fill="#2B2B2B"/>
                    <path d="M53.7799 120.865C52.5757 120.884 50.267 120.595 50.0211 119.472C49.8854 118.849 50.4429 118.242 50.6253 118.045C51.4945 117.104 52.8132 117.131 53.7375 117.15C54.7848 117.172 55.9911 117.197 56.5826 118.081C56.8858 118.535 57.0363 119.228 56.7755 119.788C56.29 120.827 54.6406 120.852 53.7799 120.865Z" fill="#F299F2"/>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_dd_avatar_unlocked" x="0" y="0" width="146" height="147" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_avatar_unlocked"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0 0.0509804 0 0 0 0.05 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_avatar_unlocked"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_dropShadow_avatar_unlocked"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0 0.0509804 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_avatar_unlocked" result="effect2_dropShadow_avatar_unlocked"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_avatar_unlocked" result="shape"/>
                  </filter>
                  <clipPath id="clip0_avatar_unlocked">
                    <path d="M3 70C3 31.3401 34.3401 0 73 0C111.66 0 143 31.3401 143 70C143 108.66 111.66 140 73 140C34.3401 140 3 108.66 3 70Z" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Message de bienvenue */}
            <div className="card" style={{
              flex: 1,
              padding:'12px 20px',
              borderRadius:50,
              display:'flex',
              alignItems:'center',
              filter: 'drop-shadow(0px 2px 1px rgba(12, 12, 13, 0.05))'
            }}>
              <div style={{flex:1}}>
                <h1 style={{fontSize:18, margin:'0 0 2px', fontWeight:600}}>Bonjour {userFirstName} !</h1>
                <div style={{fontSize:13, color:'var(--muted)'}}>
                  Tu te sens <strong>{getMoodText(lastCheckin.mood)}</strong> aujourd'hui
                </div>
              </div>
            </div>
          </div>

          {/* Grille principale - 2 colonnes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.734fr 1fr',
            gap: '12px'
          }}>
            {/* Colonne gauche */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
              {/* Score de l'équipe */}
              <TeamScoreCard
                score={teamScoreData.score}
                maxScore={10}
                weatherValue={teamScoreData.weatherValue}
                categories={teamScoreData.categories}
              />

              {/* Evolution sur la semaine */}
              <WeeklyChart data={checkinHistory} period="Semaine" />
            </div>

            {/* Colonne droite */}
            <div style={{display:'flex', flexDirection:'column', gap:12}}>

              {/* Carte humeur du jour */}
              <MoodRevealCard mood={getMoodText(lastCheckin.moodValue)} />

              {/* Carte série de check-in */}
              <div className="card" style={{padding:'14px 18px'}}>
                <h2 style={{fontSize:16, margin:'0 0 10px', fontWeight:600}}>Ta série de check-in</h2>

                <div style={{display:'flex', gap:10, alignItems:'center', justifyContent:'center', marginBottom:10}}>
                  {weekdayCheckIns.map((item, index) => (
                    <div key={index} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:6}}>
                      <div style={{
                        width:22,
                        height:22,
                        borderRadius:'50%',
                        background: item.completed ? '#0748EA' : 'white',
                        border: `1px solid ${item.completed ? '#0748EA' : '#D9D9D9'}`,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        filter: 'drop-shadow(0px 1px 2px rgba(12, 12, 13, 0.05))',
                        position:'relative'
                      }}>
                        {item.completed && (
                          <svg width="11" height="8" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.818 1.188L4.193 7.813L1.182 4.801" stroke="#C8D9FC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {item.isCurrent && (
                          <div style={{
                            position:'absolute',
                            top:-16,
                            left:'50%',
                            transform:'translateX(-50%)',
                            width:0,
                            height:0,
                            borderLeft:'5px solid transparent',
                            borderRight:'5px solid transparent',
                            borderTop:'8px solid #0748EA'
                          }} />
                        )}
                      </div>
                      <span style={{fontSize:12, color:'#757575'}}>{item.day}</span>
                    </div>
                  ))}
                </div>

                <p style={{fontSize:12, color:'#757575', margin:0, lineHeight:1.4, textAlign:'center'}}>
                  Continue comme ça !
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

  // Version locked si aucun check-in
  return (
    <div>
      <div className="container" style={{paddingTop:16}}>

        {/* Avatar et message de bienvenue */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 24
        }}>
          {/* Avatar avec personnage dans coin bas gauche */}
          <div style={{
            flexShrink: 0,
            filter: 'drop-shadow(0px 2px 1px rgba(12, 12, 13, 0.05))'
          }}>
            <svg width="100" height="100" viewBox="0 0 146 147" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_dd_avatar_locked)">
                <g clipPath="url(#clip0_avatar_locked)">
                  <path d="M3 70C3 31.3401 34.3401 0 73 0C111.66 0 143 31.3401 143 70C143 108.66 111.66 140 73 140C34.3401 140 3 108.66 3 70Z" fill="white"/>
                  <path d="M51.5442 138.845C39.1462 150.642 24.9525 154.276 17.8248 149.169C13.9049 146.36 12.1262 140.907 11.6343 139.402C9.44429 132.69 10.905 126.532 12.1452 121.301C13.042 117.517 14.2144 114.492 15.1218 112.433C13.5508 111.617 11.3502 110.388 8.85068 108.696C4.11873 105.49 -1.15808 101.916 -4.6392 95.6492C-6.52816 92.2487 -9.13583 87.555 -7.45675 82.8443C-5.85399 78.3477 -1.22591 76.321 2.075 74.873C6.51439 72.9268 10.4153 72.7339 17.0235 72.4032C20.935 72.2082 24.185 72.2887 26.4386 72.4032C29.2858 66.853 31.9147 62.3416 33.933 59.0386C38.2431 51.9895 39.9094 50.2384 41.6606 48.8413C44.1728 46.8379 47.7896 43.6769 52.5576 44.0267C56.1617 44.2918 58.6464 46.399 60.4082 47.8894C62.1593 49.3713 64.413 51.7161 68.9583 61.5063C70.1986 64.1796 71.8416 67.9003 73.5822 72.4626C75.8676 72.8611 79.3084 73.5098 83.4637 74.4893C96.4914 77.5591 99.8432 79.9377 101.009 80.8239C103.772 82.9206 107.31 85.6088 107.912 89.8806C108.864 96.6392 101.819 102.775 99.6779 104.638C97.4963 106.538 94.6618 108.348 92.1411 109.959C89.8027 111.454 87.795 112.601 86.3767 113.379C88.0557 119.671 88.4055 124.975 88.4034 128.643C88.4013 132.917 88.3632 136.572 86.5548 140.85C85.4184 143.538 84.051 146.776 80.8667 148.783C74.8733 152.561 66.904 149.169 63.3211 147.643C60.6499 146.504 55.9539 144.049 51.5421 138.838L51.5442 138.845Z" fill="#0748EA"/>
                  <path d="M-7.45791 82.8418C-5.82547 87.4486 -1.95426 96.2679 6.82274 103.669C11.4529 107.572 16.0683 109.921 19.6045 111.348C18.7141 113.622 17.5714 116.881 16.6174 120.896C15.4768 125.7 14.1687 131.206 14.9277 138.132C15.2203 140.795 15.9284 144.67 17.8216 149.167C16.6492 148.287 14.9425 146.801 13.4924 144.543C10.412 139.752 10.5328 134.691 10.6219 130.947C10.7152 127.038 11.4508 124.083 12.1441 121.299C13.062 117.608 14.1942 114.6 15.1206 112.431C8.61842 109.77 4.2384 106.253 1.67102 103.838C-2.11115 100.279 -7.8374 94.892 -7.9964 87.2875C-8.03668 85.4219 -7.7314 83.8785 -7.45791 82.8439V82.8418Z" fill="#000F9B"/>
                  <path d="M55.9492 44.8867C58.3067 47.4816 60.8762 50.7507 63.257 54.7596C68.0187 62.7754 70.0518 70.4075 70.9846 75.7881C76.8084 76.1739 84.4342 77.2954 92.8996 80.2847C98.4668 82.2499 103.165 84.5883 106.96 86.808C106.264 85.8052 105.149 84.3487 103.538 82.8499C101.21 80.6832 98.0174 78.5802 89.092 75.9407C85.1826 74.7853 79.9355 73.4561 73.5838 72.4724C72.6319 69.0146 71.5952 66.1569 70.7323 64.0072C68.3897 58.1729 66.5219 53.6509 62.3709 49.5656C60.0494 47.2823 57.7004 45.811 55.9492 44.8867Z" fill="#838FFF"/>
                  <path d="M40.6271 104.637C46.0119 104.637 50.3772 100.271 50.3772 94.8867C50.3772 89.5019 46.0119 85.1367 40.6271 85.1367C35.2422 85.1367 30.877 89.5019 30.877 94.8867C30.877 100.271 35.2422 104.637 40.6271 104.637Z" fill="white"/>
                  <path d="M42.2602 102.829C46.3255 102.829 49.621 99.5333 49.621 95.4681C49.621 91.4029 46.3255 88.1074 42.2602 88.1074C38.195 88.1074 34.8994 91.4029 34.8994 95.4681C34.8994 99.5333 38.195 102.829 42.2602 102.829Z" fill="#2B2B2B"/>
                  <path d="M65.7638 104.637C71.1486 104.637 75.5139 100.271 75.5139 94.8867C75.5139 89.5019 71.1486 85.1367 65.7638 85.1367C60.3789 85.1367 56.0137 89.5019 56.0137 94.8867C56.0137 100.271 60.3789 104.637 65.7638 104.637Z" fill="white"/>
                  <path d="M67.396 102.829C71.4612 102.829 74.7568 99.5333 74.7568 95.4681C74.7568 91.4029 71.4612 88.1074 67.396 88.1074C63.3307 88.1074 60.0352 91.4029 60.0352 95.4681C60.0352 99.5333 63.3307 102.829 67.396 102.829Z" fill="#2B2B2B"/>
                  <path d="M28.874 88.1114C29.1136 87.4521 30.1948 84.7236 33.2668 83.0891C35.5352 81.8807 37.6786 81.9125 38.5393 81.9718" stroke="#2B2B2B" strokeWidth="1.33666" strokeMiterlimit="10"/>
                  <path d="M65.7617 82.4229C66.4529 82.3042 69.3573 81.8823 72.3042 83.731C74.4815 85.0962 75.5203 86.9725 75.8977 87.7484" stroke="#2B2B2B" strokeWidth="1.33666" strokeMiterlimit="10"/>
                  <path d="M53.7953 121.373C51.76 121.369 48.7517 120.464 48.016 118.187C47.9355 117.939 47.5093 116.62 48.1856 115.715C48.9912 114.636 50.5135 115.278 55.1521 115.293C58.135 115.302 59.3456 115.043 59.8523 115.842C60.4204 116.739 59.6021 118.17 59.4113 118.503C58.2813 120.476 55.8369 121.377 53.7953 121.373Z" fill="#2B2B2B"/>
                  <path d="M53.7799 120.865C52.5757 120.884 50.267 120.595 50.0211 119.472C49.8854 118.849 50.4429 118.242 50.6253 118.045C51.4945 117.104 52.8132 117.131 53.7375 117.15C54.7848 117.172 55.9911 117.197 56.5826 118.081C56.8858 118.535 57.0363 119.228 56.7755 119.788C56.29 120.827 54.6406 120.852 53.7799 120.865Z" fill="#F299F2"/>
                </g>
              </g>
              <defs>
                <filter id="filter0_dd_avatar_locked" x="0" y="0" width="146" height="147" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_avatar_locked"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0 0.0509804 0 0 0 0.05 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_avatar_locked"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_dropShadow_avatar_locked"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0 0.0509804 0 0 0 0.1 0"/>
                  <feBlend mode="normal" in2="effect1_dropShadow_avatar_locked" result="effect2_dropShadow_avatar_locked"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_avatar_locked" result="shape"/>
                </filter>
                <clipPath id="clip0_avatar_locked">
                  <path d="M3 70C3 31.3401 34.3401 0 73 0C111.66 0 143 31.3401 143 70C143 108.66 111.66 140 73 140C34.3401 140 3 108.66 3 70Z" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Message de bienvenue */}
          <div className="card" style={{
            flex: 1,
            padding:'16px 24px',
            borderRadius:50,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            filter: 'drop-shadow(0px 2px 1px rgba(12, 12, 13, 0.05))'
          }}>
            <h1 style={{fontSize:22, margin:'0 0 4px', fontWeight:600}}>Bonjour {userFirstName} !</h1>
            <div style={{fontSize:14, color:'var(--muted)'}}>Comment vas-tu aujourd'hui ? – Fais-le check-in avant ton départ d'équipe.</div>
          </div>
        </div>
        {/* Grille principale - 2 colonnes */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, alignItems:'start'}}>

          {/* Colonne gauche - Carte check-in + Tendance */}
          <div style={{display:'flex', flexDirection:'column', gap:16, height:'100%'}}>

            {/* Carte check-in */}
            <div className="card" style={{padding:'20px 24px', textAlign:'center', flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <h2 style={{fontSize:18, margin:'0 0 8px', fontWeight:600}}>Prends un moment pour toi</h2>
              <p style={{fontSize:12, color:'#757575', margin:'0 0 14px', lineHeight:1.4}}>
                Ton check-in quotidien permet de mieux comprendre le bien-être de l'équipe et d'agir ensemble pour l'améliorer.
              </p>
              <button
                style={{
                  background:'#0748EA',
                  color:'white',
                  border:'none',
                  borderRadius:6,
                  padding:'10px 28px',
                  fontSize:14,
                  fontWeight:500,
                  cursor:'pointer',
                  boxShadow:'0px 2px 1px rgba(12, 12, 13, 0.1)'
                }}
                onClick={() => navigate('/checkin')}
              >
                Faire mon check-in
              </button>
            </div>

            {/* Tendance de l'équipe - Locked */}
            <div className="card" style={{padding:'20px 24px', flex:1, display:'flex', flexDirection:'column'}}>
              <h2 style={{fontSize:18, margin:'0 0 8px', fontWeight:600}}>Tendance de l'équipe cette semaine</h2>

              <div className="card panel" style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                padding:28,
                textAlign:'center',
                flex:1
              }}>
                <LockIcon size={28} color="#757575" />
                <p style={{fontSize:12, color:'#757575', margin:'12px 0 0', lineHeight:1.4}}>
                  Fais ton check-in pour débloquer
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite - Ton humeur du jour + Série */}
          <div style={{display:'flex', flexDirection:'column', gap:16, height:'100%'}}>
            {/* Carte humeur */}
            <div className="card" style={{display:'flex', flexDirection:'column', padding:'20px 24px'}}>
              <h2 style={{fontSize:18, margin:'0 0 8px', fontWeight:600}}>Ton humeur du jour</h2>

              <div className="card panel" style={{
                flex:1,
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                padding:24,
                gap:12
              }}>
                {/* Cercle avec icône cadenas */}
                <div style={{
                  width:100,
                  height:100,
                  borderRadius:'50%',
                  background:'#C8D9FC',
                  border:'1px solid #D9D9D9',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  position:'relative',
                  filter: 'drop-shadow(0px 2px 1px rgba(12, 12, 13, 0.08))'
                }}>
                  <div style={{
                    width:60,
                    height:60,
                    borderRadius:'50%',
                    background:'white',
                    border:'0.6px solid #D9D9D9',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    filter: 'drop-shadow(0px 1px 1px rgba(12, 12, 13, 0.05))'
                  }}>
                    <LockIcon size={20} color="#757575" />
                  </div>
                </div>

                <p style={{fontSize:12, color:'#757575', margin:0, lineHeight:1.4, textAlign:'center'}}>
                  Apparaîtra ici après ton check-in
                </p>
              </div>
            </div>

            {/* Carte série de check-in */}
            <div className="card" style={{padding:'16px 20px'}}>
              <h2 style={{fontSize:18, margin:'0 0 12px', fontWeight:600}}>Ta série de check-in</h2>

              <div style={{display:'flex', gap:10, alignItems:'center', justifyContent:'center', marginBottom:12}}>
                {weekdayCheckIns.map((item, index) => (
                  <div key={index} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:6, position:'relative'}}>
                    {item.isCurrent && (
                      <div style={{
                        position:'absolute',
                        top:-16,
                        left:'50%',
                        transform:'translateX(-50%)',
                        width:0,
                        height:0,
                        borderLeft:'5px solid transparent',
                        borderRight:'5px solid transparent',
                        borderTop:'8px solid #0748EA'
                      }} />
                    )}
                    <div style={{
                      width:22,
                      height:22,
                      borderRadius:'50%',
                      background: item.completed ? '#0748EA' : 'white',
                      border: `1px solid ${item.completed ? '#0748EA' : '#D9D9D9'}`,
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      filter: 'drop-shadow(0px 1px 2px rgba(12, 12, 13, 0.05))'
                    }}>
                      {item.completed && (
                        <svg width="11" height="8" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.818 1.188L4.193 7.813L1.182 4.801" stroke="#C8D9FC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{fontSize:12, color:'#757575'}}>{item.day}</span>
                  </div>
                ))}
              </div>

              <p style={{fontSize:12, color:'#757575', margin:0, lineHeight:1.4, textAlign:'center'}}>
                Continue comme ça !
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
