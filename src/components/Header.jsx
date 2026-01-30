import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  
  const getActiveTab = (path) => {
    if (path === '/' || path === '/accueil') return 'Accueil'
    if (path === '/moi') return 'Moi'
    if (path === '/nous' || path === '/mon-equipe') return 'Mon équipe'
    if (path === '/feedbacks' || path.startsWith('/category')) return 'Feedbacks'
    return ''
  }
  
  const currentTab = getActiveTab(location.pathname)
  
  return (
    <header style={{
      position: 'fixed',
      top: 16,
      left: '5%',
      right: '5%',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      pointerEvents: 'none'
    }}>
      {/* Partie gauche - Logo et navigation */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 64,
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        pointerEvents: 'auto'
      }}>
        <div style={{ fontSize: 20, fontWeight: 800 }}>HUMA</div>
        <nav style={{ display: 'flex', gap: 24 }}>
          <Link to="/" style={{ 
            color: currentTab === 'Accueil' ? '#1E1E1E' : '#64748b', 
            textDecoration: 'none',
            fontWeight: currentTab === 'Accueil' ? 600 : 400,
            fontSize: 15
          }}>Accueil</Link>
          <Link to="/moi" style={{ 
            color: currentTab === 'Moi' ? '#1E1E1E' : '#64748b', 
            textDecoration: 'none',
            fontWeight: currentTab === 'Moi' ? 600 : 400,
            fontSize: 15
          }}>Moi</Link>
          <Link to="/mon-equipe" style={{ 
            color: currentTab === 'Mon équipe' ? '#1E1E1E' : '#64748b', 
            textDecoration: 'none',
            fontWeight: currentTab === 'Mon équipe' ? 600 : 400,
            fontSize: 15
          }}>Mon équipe</Link>
          <Link to="/feedbacks" style={{ 
            color: currentTab === 'Feedbacks' ? '#1E1E1E' : '#64748b', 
            textDecoration: 'none',
            fontWeight: currentTab === 'Feedbacks' ? 600 : 400,
            fontSize: 15
          }}>Feedbacks</Link>
        </nav>
      </div>

      {/* Partie droite - Actions */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 64,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        pointerEvents: 'auto'
      }}>
        {/* Icône message */}
        <button style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>

        {/* Icône soleil/mode */}
        <button style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>

        {/* Icône notification */}
        <button style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>

        {/* Avatar */}
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#1E1E1E',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 600,
          marginLeft: 4
        }}>
          CM
        </div>
      </div>
    </header>
  )
}
