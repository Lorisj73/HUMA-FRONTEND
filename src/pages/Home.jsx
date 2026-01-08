import Card from '@/components/Card'
import CheckinModal from '@/components/checkin/CheckinModal'

import { useState } from 'react'

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="container">
        <h2 style={{ margin: '4px 0 8px' }}>Bonjour, Petit Poucet!</h2>
        <div style={{ color: 'var(--muted)', fontSize: 14 }}>12 personnes ont répondu aujourd’hui</div>
        <div className="progress">
          <div className="bar" style={{ width: '36%' }}></div>
          <div className="dot"></div>
        </div>

        <div className="grid two" style={{ marginTop: 12 }}>
          {/* Left: Ton humeur du jour */}
          <div className="card large">
            <div className="subtle">Ton humeur du jour</div>
            <div className="card panel">
              <div className="empty-illustration" />
              <h3>Tu n’as pas encore fait ton check‑in</h3>
              <p className="muted">Partage ton humeur du jour pour débloquer ton conseil personnalisé et contribuer au bien‑être collectif</p>
              <div className="mini muted">Anonyme et confidentiel</div>
              <div style={{ marginTop: 12 }}>
                <button className="btn primary" onClick={() => setOpen(true)}>Faire mon check‑in</button>
              </div>
            </div>
          </div>

          {/* Right: Ton conseil du jour (verrouillé) */}
          <div className="card large">
            <div className="subtle">Ton conseil du jour</div>
            <div className="card panel lock">
              <div className="lock-icon">🔒</div>
              <h3>Gérer une journée chargée</h3>
              <p className="muted">Fais ton check‑in pour débloquer ton conseil personnalisé</p>
              <button className="btn">Lire le conseil complet</button>
            </div>
          </div>
        </div>

        {/* Idea share */}
        <div className="card idea">
          <div className="muted">Une idée, envie de la partager ? <span className="mini">Contribue à améliorer le bien‑être de tous</span></div>
          <button className="btn icon">💬</button>
        </div>

        {/* Bottom cards row */}
        <div className="grid two" style={{ marginTop: 12 }}>
          <div className="card large">
            <div className="subtle">L’humeur globale aujourd’hui</div>
            <div className="card panel lock">
              <div className="lock-icon">🔒</div>
              <p className="muted">Fais ton check‑in pour voir l’humeur globale</p>
            </div>
          </div>
          <div className="card large">
            <div className="subtle">Le baromètre QVT à l’instant T</div>
            <div className="card panel lock">
              <div className="lock-icon">🔒</div>
              <p className="muted">Plus que 2 check‑ins pour débloquer le baromètre complet !</p>
              <button className="btn primary" onClick={() => setOpen(true)}>Faire mon check‑in</button>
            </div>
          </div>
        </div>
      </div>
      <CheckinModal open={open} onClose={() => setOpen(false)} onDone={() => { }} />
    </div>
  )
}
