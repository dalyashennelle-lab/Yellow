
'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

interface BrainGame {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  neuralTarget: string;
}

// Memory Game Component
function MemoryGame({ onScore }: { onScore: (score: number) => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const colors = ['#ff6b35', '#4facfe', '#9b59b6', '#2c3e50'];

  const startGame = () => {
    const newSequence = [Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    setPlayerSequence([]);
    setCurrentStep(0);
    setScore(0);
    setIsPlaying(true);
    playSequence(newSequence);
  };

  const playSequence = async (seq: number[]) => {
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveButton(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveButton(null);
    }
  };

  const handleButtonClick = (buttonIndex: number) => {
    if (!isPlaying || activeButton !== null) return;

    const newPlayerSequence = [...playerSequence, buttonIndex];
    setPlayerSequence(newPlayerSequence);

    if (buttonIndex !== sequence[playerSequence.length]) {
      // Wrong button
      setIsPlaying(false);
      onScore(score);
      alert(`Game Over! Score: ${score}`);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      // Completed sequence
      const newScore = score + 1;
      setScore(newScore);
      setPlayerSequence([]);
      
      setTimeout(() => {
        const newSequence = [...sequence, Math.floor(Math.random() * 4)];
        setSequence(newSequence);
        playSequence(newSequence);
      }, 1000);
    }
  };

  return (
    <div className="memory-game">
      <div className="game-header">
        <h3>Memory Sequence Game</h3>
        <div className="game-stats">
          <span>Score: {score}</span>
          <span>Level: {sequence.length}</span>
        </div>
      </div>
      
      <div className="game-grid">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`game-button ${activeButton === index ? 'active' : ''}`}
            style={{ 
              backgroundColor: color,
              opacity: activeButton === index ? 1 : 0.7
            }}
            onClick={() => handleButtonClick(index)}
            disabled={!isPlaying || activeButton !== null}
          />
        ))}
      </div>
      
      <div className="game-controls">
        <button className="control-button" onClick={startGame}>
          {isPlaying ? 'Restart' : 'Start Game'}
        </button>
      </div>
    </div>
  );
}

// Game Interface Component
function GameInterface({ gameId, onExit }: { gameId: string; onExit: () => void }) {
  const [gameScore, setGameScore] = useState(0);
  
  return (
    <div className="game-interface">
      <div className="game-container">
        <div className="game-header-bar">
          <h2>🧠 Brain Training Session</h2>
          <button className="exit-button" onClick={onExit}>✕ Exit</button>
        </div>
        
        {gameId === 'memory' && <MemoryGame onScore={setGameScore} />}
        
        <div className="game-info">
          <div className="neural-feedback">
            <h4>🧬 Neural Activity</h4>
            <div className="activity-indicators">
              <div className="activity-bar">
                <span>Focus</span>
                <div className="bar"><div className="fill" style={{ width: '78%' }}></div></div>
              </div>
              <div className="activity-bar">
                <span>Working Memory</span>
                <div className="bar"><div className="fill" style={{ width: '85%' }}></div></div>
              </div>
              <div className="activity-bar">
                <span>Processing Speed</span>
                <div className="bar"><div className="fill" style={{ width: '72%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const brainGames: BrainGame[] = [
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
      difficulty: 'Immersive',
      neuralTarget: 'Hippocampus'
    }
  ];

  return (
    <div className="app-container">
      <Sidebar activeItem="games" />
      <main className="main-content">
        <div className="content-header">
          <div className="header-content">
            <h1 className="main-title">🎮 Brain Training Games</h1>
            <p className="main-subtitle">
              Advanced cognitive games designed to enhance specific neural pathways and boost cognitive performance
            </p>
          </div>
        </div>

        <div className="games-grid">
          {brainGames.map((game) => (
            <div 
              key={game.id} 
              className={`game-card ${selectedGame === game.id ? 'selected' : ''}`}
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="game-header">
                <h3 className="game-title">{game.title}</h3>
                <div className="game-badges">
                  <span className="difficulty-badge">{game.difficulty}</span>
                  <span className="category-badge">{game.category}</span>
                </div>
              </div>
              <p className="game-description">{game.description}</p>
              <div className="neural-target">
                <strong>Neural Target:</strong> {game.neuralTarget}
              </div>
              <button className="play-button">
                {selectedGame === game.id ? '🎯 Playing' : '▶️ Play Game'}
              </button>
            </div>
          ))}
        </div>

        {selectedGame && <GameInterface gameId={selectedGame} onExit={() => setSelectedGame(null)} />}
      </main>
    </div>
  );
}
