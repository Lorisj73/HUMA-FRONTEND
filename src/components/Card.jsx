export default function Card({title, subtitle, children, actions}){
  return (
    <div className="card">
      {(title || actions) && (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <div>
            {title && <h3 style={{margin:'0 0 4px 0'}}>{title}</h3>}
            {subtitle && <div style={{color:'var(--muted)', fontSize:13}}>{subtitle}</div>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  )
}
