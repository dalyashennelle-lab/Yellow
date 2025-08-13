import React, { useState, useEffect, useRef } from 'react'
import { 
  Cpu, 
  Layers, 
  Shuffle, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Maximize, 
  Eye,
  Zap,
  Brain,
  Network,
  Sparkles,
  Activity,
  TrendingUp,
  Target,
  Compass
} from 'lucide-react'

const NeuralNetworkLandscape = ({ brainwaveData, cognitiveState, onNeuralPathwayActivation }) => {
  const [landscapeMode, setLandscapeMode] = useState('memory-pathways') // memory-pathways, synaptic-forest, neural-galaxy, cognitive-maze
  const [isAnimating, setIsAnimating] = useState(true)
  const [viewAngle, setViewAngle] = useState({ x: 0, y: 0, z: 0 })
  const [neuralNodes, setNeuralNodes] = useState([])
  const [synapticConnections, setSynapticConnections] = useState([])
  const [activationPatterns, setActivationPatterns] = useState([])
  const [memoryPalaces, setMemoryPalaces] = useState([])
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Landscape configurations
  const landscapeConfigs = {
    'memory-pathways': {
      name: 'Memory Pathways',
      description: 'Hippocampal-inspired memory formation networks',
      color: '#4ecdc4',
      nodeCount: 150,
      connectionDensity: 0.3,
      dimensionality: '3D',
      icon: Brain
    },
    'synaptic-forest': {
      name: 'Synaptic Forest',
      description: 'Dendritic tree structures with neural growth patterns',
      color: '#45b7d1',
      nodeCount: 200,
      connectionDensity: 0.4,
      dimensionality: '3D',
      icon: Network
    },
    'neural-galaxy': {
      name: 'Neural Galaxy',
      description: 'Cosmic-scale brain network with interconnected clusters',
      color: '#8b5cf6',
      nodeCount: 300,
      connectionDensity: 0.2,
      dimensionality: '3D',
      icon: Sparkles
    },
    'cognitive-maze': {
      name: 'Cognitive Maze',
      description: 'Problem-solving pathways with adaptive routing',
      color: '#f59e0b',
      nodeCount: 100,
      connectionDensity: 0.5,
      dimensionality: '3D',
      icon: Compass
    }
  }

  // Initialize neural landscape
  useEffect(() => {
    generateNeuralLandscape()
  }, [landscapeMode])

  // Update landscape based on brainwave data
  useEffect(() => {
    if (brainwaveData && isAnimating) {
      updateNeuralActivity(brainwaveData)
    }
  }, [brainwaveData, isAnimating])

  // Animation loop
  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        renderNeuralLandscape()
        animationRef.current = requestAnimationFrame(animate)
      }
      animate()
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, neuralNodes, synapticConnections, activationPatterns, viewAngle])

  const generateNeuralLandscape = () => {
    const config = landscapeConfigs[landscapeMode]
    const nodes = []
    const connections = []
    const patterns = []
    const palaces = []

    // Generate neural nodes with 3D positioning
    for (let i = 0; i < config.nodeCount; i++) {
      const node = {
        id: i,
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        z: (Math.random() - 0.5) * 400,
        size: 3 + Math.random() * 5,
        activation: 0,
        type: getNodeType(i, config.nodeCount),
        connections: [],
        memoryStrength: Math.random(),
        plasticity: 0.5 + Math.random() * 0.5,
        frequency: 1 + Math.random() * 10
      }
      nodes.push(node)
    }

    // Generate synaptic connections
    nodes.forEach((node, index) => {
      const connectionCount = Math.floor(config.connectionDensity * config.nodeCount * 0.1)
      for (let i = 0; i < connectionCount; i++) {
        const targetIndex = Math.floor(Math.random() * config.nodeCount)
        if (targetIndex !== index && !node.connections.includes(targetIndex)) {
          const target = nodes[targetIndex]
          const distance = Math.sqrt(
            Math.pow(node.x - target.x, 2) + 
            Math.pow(node.y - target.y, 2) + 
            Math.pow(node.z - target.z, 2)
          )
          
          if (distance < 300) { // Only connect nearby nodes
            const connection = {
              id: `${index}-${targetIndex}`,
              from: index,
              to: targetIndex,
              strength: Math.random(),
              conductivity: 0.5 + Math.random() * 0.5,
              myelination: Math.random() > 0.7,
              activation: 0,
              type: getConnectionType()
            }
            connections.push(connection)
            node.connections.push(targetIndex)
          }
        }
      }
    })

    // Generate activation patterns based on landscape type
    for (let i = 0; i < 10; i++) {
      patterns.push({
        id: i,
        nodes: nodes.slice(i * 15, (i + 1) * 15).map(n => n.id),
        pattern: generateActivationPattern(),
        frequency: 1 + Math.random() * 5,
        amplitude: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2
      })
    }

    // Generate memory palaces for memory-pathways mode
    if (landscapeMode === 'memory-pathways') {
      for (let i = 0; i < 5; i++) {
        palaces.push({
          id: i,
          center: {
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 400,
            z: (Math.random() - 0.5) * 300
          },
          radius: 50 + Math.random() * 100,
          memoryType: ['episodic', 'semantic', 'procedural', 'working', 'sensory'][i],
          strength: Math.random(),
          accessibility: 0.7 + Math.random() * 0.3
        })
      }
    }

    setNeuralNodes(nodes)
    setSynapticConnections(connections)
    setActivationPatterns(patterns)
    setMemoryPalaces(palaces)
  }

  const getNodeType = (index, total) => {
    const ratio = index / total
    if (ratio < 0.3) return 'sensory'
    if (ratio < 0.6) return 'processing'
    if (ratio < 0.85) return 'integration'
    return 'output'
  }

  const getConnectionType = () => {
    const types = ['excitatory', 'inhibitory', 'modulatory']
    return types[Math.floor(Math.random() * types.length)]
  }

  const generateActivationPattern = () => {
    const patterns = ['wave', 'spiral', 'burst', 'ripple', 'cascade']
    return patterns[Math.floor(Math.random() * patterns.length)]
  }

  const updateNeuralActivity = (brainwaves) => {
    const timestamp = Date.now()
    
    // Update node activations based on brainwave data
    setNeuralNodes(prev => prev.map(node => {
      let activation = 0
      
      // Calculate activation based on brainwave frequencies
      Object.entries(brainwaves).forEach(([band, data]) => {
        const frequencyMatch = Math.exp(-Math.abs(node.frequency - data.frequency) / 5)
        activation += data.amplitude * frequencyMatch * 0.01
      })
      
      // Add temporal oscillation
      activation += Math.sin(timestamp * 0.001 * node.frequency) * 0.3
      
      // Apply plasticity
      const newActivation = node.activation * (1 - node.plasticity) + activation * node.plasticity
      
      return {
        ...node,
        activation: Math.max(0, Math.min(1, newActivation))
      }
    }))
    
    // Update connection activations
    setSynapticConnections(prev => prev.map(conn => {
      const fromNode = neuralNodes[conn.from]
      const toNode = neuralNodes[conn.to]
      
      if (fromNode && toNode) {
        const activation = fromNode.activation * conn.conductivity * conn.strength
        return {
          ...conn,
          activation: Math.max(0, Math.min(1, activation))
        }
      }
      return conn
    }))
  }

  const renderNeuralLandscape = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, width, height)
    
    // Apply 3D transformation matrix
    const centerX = width / 2
    const centerY = height / 2
    const rotX = viewAngle.x + Date.now() * 0.0001
    const rotY = viewAngle.y + Date.now() * 0.0002
    
    // Draw synaptic connections first (behind nodes)
    synapticConnections.forEach(conn => {
      const fromNode = neuralNodes[conn.from]
      const toNode = neuralNodes[conn.to]
      
      if (fromNode && toNode && conn.activation > 0.1) {
        const from2D = project3D(fromNode, centerX, centerY, rotX, rotY)
        const to2D = project3D(toNode, centerX, centerY, rotX, rotY)
        
        ctx.beginPath()
        ctx.moveTo(from2D.x, from2D.y)
        ctx.lineTo(to2D.x, to2D.y)
        
        const opacity = conn.activation * 0.8
        const color = getConnectionColor(conn.type)
        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
        ctx.lineWidth = conn.myelination ? 2 : 1
        ctx.stroke()
      }
    })
    
    // Draw neural nodes
    neuralNodes.forEach(node => {
      const pos2D = project3D(node, centerX, centerY, rotX, rotY)
      
      if (pos2D.z > 0) { // Only draw nodes in front
        const size = node.size * (1 + node.activation) * pos2D.scale
        const color = getNodeColor(node.type, node.activation)
        
        // Node glow effect
        if (node.activation > 0.3) {
          const gradient = ctx.createRadialGradient(pos2D.x, pos2D.y, 0, pos2D.x, pos2D.y, size * 3)
          gradient.addColorStop(0, `${color}40`)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(pos2D.x, pos2D.y, size * 3, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Node core
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(pos2D.x, pos2D.y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    })
    
    // Draw memory palaces for memory-pathways mode
    if (landscapeMode === 'memory-pathways') {
      memoryPalaces.forEach(palace => {
        const pos2D = project3D(palace.center, centerX, centerY, rotX, rotY)
        
        if (pos2D.z > 0) {
          const radius = palace.radius * pos2D.scale
          const alpha = Math.floor(palace.strength * 50).toString(16).padStart(2, '0')
          
          ctx.strokeStyle = `#4ecdc4${alpha}`
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.arc(pos2D.x, pos2D.y, radius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.setLineDash([])
          
          // Palace label
          ctx.fillStyle = '#4ecdc4'
          ctx.font = '12px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(palace.memoryType, pos2D.x, pos2D.y - radius - 10)
        }
      })
    }
  }

  const project3D = (point, centerX, centerY, rotX, rotY) => {
    // 3D to 2D projection with rotation
    const distance = 800
    
    // Apply rotations
    const cosX = Math.cos(rotX)
    const sinX = Math.sin(rotX)
    const cosY = Math.cos(rotY)
    const sinY = Math.sin(rotY)
    
    // Rotate around X axis
    const y1 = point.y * cosX - point.z * sinX
    const z1 = point.y * sinX + point.z * cosX
    
    // Rotate around Y axis
    const x2 = point.x * cosY + z1 * sinY
    const z2 = -point.x * sinY + z1 * cosY
    
    // Project to 2D
    const scale = distance / (distance + z2)
    const x = centerX + x2 * scale
    const y = centerY + y1 * scale
    
    return { x, y, z: z2, scale }
  }

  const getNodeColor = (type, activation) => {
    const colors = {
      sensory: '#ff6b9d',
      processing: '#4ecdc4',
      integration: '#45b7d1',
      output: '#f9ca24'
    }
    const baseColor = colors[type] || '#ffffff'
    const intensity = Math.floor((0.5 + activation * 0.5) * 255).toString(16).padStart(2, '0')
    return `${baseColor}${intensity}`
  }

  const getConnectionColor = (type) => {
    const colors = {
      excitatory: '#00ff88',
      inhibitory: '#ff4444',
      modulatory: '#ffaa00'
    }
    return colors[type] || '#ffffff'
  }

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    mouseRef.current = { x, y }
    
    // Update view angle based on mouse position
    setViewAngle(prev => ({
      x: (y - rect.height / 2) * 0.001,
      y: (x - rect.width / 2) * 0.001,
      z: prev.z
    }))
  }

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Check for node clicks and activate neural pathways
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotX = viewAngle.x
    const rotY = viewAngle.y
    
    neuralNodes.forEach(node => {
      const pos2D = project3D(node, centerX, centerY, rotX, rotY)
      const distance = Math.sqrt(Math.pow(x - pos2D.x, 2) + Math.pow(y - pos2D.y, 2))
      
      if (distance < node.size * (1 + node.activation)) {
        onNeuralPathwayActivation?.(node)
        
        // Trigger activation cascade
        setTimeout(() => {
          const activationWave = neuralNodes.filter(n => 
            Math.sqrt(
              Math.pow(n.x - node.x, 2) + 
              Math.pow(n.y - node.y, 2) + 
              Math.pow(n.z - node.z, 2)
            ) < 150
          )
          
          activationWave.forEach(n => {
            n.activation = Math.min(1, n.activation + 0.5)
          })
        }, 100)
      }
    })
  }

  return (
    <div className="neural-network-landscape">
      {/* Controls Header */}
      <div className="landscape-controls">
        <div className="mode-selector">
          <select 
            value={landscapeMode} 
            onChange={(e) => setLandscapeMode(e.target.value)}
            className="mode-select"
          >
            {Object.entries(landscapeConfigs).map(([key, config]) => (
              <option key={key} value={key}>{config.name}</option>
            ))}
          </select>
        </div>
        
        <div className="landscape-info">
          <div className="info-item">
            <Layers size={16} />
            <span>{landscapeConfigs[landscapeMode].nodeCount} Neurons</span>
          </div>
          <div className="info-item">
            <Network size={16} />
            <span>{Math.floor(landscapeConfigs[landscapeMode].connectionDensity * 100)}% Connectivity</span>
          </div>
          <div className="info-item">
            <Cpu size={16} />
            <span>{landscapeConfigs[landscapeMode].dimensionality}</span>
          </div>
        </div>

        <div className="control-buttons">
          <button 
            className={`control-btn ${isAnimating ? 'active' : ''}`}
            onClick={() => setIsAnimating(!isAnimating)}
          >
            {isAnimating ? <Pause size={16} /> : <Play size={16} />}
            {isAnimating ? 'Pause' : 'Play'}
          </button>
          
          <button 
            className="control-btn"
            onClick={generateNeuralLandscape}
          >
            <Shuffle size={16} />
            Regenerate
          </button>
          
          <button 
            className="control-btn"
            onClick={() => setViewAngle({ x: 0, y: 0, z: 0 })}
          >
            <RotateCcw size={16} />
            Reset View
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="neural-canvas"
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
        />
        
        <div className="canvas-overlay">
          <div className="landscape-title">
            <div 
              className="title-icon"
              style={{ background: landscapeConfigs[landscapeMode].color }}
            >
              <landscapeConfigs[landscapeMode].icon size={20} />
            </div>
            <div>
              <h3>{landscapeConfigs[landscapeMode].name}</h3>
              <p>{landscapeConfigs[landscapeMode].description}</p>
            </div>
          </div>
          
          <div className="interaction-hints">
            <div className="hint">
              <Eye size={16} />
              <span>Move mouse to rotate view</span>
            </div>
            <div className="hint">
              <Target size={16} />
              <span>Click neurons to activate pathways</span>
            </div>
          </div>
        </div>
      </div>

      {/* Landscape Statistics */}
      <div className="landscape-stats">
        <div className="stat-category">
          <h4>Network Activity</h4>
          <div className="stat-grid">
            <div className="stat-item">
              <Activity size={16} />
              <span>Active Nodes</span>
              <span className="stat-value">
                {neuralNodes.filter(n => n.activation > 0.3).length}
              </span>
            </div>
            <div className="stat-item">
              <Zap size={16} />
              <span>Active Connections</span>
              <span className="stat-value">
                {synapticConnections.filter(c => c.activation > 0.1).length}
              </span>
            </div>
            <div className="stat-item">
              <TrendingUp size={16} />
              <span>Network Coherence</span>
              <span className="stat-value">
                {((neuralNodes.filter(n => n.activation > 0.3).length / neuralNodes.length) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        <div className="node-types">
          <h4>Node Distribution</h4>
          <div className="type-legend">
            <div className="type-item">
              <div className="type-color" style={{ background: '#ff6b9d' }}></div>
              <span>Sensory</span>
            </div>
            <div className="type-item">
              <div className="type-color" style={{ background: '#4ecdc4' }}></div>
              <span>Processing</span>
            </div>
            <div className="type-item">
              <div className="type-color" style={{ background: '#45b7d1' }}></div>
              <span>Integration</span>
            </div>
            <div className="type-item">
              <div className="type-color" style={{ background: '#f9ca24' }}></div>
              <span>Output</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .neural-network-landscape {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border-primary);
        }

        .landscape-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 20px;
          flex-wrap: wrap;
        }

        .mode-select {
          padding: 8px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .landscape-info {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .control-buttons {
          display: flex;
          gap: 8px;
        }

        .control-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-btn:hover {
          background: var(--neural-primary);
          color: white;
          border-color: var(--neural-primary);
        }

        .control-btn.active {
          background: var(--neural-success);
          color: white;
          border-color: var(--neural-success);
        }

        .canvas-container {
          position: relative;
          background: var(--bg-primary);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .neural-canvas {
          width: 100%;
          height: auto;
          cursor: crosshair;
          display: block;
        }

        .canvas-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .landscape-title {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0, 0, 0, 0.7);
          padding: 12px 16px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .title-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .landscape-title h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin-bottom: 2px;
        }

        .landscape-title p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .interaction-hints {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hint {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.7);
          padding: 8px 12px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .landscape-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .stat-category h4,
        .node-types h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .stat-grid {
          display: grid;
          gap: 12px;
        }

        .stat-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 8px;
          align-items: center;
          padding: 8px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .stat-value {
          color: var(--text-primary);
          font-weight: 600;
        }

        .type-legend {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .type-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .type-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .landscape-controls {
            flex-direction: column;
            gap: 16px;
          }

          .landscape-info {
            justify-content: center;
          }

          .canvas-overlay {
            flex-direction: column;
            gap: 16px;
          }

          .landscape-stats {
            grid-template-columns: 1fr;
          }

          .type-legend {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default NeuralNetworkLandscape