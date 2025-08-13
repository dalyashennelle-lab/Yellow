import React, { useState } from 'react'
import { 
  Cpu, 
  Coins, 
  Glasses, 
  Play, 
  Sparkles,
  ChevronRight,
  Zap,
  Brain,
  Bot
} from 'lucide-react'
import AIAgent from '../components/AIAgent'
import BlockchainNFT from '../components/BlockchainNFT'
import VRNeuralEnvironment from '../components/VRNeuralEnvironment'
import VideoIntegration from '../components/VideoIntegration'

const AdvancedFeatures = ({ user }) => {
  const [activeSection, setActiveSection] = useState('ai-agent')
  
  // Mock data for components
  const cognitiveData = {
    memoryHealth: 87,
    focusLevel: 80,
    cognitiveLoad: 44,
    stressLevel: 74,
    emotionDetect: 82,
    neuroplasticity: 85,
    avgSleep: 6.8,
    heartRate: 72
  }

  const sections = {
    'ai-agent': {
      title: 'AI Cognitive Agent',
      description: 'Autonomous agent providing personalized recommendations',
      icon: Bot,
      color: 'var(--neural-primary)',
      component: (
        <AIAgent 
          user={user || { name: 'User', streak: 28 }}
          cognitiveData={cognitiveData}
          onRecommendation={(type) => console.log('AI Recommendation:', type)}
        />
      )
    },
    'blockchain-nft': {
      title: 'Dynamic NFT Collection',
      description: 'Evolving NFTs that grow with your cognitive progress',
      icon: Coins,
      color: 'var(--neural-warning)',
      component: (
        <BlockchainNFT 
          user={user || { name: 'User', streak: 28 }}
          cognitiveData={cognitiveData}
          achievements={{ sessionsCompleted: 35 }}
        />
      )
    },
    'vr-neural': {
      title: 'VR Neural Environments',
      description: 'Immersive neuro-responsive VR/AR experiences',
      icon: Glasses,
      color: 'var(--neural-secondary)',
      component: (
        <VRNeuralEnvironment 
          cognitiveData={cognitiveData}
          emotionalState={{ mood: 'calm', energy: 'moderate' }}
          biometricData={{ heartRate: cognitiveData.heartRate }}
        />
      )
    },
    'video-library': {
      title: 'Interactive Video Library',
      description: 'Curated meditation, breathing, and yoga content',
      icon: Play,
      color: 'var(--neural-success)',
      component: (
        <VideoIntegration 
          user={user || { name: 'User', streak: 28 }}
          onVideoComplete={(video) => console.log('Video completed:', video)}
          onVideoStart={(video) => console.log('Video started:', video)}
        />
      )
    }
  }

  return (
    <div className="advanced-features">
      <div className="page-header slide-in-up">
        <h1 className="heading-xl breathe-glow">Advanced Features</h1>
        <p>Experience cutting-edge AI, blockchain, VR/AR, and multimedia integration</p>
      </div>

      {/* Feature Navigation */}
      <div className="feature-nav slide-in-up animate-delay-1">
        {Object.entries(sections).map(([key, section]) => {
          const IconComponent = section.icon
          return (
            <button
              key={key}
              className={`nav-item ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
              style={{ 
                borderColor: activeSection === key ? section.color : 'var(--border-primary)',
                background: activeSection === key ? `${section.color}15` : 'var(--bg-glass)'
              }}
            >
              <div className="nav-icon" style={{ background: section.color }}>
                <IconComponent size={20} />
              </div>
              <div className="nav-content">
                <h4>{section.title}</h4>
                <p>{section.description}</p>
              </div>
              <ChevronRight size={16} className={`nav-arrow ${activeSection === key ? 'active' : ''}`} />
            </button>
          )
        })}
      </div>

      {/* Active Feature */}
      <div className="active-feature scale-in animate-delay-2">
        <div className="feature-header">
          <div className="feature-title">
            <div 
              className="title-icon neural-pulse" 
              style={{ background: sections[activeSection].color }}
            >
              {React.createElement(sections[activeSection].icon, { size: 24 })}
            </div>
            <div>
              <h2>{sections[activeSection].title}</h2>
              <p>{sections[activeSection].description}</p>
            </div>
          </div>
        </div>

        <div className="feature-content">
          {sections[activeSection].component}
        </div>
      </div>

      {/* Technology Stack Info */}
      <div className="tech-stack slide-in-up animate-delay-3">
        <h3>
          <Sparkles size={20} />
          Technology Stack
        </h3>
        <div className="tech-grid">
          <div className="tech-category">
            <h4>AI & Agents</h4>
            <div className="tech-list">
              <span>LangChain Agents</span>
              <span>GPT-4o Mini</span>
              <span>PyTorch RL</span>
              <span>OpenAI Embeddings</span>
              <span>Modal Serverless</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>Blockchain & NFTs</h4>
            <div className="tech-list">
              <span>Ethereum</span>
              <span>Polygon</span>
              <span>Solana</span>
              <span>OpenZeppelin</span>
              <span>Chainlink Oracles</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>VR/AR & 3D</h4>
            <div className="tech-list">
              <span>Unity 3D</span>
              <span>WebXR</span>
              <span>Three.js</span>
              <span>HaptX</span>
              <span>WebGL Shaders</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>Neurofeedback</h4>
            <div className="tech-list">
              <span>MNE Python</span>
              <span>BrainFlow</span>
              <span>TensorFlow</span>
              <span>OpenCV</span>
              <span>Muse EEG SDK</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .advanced-features {
          padding: 80px 24px 24px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .page-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .page-header h1 {
          margin-bottom: 16px;
        }

        .page-header p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .feature-nav {
          display: grid;
          gap: 16px;
          margin-bottom: 40px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: var(--bg-glass);
          border: 2px solid var(--border-primary);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
        }

        .nav-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .nav-item.active {
          transform: translateY(-2px);
          box-shadow: var(--shadow-neural);
        }

        .nav-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .nav-content {
          flex: 1;
        }

        .nav-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .nav-content p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .nav-arrow {
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .nav-arrow.active {
          color: var(--neural-primary);
          transform: rotate(90deg);
        }

        .active-feature {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 48px;
        }

        .feature-header {
          margin-bottom: 32px;
        }

        .feature-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .title-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .feature-title h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .feature-title p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .feature-content {
          position: relative;
        }

        .tech-stack {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 20px;
          padding: 32px;
        }

        .tech-stack h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .tech-category {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 20px;
        }

        .tech-category h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .tech-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tech-list span {
          padding: 6px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .tech-list span:hover {
          background: var(--neural-primary);
          color: white;
          border-color: var(--neural-primary);
        }

        @media (max-width: 768px) {
          .feature-nav {
            grid-template-columns: 1fr;
          }

          .nav-item {
            padding: 16px;
          }

          .tech-grid {
            grid-template-columns: 1fr;
          }

          .feature-title {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  )
}

export default AdvancedFeatures
