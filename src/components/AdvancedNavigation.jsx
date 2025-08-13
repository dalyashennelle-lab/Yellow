import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import {
  Brain,
  BarChart3,
  Gamepad2,
  Heart,
  Waves,
  TrendingUp,
  Settings,
  User,
  Menu,
  X,
  Zap,
  Cpu,
  Eye,
  Sparkles
} from 'lucide-react'

// 3D Neural Particle System
const NeuralParticles = ({ isActive }) => {
  const meshRef = useRef()
  const { size } = useThree()
  
  const particlesCount = 200
  const positions = new Float32Array(particlesCount * 3)
  const colors = new Float32Array(particlesCount * 3)
  
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    
    colors[i * 3] = Math.random() * 0.5 + 0.5
    colors[i * 3 + 1] = Math.random() * 0.8 + 0.2
    colors[i * 3 + 2] = 1
  }

  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      
      const positions = meshRef.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = Math.sin(state.clock.elapsedTime + i) * 0.5
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 3D Morphing Tab Component
const MorphingTab = ({ icon: Icon, label, isActive, onClick, position, color }) => {
  const meshRef = useRef()
  const textRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      if (isActive) {
        meshRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
        meshRef.current.material.emissive.setHex(0x001122)
      } else {
        meshRef.current.scale.setScalar(1)
        meshRef.current.material.emissive.setHex(0x000000)
      }
    }
  })

  return (
    <group position={position} onClick={onClick}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Box
          ref={meshRef}
          args={[1.5, 1.5, 0.3]}
          position={[0, 0, 0]}
        >
          <MeshWobbleMaterial
            color={isActive ? color : '#2a2a3a'}
            transparent
            opacity={0.8}
            factor={isActive ? 0.3 : 0.1}
            speed={isActive ? 2 : 0.5}
          />
        </Box>
        <Text
          ref={textRef}
          position={[0, 0, 0.2]}
          fontSize={0.4}
          color={isActive ? '#ffffff' : '#888888'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/SpaceGrotesk-Bold.woff"
        >
          {label}
        </Text>
      </Float>
    </group>
  )
}

// Neural Network Visualization
const NeuralNetwork = ({ isVisible }) => {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  if (!isVisible) return null

  return (
    <group ref={groupRef}>
      {/* Neural Nodes */}
      {Array.from({ length: 8 }, (_, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.3}>
          <Sphere
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 3,
              Math.sin((i / 8) * Math.PI * 2) * 3,
              (i % 2) * 2 - 1
            ]}
            args={[0.2, 8, 8]}
          >
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#002255"
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

const AdvancedNavigation = ({ user, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showNeuralNetwork, setShowNeuralNetwork] = useState(false)
  const [particles, setParticles] = useState([])
  const [magneticEffect, setMagneticEffect] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()
  const location = useLocation()
  const containerRef = useRef()
  const navRef = useRef()

  // Generate particle system
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1
    }))
    setParticles(newParticles)
  }, [])

  // Magnetic cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      setMagneticEffect({ x: clientX, y: clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // GSAP animations
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.nav-tab', 
        { scale: 0, rotation: 180, opacity: 0 },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      )
      setShowNeuralNetwork(true)
    } else {
      setShowNeuralNetwork(false)
    }
  }, [isOpen])

  const navItems = [
    { 
      id: 'dashboard', 
      path: '/', 
      icon: BarChart3, 
      label: 'Neural Hub', 
      color: '#00d4ff',
      position: [-3, 2, 0]
    },
    { 
      id: 'advanced', 
      path: '/advanced', 
      icon: Cpu, 
      label: 'Quantum Lab', 
      color: '#7c3aed',
      position: [0, 2, 0],
      premium: true
    },
    { 
      id: 'checkin', 
      path: '/checkin', 
      icon: Heart, 
      label: 'Bio Sync', 
      color: '#ff4757',
      position: [3, 2, 0]
    },
    { 
      id: 'games', 
      path: '/games', 
      icon: Gamepad2, 
      label: 'Mind Arena', 
      color: '#2ed573',
      position: [-3, 0, 0]
    },
    { 
      id: 'mindfulness', 
      path: '/mindfulness', 
      icon: Brain, 
      label: 'Zen Matrix', 
      color: '#ff6b6b',
      position: [0, 0, 0]
    },
    { 
      id: 'eeg', 
      path: '/eeg', 
      icon: Waves, 
      label: 'Wave Core', 
      color: '#ffa502',
      position: [3, 0, 0]
    },
    { 
      id: 'progress', 
      path: '/progress', 
      icon: TrendingUp, 
      label: 'Evolution', 
      color: '#3742fa',
      position: [-1.5, -2, 0]
    },
    { 
      id: 'settings', 
      path: '/settings', 
      icon: Settings, 
      label: 'Command', 
      color: '#747d8c',
      position: [1.5, -2, 0]
    }
  ]

  const handleTabClick = (item) => {
    setActiveTab(item.id)
    navigate(item.path)
    onNavigate?.(item.path)
    
    // Cinematic transition effect
    gsap.to('.transition-overlay', {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        setTimeout(() => {
          gsap.to('.transition-overlay', { opacity: 0, duration: 0.5 })
        }, 200)
      }
    })
  }

  const currentPath = location.pathname
  const currentItem = navItems.find(item => item.path === currentPath) || navItems[0]

  return (
    <>
      {/* Floating Navigation Orb */}
      <motion.div
        className="nav-orb-container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          className="nav-orb"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isOpen 
              ? `0 0 30px ${currentItem.color}, 0 0 60px ${currentItem.color}40`
              : `0 0 20px ${currentItem.color}60`
          }}
        >
          <div className="orb-icon">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          <div className="orb-pulse" />
        </motion.button>
      </motion.div>

      {/* Transition Overlay */}
      <div className="transition-overlay" />

      {/* Advanced 3D Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="advanced-nav-panel"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            {/* Glassmorphism Background */}
            <div className="glass-background" />
            
            {/* Particle Trail System */}
            <div className="particle-system">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="particle"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`
                  }}
                  animate={{
                    x: [0, Math.random() * 200 - 100, 0],
                    y: [0, Math.random() * 200 - 100, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: particle.speed + 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* 3D Canvas */}
            <div className="canvas-container">
              <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
                
                <Suspense fallback={null}>
                  <NeuralParticles isActive={showNeuralNetwork} />
                  <NeuralNetwork isVisible={showNeuralNetwork} />
                  
                  {navItems.map((item) => (
                    <MorphingTab
                      key={item.id}
                      icon={item.icon}
                      label={item.label}
                      isActive={activeTab === item.id}
                      onClick={() => handleTabClick(item)}
                      position={item.position}
                      color={item.color}
                    />
                  ))}
                </Suspense>
              </Canvas>
            </div>

            {/* Neural Status Display */}
            <div className="neural-status">
              <div className="status-grid">
                <div className="status-item">
                  <Brain className="status-icon" />
                  <span>Neural Link Active</span>
                </div>
                <div className="status-item">
                  <Zap className="status-icon" />
                  <span>Quantum Processing</span>
                </div>
                <div className="status-item">
                  <Eye className="status-icon" />
                  <span>Mind Interface Ready</span>
                </div>
              </div>
            </div>

            {/* User Avatar with Neural Glow */}
            <motion.div 
              className="user-neural-avatar"
              animate={{
                boxShadow: [
                  `0 0 20px ${currentItem.color}40`,
                  `0 0 40px ${currentItem.color}80`,
                  `0 0 20px ${currentItem.color}40`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="avatar-container">
                <User size={32} />
                <div className="neural-pulse-ring" />
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">Neural Engineer</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-orb-container {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 10000;
        }

        .nav-orb {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(0, 212, 255, 0.1) 0%, 
            rgba(124, 58, 237, 0.1) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .nav-orb:hover {
          transform: scale(1.1);
        }

        .orb-icon {
          color: white;
          z-index: 2;
        }

        .orb-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }

        .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent);
          opacity: 0;
          z-index: 9999;
          pointer-events: none;
        }

        .advanced-nav-panel {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9998;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .glass-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.7) 0%, 
            rgba(0, 0, 0, 0.5) 100%);
          backdrop-filter: blur(30px);
        }

        .particle-system {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: linear-gradient(45deg, #00d4ff, #7c3aed);
          border-radius: 50%;
          filter: blur(1px);
        }

        .canvas-container {
          width: 800px;
          height: 600px;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .neural-status {
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 20px 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .status-grid {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .status-icon {
          color: var(--neural-primary);
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { filter: drop-shadow(0 0 5px currentColor); }
          to { filter: drop-shadow(0 0 15px currentColor); }
        }

        .user-neural-avatar {
          position: absolute;
          top: 50px;
          left: 50px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 16px 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .avatar-container {
          position: relative;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #00d4ff, #7c3aed);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .neural-pulse-ring {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid var(--neural-primary);
          border-radius: 50%;
          top: -5px;
          left: -5px;
          animation: pulse 2s infinite;
          opacity: 0.5;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-role {
          color: var(--neural-primary);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .nav-orb-container {
            top: 20px;
            right: 20px;
          }

          .nav-orb {
            width: 60px;
            height: 60px;
          }

          .canvas-container {
            width: 90vw;
            height: 70vh;
          }

          .user-neural-avatar {
            top: 30px;
            left: 30px;
            padding: 12px 16px;
          }

          .neural-status {
            bottom: 30px;
            padding: 15px 20px;
          }

          .status-grid {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </>
  )
}

export default AdvancedNavigation
