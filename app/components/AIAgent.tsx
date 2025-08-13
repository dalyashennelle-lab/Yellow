'use client';

import { useState, useEffect } from 'react';

interface AIAgentProps {
  cognitiveLoad: number;
  memoryScore: number;
  focusLevel: number;
  stressLevel: number;
}

interface AIMessage {
  id: string;
  message: string;
  type: 'suggestion' | 'analysis' | 'encouragement' | 'warning';
  timestamp: Date;
}

export default function AIAgent({ cognitiveLoad, memoryScore, focusLevel, stressLevel }: AIAgentProps) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const generateAIResponse = (metrics: { cognitiveLoad: number; memoryScore: number; focusLevel: number; stressLevel: number }) => {
    const responses = {
      highLoad: [
        "I notice your cognitive load is elevated at {cognitiveLoad}%. Consider taking a 5-minute breathing break to optimize performance.",
        "Your brain is working hard! Let's reduce task complexity for the next 10 minutes to prevent fatigue.",
        "High cognitive demand detected. I'm adjusting the next exercise difficulty down by 20%."
      ],
      lowFocus: [
        "Focus levels have dropped to {focusLevel}%. Try the gamma wave entrainment audio for 3 minutes.",
        "Your attention networks need activation. I recommend starting with the dual n-back exercise.",
        "Detected mind-wandering patterns. Switching to more engaging visual-spatial tasks."
      ],
      highStress: [
        "Stress indicators are elevated at {stressLevel}%. Initiating theta wave meditation protocol.",
        "Your cortisol levels appear high. I suggest 10 minutes of guided breathing before continuing.",
        "Stress response detected. Activating parasympathetic nervous system recovery mode."
      ],
      goodPerformance: [
        "Excellent cognitive balance! Your neural efficiency is in the optimal zone.",
        "Perfect neuroplasticity window detected. This is ideal for learning new information.",
        "Your brain state is optimal for memory consolidation. Great time for review exercises."
      ],
      memoryOptimal: [
        "Memory systems are highly active at {memoryScore}%. Perfect time for encoding new information.",
        "Hippocampal activity is strong. I recommend memory palace construction exercises.",
        "Your memory networks are primed. Let's build some lasting neural pathways!"
      ]
    };

    let selectedResponse;
    let messageType: AIMessage['type'] = 'suggestion';

    if (metrics.stressLevel > 75) {
      selectedResponse = responses.highStress[Math.floor(Math.random() * responses.highStress.length)];
      messageType = 'warning';
    } else if (metrics.cognitiveLoad > 80) {
      selectedResponse = responses.highLoad[Math.floor(Math.random() * responses.highLoad.length)];
      messageType = 'warning';
    } else if (metrics.focusLevel < 40) {
      selectedResponse = responses.lowFocus[Math.floor(Math.random() * responses.lowFocus.length)];
      messageType = 'suggestion';
    } else if (metrics.memoryScore > 85) {
      selectedResponse = responses.memoryOptimal[Math.floor(Math.random() * responses.memoryOptimal.length)];
      messageType = 'encouragement';
    } else if (metrics.cognitiveLoad > 60 && metrics.focusLevel > 70 && metrics.stressLevel < 50) {
      selectedResponse = responses.goodPerformance[Math.floor(Math.random() * responses.goodPerformance.length)];
      messageType = 'analysis';
    } else {
      selectedResponse = responses.goodPerformance[Math.floor(Math.random() * responses.goodPerformance.length)];
      messageType = 'encouragement';
    }

    // Replace placeholders with actual values
    const formattedMessage = selectedResponse
      .replace('{cognitiveLoad}', metrics.cognitiveLoad.toString())
      .replace('{memoryScore}', metrics.memoryScore.toString())
      .replace('{focusLevel}', metrics.focusLevel.toString())
      .replace('{stressLevel}', metrics.stressLevel.toString());

    return {
      id: Date.now().toString(),
      message: formattedMessage,
      type: messageType,
      timestamp: new Date()
    };
  };

  useEffect(() => {
    const analyzeAndRespond = () => {
      setIsThinking(true);
      
      setTimeout(() => {
        const newMessage = generateAIResponse({
          cognitiveLoad,
          memoryScore,
          focusLevel,
          stressLevel
        });
        
        setMessages(prev => [newMessage, ...prev.slice(0, 4)]); // Keep last 5 messages
        setIsThinking(false);
      }, 2000);
    };

    // Initial analysis after 3 seconds
    const initialTimeout = setTimeout(analyzeAndRespond, 3000);

    // Periodic analysis every 30 seconds
    const interval = setInterval(analyzeAndRespond, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [cognitiveLoad, memoryScore, focusLevel, stressLevel]);

  const getMessageIcon = (type: AIMessage['type']) => {
    switch (type) {
      case 'suggestion': return '💡';
      case 'analysis': return '🔬';
      case 'encouragement': return '🌟';
      case 'warning': return '⚠️';
      default: return '🤖';
    }
  };

  const getMessageColor = (type: AIMessage['type']) => {
    switch (type) {
      case 'suggestion': return '#4facfe';
      case 'analysis': return '#00f2fe';
      case 'encouragement': return '#10b981';
      case 'warning': return '#f59e0b';
      default: return '#4facfe';
    }
  };

  return (
    <div className="ai-agent-container">
      <div className="ai-agent-header">
        <div className="agent-avatar">
          <div className="avatar-glow">🧠</div>
        </div>
        <div className="agent-info">
          <h3 className="agent-name">NeuroMind AI</h3>
          <p className="agent-status">
            {isThinking ? 'Analyzing neural patterns...' : 'Monitoring cognitive state'}
          </p>
        </div>
        <div className="ai-indicators">
          <div className={`thinking-indicator ${isThinking ? 'active' : ''}`}>
            <div className="thinking-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-messages">
        {messages.length === 0 && !isThinking && (
          <div className="welcome-message">
            <p>🧠 Neural AI is analyzing your cognitive patterns and will provide personalized insights shortly...</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`ai-message ${message.type}`}
            style={{ borderLeftColor: getMessageColor(message.type) }}
          >
            <div className="message-header">
              <span className="message-icon">{getMessageIcon(message.type)}</span>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="message-content">{message.message}</p>
          </div>
        ))}
      </div>

      <div className="ai-capabilities">
        <h4 className="capabilities-title">AI Capabilities</h4>
        <div className="capabilities-grid">
          <div className="capability-item">
            <span className="capability-icon">🎯</span>
            <span>Adaptive Difficulty</span>
          </div>
          <div className="capability-item">
            <span className="capability-icon">🧮</span>
            <span>Performance Prediction</span>
          </div>
          <div className="capability-item">
            <span className="capability-icon">🌊</span>
            <span>Stress Detection</span>
          </div>
          <div className="capability-item">
            <span className="capability-icon">⚡</span>
            <span>Fatigue Prevention</span>
          </div>
        </div>
      </div>
    </div>
  );
}
