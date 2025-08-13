import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  Waves,
  Activity,
  Zap,
  Eye,
  Heart,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

const SimpleEEGVisualization = ({ eegData, isRecording, onToggleRecording }) => {
  const [brainState, setBrainState] = useState({
    activity: 0.5,
    focus: 0.6,
    relaxation: 0.4,
    creativity: 0.7
  })

  const [waveData, setWaveData] = useState([])
  const canvasRef = useRef(null)

  // Generate EEG wave patterns
  useEffect(() => {
    const generateWaveData = () => {
      const waves = []
      const time = Date.now() / 1000
      
      for (let i = 0; i < 200; i++) {
        const x = (i / 200) * 100
        const alpha = Math.sin(time * 2 + i * 0.1) * brainState.relaxation * 30
        const beta = Math.sin(time * 4 + i * 0.05) * brainState.focus * 20
        const gamma = Math.sin(time * 8 + i * 0.02) * brainState.activity * 15
        const theta = Math.sin(time * 1 + i * 0.2) * brainState.creativity * 25
        
        waves.push({
          x,
          alpha: 50 + alpha,
          beta: 150 + beta,
          gamma: 250 + gamma,
          theta: 350 + theta
        })
      }
      
      return waves
    }

    if (isRecording) {
      const interval = setInterval(() => {
        setWaveData(generateWaveData())
        setBrainState(prev => ({
          activity: Math.max(0, Math.min(1, prev.activity + (Math.random() - 0.5) * 0.1)),
          focus: Math.max(0, Math.min(1, prev.focus + (Math.random() - 0.5) * 0.08)),
          relaxation: Math.max(0, Math.min(1, prev.relaxation + (Math.random() - 0.5) * 0.12)),
          creativity: Math.max(0, Math.min(1, prev.creativity + (Math.random() - 0.5) * 0.15))
        }))
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isRecording, brainState])

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !waveData.length) return

    const ctx = canvas.getContext('2d')
    const { width, height } = canvas

    ctx.clearRect(0, 0, width, height)
    
    // Draw EEG waves
    const drawWave = (data, color, property) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()
      
      data.forEach((point, i) => {
        const x = (point.x / 100) * width
        const y = point[property]
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      
      ctx.stroke()
    }

    // Draw background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width
      const y = (i / 10) * height
      
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw wave types
    drawWave(waveData, '#00d4ff', 'alpha')   // Alpha - Blue
    drawWave(waveData, '#7c3aed', 'beta')    // Beta - Purple  
    drawWave(waveData, '#ffffff', 'gamma')   // Gamma - White
    drawWave(waveData, '#00ff88', 'theta')   // Theta - Green

  }, [waveData])

  return (
    <div className="simple-eeg-visualization">
      {/* Control Panel */}
      <div className="eeg-controls">
        <div className="control-section">
          <h3>EEG Brain Wave Monitor</h3>
          <div className="wave-legend">
            <div className="legend-item">
              <div className="legend-color alpha" />
              <span>Alpha (8-13 Hz)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color beta" />
              <span>Beta (13-30 Hz)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color gamma" />
              <span>Gamma (30+ Hz)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color theta" />
              <span>Theta (4-8 Hz)</span>
            </div>
          </div>
        </div>

        <div className="control-section">
          <button
            className={`record-btn ${isRecording ? 'recording' : ''}`}
            onClick={onToggleRecording}
          >
            {isRecording ? <Pause size={16} /> : <Play size={16} />}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      </div>

      {/* EEG Wave Canvas */}
      <div className="eeg-canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="eeg-canvas"
        />
        
        <div className="canvas-overlay">
          <div className="brain-metrics">
            <h4>Real-time Brain State</h4>
            <div className="metrics-grid">
              <div className="metric-item">
                <Brain className="metric-icon" />
                <div className="metric-data">
                  <span className="metric-label">Focus</span>
                  <div className="metric-bar">
                    <motion.div 
                      className="metric-fill focus"
                      initial={{ width: 0 }}
                      animate={{ width: `${brainState.focus * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="metric-value">{(brainState.focus * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="metric-item">
                <Waves className="metric-icon" />
                <div className="metric-data">
                  <span className="metric-label">Activity</span>
                  <div className="metric-bar">
                    <motion.div 
                      className="metric-fill activity"
                      animate={{ width: `${brainState.activity * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="metric-value">{(brainState.activity * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="metric-item">
                <Heart className="metric-icon" />
                <div className="metric-data">
                  <span className="metric-label">Relaxation</span>
                  <div className="metric-bar">
                    <motion.div 
                      className="metric-fill relaxation"
                      animate={{ width: `${brainState.relaxation * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="metric-value">{(brainState.relaxation * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="metric-item">
                <Zap className="metric-icon" />
                <div className="metric-data">
                  <span className="metric-label">Creativity</span>
                  <div className="metric-bar">
                    <motion.div 
                      className="metric-fill creativity"
                      animate={{ width: `${brainState.creativity * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="metric-value">{(brainState.creativity * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Neural Pattern Visualization */}
          <div className="neural-pattern">
            <div className="pattern-grid">
              {Array.from({ length: 25 }, (_, i) => (
                <motion.div
                  key={i}
                  className="pattern-dot"
                  animate={{
                    scale: [0.5, 1, 0.5],
                    opacity: [0.3, 1, 0.3],
                    backgroundColor: [
                      `rgba(0, 212, 255, ${brainState.focus})`,
                      `rgba(124, 58, 237, ${brainState.activity})`,
                      `rgba(0, 255, 136, ${brainState.relaxation})`
                    ]
                  }}
                  transition={{
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .simple-eeg-visualization {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border-primary);
        }

        .eeg-controls {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .control-section h3 {
          color: var(--neural-primary);
          margin-bottom: 12px;
          font-size: 1.125rem;
        }

        .wave-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .legend-color.alpha { background: #00d4ff; }
        .legend-color.beta { background: #7c3aed; }
        .legend-color.gamma { background: #ffffff; }
        .legend-color.theta { background: #00ff88; }

        .record-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--neural-primary);
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .record-btn.recording {
          background: var(--neural-error);
          animation: pulse 1s infinite;
        }

        .eeg-canvas-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .eeg-canvas {
          width: 100%;
          height: auto;
          display: block;
        }

        .canvas-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 20px;
        }

        .brain-metrics {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(15px);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-width: 250px;
        }

        .brain-metrics h4 {
          color: white;
          margin-bottom: 12px;
          font-size: 0.875rem;
        }

        .metrics-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .metric-icon {
          color: var(--neural-primary);
          flex-shrink: 0;
        }

        .metric-data {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .metric-label {
          color: white;
          font-size: 0.75rem;
          min-width: 60px;
        }

        .metric-bar {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .metric-fill {
          height: 100%;
          border-radius: 2px;
        }

        .metric-fill.focus { background: #00d4ff; }
        .metric-fill.activity { background: #7c3aed; }
        .metric-fill.relaxation { background: #00ff88; }
        .metric-fill.creativity { background: #ffa502; }

        .metric-value {
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          min-width: 30px;
          text-align: right;
        }

        .neural-pattern {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(15px);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .pattern-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
          width: 120px;
        }

        .pattern-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(0, 212, 255, 0.5);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 768px) {
          .eeg-controls {
            flex-direction: column;
            gap: 16px;
          }

          .wave-legend {
            justify-content: center;
          }

          .canvas-overlay {
            flex-direction: column;
            gap: 12px;
          }

          .brain-metrics,
          .neural-pattern {
            min-width: auto;
            max-width: none;
          }
        }
      `}</style>
    </div>
  )
}

export default SimpleEEGVisualization
