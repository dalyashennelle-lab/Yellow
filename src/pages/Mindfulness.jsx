import React, { useState, useEffect } from 'react'
import { 
  Brain, 
  Heart, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2,
  Settings,
  Timer,
  Headphones,
  Activity
} from 'lucide-react'

const Mindfulness = ({ user }) => {
  const [activeSession, setActiveSession] = useState(null)
  const [sessionState, setSessionState] = useState('ready') // ready, active, paused, completed
  const [sessionTime, setSessionTime] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(300) // 5 minutes
  const [breathPhase, setBreathPhase] = useState('inhale') // inhale, hold, exhale
  const [breathCount, setBreathCount] = useState(0)

  const mindfulnessSessions = [
    {
      id: 'breathing-basic',
      title: 'Guided Breathing',
      description: 'Basic breathing exercise for stress reduction and focus',
      duration: [180, 300, 600], // 3, 5, 10 minutes
      category: 'Breathing',
      difficulty: 'Beginner',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F4080802c9e7e4ec788f030b26ae627a6?format=webp&width=800',
      color: 'var(--neural-success)'
    },
    {
      id: 'cognitive-clarity',
      title: 'Cognitive Clarity',
      description: 'Mindfulness practice to enhance mental clarity and focus',
      duration: [300, 600, 900], // 5, 10, 15 minutes
      category: 'Focus',
      difficulty: 'Intermediate',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fae9beddb5cb343c1a15c83099fa4d672?format=webp&width=800',
      color: 'var(--neural-primary)'
    },
    {
      id: 'stress-relief',
      title: 'Stress Relief',
      description: 'Deep relaxation technique for stress and anxiety management',
      duration: [600, 900, 1200], // 10, 15, 20 minutes
      category: 'Relaxation',
      difficulty: 'Beginner',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F3642e63d63be43449c19c0118659c1d9?format=webp&width=800',
      color: 'var(--neural-accent)'
    },
    {
      id: 'sleep-preparation',
      title: 'Sleep Preparation',
      description: 'Evening meditation to prepare for restful sleep',
      duration: [600, 900], // 10, 15 minutes
      category: 'Sleep',
      difficulty: 'Beginner',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F2774b188f48c46b0876f9023dc429e58?format=webp&width=800',
      color: 'var(--neural-secondary)'
    }
  ]

  // Breathing cycle timer
  useEffect(() => {
    if (sessionState === 'active' && activeSession?.id === 'breathing-basic') {
      const breathCycle = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold'
          if (prev === 'hold') return 'exhale'
          return 'inhale'
        })
        
        if (breathPhase === 'exhale') {
          setBreathCount(prev => prev + 1)
        }
      }, 4000) // 4 second cycles
      
      return () => clearInterval(breathCycle)
    }
  }, [sessionState, activeSession, breathPhase])

  // Session timer
  useEffect(() => {
    if (sessionState === 'active' && sessionTime > 0) {
      const timer = setTimeout(() => {
        setSessionTime(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (sessionTime === 0 && sessionState === 'active') {
      setSessionState('completed')
    }
  }, [sessionState, sessionTime])

  const startSession = (session, duration) => {
    setActiveSession(session)
    setSelectedDuration(duration)
    setSessionTime(duration)
    setSessionState('active')
    setBreathCount(0)
    setBreathPhase('inhale')
  }

  const pauseSession = () => {
    setSessionState('paused')
  }

  const resumeSession = () => {
    setSessionState('active')
  }

  const resetSession = () => {
    setSessionState('ready')
    setActiveSession(null)
    setSessionTime(0)
    setBreathCount(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getBreathInstruction = () => {
    switch (breathPhase) {
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      default: return 'Breathe'
    }
  }

  if (activeSession) {
    return (
      <div className="mindfulness active-session">
        {/* Session Header */}
        <div className="session-header">
          <div className="session-info">
            <h1 className="session-title">{activeSession.title}</h1>
            <div className="session-meta">
              <span className="session-category" style={{ background: activeSession.color }}>
                {activeSession.category}
              </span>
              <span className="session-difficulty">{activeSession.difficulty}</span>
            </div>
          </div>
          
          <div className="session-controls">
            <div className="session-stats">
              <div className="stat">
                <Timer size={16} />
                <span>{formatTime(sessionTime)}</span>
              </div>
              {activeSession.id === 'breathing-basic' && (
                <div className="stat">
                  <Activity size={16} />
                  <span>{breathCount} breaths</span>
                </div>
              )}
            </div>
            
            <div className="control-buttons">
              {sessionState === 'active' ? (
                <button className="btn btn-secondary" onClick={pauseSession}>
                  <Pause size={16} />
                  Pause
                </button>
              ) : sessionState === 'paused' ? (
                <button className="btn btn-primary" onClick={resumeSession}>
                  <Play size={16} />
                  Resume
                </button>
              ) : null}
              
              <button className="btn btn-ghost" onClick={resetSession}>
                <RotateCcw size={16} />
                End Session
              </button>
            </div>
          </div>
        </div>

        {/* Session Area */}
        <div className="session-area">
          {activeSession.id === 'breathing-basic' && (
            <div className="breathing-session">
              <div className="breathing-visual">
                <div className={`breath-circle ${breathPhase}`}>
                  <div className="breath-center">
                    <h3 className="breath-instruction">{getBreathInstruction()}</h3>
                    <p className="breath-count">{breathCount} cycles</p>
                  </div>
                </div>
              </div>
              
              <div className="breathing-guidance">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F4080802c9e7e4ec788f030b26ae627a6?format=webp&width=800"
                  alt="Breathing Guidance"
                  className="guidance-image"
                />
              </div>
            </div>
          )}
          
          {sessionState === 'completed' && (
            <div className="session-complete">
              <h3>Session Complete! 🌟</h3>
              <p>You've completed a {formatTime(selectedDuration)} mindfulness session</p>
              <div className="completion-stats">
                {activeSession.id === 'breathing-basic' && (
                  <div className="stat-item">
                    <span className="stat-label">Breathing Cycles</span>
                    <span className="stat-value">{breathCount}</span>
                  </div>
                )}
                <div className="stat-item">
                  <span className="stat-label">Session Duration</span>
                  <span className="stat-value">{formatTime(selectedDuration)}</span>
                </div>
              </div>
              <button className="btn btn-primary" onClick={resetSession}>
                Start New Session
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
          .active-session {
            padding: 80px 24px 24px;
            min-height: 100vh;
            max-width: 1000px;
            margin: 0 auto;
          }

          .session-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
            flex-wrap: wrap;
            gap: 20px;
          }

          .session-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 12px;
          }

          .session-meta {
            display: flex;
            gap: 12px;
            align-items: center;
          }

          .session-category {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            color: white;
          }

          .session-difficulty {
            color: var(--text-secondary);
            font-size: 0.875rem;
          }

          .session-controls {
            display: flex;
            gap: 20px;
            align-items: center;
          }

          .session-stats {
            display: flex;
            gap: 16px;
          }

          .stat {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--text-primary);
            font-weight: 600;
          }

          .control-buttons {
            display: flex;
            gap: 8px;
          }

          .session-area {
            background: var(--bg-card);
            border-radius: 20px;
            padding: 40px;
            min-height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .breathing-session {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
            width: 100%;
          }

          .breathing-visual {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .breath-circle {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--neural-success), transparent);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: all 4s ease-in-out;
          }

          .breath-circle.inhale {
            transform: scale(1.2);
            background: radial-gradient(circle, var(--neural-primary), transparent);
          }

          .breath-circle.hold {
            transform: scale(1.2);
            background: radial-gradient(circle, var(--neural-warning), transparent);
          }

          .breath-circle.exhale {
            transform: scale(0.8);
            background: radial-gradient(circle, var(--neural-success), transparent);
          }

          .breath-center {
            text-align: center;
            background: var(--bg-card);
            border-radius: 50%;
            width: 200px;
            height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(255, 255, 255, 0.2);
          }

          .breath-instruction {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
          }

          .breath-count {
            color: var(--text-secondary);
            font-size: 0.875rem;
          }

          .guidance-image {
            width: 100%;
            border-radius: 16px;
            box-shadow: var(--shadow-glow);
          }

          .session-complete {
            text-align: center;
            background: var(--bg-glass);
            padding: 60px 40px;
            border-radius: 20px;
            border: 1px solid var(--border-glow);
          }

          .session-complete h3 {
            font-size: 2rem;
            color: var(--neural-success);
            margin-bottom: 16px;
          }

          .session-complete p {
            color: var(--text-secondary);
            margin-bottom: 32px;
            font-size: 1.125rem;
          }

          .completion-stats {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 32px;
          }

          .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }

          .stat-label {
            font-size: 0.875rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--neural-primary);
          }

          @media (max-width: 768px) {
            .session-header {
              flex-direction: column;
              align-items: stretch;
            }

            .session-controls {
              justify-content: space-between;
            }

            .breathing-session {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .breath-circle {
              width: 250px;
              height: 250px;
            }

            .breath-center {
              width: 160px;
              height: 160px;
            }

            .completion-stats {
              flex-direction: column;
              gap: 20px;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="mindfulness">
      <div className="page-header">
        <h1 className="heading-xl">Mindfulness & Meditation</h1>
        <p>Clinical-grade mindfulness exercises for cognitive enhancement and stress reduction</p>
      </div>

      {/* Clinical Mindfulness Feature */}
      <div className="clinical-mindfulness">
        <div className="clinical-content">
          <h2>Clinical Mindfulness Integration</h2>
          <p>Evidence-based mindfulness practices designed for clinical environments, supporting cognitive rehabilitation and stress management protocols.</p>
          <div className="clinical-benefits">
            <div className="benefit-item">
              <Brain className="benefit-icon" />
              <span>Cognitive Enhancement</span>
            </div>
            <div className="benefit-item">
              <Heart className="benefit-icon" />
              <span>Stress Reduction</span>
            </div>
            <div className="benefit-item">
              <Activity className="benefit-icon" />
              <span>Neuroplasticity Support</span>
            </div>
          </div>
        </div>
        <div className="clinical-images">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fe5f9227c4b6b4b8ba8986d6d34e0dd97?format=webp&width=800"
            alt="Mindfulness Environment"
            className="mindfulness-img"
          />
        </div>
      </div>

      {/* Mindfulness Sessions */}
      <div className="sessions-grid grid grid-2">
        {mindfulnessSessions.map((session) => (
          <div key={session.id} className="session-card neural-card">
            <div className="session-image-container">
              <img src={session.image} alt={session.title} className="session-image" />
              <div className="session-overlay">
                <div className="session-category-badge" style={{ background: session.color }}>
                  {session.category}
                </div>
              </div>
            </div>
            
            <div className="session-content">
              <h3 className="session-title">{session.title}</h3>
              <p className="session-description">{session.description}</p>
              
              <div className="session-meta-info">
                <div className="meta-item">
                  <Brain size={16} />
                  <span>{session.difficulty}</span>
                </div>
                <div className="meta-item">
                  <Headphones size={16} />
                  <span>Guided Audio</span>
                </div>
              </div>
              
              <div className="duration-options">
                <h4>Choose Duration:</h4>
                <div className="duration-buttons">
                  {session.duration.map((duration) => (
                    <button
                      key={duration}
                      className="duration-btn"
                      onClick={() => startSession(session, duration)}
                      style={{ borderColor: session.color }}
                    >
                      {Math.floor(duration / 60)} min
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EEG Integration */}
      <div className="eeg-integration">
        <div className="integration-content">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fcabba278a7a1433ca6e7227b5c7dfef8?format=webp&width=800"
            alt="EEG Mindfulness Integration"
            className="eeg-image"
          />
          <div className="integration-text">
            <h3>EEG-Enhanced Mindfulness</h3>
            <p>Real-time brain monitoring during mindfulness sessions provides objective feedback on meditation effectiveness and cognitive state changes.</p>
            <button className="btn btn-primary">
              <Activity size={16} />
              Try EEG Session
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mindfulness {
          padding: 80px 24px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .clinical-mindfulness {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          margin: 48px 0;
          background: var(--bg-card);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid var(--border-primary);
        }

        .clinical-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--neural-success);
        }

        .clinical-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .clinical-benefits {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .benefit-icon {
          color: var(--neural-success);
        }

        .mindfulness-img {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-glow);
        }

        .sessions-grid {
          margin-bottom: 60px;
        }

        .session-card {
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .session-card:hover {
          transform: translateY(-8px);
        }

        .session-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .session-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .session-card:hover .session-image {
          transform: scale(1.05);
        }

        .session-overlay {
          position: absolute;
          top: 16px;
          right: 16px;
        }

        .session-category-badge {
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .session-content {
          padding: 24px;
        }

        .session-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .session-description {
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .session-meta-info {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .duration-options h4 {
          font-size: 0.875rem;
          color: var(--text-primary);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .duration-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .duration-btn {
          padding: 8px 16px;
          border: 2px solid;
          border-radius: 20px;
          background: transparent;
          color: var(--text-primary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .duration-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .eeg-integration {
          background: var(--bg-tertiary);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid var(--border-primary);
        }

        .integration-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .eeg-image {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-glow);
        }

        .integration-text h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--neural-primary);
        }

        .integration-text p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .clinical-mindfulness,
          .integration-content {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .duration-buttons {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default Mindfulness
