import { useState, useEffect } from 'react'

// Import des images météo
import Orage from '@/media/logo_meteo/Orage.png'
import Pluvieux from '@/media/logo_meteo/Pluvieux.png'
import Nuageux from '@/media/logo_meteo/Nuageux.png'
import SoleilNuageux from '@/media/logo_meteo/Soleil_nuageux.png'
import Soleil from '@/media/logo_meteo/Soleil.png'

export default function Checkin({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [moodValue, setMoodValue] = useState(() => {
    const saved = localStorage.getItem('huma_checkin_mood')
    return saved ? parseInt(saved) : 50
  })

  // Save mood value to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('huma_checkin_mood', moodValue.toString())
  }, [moodValue])

  // Fonction pour déterminer l'image météo en fonction de la valeur
  const getMoodImage = (value) => {
    if (value <= 20) return Orage
    if (value <= 40) return Pluvieux
    if (value <= 60) return Nuageux
    if (value <= 80) return SoleilNuageux
    return Soleil
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'rgba(1, 30, 112, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '680px',
        background: 'white',
        borderRadius: 8,
        padding: '50px 70px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        maxHeight: '95vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        
        {/* Titre et sous-titre */}
        <div style={{textAlign: 'center'}}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 600,
            margin: '0 0 6px',
            color: '#1E1E1E'
          }}>
            Ta météo du jour
          </h1>
          <p style={{
            fontSize: 13,
            color: '#757575',
            margin: 0,
            lineHeight: 1.4
          }}>
            Comment te sens-tu aujourd'hui ? (1/3)<br />
          </p>
        </div>

        {/* Indicateur d'étapes (1/3) */}
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Étape 1 */}
          <div style={{
            width: 223,
            height: 8,
            borderRadius: 4,
            background: currentStep >= 1 ? '#0748EA' : 'white',
            border: currentStep >= 1 ? 'none' : '1px solid #D9D9D9'
          }} />
          
          {/* Étape 2 */}
          <div style={{
            width: 219,
            height: 8,
            borderRadius: 4,
            background: currentStep >= 2 ? '#C8D9FC' : 'white',
            border: currentStep >= 2 ? 'none' : '1px solid #D9D9D9'
          }} />
          
          {/* Étape 3 */}
          <div style={{
            width: 219,
            height: 8,
            borderRadius: 4,
            background: currentStep >= 3 ? '#C8D9FC' : 'white',
            border: currentStep >= 3 ? 'none' : '1px solid #D9D9D9'
          }} />
        </div>

        {/* Icône de fermeture */}
        <div style={{position: 'absolute', top: 24, right: 24, cursor: 'pointer'}} onClick={() => onNavigate?.('Accueil')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Personnage SVG - remplacé par image météo dynamique */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '16px 0'
        }}>
          <img 
            src={getMoodImage(moodValue)} 
            alt="Météo de l'humeur" 
            style={{
              width: '180px',
              height: '172px',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Slider avec cercle */}
        <div style={{position: 'relative', padding: '16px 0'}}>
          {/* Barre de progression */}
          <div style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center'
          }}>
            <div style={{
              flex: 1,
              height: 16,
              borderRadius: 8,
              background: '#C8D9FC',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Barre de remplissage */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${moodValue}%`,
                background: '#C8D9FC'
              }} />
            </div>
            
            {/* Input range invisible */}
            <input
              type="range"
              min="1"
              max="100"
              value={moodValue}
              onChange={(e) => setMoodValue(Number(e.target.value))}
              style={{
                position: 'absolute',
                width: 'calc(100% - 50px)',
                left: '0',
                opacity: 0,
                cursor: 'pointer',
                height: '40px'
              }}
            />
            
            {/* Cercle indicateur */}
            <div style={{
              width: 27,
              height: 27,
              borderRadius: '50%',
              background: '#1E1E1E',
              border: '3px solid white',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              position: 'absolute',
              left: `calc(${moodValue}% - 13.5px)`,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }} />
          </div>
        </div>

        {/* Bouton de validation */}
        <button 
          onClick={() => onNavigate?.('CheckinStep2')}
          style={{
          background: '#0748EA',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          padding: '14px 28px',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0px 4px 2px rgba(12, 12, 13, 0.05), 0px 4px 2px rgba(12, 12, 13, 0.1)',
          width: '100%'
        }}>
          Je valide mon humeur
        </button>
      </div>
    </div>
  )
}
