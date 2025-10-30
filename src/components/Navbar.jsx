import ThemeToggle from './ThemeToggle'

export default function Navbar({ theme, onToggleTheme, current='Accueil', onNavigate }){
  return (
    <nav className="navbar">
      <div className="container navbar-inner" style={{justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:16}}>
          <div className="brand">HUMA</div>
          <div className="tabs">
            {['Accueil','Moi','Nous','Profil'].map(tab => (
              <button key={tab} className={"tab" + (current===tab?' active':'')} onClick={()=>onNavigate?.(tab)}>{tab}</button>
            ))}
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </nav>
  )
}
