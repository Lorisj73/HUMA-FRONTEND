import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '@/components/Modal'

export default function FeedbacksEmployee() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  // Données des catégories avec leurs compteurs
  const categories = [
    { 
      name: 'Charge / Rythme', 
      count: 9,
      gradient: 'linear-gradient(135deg, rgba(147, 197, 253, 0.3) 0%, rgba(219, 234, 254, 0.3) 100%)'
    },
    { 
      name: 'Relations / Ambiance', 
      count: 7,
      gradient: 'linear-gradient(135deg, rgba(196, 181, 253, 0.3) 0%, rgba(221, 214, 254, 0.3) 100%)'
    },
    { 
      name: 'Organisation / Clarté', 
      count: 5,
      gradient: 'linear-gradient(135deg, rgba(209, 213, 219, 0.3) 0%, rgba(229, 231, 235, 0.3) 100%)'
    },
    { 
      name: 'Reconnaissance', 
      count: 4,
      gradient: 'linear-gradient(135deg, rgba(254, 215, 170, 0.4) 0%, rgba(254, 240, 221, 0.3) 100%)'
    },
    { 
      name: 'Équilibre vie pro / perso', 
      count: 12,
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(254, 215, 170, 0.3) 100%)'
    },
    { 
      name: 'Locaux / Matériel', 
      count: 4,
      gradient: 'linear-gradient(135deg, rgba(254, 215, 170, 0.3) 0%, rgba(254, 226, 196, 0.3) 100%)'
    }
  ]

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, rgba(191, 219, 254, 0.4) 0%, rgba(254, 215, 170, 0.4) 100%)',
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
              color: '#1E1E1E'
            }}>
              La boîte à feedback
            </h1>
            <p style={{ 
              fontSize: 16, 
              color: '#4B5563', 
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
          {categories.map((category, index) => (
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
                  color: '#1E1E1E'
                }}>
                  {category.name}
                </h3>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#1E1E1E',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  {category.count}
                </div>
              </div>

              {/* Carte de proposition */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                padding: 16,
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#6B7280',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5
                }}>
                  Proposition
                </div>
                <p style={{
                  fontSize: 13,
                  color: '#1E1E1E',
                  margin: 0,
                  lineHeight: 1.6,
                  fontStyle: 'italic'
                }}>
                  " Je propose qu'on ajoute des plantes et de meilleures lampes dans l'open space, c'est un peu triste."
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour nouveau feedback */}
      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <h2 style={{fontSize:28, margin:'0 0 12px', fontWeight:700}}>Nouveau feedback</h2>
          <p style={{fontSize:14, color:'#6B7280', margin:'0 0 32px'}}>
            Partage tes idées, suggestions ou préoccupations
          </p>
          
          <form onSubmit={(e) => {
            e.preventDefault()
            setShowModal(false)
          }}>
            <label style={{display:'block', marginBottom:24}}>
              <div style={{marginBottom:10, fontSize:14, fontWeight:600, color:'#1E1E1E'}}>Catégorie</div>
              <select style={{
                width:'100%',
                padding:'14px',
                fontSize:15,
                border:'1px solid #D1D5DB',
                borderRadius:8,
                background:'white',
                cursor:'pointer',
                outline:'none'
              }}>
                <option>Charge / Rythme</option>
                <option>Relations / Ambiance</option>
                <option>Organisation / Clarté</option>
                <option>Reconnaissance</option>
                <option>Équilibre vie pro / perso</option>
                <option>Locaux / Matériel</option>
              </select>
            </label>

            <label style={{display:'block', marginBottom:32}}>
              <div style={{marginBottom:10, fontSize:14, fontWeight:600, color:'#1E1E1E'}}>Ton feedback</div>
              <textarea 
                style={{
                  width:'100%',
                  padding:'14px',
                  fontSize:15,
                  border:'1px solid #D1D5DB',
                  borderRadius:8,
                  background:'white',
                  resize:'vertical',
                  minHeight:140,
                  outline:'none',
                  fontFamily:'inherit'
                }}
                placeholder="Décris ce qui va bien ou ce qui pourrait être amélioré..."
              />
            </label>

            <div style={{display:'flex', gap:12, justifyContent:'flex-end'}}>
              <button 
                type="button" 
                className="btn"
                onClick={() => setShowModal(false)}
                style={{
                  padding:'12px 24px',
                  fontSize:15,
                  fontWeight:600,
                  borderRadius:8,
                  border:'1px solid #D1D5DB',
                  background:'white',
                  color:'#374151',
                  cursor:'pointer'
                }}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="btn primary"
                style={{
                  padding:'12px 24px',
                  fontSize:15,
                  fontWeight:600,
                  borderRadius:8,
                  border:'none',
                  background:'#2563EB',
                  color:'white',
                  cursor:'pointer',
                  boxShadow:'0 2px 8px rgba(37, 99, 235, 0.2)'
                }}
              >
                Envoyer
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
