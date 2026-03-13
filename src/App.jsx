import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import HumaBackground from './components/HumaBackground'
import OnboardingEmployee from './pages/employé/Onboarding'

// Pages unifiées (supportent employé et manager)
import HomeEmployee from './pages/employé/HomeEmployee'
import MeEmployee from './pages/employé/MeEmployee'
import TeamEmployee from './pages/employé/Team'
import FeedbacksEmployee from './pages/employé/FeedbacksEmployee'
import CategoryDetail from './pages/employé/CategoryDetail'

import Checkin from './pages/employé/Checkin'
import CheckinStep2 from './pages/employé/CheckinStep2'
import CheckinStep3 from './pages/employé/CheckinStep3'

// Composant Layout pour gérer la navbar et la logique onboarding
function AppLayout() {
  const navigate = useNavigate()
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Ne pas afficher l'onboarding si déjà complété
    const onboardingDone = localStorage.getItem('huma_onboarding_done')
    const hasToken = localStorage.getItem('huma_auth_token')
    // Ne montrer l'onboarding que si pas de token OU onboarding pas fait
    return !hasToken || onboardingDone !== '1'
  })
  const [isManager, setIsManager] = useState(() => {
    return localStorage.getItem('huma_is_manager') === '1'
  })

  useEffect(() => {
    const managerStatus = localStorage.getItem('huma_is_manager')
    setIsManager(managerStatus === '1')
  }, [showOnboarding])

  if (showOnboarding) {
    return <OnboardingEmployee onDone={() => {
      setShowOnboarding(false)
      const managerStatus = localStorage.getItem('huma_is_manager')
      setIsManager(managerStatus === '1')
      navigate('/')
    }} />
  }

  return (
    <>
      <Header />
      <div style={{ paddingTop: 88 }}>
        <Routes>
          {/* Routes du flux check-in */}
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/checkin/step2" element={<CheckinStep2 />} />
          <Route path="/checkin/step3" element={<CheckinStep3 />} />

          {/* Routes principales - Les pages détectent automatiquement si manager */}
          <Route path="/" element={<HomeEmployee />} />
          <Route path="/accueil" element={<Navigate to="/" replace />} />
          <Route path="/moi" element={<MeEmployee />} />
          <Route path="/nous" element={<TeamEmployee />} />
          <Route path="/mon-equipe" element={<TeamEmployee />} />
          <Route path="/feedbacks" element={<FeedbacksEmployee />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />

          {/* Route 404 */}
          <Route path="*" element={
            <div className="container" style={{paddingTop:24}}>
              <div className="card"><div className="subtle">Cette section est en préparation.</div></div>
            </div>
          } />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <HumaBackground />
      <AppLayout />
    </Router>
  )
}
