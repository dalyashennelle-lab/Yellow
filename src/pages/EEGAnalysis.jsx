import React, { useState, useEffect } from 'react'
import { 
  Waves, 
  Brain, 
  Activity, 
  TrendingUp, 
  Monitor, 
  Zap,
  Settings,
  Play,
  Pause,
  BarChart3,
  Users
} from 'lucide-react'

const EEGAnalysis = ({ user, cognitiveData }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [brainwaveData, setBrainwaveData] = useState({
    alpha: { frequency: 8.2, amplitude: 45, activity: 'Normal' },
    beta: { frequency: 18.7, amplitude: 32, activity: 'Active' },
    gamma: { frequency: 42.1, amplitude: 18, activity: 'High' },
    theta: { frequency: 6.5, amplitude: 28, activity: 'Normal' },
    delta: { frequency: 2.1, amplitude: 15, activity: 'Low' }
  })
  
  const [selectedBand, setSelectedBand] = useState('alpha')
  const [eegView, setEegView] = useState('realtime') // realtime, analysis, clinical

  // Simulate real-time EEG data updates
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
        setBrainwaveData(prev => ({
          ...prev,
          alpha: {
            ...prev.alpha,
            frequency: 8.2 + (Math.random() - 0.5) * 0.8,
            amplitude: 45 + (Math.random() - 0.5) * 10
          },
          beta: {
            ...prev.beta,
            frequency: 18.7 + (Math.random() - 0.5) * 2.0,
            amplitude: 32 + (Math.random() - 0.5) * 8
          },
          gamma: {
            ...prev.gamma,
            frequency: 42.1 + (Math.random() - 0.5) * 3.0,
            amplitude: 18 + (Math.random() - 0.5) * 6
          }
        }))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRecording])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getBandColor = (band) => {
    const colors = {
      alpha: '#00d4ff',
      beta: '#7c3aed',
      gamma: '#ff0080',
      theta: '#00ff88',
      delta: '#ffaa00'
    }
    return colors[band] || '#00d4ff'
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
    } else {
      setIsRecording(true)
      setRecordingTime(0)
    }
  }

  return (
    <div className="eeg-analysis">
      <div className="page-header">
        <h1 className="heading-xl">EEG Brain Analysis</h1>
        <p>Real-time brainwave monitoring and neural activity insights</p>
      </div>

      {/* Clinical Setup Section */}
      <div className="clinical-setup">
        <div className="setup-image">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F8849c3d33bb64dd593961485aa79ae80?format=webp&width=800"
            alt="EEG System - People Working with EEG Headbands"
            className="clinical-img"
          />
        </div>
        <div className="setup-content">
          <h2>Professional EEG Monitoring</h2>
          <p>Clinical-grade EEG equipment integration for precise brainwave analysis and cognitive assessment.</p>
          <div className="setup-features">
            <div className="feature-item">
              <Brain className="feature-icon" />
              <span>64-Channel EEG</span>
            </div>
            <div className="feature-item">
              <Monitor className="feature-icon" />
              <span>Real-time Processing</span>
            </div>
            <div className="feature-item">
              <Activity className="feature-icon" />
              <span>Clinical Integration</span>
            </div>
          </div>
        </div>
      </div>

      {/* EEG Control Panel */}
      <div className="eeg-controls neural-card">
        <div className="control-header">
          <h3>EEG Session Control</h3>
          <div className="recording-status">
            <div className={`status-indicator ${isRecording ? 'recording' : 'standby'}`} />
            <span>{isRecording ? 'Recording' : 'Standby'}</span>
          </div>
        </div>

        <div className="control-panel">
          <div className="session-info">
            <div className="info-item">
              <span className="label">Session Time</span>
              <span className="value">{formatTime(recordingTime)}</span>
            </div>
            <div className="info-item">
              <span className="label">Sampling Rate</span>
              <span className="value">1000 Hz</span>
            </div>
            <div className="info-item">
              <span className="label">Channels</span>
              <span className="value">64</span>
            </div>
          </div>

          <div className="control-buttons">
            <button 
              className={`btn ${isRecording ? 'btn-error' : 'btn-primary'}`}
              onClick={toggleRecording}
            >
              {isRecording ? <Pause size={20} /> : <Play size={20} />}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => alert('EEG Configuration: Channel setup, frequency bands, and sensitivity adjustments available in full clinical mode.')}
            >
              <Settings size={20} />
              Configure
            </button>
          </div>
        </div>
      </div>

      {/* EEG View Tabs */}
      <div className="view-tabs">
        <button 
          className={`tab-button ${eegView === 'realtime' ? 'active' : ''}`}
          onClick={() => setEegView('realtime')}
        >
          <Activity size={16} />
          Real-time
        </button>
        <button 
          className={`tab-button ${eegView === 'analysis' ? 'active' : ''}`}
          onClick={() => setEegView('analysis')}
        >
          <BarChart3 size={16} />
          Analysis
        </button>
        <button 
          className={`tab-button ${eegView === 'clinical' ? 'active' : ''}`}
          onClick={() => setEegView('clinical')}
        >
          <Users size={16} />
          Clinical
        </button>
      </div>

      {/* Main EEG Display */}
      {eegView === 'realtime' && (
        <div className="eeg-display">
          <div className="eeg-visualization neural-card">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fcabba278a7a1433ca6e7227b5c7dfef8?format=webp&width=800"
              alt="Advanced EEG Monitoring"
              className="eeg-monitor-img"
            />
            <div className="visualization-overlay">
              <h3>Real-time Brainwave Activity</h3>
              <div className="wave-bands">
                {Object.entries(brainwaveData).map(([band, data]) => (
                  <div 
                    key={band}
                    className={`wave-band ${selectedBand === band ? 'selected' : ''}`}
                    onClick={() => setSelectedBand(band)}
                    style={{ borderColor: getBandColor(band) }}
                  >
                    <span className="band-name">{band.toUpperCase()}</span>
                    <span className="band-freq">{data.frequency.toFixed(1)} Hz</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="brainwave-metrics">
            <h3>Brainwave Analysis</h3>
            <div className="metrics-grid">
              {Object.entries(brainwaveData).map(([band, data]) => (
                <div key={band} className="metric-card">
                  <div className="metric-header">
                    <Waves 
                      size={20} 
                      style={{ color: getBandColor(band) }}
                    />
                    <span className="metric-title">{band.charAt(0).toUpperCase() + band.slice(1)} Waves</span>
                  </div>
                  
                  <div className="metric-content">
                    <div className="metric-main">
                      <span className="metric-value" style={{ color: getBandColor(band) }}>
                        {data.frequency.toFixed(1)}
                      </span>
                      <span className="metric-unit">Hz</span>
                    </div>
                    
                    <div className="metric-details">
                      <div className="detail-item">
                        <span>Amplitude:</span>
                        <span>{data.amplitude.toFixed(0)} μV</span>
                      </div>
                      <div className="detail-item">
                        <span>Activity:</span>
                        <span className={`activity-${data.activity.toLowerCase()}`}>
                          {data.activity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {eegView === 'analysis' && (
        <div className="analysis-view">
          <div className="analysis-header">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F5c9dabb76aee4b138da67f4ac12a5e72?format=webp&width=800"
              alt="Cognitive Analysis Dashboard"
              className="analysis-img"
            />
            <div className="analysis-content">
              <h3>Cognitive Domain Analysis</h3>
              <p>Comprehensive analysis of cognitive performance metrics over time with detailed attention and memory score tracking.</p>
            </div>
          </div>
        </div>
      )}

      {eegView === 'clinical' && (
        <div className="clinical-view">
          <div className="clinical-consultation">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F39a5c1cfa8ba4f569e59c104daf07f04?format=webp&width=800"
              alt="Clinical Consultation"
              className="consultation-img"
            />
            <div className="consultation-content">
              <h3>Clinical Integration</h3>
              <p>Seamless integration with clinical workflows, enabling healthcare professionals to review and discuss EEG findings with patients in real-time.</p>
              <div className="clinical-features">
                <div className="clinical-feature">
                  <TrendingUp className="feature-icon" />
                  <span>Progress Tracking</span>
                </div>
                <div className="clinical-feature">
                  <Monitor className="feature-icon" />
                  <span>Report Generation</span>
                </div>
                <div className="clinical-feature">
                  <Zap className="feature-icon" />
                  <span>Treatment Planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .eeg-analysis {
          padding: 80px 24px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .clinical-setup {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 40px;
          background: var(--bg-card);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid var(--border-primary);
        }

        .clinical-img {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-glow);
        }

        .setup-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--neural-primary);
        }

        .setup-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .setup-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .feature-icon {
          color: var(--neural-primary);
        }

        .eeg-controls {
          margin-bottom: 32px;
        }

        .control-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .control-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .recording-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        .status-indicator.recording {
          background: var(--neural-error);
          animation: pulse 1s infinite;
        }

        .status-indicator.standby {
          background: var(--neural-success);
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .control-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .session-info {
          display: flex;
          gap: 32px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .value {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .control-buttons {
          display: flex;
          gap: 12px;
        }

        .view-tabs {
          display: flex;
          gap: 4px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 32px;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-button.active {
          background: var(--neural-primary);
          color: white;
        }

        .tab-button:hover:not(.active) {
          background: var(--bg-glass);
          color: var(--text-primary);
        }

        .eeg-display {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          margin-bottom: 40px;
        }

        .eeg-visualization {
          position: relative;
          min-height: 400px;
          overflow: hidden;
        }

        .eeg-monitor-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }

        .visualization-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
          padding: 24px;
          color: white;
        }

        .visualization-overlay h3 {
          margin-bottom: 16px;
          font-size: 1.125rem;
        }

        .wave-bands {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .wave-band {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 12px;
          border: 2px solid;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .wave-band:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .wave-band.selected {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .band-name {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .band-freq {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .brainwave-metrics h3 {
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .metrics-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .metric-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        }

        .detail-item span:first-child {
          color: var(--text-secondary);
        }

        .detail-item span:last-child {
          font-weight: 500;
          color: var(--text-primary);
        }

        .activity-normal {
          color: var(--neural-success);
        }

        .activity-active {
          color: var(--neural-primary);
        }

        .activity-high {
          color: var(--neural-warning);
        }

        .activity-low {
          color: var(--text-muted);
        }

        .analysis-view,
        .clinical-view {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 32px;
          border: 1px solid var(--border-primary);
        }

        .analysis-header,
        .clinical-consultation {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: center;
        }

        .analysis-img,
        .consultation-img {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-glow);
        }

        .analysis-content h3,
        .consultation-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--neural-primary);
        }

        .analysis-content p,
        .consultation-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .clinical-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .clinical-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-primary);
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .eeg-display {
            grid-template-columns: 1fr;
          }

          .clinical-setup,
          .analysis-header,
          .clinical-consultation {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .control-panel {
            flex-direction: column;
            align-items: stretch;
          }

          .session-info {
            justify-content: space-around;
          }

          .view-tabs {
            overflow-x: auto;
            scrollbar-width: none;
          }

          .view-tabs::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default EEGAnalysis
