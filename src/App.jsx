import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Me from './pages/Me'
import Nous from './pages/Nous'

export default function App() {
  const getInitial = () => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefers ? 'dark' : 'light'
  }

  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  const [page, setPage] = useState('Accueil')

  return (
    <div>
      <Navbar theme={theme} onToggleTheme={toggleTheme} current={page} onNavigate={setPage} />
      {page === 'Accueil' && <Home theme={theme} />}
      {page === 'Moi' && <Me />}
      {page === 'Nous' && <Nous />}
      {page !== 'Accueil' && page !== 'Moi' && page !== 'Nous' && (
        <div className="container" style={{paddingTop:24}}>
          <div className="card"><div className="subtle">Cette section est en préparation.</div></div>
        </div>
      )}
    </div>
  )
}
