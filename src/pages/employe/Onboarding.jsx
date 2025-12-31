import { useState } from 'react'

export default function Onboarding({ onNavigate }) {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleComplete = () => {
    if (onNavigate) onNavigate('Accueil')
  }

  return (
    <div className="container">
      <h2 style={{margin:'4px 0 8px'}}>Bienvenue chez HUMA</h2>
      <div style={{color:'var(--muted)', fontSize:14}}>Étape {step} sur {totalSteps}</div>
      <div className="progress">
        <div className="bar" style={{width:`${(step / totalSteps) * 100}%`}}></div>
        <div className="dot"></div>
      </div>

      <div className="card large" style={{marginTop:12}}>
        {step === 1 && (
          <div className="card panel">
            <h3>Découvre HUMA</h3>
            <p className="muted">
              HUMA est ta plateforme de bien‑être au travail. Elle te permet de partager ton humeur quotidienne, 
              recevoir des conseils personnalisés et contribuer au bien‑être collectif de ton équipe.
            </p>
            <div style={{marginTop:16}}>
              <ul style={{color:'var(--muted)', paddingLeft:20}}>
                <li>Check‑in quotidien anonyme et confidentiel</li>
                <li>Conseils personnalisés basés sur ton ressenti</li>
                <li>Baromètre QVT de ton équipe</li>
                <li>Boîte à idées collaborative</li>
              </ul>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card panel">
            <h3>Ton premier check‑in</h3>
            <p className="muted">
              Chaque jour, prends quelques secondes pour partager ton humeur. C'est simple, rapide et totalement anonyme.
            </p>
            <div style={{marginTop:16}}>
              <div className="empty-illustration"/>
              <div style={{textAlign:'center', marginTop:12}}>
                <p className="muted">
                  Tu débloqueras ton conseil du jour et contribueras au baromètre de bien‑être de l'équipe.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card panel">
            <h3>Prêt à commencer ?</h3>
            <p className="muted">
              Tu es maintenant prêt à utiliser HUMA ! Commence par faire ton premier check‑in pour découvrir 
              toutes les fonctionnalités de la plateforme.
            </p>
            <div style={{marginTop:16, textAlign:'center'}}>
              <div style={{fontSize:40, marginBottom:16}}>🎉</div>
              <p className="muted">
                N'hésite pas à explorer les sections <strong>Moi</strong> et <strong>Nous</strong> pour 
                suivre ton évolution et celle de ton équipe.
              </p>
            </div>
          </div>
        )}

        <div style={{display:'flex', justifyContent:'space-between', marginTop:16}}>
          <button 
            className="btn" 
            onClick={handlePrev}
            disabled={step === 1}
            style={{opacity: step === 1 ? 0.5 : 1}}
          >
            ← Précédent
          </button>
          {step < totalSteps ? (
            <button className="btn primary" onClick={handleNext}>
              Suivant →
            </button>
          ) : (
            <button className="btn primary" onClick={handleComplete}>
              Terminer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
