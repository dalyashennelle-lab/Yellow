import React, { useState, useEffect, useRef } from 'react'
import { 
  Brain, 
  Cpu, 
  Target, 
  TrendingUp, 
  Zap, 
  Activity, 
  BarChart3, 
  Settings,
  Play,
  Pause,
  RefreshCw,
  Layers,
  Network,
  GitBranch,
  Sparkles,
  Award,
  LineChart,
  PieChart,
  Gauge
} from 'lucide-react'

const AIReinforcementSystem = ({ userPerformance, cognitiveData, onAdaptationChange }) => {
  const [aiModel, setAiModel] = useState('dqn') // dqn, ppo, a3c, sac
  const [isTraining, setIsTraining] = useState(false)
  const [modelMetrics, setModelMetrics] = useState({
    episodes: 0,
    totalReward: 0,
    averageReward: 0,
    explorationRate: 1.0,
    learningRate: 0.001,
    loss: 0,
    accuracy: 0,
    convergence: 0
  })
  const [adaptationState, setAdaptationState] = useState({
    difficultyLevel: 0.5,
    taskType: 'memory',
    cognitiveLoad: 0.4,
    engagementBoost: 0,
    personalizedFactors: {},
    adaptationHistory: []
  })
  const [qTable, setQTable] = useState({})
  const [neuralNetwork, setNeuralNetwork] = useState({
    layers: [
      { name: 'Input', neurons: 128, activation: 'relu' },
      { name: 'Hidden1', neurons: 256, activation: 'relu' },
      { name: 'Hidden2', neurons: 128, activation: 'relu' },
      { name: 'Output', neurons: 64, activation: 'softmax' }
    ],
    weights: null,
    gradients: null
  })
  const [rewardSignals, setRewardSignals] = useState([])
  const [actionSpace, setActionSpace] = useState([])
  const trainingRef = useRef(null)

  // AI Model Configurations
  const modelConfigs = {
    dqn: {
      name: 'Deep Q-Network',
      description: 'Value-based RL for discrete action spaces',
      algorithm: 'Q-Learning with Neural Networks',
      complexity: 'Medium',
      suitability: 'Task difficulty adaptation',
      icon: Brain
    },
    ppo: {
      name: 'Proximal Policy Optimization',
      description: 'Policy gradient method with stability',
      algorithm: 'Actor-Critic with PPO',
      complexity: 'High',
      suitability: 'Continuous adaptation',
      icon: Cpu
    },
    a3c: {
      name: 'Asynchronous Actor-Critic',
      description: 'Multi-threaded policy learning',
      algorithm: 'Advantage Actor-Critic',
      complexity: 'High',
      suitability: 'Multi-task learning',
      icon: Network
    },
    sac: {
      name: 'Soft Actor-Critic',
      description: 'Maximum entropy RL approach',
      algorithm: 'Off-policy Actor-Critic',
      complexity: 'Very High',
      suitability: 'Exploration-exploitation balance',
      icon: Sparkles
    }
  }

  // Initialize RL system
  useEffect(() => {
    initializeRLSystem()
  }, [aiModel])

  // Training loop
  useEffect(() => {
    if (isTraining) {
      startTraining()
    } else {
      stopTraining()
    }
    
    return () => stopTraining()
  }, [isTraining])

  // Update based on user performance
  useEffect(() => {
    if (userPerformance && cognitiveData) {
      processUserFeedback(userPerformance, cognitiveData)
    }
  }, [userPerformance, cognitiveData])

  const initializeRLSystem = () => {
    // Initialize state space (cognitive metrics)
    const stateSpace = [
      'attention_level',
      'memory_performance',
      'stress_level',
      'engagement_score',
      'fatigue_level',
      'learning_rate',
      'time_of_day',
      'session_duration'
    ]

    // Initialize action space (adaptation parameters)
    const actions = [
      { id: 0, name: 'increase_difficulty', params: { delta: 0.1 } },
      { id: 1, name: 'decrease_difficulty', params: { delta: -0.1 } },
      { id: 2, name: 'change_task_type', params: { type: 'random' } },
      { id: 3, name: 'adjust_timing', params: { factor: 1.2 } },
      { id: 4, name: 'provide_hint', params: { level: 1 } },
      { id: 5, name: 'increase_engagement', params: { boost: 0.2 } },
      { id: 6, name: 'reduce_cognitive_load', params: { reduction: 0.15 } },
      { id: 7, name: 'no_change', params: {} }
    ]

    setActionSpace(actions)

    // Initialize Q-table for DQN
    if (aiModel === 'dqn') {
      const initialQTable = {}
      stateSpace.forEach(state => {
        initialQTable[state] = {}
        actions.forEach(action => {
          initialQTable[state][action.id] = Math.random() * 0.1
        })
      })
      setQTable(initialQTable)
    }

    // Initialize neural network weights
    initializeNeuralNetwork()
    
    // Reset metrics
    setModelMetrics({
      episodes: 0,
      totalReward: 0,
      averageReward: 0,
      explorationRate: 1.0,
      learningRate: 0.001,
      loss: 0,
      accuracy: 0,
      convergence: 0
    })
  }

  const initializeNeuralNetwork = () => {
    const layers = neuralNetwork.layers
    const weights = {}
    const gradients = {}

    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = layers[i]
      const nextLayer = layers[i + 1]
      
      // Initialize weights with Xavier initialization
      weights[`layer_${i}`] = Array(currentLayer.neurons).fill().map(() =>
        Array(nextLayer.neurons).fill().map(() =>
          (Math.random() - 0.5) * Math.sqrt(2 / currentLayer.neurons)
        )
      )
      
      gradients[`layer_${i}`] = Array(currentLayer.neurons).fill().map(() =>
        Array(nextLayer.neurons).fill(0)
      )
    }

    setNeuralNetwork(prev => ({
      ...prev,
      weights,
      gradients
    }))
  }

  const startTraining = () => {
    trainingRef.current = setInterval(() => {
      runTrainingEpisode()
    }, 1000) // Train every second for demo
  }

  const stopTraining = () => {
    if (trainingRef.current) {
      clearInterval(trainingRef.current)
      trainingRef.current = null
    }
  }

  const runTrainingEpisode = () => {
    // Get current state from cognitive data
    const currentState = extractState(cognitiveData)
    
    // Choose action using epsilon-greedy policy
    const action = chooseAction(currentState)
    
    // Simulate environment response
    const { nextState, reward, done } = simulateEnvironment(currentState, action)
    
    // Update model based on algorithm
    updateModel(currentState, action, reward, nextState, done)
    
    // Update metrics
    setModelMetrics(prev => {
      const newEpisodes = prev.episodes + 1
      const newTotalReward = prev.totalReward + reward
      const newAverageReward = newTotalReward / newEpisodes
      
      return {
        ...prev,
        episodes: newEpisodes,
        totalReward: newTotalReward,
        averageReward: newAverageReward,
        explorationRate: Math.max(0.01, prev.explorationRate * 0.995),
        loss: Math.random() * 0.1, // Simulated loss
        accuracy: Math.min(1, newAverageReward / 10), // Simulated accuracy
        convergence: Math.min(1, newEpisodes / 1000) // Simulated convergence
      }
    })
    
    // Apply adaptation
    applyAdaptation(action)
  }

  const extractState = (data) => {
    if (!data) return Array(8).fill(0)
    
    return [
      data.focusLevel / 100,
      data.memoryHealth / 100,
      data.stressLevel / 100,
      data.emotionDetect / 100,
      data.cognitiveLoad / 100,
      data.neuroplasticity / 100,
      (new Date().getHours()) / 24,
      Math.random() // Session duration normalized
    ]
  }

  const chooseAction = (state) => {
    const explorationRate = modelMetrics.explorationRate
    
    if (Math.random() < explorationRate) {
      // Explore: random action
      return actionSpace[Math.floor(Math.random() * actionSpace.length)]
    } else {
      // Exploit: best action according to current policy
      return getBestAction(state)
    }
  }

  const getBestAction = (state) => {
    let bestAction = actionSpace[0]
    let bestValue = -Infinity
    
    if (aiModel === 'dqn') {
      // Use Q-table for action selection
      actionSpace.forEach(action => {
        const stateKey = state.map(s => Math.round(s * 10)).join(',')
        const qValue = qTable[stateKey]?.[action.id] || 0
        if (qValue > bestValue) {
          bestValue = qValue
          bestAction = action
        }
      })
    } else {
      // Use neural network for policy estimation
      const networkOutput = forwardPass(state)
      const bestActionIndex = networkOutput.indexOf(Math.max(...networkOutput))
      bestAction = actionSpace[bestActionIndex] || actionSpace[0]
    }
    
    return bestAction
  }

  const forwardPass = (input) => {
    let activation = [...input]
    const layers = neuralNetwork.layers
    const weights = neuralNetwork.weights
    
    for (let i = 0; i < layers.length - 1; i++) {
      const layerWeights = weights[`layer_${i}`]
      if (!layerWeights) continue
      
      const nextActivation = Array(layers[i + 1].neurons).fill(0)
      
      for (let j = 0; j < activation.length; j++) {
        for (let k = 0; k < nextActivation.length; k++) {
          if (layerWeights[j] && layerWeights[j][k] !== undefined) {
            nextActivation[k] += activation[j] * layerWeights[j][k]
          }
        }
      }
      
      // Apply activation function
      const activationFunction = layers[i + 1].activation
      activation = nextActivation.map(x => applyActivation(x, activationFunction))
    }
    
    return activation
  }

  const applyActivation = (x, type) => {
    switch (type) {
      case 'relu':
        return Math.max(0, x)
      case 'sigmoid':
        return 1 / (1 + Math.exp(-x))
      case 'softmax':
        return Math.exp(x) // Simplified, should normalize across all outputs
      default:
        return x
    }
  }

  const simulateEnvironment = (state, action) => {
    // Simulate user response to adaptation
    const baseReward = Math.random() * 10
    
    // Adjust reward based on action appropriateness
    let reward = baseReward
    
    // High stress should trigger load reduction
    if (state[2] > 0.7 && action.name === 'reduce_cognitive_load') {
      reward += 5
    }
    
    // Low engagement should trigger engagement boost
    if (state[3] < 0.4 && action.name === 'increase_engagement') {
      reward += 3
    }
    
    // Low performance should trigger difficulty reduction
    if (state[1] < 0.5 && action.name === 'decrease_difficulty') {
      reward += 4
    }
    
    // Generate next state
    const nextState = state.map((s, i) => {
      let newValue = s + (Math.random() - 0.5) * 0.1
      
      // Apply action effects
      if (action.name === 'reduce_cognitive_load' && i === 4) {
        newValue = Math.max(0, newValue - 0.1)
      }
      if (action.name === 'increase_engagement' && i === 3) {
        newValue = Math.min(1, newValue + 0.15)
      }
      
      return Math.max(0, Math.min(1, newValue))
    })
    
    const done = Math.random() < 0.1 // 10% chance episode ends
    
    return { nextState, reward, done }
  }

  const updateModel = (state, action, reward, nextState, done) => {
    if (aiModel === 'dqn') {
      updateQTable(state, action, reward, nextState, done)
    } else {
      updateNeuralNetwork(state, action, reward, nextState, done)
    }
  }

  const updateQTable = (state, action, reward, nextState, done) => {
    const alpha = modelMetrics.learningRate
    const gamma = 0.95 // Discount factor
    
    const stateKey = state.map(s => Math.round(s * 10)).join(',')
    const nextStateKey = nextState.map(s => Math.round(s * 10)).join(',')
    
    // Initialize if not exists
    if (!qTable[stateKey]) {
      qTable[stateKey] = {}
      actionSpace.forEach(a => {
        qTable[stateKey][a.id] = 0
      })
    }
    
    if (!qTable[nextStateKey]) {
      qTable[nextStateKey] = {}
      actionSpace.forEach(a => {
        qTable[nextStateKey][a.id] = 0
      })
    }
    
    // Q-learning update
    const currentQ = qTable[stateKey][action.id] || 0
    const maxNextQ = done ? 0 : Math.max(...Object.values(qTable[nextStateKey]))
    const targetQ = reward + gamma * maxNextQ
    
    qTable[stateKey][action.id] = currentQ + alpha * (targetQ - currentQ)
    
    setQTable({ ...qTable })
  }

  const updateNeuralNetwork = (state, action, reward, nextState, done) => {
    // Simplified gradient update for demo
    // In practice, this would involve backpropagation
    const targetOutput = [...Array(actionSpace.length).fill(0)]
    targetOutput[action.id] = reward / 10 // Normalize reward
    
    // This is a very simplified update - real implementation would use proper backprop
    setNeuralNetwork(prev => ({
      ...prev,
      // Update would happen here in real implementation
    }))
  }

  const applyAdaptation = (action) => {
    setAdaptationState(prev => {
      const newState = { ...prev }
      
      switch (action.name) {
        case 'increase_difficulty':
          newState.difficultyLevel = Math.min(1, prev.difficultyLevel + action.params.delta)
          break
        case 'decrease_difficulty':
          newState.difficultyLevel = Math.max(0, prev.difficultyLevel + action.params.delta)
          break
        case 'reduce_cognitive_load':
          newState.cognitiveLoad = Math.max(0, prev.cognitiveLoad - action.params.reduction)
          break
        case 'increase_engagement':
          newState.engagementBoost = Math.min(1, prev.engagementBoost + action.params.boost)
          break
      }
      
      // Record adaptation history
      newState.adaptationHistory = [
        ...prev.adaptationHistory.slice(-19), // Keep last 20
        {
          timestamp: Date.now(),
          action: action.name,
          parameters: action.params,
          difficultyLevel: newState.difficultyLevel,
          cognitiveLoad: newState.cognitiveLoad
        }
      ]
      
      return newState
    })
    
    // Notify parent component
    onAdaptationChange?.(action)
  }

  const processUserFeedback = (performance, cognitive) => {
    // Create reward signal based on user performance
    const performanceReward = performance.accuracy ? performance.accuracy / 100 * 10 : 0
    const engagementReward = cognitive.emotionDetect ? cognitive.emotionDetect / 100 * 5 : 0
    const stressPenalty = cognitive.stressLevel ? cognitive.stressLevel / 100 * -3 : 0
    
    const totalReward = performanceReward + engagementReward + stressPenalty
    
    setRewardSignals(prev => [
      ...prev.slice(-49), // Keep last 50
      {
        timestamp: Date.now(),
        reward: totalReward,
        performance: performanceReward,
        engagement: engagementReward,
        stress: stressPenalty
      }
    ])
  }

  return (
    <div className="ai-reinforcement-system">
      {/* Header */}
      <div className="rl-header">
        <div className="model-info">
          <div className="model-selector">
            <select 
              value={aiModel} 
              onChange={(e) => setAiModel(e.target.value)}
              className="model-select"
            >
              {Object.entries(modelConfigs).map(([key, config]) => (
                <option key={key} value={key}>{config.name}</option>
              ))}
            </select>
          </div>
          
          <div className="model-details">
            <h4>{modelConfigs[aiModel].name}</h4>
            <p>{modelConfigs[aiModel].description}</p>
          </div>
        </div>

        <div className="training-controls">
          <button 
            className={`control-btn ${isTraining ? 'training' : ''}`}
            onClick={() => setIsTraining(!isTraining)}
          >
            {isTraining ? <Pause size={16} /> : <Play size={16} />}
            {isTraining ? 'Stop Training' : 'Start Training'}
          </button>
          
          <button 
            className="control-btn"
            onClick={initializeRLSystem}
          >
            <RefreshCw size={16} />
            Reset Model
          </button>
        </div>
      </div>

      {/* Model Metrics */}
      <div className="model-metrics">
        <h4>Training Metrics</h4>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <BarChart3 size={16} />
              <span>Episodes</span>
            </div>
            <div className="metric-value">{modelMetrics.episodes}</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <Award size={16} />
              <span>Avg Reward</span>
            </div>
            <div className="metric-value">{modelMetrics.averageReward.toFixed(2)}</div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${Math.min(100, (modelMetrics.averageReward / 10) * 100)}%`,
                  background: 'var(--neural-success)'
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <Target size={16} />
              <span>Exploration</span>
            </div>
            <div className="metric-value">{(modelMetrics.explorationRate * 100).toFixed(1)}%</div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${modelMetrics.explorationRate * 100}%`,
                  background: 'var(--neural-warning)'
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <TrendingUp size={16} />
              <span>Convergence</span>
            </div>
            <div className="metric-value">{(modelMetrics.convergence * 100).toFixed(1)}%</div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${modelMetrics.convergence * 100}%`,
                  background: 'var(--neural-primary)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Neural Network Visualization */}
      <div className="network-visualization">
        <h4>Neural Network Architecture</h4>
        <div className="network-layers">
          {neuralNetwork.layers.map((layer, index) => (
            <div key={index} className="network-layer">
              <div className="layer-header">
                <Layers size={16} />
                <span>{layer.name}</span>
                <span className="neuron-count">{layer.neurons}</span>
              </div>
              <div className="layer-visualization">
                {Array(Math.min(8, layer.neurons)).fill().map((_, i) => (
                  <div 
                    key={i} 
                    className={`neuron ${isTraining ? 'active' : ''}`}
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      background: isTraining ? 'var(--neural-primary)' : 'var(--bg-tertiary)'
                    }}
                  ></div>
                ))}
                {layer.neurons > 8 && (
                  <span className="neuron-more">+{layer.neurons - 8}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptation State */}
      <div className="adaptation-state">
        <h4>Current Adaptation State</h4>
        <div className="adaptation-grid">
          <div className="adaptation-card">
            <div className="adaptation-header">
              <Gauge size={16} />
              <span>Difficulty Level</span>
            </div>
            <div className="adaptation-value">{(adaptationState.difficultyLevel * 100).toFixed(0)}%</div>
            <div className="adaptation-bar">
              <div 
                className="adaptation-fill"
                style={{ 
                  width: `${adaptationState.difficultyLevel * 100}%`,
                  background: 'var(--neural-warning)'
                }}
              ></div>
            </div>
          </div>

          <div className="adaptation-card">
            <div className="adaptation-header">
              <Brain size={16} />
              <span>Cognitive Load</span>
            </div>
            <div className="adaptation-value">{(adaptationState.cognitiveLoad * 100).toFixed(0)}%</div>
            <div className="adaptation-bar">
              <div 
                className="adaptation-fill"
                style={{ 
                  width: `${adaptationState.cognitiveLoad * 100}%`,
                  background: 'var(--neural-error)'
                }}
              ></div>
            </div>
          </div>

          <div className="adaptation-card">
            <div className="adaptation-header">
              <Sparkles size={16} />
              <span>Engagement Boost</span>
            </div>
            <div className="adaptation-value">{(adaptationState.engagementBoost * 100).toFixed(0)}%</div>
            <div className="adaptation-bar">
              <div 
                className="adaptation-fill"
                style={{ 
                  width: `${adaptationState.engagementBoost * 100}%`,
                  background: 'var(--neural-success)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Space */}
      <div className="action-space">
        <h4>Available Actions</h4>
        <div className="action-grid">
          {actionSpace.map(action => (
            <div key={action.id} className="action-card">
              <div className="action-name">{action.name.replace(/_/g, ' ')}</div>
              <div className="action-params">
                {Object.entries(action.params).map(([key, value]) => (
                  <span key={key} className="param">
                    {key}: {typeof value === 'number' ? value.toFixed(2) : value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Signals */}
      <div className="reward-signals">
        <h4>Reward Signal History</h4>
        <div className="signal-chart">
          {rewardSignals.slice(-20).map((signal, index) => (
            <div 
              key={index}
              className="signal-bar"
              style={{ 
                height: `${Math.max(5, Math.abs(signal.reward) * 10)}px`,
                background: signal.reward >= 0 ? 'var(--neural-success)' : 'var(--neural-error)'
              }}
              title={`Reward: ${signal.reward.toFixed(2)}`}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ai-reinforcement-system {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border-primary);
        }

        .rl-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          gap: 20px;
        }

        .model-selector {
          margin-bottom: 12px;
        }

        .model-select {
          padding: 8px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .model-details h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .model-details p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .training-controls {
          display: flex;
          gap: 12px;
        }

        .control-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-btn:hover {
          background: var(--neural-primary);
          color: white;
          border-color: var(--neural-primary);
        }

        .control-btn.training {
          background: var(--neural-success);
          color: white;
          border-color: var(--neural-success);
          animation: pulse 2s ease-in-out infinite;
        }

        .model-metrics h4,
        .network-visualization h4,
        .adaptation-state h4,
        .action-space h4,
        .reward-signals h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .metric-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 16px;
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 8px;
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .metric-bar,
        .adaptation-bar {
          height: 4px;
          background: var(--bg-tertiary);
          border-radius: 2px;
          overflow: hidden;
        }

        .metric-fill,
        .adaptation-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        .network-layers {
          display: flex;
          gap: 24px;
          align-items: center;
          padding: 20px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          margin-bottom: 32px;
          overflow-x: auto;
        }

        .network-layer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          min-width: 100px;
        }

        .layer-header {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .neuron-count {
          background: var(--neural-primary);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .layer-visualization {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
        }

        .neuron {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          transition: all 0.3s ease;
        }

        .neuron.active {
          animation: neuron-pulse 1s ease-in-out infinite;
        }

        .neuron-more {
          color: var(--text-secondary);
          font-size: 0.75rem;
          margin-top: 4px;
        }

        .adaptation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .adaptation-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 16px;
        }

        .adaptation-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 8px;
        }

        .adaptation-value {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 32px;
        }

        .action-card {
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          padding: 12px;
        }

        .action-name {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
          text-transform: capitalize;
        }

        .action-params {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .param {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .signal-chart {
          display: flex;
          align-items: end;
          height: 60px;
          gap: 2px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 12px;
        }

        .signal-bar {
          flex: 1;
          min-height: 2px;
          border-radius: 1px;
          transition: height 0.3s ease;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes neuron-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @media (max-width: 768px) {
          .rl-header {
            flex-direction: column;
            gap: 16px;
          }

          .metrics-grid,
          .adaptation-grid,
          .action-grid {
            grid-template-columns: 1fr;
          }

          .network-layers {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default AIReinforcementSystem
