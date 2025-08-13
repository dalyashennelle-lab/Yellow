'use client';

import React, { useState, useEffect } from 'react';

interface BrainState {
  dominantWave: 'gamma' | 'beta' | 'alpha' | 'theta' | 'delta';
  focusLevel: number;
  stressLevel: number;
  creativity: number;
  fatigue: number;
  timestamp: number;
}

interface Insight {
  type: 'positive' | 'neutral' | 'warning';
  title: string;
  description: string;
  suggestion: string;
  confidence: number;
}

interface AIInsightsPanelProps {
  brainState?: BrainState;
  isActive?: boolean;
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ brainState, isActive = true }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate AI analysis of brain state
  const analyzebrainState = (state: BrainState): Insight[] => {
    const insights: Insight[] = [];

    // Focus analysis
    if (state.focusLevel > 80) {
      insights.push({
        type: 'positive',
        title: 'Excellent Focus Detected',
        description: `Your gamma and beta wave activity indicates peak concentration (${state.focusLevel}% focus level).`,
        suggestion: 'This is an optimal time for complex problem-solving and learning new concepts.',
        confidence: 92
      });
    } else if (state.focusLevel < 40) {
      insights.push({
        type: 'warning',
        title: 'Low Focus State',
        description: `Focus level at ${state.focusLevel}%. Scattered attention patterns detected.`,
        suggestion: 'Consider taking a 5-minute break or trying breathing exercises to reset attention.',
        confidence: 87
      });
    }

    // Stress analysis
    if (state.stressLevel > 70) {
      insights.push({
        type: 'warning',
        title: 'Elevated Stress Response',
        description: `High beta wave activity suggests stress level at ${state.stressLevel}%.`,
        suggestion: 'Try progressive muscle relaxation or switch to alpha-wave inducing activities.',
        confidence: 89
      });
    } else if (state.stressLevel < 30) {
      insights.push({
        type: 'positive',
        title: 'Calm Mental State',
        description: `Low stress indicators with balanced wave patterns (${state.stressLevel}% stress).`,
        suggestion: 'Great time for meditation, creative work, or learning new skills.',
        confidence: 85
      });
    }

    // Creativity analysis
    if (state.creativity > 75) {
      insights.push({
        type: 'positive',
        title: 'Creative Flow State',
        description: `High theta and alpha wave synchronization indicates peak creativity (${state.creativity}%).`,
        suggestion: 'Perfect time for brainstorming, artistic work, or innovative problem-solving.',
        confidence: 91
      });
    }

    // Fatigue analysis
    if (state.fatigue > 60) {
      insights.push({
        type: 'warning',
        title: 'Mental Fatigue Detected',
        description: `Decreased gamma activity and increased delta waves suggest ${state.fatigue}% fatigue.`,
        suggestion: 'Consider taking a longer break, hydrating, or switching to lighter cognitive tasks.',
        confidence: 83
      });
    }

    // Dominant wave analysis
    const waveInsights = {
      gamma: {
        type: 'positive' as const,
        title: 'High-Performance State',
        description: 'Gamma waves dominant - optimal for complex reasoning and peak performance.',
        suggestion: 'Tackle your most challenging tasks while in this state.',
        confidence: 88
      },
      beta: {
        type: 'neutral' as const,
        title: 'Alert and Focused',
        description: 'Beta waves dominant - good for active concentration and logical thinking.',
        suggestion: 'Great for analytical work, reading, and structured problem-solving.',
        confidence: 85
      },
      alpha: {
        type: 'positive' as const,
        title: 'Relaxed Awareness',
        description: 'Alpha waves dominant - ideal for creativity and relaxed focus.',
        suggestion: 'Perfect for meditation, light learning, or creative activities.',
        confidence: 87
      },
      theta: {
        type: 'neutral' as const,
        title: 'Creative Deep State',
        description: 'Theta waves dominant - associated with creativity and deep introspection.',
        suggestion: 'Excellent for artistic work, meditation, or accessing subconscious insights.',
        confidence: 84
      },
      delta: {
        type: 'warning' as const,
        title: 'Deep Rest State',
        description: 'Delta waves dominant - indicates need for rest or very deep meditation.',
        suggestion: 'Consider taking a break or transitioning to more stimulating activities.',
        confidence: 82
      }
    };

    insights.push(waveInsights[state.dominantWave]);

    return insights;
  };

  // Generate mock brain state if none provided
  const generateMockBrainState = (): BrainState => {
    const waves = ['gamma', 'beta', 'alpha', 'theta', 'delta'] as const;
    return {
      dominantWave: waves[Math.floor(Math.random() * waves.length)],
      focusLevel: Math.floor(Math.random() * 100),
      stressLevel: Math.floor(Math.random() * 100),
      creativity: Math.floor(Math.random() * 100),
      fatigue: Math.floor(Math.random() * 100),
      timestamp: Date.now()
    };
  };

  useEffect(() => {
    if (!isActive) return;

    const updateInsights = () => {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        const currentState = brainState || generateMockBrainState();
        const newInsights = analyzebrainState(currentState);
        setInsights(newInsights);
        setCurrentInsight(0);
        setIsAnalyzing(false);
      }, 1500); // Simulate AI processing time
    };

    updateInsights();
    const interval = setInterval(updateInsights, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [brainState, isActive]);

  useEffect(() => {
    if (insights.length <= 1) return;

    const cycleInsights = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % insights.length);
    }, 5000); // Cycle through insights every 5 seconds

    return () => clearInterval(cycleInsights);
  }, [insights.length]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return '✨';
      case 'warning': return '⚠️';
      default: return '💡';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return '#4ade80';
    if (confidence >= 80) return '#fbbf24';
    return '#fb7185';
  };

  if (!isActive) {
    return (
      <div className="ai-insights-panel inactive">
        <h3>🤖 AI Neural Coach</h3>
        <p>Start a session to receive AI-powered brain insights</p>
      </div>
    );
  }

  return (
    <div className="ai-insights-panel">
      <div className="insights-header">
        <h3 className="insights-title">🤖 AI Neural Coach</h3>
        <div className="insights-status">
          {isAnalyzing ? (
            <div className="analyzing-indicator">
              <div className="pulse-dot"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            <div className="ready-indicator">
              <div className="ready-dot"></div>
              <span>Active</span>
            </div>
          )}
        </div>
      </div>

      {isAnalyzing ? (
        <div className="analyzing-state">
          <div className="neural-animation">
            <div className="neural-node"></div>
            <div className="neural-node"></div>
            <div className="neural-node"></div>
          </div>
          <p>Processing neural patterns...</p>
        </div>
      ) : insights.length > 0 ? (
        <div className="insights-content">
          <div className="insight-card">
            <div className="insight-header">
              <span className="insight-icon">
                {getInsightIcon(insights[currentInsight].type)}
              </span>
              <h4 className="insight-title">{insights[currentInsight].title}</h4>
              <div 
                className="confidence-badge"
                style={{ backgroundColor: getConfidenceColor(insights[currentInsight].confidence) }}
              >
                {insights[currentInsight].confidence}%
              </div>
            </div>
            
            <p className="insight-description">
              {insights[currentInsight].description}
            </p>
            
            <div className="insight-suggestion">
              <strong>Suggestion:</strong> {insights[currentInsight].suggestion}
            </div>
          </div>

          {insights.length > 1 && (
            <div className="insights-pagination">
              {insights.map((_, index) => (
                <button
                  key={index}
                  className={`pagination-dot ${index === currentInsight ? 'active' : ''}`}
                  onClick={() => setCurrentInsight(index)}
                />
              ))}
            </div>
          )}

          <div className="insights-summary">
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-label">Focus</span>
                <div className="stat-bar">
                  <div 
                    className="stat-fill focus"
                    style={{ width: `${brainState?.focusLevel || 75}%` }}
                  ></div>
                </div>
                <span className="stat-value">{brainState?.focusLevel || 75}%</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Stress</span>
                <div className="stat-bar">
                  <div 
                    className="stat-fill stress"
                    style={{ width: `${brainState?.stressLevel || 35}%` }}
                  ></div>
                </div>
                <span className="stat-value">{brainState?.stressLevel || 35}%</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Creativity</span>
                <div className="stat-bar">
                  <div 
                    className="stat-fill creativity"
                    style={{ width: `${brainState?.creativity || 68}%` }}
                  ></div>
                </div>
                <span className="stat-value">{brainState?.creativity || 68}%</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-insights">
          <p>Waiting for neural data...</p>
        </div>
      )}

      <div className="insights-footer">
        <small>
          AI insights update every 10 seconds • Based on real-time EEG analysis
        </small>
      </div>
    </div>
  );
};

export default AIInsightsPanel;
