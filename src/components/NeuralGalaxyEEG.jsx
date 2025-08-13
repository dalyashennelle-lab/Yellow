import React, { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float, Text, Sphere, Line } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
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

// Neural Galaxy Particle System
const NeuralGalaxy = ({ eegData, brainState }) => {
  const pointsRef = useRef()
  const { size } = useThree()
  
  // Create neural constellation based on EEG data
  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const scales = new Float32Array(particleCount)
  
  // Generate galaxy-like distribution
  for (let i = 0; i < particleCount; i++) {
    // Spiral galaxy formation
    const radius = Math.random() * 8 + 2
    const angle = Math.random() * Math.PI * 2
    const spiral = i / particleCount * Math.PI * 4
    
    positions[i * 3] = Math.cos(angle + spiral) * radius
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2
    positions[i * 3 + 2] = Math.sin(angle + spiral) * radius
    
    // Color based on brain wave type
    const waveType = i % 5
    switch (waveType) {
      case 0: // Alpha - Blue
        colors[i * 3] = 0.2
        colors[i * 3 + 1] = 0.6
        colors[i * 3 + 2] = 1.0
        break
      case 1: // Beta - Purple
        colors[i * 3] = 0.7
        colors[i * 3 + 1] = 0.3
        colors[i * 3 + 2] = 1.0
        break
      case 2: // Gamma - White
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 1.0
        colors[i * 3 + 2] = 1.0
        break
      case 3: // Theta - Green
        colors[i * 3] = 0.2
        colors[i * 3 + 1] = 1.0
        colors[i * 3 + 2] = 0.4
        break
      case 4: // Delta - Orange
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.6
        colors[i * 3 + 2] = 0.2
        break
    }
    
    scales[i] = Math.random() * 2 + 0.5
  }

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotate the entire galaxy
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      
      // Animate based on EEG activity
      const positions = pointsRef.current.geometry.attributes.position.array
      const colors = pointsRef.current.geometry.attributes.color.array
      
      for (let i = 0; i < particleCount; i++) {
        // Pulsating effect based on brain activity
        const pulseIntensity = brainState.activity + Math.sin(state.clock.elapsedTime * 2 + i * 0.01) * 0.3
        
        // Modulate particle brightness
        const colorIndex = i * 3
        const baseR = colors[colorIndex]
        const baseG = colors[colorIndex + 1]
        const baseB = colors[colorIndex + 2]
        
        colors[colorIndex] = baseR * (0.5 + pulseIntensity * 0.5)
        colors[colorIndex + 1] = baseG * (0.5 + pulseIntensity * 0.5)
        colors[colorIndex + 2] = baseB * (0.5 + pulseIntensity * 0.5)
      }
      
      pointsRef.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Brain Region Nodes
const BrainRegionNode = ({ position, label, activity, color, pulseRate }) => {
  const meshRef = useRef()
  const textRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * pulseRate) * 0.2 * activity
      meshRef.current.scale.setScalar(pulse)
      
      // Glow effect based on activity
      meshRef.current.material.emissive.setRGB(
        color.r * activity * 0.3,
        color.g * activity * 0.3,
        color.b * activity * 0.3
      )
    }
  })

  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
        <Sphere ref={meshRef} args={[0.3, 16, 16]}>
          <meshStandardMaterial
            color={new THREE.Color(color.r, color.g, color.b)}
            transparent
            opacity={0.8}
            emissive={new THREE.Color(0, 0, 0)}
          />
        </Sphere>
        <Text
          ref={textRef}
          position={[0, 0.5, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </Float>
    </group>
  )
}

// Neural Connections
const NeuralConnections = ({ nodes, connectionStrength }) => {
  const linesRef = useRef([])

  useFrame((state) => {
    linesRef.current.forEach((line, i) => {
      if (line) {
        const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5
        line.material.opacity = connectionStrength * pulse * 0.3
      }
    })
  })

  return (
    <>
      {nodes.map((node, i) => 
        nodes.slice(i + 1).map((otherNode, j) => {
          const points = [
            new THREE.Vector3(...node.position),
            new THREE.Vector3(...otherNode.position)
          ]
          
          return (
            <Line
              key={`${i}-${j}`}
              ref={el => linesRef.current[i * nodes.length + j] = el}
              points={points}
              color="#00d4ff"
              lineWidth={1}
              transparent
              opacity={0.3}
            />
          )
        })
      )}
    </>
  )
}

const NeuralGalaxyEEG = ({ eegData, isRecording, onToggleRecording }) => {
  const [brainState, setBrainState] = useState({
    activity: 0.5,
    focus: 0.6,
    relaxation: 0.4,
    creativity: 0.7
  })

  const [galaxyMode, setGalaxyMode] = useState('constellation') // constellation, heatmap, flow
  const [selectedRegion, setSelectedRegion] = useState(null)

  // Brain region definitions
  const brainRegions = [
    {
      id: 'frontal',
      label: 'Frontal Cortex',
      position: [0, 2, 1],
      activity: brainState.focus,
      color: { r: 0, g: 0.8, b: 1 },
      pulseRate: 3
    },
    {
      id: 'parietal',
      label: 'Parietal Lobe',
      position: [-1.5, 1, -1],
      activity: brainState.activity,
      color: { r: 0.7, g: 0.3, b: 1 },
      pulseRate: 2.5
    },
    {
      id: 'temporal',
      label: 'Temporal Lobe',
      position: [1.5, 0, 0],
      activity: brainState.creativity,
      color: { r: 1, g: 0.6, b: 0.2 },
      pulseRate: 4
    },
    {
      id: 'occipital',
      label: 'Occipital Lobe',
      position: [0, 0, -2],
      activity: brainState.relaxation,
      color: { r: 0.2, g: 1, b: 0.4 },
      pulseRate: 1.5
    }
  ]

  // Simulate EEG data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRecording) {
        setBrainState(prev => ({
          activity: Math.max(0, Math.min(1, prev.activity + (Math.random() - 0.5) * 0.1)),
          focus: Math.max(0, Math.min(1, prev.focus + (Math.random() - 0.5) * 0.08)),
          relaxation: Math.max(0, Math.min(1, prev.relaxation + (Math.random() - 0.5) * 0.12)),
          creativity: Math.max(0, Math.min(1, prev.creativity + (Math.random() - 0.5) * 0.15))
        }))
      }
    }, 200)

    return () => clearInterval(interval)
  }, [isRecording])

  return (
    <div className="neural-galaxy-eeg">
      {/* Galaxy Control Panel */}
      <div className="galaxy-controls">
        <div className="control-section">
          <h3>Neural Galaxy View</h3>
          <div className="mode-selector">
            {['constellation', 'heatmap', 'flow'].map(mode => (
              <button
                key={mode}
                className={`mode-btn ${galaxyMode === mode ? 'active' : ''}`}
                onClick={() => setGalaxyMode(mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <div className="recording-controls">
            <button
              className={`record-btn ${isRecording ? 'recording' : ''}`}
              onClick={onToggleRecording}
            >
              {isRecording ? <Pause size={16} /> : <Play size={16} />}
              {isRecording ? 'Stop Galaxy' : 'Start Galaxy'}
            </button>
          </div>
        </div>
      </div>

      {/* 3D Neural Galaxy Canvas */}
      <div className="galaxy-canvas">
        <Canvas
          camera={{ position: [0, 5, 15], fov: 60 }}
          style={{ background: 'radial-gradient(circle, #0a0a0a 0%, #000000 100%)' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#7c3aed" />
          
          <Suspense fallback={null}>
            <NeuralGalaxy eegData={eegData} brainState={brainState} />
            
            {/* Brain Region Nodes */}
            {brainRegions.map(region => (
              <BrainRegionNode
                key={region.id}
                position={region.position}
                label={region.label}
                activity={region.activity}
                color={region.color}
                pulseRate={region.pulseRate}
              />
            ))}
            
            {/* Neural Connections */}
            <NeuralConnections 
              nodes={brainRegions} 
              connectionStrength={brainState.activity} 
            />
          </Suspense>
        </Canvas>

        {/* Overlay Information */}
        <div className="galaxy-overlay">
          <div className="brain-metrics">
            <h4>Real-time Neural Activity</h4>
            <div className="metrics-grid">
              <div className="metric-item">
                <Brain className="metric-icon" />
                <div className="metric-data">
                  <span className="metric-label">Focus</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill focus"
                      style={{ width: `${brainState.focus * 100}%` }}
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
                    <div 
                      className="metric-fill activity"
                      style={{ width: `${brainState.activity * 100}%` }}
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
                    <div 
                      className="metric-fill relaxation"
                      style={{ width: `${brainState.relaxation * 100}%` }}
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
                    <div 
                      className="metric-fill creativity"
                      style={{ width: `${brainState.creativity * 100}%` }}
                    />
                  </div>
                  <span className="metric-value">{(brainState.creativity * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="galaxy-legend">
            <h4>Neural Constellation Legend</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color alpha" />
                <span>Alpha Waves (8-13 Hz) - Relaxed Awareness</span>
              </div>
              <div className="legend-item">
                <div className="legend-color beta" />
                <span>Beta Waves (13-30 Hz) - Active Thinking</span>
              </div>
              <div className="legend-item">
                <div className="legend-color gamma" />
                <span>Gamma Waves (30+ Hz) - High Consciousness</span>
              </div>
              <div className="legend-item">
                <div className="legend-color theta" />
                <span>Theta Waves (4-8 Hz) - Deep Meditation</span>
              </div>
              <div className="legend-item">
                <div className="legend-color delta" />
                <span>Delta Waves (0.5-4 Hz) - Deep Sleep</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .neural-galaxy-eeg {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border-primary);
          overflow: hidden;
        }

        .galaxy-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .mode-selector {
          display: flex;
          gap: 8px;
        }

        .mode-btn {
          padding: 8px 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(0, 0, 0, 0.3);
          color: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }

        .mode-btn.active,
        .mode-btn:hover {
          background: var(--neural-primary);
          border-color: var(--neural-primary);
        }

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

        .galaxy-canvas {
          position: relative;
          height: 600px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .galaxy-overlay {
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
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: auto;
          min-width: 300px;
        }

        .brain-metrics h4 {
          color: white;
          margin-bottom: 16px;
          font-size: 1rem;
        }

        .metrics-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .metric-icon {
          color: var(--neural-primary);
          flex-shrink: 0;
        }

        .metric-data {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .metric-label {
          color: white;
          font-size: 0.875rem;
          min-width: 70px;
        }

        .metric-bar {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .metric-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .metric-fill.focus { background: #00d4ff; }
        .metric-fill.activity { background: #7c3aed; }
        .metric-fill.relaxation { background: #00ff88; }
        .metric-fill.creativity { background: #ffa502; }

        .metric-value {
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          min-width: 40px;
          text-align: right;
        }

        .galaxy-legend {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(15px);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: auto;
          max-width: 250px;
        }

        .galaxy-legend h4 {
          color: white;
          margin-bottom: 16px;
          font-size: 1rem;
        }

        .legend-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .legend-color.alpha { background: #00d4ff; }
        .legend-color.beta { background: #7c3aed; }
        .legend-color.gamma { background: #ffffff; }
        .legend-color.theta { background: #00ff88; }
        .legend-color.delta { background: #ffa502; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 768px) {
          .galaxy-controls {
            flex-direction: column;
            gap: 16px;
          }

          .galaxy-overlay {
            flex-direction: column;
            gap: 16px;
          }

          .brain-metrics,
          .galaxy-legend {
            min-width: auto;
            max-width: none;
          }

          .galaxy-canvas {
            height: 400px;
          }
        }
      `}</style>
    </div>
  )
}

export default NeuralGalaxyEEG
