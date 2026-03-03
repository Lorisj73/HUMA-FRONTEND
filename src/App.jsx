import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Me from './pages/Me'
import Nous from './pages/employé/Team'
import OnboardingEmployee from './pages/employé/Onboarding'

// Pages Employé
import HomeEmployee from './pages/employé/HomeEmployee'
import MeEmployee from './pages/employé/MeEmployee'
import TeamEmployee from './pages/employé/Team'
import FeedbacksEmployee from './pages/employé/FeedbacksEmployee'
import CategoryDetail from './pages/employé/CategoryDetail'

// Pages Manager
import HomeManager from './pages/employeur/HomeManager'
import MeManager from './pages/employeur/MeManager'
import TeamManager from './pages/employeur/TeamManager'
import FeedbacksManager from './pages/employeur/FeedbacksManager'
import CategoryDetailManager from './pages/employeur/CategoryDetailManager'

import Checkin from './pages/employé/Checkin'
import CheckinStep2 from './pages/employé/CheckinStep2'
import CheckinStep3 from './pages/employé/CheckinStep3'

// Composant Layout pour gérer la navbar et la logique onboarding
function AppLayout() {
  const navigate = useNavigate()
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Vérifier si l'onboarding a déjà été complété
    const onboardingDone = localStorage.getItem('huma_onboarding_done')
    const hasToken = localStorage.getItem('huma_auth_token')
    // Afficher l'onboarding seulement si pas encore complété ET pas de token
    return !(onboardingDone === '1' && hasToken)
  })
  const [isManager, setIsManager] = useState(false)

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

  // Pages à afficher selon le rôle
  const HomePage = isManager ? HomeManager : HomeEmployee
  const MePage = isManager ? MeManager : MeEmployee
  const TeamPage = isManager ? TeamManager : TeamEmployee
  const FeedbacksPage = isManager ? FeedbacksManager : FeedbacksEmployee
  const CategoryPage = isManager ? CategoryDetailManager : CategoryDetail

  return (
    <>
      <Header />
      <div style={{ paddingTop: 88 }}>
        <Routes>
          {/* Routes du flux check-in */}
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/checkin/step2" element={<CheckinStep2 />} />
          <Route path="/checkin/step3" element={<CheckinStep3 />} />

          {/* Routes principales */}
          <Route path="/" element={<HomePage />} />
          <Route path="/accueil" element={<Navigate to="/" replace />} />
          <Route path="/moi" element={<MePage />} />
          <Route path="/nous" element={<TeamPage />} />
          <Route path="/mon-equipe" element={<TeamPage />} />
          <Route path="/feedbacks" element={<FeedbacksPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />

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
      <AppLayout />
    </Router>
  )
}
