import React, { useState, useEffect, useRef } from 'react'
import { 
  Brain, 
  Waves, 
  Activity, 
  Zap, 
  Eye, 
  Heart, 
  Target, 
  TrendingUp,
  Settings,
  Play,
  Pause,
  Wifi,
  WifiOff,
  Cpu,
  BarChart3,
  LineChart,
  Gauge,
  Sparkles,
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

const AdvancedEEGMonitoring = ({ onBrainwaveChange, onCognitiveStateChange }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [eegDevice, setEegDevice] = useState('muse-sdk') // muse-sdk, openbci, emotivpro
  const [isRecording, setIsRecording] = useState(false)
  const [brainwaves, setBrainwaves] = useState({
    delta: { frequency: 0.5, amplitude: 0, power: 0, coherence: 0 },
    theta: { frequency: 6, amplitude: 0, power: 0, coherence: 0 },
    alpha: { frequency: 10, amplitude: 0, power: 0, coherence: 0 },
    beta: { frequency: 20, amplitude: 0, power: 0, coherence: 0 },
    gamma: { frequency: 40, amplitude: 0, power: 0, coherence: 0 }
  })
  const [cognitiveMetrics, setCognitiveMetrics] = useState({
    attention: 0,
    meditation: 0,
    engagement: 0,
    workload: 0,
    stressLevel: 0,
    creativity: 0,
    memoryLoad: 0,
    emotionalState: 'neutral'
  })
  const [neuralOscillations, setNeuralOscillations] = useState([])
  const [realTimeFFT, setRealTimeFFT] = useState([])
  const canvasRef = useRef(null)
  const wsRef = useRef(null)
  const animationRef = useRef(null)

  // EEG Device Configurations
  const deviceConfigs = {
    'muse-sdk': {
      name: 'Muse EEG Headband',
      channels: 4,
      sampleRate: 256,
      protocol: 'bluetooth',
      electrodes: ['TP9', 'AF7', 'AF8', 'TP10'],
      icon: Brain
    },
    'openbci': {
      name: 'OpenBCI Cyton',
      channels: 8,
      sampleRate: 250,
      protocol: 'wifi',
      electrodes: ['C3', 'C4', 'Cz', 'F3', 'F4', 'Fz', 'P3', 'P4'],
      icon: Cpu
    },
    'emotivpro': {
      name: 'EMOTIV PRO',
      channels: 14,
      sampleRate: 256,
      protocol: 'bluetooth',
      electrodes: ['AF3', 'F7', 'F3', 'FC5', 'T7', 'P7', 'O1', 'O2', 'P8', 'T8', 'FC6', 'F4', 'F8', 'AF4'],
      icon: Zap
    }
  }

  // Initialize WebSocket connection for real-time EEG data
  useEffect(() => {
    if (isConnected) {
      // Simulate WebSocket connection to EEG device
      const ws = new WebSocket('ws://localhost:8080/eeg-stream') // Mock WebSocket
      wsRef.current = ws

      ws.onopen = () => {
        console.log('EEG WebSocket connected')
        startEEGSimulation()
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          processBrainwaveData(data)
        } catch (error) {
          console.error('EEG data parsing error:', error)
        }
      }

      ws.onerror = () => {
        console.log('WebSocket error, using simulation')
        startEEGSimulation()
      }

      return () => {
        ws.close()
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isConnected])

  // Simulate real-time EEG data when WebSocket is not available
  const startEEGSimulation = () => {
    const simulate = () => {
      if (!isRecording) return

      const timestamp = Date.now()
      
      // Generate realistic brainwave patterns
      const newBrainwaves = {
        delta: {
          frequency: 0.5 + Math.sin(timestamp * 0.0001) * 0.3,
          amplitude: Math.max(0, 20 + Math.sin(timestamp * 0.0005) * 15),
          power: Math.max(0, 30 + Math.sin(timestamp * 0.0003) * 20),
          coherence: 0.6 + Math.sin(timestamp * 0.0002) * 0.3
        },
        theta: {
          frequency: 6 + Math.sin(timestamp * 0.0002) * 2,
          amplitude: Math.max(0, 35 + Math.sin(timestamp * 0.0007) * 25),
          power: Math.max(0, 45 + Math.sin(timestamp * 0.0004) * 30),
          coherence: 0.7 + Math.sin(timestamp * 0.0003) * 0.2
        },
        alpha: {
          frequency: 10 + Math.sin(timestamp * 0.0003) * 3,
          amplitude: Math.max(0, 50 + Math.sin(timestamp * 0.0008) * 35),
          power: Math.max(0, 60 + Math.sin(timestamp * 0.0005) * 40),
          coherence: 0.8 + Math.sin(timestamp * 0.0004) * 0.15
        },
        beta: {
          frequency: 20 + Math.sin(timestamp * 0.0004) * 10,
          amplitude: Math.max(0, 30 + Math.sin(timestamp * 0.0009) * 20),
          power: Math.max(0, 40 + Math.sin(timestamp * 0.0006) * 25),
          coherence: 0.65 + Math.sin(timestamp * 0.0005) * 0.25
        },
        gamma: {
          frequency: 40 + Math.sin(timestamp * 0.0005) * 20,
          amplitude: Math.max(0, 15 + Math.sin(timestamp * 0.001) * 10),
          power: Math.max(0, 25 + Math.sin(timestamp * 0.0007) * 15),
          coherence: 0.5 + Math.sin(timestamp * 0.0006) * 0.3
        }
      }

      setBrainwaves(newBrainwaves)
      
      // Calculate cognitive metrics from brainwaves
      const metrics = calculateCognitiveMetrics(newBrainwaves)
      setCognitiveMetrics(metrics)
      
      // Generate neural oscillations for visualization
      const oscillations = generateNeuralOscillations(newBrainwaves)
      setNeuralOscillations(oscillations)
      
      // Calculate real-time FFT for frequency analysis
      const fft = calculateRealTimeFFT(newBrainwaves)
      setRealTimeFFT(fft)

      // Notify parent components
      onBrainwaveChange?.(newBrainwaves)
      onCognitiveStateChange?.(metrics)

      animationRef.current = requestAnimationFrame(simulate)
    }

    simulate()
  }

  const calculateCognitiveMetrics = (waves) => {
    // Advanced cognitive state calculation based on brainwave patterns
    const attention = Math.min(100, (waves.beta.power / 40) * 100)
    const meditation = Math.min(100, (waves.alpha.power / 60) * 100)
    const engagement = Math.min(100, ((waves.beta.power + waves.gamma.power) / 65) * 100)
    const workload = Math.min(100, (waves.theta.power / 45) * 100)
    const stressLevel = Math.min(100, ((waves.beta.power - waves.alpha.power) / 20) * 100)
    const creativity = Math.min(100, ((waves.theta.power + waves.alpha.power) / 105) * 100)
    const memoryLoad = Math.min(100, (waves.gamma.power / 25) * 100)
    
    // Determine emotional state based on brainwave patterns
    let emotionalState = 'neutral'
    if (waves.alpha.power > 50 && waves.beta.power < 30) emotionalState = 'relaxed'
    else if (waves.beta.power > 35 && waves.gamma.power > 20) emotionalState = 'alert'
    else if (waves.theta.power > 40) emotionalState = 'creative'
    else if (waves.delta.power > 35) emotionalState = 'drowsy'

    return {
      attention: Math.max(0, attention),
      meditation: Math.max(0, meditation),
      engagement: Math.max(0, engagement),
      workload: Math.max(0, workload),
      stressLevel: Math.max(0, stressLevel),
      creativity: Math.max(0, creativity),
      memoryLoad: Math.max(0, memoryLoad),
      emotionalState
    }
  }

  const generateNeuralOscillations = (waves) => {
    const oscillations = []
    Object.entries(waves).forEach(([band, data], index) => {
      oscillations.push({
        band,
        frequency: data.frequency,
        amplitude: data.amplitude,
        phase: (Date.now() * data.frequency * 0.01) % (2 * Math.PI),
        color: getBandColor(band),
        position: index
      })
    })
    return oscillations
  }

  const calculateRealTimeFFT = (waves) => {
    // Simulate FFT analysis for frequency spectrum
    const fftData = []
    for (let freq = 0; freq <= 50; freq += 0.5) {
      let magnitude = 0
      Object.values(waves).forEach(wave => {
        const diff = Math.abs(freq - wave.frequency)
        if (diff < 5) {
          magnitude += wave.power * Math.exp(-diff / 2)
        }
      })
      fftData.push({ frequency: freq, magnitude: Math.max(0, magnitude) })
    }
    return fftData
  }

  const getBandColor = (band) => {
    const colors = {
      delta: '#ff6b9d',
      theta: '#4ecdc4',
      alpha: '#45b7d1',
      beta: '#f9ca24',
      gamma: '#6c5ce7'
    }
    return colors[band] || '#ffffff'
  }

  const getMetricColor = (value) => {
    if (value < 30) return 'var(--neural-error)'
    if (value < 60) return 'var(--neural-warning)'
    if (value < 80) return 'var(--neural-primary)'
    return 'var(--neural-success)'
  }

  const getConnectionStatus = () => {
    if (!isConnected) return { status: 'disconnected', icon: WifiOff, color: 'var(--neural-error)' }
    if (!isRecording) return { status: 'connected', icon: Wifi, color: 'var(--neural-warning)' }
    return { status: 'recording', icon: CheckCircle, color: 'var(--neural-success)' }
  }

  const connectionStatus = getConnectionStatus()

  return (
    <div className="advanced-eeg-monitoring">
      {/* EEG Header */}
      <div className="eeg-header">
        <div className="device-info">
          <div className="device-selector">
            <select 
              value={eegDevice} 
              onChange={(e) => setEegDevice(e.target.value)}
              className="device-select"
            >
              {Object.entries(deviceConfigs).map(([key, config]) => (
                <option key={key} value={key}>{config.name}</option>
              ))}
            </select>
          </div>
          
          <div className="connection-status">
            <connectionStatus.icon size={20} style={{ color: connectionStatus.color }} />
            <span style={{ color: connectionStatus.color }}>
              {connectionStatus.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="eeg-controls">
          <button 
            className={`control-btn ${isConnected ? 'connected' : ''}`}
            onClick={() => setIsConnected(!isConnected)}
          >
            {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
            {isConnected ? 'Disconnect' : 'Connect'}
          </button>
          
          {isConnected && (
            <button 
              className={`control-btn ${isRecording ? 'recording' : ''}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? <Pause size={16} /> : <Play size={16} />}
              {isRecording ? 'Stop' : 'Record'}
            </button>
          )}
        </div>
      </div>

      {/* Real-time Brainwave Display */}
      <div className="brainwave-display">
        <h4>Real-Time Brainwave Analysis</h4>
        <div className="brainwave-grid">
          {Object.entries(brainwaves).map(([band, data]) => (
            <div key={band} className={`brainwave-card ${isRecording ? 'active' : ''}`}>
              <div className="band-header">
                <div 
                  className="band-indicator neural-pulse"
                  style={{ background: getBandColor(band) }}
                ></div>
                <h5>{band.toUpperCase()}</h5>
                <span className="frequency">{data.frequency.toFixed(1)}Hz</span>
              </div>
              
              <div className="wave-visualization">
                <div className="wave-metrics">
                  <div className="metric">
                    <span>Amplitude</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill"
                        style={{ 
                          width: `${(data.amplitude / 100) * 100}%`,
                          background: getBandColor(band)
                        }}
                      ></div>
                    </div>
                    <span>{data.amplitude.toFixed(1)}μV</span>
                  </div>
                  
                  <div className="metric">
                    <span>Power</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill"
                        style={{ 
                          width: `${(data.power / 100) * 100}%`,
                          background: getBandColor(band)
                        }}
                      ></div>
                    </div>
                    <span>{data.power.toFixed(1)}dB</span>
                  </div>
                  
                  <div className="metric">
                    <span>Coherence</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill"
                        style={{ 
                          width: `${data.coherence * 100}%`,
                          background: getBandColor(band)
                        }}
                      ></div>
                    </div>
                    <span>{(data.coherence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cognitive Metrics Dashboard */}
      <div className="cognitive-metrics">
        <h4>Cognitive State Analysis</h4>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <Target size={20} />
              <span>Attention</span>
            </div>
            <div className="metric-value" style={{ color: getMetricColor(cognitiveMetrics.attention) }}>
              {cognitiveMetrics.attention.toFixed(0)}%
            </div>
            <div className="metric-bar">
              <div 
                className="metric-fill neural-pulse"
                style={{ 
                  width: `${cognitiveMetrics.attention}%`,
                  background: getMetricColor(cognitiveMetrics.attention)
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <Heart size={20} />
              <span>Meditation</span>
            </div>
            <div className="metric-value" style={{ color: getMetricColor(cognitiveMetrics.meditation) }}>
              {cognitiveMetrics.meditation.toFixed(0)}%
            </div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${cognitiveMetrics.meditation}%`,
                  background: getMetricColor(cognitiveMetrics.meditation)
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <Zap size={20} />
              <span>Engagement</span>
            </div>
            <div className="metric-value" style={{ color: getMetricColor(cognitiveMetrics.engagement) }}>
              {cognitiveMetrics.engagement.toFixed(0)}%
            </div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${cognitiveMetrics.engagement}%`,
                  background: getMetricColor(cognitiveMetrics.engagement)
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <Brain size={20} />
              <span>Workload</span>
            </div>
            <div className="metric-value" style={{ color: getMetricColor(100 - cognitiveMetrics.workload) }}>
              {cognitiveMetrics.workload.toFixed(0)}%
            </div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${cognitiveMetrics.workload}%`,
                  background: getMetricColor(100 - cognitiveMetrics.workload)
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <Sparkles size={20} />
              <span>Creativity</span>
            </div>
            <div className="metric-value" style={{ color: getMetricColor(cognitiveMetrics.creativity) }}>
              {cognitiveMetrics.creativity.toFixed(0)}%
            </div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${cognitiveMetrics.creativity}%`,
                  background: getMetricColor(cognitiveMetrics.creativity)
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <Activity size={20} />
              <span>Memory Load</span>
            </div>
            <div className="metric-value" style={{ color: getMetricColor(cognitiveMetrics.memoryLoad) }}>
              {cognitiveMetrics.memoryLoad.toFixed(0)}%
            </div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${cognitiveMetrics.memoryLoad}%`,
                  background: getMetricColor(cognitiveMetrics.memoryLoad)
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="emotional-state">
          <div className="state-indicator">
            <span>Emotional State:</span>
            <div className={`state-badge ${cognitiveMetrics.emotionalState}`}>
              {cognitiveMetrics.emotionalState}
            </div>
          </div>
          
          <div className="stress-indicator">
            <span>Stress Level:</span>
            <div className="stress-meter">
              <div 
                className="stress-fill"
                style={{ 
                  width: `${cognitiveMetrics.stressLevel}%`,
                  background: getMetricColor(100 - cognitiveMetrics.stressLevel)
                }}
              ></div>
            </div>
            <span>{cognitiveMetrics.stressLevel.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* FFT Spectrum Analysis */}
      <div className="fft-analysis">
        <h4>Frequency Spectrum Analysis</h4>
        <div className="spectrum-chart">
          {realTimeFFT.slice(0, 50).map((point, index) => (
            <div 
              key={index}
              className="spectrum-bar"
              style={{ 
                height: `${Math.min(point.magnitude, 100)}%`,
                background: `hsl(${point.frequency * 7}, 70%, 60%)`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .advanced-eeg-monitoring {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border-primary);
        }

        .eeg-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          gap: 20px;
        }

        .device-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .device-select {
          padding: 8px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .connection-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .eeg-controls {
          display: flex;
          gap: 12px;
        }

        .control-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-btn:hover {
          background: var(--neural-primary);
          color: white;
          border-color: var(--neural-primary);
        }

        .control-btn.connected {
          background: var(--neural-success);
          color: white;
          border-color: var(--neural-success);
        }

        .control-btn.recording {
          background: var(--neural-error);
          color: white;
          border-color: var(--neural-error);
          animation: pulse 2s ease-in-out infinite;
        }

        .brainwave-display h4,
        .cognitive-metrics h4,
        .fft-analysis h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .brainwave-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .brainwave-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .brainwave-card.active {
          border-color: var(--neural-primary);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.1);
        }

        .band-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .band-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .band-header h5 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
        }

        .frequency {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .wave-metrics {
          display: grid;
          gap: 8px;
        }

        .metric {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 8px;
          align-items: center;
          font-size: 0.75rem;
        }

        .metric span {
          color: var(--text-secondary);
        }

        .metric-bar {
          height: 4px;
          background: var(--bg-tertiary);
          border-radius: 2px;
          overflow: hidden;
        }

        .metric-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .emotional-state {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 16px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
        }

        .state-indicator,
        .stress-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .state-badge {
          padding: 4px 12px;
          border-radius: 8px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .state-badge.neutral { background: var(--neural-primary); color: white; }
        .state-badge.relaxed { background: var(--neural-success); color: white; }
        .state-badge.alert { background: var(--neural-warning); color: white; }
        .state-badge.creative { background: var(--neural-secondary); color: white; }
        .state-badge.drowsy { background: var(--neural-error); color: white; }

        .stress-meter {
          width: 100px;
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
        }

        .stress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .spectrum-chart {
          display: flex;
          align-items: end;
          height: 100px;
          gap: 2px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 16px;
        }

        .spectrum-bar {
          flex: 1;
          min-height: 2px;
          border-radius: 1px;
          transition: height 0.1s ease;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 768px) {
          .eeg-header {
            flex-direction: column;
            gap: 16px;
          }

          .device-info {
            flex-direction: column;
            gap: 12px;
          }

          .brainwave-grid,
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .emotional-state {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default AdvancedEEGMonitoring
