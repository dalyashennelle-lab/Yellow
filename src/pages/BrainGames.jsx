import React, { useState, useEffect } from 'react'
import { 
  Gamepad2, 
  Target, 
  Brain, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw,
  Trophy,
  TrendingUp,
  Zap
} from 'lucide-react'

const BrainGames = ({ user }) => {
  const [activeGame, setActiveGame] = useState(null)
  const [gameState, setGameState] = useState('ready') // ready, playing, paused, completed
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [selectedCards, setSelectedCards] = useState([])
  
  // Memory Game State
  const [memoryCards, setMemoryCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])

  const games = [
    {
      id: 'memory-matrix',
      title: 'Memory Matrix Challenge',
      description: 'Test your working memory with pattern recognition',
      difficulty: 'Intermediate',
      duration: '5-10 min',
      category: 'Memory',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fd3b03ef89de9467b9610092b5db3e912?format=webp&width=800',
      color: 'var(--neural-primary)'
    },
    {
      id: 'attention-focus',
      title: 'Attention Training',
      description: 'Improve sustained attention and focus control',
      difficulty: 'Beginner',
      duration: '3-7 min',
      category: 'Attention',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F75afea9da9634afeaab85d2c89eaebc3?format=webp&width=800',
      color: 'var(--neural-success)'
    },
    {
      id: 'cognitive-flexibility',
      title: 'Cognitive Flexibility',
      description: 'Enhance mental agility and task switching',
      difficulty: 'Advanced',
      duration: '8-12 min',
      category: 'Executive',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa15f3559262c4c23a96a8b8edac690bd?format=webp&width=800',
      color: 'var(--neural-secondary)'
    },
    {
      id: 'processing-speed',
      title: 'Processing Speed',
      description: 'Rapid information processing and decision making',
      difficulty: 'Intermediate',
      duration: '4-8 min',
      category: 'Speed',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F7e4c6421330e4951ac66f311c1531449?format=webp&width=800',
      color: 'var(--neural-warning)'
    },
    {
      id: 'neuroscience-lab',
      title: 'Neuroscience Lab Challenge',
      description: 'Advanced brain research simulation activities',
      difficulty: 'Expert',
      duration: '10-15 min',
      category: 'Research',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fedb3613c06c24b669bb87fd5e0075da3?format=webp&width=800',
      color: 'var(--neural-accent)'
    },
    {
      id: 'brain-lab-advanced',
      title: 'Advanced Brain Lab',
      description: 'Cutting-edge cognitive enhancement protocols',
      difficulty: 'Expert',
      duration: '12-20 min',
      category: 'Advanced',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Ffe7d56c2cebb4f01ba34c6178e0d1d05?format=webp&width=800',
      color: 'var(--neural-primary)'
    }
  ]

  // Initialize Memory Matrix Game
  const initializeMemoryGame = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
    const cards = []
    
    // Create pairs
    for (let i = 0; i < 8; i++) {
      cards.push({ id: i * 2, color: colors[i], matched: false })
      cards.push({ id: i * 2 + 1, color: colors[i], matched: false })
    }
    
    // Shuffle
    const shuffled = cards.sort(() => Math.random() - 0.5)
    setMemoryCards(shuffled)
    setFlippedCards([])
    setMatchedCards([])
    setScore(0)
  }

  const handleCardClick = (cardIndex) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardIndex) || matchedCards.includes(cardIndex)) {
      return
    }

    const newFlipped = [...flippedCards, cardIndex]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (memoryCards[first].color === memoryCards[second].color) {
        // Match found
        setMatchedCards([...matchedCards, first, second])
        setScore(score + 10)
        setFlippedCards([])
        
        // Check if game is complete
        if (matchedCards.length + 2 === memoryCards.length) {
          setGameState('completed')
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  const startGame = (gameId) => {
    setActiveGame(gameId)
    setGameState('playing')
    setTimeLeft(60)

    if (gameId === 'memory-matrix') {
      initializeMemoryGame()
    } else {
      // Initialize other games with default settings
      setScore(0)
    }
  }

  const pauseGame = () => {
    setGameState('paused')
  }

  const resumeGame = () => {
    setGameState('playing')
  }

  const resetGame = () => {
    setGameState('ready')
    setActiveGame(null)
    setScore(0)
    setTimeLeft(60)
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

  if (activeGame) {
    const game = games.find(g => g.id === activeGame)
    
    return (
      <div className="brain-games active-game">
        {/* Game Header */}
        <div className="game-header">
          <div className="game-info">
            <h1 className="game-title">{game.title}</h1>
            <div className="game-meta">
              <span className="game-category" style={{ background: game.color }}>{game.category}</span>
              <span className="game-difficulty">{game.difficulty}</span>
            </div>
          </div>
          
          <div className="game-controls">
            <div className="game-stats">
              <div className="stat">
                <Clock size={16} />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <div className="stat">
                <Trophy size={16} />
                <span>{score}</span>
              </div>
            </div>
            
            <div className="control-buttons">
              {gameState === 'playing' ? (
                <button className="btn btn-secondary" onClick={pauseGame}>
                  <Pause size={16} />
                  Pause
                </button>
              ) : gameState === 'paused' ? (
                <button className="btn btn-primary" onClick={resumeGame}>
                  <Play size={16} />
                  Resume
                </button>
              ) : null}
              
              <button className="btn btn-ghost" onClick={resetGame}>
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="game-area">
          {activeGame === 'memory-matrix' && (
            <div className="memory-game">
              <div className="cards-grid">
                {memoryCards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`memory-card ${
                      flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''
                    } ${matchedCards.includes(index) ? 'matched' : ''}`}
                    onClick={() => handleCardClick(index)}
                    style={{
                      backgroundColor: flippedCards.includes(index) || matchedCards.includes(index)
                        ? card.color
                        : 'var(--bg-tertiary)'
                    }}
                  >
                    {flippedCards.includes(index) || matchedCards.includes(index) ? (
                      <Brain size={24} color="white" />
                    ) : (
                      <div className="card-back">?</div>
                    )}
                  </div>
                ))}
              </div>

              {gameState === 'completed' && (
                <div className="game-complete">
                  <h3>Excellent Work!</h3>
                  <p>You completed the memory challenge with a score of {score}</p>
                  <button className="btn btn-primary" onClick={resetGame}>
                    Play Again
                  </button>
                </div>
              )}
            </div>
          )}

          {activeGame && activeGame !== 'memory-matrix' && (
            <div className="generic-game">
              <div className="game-interface">
                <div className="game-simulator">
                  <div className="simulator-display">
                    <h3>{games.find(g => g.id === activeGame)?.title} Simulator</h3>
                    <div className="game-metrics">
                      <div className="metric">
                        <span className="metric-label">Cognitive Load</span>
                        <div className="metric-bar">
                          <div className="metric-fill" style={{width: `${45 + (score * 2)}%`}}></div>
                        </div>
                        <span className="metric-value">{45 + (score * 2)}%</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Response Time</span>
                        <div className="metric-bar">
                          <div className="metric-fill" style={{width: `${Math.max(20, 80 - score)}%`}}></div>
                        </div>
                        <span className="metric-value">{Math.max(200, 800 - (score * 10))}ms</span>
                      </div>
                    </div>

                    <div className="game-actions">
                      <button
                        className="btn btn-secondary game-action-btn"
                        onClick={() => setScore(score + Math.floor(Math.random() * 5) + 1)}
                        disabled={gameState !== 'playing'}
                      >
                        <Brain size={16} />
                        Process Task
                      </button>
                      <button
                        className="btn btn-accent game-action-btn"
                        onClick={() => setScore(score + Math.floor(Math.random() * 3) + 1)}
                        disabled={gameState !== 'playing'}
                      >
                        <Target size={16} />
                        Focus Challenge
                      </button>
                    </div>
                  </div>
                </div>

                {gameState === 'completed' && (
                  <div className="game-complete">
                    <h3>Session Complete!</h3>
                    <p>You completed {games.find(g => g.id === activeGame)?.title} with a score of {score}</p>
                    <button className="btn btn-primary" onClick={resetGame}>
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .active-game {
            padding: 80px 24px 24px;
            min-height: 100vh;
            max-width: 1200px;
            margin: 0 auto;
          }

          .game-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 32px;
            flex-wrap: wrap;
            gap: 20px;
          }

          .game-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 12px;
          }

          .game-meta {
            display: flex;
            gap: 12px;
            align-items: center;
          }

          .game-category {
            padding: 6px 16px;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            color: white;
          }

          .game-difficulty {
            color: var(--text-secondary);
            font-size: 1.125rem;
          }

          .game-controls {
            display: flex;
            gap: 20px;
            align-items: center;
          }

          .game-stats {
            display: flex;
            gap: 16px;
          }

          .stat {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--text-primary);
            font-weight: 600;
          }

          .control-buttons {
            display: flex;
            gap: 8px;
          }

          .game-area {
            background: var(--bg-card);
            border-radius: 20px;
            padding: 40px;
            min-height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .cards-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            max-width: 400px;
          }

          .memory-card {
            aspect-ratio: 1;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid var(--border-primary);
            position: relative;
            overflow: hidden;
          }

          .memory-card:hover {
            transform: scale(1.05);
            border-color: var(--border-glow);
          }

          .memory-card.flipped {
            transform: scale(1.1);
            border-color: var(--neural-primary);
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
          }

          .memory-card.matched {
            border-color: var(--neural-success);
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
          }

          .card-back {
            font-size: 2rem;
            font-weight: bold;
            color: var(--text-secondary);
          }

          .game-complete {
            text-align: center;
            background: var(--bg-glass);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid var(--border-glow);
          }

          .game-complete h3 {
            font-size: 2rem;
            color: var(--neural-success);
            margin-bottom: 12px;
          }

          .game-complete p {
            color: var(--text-secondary);
            margin-bottom: 20px;
          }

          .generic-game {
            width: 100%;
            max-width: 800px;
          }

          .game-interface {
            background: var(--bg-card);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid var(--border-primary);
          }

          .simulator-display {
            text-align: center;
          }

          .simulator-display h3 {
            color: var(--neural-primary);
            margin-bottom: 32px;
            font-size: 2rem;
          }

          .game-metrics {
            display: flex;
            flex-direction: column;
            gap: 24px;
            margin-bottom: 32px;
          }

          .metric {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .metric-label {
            min-width: 120px;
            font-weight: 600;
            color: var(--text-primary);
            text-align: left;
          }

          .metric-bar {
            flex: 1;
            height: 8px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            overflow: hidden;
          }

          .metric-fill {
            height: 100%;
            background: var(--gradient-neural);
            border-radius: 4px;
            transition: width 0.5s ease;
          }

          .metric-value {
            min-width: 60px;
            font-weight: 600;
            color: var(--neural-success);
            text-align: right;
          }

          .game-actions {
            display: flex;
            gap: 16px;
            justify-content: center;
          }

          .game-action-btn {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .game-action-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          @media (max-width: 768px) {
            .game-header {
              flex-direction: column;
              align-items: stretch;
            }

            .game-controls {
              justify-content: space-between;
            }

            .cards-grid {
              grid-template-columns: repeat(3, 1fr);
              max-width: 300px;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="brain-games">
      <div className="page-header">
        <h1 className="heading-xl">Brain Training Games</h1>
        <p>Scientifically designed cognitive exercises to enhance mental performance</p>
      </div>

      {/* Featured Clinical Games */}
      <div className="clinical-games-section">
        <div className="clinical-feature">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fae9beddb5cb343c1a15c83099fa4d672?format=webp&width=800"
            alt="EEG Brain Training"
            className="clinical-image"
          />
          <div className="clinical-content">
            <h3>EEG-Enhanced Training</h3>
            <p>Advanced brain training with real-time EEG feedback for optimal cognitive enhancement.</p>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="games-grid grid grid-2">
        {games.map((game) => (
          <div key={game.id} className="game-card neural-card">
            <div className="game-image-container">
              <img src={game.image} alt={game.title} className="game-image" />
              <div className="game-overlay">
                <button 
                  className="play-button"
                  onClick={() => startGame(game.id)}
                  style={{ background: game.color }}
                >
                  <Play size={24} />
                  Start Game
                </button>
              </div>
            </div>
            
            <div className="game-content">
              <div className="game-header-card">
                <h3 className="game-title">{game.title}</h3>
                <span className="game-category" style={{ background: game.color }}>
                  {game.category}
                </span>
              </div>
              
              <p className="game-description">{game.description}</p>
              
              <div className="game-meta-info">
                <div className="meta-item">
                  <Target size={16} />
                  <span>{game.difficulty}</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{game.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clinical Assessment Section */}
      <div className="assessment-section">
        <h2 className="section-title">Clinical Assessment Tools</h2>
        <div className="assessment-grid">
          <div className="assessment-card">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F2774b188f48c46b0876f9023dc429e58?format=webp&width=800"
              alt="Cognitive Assessment"
              className="assessment-image"
            />
            <h4>Standardized Testing</h4>
            <p>Clinically validated cognitive assessment protocols</p>
          </div>
          
          <div className="assessment-card">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F9969da5c710d4a4290e7a4d06637af5a?format=webp&width=800"
              alt="Progress Tracking"
              className="assessment-image"
            />
            <h4>Progress Monitoring</h4>
            <p>Real-time tracking of cognitive improvements</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .brain-games {
          padding: 80px 24px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .clinical-games-section {
          margin: 48px 0;
        }

        .clinical-feature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          background: var(--bg-card);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid var(--border-primary);
        }

        .clinical-image {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-glow);
        }

        .clinical-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--neural-primary);
        }

        .clinical-content p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .games-grid {
          margin-bottom: 60px;
        }

        .game-card {
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .game-card:hover {
          transform: translateY(-8px);
        }

        .game-image-container {
          position: relative;
          overflow: hidden;
          height: 200px;
        }

        .game-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .game-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .game-card:hover .game-overlay {
          opacity: 1;
        }

        .game-card:hover .game-image {
          transform: scale(1.1);
        }

        .play-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .play-button:hover {
          transform: scale(1.05);
        }

        .game-content {
          padding: 24px;
        }

        .game-header-card {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .game-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .game-category {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          color: white;
        }

        .game-description {
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .game-meta-info {
          display: flex;
          gap: 16px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        .assessment-section {
          margin-top: 60px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .assessment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .assessment-card {
          text-align: center;
          background: var(--bg-card);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid var(--border-primary);
          transition: all 0.3s ease;
        }

        .assessment-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-glow);
          box-shadow: var(--shadow-glow);
        }

        .assessment-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .assessment-card h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--neural-primary);
          margin-bottom: 8px;
        }

        .assessment-card p {
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .clinical-feature {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 24px;
          }

          .game-header-card {
            flex-direction: column;
            gap: 8px;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  )
}

export default BrainGames
