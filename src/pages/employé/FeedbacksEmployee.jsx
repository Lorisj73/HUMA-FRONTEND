import { useState } from 'react'

export default function FeedbacksEmployee() {
  const [showModal, setShowModal] = useState(false)

  const feedbacks = [
    {
      category: 'Locaux/Matériel',
      date: '15 Nov 2025',
      status: 'En cours',
      preview: 'Le bureau serait plus agréable avec des plantes...'
    },
    {
      category: 'Équilibre vie pro/perso',
      date: '12 Nov 2025',
      status: 'Résolu',
      preview: 'Les réunions tardives impactent mon équilibre...'
    },
    {
      category: 'Reconnaissance',
      date: '8 Nov 2025',
      status: 'En cours',
      preview: 'J\'aimerais plus de retours sur mon travail...'
    },
    {
      category: 'Relations/Ambiance',
      date: '5 Nov 2025',
      status: 'Vu',
      preview: 'L\'équipe pourrait organiser plus d\'activités...'
    },
    {
      category: 'Charge/Rythme',
      date: '2 Nov 2025',
      status: 'En cours',
      preview: 'La charge de travail cette semaine était intense...'
    },
    {
      category: 'Organisation/Clarté',
      date: '28 Oct 2025',
      status: 'Résolu',
      preview: 'Les objectifs du projet manquent de clarté...'
    }
  ]

  return (
    <div className="container" style={{paddingTop:24}}>
      {/* Header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32}}>
        <div>
          <h1 style={{fontSize:32, margin:'0 0 8px', fontWeight:600}}>La boîte à feedbacks</h1>
          <p style={{fontSize:16, color:'var(--muted)', margin:0, maxWidth:800}}>
            Participe à l'évolution collective et contribue aux améliorations qui façonnent notre culture.
          </p>
        </div>
        <button 
          className="btn primary"
          onClick={() => setShowModal(true)}
          style={{
            padding:'12px 24px',
            fontSize:15,
            whiteSpace:'nowrap'
          }}
        >
          + Nouveau feedback
        </button>
      </div>

      {/* Illustration de la boîte (simplifié) */}
      <div style={{
        maxWidth:600,
        margin:'0 auto 48px',
        textAlign:'center'
      }}>
        <div style={{
          width:'100%',
          height:280,
          background:'var(--panel)',
          border:'1px solid var(--border)',
          borderRadius:12,
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'flex-end',
          padding:'32px',
          position:'relative',
          overflow:'hidden'
        }}>
          {/* Cartes empilées */}
          <div style={{position:'relative', width:'80%', height:200}}>
            {['Organisation/Clarté', 'Charge/Rythme', 'Relations/Ambiance', 'Reconnaissance', 'Équilibre vie pro/perso', 'Locaux/Matériel'].map((label, i) => (
              <div
                key={i}
                style={{
                  position:'absolute',
                  bottom: i * 35,
                  left:'50%',
                  transform:`translateX(-50%) rotate(${(i - 2.5) * 2}deg)`,
                  width:'100%',
                  background:'var(--bg)',
                  border:'1px solid var(--border)',
                  borderRadius:8,
                  padding:'16px',
                  fontSize:14,
                  boxShadow:'0 2px 4px rgba(0,0,0,0.05)',
                  zIndex: 6 - i
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des feedbacks */}
      <div style={{maxWidth:900, margin:'0 auto'}}>
        <h2 style={{fontSize:22, margin:'0 0 24px', fontWeight:600}}>Mes feedbacks</h2>
        
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          {feedbacks.map((feedback, i) => (
            <div 
              key={i}
              className="card"
              style={{
                padding:'24px',
                cursor:'pointer',
                transition:'all .2s',
                ':hover': {transform:'translateY(-2px)'}
              }}
            >
              <div style={{display:'flex', alignItems:'center', gap:20}}>
                {/* Icône catégorie */}
                <div style={{
                  width:48,
                  height:48,
                  borderRadius:8,
                  border:'1px solid var(--border)',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  flexShrink:0,
                  fontSize:20
                }}>
                  {i % 3 === 0 ? '🏢' : i % 3 === 1 ? '⚖️' : '💬'}
                </div>

                {/* Contenu */}
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:6}}>
                    <h3 style={{fontSize:16, margin:0, fontWeight:600}}>{feedback.category}</h3>
                    <span style={{
                      fontSize:12,
                      padding:'4px 12px',
                      borderRadius:12,
                      background: feedback.status === 'Résolu' ? '#e6f4ea' : feedback.status === 'En cours' ? '#fff3e0' : 'var(--panel)',
                      color: feedback.status === 'Résolu' ? '#1e7e34' : feedback.status === 'En cours' ? '#e65100' : 'var(--muted)'
                    }}>
                      {feedback.status}
                    </span>
                  </div>
                  <p style={{
                    fontSize:14,
                    color:'var(--muted)',
                    margin:'0 0 8px',
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap'
                  }}>
                    {feedback.preview}
                  </p>
                  <div style={{fontSize:13, color:'var(--muted)'}}>
                    {feedback.date}
                  </div>
                </div>

                {/* Flèche */}
                <div style={{
                  fontSize:18,
                  color:'var(--muted)',
                  flexShrink:0
                }}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal simple pour nouveau feedback */}
      {showModal && (
        <div style={{
          position:'fixed',
          top:0,
          left:0,
          right:0,
          bottom:0,
          background:'rgba(0,0,0,0.5)',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          zIndex:1000
        }} onClick={() => setShowModal(false)}>
          <div className="card" style={{
            maxWidth:600,
            width:'90%',
            padding:'32px',
            maxHeight:'90vh',
            overflow:'auto'
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{fontSize:24, margin:'0 0 24px', fontWeight:600}}>Nouveau feedback</h2>
            
            <div style={{marginBottom:20}}>
              <label style={{display:'block', fontSize:14, marginBottom:8, fontWeight:500, color:'var(--text)'}}>Catégorie</label>
              <select className="card" style={{
                width:'100%',
                padding:'12px',
                fontSize:14,
                border:'1px solid var(--border)',
                borderRadius:8,
                background:'var(--bg)',
                color:'var(--text)'
              }}>
                <option>Locaux/Matériel</option>
                <option>Équilibre vie pro/perso</option>
                <option>Reconnaissance</option>
                <option>Relations/Ambiance</option>
                <option>Charge/Rythme</option>
                <option>Organisation/Clarté</option>
              </select>
            </div>

            <div style={{marginBottom:24}}>
              <label style={{display:'block', fontSize:14, marginBottom:8, fontWeight:500, color:'var(--text)'}}>Ton message</label>
              <textarea className="card" style={{
                width:'100%',
                minHeight:150,
                padding:'12px',
                fontSize:14,
                border:'1px solid var(--border)',
                borderRadius:8,
                background:'var(--bg)',
                color:'var(--text)',
                resize:'vertical',
                fontFamily:'inherit'
              }} placeholder="Partage ton feedback de manière constructive..."/>
            </div>

            <div style={{display:'flex', gap:12, justifyContent:'flex-end'}}>
              <button className="btn" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn primary" onClick={() => setShowModal(false)}>Envoyer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
