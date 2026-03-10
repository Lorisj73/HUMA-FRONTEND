import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '@/components/Modal'
import { createFeedback, getFeedbacks, getCategories } from '../../services/feedbackService'

export default function FeedbacksEmployee() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [feedbackCategory, setFeedbackCategory] = useState('')
  const [feedbackText, setFeedbackText] = useState('')
  const [solutionText, setSolutionText] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [feedbacksData, setFeedbacksData] = useState([])
  const [isManager, setIsManager] = useState(false)
  const [categoriesWithCounts, setCategoriesWithCounts] = useState([])

  useEffect(() => {
    // Vérifier si l'utilisateur est manager
    const managerStatus = localStorage.getItem('huma_is_manager')
    setIsManager(managerStatus === '1')
    
    loadFeedbacks()
  }, [])

  const loadFeedbacks = async () => {
    try {
      const feedbacks = await getFeedbacks()
      setFeedbacksData(feedbacks)
      
      // Calculer les compteurs par catégorie
      const counts = {}
      feedbacks.forEach(fb => {
        const label = fb.categoryLabel || fb.category
        counts[label] = (counts[label] || 0) + 1
      })
      
      // Créer les catégories avec leurs compteurs
      const allCategories = getCategories().map(catName => ({
        name: catName,
        count: counts[catName] || 0,
        gradient: getCategoryGradient(catName)
      }))
      
      setCategoriesWithCounts(allCategories)
    } catch (error) {
      console.error('Erreur lors du chargement des feedbacks:', error)
    }
  }
  
  // Fonction pour obtenir le gradient selon la catégorie
  const getCategoryGradient = (categoryName) => {
    const gradients = {
      'Charge / Rythme': 'linear-gradient(135deg, rgba(147, 197, 253, 0.3) 0%, rgba(219, 234, 254, 0.3) 100%)',
      'Sens / Motivation': 'linear-gradient(135deg, rgba(254, 215, 170, 0.3) 0%, rgba(254, 226, 196, 0.3) 100%)',
      'Organisation / Clarté': 'linear-gradient(135deg, rgba(209, 213, 219, 0.3) 0%, rgba(229, 231, 235, 0.3) 100%)',
      'Reconnaissance': 'linear-gradient(135deg, rgba(254, 215, 170, 0.4) 0%, rgba(254, 240, 221, 0.3) 100%)',
      'Équilibre vie pro / perso': 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(254, 215, 170, 0.3) 100%)',
      'Locaux / Matériel': 'linear-gradient(135deg, rgba(254, 215, 170, 0.3) 0%, rgba(254, 226, 196, 0.3) 100%)'
    }
    return gradients[categoryName] || 'linear-gradient(135deg, rgba(147, 197, 253, 0.3) 0%, rgba(219, 234, 254, 0.3) 100%)'
  }

  const handleSubmitFeedback = async () => {
    if (!feedbackCategory || !feedbackText.trim()) {
      setError('Veuillez renseigner la catégorie et votre feedback')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await createFeedback(feedbackCategory, feedbackText.trim(), solutionText.trim(), isAnonymous)
      
      // Réinitialiser le formulaire
      setFeedbackCategory('')
      setFeedbackText('')
      setSolutionText('')
      setIsAnonymous(true)
      setShowModal(false)
      
      // Recharger les feedbacks
      await loadFeedbacks()
    } catch (err) {
      console.error('Erreur lors de l\'envoi du feedback:', err)
      setError('Impossible d\'envoyer votre feedback. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour obtenir le dernier feedback d'une catégorie
  const getLastFeedbackForCategory = (categoryName) => {
    const categoryFeedbacks = feedbacksData.filter(fb => fb.categoryLabel === categoryName)
    if (categoryFeedbacks.length === 0) return null
    
    // Trier par date décroissante et prendre le premier
    const sorted = categoryFeedbacks.sort((a, b) => new Date(b.date) - new Date(a.date))
    return sorted[0]
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      padding: '32px 0'
    }}>
      <div className="container" style={{ maxWidth: 1200 }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: 40 
        }}>
          <div>
            <h1 style={{ 
              fontSize: 42, 
              margin: '0 0 12px', 
              fontWeight: 700,
              color: 'var(--text)'
            }}>
              La boîte à feedback
            </h1>
            <p style={{ 
              fontSize: 16, 
              color: 'var(--text)', 
              margin: 0, 
              maxWidth: 600,
              lineHeight: 1.5
            }}>
              Participe à l'évolution collective et contribue aux améliorations qui façonnent notre culture.
            </p>
          </div>
          <button 
            className="btn primary"
            onClick={() => setShowModal(true)}
            style={{
              padding: '14px 28px',
              fontSize: 15,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: '#2563EB',
              borderRadius: 8,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
            }}
          >
            + Nouveau Feedback
          </button>
        </div>

        {/* Grille des catégories */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24
        }}>
          {categoriesWithCounts.map((category, index) => {
            const lastFeedback = getLastFeedbackForCategory(category.name)
            return (
            <div
              key={index}
              className="card"
              style={{
                background: category.gradient,
                padding: 24,
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                minHeight: 220
              }}
              onClick={() => {
                // Encode le nom de la catégorie pour l'utiliser dans l'URL
                const categoryId = encodeURIComponent(category.name)
                navigate(`/category/${categoryId}`)
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* En-tête de la carte */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 20
              }}>
                <h3 style={{ 
                  fontSize: 18, 
                  fontWeight: 600, 
                  margin: 0,
                  color: 'var(--text)'
                }}>
                  {category.name}
                </h3>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'var(--card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--text)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  {category.count}
                </div>
              </div>

              {/* Carte de proposition */}
              {category.count > 0 && lastFeedback && (
                <div style={{
                  background: 'var(--card)',
                  padding: 16,
                  borderRadius: 12,
                  border: '1px solid var(--border)'
                }}>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#6B7280',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}>
                    Dernier feedback
                  </div>
                  <p style={{
                    fontSize: 13,
                    color: 'var(--text)',
                    margin: 0,
                    lineHeight: 1.6,
                    fontStyle: 'italic'
                  }}>
                    "{lastFeedback.preview}"
                  </p>
                </div>
              )}
            </div>
            )
          })}
        </div>
      </div>

      {/* Modal pour nouveau feedback */}
      {showModal && (
        <Modal open={showModal} onClose={() => {
          setShowModal(false)
          setError('')
          setFeedbackCategory('')
          setFeedbackText('')
          setSolutionText('')
          setIsAnonymous(true)
        }}>
          <h2 style={{fontSize:28, margin:'0 0 12px', fontWeight:700}}>Nouveau feedback</h2>
          <p style={{fontSize:14, color:'#6B7280', margin:'0 0 32px'}}>
            Partage tes idées, suggestions ou préoccupations de manière anonyme
          </p>
          
          <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmitFeedback()
          }}>
            <label style={{display:'block', marginBottom:24}}>
              <div style={{marginBottom:10, fontSize:14, fontWeight:600, color:'var(--text)'}}>
                Catégorie <span style={{color:'#EF4444'}}>*</span>
              </div>
              <select 
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                required
                disabled={isLoading}
                style={{
                  width:'100%',
                  padding:'14px',
                  fontSize:15,
                  border:'1px solid var(--border)',
                  borderRadius:8,
                  background:'var(--card)',
                  color:'var(--text)',
                  cursor:'pointer',
                  outline:'none'
                }}>
                <option value="">Sélectionner une catégorie</option>
                {getCategories().map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>

            <label style={{display:'block', marginBottom:24}}>
              <div style={{marginBottom:10, fontSize:14, fontWeight:600, color:'var(--text)'}}>
                Ton feedback <span style={{color:'#EF4444'}}>*</span>
              </div>
              <textarea 
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                required
                disabled={isLoading}
                style={{
                  width:'100%',
                  padding:'14px',
                  fontSize:15,
                  border:'1px solid var(--border)',
                  borderRadius:8,
                  background:'var(--card)',
                  color:'var(--text)',
                  resize:'vertical',
                  minHeight:140,
                  outline:'none',
                  fontFamily:'inherit'
                }}
                placeholder="Décris ce qui va bien ou ce qui pourrait être amélioré..."
              />
            </label>

            <label style={{display:'block', marginBottom:24}}>
              <div style={{marginBottom:10, fontSize:14, fontWeight:600, color:'var(--text)'}}>
                Ta suggestion (optionnel)
              </div>
              <textarea 
                value={solutionText}
                onChange={(e) => setSolutionText(e.target.value)}
                disabled={isLoading}
                style={{
                  width:'100%',
                  padding:'14px',
                  fontSize:15,
                  border:'1px solid var(--border)',
                  borderRadius:8,
                  background:'var(--card)',
                  color:'var(--text)',
                  resize:'vertical',
                  minHeight:100,
                  outline:'none',
                  fontFamily:'inherit'
                }}
                placeholder="Propose une solution ou une idée d'amélioration..."
              />
            </label>

            <label style={{display:'flex', alignItems:'center', gap:12, marginBottom:32, cursor:'pointer'}}>
              <input 
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                disabled={isLoading}
                style={{width:18, height:18, cursor:'pointer'}}
              />
              <span style={{fontSize:14, fontWeight:500, color:'var(--text)'}}>
                Envoyer de manière anonyme (recommandé)
              </span>
            </label>

            {error && (
              <div style={{
                marginBottom: 16,
                padding: '12px 16px',
                background: '#FFF0F0',
                border: '1px solid #FFB3B3',
                borderRadius: 8,
                color: '#D32F2F',
                fontSize: 14
              }}>
                {error}
              </div>
            )}

            <div style={{display:'flex', gap:12, justifyContent:'flex-end'}}>
              <button 
                type="button" 
                className="btn"
                onClick={() => {
                  setShowModal(false)
                  setError('')
                }}
                disabled={isLoading}
                style={{
                  padding:'12px 24px',
                  fontSize:15,
                  fontWeight:600,
                  borderRadius:8,
                  border:'1px solid var(--border)',
                  background:'var(--card)',
                  color:'var(--text)',
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="btn primary"
                disabled={isLoading || !feedbackCategory || !feedbackText.trim()}
                style={{
                  padding:'12px 24px',
                  fontSize:15,
                  fontWeight:600,
                  borderRadius:8,
                  border:'none',
                  background: (isLoading || !feedbackCategory || !feedbackText.trim()) ? '#D9D9D9' : '#2563EB',
                  color:'white',
                  cursor: (isLoading || !feedbackCategory || !feedbackText.trim()) ? 'not-allowed' : 'pointer',
                  boxShadow:'0 2px 8px rgba(37, 99, 235, 0.2)'
                }}
              >
                {isLoading ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
