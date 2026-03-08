import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function CategoryDetail() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [isManager, setIsManager] = useState(false)

  // Décoder le nom de la catégorie depuis l'URL
  const category = categoryId ? { name: decodeURIComponent(categoryId) } : null
  const [progress, setProgress] = useState(50)
  const [active, setActive] = useState(0)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [likes, setLikes] = useState({})
  const carouselRef = useRef(null)

  // Vérifier si l'utilisateur est manager
  useEffect(() => {
    const managerStatus = localStorage.getItem('huma_is_manager')
    setIsManager(managerStatus === '1')
  }, [])

  // Données de feedbacks pour la catégorie (mock data)
  const feedbacks = [
    {
      id: 1,
      date: 'Il y a 2 jours',
      text: 'Je propose qu\'on ajoute des plantes et de meilleures lampes dans l\'open space, c\'est un peu triste.',
      status: 'Traité',
      decision: 'Accepté',
      decisionNote: 'Budget déco traité: 5 pk 8 nouvelles lampes commandées'
    },
    {
      id: 2,
      date: 'Il y a 5 jours',
      text: 'On pourrait installer des casiers individuels pour ranger nos affaires personnelles.',
      status: 'Nouveau',
      decision: null,
      decisionNote: null
    },
    {
      id: 3,
      date: 'Il y a 1 semaine',
      text: 'Il serait bien d\'avoir une machine à café de meilleure qualité.',
      status: 'Traité',
      decision: 'Refusé',
      decisionNote: 'Budget équipement déjà consommé pour ce trimestre, reétudiée en Q2'
    },
    {
      id: 4,
      date: 'Il y a 2 semaines',
      text: 'Ajouter des prises électriques supplémentaires près des bureaux.',
      status: 'En cours',
      decision: null,
      decisionNote: null
    },
    {
      id: 5,
      date: 'Il y a 3 semaines',
      text: 'Créer une salle de détente avec des canapés confortables.',
      status: 'Traité',
      decision: 'Accepté',
      decisionNote: 'Projet validé, livraison prévue fin janvier'
    }
  ]

  const speedWheel = 0.02
  const speedDrag = -0.1

  const getZindex = (array, index) => {
    return array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i))
  }

  const animate = () => {
    const clampedProgress = Math.max(0, Math.min(progress, 100))
    const newActive = Math.floor(clampedProgress / 100 * (feedbacks.length - 1))
    setActive(newActive)
  }

  useEffect(() => {
    animate()
  }, [progress])

  const handleWheel = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const wheelProgress = e.deltaY * speedWheel
    setProgress(prev => prev + wheelProgress)
  }

  const handleMouseDown = (e) => {
    setIsDown(true)
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0)
  }

  const handleMouseMove = (e) => {
    if (!isDown) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX) * speedDrag
    setProgress(prev => prev + mouseProgress)
    setStartX(x)
  }

  const handleMouseUp = () => {
    setIsDown(false)
  }

  const handleItemClick = (index) => {
    setProgress((index / feedbacks.length) * 100 + 10)
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    carousel.addEventListener('wheel', handleWheel, { passive: false })
    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mousemove', handleMouseMove)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('touchstart', handleMouseDown)
    carousel.addEventListener('touchmove', handleMouseMove)
    carousel.addEventListener('touchend', handleMouseUp)

    return () => {
      carousel.removeEventListener('wheel', handleWheel)
      carousel.removeEventListener('mousedown', handleMouseDown)
      carousel.removeEventListener('mousemove', handleMouseMove)
      carousel.removeEventListener('mouseup', handleMouseUp)
      carousel.removeEventListener('touchstart', handleMouseDown)
      carousel.removeEventListener('touchmove', handleMouseMove)
      carousel.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDown, startX])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Résolu':
        return '#10b981'
      case 'En cours':
        return '#f59e0b'
      default:
        return '#3b82f6'
    }
  }

  const toggleLike = (feedbackId, e) => {
    e.stopPropagation()
    setLikes(prev => ({
      ...prev,
      [feedbackId]: !prev[feedbackId]
    }))
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: category?.gradient || 'linear-gradient(135deg, rgba(147, 197, 253, 0.3) 0%, rgba(219, 234, 254, 0.3) 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 48px',
        position: 'relative',
        zIndex: 0,
        flexShrink: 0,
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}>
        <button
          onClick={() => navigate('/feedbacks')}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: 8,
            padding: '12px 20px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--text)',
            marginBottom: 24
          }}
        >
          ← Retour
        </button>

        <h1 style={{
          fontSize: 28,
          margin: '0 0 4px',
          fontWeight: 700,
          color: 'var(--text)'
        }}>
          {category?.name}
        </h1>
        <p style={{
          fontSize: 14,
          color: '#4B5563',
          margin: 0
        }}>
          {feedbacks.length} feedback{feedbacks.length > 1 ? 's' : ''} dans cette catégorie
        </p>
      </div>

      {/* Carrousel */}
      <div
        ref={carouselRef}
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {feedbacks.map((feedback, index) => {
          const zIndex = getZindex(feedbacks, active)[index]
          const activeValue = (index - active) / feedbacks.length
          const x = activeValue * 300
          const y = activeValue * 80
          const rot = activeValue * 50
          const opacity = zIndex / feedbacks.length * 3 - 2

          return (
            <div
              key={feedback.id}
              onClick={() => handleItemClick(index)}
              style={{
                '--items': feedbacks.length,
                '--width': 'clamp(180px, 28vw, 320px)',
                '--height': 'clamp(240px, 38vw, 400px)',
                '--x': `${x}%`,
                '--y': `${y}%`,
                '--rot': `${rot}deg`,
                '--opacity': opacity,
                '--zIndex': zIndex,
                overflow: 'hidden',
                position: 'absolute',
                zIndex: zIndex,
                width: 'var(--width)',
                height: 'var(--height)',
                margin: 'calc(var(--height) * -0.5) 0 0 calc(var(--width) * -0.5)',
                borderRadius: 16,
                top: '50%',
                left: '50%',
                userSelect: 'none',
                transformOrigin: '0% 100%',
                boxShadow: '0 10px 50px 10px rgba(0, 0, 0, 0.2)',
                background: 'rgba(255, 255, 255, 0.95)',
                pointerEvents: 'all',
                transform: `translate(var(--x), var(--y)) rotate(var(--rot))`,
                transition: 'transform 0.8s cubic-bezier(0, 0.02, 0, 1)',
                cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transition: 'opacity 0.8s cubic-bezier(0, 0.02, 0, 1)',
                opacity: opacity,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* En-tête */}
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 16
                  }}>
                    <div style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: 'rgba(0,0,0,0.1)',
                      lineHeight: 1
                    }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      background: getStatusColor(feedback.status),
                      color: 'white'
                    }}>
                      {feedback.status}
                    </div>
                  </div>

                  {/* Texte du feedback */}
                  <div style={{
                    background: 'rgba(249, 250, 251, 0.8)',
                    padding: 16,
                    borderRadius: 10,
                    marginBottom: 16
                  }}>
                    <p style={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: 'var(--text)',
                      margin: 0,
                      fontStyle: 'italic'
                    }}>
                      " {feedback.text} "
                    </p>
                  </div>

                  {/* Décision si présente */}
                  {feedback.decision && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      marginBottom: 12
                    }}>
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        background: feedback.decision === 'Accepté' ? '#10B981' : '#EF4444',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        {feedback.decision === 'Accepté' ? '✓ Accepté' : '✕ Refusé'}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: '#374151',
                        lineHeight: 1.4
                      }}>
                        {feedback.decisionNote}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: 13,
                    color: '#9CA3AF'
                  }}>
                    {feedback.date}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <button
                      onClick={(e) => toggleLike(feedback.id, e)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        borderRadius: 20,
                        border: 'none',
                        background: likes[feedback.id] ? '#ef4444' : 'rgba(0,0,0,0.05)',
                        color: likes[feedback.id] ? 'white' : '#6B7280',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!likes[feedback.id]) {
                          e.currentTarget.style.background = 'rgba(0,0,0,0.1)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!likes[feedback.id]) {
                          e.currentTarget.style.background = 'rgba(0,0,0,0.05)'
                        }
                      }}
                    >
                      {likes[feedback.id] ? '♥' : '♡'} Like
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '12px 24px',
        borderRadius: 8,
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center'
      }}>
        Utilisez la molette ou glissez pour naviguer entre les feedbacks
      </div>
    </div>
  )
}
