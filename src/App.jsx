import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Me from './pages/Me'
import Nous from './pages/employé/Team'
import OnboardingEmployee from './pages/employé/Onboarding'
import HomeEmployee from './pages/employé/HomeEmployee'
import MeEmployee from './pages/employé/MeEmployee'
import FeedbacksEmployee from './pages/employé/FeedbacksEmployee'
import CategoryDetail from './pages/employé/CategoryDetail'
import Checkin from './pages/employé/Checkin'
import CheckinStep2 from './pages/employé/CheckinStep2'
import CheckinStep3 from './pages/employé/CheckinStep3'

// Composant Layout pour gérer la navbar et la logique onboarding
function AppLayout() {
  const navigate = useNavigate()
  // Pour les tests: l'onboarding se réaffiche à chaque actualisation
  const [showOnboarding, setShowOnboarding] = useState(true)

  if (showOnboarding) {
    return <OnboardingEmployee onDone={() => {
      setShowOnboarding(false)
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

          {/* Routes principales */}
          <Route path="/" element={<HomeEmployee />} />
          <Route path="/accueil" element={<Navigate to="/" replace />} />
          <Route path="/moi" element={<MeEmployee />} />
          <Route path="/nous" element={<Nous />} />
          <Route path="/mon-equipe" element={<Nous />} />
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
      <AppLayout />
    </Router>
  )
}
