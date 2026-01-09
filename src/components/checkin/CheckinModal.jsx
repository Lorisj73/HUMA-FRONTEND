import { useState } from 'react'
import Modal from '@/components/Modal'

export default function CheckinModal({ open, onClose, onDone }){
  const [step, setStep] = useState(1)

  const handleClose = () => {
    setStep(1)
    onClose?.()
  }

  return (
    <Modal open={open} onClose={handleClose} width={640}>
      <div className="step">
        <h3 className="step-title">Check-in en construction</h3>
        <p className="step-sub">Le nouveau check-in sera bientôt disponible</p>
        <div className="modal-actions">
          <button className="btn primary" onClick={handleClose}>Fermer</button>
        </div>
      </div>
    </Modal>
  )
}
