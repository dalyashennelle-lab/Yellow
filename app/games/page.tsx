'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import UltraRealistic3DBrain from '../components/UltraRealistic3DBrain';
import AIRealtimeCognitive from '../components/AIRealtimeCognitive';
import AdaptiveMiniGames from '../components/AdaptiveMiniGames';

export default function BrainGamesPage() {
  const [cognitiveLoad, setCognitiveLoad] = useState(45);
  const [memoryActivity, setMemoryActivity] = useState(67);
  const [focusLevel, setFocusLevel] = useState(82);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {
    // Simulate brain activity changes during games
    if (activeGame) {
      const interval = setInterval(() => {
        setCognitiveLoad(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 30)));
        setMemoryActivity(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 25)));
        setFocusLevel(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 20)));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [activeGame]);

  const brainGames = [
    {
      id: 'memory-matrix',
      title: '🧩 Memory Matrix',
      description: 'Advanced spatial memory challenge with adaptive difficulty',
      category: 'Memory',
      difficulty: 'Adaptive',
      neuralTarget: 'Hippocampus + Parietal Cortex'
    },
    {
      id: 'gamma-logic',
      title: '⚡ Gamma Logic Puzzles',
      description: 'High-frequency cognitive tasks to boost gamma waves',
      category: 'Logic',
      difficulty: 'Expert',
      neuralTarget: 'Prefrontal Cortex'
    },
    {
      id: 'attention-flow',
      title: '🎯 Attention Flow Training',
      description: 'Dual n-back and attention switching exercises',
      category: 'Attention',
      difficulty: 'Progressive',
      neuralTarget: 'Anterior Cingulate'
    },
    {
      id: 'spatial-navigator',
      title: '🗺️ 3D Spatial Navigator',
      description: 'VR-enhanced spatial reasoning and navigation',
      category: 'Spatial',
      difficulty: 'Immersive',
      neuralTarget: 'Parietal Lobe'
    },
    {
      id: 'emotion-cognition',
      title: '💭 Emotion-Cognition Integration',
      description: 'EEG-guided emotional regulation during cognitive tasks',
      category: 'Emotional Intelligence',
      difficulty: 'Biofeedback',
      neuralTarget: 'Amygdala + PFC'
    },
    {
      id: 'memory-palace',
      title: '🏛️ Virtual Memory Palace',
      description: 'Build and navigate 3D memory palaces in VR',
      category: 'Memory',
      difficulty: 'Architectural',
      neuralTarget: 'Hippocampus + Visual Cortex'
    }
  ];

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
    // Simulate increased brain activity when starting a game
    setCognitiveLoad(75);
    setMemoryActivity(85);
    setFocusLevel(90);
  };

  const stopGame = () => {
    setActiveGame(null);
    // Return to baseline
    setCognitiveLoad(45);
    setMemoryActivity(67);
    setFocusLevel(82);
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="games" />
      
      <main className="main-content">
        <div className="games-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">Neural Training Games</h1>
              <p className="hero-description">
                AI-powered cognitive enhancement with real-time EEG adaptation in our advanced research laboratory
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F55b95b32dde5423082890d1b31a97f0b?format=webp&width=800"
                alt="Neuroscience researcher working in futuristic brain research lab"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <UltraRealistic3DBrain
          cognitiveLoad={cognitiveLoad}
          memoryActivity={memoryActivity}
          focusLevel={focusLevel}
        />

        <AIRealtimeCognitive
          onMetricsUpdate={(metrics) => {
            setCognitiveLoad(Math.round((metrics.attention + metrics.processing) / 2));
            setMemoryActivity(metrics.workingMemory);
            setFocusLevel(metrics.attention);
          }}
        />

        <div className="section-card">
          <h2 className="section-title">Active Training Status</h2>
          <div className="section-divider"></div>
          
          {activeGame ? (
            <div className="active-game-status">
              <div className="game-info">
                <h3>Currently Playing: {brainGames.find(g => g.id === activeGame)?.title}</h3>
                <p>Neural activity is being monitored and difficulty is adapting in real-time</p>
              </div>
              <button className="control-button stop" onClick={stopGame}>
                Stop Training
              </button>
            </div>
          ) : (
            <div className="standby-status">
              <p>Ready to begin neural training. Select a game below to start adaptive cognitive enhancement.</p>
            </div>
          )}
        </div>

        <div className="section-card">
          <h2 className="section-title">Available Neural Games</h2>
          <div className="section-divider"></div>
          
          <div className="games-grid">
            {brainGames.map((game) => (
              <div key={game.id} className={`game-card ${activeGame === game.id ? 'active' : ''}`}>
                <div className="game-header">
                  <h3 className="game-title">{game.title}</h3>
                  <div className="game-badges">
                    <span className="category-badge">{game.category}</span>
                    <span className="difficulty-badge">{game.difficulty}</span>
                  </div>
                </div>
                
                <p className="game-description">{game.description}</p>
                
                <div className="game-details">
                  <div className="neural-target">
                    <strong>Neural Target:</strong> {game.neuralTarget}
                  </div>
                </div>
                
                <div className="game-actions">
                  {activeGame === game.id ? (
                    <button className="game-button active" onClick={stopGame}>
                      Training Active
                    </button>
                  ) : (
                    <button className="game-button" onClick={() => startGame(game.id)}>
                      Start Training
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="research-lab">
          <h2 className="section-title">Research & Development</h2>
          <div className="section-divider"></div>

          <div className="research-content">
            <div className="research-visual">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fe6a6c9e5cdad4937b2baa7321e301195?format=webp&width=800"
                alt="Neuroscience researcher working in futuristic lab"
                className="research-img"
              />
            </div>
            <div className="research-info">
              <h3>Advanced Neuroscience Lab</h3>
              <p>Our games are developed using cutting-edge neuroscience research, incorporating real-time EEG feedback and adaptive AI algorithms to maximize cognitive enhancement.</p>
              <div className="research-stats">
                <div className="research-stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Research Studies</span>
                </div>
                <div className="research-stat">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Improvement Rate</span>
                </div>
                <div className="research-stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Lab Operations</span>
                </div>
              </div>
              <button className="research-button">Learn More</button>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Adaptive Mini-Games</h2>
          <div className="section-divider"></div>
          <AdaptiveMiniGames
            onScoreUpdate={(score, accuracy, reactionTime) => {
              setCognitiveLoad(Math.round((score / 100) * 30 + 50));
              setMemoryActivity(Math.round(accuracy));
              setFocusLevel(Math.round((500 - reactionTime) / 3));
            }}
            onDifficultyChange={(difficulty) => {
              console.log('Difficulty adjusted to:', difficulty);
            }}
          />
        </div>

        <div className="section-card">
          <h2 className="section-title">Neural Enhancement Features</h2>
          <div className="section-divider"></div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🧠</div>
              <h3>Real-time EEG Adaptation</h3>
              <p>Games automatically adjust difficulty based on your brainwave patterns and cognitive load</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🎮</div>
              <h3>Procedural Generation</h3>
              <p>AI creates unique challenges daily, ensuring continuous cognitive stimulation</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🌟</div>
              <h3>Neuroplasticity Optimization</h3>
              <p>Tasks designed to maximize neural pathway strengthening and brain adaptability</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Performance Analytics</h3>
              <p>Detailed tracking of cognitive improvements with neuroscience-backed metrics</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
