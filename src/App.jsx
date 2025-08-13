import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import AdvancedNavigation from './components/AdvancedNavigation'
import SplashScreen from './components/SplashScreen'
import ClinicalLanding from './pages/ClinicalLanding'
import Dashboard from './pages/Dashboard'
import DailyCheckin from './pages/DailyCheckin'
import BrainGames from './pages/BrainGames'
import Mindfulness from './pages/Mindfulness'
import EEGAnalysis from './pages/EEGAnalysis'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import AdvancedNeuroscienceHub from './pages/AdvancedNeuroscienceHub'

function App() {
  const [user, setUser] = useState({
    name: 'Sarah Chen',
    id: 'user_001',
    email: 'senushidinara2005@gmail.com',
    streak: 28,
    memberSince: '2023-06-15',
    role: 'Clinical Psychologist'
  })

  const [cognitiveData, setCognitiveData] = useState({
    memoryHealth: 87,
    focusLevel: 80,
    cognitiveLoad: 44,
    stressLevel: 74,
    emotionDetect: 82,
    neuroplasticity: 85,
    avgSleep: 6.8,
    heartRate: 72
  })

  const [showClinicalLanding, setShowClinicalLanding] = useState(true)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const [useAdvancedNav, setUseAdvancedNav] = useState(true)

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setCognitiveData(prev => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
        cognitiveLoad: Math.max(0, Math.min(100, prev.cognitiveLoad + (Math.random() - 0.5) * 6)),
        emotionDetect: Math.max(0, Math.min(100, prev.emotionDetect + (Math.random() - 0.5) * 3))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Show splash screen on first load
  if (showSplashScreen) {
    return (
      <SplashScreen
        onFinish={() => setShowSplashScreen(false)}
      />
    )
  }

  // Show clinical landing on first visit (after splash)
  if (showClinicalLanding) {
    const handleNavigate = (path) => {
      // Store the intended path and transition to main app
      sessionStorage.setItem('intendedPath', path)
      setShowClinicalLanding(false)
    }

    return (
      <div className="clinical-app">
        <ClinicalLanding onNavigate={handleNavigate} />
        <div className="enter-app">
          <button
            className="btn btn-primary"
            onClick={() => setShowClinicalLanding(false)}
          >
            Enter NeuroMind Pro
          </button>
        </div>

        <style jsx>{`
          .clinical-app {
            position: relative;
          }

          .enter-app {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
          }

          .enter-app .btn {
            padding: 16px 32px;
            font-size: 1.125rem;
            border-radius: 30px;
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
          }

          .enter-app .btn:hover {
            box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
            transform: translateY(-3px);
          }
        `}</style>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        {useAdvancedNav ? (
          <AdvancedNavigation user={user} />
        ) : (
          <Navigation user={user} />
        )}

        <main className={useAdvancedNav ? "main-content-advanced" : "main-content"}>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  user={user}
                  cognitiveData={cognitiveData}
                  setCognitiveData={setCognitiveData}
                />
              }
            />
            <Route path="/checkin" element={<DailyCheckin user={user} />} />
            <Route path="/games" element={<BrainGames user={user} />} />
            <Route path="/mindfulness" element={<Mindfulness user={user} />} />
            <Route path="/eeg" element={<EEGAnalysis user={user} cognitiveData={cognitiveData} />} />
            <Route path="/progress" element={<Progress user={user} />} />
            <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
            <Route path="/clinical" element={<ClinicalLanding />} />
            <Route path="/advanced" element={<AdvancedNeuroscienceHub user={user} />} />
          </Routes>
        </main>

        {/* Advanced Navigation Toggle */}
        <div className="nav-toggle">
          <button
            className="toggle-btn"
            onClick={() => setUseAdvancedNav(!useAdvancedNav)}
            title={useAdvancedNav ? "Switch to Classic Navigation" : "Switch to Advanced Navigation"}
          >
            {useAdvancedNav ? "Classic" : "3D"}
          </button>
        </div>

        <style jsx>{`
          .main-content-advanced {
            width: 100%;
            min-height: 100vh;
            background: radial-gradient(ellipse at top, #0a0a0a 0%, #000000 70%);
            position: relative;
          }

          .nav-toggle {
            position: fixed;
            bottom: 30px;
            left: 30px;
            z-index: 9999;
          }

          .toggle-btn {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .toggle-btn:hover {
            background: rgba(0, 212, 255, 0.2);
            border-color: rgba(0, 212, 255, 0.5);
            transform: scale(1.05);
          }
        `}</style>
      </div>
    </Router>
  )
}

export default App
