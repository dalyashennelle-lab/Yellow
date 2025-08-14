
'use client';

import { useState, useEffect } from 'react';

interface AIMessage {
  id: string;
  message: string;
  type: 'suggestion' | 'analysis' | 'encouragement' | 'warning';
  timestamp: Date;
}

export default function AIAgent() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const initialMessages: AIMessage[] = [
      {
        id: '1',
        message: 'Welcome to NeuroMind Pro! I\'ve analyzed your cognitive patterns and notice excellent progress in memory consolidation. Your gamma wave activity has increased by 34% this week.',
        type: 'analysis',
        timestamp: new Date()
      },
      {
        id: '2',
        message: 'Based on your EEG patterns, I recommend a 15-minute alpha wave session at 10Hz to enhance creativity before your next learning session.',
        type: 'suggestion',
        timestamp: new Date()
      },
      {
        id: '3',
        message: 'Outstanding! You\'ve achieved a new personal record in working memory tasks. Your neural efficiency has improved by 23% compared to last month.',
        type: 'encouragement',
        timestamp: new Date()
      }
    ];

    setMessages(initialMessages);

    // Simulate periodic AI insights
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const insights = [
          'Your theta waves suggest optimal conditions for memory consolidation. Consider reviewing important material now.',
          'Beta wave patterns indicate high focus. This is an excellent time for challenging cognitive tasks.',
          'Your stress markers are elevated. I recommend a 5-minute breathing exercise to optimize performance.',
          'Neural synchronization is at peak levels. Your brain is primed for creative problem-solving.',
          'Your cognitive load is approaching optimal levels. Maintain current training intensity.',
        ];

        const newMessage: AIMessage = {
          id: Date.now().toString(),
          message: insights[Math.floor(Math.random() * insights.length)],
          type: Math.random() > 0.5 ? 'analysis' : 'suggestion',
          timestamp: new Date()
        };

        setIsThinking(true);
        setTimeout(() => {
          setMessages(prev => [newMessage, ...prev].slice(0, 5));
          setIsThinking(false);
        }, 2000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return '💡';
      case 'analysis': return '🔬';
      case 'encouragement': return '🎉';
      case 'warning': return '⚠️';
      default: return '🤖';
    }
  };

  return (
    <div className="ai-agent-container">
      <div className="ai-agent-header">
        <div className="agent-avatar">
          <div className="avatar-glow">🧠</div>
        </div>
        <div className="agent-info">
          <h3 className="agent-name">ARIA</h3>
          <p className="agent-status">Advanced Reasoning & Intelligence Assistant</p>
          <div className={`thinking-indicator ${isThinking ? 'active' : ''}`}>
            <span>Analyzing neural patterns</span>
            <div className="thinking-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>ARIA is analyzing your cognitive patterns...</p>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`ai-message ${message.type}`}>
              <div className="message-header">
                <span className="message-icon">
                  {getMessageIcon(message.type)}
                </span>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p className="message-content">{message.message}</p>
            </div>
          ))
        )}
      </div>

      <div className="ai-capabilities">
        <h4 className="capabilities-title">AI Capabilities</h4>
        <div className="capabilities-grid">
          <div className="capability-item">
            <span className="capability-icon">🧠</span>
            <span>Real-time EEG Analysis</span>
          </div>
          <div className="capability-item">
            <span className="capability-icon">📊</span>
            <span>Performance Tracking</span>
          </div>
          <div className="capability-item">
            <span className="capability-icon">🎯</span>
            <span>Personalized Training</span>
          </div>
          <div className="capability-item">
            <span className="capability-icon">💡</span>
            <span>Adaptive Recommendations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
