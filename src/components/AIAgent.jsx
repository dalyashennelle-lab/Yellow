import React, { useState, useEffect } from 'react'
import { 
  Brain, 
  Cpu, 
  Zap, 
  TrendingUp, 
  Target, 
  Bot,
  Sparkles,
  Activity,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Settings
} from 'lucide-react'

const AIAgent = ({ user, cognitiveData, onRecommendation }) => {
  const [agentState, setAgentState] = useState('analyzing') // analyzing, recommending, adapting, learning
  const [recommendations, setRecommendations] = useState([])
  const [agentPersonality, setAgentPersonality] = useState('adaptive')
  const [learningProgress, setLearningProgress] = useState({
    dataProcessed: 0,
    patternsIdentified: 0,
    adaptationsApplied: 0,
    predictionAccuracy: 0
  })
  const [currentTask, setCurrentTask] = useState('')
  const [agentThoughts, setAgentThoughts] = useState([])

  // AI Agent Personalities
  const agentPersonalities = {
    adaptive: {
      name: 'NeuroAdapt',
      description: 'Continuously adapts to your cognitive patterns',
      color: 'var(--neural-primary)',
      traits: ['Pattern Recognition', 'Adaptive Learning', 'Personalization']
    },
    predictive: {
      name: 'CogniPredict',
      description: 'Predicts optimal challenge levels and outcomes',
      color: 'var(--neural-secondary)',
      traits: ['Predictive Modeling', 'Risk Assessment', 'Optimization']
    },
    creative: {
      name: 'NeuroCraft',
      description: 'Generates unique experiences and challenges',
      color: 'var(--neural-accent)',
      traits: ['Content Generation', 'Creative Problem Solving', 'Innovation']
    },
    therapeutic: {
      name: 'TherapyAI',
      description: 'Focuses on therapeutic interventions and healing',
      color: 'var(--neural-success)',
      traits: ['Therapeutic Protocols', 'Emotional Support', 'Recovery Optimization']
    }
  }

  // Simulate AI Agent Processing
  useEffect(() => {
    const processData = () => {
      setCurrentTask('Analyzing cognitive patterns...')
      
      // Simulate real-time learning
      const interval = setInterval(() => {
        setLearningProgress(prev => ({
          dataProcessed: Math.min(prev.dataProcessed + Math.random() * 5, 100),
          patternsIdentified: Math.min(prev.patternsIdentified + Math.random() * 2, 50),
          adaptationsApplied: Math.min(prev.adaptationsApplied + Math.random() * 1, 25),
          predictionAccuracy: Math.min(prev.predictionAccuracy + Math.random() * 0.5, 99.9)
        }))
        
        // Add AI thoughts
        const thoughts = [
          'Detecting optimal learning windows...',
          'Correlating stress patterns with performance...',
          'Identifying cognitive load thresholds...',
          'Analyzing neuroplasticity indicators...',
          'Optimizing task difficulty parameters...',
          'Predicting optimal intervention timing...',
          'Generating personalized content...',
          'Updating behavioral models...'
        ]
        
        setAgentThoughts(prev => {
          const newThought = thoughts[Math.floor(Math.random() * thoughts.length)]
          return [newThought, ...prev.slice(0, 4)]
        })
      }, 2000)

      return () => clearInterval(interval)
    }

    const timeout = setTimeout(processData, 1000)
    return () => clearTimeout(timeout)
  }, [cognitiveData])

  // Generate AI Recommendations
  useEffect(() => {
    const generateRecommendations = () => {
      const newRecommendations = []
      
      // Analyze cognitive data and generate recommendations
      if (cognitiveData.memoryHealth < 85) {
        newRecommendations.push({
          id: 'memory-boost',
          type: 'cognitive-training',
          priority: 'high',
          title: 'Memory Enhancement Protocol',
          description: 'Adaptive memory training with difficulty scaling',
          estimatedImprovement: 15,
          confidence: 94,
          duration: '10-15 minutes',
          action: () => onRecommendation('memory-training')
        })
      }

      if (cognitiveData.stressLevel > 70) {
        newRecommendations.push({
          id: 'stress-relief',
          type: 'mindfulness',
          priority: 'urgent',
          title: 'Stress Reduction VR Session',
          description: 'Immersive calming environment with biofeedback',
          estimatedImprovement: 25,
          confidence: 97,
          duration: '5-8 minutes',
          action: () => onRecommendation('vr-mindfulness')
        })
      }

      if (cognitiveData.focusLevel < 75) {
        newRecommendations.push({
          id: 'focus-training',
          type: 'attention',
          priority: 'medium',
          title: 'Attention Restoration Protocol',
          description: 'Gamified attention training with real-time EEG feedback',
          estimatedImprovement: 20,
          confidence: 91,
          duration: '12-18 minutes',
          action: () => onRecommendation('focus-games')
        })
      }

      // Neural landscape recommendation
      newRecommendations.push({
        id: 'neural-landscape',
        type: 'exploration',
        priority: 'low',
        title: 'Neural Landscape Exploration',
        description: 'Explore procedurally generated brain networks in VR',
        estimatedImprovement: 10,
        confidence: 88,
        duration: '15-25 minutes',
        action: () => onRecommendation('neural-vr')
      })

      setRecommendations(newRecommendations)
      setAgentState('recommending')
    }

    const timeout = setTimeout(generateRecommendations, 5000)
    return () => clearTimeout(timeout)
  }, [cognitiveData, onRecommendation])

  const getCurrentPersonality = () => agentPersonalities[agentPersonality]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'var(--neural-error)'
      case 'high': return 'var(--neural-warning)'
      case 'medium': return 'var(--neural-primary)'
      case 'low': return 'var(--neural-success)'
      default: return 'var(--neural-primary)'
    }
  }

  return (
    <div className="ai-agent-container">
      {/* Agent Header */}
      <div className="agent-header">
        <div className="agent-avatar neural-pulse">
          <Bot size={32} />
        </div>
        <div className="agent-info">
          <h3 className="agent-name">{getCurrentPersonality().name}</h3>
          <p className="agent-description">{getCurrentPersonality().description}</p>
          <div className="agent-status">
            <div className={`status-indicator ${agentState}`}></div>
            <span className="status-text">{agentState.charAt(0).toUpperCase() + agentState.slice(1)}</span>
          </div>
        </div>
        <div className="agent-controls">
          <button className="control-btn" onClick={() => setAgentPersonality(
            Object.keys(agentPersonalities)[
              (Object.keys(agentPersonalities).indexOf(agentPersonality) + 1) % 
              Object.keys(agentPersonalities).length
            ]
          )}>
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Agent Traits */}
      <div className="agent-traits">
        {getCurrentPersonality().traits.map((trait, index) => (
          <div key={trait} className={`trait-badge float-${index % 3 === 0 ? 'slow' : index % 3 === 1 ? 'medium' : 'fast'}`}>
            <Sparkles size={12} />
            <span>{trait}</span>
          </div>
        ))}
      </div>

      {/* Learning Progress */}
      <div className="learning-progress">
        <h4>AI Learning Progress</h4>
        <div className="progress-grid">
          <div className="progress-item">
            <div className="progress-label">
              <Cpu size={16} />
              <span>Data Processed</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill neural-pulse"
                style={{ width: `${learningProgress.dataProcessed}%` }}
              ></div>
            </div>
            <span className="progress-value">{Math.round(learningProgress.dataProcessed)}%</span>
          </div>

          <div className="progress-item">
            <div className="progress-label">
              <Brain size={16} />
              <span>Patterns Found</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${(learningProgress.patternsIdentified / 50) * 100}%`,
                  background: 'var(--neural-secondary)'
                }}
              ></div>
            </div>
            <span className="progress-value">{Math.round(learningProgress.patternsIdentified)}</span>
          </div>

          <div className="progress-item">
            <div className="progress-label">
              <Target size={16} />
              <span>Accuracy</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${learningProgress.predictionAccuracy}%`,
                  background: 'var(--neural-success)'
                }}
              ></div>
            </div>
            <span className="progress-value">{learningProgress.predictionAccuracy.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Agent Thoughts */}
      <div className="agent-thoughts">
        <h4>Current Processing</h4>
        <div className="thoughts-stream">
          {agentThoughts.map((thought, index) => (
            <div 
              key={index} 
              className={`thought-item slide-in-left animate-delay-${index + 1}`}
              style={{ opacity: 1 - (index * 0.2) }}
            >
              <Activity size={12} className="neural-pulse" />
              <span>{thought}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="ai-recommendations">
        <h4>Personalized Recommendations</h4>
        <div className="recommendations-list">
          {recommendations.map((rec, index) => (
            <div 
              key={rec.id} 
              className={`recommendation-card scale-in animate-delay-${index + 1}`}
              style={{ borderLeft: `4px solid ${getPriorityColor(rec.priority)}` }}
            >
              <div className="rec-header">
                <div className="rec-priority" style={{ background: getPriorityColor(rec.priority) }}>
                  {rec.priority}
                </div>
                <div className="rec-confidence">
                  <TrendingUp size={12} />
                  <span>{rec.confidence}% confidence</span>
                </div>
              </div>
              
              <h5 className="rec-title">{rec.title}</h5>
              <p className="rec-description">{rec.description}</p>
              
              <div className="rec-metrics">
                <div className="metric">
                  <span className="metric-label">Expected Improvement:</span>
                  <span className="metric-value">+{rec.estimatedImprovement}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Duration:</span>
                  <span className="metric-value">{rec.duration}</span>
                </div>
              </div>
              
              <button 
                className="rec-action-btn breathe-glow"
                onClick={rec.action}
              >
                <Play size={16} />
                Start Session
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ai-agent-container {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border-primary);
          position: relative;
          overflow: hidden;
        }

        .ai-agent-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--gradient-neural);
          animation: scan 3s ease-in-out infinite;
        }

        @keyframes scan {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        .agent-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .agent-avatar {
          width: 64px;
          height: 64px;
          background: var(--gradient-neural);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .agent-info {
          flex: 1;
        }

        .agent-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .agent-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 8px;
        }

        .agent-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .status-indicator.analyzing { background: var(--neural-warning); }
        .status-indicator.recommending { background: var(--neural-primary); }
        .status-indicator.adapting { background: var(--neural-secondary); }
        .status-indicator.learning { background: var(--neural-success); }

        .status-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          font-weight: 600;
        }

        .agent-controls {
          display: flex;
          gap: 8px;
        }

        .control-btn {
          width: 32px;
          height: 32px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-btn:hover {
          background: var(--neural-primary);
          color: white;
          border-color: var(--neural-primary);
        }

        .agent-traits {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .trait-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .learning-progress {
          margin-bottom: 24px;
        }

        .learning-progress h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .progress-grid {
          display: grid;
          gap: 12px;
        }

        .progress-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 12px;
          align-items: center;
        }

        .progress-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          min-width: 120px;
        }

        .progress-bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--neural-primary);
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .progress-value {
          font-size: 0.75rem;
          color: var(--text-primary);
          font-weight: 600;
          min-width: 40px;
          text-align: right;
        }

        .agent-thoughts {
          margin-bottom: 24px;
        }

        .agent-thoughts h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .thoughts-stream {
          max-height: 120px;
          overflow: hidden;
        }

        .thought-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: opacity 0.3s ease;
        }

        .ai-recommendations h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .recommendations-list {
          display: grid;
          gap: 16px;
        }

        .recommendation-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .recommendation-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .rec-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .rec-priority {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        .rec-confidence {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        .rec-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .rec-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .rec-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 16px;
        }

        .metric {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .metric-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .metric-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .rec-action-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: var(--gradient-neural);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .rec-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

export default AIAgent
