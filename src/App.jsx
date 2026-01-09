import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Me from './pages/Me'
import Nous from './pages/Nous'
import OnboardingEmployee from './pages/employé/Onboarding'
import HomeEmployeeLocked from './pages/employé/HomeEmployeeLocked'
import HomeEmployeeUnlocked from './pages/employé/HomeEmployeeUnlocked'
import MeEmployee from './pages/employé/MeEmployee'
import FeedbacksEmployee from './pages/employé/FeedbacksEmployee'
import Checkin from './pages/employé/Checkin'
import CheckinStep2 from './pages/employé/CheckinStep2'
import CheckinStep3 from './pages/employé/CheckinStep3'

export default function App() {
  const [page, setPage] = useState('Accueil')
  // Pour les tests: l'onboarding se réaffiche à chaque actualisation
  const [showOnboarding, setShowOnboarding] = useState(true)

  return (
    <div>
      {showOnboarding ? (
        <OnboardingEmployee onDone={()=> setShowOnboarding(false)} />
      ) : (
        <>
          <Navbar current={page} onNavigate={setPage} />
          {page === 'Checkin' && <Checkin onNavigate={setPage} />}
          {page === 'CheckinStep2' && <CheckinStep2 onNavigate={setPage} onBack={() => setPage('Checkin')} />}
          {page === 'CheckinStep3' && <CheckinStep3 onNavigate={setPage} onBack={() => setPage('CheckinStep2')} />}
          {page === 'Accueil' && <HomeEmployeeLocked onNavigate={setPage} />}
          {page === 'HomeUnlocked' && <HomeEmployeeUnlocked onNavigate={setPage} />}
          {page === 'Moi' && <MeEmployee />}
          {page === 'Nous' && <Nous />}
          {page === 'Mon équipe' && <Nous />}
          {page === 'Feedbacks' && <FeedbacksEmployee />}
          {page !== 'Checkin' && page !== 'CheckinStep2' && page !== 'CheckinStep3' && page !== 'Accueil' && page !== 'HomeUnlocked' && page !== 'Moi' && page !== 'Nous' && page !== 'Mon équipe' && page !== 'Feedbacks' && (
            <div className="container" style={{paddingTop:24}}>
              <div className="card"><div className="subtle">Cette section est en préparation.</div></div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
