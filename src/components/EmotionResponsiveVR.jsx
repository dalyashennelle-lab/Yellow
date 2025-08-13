import React, { useState, useEffect, useRef } from 'react'
import { 
  Glasses, 
  Eye, 
  Heart, 
  Brain, 
  Palette, 
  Volume2, 
  Thermometer, 
  Wind,
  Cloud,
  Sun,
  Moon,
  Sparkles,
  Activity,
  Waves,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Headphones,
  Smartphone,
  Monitor
} from 'lucide-react'
import YouTubePlayer from './YouTubePlayer'

const EmotionResponsiveVR = ({ emotionalData, eegData, biometricData, onEnvironmentChange }) => {
  const [vrMode, setVrMode] = useState('immersive') // preview, immersive, ar, mixed-reality
  const [currentEnvironment, setCurrentEnvironment] = useState('adaptive-forest')
  const [emotionMapping, setEmotionMapping] = useState({
    stress: { color: '#ff4757', intensity: 0, trigger: 0.7 },
    calm: { color: '#2ed573', intensity: 0, trigger: 0.6 },
    focus: { color: '#3742fa', intensity: 0, trigger: 0.8 },
    creativity: { color: '#ffa502', intensity: 0, trigger: 0.7 },
    excitement: { color: '#ff6b9d', intensity: 0, trigger: 0.75 },
    drowsiness: { color: '#706fd3', intensity: 0, trigger: 0.5 }
  })
  const [environmentState, setEnvironmentState] = useState({
    ambientLight: 0.7,
    colorTemperature: 6500,
    particleDensity: 0.5,
    audioVolume: 0.6,
    weatherPattern: 'clear',
    timeOfDay: 'day',
    interactionLevel: 'medium'
  })
  const [responsiveElements, setResponsiveElements] = useState([])
  const [arOverlays, setArOverlays] = useState([])
  const canvasRef = useRef(null)
  const vrSessionRef = useRef(null)

  // VR/AR Environment Configurations
  const environments = {
    'adaptive-forest': {
      name: 'Adaptive Neural Forest',
      description: 'Forest environment that changes based on emotional state',
      baseColor: '#2d5a27',
      elements: ['trees', 'leaves', 'animals', 'wind', 'sunlight'],
      emotionEffects: {
        stress: { trees: 'wilt', wind: 'strong', lighting: 'dim' },
        calm: { trees: 'flourish', wind: 'gentle', lighting: 'warm' },
        focus: { trees: 'straight', wind: 'still', lighting: 'bright' }
      },
      vrSupport: true,
      arSupport: true
    },
    'ocean-depths': {
      name: 'Responsive Ocean Sanctuary',
      description: 'Underwater world with emotion-driven currents and life',
      baseColor: '#006ba6',
      elements: ['water', 'fish', 'coral', 'currents', 'bioluminescence'],
      emotionEffects: {
        stress: { currents: 'turbulent', coral: 'pale', fish: 'scattered' },
        calm: { currents: 'smooth', coral: 'vibrant', fish: 'schooling' },
        creativity: { bioluminescence: 'active', coral: 'colorful', currents: 'spiral' }
      },
      vrSupport: true,
      arSupport: false
    },
    'cosmic-mindscape': {
      name: 'Cosmic Neural Network',
      description: 'Space environment with star formations reflecting brain activity',
      baseColor: '#2c2c54',
      elements: ['stars', 'nebulae', 'planets', 'energy', 'galaxies'],
      emotionEffects: {
        excitement: { stars: 'bright', energy: 'pulsing', nebulae: 'active' },
        focus: { stars: 'aligned', energy: 'focused', galaxies: 'ordered' },
        drowsiness: { stars: 'dim', energy: 'slow', nebulae: 'fading' }
      },
      vrSupport: true,
      arSupport: true
    },
    'zen-garden': {
      name: 'Responsive Zen Garden',
      description: 'Minimalist garden responding to meditation states',
      baseColor: '#d4a574',
      elements: ['sand', 'rocks', 'water', 'bamboo', 'cherry-blossoms'],
      emotionEffects: {
        calm: { sand: 'smooth', water: 'still', blossoms: 'blooming' },
        stress: { sand: 'rough', water: 'rippled', bamboo: 'swaying' },
        creativity: { sand: 'patterns', water: 'flowing', blossoms: 'falling' }
      },
      vrSupport: true,
      arSupport: true
    }
  }

  // Initialize VR/AR system
  useEffect(() => {
    initializeVRSystem()
    return () => {
      if (vrSessionRef.current) {
        vrSessionRef.current.end()
      }
    }
  }, [vrMode])

  // Process emotional data and update environment
  useEffect(() => {
    if (emotionalData || eegData || biometricData) {
      processEmotionalInput()
    }
  }, [emotionalData, eegData, biometricData])

  // Render loop
  useEffect(() => {
    const animate = () => {
      renderEnvironment()
      requestAnimationFrame(animate)
    }
    animate()
  }, [environmentState, responsiveElements])

  const initializeVRSystem = async () => {
    if ('xr' in navigator && vrMode === 'immersive') {
      try {
        const isSupported = await navigator.xr.isSessionSupported('immersive-vr')
        if (isSupported) {
          console.log('VR supported')
          // Initialize VR session
          initializeVRSession()
        }
      } catch (error) {
        console.log('VR not available, using simulation')
      }
    }
    
    if (vrMode === 'ar') {
      initializeARSystem()
    }
    
    generateResponsiveElements()
  }

  const initializeVRSession = async () => {
    try {
      const session = await navigator.xr.requestSession('immersive-vr')
      vrSessionRef.current = session
      
      session.addEventListener('end', () => {
        vrSessionRef.current = null
      })
      
      // Set up WebGL context for VR
      const canvas = canvasRef.current
      const gl = canvas.getContext('webgl', { xrCompatible: true })
      
      console.log('VR session initialized')
    } catch (error) {
      console.error('VR session failed:', error)
    }
  }

  const initializeARSystem = () => {
    // Initialize AR overlays
    const overlays = [
      {
        id: 'emotion-indicator',
        type: 'emotion-visualization',
        position: { x: 0.1, y: 0.9 },
        size: { width: 0.2, height: 0.1 },
        visible: true
      },
      {
        id: 'brainwave-display',
        type: 'realtime-graph',
        position: { x: 0.7, y: 0.1 },
        size: { width: 0.25, height: 0.15 },
        visible: true
      },
      {
        id: 'environmental-controls',
        type: 'interactive-panel',
        position: { x: 0.05, y: 0.5 },
        size: { width: 0.15, height: 0.4 },
        visible: false
      }
    ]
    
    setArOverlays(overlays)
  }

  const processEmotionalInput = () => {
    const emotions = { ...emotionMapping }
    
    // Process EEG data for emotional states
    if (eegData) {
      emotions.stress.intensity = Math.min(1, eegData.beta?.power / 50 || 0)
      emotions.calm.intensity = Math.min(1, eegData.alpha?.power / 60 || 0)
      emotions.focus.intensity = Math.min(1, (eegData.beta?.power + eegData.gamma?.power) / 80 || 0)
      emotions.creativity.intensity = Math.min(1, eegData.theta?.power / 40 || 0)
      emotions.drowsiness.intensity = Math.min(1, eegData.delta?.power / 35 || 0)
    }
    
    // Process emotional data
    if (emotionalData) {
      emotions.excitement.intensity = emotionalData.arousal || 0
      emotions.calm.intensity = Math.max(emotions.calm.intensity, emotionalData.valence || 0)
    }
    
    // Process biometric data
    if (biometricData) {
      const stressFromHR = biometricData.heartRate > 80 ? (biometricData.heartRate - 80) / 40 : 0
      emotions.stress.intensity = Math.max(emotions.stress.intensity, stressFromHR)
    }
    
    setEmotionMapping(emotions)
    
    // Update environment based on dominant emotion
    updateEnvironmentState(emotions)
  }

  const updateEnvironmentState = (emotions) => {
    const dominantEmotion = Object.entries(emotions)
      .reduce((max, [emotion, data]) => 
        data.intensity > max.intensity ? { emotion, ...data } : max,
        { emotion: 'neutral', intensity: 0 }
      )
    
    const environment = environments[currentEnvironment]
    const effects = environment.emotionEffects[dominantEmotion.emotion]
    
    if (effects) {
      setEnvironmentState(prev => {
        const newState = { ...prev }
        
        // Apply emotion-specific effects
        switch (dominantEmotion.emotion) {
          case 'stress':
            newState.ambientLight = Math.max(0.3, prev.ambientLight - 0.1)
            newState.colorTemperature = Math.max(3000, prev.colorTemperature - 200)
            newState.weatherPattern = 'stormy'
            newState.particleDensity = Math.min(1, prev.particleDensity + 0.2)
            break
            
          case 'calm':
            newState.ambientLight = Math.min(0.8, prev.ambientLight + 0.05)
            newState.colorTemperature = Math.min(7000, prev.colorTemperature + 100)
            newState.weatherPattern = 'clear'
            newState.particleDensity = Math.max(0.2, prev.particleDensity - 0.1)
            break
            
          case 'focus':
            newState.ambientLight = 0.9
            newState.colorTemperature = 6500
            newState.weatherPattern = 'clear'
            newState.particleDensity = 0.3
            break
            
          case 'creativity':
            newState.colorTemperature = 5500
            newState.particleDensity = Math.min(0.8, prev.particleDensity + 0.15)
            newState.weatherPattern = 'dynamic'
            break
            
          case 'excitement':
            newState.ambientLight = Math.min(1, prev.ambientLight + 0.1)
            newState.particleDensity = Math.min(1, prev.particleDensity + 0.3)
            newState.weatherPattern = 'energetic'
            break
            
          case 'drowsiness':
            newState.ambientLight = Math.max(0.4, prev.ambientLight - 0.15)
            newState.colorTemperature = Math.max(2700, prev.colorTemperature - 300)
            newState.weatherPattern = 'misty'
            break
        }
        
        return newState
      })
    }
    
    // Notify parent of environment change
    onEnvironmentChange?.(dominantEmotion, environmentState)
  }

  const generateResponsiveElements = () => {
    const environment = environments[currentEnvironment]
    const elements = []
    
    environment.elements.forEach(elementType => {
      for (let i = 0; i < 20; i++) {
        elements.push({
          id: `${elementType}_${i}`,
          type: elementType,
          position: {
            x: (Math.random() - 0.5) * 1000,
            y: (Math.random() - 0.5) * 800,
            z: (Math.random() - 0.5) * 600
          },
          properties: {
            scale: 0.5 + Math.random() * 1.5,
            rotation: Math.random() * Math.PI * 2,
            opacity: 0.5 + Math.random() * 0.5,
            color: environment.baseColor,
            emotionSensitivity: Math.random()
          },
          animation: {
            speed: 0.5 + Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
            amplitude: 10 + Math.random() * 20
          }
        })
      }
    })
    
    setResponsiveElements(elements)
  }

  const renderEnvironment = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    
    // Clear with environment-appropriate background
    const bgColor = calculateBackgroundColor()
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)
    
    // Render responsive elements
    responsiveElements.forEach(element => {
      renderElement(ctx, element, width, height)
    })
    
    // Render AR overlays if in AR mode
    if (vrMode === 'ar') {
      renderAROverlays(ctx, width, height)
    }
    
    // Render emotion visualization
    renderEmotionVisualization(ctx, width, height)
  }

  const calculateBackgroundColor = () => {
    const dominantEmotion = Object.entries(emotionMapping)
      .reduce((max, [emotion, data]) => 
        data.intensity > max.intensity ? { emotion, ...data } : max,
        { emotion: 'neutral', intensity: 0, color: '#0a0a0f' }
      )
    
    const baseColor = environments[currentEnvironment].baseColor
    const emotionColor = dominantEmotion.color
    const intensity = dominantEmotion.intensity
    
    // Blend base environment color with emotion color
    return blendColors(baseColor, emotionColor, intensity * 0.3)
  }

  const blendColors = (color1, color2, ratio) => {
    const hex1 = color1.slice(1)
    const hex2 = color2.slice(1)
    
    const r1 = parseInt(hex1.slice(0, 2), 16)
    const g1 = parseInt(hex1.slice(2, 4), 16)
    const b1 = parseInt(hex1.slice(4, 6), 16)
    
    const r2 = parseInt(hex2.slice(0, 2), 16)
    const g2 = parseInt(hex2.slice(2, 4), 16)
    const b2 = parseInt(hex2.slice(4, 6), 16)
    
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio)
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio)
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio)
    
    return `rgb(${r}, ${g}, ${b})`
  }

  const renderElement = (ctx, element, width, height) => {
    const centerX = width / 2
    const centerY = height / 2
    
    // Apply emotion-based transformations
    const emotionScale = getEmotionScale(element)
    const emotionOpacity = getEmotionOpacity(element)
    const emotionColor = getEmotionColor(element)
    
    // Calculate position with perspective
    const perspective = 800
    const scale = perspective / (perspective + element.position.z)
    const x = centerX + element.position.x * scale
    const y = centerY + element.position.y * scale
    
    // Apply animation
    const time = Date.now() * 0.001
    const animatedX = x + Math.sin(time * element.animation.speed + element.animation.phase) * element.animation.amplitude * scale
    const animatedY = y + Math.cos(time * element.animation.speed + element.animation.phase) * element.animation.amplitude * 0.5 * scale
    
    ctx.save()
    ctx.globalAlpha = emotionOpacity * element.properties.opacity
    ctx.fillStyle = emotionColor
    
    // Render different element types
    switch (element.type) {
      case 'trees':
        renderTree(ctx, animatedX, animatedY, element.properties.scale * emotionScale * scale)
        break
      case 'water':
        renderWater(ctx, animatedX, animatedY, element.properties.scale * emotionScale * scale)
        break
      case 'stars':
        renderStar(ctx, animatedX, animatedY, element.properties.scale * emotionScale * scale)
        break
      case 'particles':
        renderParticle(ctx, animatedX, animatedY, element.properties.scale * emotionScale * scale)
        break
      default:
        renderGeneric(ctx, animatedX, animatedY, element.properties.scale * emotionScale * scale)
    }
    
    ctx.restore()
  }

  const getEmotionScale = (element) => {
    let scale = 1
    Object.entries(emotionMapping).forEach(([emotion, data]) => {
      if (data.intensity > 0.5) {
        scale *= (1 + data.intensity * element.properties.emotionSensitivity * 0.5)
      }
    })
    return Math.max(0.1, Math.min(3, scale))
  }

  const getEmotionOpacity = (element) => {
    const stressIntensity = emotionMapping.stress.intensity
    const calmIntensity = emotionMapping.calm.intensity
    
    let opacity = 1
    if (stressIntensity > 0.7) {
      opacity *= (1 - stressIntensity * 0.3)
    }
    if (calmIntensity > 0.6) {
      opacity *= (1 + calmIntensity * 0.2)
    }
    
    return Math.max(0.1, Math.min(1, opacity))
  }

  const getEmotionColor = (element) => {
    const dominantEmotion = Object.entries(emotionMapping)
      .reduce((max, [emotion, data]) => 
        data.intensity > max.intensity ? { emotion, ...data } : max,
        { emotion: 'neutral', intensity: 0, color: element.properties.color }
      )
    
    if (dominantEmotion.intensity > 0.3) {
      return blendColors(element.properties.color, dominantEmotion.color, dominantEmotion.intensity * 0.4)
    }
    
    return element.properties.color
  }

  const renderTree = (ctx, x, y, scale) => {
    // Simple tree representation
    ctx.beginPath()
    ctx.arc(x, y - 20 * scale, 15 * scale, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillRect(x - 3 * scale, y - 5 * scale, 6 * scale, 25 * scale)
  }

  const renderWater = (ctx, x, y, scale) => {
    // Water ripple effect
    ctx.beginPath()
    ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
    ctx.globalAlpha *= 0.3
    ctx.fill()
  }

  const renderStar = (ctx, x, y, scale) => {
    // Star shape
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5
      const outerRadius = 8 * scale
      const innerRadius = 3 * scale
      
      const outerX = x + Math.cos(angle) * outerRadius
      const outerY = y + Math.sin(angle) * outerRadius
      const innerX = x + Math.cos(angle + Math.PI / 5) * innerRadius
      const innerY = y + Math.sin(angle + Math.PI / 5) * innerRadius
      
      if (i === 0) ctx.moveTo(outerX, outerY)
      else ctx.lineTo(outerX, outerY)
      ctx.lineTo(innerX, innerY)
    }
    ctx.closePath()
    ctx.fill()
  }

  const renderParticle = (ctx, x, y, scale) => {
    ctx.beginPath()
    ctx.arc(x, y, 2 * scale, 0, Math.PI * 2)
    ctx.fill()
  }

  const renderGeneric = (ctx, x, y, scale) => {
    ctx.beginPath()
    ctx.arc(x, y, 5 * scale, 0, Math.PI * 2)
    ctx.fill()
  }

  const renderAROverlays = (ctx, width, height) => {
    arOverlays.forEach(overlay => {
      if (!overlay.visible) return
      
      const x = overlay.position.x * width
      const y = overlay.position.y * height
      const w = overlay.size.width * width
      const h = overlay.size.height * height
      
      ctx.save()
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(x, y, w, h)
      
      ctx.strokeStyle = 'var(--neural-primary)'
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, w, h)
      
      ctx.fillStyle = 'white'
      ctx.font = '12px Arial'
      ctx.fillText(overlay.type, x + 8, y + 20)
      
      ctx.restore()
    })
  }

  const renderEmotionVisualization = (ctx, width, height) => {
    const emotionBarHeight = 60
    const emotionBarY = height - emotionBarHeight - 20
    
    ctx.save()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(20, emotionBarY, width - 40, emotionBarHeight)
    
    const emotionWidth = (width - 80) / Object.keys(emotionMapping).length
    
    Object.entries(emotionMapping).forEach(([emotion, data], index) => {
      const x = 40 + index * emotionWidth
      const barHeight = data.intensity * (emotionBarHeight - 20)
      
      ctx.fillStyle = data.color
      ctx.fillRect(x, emotionBarY + emotionBarHeight - 10 - barHeight, emotionWidth - 10, barHeight)
      
      ctx.fillStyle = 'white'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(emotion, x + emotionWidth / 2, emotionBarY + emotionBarHeight - 5)
    })
    
    ctx.restore()
  }

  return (
    <div className="emotion-responsive-vr">
      {/* Controls Header */}
      <div className="vr-controls">
        <div className="mode-selector">
          <select 
            value={vrMode} 
            onChange={(e) => setVrMode(e.target.value)}
            className="mode-select"
          >
            <option value="preview">Preview</option>
            <option value="immersive">Immersive VR</option>
            <option value="ar">Augmented Reality</option>
            <option value="mixed-reality">Mixed Reality</option>
          </select>
        </div>
        
        <div className="environment-selector">
          <select 
            value={currentEnvironment} 
            onChange={(e) => setCurrentEnvironment(e.target.value)}
            className="env-select"
          >
            {Object.entries(environments).map(([key, env]) => (
              <option key={key} value={key}>{env.name}</option>
            ))}
          </select>
        </div>
        
        <div className="vr-status">
          <div className="status-indicator">
            <Glasses size={16} />
            <span>{vrMode.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* VR Canvas */}
      <div className="vr-canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="vr-canvas"
        />
        
        <div className="canvas-controls">
          <div className="environment-info">
            <h4>{environments[currentEnvironment].name}</h4>
            <p>{environments[currentEnvironment].description}</p>
          </div>
          
          <div className="realtime-metrics">
            <div className="metric-item">
              <Eye size={16} />
              <span>Immersion: {((environmentState.ambientLight + environmentState.particleDensity) * 50).toFixed(0)}%</span>
            </div>
            <div className="metric-item">
              <Heart size={16} />
              <span>Comfort: {((2 - emotionMapping.stress.intensity) * 50).toFixed(0)}%</span>
            </div>
            <div className="metric-item">
              <Brain size={16} />
              <span>Engagement: {(emotionMapping.focus.intensity * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Environment State */}
      <div className="environment-state">
        <h4>Environment Responsiveness</h4>
        <div className="state-grid">
          <div className="state-card">
            <div className="state-header">
              <Sun size={16} />
              <span>Ambient Light</span>
            </div>
            <div className="state-bar">
              <div 
                className="state-fill"
                style={{ 
                  width: `${environmentState.ambientLight * 100}%`,
                  background: 'var(--neural-warning)'
                }}
              ></div>
            </div>
            <span>{(environmentState.ambientLight * 100).toFixed(0)}%</span>
          </div>

          <div className="state-card">
            <div className="state-header">
              <Thermometer size={16} />
              <span>Color Temp</span>
            </div>
            <div className="state-bar">
              <div 
                className="state-fill"
                style={{ 
                  width: `${((environmentState.colorTemperature - 2700) / (9300 - 2700)) * 100}%`,
                  background: 'var(--neural-primary)'
                }}
              ></div>
            </div>
            <span>{environmentState.colorTemperature}K</span>
          </div>

          <div className="state-card">
            <div className="state-header">
              <Sparkles size={16} />
              <span>Particles</span>
            </div>
            <div className="state-bar">
              <div 
                className="state-fill"
                style={{ 
                  width: `${environmentState.particleDensity * 100}%`,
                  background: 'var(--neural-secondary)'
                }}
              ></div>
            </div>
            <span>{(environmentState.particleDensity * 100).toFixed(0)}%</span>
          </div>

          <div className="state-card">
            <div className="state-header">
              <Cloud size={16} />
              <span>Weather</span>
            </div>
            <div className="weather-indicator">
              <span className={`weather-badge ${environmentState.weatherPattern}`}>
                {environmentState.weatherPattern}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emotion Mapping */}
      <div className="emotion-mapping">
        <h4>Emotion-Environment Mapping</h4>
        <div className="mapping-grid">
          {Object.entries(emotionMapping).map(([emotion, data]) => (
            <div key={emotion} className="emotion-card">
              <div className="emotion-header">
                <div 
                  className="emotion-indicator"
                  style={{ background: data.color }}
                ></div>
                <span>{emotion}</span>
              </div>
              
              <div className="emotion-intensity">
                <div className="intensity-bar">
                  <div 
                    className="intensity-fill neural-pulse"
                    style={{ 
                      width: `${data.intensity * 100}%`,
                      background: data.color
                    }}
                  ></div>
                </div>
                <span>{(data.intensity * 100).toFixed(0)}%</span>
              </div>
              
              <div className="trigger-threshold">
                <span>Trigger: {(data.trigger * 100).toFixed(0)}%</span>
                {data.intensity >= data.trigger && (
                  <Activity size={12} className="active-indicator" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Relaxing Video Section */}
      <div className="environment-video-section">
        <div className="video-header">
          <h3>Immersive Environment Experience</h3>
          <p>Deep relaxation through natural environment sounds and visuals for enhanced VR immersion.</p>
        </div>

        <div className="video-grid">
          <div className="video-player-container">
            <YouTubePlayer
              videoId="VNu15Qqomt8"
              title="Environment Relaxing Video - Nature Sounds for VR"
              controls={true}
              className="environment-video"
              onPlay={() => console.log('Environment relaxing video started')}
              onPause={() => console.log('Environment relaxing video paused')}
            />
          </div>

          <div className="video-benefits">
            <h4>VR Enhancement Benefits</h4>
            <div className="benefits-list">
              <div className="benefit-item">
                <Waves className="benefit-icon" />
                <div>
                  <strong>Spatial Audio Integration</strong>
                  <p>Natural environment sounds enhance VR immersion and presence</p>
                </div>
              </div>
              <div className="benefit-item">
                <Eye className="benefit-icon" />
                <div>
                  <strong>Visual Synchronization</strong>
                  <p>Synchronized visuals create deeper emotional connection to virtual environments</p>
                </div>
              </div>
              <div className="benefit-item">
                <Brain className="benefit-icon" />
                <div>
                  <strong>Cognitive Restoration</strong>
                  <p>Nature-based content promotes mental restoration and stress reduction</p>
                </div>
              </div>
              <div className="benefit-item">
                <Heart className="benefit-icon" />
                <div>
                  <strong>Biometric Harmony</strong>
                  <p>Calming environments regulate heart rate and emotional state</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .emotion-responsive-vr {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border-primary);
        }

        .vr-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 20px;
        }

        .mode-select,
        .env-select {
          padding: 8px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .vr-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--neural-primary);
          color: white;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .vr-canvas-container {
          position: relative;
          background: var(--bg-primary);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .vr-canvas {
          width: 100%;
          height: auto;
          display: block;
        }

        .canvas-controls {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          pointer-events: none;
        }

        .environment-info {
          background: rgba(0, 0, 0, 0.8);
          padding: 16px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .environment-info h4 {
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .environment-info p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .realtime-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.8);
          padding: 8px 12px;
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
        }

        .environment-state h4,
        .emotion-mapping h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .state-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .state-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 16px;
        }

        .state-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 8px;
        }

        .state-bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .state-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .state-card span {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .weather-indicator {
          display: flex;
          align-items: center;
        }

        .weather-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .weather-badge.clear { background: var(--neural-success); color: white; }
        .weather-badge.stormy { background: var(--neural-error); color: white; }
        .weather-badge.misty { background: var(--neural-secondary); color: white; }
        .weather-badge.dynamic { background: var(--neural-primary); color: white; }
        .weather-badge.energetic { background: var(--neural-warning); color: white; }

        .mapping-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .emotion-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 16px;
        }

        .emotion-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .emotion-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .emotion-header span {
          color: var(--text-primary);
          font-weight: 600;
          text-transform: capitalize;
        }

        .emotion-intensity {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .intensity-bar {
          flex: 1;
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
        }

        .intensity-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .emotion-intensity span {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 600;
          min-width: 40px;
        }

        .trigger-threshold {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        .active-indicator {
          color: var(--neural-success);
        }

        .environment-video-section {
          margin-top: 40px;
          padding: 32px;
          background: var(--bg-tertiary);
          border-radius: 16px;
          border: 1px solid var(--border-primary);
        }

        .video-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .video-header h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--neural-primary);
          margin-bottom: 8px;
        }

        .video-header p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .video-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: start;
        }

        .video-player-container {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-glow);
        }

        .environment-video {
          width: 100%;
        }

        .video-benefits h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .benefit-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .benefit-icon {
          color: var(--neural-success);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .benefit-item strong {
          color: var(--text-primary);
          font-size: 0.875rem;
          display: block;
          margin-bottom: 4px;
        }

        .benefit-item p {
          color: var(--text-secondary);
          font-size: 0.8rem;
          line-height: 1.4;
          margin: 0;
        }

        @media (max-width: 768px) {
          .vr-controls {
            flex-direction: column;
            gap: 16px;
          }

          .state-grid,
          .mapping-grid {
            grid-template-columns: 1fr;
          }

          .canvas-controls {
            flex-direction: column;
            gap: 16px;
          }

          .realtime-metrics {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .video-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .environment-video-section {
            padding: 24px;
          }

          .video-header h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  )
}

export default EmotionResponsiveVR
