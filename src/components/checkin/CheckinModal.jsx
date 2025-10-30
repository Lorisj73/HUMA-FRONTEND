import { useMemo, useState } from 'react'
import Modal from '@/components/Modal'

const MOOD_LABELS = {
  1: 'Très bas', 2:'Bas', 3:'Plutôt bas', 4:'Faible', 5:'Neutre', 6:'Plutôt bien', 7:'Bien', 8:'Très bien', 9:'Excellent', 10:'Au top'
}

const FEELINGS = [
  'Content', 'Stressé', 'Motivé', 'Fatigué', 'Inspiré',
  'Anxieux', 'Confiant', 'Dépassé', 'Serein', 'Frustré',
  'Énergique', 'Calme', 'Créatif', 'Épuisé', 'Optimiste',
  'Inquiet', 'Concentré', 'Dispersé'
]

// Generate a stable gradient (red -> blue) per label so each chip looks unique
function hash(str){
  let h = 0
  for (let i=0;i<str.length;i++) h = (h<<5)-h + str.charCodeAt(i)
  return Math.abs(h)
}
function gradientFor(label){
  const h = hash(label)
  // angle from 120-240deg
  const angle = 120 + (h % 120)
  // vary mid stop position 30-70%
  const mid = 30 + (h % 41)
  // base colors
  const red = 'rgba(239,68,68,0.96)'     // tailwind red-500
  const blue = 'rgba(59,130,246,0.96)'   // tailwind blue-500
  // optional soft blend in the middle towards purple-ish
  const midCol = 'rgba(147,51,234,0.72)' // violet-600
  return `linear-gradient(${angle}deg, ${red} 0%, ${midCol} ${mid}%, ${blue} 100%)`
}

function Range({ value, onChange }){
  return (
    <div className="range">
      <input type="range" min={1} max={10} value={value}
        onChange={e=>onChange(Number(e.target.value))}
      />
      <div className="range-scale">
        <span>1</span><span>5</span><span>10</span>
      </div>
    </div>
  )
}

export default function CheckinModal({ open, onClose, onDone }){
  const [step, setStep] = useState(1)
  const [score, setScore] = useState(5)
  const [anon, setAnon] = useState(true)
  const [tags, setTags] = useState([])

  const mood = useMemo(()=> MOOD_LABELS[score] || 'Neutre', [score])
  const canNext1 = true
  const canNext2 = tags.length > 0

  const reset = () => { setStep(1); setScore(5); setTags([]); setAnon(true) }
  const handleClose = () => { reset(); onClose?.() }

  const toggleTag = (t) => {
    setTags(prev => prev.includes(t)
      ? prev.filter(x=>x!==t)
      : (prev.length < 2 ? [...prev, t] : prev)
    )
  }

  const finish = () => {
    const payload = { score, mood, tags, anonymous: anon, date: new Date().toISOString() }
    onDone?.(payload)
    setStep(3)
  }

  return (
    <Modal open={open} onClose={handleClose} width={640}>
      {step === 1 && (
        <div className="step">
          <h3 className="step-title">Comment te sens-tu aujourd’hui ?</h3>
          <p className="step-sub">Déplace le curseur pour indiquer ton humeur du moment</p>
          <div className="mood-readout">
            <div className="mood-score">{score}/10</div>
            <div className="mood-label">{mood}</div>
          </div>
          <Range value={score} onChange={setScore} />
          <label className="checkbox">
            <input type="checkbox" checked={anon} onChange={e=>setAnon(e.target.checked)} />
            Tes réponses sont 100% anonymes et confidentielles
          </label>
          <div className="modal-actions">
            <button className="btn primary" onClick={()=>setStep(2)} disabled={!canNext1}>Continuer</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <h3 className="step-title">Choisis 2 mots qui décrivent ton ressenti</h3>
          <p className="step-sub">Sélectionne les émotions qui te correspondent le mieux</p>
          <div className="chips big">
            {FEELINGS.map((f)=> {
              const active = tags.includes(f)
              const style = active ? { background: gradientFor(f), color:'#fff', borderColor:'transparent' } : undefined
              return (
                <button key={f} className={"chip selectable" + (active?' active':'')} onClick={()=>toggleTag(f)} style={style}>{f}</button>
              )
            })}
          </div>
          <div style={{textAlign:'center', color:'var(--muted)', marginTop:8}}>{tags.length}/2 sélectionnés</div>
          <div className="modal-actions">
            <button className="btn" onClick={()=>setStep(1)}>Retour</button>
            <button className="btn primary" onClick={finish} disabled={!canNext2}>Continuer</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step">
          <div className="success-icon">✓</div>
          <h3 className="step-title">Merci pour ton partage !</h3>
          <p className="step-sub">En partageant ton ressenti, tu contribues au bien-être de ton équipe.</p>
          <div className="summary card-like">
            <div><strong>Humeur :</strong> {score}/10 ({mood})</div>
            <div><strong>Ressentis :</strong> {tags.join(', ') || '—'}</div>
            <div style={{fontSize:12, color:'var(--muted)'}}>Tes données restent anonymes et sont agrégées aux statistiques globales</div>
          </div>
          <div className="modal-actions">
            <button className="btn" onClick={handleClose}>Fermer</button>
            <button className="btn primary" onClick={handleClose}>Découvrir mon conseil du jour</button>
          </div>
        </div>
      )}
    </Modal>
  )
}
