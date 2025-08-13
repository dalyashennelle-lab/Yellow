import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import DailyCheckin from './pages/DailyCheckin'
import BrainGames from './pages/BrainGames'
import Mindfulness from './pages/Mindfulness'
import EEGAnalysis from './pages/EEGAnalysis'
import Progress from './pages/Progress'
import Settings from './pages/Settings'

function App() {
  const [user, setUser] = useState({
    name: 'Alex Chen',
    id: 'user_001',
    streak: 28,
    memberSince: '2023-06-15'
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
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
