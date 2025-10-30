import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, width = 560 }){
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" style={{ maxWidth: width }} onClick={(e)=>e.stopPropagation()}>
        {title && <div className="modal-header"><h3>{title}</h3><button className="modal-close" onClick={onClose}>×</button></div>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
