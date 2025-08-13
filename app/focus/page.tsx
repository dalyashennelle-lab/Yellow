'use client';

import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';

interface FocusSession {
  id: string;
  name: string;
  duration: number;
  type: 'pomodoro' | 'deep-focus' | 'flow-state' | 'meditation-focus';
  eegTarget: string;
  description: string;
  image: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
}

interface EEGReading {
  timestamp: number;
  attention: number;
  meditation: number;
  alpha: number;
  beta: number;
  gamma: number;
  theta: number;
  delta: number;
}

export default function FocusSessionsPage() {
  const [activeFocusSession, setActiveFocusSession] = useState<FocusSession | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [targetTime, setTargetTime] = useState(25 * 60); // 25 minutes default
  const [eegReadings, setEegReadings] = useState<EEGReading[]>([]);
  const [currentEEG, setCurrentEEG] = useState<EEGReading>({
    timestamp: Date.now(),
    attention: 75,
    meditation: 68,
    alpha: 0.6,
    beta: 0.7,
    gamma: 0.4,
    theta: 0.5,
    delta: 0.3
  });
  const [focusScore, setFocusScore] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    averageAttention: 0,
    peakFocus: 0,
    focusStability: 0,
    totalSessions: 12,
    todaysSessions: 3
  });

  const timerRef = useRef<NodeJS.Timeout>();
  const eegSimulationRef = useRef<NodeJS.Timeout>();

  const focusSessions: FocusSession[] = [
    {
      id: 'pomodoro-classic',
      name: '🍅 Classic Pomodoro',
      duration: 25,
      type: 'pomodoro',
      eegTarget: 'beta',
      description: 'Traditional 25-minute focused work sessions with EEG monitoring',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F38cf611245844f23b8fdd19dd1ffd0c9?format=webp&width=800',
      difficulty: 'beginner',
      benefits: ['Improved productivity', 'Better time management', 'Enhanced concentration']
    },
    {
      id: 'deep-focus-flow',
      name: '🌊 Deep Flow State',
      duration: 60,
      type: 'flow-state',
      eegTarget: 'alpha-theta',
      description: 'Extended deep focus sessions for entering flow state with real-time EEG feedback',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F5b5b9a13616c4553bc397bf1711c88b1?format=webp&width=800',
      difficulty: 'advanced',
      benefits: ['Deep immersion', 'Creative breakthroughs', 'Enhanced problem-solving']
    },
    {
      id: 'attention-training',
      name: '🎯 Attention Training',
      duration: 15,
      type: 'meditation-focus',
      eegTarget: 'gamma',
      description: 'Short bursts of intensive attention training with biofeedback',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F3232ccfee17c42398810d697b0c1cd20?format=webp&width=800',
      difficulty: 'intermediate',
      benefits: ['Improved attention span', 'Better mental clarity', 'Reduced mind wandering']
    },
    {
      id: 'cognitive-enhancement',
      name: '🧠 Cognitive Enhancement',
      duration: 45,
      type: 'deep-focus',
      eegTarget: 'beta-gamma',
      description: 'Advanced cognitive training with multi-frequency EEG optimization',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fddd19324350d426b83d3a5afc376d2c6?format=webp&width=800',
      difficulty: 'advanced',
      benefits: ['Enhanced cognitive flexibility', 'Improved working memory', 'Better executive function']
    }
  ];

  // Simulate EEG data during sessions
  useEffect(() => {
    if (isSessionActive) {
      eegSimulationRef.current = setInterval(() => {
        const newReading: EEGReading = {
          timestamp: Date.now(),
          attention: Math.max(30, Math.min(100, currentEEG.attention + (Math.random() - 0.5) * 15)),
          meditation: Math.max(30, Math.min(100, currentEEG.meditation + (Math.random() - 0.5) * 10)),
          alpha: Math.max(0.1, Math.min(1, currentEEG.alpha + (Math.random() - 0.5) * 0.2)),
          beta: Math.max(0.1, Math.min(1, currentEEG.beta + (Math.random() - 0.5) * 0.2)),
          gamma: Math.max(0.1, Math.min(1, currentEEG.gamma + (Math.random() - 0.5) * 0.15)),
          theta: Math.max(0.1, Math.min(1, currentEEG.theta + (Math.random() - 0.5) * 0.15)),
          delta: Math.max(0.1, Math.min(1, currentEEG.delta + (Math.random() - 0.5) * 0.1))
        };

        setCurrentEEG(newReading);
        setEegReadings(prev => [...prev.slice(-50), newReading]);

        // Update focus score based on session type
        if (activeFocusSession) {
          let score = 0;
          switch (activeFocusSession.eegTarget) {
            case 'beta':
              score = newReading.beta * 100;
              break;
            case 'alpha-theta':
              score = (newReading.alpha + newReading.theta) * 50;
              break;
            case 'gamma':
              score = newReading.gamma * 100;
              break;
            case 'beta-gamma':
              score = (newReading.beta + newReading.gamma) * 50;
              break;
            default:
              score = newReading.attention;
          }
          setFocusScore(Math.round(score));
        }
      }, 2000);
    } else {
      if (eegSimulationRef.current) {
        clearInterval(eegSimulationRef.current);
      }
    }

    return () => {
      if (eegSimulationRef.current) {
        clearInterval(eegSimulationRef.current);
      }
    };
  }, [isSessionActive, activeFocusSession, currentEEG]);

  // Timer logic
  useEffect(() => {
    if (isSessionActive && sessionTime < targetTime) {
      timerRef.current = setTimeout(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else if (sessionTime >= targetTime) {
      completeSession();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSessionActive, sessionTime, targetTime]);

  const startSession = (session: FocusSession) => {
    setActiveFocusSession(session);
    setTargetTime(session.duration * 60);
    setSessionTime(0);
    setIsSessionActive(true);
    setEegReadings([]);
    setFocusScore(0);
  };

  const pauseSession = () => {
    setIsSessionActive(false);
  };

  const resumeSession = () => {
    setIsSessionActive(true);
  };

  const stopSession = () => {
    setIsSessionActive(false);
    setActiveFocusSession(null);
    setSessionTime(0);
    setEegReadings([]);
  };

  const completeSession = () => {
    setIsSessionActive(false);
    
    // Calculate session statistics
    const avgAttention = eegReadings.reduce((sum, reading) => sum + reading.attention, 0) / eegReadings.length;
    const peakFocus = Math.max(...eegReadings.map(r => r.attention));
    const attentionVariance = eegReadings.reduce((sum, reading) => 
      sum + Math.pow(reading.attention - avgAttention, 2), 0) / eegReadings.length;
    const stability = Math.max(0, 100 - Math.sqrt(attentionVariance));

    setSessionStats(prev => ({
      ...prev,
      averageAttention: Math.round(avgAttention),
      peakFocus: Math.round(peakFocus),
      focusStability: Math.round(stability),
      todaysSessions: prev.todaysSessions + 1,
      totalSessions: prev.totalSessions + 1
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return Math.min(100, (sessionTime / targetTime) * 100);
  };

  const getEEGColor = (value: number) => {
    if (value > 0.7) return '#48bb78';
    if (value > 0.4) return '#ed8936';
    return '#f56565';
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="focus" />
      
      <main className="main-content">
        <div className="focus-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">Focus Sessions</h1>
              <p className="hero-description">
                EEG-monitored focus training with real-time biofeedback and adaptive difficulty
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F917c75959c4e45179d45408aa61fd7bc?format=webp&width=800"
                alt="Focus training environment"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <div className="focus-stats-bar">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <span className="stat-value">{sessionStats.totalSessions}</span>
                <span className="stat-label">Total Sessions</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <span className="stat-value">{sessionStats.averageAttention}</span>
                <span className="stat-label">Avg Attention</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-info">
                <span className="stat-value">{sessionStats.peakFocus}</span>
                <span className="stat-label">Peak Focus</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">���</div>
              <div className="stat-info">
                <span className="stat-value">{sessionStats.todaysSessions}</span>
                <span className="stat-label">Today</span>
              </div>
            </div>
          </div>
        </div>

        {!activeFocusSession ? (
          <div className="focus-sessions-grid">
            <h2 className="section-title">Choose Your Focus Session</h2>
            <div className="sessions-grid">
              {focusSessions.map(session => (
                <div key={session.id} className="focus-session-card">
                  <div className="session-image">
                    <img src={session.image} alt={session.name} />
                    <div className="session-overlay">
                      <div className="session-duration">{session.duration} min</div>
                      <div className={`session-difficulty ${session.difficulty}`}>
                        {session.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  <div className="session-content">
                    <h3 className="session-name">{session.name}</h3>
                    <p className="session-description">{session.description}</p>
                    
                    <div className="session-meta">
                      <span className="eeg-target">EEG Target: {session.eegTarget}</span>
                      <span className="session-type">{session.type}</span>
                    </div>
                    
                    <div className="session-benefits">
                      {session.benefits.map((benefit, index) => (
                        <span key={index} className="benefit-tag">
                          {benefit}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      className="start-session-btn"
                      onClick={() => startSession(session)}
                    >
                      Start Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="active-focus-session">
            <div className="session-header">
              <h2>Active Session: {activeFocusSession.name}</h2>
              <div className="session-controls">
                {isSessionActive ? (
                  <button className="pause-btn" onClick={pauseSession}>
                    ⏸️ Pause
                  </button>
                ) : (
                  <button className="resume-btn" onClick={resumeSession}>
                    ▶️ Resume
                  </button>
                )}
                <button className="stop-btn" onClick={stopSession}>
                  ⏹️ Stop
                </button>
              </div>
            </div>

            <div className="session-interface">
              <div className="timer-section">
                <div className="timer-display">
                  <div className="time-remaining">
                    {formatTime(targetTime - sessionTime)}
                  </div>
                  <div className="time-label">remaining</div>
                </div>
                
                <div className="progress-ring">
                  <svg className="progress-svg" viewBox="0 0 100 100">
                    <circle
                      className="progress-bg"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      className="progress-fill"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#4facfe"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>

              <div className="eeg-monitoring">
                <h3>Real-time EEG Monitoring</h3>
                <div className="eeg-display">
                  <div className="eeg-metrics">
                    <div className="eeg-metric">
                      <span className="metric-label">Attention</span>
                      <div className="metric-bar">
                        <div 
                          className="metric-fill"
                          style={{ 
                            width: `${currentEEG.attention}%`,
                            backgroundColor: getEEGColor(currentEEG.attention / 100)
                          }}
                        />
                      </div>
                      <span className="metric-value">{Math.round(currentEEG.attention)}%</span>
                    </div>
                    
                    <div className="eeg-metric">
                      <span className="metric-label">Meditation</span>
                      <div className="metric-bar">
                        <div 
                          className="metric-fill"
                          style={{ 
                            width: `${currentEEG.meditation}%`,
                            backgroundColor: getEEGColor(currentEEG.meditation / 100)
                          }}
                        />
                      </div>
                      <span className="metric-value">{Math.round(currentEEG.meditation)}%</span>
                    </div>
                  </div>

                  <div className="brainwave-display">
                    <h4>Brainwave Activity</h4>
                    <div className="brainwave-bars">
                      {['alpha', 'beta', 'gamma', 'theta', 'delta'].map(wave => (
                        <div key={wave} className="brainwave-bar">
                          <span className="wave-label">{wave}</span>
                          <div className="wave-meter">
                            <div 
                              className="wave-fill"
                              style={{ 
                                height: `${currentEEG[wave as keyof EEGReading] * 100}%`,
                                backgroundColor: getEEGColor(currentEEG[wave as keyof EEGReading] as number)
                              }}
                            />
                          </div>
                          <span className="wave-value">
                            {((currentEEG[wave as keyof EEGReading] as number) * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="focus-score-display">
                  <div className="score-circle">
                    <span className="score-value">{focusScore}</span>
                    <span className="score-label">Focus Score</span>
                  </div>
                  <div className="score-feedback">
                    {focusScore > 80 && <span className="feedback excellent">🔥 Excellent Focus!</span>}
                    {focusScore > 60 && focusScore <= 80 && <span className="feedback good">✨ Good Focus</span>}
                    {focusScore > 40 && focusScore <= 60 && <span className="feedback moderate">🎯 Keep Going</span>}
                    {focusScore <= 40 && <span className="feedback low">💭 Bring Attention Back</span>}
                  </div>
                </div>
              </div>

              <div className="session-guidance">
                <h3>Session Guidance</h3>
                <div className="guidance-content">
                  <p>Target: {activeFocusSession.eegTarget} wave optimization</p>
                  <p>Focus on maintaining steady attention while the EEG monitors your brain activity.</p>
                  
                  {activeFocusSession.type === 'pomodoro' && (
                    <div className="pomodoro-guidance">
                      <p>🍅 Work intensely for the full duration</p>
                      <p>🚫 Avoid distractions and interruptions</p>
                      <p>🎯 Maintain single-pointed focus on your task</p>
                    </div>
                  )}
                  
                  {activeFocusSession.type === 'flow-state' && (
                    <div className="flow-guidance">
                      <p>🌊 Let yourself sink into deep concentration</p>
                      <p>⚡ Notice when you enter the flow state</p>
                      <p>🧘 Trust the process and stay present</p>
                    </div>
                  )}
                  
                  {activeFocusSession.type === 'meditation-focus' && (
                    <div className="meditation-guidance">
                      <p>🧘 Focus on your breath or chosen object</p>
                      <p>🔄 Gently return attention when mind wanders</p>
                      <p>📊 Use EEG feedback to deepen focus</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="focus-recommendations">
          <h3>Personalized Recommendations</h3>
          <div className="recommendations-grid">
            <div className="recommendation-card">
              <div className="rec-icon">🌅</div>
              <div className="rec-content">
                <h4>Morning Focus</h4>
                <p>Your attention peaks at 9:30 AM. Schedule demanding tasks during this window.</p>
              </div>
            </div>
            
            <div className="recommendation-card">
              <div className="rec-icon">☕</div>
              <div className="rec-content">
                <h4>Caffeine Timing</h4>
                <p>Delay coffee until 10 AM to optimize natural cortisol rhythms.</p>
              </div>
            </div>
            
            <div className="recommendation-card">
              <div className="rec-icon">🎧</div>
              <div className="rec-content">
                <h4>Background Audio</h4>
                <p>40Hz binaural beats showed 23% improvement in your focus sessions.</p>
              </div>
            </div>
            
            <div className="recommendation-card">
              <div className="rec-icon">💧</div>
              <div className="rec-content">
                <h4>Hydration</h4>
                <p>Drink water 15 minutes before sessions for optimal cognitive performance.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
