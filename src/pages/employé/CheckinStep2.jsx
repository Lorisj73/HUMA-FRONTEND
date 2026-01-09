import { useState, useEffect } from 'react'

export default function CheckinStep2({ onNavigate, onBack }) {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const saved = localStorage.getItem('huma_checkin_options')
    return saved ? JSON.parse(saved) : []
  })

  // Save selected options to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('huma_checkin_options', JSON.stringify(selectedOptions))
  }, [selectedOptions])

  // Options de bien-être de la page 2/3
  const options = [
    { id: 1, label: 'Charge / Rythme' },
    { id: 2, label: 'Relations / Ambiance' },
    { id: 3, label: 'Sens / Motivation' },
    { id: 4, label: 'Organisation / Clarté' },
    { id: 5, label: 'Reconnaissance' },
    { id: 6, label: 'Équilibre pro/perso' }
  ]

  const toggleOption = (id) => {
    setSelectedOptions(prev => 
      prev.includes(id) 
        ? prev.filter(optionId => optionId !== id)
        : [...prev, id]
    )
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
        padding: '32px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        maxHeight: '95vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        
        {/* Icône de fermeture */}
        <div style={{position: 'absolute', top: 24, right: 24, cursor: 'pointer'}} onClick={() => onNavigate?.('Accueil')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Titre et sous-titre */}
        <div style={{textAlign: 'center'}}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 600,
            margin: '0 0 6px',
            color: '#1E1E1E'
          }}>
            Ton humeur du jour
          </h1>
          <p style={{
            fontSize: 13,
            color: '#757575',
            margin: 0,
            lineHeight: 1.4
          }}>
            Qu'est-ce qui définit ton ressenti aujourd'hui ? (2/3)<br />
          </p>
        </div>

        {/* Indicateur d'étapes (2/3) */}
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Étape 1 - Complétée */}
          <div style={{
            width: 223,
            height: 8,
            borderRadius: 4,
            background: '#0748EA'
          }} />
          
          {/* Étape 2 - En cours */}
          <div style={{
            width: 219,
            height: 8,
            borderRadius: 4,
            background: '#0748EA'
          }} />
          
          {/* Étape 3 - Non complétée */}
          <div style={{
            width: 219,
            height: 8,
            borderRadius: 4,
            background: 'white',
            border: '1px solid #D9D9D9'
          }} />
        </div>

        
        

        {/* Grille d'options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          margin: '8px 0'
        }}>
          {options.map(option => (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              style={{
                background: selectedOptions.includes(option.id) ? 'white' : 'white',
                border: `1px solid ${selectedOptions.includes(option.id) ? '#0748EA' : '#D9D9D9'}`,
                borderRadius: 6,
                padding: '16px 20px',
                fontSize: 14,
                color: '#1E1E1E',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
                fontWeight: selectedOptions.includes(option.id) ? 500 : 400,
                boxShadow: selectedOptions.includes(option.id) 
                  ? '0px 1px 2px rgba(12, 12, 13, 0.05), 0px 1px 2px rgba(12, 12, 13, 0.1)' 
                  : 'none'
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Boutons navigation */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginTop: '8px'
        }}>
          <button 
            onClick={() => onBack?.()}
            style={{
              background: 'white',
              color: '#0748EA',
              border: '1px solid #D9D9D9',
              borderRadius: 6,
              padding: '14px 28px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              flex: 1
            }}
          >
            Retour
          </button>
          <button 
            onClick={() => onNavigate?.('CheckinStep3')}
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
            flex: 1
          }}>
            C'est la bonne cause
          </button>
        </div>
      </div>
    </div>
  )
}
