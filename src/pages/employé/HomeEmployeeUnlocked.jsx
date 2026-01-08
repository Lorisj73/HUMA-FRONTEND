import { useState, useEffect } from 'react'
import Orage from '@/media/logo_meteo/Orage.png'
import Pluvieux from '@/media/logo_meteo/Pluvieux.png'
import Nuageux from '@/media/logo_meteo/Nuageux.png'
import SoleilNuageux from '@/media/logo_meteo/Soleil_nuageux.png'
import Soleil from '@/media/logo_meteo/Soleil.png'

export default function HomeEmployeeUnlocked({ onNavigate }) {
  const [lastCheckin, setLastCheckin] = useState(null)
  const [checkinHistory, setCheckinHistory] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('huma_checkin_history') || '[]')
    setCheckinHistory(history)
    if (history.length > 0) {
      setLastCheckin(history[history.length - 1])
    }
  }, [])

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

  if (!lastCheckin) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>Aucun check-in disponible</p>
      </div>
    )
  }

  const weekDays = ['L', 'M', 'M', 'J', 'V']
  const completedDays = checkinHistory.length

  return (
    <div>
      <div className="container" style={{paddingTop:16, maxWidth: isMobile ? '100%' : 1400, margin: '0 auto'}}>
        
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
            minWidth: 0,
            padding:'16px 24px',
            borderRadius:50,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            filter: 'drop-shadow(0px 2px 1px rgba(12, 12, 13, 0.05))'
          }}>
            <h1 style={{fontSize:22, margin:'0 0 4px', fontWeight:600}}>Bonjour, John</h1>
            <div style={{fontSize:14, color:'var(--muted)'}}>Merci d'avoir partagé ton humeur aujourd'hui ✨</div>
          </div>
        </div>

        {/* Grille principale - 2 colonnes */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1.734fr 1fr',
          gap: '24px'
        }}>
          {/* Colonne gauche */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
            {/* Score de l'équipe */}
            <div className="card" style={{ padding: '32px', aspectRatio: '673 / 222' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '24px'
              }}>
                <div>
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '4px'
                  }}>
                    Le score de l'équipe aujourd'hui
                  </h2>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#94a3b8',
                    margin: 0
                  }}>
                    Tout va bien aujourd'hui
                  </p>
                </div>
                <div style={{ fontSize: '40px' }}>☀️</div>
              </div>

              <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                {/* Jauge en demi-cercle */}
                <div style={{ position: 'relative', width: '140px', height: '140px' }}>
                  <svg width="140" height="140" style={{ transform: 'rotate(-180deg)' }}>
                    <circle 
                      cx="70" 
                      cy="70" 
                      r="60" 
                      fill="none" 
                      stroke="#e2e8f0" 
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 60 * 0.5} ${2 * Math.PI * 60}`}
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="70" 
                      cy="70" 
                      r="60" 
                      fill="none" 
                      stroke="#667eea" 
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 60 * 0.5 * 0.72} ${2 * Math.PI * 60}`}
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
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>7,2</div>
                    <div style={{ fontSize: '14px', color: '#94a3b8' }}>/10</div>
                  </div>
                </div>

                {/* Barres de progression */}
                <div style={{ flex: 1 }}>
                  {[
                    { label: 'Épanoui', value: 85 },
                    { label: 'Serein', value: 75 },
                    { label: 'Mitigé', value: 45 }
                  ].map((item, i) => (
                    <div key={i} style={{ marginBottom: i < 2 ? '16px' : 0 }}>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#64748b',
                        marginBottom: '6px',
                        fontWeight: '500'
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${item.value}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '4px'
                        }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Evolution sur la semaine */}
            <div className="card" style={{ padding: '32px', aspectRatio: '673 / 373' }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '4px'
              }}>
                Evolution sur la semaine
              </h2>
              <p style={{ 
                fontSize: '14px', 
                color: '#94a3b8',
                marginBottom: '24px'
              }}>
                Les humeurs quotidiennes de ton équipe cette semaine
              </p>

              {/* Graphique */}
              <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                <svg viewBox="0 0 610 240" width="100%" height="240" preserveAspectRatio="xMidYMid meet">
                  {/* Fond gris */}
                  <rect width="610" height="240" fill="#F7F6F4"/>
                  
                  {/* Grille horizontale */}
                  <rect x="0" y="20" width="610" height="40" stroke="#D9D9D9" strokeWidth="0.2" fill="none"/>
                  <rect x="0" y="60" width="610" height="40" stroke="#D9D9D9" strokeWidth="0.2" fill="none"/>
                  <rect x="0" y="100" width="610" height="40" stroke="#D9D9D9" strokeWidth="0.2" fill="none"/>
                  <rect x="0" y="140" width="610" height="40" stroke="#D9D9D9" strokeWidth="0.2" fill="none"/>
                  <rect x="0" y="180" width="610" height="40" stroke="#D9D9D9" strokeWidth="0.2" fill="none"/>
                  
                  {/* Zone sous la courbe avec gradient */}
                  <path 
                    d="M0,20 C80,33 120,45 164,49 C227,54 247,119 313,127 C374,135 404,78 466,78 L466,220 L0,220 Z" 
                    fill="url(#evolutionGradient)"
                  />
                  
                  {/* Courbe bleue */}
                  <path 
                    d="M0,20 C80,33 120,45 164,49 C227,54 247,119 313,127 C374,135 404,78 466,78" 
                    fill="none" 
                    stroke="#0748EA" 
                    strokeWidth="2"
                  />
                  
                  {/* Ligne pointillée continuant la courbe */}
                  <line 
                    x1="466" 
                    y1="78" 
                    x2="610" 
                    y2="78" 
                    stroke="#303030" 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                  />
                  
                  {/* Point noir à la fin */}
                  <circle cx="466" cy="78" r="4.5" fill="#1E1E1E"/>
                  
                  <defs>
                    <linearGradient id="evolutionGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#0748EA" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                </svg>

                {/* Label "Sous tension" avec flèche */}
                <div style={{
                  position: 'absolute',
                  top: '45px',
                  left: '40%',
                  background: 'white',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  fontSize: '13px',
                  border: '1px solid #D9D9D9',
                  zIndex: 10
                }}>
                  <div style={{ fontWeight: '600', color: '#1E1E1E', marginBottom: '2px' }}>Sous tension</div>
                  <div style={{ color: '#757575', fontSize: '11px' }}>Charge/Rythme</div>
                  {/* Petite flèche vers le bas */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid white'
                  }}></div>
                </div>

                {/* Jours de la semaine */}
                <div style={{ 
                  position: 'absolute',
                  bottom: '-25px',
                  left: 0,
                  right: 0,
                  fontSize: '13px',
                  color: '#757575',
                  fontWeight: '400'
                }}>
                  {[
                    { day: 'L', x: '3%' },
                    { day: 'M', x: '23%' },
                    { day: 'M', x: '45%' },
                    { day: 'J', x: '68%' },
                    { day: 'V', x: '88%' }
                  ].map((item, i) => (
                    <span key={i} style={{ position: 'absolute', left: item.x }}>{item.day}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
            {/* Ton humeur du jour */}
            <div className="card" style={{
              padding: '32px',
              aspectRatio: '388 / 333',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '32px',
                alignSelf: 'flex-start'
              }}>
                Ton humeur du jour
              </h2>

              {/* Cercles concentriques */}
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <div style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'rgba(199, 210, 254, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'rgba(199, 210, 254, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      fontSize: '36px'
                    }}>
                      ⭐
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ 
                fontSize: '14px', 
                color: '#94a3b8',
                margin: 0
              }}>
                Survole le bouton pour révéler
              </p>
            </div>

            {/* Ta série de check-ins */}
            <div className="card" style={{
              padding: '32px',
              aspectRatio: '388 / 262',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '32px',
                alignSelf: 'flex-start'
              }}>
                Ta série de check-ins
              </h2>

              {/* Jours de la semaine avec checks */}
              <div style={{ 
                display: 'flex', 
                gap: '24px',
                marginBottom: '32px'
              }}>
                {weekDays.map((day, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: i < completedDays ? '#667eea' : '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px',
                      color: 'white',
                      fontSize: '20px'
                    }}>
                      {i < completedDays ? '✓' : ''}
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#64748b',
                      fontWeight: '500'
                    }}>
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ 
                fontSize: '14px', 
                color: '#94a3b8',
                margin: 0
              }}>
                Continue comme ça !
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
