import React, { useState, useEffect } from 'react'
import { 
  Sparkles, 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  Brain, 
  Heart,
  ChevronRight,
  Zap
} from 'lucide-react'

const AIInsights = ({ user, cognitiveData }) => {
  const [currentInsight, setCurrentInsight] = useState(0)
  
  const generateInsights = () => {
    const insights = []
    
    // Memory insights
    if (cognitiveData.memoryHealth >= 85) {
      insights.push({
        type: 'success',
        icon: Brain,
        title: 'Excellent Memory Performance',
        message: `Your memory health is at ${cognitiveData.memoryHealth}%. Keep practicing memory games to maintain this high level.`,
        action: 'Continue Memory Training',
        color: 'var(--neural-success)'
      })
    } else if (cognitiveData.memoryHealth < 70) {
      insights.push({
        type: 'improvement',
        icon: Brain,
        title: 'Memory Enhancement Opportunity',
        message: `Your memory score is ${cognitiveData.memoryHealth}%. Try the Memory Matrix game for 15 minutes daily.`,
        action: 'Start Memory Training',
        color: 'var(--neural-warning)'
      })
    }

    // Focus insights
    if (cognitiveData.focusLevel >= 80) {
      insights.push({
        type: 'success',
        icon: TrendingUp,
        title: 'Strong Focus Capabilities',
        message: `Your focus level of ${cognitiveData.focusLevel}% indicates excellent concentration abilities.`,
        action: 'Maintain Routine',
        color: 'var(--neural-primary)'
      })
    }

    // Stress insights
    if (cognitiveData.stressLevel > 75) {
      insights.push({
        type: 'urgent',
        icon: Heart,
        title: 'Elevated Stress Detected',
        message: `Your stress level is ${cognitiveData.stressLevel}%. Consider a 10-minute breathing exercise.`,
        action: 'Start Mindfulness',
        color: 'var(--neural-error)'
      })
    }

    // Sleep insights
    if (cognitiveData.avgSleep < 7) {
      insights.push({
        type: 'improvement',
        icon: Clock,
        title: 'Sleep Optimization Needed',
        message: `You're averaging ${cognitiveData.avgSleep}h of sleep. Aim for 7-9 hours for optimal cognitive function.`,
        action: 'Sleep Better',
        color: 'var(--neural-accent)'
      })
    }

    // Neuroplasticity insights
    if (cognitiveData.neuroplasticity >= 85) {
      insights.push({
        type: 'achievement',
        icon: Zap,
        title: 'Peak Neuroplasticity',
        message: `Your brain adaptation score of ${cognitiveData.neuroplasticity}% shows excellent learning capacity.`,
        action: 'Learn Something New',
        color: 'var(--neural-success)'
      })
    }

    // Personalized recommendations
    insights.push({
      type: 'recommendation',
      icon: Lightbulb,
      title: 'Daily Recommendation',
      message: `Based on your ${user.streak}-day streak, try advanced cognitive challenges today.`,
      action: 'View Challenges',
      color: 'var(--neural-secondary)'
    })

    return insights
  }

  const insights = generateInsights()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [insights.length])

  const insight = insights[currentInsight]

  if (!insight) return null

  const Icon = insight.icon

  return (
    <div className="neural-card ai-insights">
      <div className="insights-header">
        <div className="ai-badge">
          <Sparkles size={16} />
          <span>AI Insights</span>
        </div>
        <div className="insight-counter">
          {currentInsight + 1} / {insights.length}
        </div>
      </div>

      <div className="insight-content">
        <div className="insight-icon" style={{ background: insight.color }}>
          <Icon size={20} color="white" />
        </div>
        
        <div className="insight-text">
          <h4 className="insight-title">{insight.title}</h4>
          <p className="insight-message">{insight.message}</p>
        </div>
      </div>

      <div className="insight-actions">
        <button 
          className="btn btn-primary"
          style={{ background: insight.color }}
        >
          {insight.action}
          <ChevronRight size={16} />
        </button>
        
        <div className="insights-nav">
          {insights.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentInsight ? 'active' : ''}`}
              onClick={() => setCurrentInsight(index)}
              style={{ 
                background: index === currentInsight ? insight.color : 'var(--bg-tertiary)' 
              }}
            />
          ))}
        </div>
      </div>

      {/* Advanced Metrics */}
      <div className="advanced-metrics">
        <h4 className="metrics-title">Advanced Analytics</h4>
        <div className="metrics-grid">
          <div className="mini-metric">
            <span className="mini-value">{(cognitiveData.memoryHealth * cognitiveData.focusLevel / 100).toFixed(0)}</span>
            <span className="mini-label">Cognitive Score</span>
          </div>
          <div className="mini-metric">
            <span className="mini-value">{Math.round(100 - cognitiveData.stressLevel)}</span>
            <span className="mini-label">Wellness Index</span>
          </div>
          <div className="mini-metric">
            <span className="mini-value">{Math.round(cognitiveData.neuroplasticity * 1.2)}</span>
            <span className="mini-label">Brain Age</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ai-insights {
          position: relative;
          overflow: hidden;
        }

        .ai-insights::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--neural-primary), var(--neural-secondary), var(--neural-accent));
          background-size: 200% 100%;
          animation: neural-flow 3s ease infinite;
        }

        .insights-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .ai-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--gradient-neural);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .insight-counter {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: var(--bg-glass);
          padding: 4px 8px;
          border-radius: 8px;
        }

        .insight-content {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .insight-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .insight-text {
          flex: 1;
        }

        .insight-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .insight-message {
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .insight-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .insights-nav {
          display: flex;
          gap: 6px;
        }

        .nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.5;
        }

        .nav-dot.active {
          opacity: 1;
          transform: scale(1.2);
        }

        .advanced-metrics {
          border-top: 1px solid var(--border-primary);
          padding-top: 16px;
        }

        .metrics-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .mini-metric {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mini-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--neural-primary);
          font-family: 'Space Grotesk', sans-serif;
        }

        .mini-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .insight-content {
            gap: 12px;
          }

          .insight-icon {
            width: 40px;
            height: 40px;
          }

          .insight-actions {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          .insights-nav {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default AIInsights
