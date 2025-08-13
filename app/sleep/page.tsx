'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import * as d3 from 'd3';

interface SleepStage {
  stage: 'awake' | 'light' | 'deep' | 'rem';
  duration: number;
  timestamp: number;
  quality: number;
}

interface SleepSession {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  totalSleep: number;
  efficiency: number;
  stages: SleepStage[];
  brainwaves: {
    delta: number[];
    theta: number[];
    alpha: number[];
    beta: number[];
    gamma: number[];
  };
  memoryConsolidation: number;
  recommendations: string[];
}

export default function SleepTrackerPage() {
  const [sleepSessions, setSleepSessions] = useState<SleepSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<SleepSession | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'analysis'>('overview');
  const [isTracking, setIsTracking] = useState(false);

  // Generate sample sleep data
  useEffect(() => {
    const generateSleepData = () => {
      const sessions: SleepSession[] = [];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const bedtime = new Date(date);
        bedtime.setHours(22 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60));
        
        const wakeTime = new Date(date);
        wakeTime.setDate(wakeTime.getDate() + 1);
        wakeTime.setHours(6 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60));
        
        const totalSleep = (wakeTime.getTime() - bedtime.getTime()) / (1000 * 60 * 60);
        
        // Generate sleep stages
        const stages: SleepStage[] = [];
        let currentTime = bedtime.getTime();
        const stageTypes: ('light' | 'deep' | 'rem')[] = ['light', 'deep', 'rem'];
        
        while (currentTime < wakeTime.getTime()) {
          const stage = stageTypes[Math.floor(Math.random() * stageTypes.length)];
          const duration = 15 + Math.random() * 105; // 15-120 minutes
          
          stages.push({
            stage,
            duration,
            timestamp: currentTime,
            quality: 60 + Math.random() * 40
          });
          
          currentTime += duration * 60 * 1000;
        }
        
        // Generate brainwave data
        const brainwaves = {
          delta: Array.from({ length: 100 }, () => Math.random() * 0.8 + 0.2),
          theta: Array.from({ length: 100 }, () => Math.random() * 0.6 + 0.1),
          alpha: Array.from({ length: 100 }, () => Math.random() * 0.4 + 0.1),
          beta: Array.from({ length: 100 }, () => Math.random() * 0.3 + 0.05),
          gamma: Array.from({ length: 100 }, () => Math.random() * 0.2 + 0.02)
        };
        
        const session: SleepSession = {
          id: `session_${i}`,
          date: date.toISOString().split('T')[0],
          bedtime: bedtime.toLocaleTimeString(),
          wakeTime: wakeTime.toLocaleTimeString(),
          totalSleep,
          efficiency: 70 + Math.random() * 25,
          stages,
          brainwaves,
          memoryConsolidation: 60 + Math.random() * 35,
          recommendations: [
            'Optimal REM sleep detected for memory consolidation',
            'Consider reducing blue light exposure before bedtime',
            'Deep sleep phases show strong delta wave activity'
          ]
        };
        
        sessions.push(session);
      }
      
      setSleepSessions(sessions);
      setSelectedSession(sessions[0]);
    };
    
    generateSleepData();
  }, []);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'awake': return '#ff6b6b';
      case 'light': return '#4ecdc4';
      case 'deep': return '#45b7d1';
      case 'rem': return '#feca57';
      default: return '#ddd';
    }
  };

  const renderSleepChart = (session: SleepSession) => {
    const totalDuration = session.stages.reduce((sum, stage) => sum + stage.duration, 0);
    let currentPosition = 0;
    
    return (
      <div className="sleep-chart">
        <div className="sleep-timeline">
          {session.stages.map((stage, index) => {
            const width = (stage.duration / totalDuration) * 100;
            const element = (
              <div
                key={index}
                className="sleep-stage-bar"
                style={{
                  width: `${width}%`,
                  backgroundColor: getStageColor(stage.stage),
                  height: '40px'
                }}
                title={`${stage.stage.toUpperCase()}: ${stage.duration.toFixed(0)} min`}
              />
            );
            currentPosition += width;
            return element;
          })}
        </div>
        <div className="sleep-labels">
          <span>22:00</span>
          <span>02:00</span>
          <span>06:00</span>
        </div>
      </div>
    );
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="sleep" />
      
      <main className="main-content">
        <div className="sleep-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">Sleep Tracker & Analysis</h1>
              <p className="hero-description">
                Monitor REM/NREM cycles and their impact on memory consolidation
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fedb2fd9925ce4b5d93764e32005899d3?format=webp&width=800"
                alt="Sleep and memory research visualization"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <div className="sleep-controls">
          <div className="view-mode-selector">
            <button 
              className={`mode-btn ${viewMode === 'overview' ? 'active' : ''}`}
              onClick={() => setViewMode('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={`mode-btn ${viewMode === 'detailed' ? 'active' : ''}`}
              onClick={() => setViewMode('detailed')}
            >
              🔬 Detailed
            </button>
            <button 
              className={`mode-btn ${viewMode === 'analysis' ? 'active' : ''}`}
              onClick={() => setViewMode('analysis')}
            >
              🧠 Analysis
            </button>
          </div>
          
          <div className="tracking-control">
            <button 
              className={`tracking-btn ${isTracking ? 'active' : ''}`}
              onClick={toggleTracking}
            >
              {isTracking ? '⏹️ Stop Tracking' : '▶️ Start Tracking'}
            </button>
          </div>
        </div>

        {viewMode === 'overview' && (
          <div className="sleep-overview">
            <div className="sleep-stats-grid">
              <div className="sleep-stat-card">
                <div className="stat-icon">😴</div>
                <div className="stat-info">
                  <h3>Average Sleep</h3>
                  <div className="stat-value">
                    {sleepSessions.length > 0 
                      ? (sleepSessions.reduce((sum, s) => sum + s.totalSleep, 0) / sleepSessions.length).toFixed(1)
                      : '0'
                    }h
                  </div>
                </div>
              </div>
              
              <div className="sleep-stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <h3>Sleep Efficiency</h3>
                  <div className="stat-value">
                    {sleepSessions.length > 0
                      ? (sleepSessions.reduce((sum, s) => sum + s.efficiency, 0) / sleepSessions.length).toFixed(1)
                      : '0'
                    }%
                  </div>
                </div>
              </div>
              
              <div className="sleep-stat-card">
                <div className="stat-icon">🧠</div>
                <div className="stat-info">
                  <h3>Memory Consolidation</h3>
                  <div className="stat-value">
                    {sleepSessions.length > 0
                      ? (sleepSessions.reduce((sum, s) => sum + s.memoryConsolidation, 0) / sleepSessions.length).toFixed(1)
                      : '0'
                    }%
                  </div>
                </div>
              </div>
              
              <div className="sleep-stat-card">
                <div className="stat-icon">🌙</div>
                <div className="stat-info">
                  <h3>REM Quality</h3>
                  <div className="stat-value">Excellent</div>
                </div>
              </div>
            </div>

            <div className="sleep-sessions-list">
              <h3>Recent Sleep Sessions</h3>
              <div className="sessions-grid">
                {sleepSessions.map(session => (
                  <div 
                    key={session.id} 
                    className={`session-card ${selectedSession?.id === session.id ? 'selected' : ''}`}
                    onClick={() => setSelectedSession(session)}
                  >
                    <div className="session-date">{session.date}</div>
                    <div className="session-duration">{session.totalSleep.toFixed(1)}h</div>
                    <div className="session-efficiency">{session.efficiency.toFixed(1)}%</div>
                    {renderSleepChart(session)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'detailed' && selectedSession && (
          <div className="sleep-detailed">
            <div className="session-header">
              <h3>Sleep Session - {selectedSession.date}</h3>
              <div className="session-summary">
                <span>Bedtime: {selectedSession.bedtime}</span>
                <span>Wake: {selectedSession.wakeTime}</span>
                <span>Total: {selectedSession.totalSleep.toFixed(1)}h</span>
              </div>
            </div>

            <div className="detailed-charts">
              <div className="chart-section">
                <h4>Sleep Stages Timeline</h4>
                {renderSleepChart(selectedSession)}
                <div className="stage-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: getStageColor('light') }} />
                    <span>Light Sleep</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: getStageColor('deep') }} />
                    <span>Deep Sleep</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: getStageColor('rem') }} />
                    <span>REM Sleep</span>
                  </div>
                </div>
              </div>

              <div className="chart-section">
                <h4>Brainwave Activity</h4>
                <div className="brainwave-chart">
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Ff11162822acb4920b40870c00ffd13d6?format=webp&width=800"
                    alt="Brainwave activity during sleep"
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            <div className="stage-breakdown">
              <h4>Sleep Stage Breakdown</h4>
              <div className="breakdown-grid">
                {['light', 'deep', 'rem'].map(stageType => {
                  const stageData = selectedSession.stages.filter(s => s.stage === stageType);
                  const totalDuration = stageData.reduce((sum, s) => sum + s.duration, 0);
                  const percentage = (totalDuration / selectedSession.totalSleep / 60) * 100;
                  
                  return (
                    <div key={stageType} className="breakdown-item">
                      <div className="breakdown-header">
                        <span className="stage-name">{stageType.toUpperCase()}</span>
                        <span className="stage-percentage">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="breakdown-bar">
                        <div 
                          className="breakdown-fill"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: getStageColor(stageType)
                          }}
                        />
                      </div>
                      <div className="breakdown-duration">{(totalDuration / 60).toFixed(1)}h</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'analysis' && selectedSession && (
          <div className="sleep-analysis">
            <div className="analysis-header">
              <h3>Memory Consolidation Analysis</h3>
              <div className="consolidation-score">
                <span className="score-label">Consolidation Score:</span>
                <span className="score-value">{selectedSession.memoryConsolidation.toFixed(1)}%</span>
              </div>
            </div>

            <div className="analysis-sections">
              <div className="analysis-section">
                <h4>🧠 Neuroscience Insights</h4>
                <div className="insights-grid">
                  <div className="insight-card">
                    <div className="insight-icon">🌊</div>
                    <h5>Delta Wave Activity</h5>
                    <p>Strong delta waves detected during deep sleep phases, optimal for memory consolidation</p>
                    <div className="insight-metric">Peak: 0.8μV</div>
                  </div>
                  
                  <div className="insight-card">
                    <div className="insight-icon">🔄</div>
                    <h5>Sleep Spindles</h5>
                    <p>Healthy sleep spindle frequency supports declarative memory transfer</p>
                    <div className="insight-metric">Count: 127</div>
                  </div>
                  
                  <div className="insight-card">
                    <div className="insight-icon">⚡</div>
                    <h5>REM Density</h5>
                    <p>Optimal REM density for procedural memory consolidation</p>
                    <div className="insight-metric">Density: 85%</div>
                  </div>
                </div>
              </div>

              <div className="analysis-section">
                <h4>📈 Performance Predictions</h4>
                <div className="predictions">
                  <div className="prediction-item">
                    <span className="prediction-metric">Memory Recall (Next Day)</span>
                    <div className="prediction-bar">
                      <div className="prediction-fill" style={{ width: '87%' }} />
                    </div>
                    <span className="prediction-value">87%</span>
                  </div>
                  
                  <div className="prediction-item">
                    <span className="prediction-metric">Cognitive Performance</span>
                    <div className="prediction-bar">
                      <div className="prediction-fill" style={{ width: '92%' }} />
                    </div>
                    <span className="prediction-value">92%</span>
                  </div>
                  
                  <div className="prediction-item">
                    <span className="prediction-metric">Learning Efficiency</span>
                    <div className="prediction-bar">
                      <div className="prediction-fill" style={{ width: '78%' }} />
                    </div>
                    <span className="prediction-value">78%</span>
                  </div>
                </div>
              </div>

              <div className="analysis-section">
                <h4>💡 Personalized Recommendations</h4>
                <div className="recommendations">
                  {selectedSession.recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-item">
                      <div className="rec-icon">💡</div>
                      <span className="rec-text">{rec}</span>
                    </div>
                  ))}
                  <div className="recommendation-item">
                    <div className="rec-icon">🧘</div>
                    <span className="rec-text">Try meditation 1 hour before bedtime to improve sleep quality</span>
                  </div>
                  <div className="recommendation-item">
                    <div className="rec-icon">🌡️</div>
                    <span className="rec-text">Optimal room temperature: 65-68°F for deep sleep phases</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="analysis-image">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F23cf905664fd4fe39498ee9e82249058?format=webp&width=800"
                alt="Brain activity during memory consolidation"
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
