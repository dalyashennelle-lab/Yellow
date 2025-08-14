
import Sidebar from './components/Sidebar';
import AdvancedMemoryChallenge from './components/AdvancedMemoryChallenge';
import ResearchLab from './components/ResearchLab';
import AdvancedScience from './components/AdvancedScience';
import WinnersCelebration from './components/WinnersCelebration';
import AIAgent from './components/AIAgent';
import BinauralBeats from './components/BinauralBeats';
import NeuralNetwork3D from './components/NeuralNetwork3D';

export default function Dashboard() {
  return (
    <div className="main-container">
      <Sidebar activeItem="dashboard" />

      <main className="main-content">
        <div className="dashboard-header">
          <div className="header-gradient">
            <h1 className="dashboard-title">NeuroMind Pro Dashboard</h1>
            <p className="dashboard-subtitle">Next-Generation Cognitive Enhancement Suite</p>
            <div className="neural-particles"></div>
          </div>
          <div className="section-divider"></div>
        </div>

        <div className="advanced-metrics-grid">
          <div className="metric-card premium">
            <div className="metric-icon">🧠</div>
            <div className="metric-content">
              <div className="metric-value">98.2%</div>
              <div className="metric-label">Neural Efficiency</div>
              <div className="metric-trend positive">↗ +12.4%</div>
            </div>
            <div className="metric-sparkline"></div>
          </div>
          
          <div className="metric-card premium">
            <div className="metric-icon">⚡</div>
            <div className="metric-content">
              <div className="metric-value">847ms</div>
              <div className="metric-label">Reaction Time</div>
              <div className="metric-trend positive">↗ -23ms</div>
            </div>
            <div className="metric-sparkline"></div>
          </div>
          
          <div className="metric-card premium">
            <div className="metric-icon">🎯</div>
            <div className="metric-content">
              <div className="metric-value">92.8%</div>
              <div className="metric-label">Focus Index</div>
              <div className="metric-trend positive">↗ +8.1%</div>
            </div>
            <div className="metric-sparkline"></div>
          </div>
          
          <div className="metric-card premium">
            <div className="metric-icon">💎</div>
            <div className="metric-content">
              <div className="metric-value">1,247</div>
              <div className="metric-label">Neural Score</div>
              <div className="metric-trend positive">↗ +156</div>
            </div>
            <div className="metric-sparkline"></div>
          </div>
        </div>

        <div className="dashboard-row">
          <div className="ai-section">
            <AIAgent />
          </div>
          <div className="binaural-section">
            <BinauralBeats />
          </div>
        </div>

        <div className="neural-visualization-section">
          <NeuralNetwork3D 
            cognitiveLoad={75} 
            focusLevel={85} 
            memoryScore={92} 
          />
        </div>

        <div className="dashboard-grid">
          <div className="feature-overview advanced">
            <div className="section-header">
              <h2 className="section-title">Cognitive Enhancement Suite</h2>
              <div className="enhancement-badge">AI-Powered</div>
            </div>
            
            <div className="features-grid advanced">
              <div className="feature-card premium">
                <div className="feature-background"></div>
                <div className="feature-icon">🎮</div>
                <h3>Advanced Brain Training</h3>
                <p>AI-adaptive games that evolve with your cognitive profile using machine learning algorithms</p>
                <div className="feature-stats">
                  <span className="stat">+34% Memory</span>
                  <span className="stat">+28% Focus</span>
                </div>
                <div className="feature-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '78%'}}></div>
                  </div>
                  <span className="progress-text">78% Mastery</span>
                </div>
              </div>
              
              <div className="feature-card premium">
                <div className="feature-background"></div>
                <div className="feature-icon">🧘</div>
                <h3>Neural Meditation</h3>
                <p>EEG-guided meditation with real-time brainwave feedback and personalized protocols</p>
                <div className="feature-stats">
                  <span className="stat">-42% Stress</span>
                  <span className="stat">+56% Clarity</span>
                </div>
                <div className="feature-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '91%'}}></div>
                  </div>
                  <span className="progress-text">91% Mastery</span>
                </div>
              </div>
              
              <div className="feature-card premium">
                <div className="feature-background"></div>
                <div className="feature-icon">🎵</div>
                <h3>Quantum Soundscapes</h3>
                <p>Binaural beats with quantum harmonics for enhanced cognitive states and neuroplasticity</p>
                <div className="feature-stats">
                  <span className="stat">+67% Learning</span>
                  <span className="stat">+39% Creativity</span>
                </div>
                <div className="feature-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '84%'}}></div>
                  </div>
                  <span className="progress-text">84% Mastery</span>
                </div>
              </div>
              
              <div className="feature-card premium">
                <div className="feature-background"></div>
                <div className="feature-icon">🧠</div>
                <h3>Real-time EEG Analysis</h3>
                <p>Advanced neural monitoring with AI-powered insights and personalized optimization</p>
                <div className="feature-stats">
                  <span className="stat">Real-time</span>
                  <span className="stat">AI Analysis</span>
                </div>
                <div className="feature-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '96%'}}></div>
                  </div>
                  <span className="progress-text">96% Accuracy</span>
                </div>
              </div>
              
              <div className="feature-card premium">
                <div className="feature-background"></div>
                <div className="feature-icon">🏆</div>
                <h3>Dynamic NFT Rewards</h3>
                <p>Blockchain-verified cognitive achievements with evolving metadata and utility</p>
                <div className="feature-stats">
                  <span className="stat">12 Earned</span>
                  <span className="stat">Rare Traits</span>
                </div>
                <div className="feature-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '73%'}}></div>
                  </div>
                  <span className="progress-text">Collection 73%</span>
                </div>
              </div>
              
              <div className="feature-card premium">
                <div className="feature-background"></div>
                <div className="feature-icon">🔬</div>
                <h3>Research Integration</h3>
                <p>Contribute to cutting-edge neuroscience research while enhancing your cognitive abilities</p>
                <div className="feature-stats">
                  <span className="stat">5 Studies</span>
                  <span className="stat">Contributing</span>
                </div>
                <div className="feature-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '88%'}}></div>
                  </div>
                  <span className="progress-text">88% Participation</span>
                </div>
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
