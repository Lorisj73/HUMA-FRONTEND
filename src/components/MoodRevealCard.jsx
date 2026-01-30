import { useState } from 'react'
import Orage from '@/media/logo_meteo/Orage.png'
import Pluvieux from '@/media/logo_meteo/Pluvieux.png'
import Nuageux from '@/media/logo_meteo/Nuageux.png'
import SoleilNuageux from '@/media/logo_meteo/Soleil_nuageux.png'
import Soleil from '@/media/logo_meteo/Soleil.png'

const moodImages = {
  'très mal': { img: Orage, label: 'Orageux' },
  'mal': { img: Pluvieux, label: 'Pluvieux' },
  'moyen': { img: Nuageux, label: 'Nuageux' },
  'bien': { img: SoleilNuageux, label: 'Ensoleillé' },
  'très bien': { img: Soleil, label: 'Épanoui' }
}

export default function MoodRevealCard({ mood = 'moyen' }) {
  const [isRevealed, setIsRevealed] = useState(false)
  const moodData = moodImages[mood] || moodImages['moyen']

  return (
    <div className="card" style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px'
    }}>
      <h2 style={{ 
        fontSize: '18px', 
        fontWeight: '700',
        color: 'var(--text)',
        marginBottom: '16px',
        alignSelf: 'flex-start'
      }}>
        Ton humeur du jour
      </h2>

      <button
        onMouseEnter={() => setIsRevealed(true)}
        onMouseLeave={() => setIsRevealed(false)}
        style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          minWidth: '120px',
          minHeight: '120px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          perspective: '1000px',
          marginBottom: '12px',
          padding: 0,
          flexShrink: 0
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}>
          {/* Face avant - Cercles concentriques avec étoile */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(199, 210, 254, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '85px',
                height: '85px',
                borderRadius: '50%',
                background: 'rgba(199, 210, 254, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#5B7FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.74465 18.82L14.2391 7.12727L2.90633 11.6218C3.81928 11.929 5.35549 12.5786 6.83025 13.9744C8.7527 15.7915 9.4813 17.8544 9.75343 18.82H9.74465Z" fill="white"/>
                    <path d="M17.4432 9.76955L19.6554 12.2626M18.0841 6.62691L20.937 5.34527M15.5208 4.06364L15.8807 1M11.8866 4.91513L9.60419 2.21141M9.74465 18.82L14.2391 7.12727L2.90633 11.6218C3.81928 11.929 5.35549 12.5786 6.83024 13.9744C8.7527 15.7915 9.4813 17.8544 9.75343 18.82H9.74465Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Face arrière - Image météo */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(199, 210, 254, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '85px',
                height: '85px',
                borderRadius: '50%',
                background: 'rgba(199, 210, 254, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <img 
                    src={moodData.img} 
                    alt={moodData.label}
                    style={{
                      width: '35px',
                      height: '35px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      <p style={{ 
        fontSize: '13px', 
        color: '#94a3b8',
        margin: 0,
        textAlign: 'center'
      }}>
        {isRevealed ? `Tu te sens ${moodData.label.toLowerCase()} !` : 'Survole le bouton pour révéler'}
      </p>
    </div>
  )
}
