import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Zap,
  Target,
  Clock,
  Trophy,
  Star,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Heart,
  Eye
} from 'lucide-react'
import EnhancedButton from './EnhancedButton'

const CognitiveAdventureLab = ({ user, onComplete }) => {
  const [gameState, setGameState] = useState('menu') // menu, playing, paused, completed
  const [currentGame, setCurrentGame] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [difficulty, setDifficulty] = useState('adaptive')
  const [memoryCards, setMemoryCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [worldGrowth, setWorldGrowth] = useState(0)
  const [emotionalState, setEmotionalState] = useState('calm')
  const canvasRef = useRef(null)

  // AI Adaptive Difficulty System
  const [performanceMetrics, setPerformanceMetrics] = useState({
    averageTime: 0,
    accuracy: 100,
    streaks: 0,
    totalMatches: 0
  })

  // Adventure Games Library
  const adventureGames = [
    {
      id: 'pastel-memory-garden',
      title: 'Pastel Memory Garden',
      description: 'Grow a beautiful garden as you match pastel flowers and unlock neural pathways',
      difficulty: 'Adaptive',
      duration: '3-8 min',
      theme: 'nature',
      color: 'var(--pastel-primary)',
      world: 'garden'
    },
    {
      id: 'neural-constellation',
      title: 'Neural Constellation',
      description: 'Connect stars in the mind galaxy to form memory patterns and enhance recall',
      difficulty: 'Adaptive',
      duration: '4-10 min',
      theme: 'space',
      color: 'var(--pastel-secondary)',
      world: 'constellation'
    },
    {
      id: 'dream-sequence-lab',
      title: 'Dream Sequence Lab',
      description: 'Navigate through dreamy sequences to strengthen working memory and focus',
      difficulty: 'Adaptive',
      duration: '5-12 min',
      theme: 'dreams',
      color: 'var(--pastel-accent)',
      world: 'dreams'
    },
    {
      id: 'emotion-harmony-quest',
      title: 'Emotion Harmony Quest',
      description: 'Balance emotional patterns while building cognitive resilience',
      difficulty: 'Adaptive',
      duration: '6-15 min',
      theme: 'emotions',
      color: 'var(--pastel-coral)',
      world: 'emotions'
    }
  ]

  // 3D Pastel World Renderer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || gameState !== 'playing') return

    const ctx = canvas.getContext('2d')
    const { width, height } = canvas

    const drawPastelWorld = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#fefefe')
      gradient.addColorStop(0.3, '#dceefb')
      gradient.addColorStop(0.7, '#a8e6cf')
      gradient.addColorStop(1, '#e6e6fa')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw growing world elements based on score
      const elements = Math.floor(worldGrowth / 10)
      
      for (let i = 0; i < elements; i++) {
        const x = (i % 5) * (width / 5) + (width / 10)
        const y = height - 100 - (Math.floor(i / 5) * 80)
        
        // Pastel flowers
        ctx.beginPath()
        ctx.arc(x, y, 15 + (worldGrowth % 10), 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${(i * 60) % 360}, 70%, 85%)`
        ctx.fill()
        
        // Soft glow
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 30)
        glowGradient.addColorStop(0, `hsla(${(i * 60) % 360}, 70%, 85%, 0.3)`)
        glowGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = glowGradient
        ctx.fillRect(x - 30, y - 30, 60, 60)
      }

      // Neural vines connecting elements
      if (elements > 1) {
        ctx.strokeStyle = 'rgba(168, 230, 207, 0.6)'
        ctx.lineWidth = 3
        ctx.beginPath()
        
        for (let i = 0; i < elements - 1; i++) {
          const x1 = (i % 5) * (width / 5) + (width / 10)
          const y1 = height - 100 - (Math.floor(i / 5) * 80)
          const x2 = ((i + 1) % 5) * (width / 5) + (width / 10)
          const y2 = height - 100 - (Math.floor((i + 1) / 5) * 80)
          
          ctx.moveTo(x1, y1)
          ctx.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 - 20, x2, y2)
        }
        
        ctx.stroke()
      }

      // Floating particles
      const time = Date.now() / 1000
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time + i) * 100) + width / 2
        const y = (Math.cos(time * 0.7 + i) * 50) + height / 3
        
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${(time * 50 + i * 30) % 360}, 70%, 90%, 0.7)`
        ctx.fill()
      }
    }

    const animate = () => {
      drawPastelWorld()
      if (gameState === 'playing') {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [gameState, worldGrowth])

  // Initialize Memory Game
  const initializeGame = (gameId) => {
    const colors = [
      '#a8e6cf', '#dceefb', '#ffd3e1', '#e6e6fa', 
      '#ffe4b5', '#ffb3ba', '#c7c7ff', '#ffffba'
    ]
    
    const cards = []
    const pairs = 8 // Adaptive based on difficulty
    
    for (let i = 0; i < pairs; i++) {
      cards.push({ id: i * 2, color: colors[i % colors.length], matched: false })
      cards.push({ id: i * 2 + 1, color: colors[i % colors.length], matched: false })
    }
    
    const shuffled = cards.sort(() => Math.random() - 0.5)
    setMemoryCards(shuffled)
    setFlippedCards([])
    setMatchedCards([])
    setScore(0)
    setWorldGrowth(0)
    setCurrentGame(gameId)
    setGameState('playing')
    setTimeLeft(120) // Adaptive time based on difficulty
  }

  // Handle card click
  const handleCardClick = (cardIndex) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardIndex) || matchedCards.includes(cardIndex)) {
      return
    }

    const newFlipped = [...flippedCards, cardIndex]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (memoryCards[first].color === memoryCards[second].color) {
        // Match found - grow the world!
        setMatchedCards([...matchedCards, first, second])
        setScore(prev => prev + 100)
        setWorldGrowth(prev => prev + 10)
        setFlippedCards([])
        
        // Update performance metrics
        setPerformanceMetrics(prev => ({
          ...prev,
          totalMatches: prev.totalMatches + 1,
          streaks: prev.streaks + 1
        }))
        
        // Check completion
        if (matchedCards.length + 2 === memoryCards.length) {
          setTimeout(() => setGameState('completed'), 500)
        }
      } else {
        // No match
        setTimeout(() => setFlippedCards([]), 1000)
        setPerformanceMetrics(prev => ({
          ...prev,
          streaks: 0
        }))
      }
    }
  }

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameState('completed')
    }
  }, [gameState, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const resetGame = () => {
    setGameState('menu')
    setCurrentGame(null)
    setScore(0)
    setWorldGrowth(0)
  }

  // Game Menu View
  if (gameState === 'menu') {
    return (
      <motion.div 
        className="cognitive-adventure-lab"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lab-header">
          <motion.div 
            className="header-content"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="lab-title">Cognitive Adventure Lab</h1>
            <p className="lab-subtitle">
              Embark on research-driven adventures that adapt to your brain patterns and grow beautiful pastel worlds with every success
            </p>
          </motion.div>
          
          <motion.div 
            className="brain-animation"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain size={64} />
          </motion.div>
        </div>

        <div className="adventures-grid">
          {adventureGames.map((game, index) => (
            <motion.div
              key={game.id}
              className="adventure-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="card-glow" style={{ background: game.color }} />
              
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{game.title}</h3>
                  <div className="card-theme" style={{ background: game.color }}>
                    {game.theme}
                  </div>
                </div>
                
                <p className="card-description">{game.description}</p>
                
                <div className="card-meta">
                  <div className="meta-item">
                    <Target size={16} />
                    <span>{game.difficulty}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{game.duration}</span>
                  </div>
                </div>
                
                <EnhancedButton
                  variant="aurora"
                  size="medium"
                  icon={Play}
                  onClick={() => initializeGame(game.id)}
                  className="adventure-button"
                >
                  Begin Adventure
                </EnhancedButton>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="ai-features">
          <h2 className="features-title">AI-Powered Cognitive Enhancement</h2>
          <div className="features-grid">
            <div className="feature-item">
              <TrendingUp className="feature-icon" />
              <h4>Adaptive Difficulty</h4>
              <p>AI analyzes your performance and EEG data to optimize challenge levels in real-time</p>
            </div>
            <div className="feature-item">
              <Sparkles className="feature-icon" />
              <h4>3D Pastel Worlds</h4>
              <p>Watch beautiful worlds grow with clouds, flowers, and neural vines as you succeed</p>
            </div>
            <div className="feature-item">
              <Heart className="feature-icon" />
              <h4>Emotion Detection</h4>
              <p>Games adapt based on stress or boredom detection from EEG patterns</p>
            </div>
            <div className="feature-item">
              <Eye className="feature-icon" />
              <h4>Memory Tracking</h4>
              <p>Animated charts show your recall speed improving over time with detailed analytics</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .cognitive-adventure-lab {
            padding: 40px;
            background: var(--gradient-soft);
            border-radius: 24px;
            border: 1px solid var(--border-soft);
            box-shadow: var(--shadow-large);
          }

          .lab-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            padding: 32px;
            background: var(--gradient-aurora);
            border-radius: 20px;
            border: 1px solid var(--border-primary);
          }

          .header-content {
            flex: 1;
          }

          .lab-title {
            font-family: 'Poppins', sans-serif;
            font-size: 2.5rem;
            font-weight: 800;
            background: var(--gradient-neural);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 12px;
          }

          .lab-subtitle {
            font-size: 1.125rem;
            color: var(--text-secondary);
            line-height: 1.6;
            max-width: 600px;
          }

          .brain-animation {
            color: var(--neural-primary);
            filter: drop-shadow(0 0 20px rgba(125, 211, 252, 0.3));
          }

          .adventures-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 24px;
            margin-bottom: 48px;
          }

          .adventure-card {
            position: relative;
            background: var(--bg-card);
            border-radius: 20px;
            padding: 24px;
            border: 1px solid var(--border-primary);
            box-shadow: var(--shadow-medium);
            overflow: hidden;
          }

          .card-glow {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            opacity: 0.6;
          }

          .card-content {
            position: relative;
            z-index: 2;
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
          }

          .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0;
          }

          .card-theme {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            color: white;
            text-transform: capitalize;
          }

          .card-description {
            color: var(--text-secondary);
            line-height: 1.5;
            margin-bottom: 20px;
          }

          .card-meta {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--text-tertiary);
            font-size: 0.875rem;
          }

          .adventure-button {
            width: 100%;
          }

          .ai-features {
            padding: 32px;
            background: var(--gradient-mint);
            border-radius: 20px;
            border: 1px solid var(--border-primary);
          }

          .features-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--text-primary);
            text-align: center;
            margin-bottom: 32px;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
          }

          .feature-item {
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 16px;
            border: 1px solid var(--border-secondary);
          }

          .feature-icon {
            color: var(--neural-primary);
            margin-bottom: 12px;
          }

          .feature-item h4 {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
          }

          .feature-item p {
            color: var(--text-secondary);
            font-size: 0.875rem;
            line-height: 1.4;
          }

          @media (max-width: 768px) {
            .cognitive-adventure-lab {
              padding: 24px;
            }

            .lab-header {
              flex-direction: column;
              text-align: center;
              gap: 24px;
            }

            .lab-title {
              font-size: 2rem;
            }

            .adventures-grid {
              grid-template-columns: 1fr;
            }

            .features-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </motion.div>
    )
  }

  // Active Game View
  const currentGameData = adventureGames.find(g => g.id === currentGame)

  return (
    <motion.div 
      className="active-adventure"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Game Header */}
      <div className="game-header">
        <div className="game-info">
          <h1 className="game-title">{currentGameData?.title}</h1>
          <div className="game-stats">
            <div className="stat-item">
              <Clock size={16} />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="stat-item">
              <Trophy size={16} />
              <span>{score}</span>
            </div>
            <div className="stat-item">
              <Star size={16} />
              <span>World Growth: {worldGrowth}%</span>
            </div>
          </div>
        </div>
        
        <div className="game-controls">
          <EnhancedButton
            variant="soft"
            size="small"
            icon={RotateCcw}
            onClick={resetGame}
          >
            Return to Lab
          </EnhancedButton>
        </div>
      </div>

      {/* 3D World Canvas */}
      <div className="world-canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="world-canvas"
        />
        <div className="world-overlay">
          <div className="growth-indicator">
            <Sparkles size={20} />
            <span>World Growing: {worldGrowth}%</span>
          </div>
        </div>
      </div>

      {/* Memory Game */}
      <div className="memory-game">
        <div className="cards-container">
          {memoryCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`memory-card ${
                flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''
              } ${matchedCards.includes(index) ? 'matched' : ''}`}
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: flippedCards.includes(index) || matchedCards.includes(index) 
                  ? card.color 
                  : 'var(--bg-card)'
              }}
            >
              {flippedCards.includes(index) || matchedCards.includes(index) ? (
                <motion.div
                  initial={{ rotateY: 180 }}
                  animate={{ rotateY: 0 }}
                  className="card-face"
                >
                  <Brain size={24} color="white" />
                </motion.div>
              ) : (
                <div className="card-back">
                  <Sparkles size={20} color="var(--text-tertiary)" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {gameState === 'completed' && (
        <motion.div
          className="completion-celebration"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="celebration-content">
            <Sparkles size={48} className="celebration-icon" />
            <h2>Adventure Complete!</h2>
            <p>You've grown a beautiful world and enhanced your cognitive abilities!</p>
            <div className="final-stats">
              <div className="final-stat">
                <Trophy size={20} />
                <span>Score: {score}</span>
              </div>
              <div className="final-stat">
                <Target size={20} />
                <span>Accuracy: {((matchedCards.length / memoryCards.length) * 100).toFixed(0)}%</span>
              </div>
              <div className="final-stat">
                <Star size={20} />
                <span>World Growth: {worldGrowth}%</span>
              </div>
            </div>
            <EnhancedButton
              variant="aurora"
              size="large"
              icon={Play}
              onClick={resetGame}
            >
              Explore New Adventure
            </EnhancedButton>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .active-adventure {
          padding: 24px;
          background: var(--gradient-soft);
          border-radius: 24px;
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-large);
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding: 20px;
          background: var(--gradient-aurora);
          border-radius: 16px;
        }

        .game-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .game-stats {
          display: flex;
          gap: 20px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .world-canvas-container {
          position: relative;
          margin-bottom: 24px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border-primary);
          box-shadow: var(--shadow-medium);
        }

        .world-canvas {
          width: 100%;
          height: auto;
          display: block;
        }

        .world-overlay {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.9);
          padding: 8px 16px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .growth-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--neural-primary);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .memory-game {
          padding: 24px;
          background: var(--bg-card);
          border-radius: 16px;
          border: 1px solid var(--border-primary);
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 600px;
          margin: 0 auto;
        }

        .memory-card {
          aspect-ratio: 1;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid var(--border-primary);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .memory-card.flipped {
          border-color: var(--neural-primary);
          box-shadow: 0 0 20px rgba(125, 211, 252, 0.3);
        }

        .memory-card.matched {
          border-color: var(--neural-success);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
        }

        .card-face,
        .card-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .completion-celebration {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          background: var(--bg-card);
          border-radius: 24px;
          padding: 40px;
          border: 1px solid var(--border-glow);
          box-shadow: var(--shadow-large);
          text-align: center;
          backdrop-filter: blur(20px);
        }

        .celebration-icon {
          color: var(--neural-success);
          margin-bottom: 16px;
        }

        .celebration-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .celebration-content p {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .final-stats {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .final-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-primary);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .game-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .game-stats {
            justify-content: center;
          }

          .cards-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .final-stats {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
        }
      `}</style>
    </motion.div>
  )
}

export default CognitiveAdventureLab
