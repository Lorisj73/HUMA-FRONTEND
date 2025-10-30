export default function InfoCallout({title, description, ctaLabel}){
  return (
    <div className="card">
      <div className="info">
        <div className="icon">i</div>
        <div className="content">
          <div style={{fontWeight:600, marginBottom:6}}>{title}</div>
          {description && <div style={{color:'var(--muted)'}}>{description}</div>}
          {ctaLabel && (
            <div className="cta"><button className="btn">{ctaLabel}</button></div>
          )}
        </div>
      </div>
    </div>
  )
}
