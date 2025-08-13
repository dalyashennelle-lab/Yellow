import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
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
    name: 'Dr. Sarah Chen',
    id: 'user_001',
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

  // Show clinical landing on first visit
  if (showClinicalLanding) {
    return (
      <div className="clinical-app">
        <ClinicalLanding />
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
        <Navigation user={user} />
        <main className="main-content">
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
      </div>
    </Router>
  )
}

export default App
