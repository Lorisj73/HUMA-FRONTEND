import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getFeedbacks } from '../../services/feedbackService'

export default function CategoryDetail() {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [isManager, setIsManager] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Décoder le nom de la catégorie depuis l'URL
  const category = categoryId ? { name: decodeURIComponent(categoryId) } : null
  const [progress, setProgress] = useState(0)
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

  // Charger les feedbacks de la catégorie
  useEffect(() => {
    loadCategoryFeedbacks()
  }, [categoryId])

  const loadCategoryFeedbacks = async () => {
    try {
      setIsLoading(true)
      const allFeedbacks = await getFeedbacks()
      
      // Filtrer les feedbacks par catégorie
      const categoryName = decodeURIComponent(categoryId)
      const filtered = allFeedbacks.filter(fb => fb.categoryLabel === categoryName)
      
      // Mapper les feedbacks au format attendu par le carrousel
      const mapped = filtered.map(fb => ({
        id: fb.id,
        date: fb.date,
        text: fb.feedbackText || fb.preview || '',
        status: mapStatus(fb.status),
        decision: null,
        decisionNote: null
      }))
      
      setFeedbacks(mapped)
      setProgress(0) // Réinitialiser à la première carte
      setActive(0)
    } catch (error) {
      console.error('Erreur lors du chargement des feedbacks:', error)
      setFeedbacks([])
    } finally {
      setIsLoading(false)
    }
  }

  // Mapper les statuts backend vers frontend
  const mapStatus = (status) => {
    const statusMap = {
      'pending': 'Nouveau',
      'vu': 'Vu',
      'en_cours': 'En cours',
      'resolu': 'Traité',
      'archive': 'Archivé'
    }
    return statusMap[status] || 'Nouveau'
  }

  // Formater la date en format lisible
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Aujourd\'hui'
    if (diffDays === 1) return 'Hier'
    if (diffDays < 7) return `Il y a ${diffDays} jours`
    if (diffDays < 14) return 'Il y a 1 semaine'
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`
    if (diffDays < 60) return 'Il y a 1 mois'
    return `Il y a ${Math.floor(diffDays / 30)} mois`
  }

  const speedWheel = 0.5
  const speedDrag = -0.3

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
    const targetProgress = feedbacks.length > 1 
      ? (index / (feedbacks.length - 1)) * 100 
      : 0
    setProgress(targetProgress)
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || feedbacks.length === 0) return

    const wheelHandler = (e) => handleWheel(e)
    const mouseDownHandler = (e) => handleMouseDown(e)
    const mouseMoveHandler = (e) => handleMouseMove(e)
    const mouseUpHandler = () => handleMouseUp()

    carousel.addEventListener('wheel', wheelHandler, { passive: false })
    carousel.addEventListener('mousedown', mouseDownHandler)
    carousel.addEventListener('mousemove', mouseMoveHandler)
    carousel.addEventListener('mouseup', mouseUpHandler)
    carousel.addEventListener('touchstart', mouseDownHandler)
    carousel.addEventListener('touchmove', mouseMoveHandler)
    carousel.addEventListener('touchend', mouseUpHandler)

    return () => {
      carousel.removeEventListener('wheel', wheelHandler)
      carousel.removeEventListener('mousedown', mouseDownHandler)
      carousel.removeEventListener('mousemove', mouseMoveHandler)
      carousel.removeEventListener('mouseup', mouseUpHandler)
      carousel.removeEventListener('touchstart', mouseDownHandler)
      carousel.removeEventListener('touchmove', mouseMoveHandler)
      carousel.removeEventListener('touchend', mouseUpHandler)
    }
  }, [isDown, startX, feedbacks.length])

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

      {/* Message de chargement ou vide */}
      {isLoading ? (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text)',
          fontSize: 16
        }}>
          Chargement...
        </div>
      ) : feedbacks.length === 0 ? (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 12,
          color: 'var(--text)'
        }}>
          <div style={{ fontSize: 48 }}>📭</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Aucun feedback dans cette catégorie</div>
          <div style={{ fontSize: 14, color: '#6B7280' }}>Sois le premier à partager ton retour !</div>
        </div>
      ) : (
        <>
      {/* Carrousel */}
      <div
        ref={carouselRef}
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          overflow: 'hidden',
          pointerEvents: 'auto'
        }}
      >
        {feedbacks.map((feedback, index) => {
          const zIndex = getZindex(feedbacks, active)[index]
          const offset = index - active
          const x = offset * 120
          const y = Math.abs(offset) * 30
          const rot = offset * 8
          const opacity = Math.max(0.4, 1 - Math.abs(offset) * 0.2)

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
                    {formatDate(feedback.date)}
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
      {!isLoading && feedbacks.length > 0 && (
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
      )}
      </>
      )}
    </div>
  )
}
