import { useState, useEffect } from 'react'

export default function Navbar({ current='Accueil', onNavigate }){
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="navbar">
      <div className="container navbar-inner" style={{justifyContent:'space-between', maxWidth: 1400}}>
        <div style={{display:'flex', alignItems:'center', gap: isMobile ? 12 : 40, flex: 1}}>
          <div className="brand" style={{fontSize: 20, fontWeight: 800}}>HUMA</div>
          
          {isMobile ? (
            <>
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  marginLeft: 'auto',
                  width: 40,
                  height: 40,
                  background: 'white',
                  border: '1px solid #D9D9D9',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(12,12,13,0.05)'
                }}
              >
                <div style={{width: 20, height: 2, background: '#1E1E1E', borderRadius: 2}}></div>
                <div style={{width: 20, height: 2, background: '#1E1E1E', borderRadius: 2}}></div>
                <div style={{width: 20, height: 2, background: '#1E1E1E', borderRadius: 2}}></div>
              </button>
              
              {menuOpen && (
                <div style={{
                  position: 'fixed',
                  top: 60,
                  left: 0,
                  right: 0,
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}>
                  {['Accueil','Moi','Mon équipe','Feedbacks'].map(tab => (
                    <button 
                      key={tab} 
                      className={"tab" + (current===tab?' active':'')} 
                      onClick={()=>{
                        onNavigate?.(tab)
                        setMenuOpen(false)
                      }}
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        width: '100%',
                        border: 'none',
                        background: current===tab ? '#f0f0f0' : 'transparent',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '15px'
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="tabs">
              {['Accueil','Moi','Mon équipe','Feedbacks'].map(tab => (
                <button key={tab} className={"tab" + (current===tab?' active':'')} onClick={()=>onNavigate?.(tab)}>{tab}</button>
              ))}
            </div>
          )}
        </div>
        
        {/* Icônes droite */}
        {!isMobile && (
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          {/* Messages */}
          <button style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'white',
            border: '1px solid #D9D9D9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(12,12,13,0.05), 0 1px 2px rgba(12,12,13,0.1)',
            transition: 'transform 0.2s'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.4 12.8502C20.4 18.3302 15.95 22.7802 10.46 22.7802C9.26 22.7802 8.12 22.5702 7.05 22.1802H7.04L-0.33 23.7402L0.37 18.0202L0.88 15.4602C0.65 14.6302 0.53 13.7602 0.53 12.8602C0.53 7.3602 4.98 2.9102 10.46 2.9102C15.94 2.9102 20.4 7.3602 20.4 12.8502Z" stroke="#1E1E1E" strokeWidth="1.8" strokeMiterlimit="10" transform="translate(2, 1)"/>
            </svg>
          </button>
          
          {/* Theme */}
          <button style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'white',
            border: '1px solid #D9D9D9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(12,12,13,0.05), 0 1px 2px rgba(12,12,13,0.1)',
            transition: 'transform 0.2s'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1.5V3.9M12 23.1V25.5M3.52 5.016L5.21 6.708M20.79 20.292L22.48 21.984M0 13.5H2.4M21.6 13.5H24M5.21 20.292L3.52 21.984M22.48 5.016L20.79 6.708M16.8 13.5C16.8 16.151 14.65 18.3 12 18.3C9.35 18.3 7.2 16.151 7.2 13.5C7.2 10.849 9.35 8.7 12 8.7C14.65 8.7 16.8 10.849 16.8 13.5Z" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(0, -1.5)"/>
            </svg>
          </button>
          
          {/* Notifications */}
          <button style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'white',
            border: '1px solid #D9D9D9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(12,12,13,0.05), 0 1px 2px rgba(12,12,13,0.1)',
            transition: 'transform 0.2s'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.93 17.8094L12 17.8694L4.08 17.8094C1.78 17.7894 0.55 15.3394 2.06 13.7694L4.97 10.7194L5.51 10.1894V6.8294C5.51 3.4094 8.31 0.609399 11.73 0.609399C15.15 0.609399 17.95 3.4094 17.95 6.8294V9.2894C17.95 9.5094 18.04 9.7194 18.2 9.8794L19.05 10.7194L21.95 13.7694C23.45 15.3394 22.23 17.7894 19.94 17.8094H19.93Z" stroke="#1E1E1E" strokeWidth="1.58" strokeMiterlimit="10" transform="translate(0, 1.5)"/>
              <path d="M14.26 20.5293C14.26 21.8993 13.15 23.0093 11.78 23.0093C10.41 23.0093 9.3 21.8993 9.3 20.5293" stroke="#1E1E1E" strokeWidth="1.58" strokeMiterlimit="10" transform="translate(0, 1.5)"/>
            </svg>
          </button>
          
          {/* Avatar utilisateur */}
          <button style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#2C2C2C',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 600,
            transition: 'transform 0.2s'
          }}>
            CM
          </button>
        </div>
        )}
      </div>
    </nav>
  )
}
