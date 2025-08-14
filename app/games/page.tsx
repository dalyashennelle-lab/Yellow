
import Sidebar from '../components/Sidebar';

interface BrainGame {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  neuralTarget: string;
}

export default function GamesPage() {
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
    <div className="main-container">
      <Sidebar activeItem="games" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Cognitive Training Games</h1>
          <p className="dashboard-subtitle">Advanced neural training games designed to enhance specific cognitive functions</p>
          <div className="section-divider"></div>
        </div>

        <div className="games-grid">
          {brainGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-header">
                <h3 className="game-title">{game.title}</h3>
                <div className="game-badges">
                  <span className="category-badge">{game.category}</span>
                  <span className="difficulty-badge">{game.difficulty}</span>
                </div>
              </div>
              <p className="game-description">{game.description}</p>
              <div className="neural-target">
                <strong>Neural Target:</strong> {game.neuralTarget}
              </div>
              <button className="play-button">Launch Game</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
