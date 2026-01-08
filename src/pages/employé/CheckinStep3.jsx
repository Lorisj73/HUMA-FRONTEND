import { useState, useEffect } from 'react'

// Import des images météo
import Orage from '@/media/logo_meteo/Orage.png'
import Pluvieux from '@/media/logo_meteo/Pluvieux.png'
import Nuageux from '@/media/logo_meteo/Nuageux.png'
import SoleilNuageux from '@/media/logo_meteo/Soleil_nuageux.png'
import Soleil from '@/media/logo_meteo/Soleil.png'

export default function CheckinStep3({ onNavigate, onBack }) {
  const [comment, setComment] = useState('')
  const [showSuggestion, setShowSuggestion] = useState(true)
  const [weatherImage, setWeatherImage] = useState(Soleil)

  // Load data from previous steps
  useEffect(() => {
    const savedMood = localStorage.getItem('huma_checkin_mood')
    if (savedMood) {
      const moodValue = parseInt(savedMood)
      // Map mood value to weather image (same logic as Checkin.jsx)
      if (moodValue <= 20) setWeatherImage(Orage)
      else if (moodValue <= 40) setWeatherImage(Pluvieux)
      else if (moodValue <= 60) setWeatherImage(Nuageux)
      else if (moodValue <= 80) setWeatherImage(SoleilNuageux)
      else setWeatherImage(Soleil)
    }
  }, [])

  const handleSubmit = () => {
    // Save comment
    localStorage.setItem('huma_checkin_comment', comment)
    
    // Get all check-in data
    const moodValue = localStorage.getItem('huma_checkin_mood')
    const selectedOptions = JSON.parse(localStorage.getItem('huma_checkin_options') || '[]')
    
    // Save complete check-in to localStorage (for use when API is ready)
    const checkinData = {
      mood: parseInt(moodValue),
      options: selectedOptions,
      comment: comment,
      timestamp: new Date().toISOString()
    }
    
    // Save to history
    const checkinHistory = JSON.parse(localStorage.getItem('huma_checkin_history') || '[]')
    checkinHistory.push(checkinData)
    localStorage.setItem('huma_checkin_history', JSON.stringify(checkinHistory))
    
    // Here you would submit to API
    console.log('Check-in completed:', checkinData)
    
    // Clear temporary localStorage
    localStorage.removeItem('huma_checkin_mood')
    localStorage.removeItem('huma_checkin_options')
    localStorage.removeItem('huma_checkin_comment')
    
    onNavigate?.('HomeUnlocked')
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        width: 680,
        borderRadius: 20,
        padding: '50px 70px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        position: 'relative',
        maxHeight: '95vh',
        overflow: 'auto'
      }}>
        {/* Close X */}
        <button
          onClick={() => onNavigate?.('Accueil')}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
          <h2 style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#0A2C2F',
            margin: 0
          }}>
            Ta météo du jour
          </h2>
          <p style={{
            fontSize: 13,
            color: '#6b7280',
            margin: 0
          }}>
            Merci pour ton partage ! Tu veux ajouter un mot ? (3/3)
          </p>
        </div>

        {/* Step Indicators */}
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center'
        }}>
          <div style={{
            flex: 1,
            height: 4,
            backgroundColor: '#0748EA',
            borderRadius: 2
          }}></div>
          <div style={{
            flex: 1,
            height: 4,
            backgroundColor: '#0748EA',
            borderRadius: 2
          }}></div>
          <div style={{
            flex: 1,
            height: 4,
            backgroundColor: '#0748EA',
            borderRadius: 2
          }}></div>
        </div>

        {/* Back Link */}
        <button
          onClick={() => onBack?.()}
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: 13,
            cursor: 'pointer',
            padding: 0,
            textAlign: 'left',
            textDecoration: 'underline'
          }}
        >
          &lt; Précédent
        </button>

        {/* Weather Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 10
        }}>
          <img 
            src={weatherImage} 
            alt="Météo du jour"
            style={{
              width: 180,
              height: 172
            }}
          />
        </div>

        {/* Dynamic Text */}
        <p style={{
          fontSize: 16,
          color: '#0A2C2F',
          textAlign: 'center',
          margin: 0
        }}>
          Tu te sens (...) à cause de (...)
        </p>

        {/* Optional Comment Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginTop: 8
        }}>
          <label style={{
            fontSize: 13,
            color: '#0A2C2F'
          }}>
            Tu veux ajouter un commentaire ? (Facultatif - 30 sec max)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tu peux t'exprimer librement ici..."
            style={{
              width: '100%',
              minHeight: 80,
              padding: 12,
              fontSize: 13,
              color: '#0A2C2F',
              border: '1px solid #D9D9D9',
              borderRadius: 8,
              resize: 'vertical',
              fontFamily: 'inherit',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0748EA'}
            onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
          />
        </div>

        {/* Suggestion Box */}
        {showSuggestion && (
          <div style={{
            backgroundColor: '#EFF3FF',
            borderRadius: 10,
            padding: 16,
            display: 'flex',
            gap: 12
          }}>
            <div style={{ paddingTop: 2 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C10 2 8 2 8 4C8 6 10 6 10 6C10 6 12 6 12 4C12 2 10 2 10 2Z" fill="#0748EA"/>
                <ellipse cx="10" cy="11" rx="5" ry="7" fill="#0748EA" opacity="0.3"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 13,
                fontWeight: 500,
                color: '#0748EA',
                marginBottom: 4
              }}>
                Suggestion
              </div>
              <div style={{
                fontSize: 12,
                color: '#4B5563',
                lineHeight: 1.5
              }}>
                Tu sembles tendu par l'organisation. Et si tu réservais un moment demain matin pour prioriser tes tâches ?
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#0748EA',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '14px 28px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            marginTop: 8
          }}
        >
          Enregistrer ma météo du jour
        </button>

        {/* Privacy Notice */}
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          marginTop: 4
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="6" width="10" height="7" rx="1" stroke="#6b7280" strokeWidth="1.5"/>
            <path d="M5 6V4.5C5 3.11929 6.11929 2 7.5 2H8.5C9.88071 2 11 3.11929 11 4.5V6" stroke="#6b7280" strokeWidth="1.5"/>
          </svg>
          <span style={{
            fontSize: 11,
            color: '#6b7280'
          }}>
            100% anonyme - aucun manager ne verra ton ressenti individuel
          </span>
        </div>
      </div>
    </div>
  )
}
