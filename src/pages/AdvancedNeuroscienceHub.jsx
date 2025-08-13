import React, { useState, useEffect } from 'react'
import { 
  Brain, 
  Cpu, 
  Glasses, 
  Zap, 
  Activity, 
  Target, 
  Sparkles,
  Settings,
  TrendingUp,
  Network,
  Eye,
  Bot
} from 'lucide-react'
import AdvancedEEGMonitoring from '../components/AdvancedEEGMonitoring'
import NeuralNetworkLandscape from '../components/NeuralNetworkLandscape'
import AIReinforcementSystem from '../components/AIReinforcementSystem'
import EmotionResponsiveVR from '../components/EmotionResponsiveVR'
import AIAgent from '../components/AIAgent'
import BlockchainNFT from '../components/BlockchainNFT'
import EmotionResponsiveVR from '../components/EmotionResponsiveVR'

const AdvancedNeuroscienceHub = ({ user }) => {
  const [activeModule, setActiveModule] = useState('eeg-monitoring')
  const [systemState, setSystemState] = useState({
    eegConnected: false,
    aiTraining: false,
    vrActive: false,
    neuroplasticityScore: 0,
    cognitiveLoadIndex: 0,
    realTimeAdaptation: true
  })
  const [brainwaveData, setBrainwaveData] = useState(null)
  const [cognitiveMetrics, setCognitiveMetrics] = useState(null)
  const [adaptationHistory, setAdaptationHistory] = useState([])

  // Comprehensive module configurations
  const modules = {
    'eeg-monitoring': {
      name: 'Real-Time EEG Analysis',
      description: 'Advanced brainwave monitoring with OpenBCI, Muse SDK, and EMOTIV integration',
      icon: Brain,
      color: 'var(--neural-primary)',
      complexity: 'High',
      realTime: true,
      component: (
        <AdvancedEEGMonitoring 
          onBrainwaveChange={setBrainwaveData}
          onCognitiveStateChange={setCognitiveMetrics}
        />
      )
    },
    'neural-landscapes': {
      name: '3D Neural Network Landscapes',
      description: 'Procedural 3D visualization of memory pathways and neural connections',
      icon: Network,
      color: 'var(--neural-secondary)',
      complexity: 'Very High',
      realTime: true,
      component: (
        <NeuralNetworkLandscape 
          brainwaveData={brainwaveData}
          cognitiveState={cognitiveMetrics}
          onNeuralPathwayActivation={(pathway) => console.log('Neural pathway activated:', pathway)}
        />
      )
    },
    'ai-reinforcement': {
      name: 'AI Reinforcement Learning',
      description: 'TensorFlow/PyTorch models for autonomous difficulty adaptation',
      icon: Cpu,
      color: 'var(--neural-warning)',
      complexity: 'Expert',
      realTime: true,
      component: (
        <AIReinforcementSystem 
          userPerformance={{ accuracy: 85, speed: 1.2, engagement: 0.8 }}
          cognitiveData={cognitiveMetrics || {}}
          onAdaptationChange={(adaptation) => {
            setAdaptationHistory(prev => [...prev.slice(-9), adaptation])
          }}
        />
      )
    },
    'emotion-vr': {
      name: 'Emotion-Responsive VR/AR',
      description: 'Immersive environments that adapt to emotional and neural states',
      icon: Glasses,
      color: 'var(--neural-success)',
      complexity: 'Very High',
      realTime: true,
      component: (
        <EmotionResponsiveVR 
          emotionalData={cognitiveMetrics}
          eegData={brainwaveData}
          biometricData={{ heartRate: 72 }}
          onEnvironmentChange={(emotion, state) => console.log('Environment changed:', emotion, state)}
        />
      )
    },
    'ai-agent': {
      name: 'Autonomous Cognitive Agent',
      description: 'AI-powered personal cognitive enhancement assistant',
      icon: Bot,
      color: 'var(--neural-accent)',
      complexity: 'High',
      realTime: true,
      component: (
        <AIAgent 
          user={user}
          cognitiveData={cognitiveMetrics || {}}
          onRecommendation={(type) => console.log('AI Recommendation:', type)}
        />
      )
    },
    'blockchain-nft': {
      name: 'Dynamic NFT Achievements',
      description: 'Evolving blockchain assets based on cognitive milestones',
      icon: Sparkles,
      color: 'var(--neural-warning)',
      complexity: 'Medium',
      realTime: false,
      component: (
        <BlockchainNFT 
          user={user}
          cognitiveData={cognitiveMetrics || {}}
          achievements={{ sessionsCompleted: 45 }}
        />
      )
    },
    'vr-neural-env': {
      name: 'Neural VR Environment',
      description: 'Multi-sensory VR with neuro-responsive feedback systems',
      icon: Eye,
      color: 'var(--neural-secondary)',
      complexity: 'Very High',
      realTime: true,
      component: (
        <EmotionResponsiveVR
          emotionalData={{ mood: 'focused', energy: 'high' }}
          eegData={brainwaveData}
          biometricData={{ heartRate: 72 }}
          onEnvironmentChange={(emotion, state) => console.log('VR Environment changed:', emotion, state)}
        />
      )
    },
  }

  // System status monitoring
  useEffect(() => {
    const updateSystemState = () => {
      setSystemState(prev => ({
        ...prev,
        neuroplasticityScore: cognitiveMetrics?.neuroplasticity || Math.random() * 100,
        cognitiveLoadIndex: cognitiveMetrics?.workload || Math.random() * 100,
        eegConnected: brainwaveData ? true : false
      }))
    }

    const interval = setInterval(updateSystemState, 2000)
    return () => clearInterval(interval)
  }, [brainwaveData, cognitiveMetrics])

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Medium': return 'var(--neural-success)'
      case 'High': return 'var(--neural-warning)'
      case 'Very High': return 'var(--neural-error)'
      case 'Expert': return 'var(--neural-accent)'
      default: return 'var(--neural-primary)'
    }
  }

  return (
    <div className="advanced-neuroscience-hub">
      {/* Header */}
      <div className="hub-header slide-in-up">
        <div className="title-section">
          <h1 className="hub-title breathe-glow">
            <Brain size={32} />
            Advanced Neuroscience Platform
          </h1>
          <p className="hub-subtitle">
            Hyper-advanced cognitive enhancement with real-time EEG, AI adaptation, VR/AR environments, and blockchain gamification
          </p>
        </div>

        <div className="system-status">
          <div className="status-grid">
            <div className={`status-item ${systemState.eegConnected ? 'active' : ''}`}>
              <Brain size={16} />
              <span>EEG System</span>
              <div className={`status-dot ${systemState.eegConnected ? 'connected' : 'disconnected'}`}></div>
            </div>
            
            <div className={`status-item ${systemState.aiTraining ? 'active' : ''}`}>
              <Cpu size={16} />
              <span>AI Training</span>
              <div className={`status-dot ${systemState.aiTraining ? 'connected' : 'disconnected'}`}></div>
            </div>
            
            <div className={`status-item ${systemState.vrActive ? 'active' : ''}`}>
              <Glasses size={16} />
              <span>VR/AR</span>
              <div className={`status-dot ${systemState.vrActive ? 'connected' : 'disconnected'}`}></div>
            </div>
            
            <div className="status-item">
              <Target size={16} />
              <span>Adaptation</span>
              <div className={`status-dot ${systemState.realTimeAdaptation ? 'connected' : 'disconnected'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation */}
      <div className="module-navigation slide-in-up animate-delay-1">
        <div className="nav-grid">
          {Object.entries(modules).map(([key, module]) => {
            const IconComponent = module.icon
            return (
              <button
                key={key}
                className={`module-nav-item ${activeModule === key ? 'active' : ''}`}
                onClick={() => setActiveModule(key)}
                style={{ 
                  borderColor: activeModule === key ? module.color : 'var(--border-primary)',
                  background: activeModule === key ? `${module.color}15` : 'var(--bg-glass)'
                }}
              >
                <div className="nav-icon" style={{ background: module.color }}>
                  <IconComponent size={24} />
                </div>
                <div className="nav-content">
                  <h4>{module.name}</h4>
                  <p>{module.description}</p>
                  <div className="nav-meta">
                    <span 
                      className="complexity-badge"
                      style={{ background: getComplexityColor(module.complexity) }}
                    >
                      {module.complexity}
                    </span>
                    {module.realTime && (
                      <span className="realtime-badge neural-pulse">
                        Real-time
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Module */}
      <div className="active-module scale-in animate-delay-2">
        <div className="module-header">
          <div className="module-title">
            <div 
              className="module-icon neural-pulse" 
              style={{ background: modules[activeModule].color }}
            >
              {React.createElement(modules[activeModule].icon, { size: 28 })}
            </div>
            <div>
              <h2>{modules[activeModule].name}</h2>
              <p>{modules[activeModule].description}</p>
            </div>
          </div>
          
          <div className="module-controls">
            <div className="complexity-indicator">
              <span>Complexity:</span>
              <div 
                className="complexity-badge"
                style={{ background: getComplexityColor(modules[activeModule].complexity) }}
              >
                {modules[activeModule].complexity}
              </div>
            </div>
            
            {modules[activeModule].realTime && (
              <div className="realtime-indicator neural-pulse">
                <Activity size={16} />
                <span>Real-time Processing</span>
              </div>
            )}
          </div>
        </div>

        <div className="module-content">
          {modules[activeModule].component}
        </div>
      </div>

      {/* System Metrics */}
      <div className="system-metrics slide-in-up animate-delay-3">
        <h3>System Performance</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <TrendingUp size={20} />
              <span>Neuroplasticity Score</span>
            </div>
            <div className="metric-value">{systemState.neuroplasticityScore.toFixed(0)}</div>
            <div className="metric-bar">
              <div 
                className="metric-fill neural-pulse"
                style={{ 
                  width: `${systemState.neuroplasticityScore}%`,
                  background: 'var(--neural-success)'
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <Brain size={20} />
              <span>Cognitive Load Index</span>
            </div>
            <div className="metric-value">{systemState.cognitiveLoadIndex.toFixed(0)}</div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${systemState.cognitiveLoadIndex}%`,
                  background: systemState.cognitiveLoadIndex > 70 ? 'var(--neural-error)' : 'var(--neural-primary)'
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <Zap size={20} />
              <span>Adaptation Events</span>
            </div>
            <div className="metric-value">{adaptationHistory.length}</div>
            <div className="adaptation-timeline">
              {adaptationHistory.slice(-5).map((event, index) => (
                <div key={index} className="adaptation-dot" title={event.name}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="tech-stack slide-in-up animate-delay-4">
        <h3>Technology Integration</h3>
        <div className="tech-categories">
          <div className="tech-category">
            <h4>Neural Interfaces</h4>
            <div className="tech-tags">
              <span>OpenBCI</span>
              <span>Muse SDK</span>
              <span>EMOTIV PRO</span>
              <span>WebRTC</span>
              <span>BrainFlow</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>AI/ML Frameworks</h4>
            <div className="tech-tags">
              <span>TensorFlow.js</span>
              <span>PyTorch</span>
              <span>OpenAI API</span>
              <span>LangChain</span>
              <span>Reinforcement Learning</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>VR/AR Technologies</h4>
            <div className="tech-tags">
              <span>WebXR</span>
              <span>Three.js</span>
              <span>Unity WebGL</span>
              <span>ARCore</span>
              <span>Oculus SDK</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>Blockchain & NFTs</h4>
            <div className="tech-tags">
              <span>Ethereum</span>
              <span>Polygon</span>
              <span>Solana</span>
              <span>OpenZeppelin</span>
              <span>IPFS</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .advanced-neuroscience-hub {
          padding: 40px 24px 24px;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
        }

        .hub-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          gap: 32px;
        }

        .title-section {
          flex: 1;
        }

        .hub-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 2.5rem;
          font-weight: 800;
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }

        .hub-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 600px;
        }

        .system-status {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 16px;
          padding: 20px;
        }

        .status-grid {
          display: grid;
          gap: 12px;
          min-width: 200px;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .status-item.active {
          color: var(--text-primary);
          border-color: var(--neural-primary);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-left: auto;
        }

        .status-dot.connected {
          background: var(--neural-success);
          animation: pulse 2s ease-in-out infinite;
        }

        .status-dot.disconnected {
          background: var(--neural-error);
        }

        .module-navigation {
          margin-bottom: 32px;
        }

        .nav-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 16px;
        }

        .module-nav-item {
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

        .module-nav-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .module-nav-item.active {
          transform: translateY(-2px);
          box-shadow: var(--shadow-neural);
        }

        .nav-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
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
          margin-bottom: 8px;
        }

        .nav-meta {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .complexity-badge {
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .realtime-badge {
          padding: 3px 8px;
          background: var(--neural-primary);
          color: white;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .active-module {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 32px;
        }

        .module-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          gap: 24px;
        }

        .module-title {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .module-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .module-title h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .module-title p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .module-controls {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .complexity-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .realtime-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--neural-primary);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .module-content {
          min-height: 400px;
        }

        .system-metrics h3,
        .tech-stack h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .metric-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 20px;
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 12px;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .metric-bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
        }

        .metric-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .adaptation-timeline {
          display: flex;
          gap: 4px;
          margin-top: 8px;
        }

        .adaptation-dot {
          width: 8px;
          height: 8px;
          background: var(--neural-primary);
          border-radius: 50%;
          animation: pulse 1s ease-in-out infinite;
        }

        .tech-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
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

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-tags span {
          padding: 4px 8px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-primary);
          border-radius: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .tech-tags span:hover {
          background: var(--neural-primary);
          color: white;
          border-color: var(--neural-primary);
        }

        @media (max-width: 1200px) {
          .hub-header {
            flex-direction: column;
            gap: 24px;
          }

          .nav-grid {
            grid-template-columns: 1fr;
          }

          .module-header {
            flex-direction: column;
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .advanced-neuroscience-hub {
            padding: 20px 16px 16px;
          }

          .hub-title {
            font-size: 2rem;
          }

          .metrics-grid,
          .tech-categories {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default AdvancedNeuroscienceHub
