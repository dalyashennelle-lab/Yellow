import Sidebar from './components/Sidebar';
import AdvancedMemoryChallenge from './components/AdvancedMemoryChallenge';
import ResearchLab from './components/ResearchLab';
import AdvancedScience from './components/AdvancedScience';
import WinnersCelebration from './components/WinnersCelebration';

export default function Dashboard() {
  return (
    <div className="main-container">
      <Sidebar activeItem="dashboard" />

      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">NeuroMind Pro Dashboard</h1>
          <p className="dashboard-subtitle">Advanced Cognitive Enhancement Suite</p>
          <div className="section-divider"></div>
        </div>

        <div className="dashboard-grid">
          <div className="feature-overview">
            <h2 className="section-title">Cognitive Enhancement Suite</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎮</div>
                <h3>Brain Training Games</h3>
                <p>Advanced cognitive games designed to enhance specific neural pathways</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🧘</div>
                <h3>Mindfulness Training</h3>
                <p>Guided meditation and breathing exercises for mental clarity</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎵</div>
                <h3>Binaural Soundscapes</h3>
                <p>Brainwave entrainment through carefully crafted audio experiences</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h3>EEG Integration</h3>
                <p>Real-time brainwave monitoring and biofeedback training</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <h3>NFT Rewards</h3>
                <p>Earn unique cognitive achievement NFTs as you progress</p>
              </div>
            </div>
          </div>

          <AdvancedMemoryChallenge />
          
          <ResearchLab />
          
          <AdvancedScience />
          
          <WinnersCelebration />
        </div>
      </main>
    </div>
  );
}