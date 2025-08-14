
'use client';

import { useState, useEffect } from 'react';

export default function AIAgent() {
  const [messages, setMessages] = useState<Array<{
    id: string;
    type: 'analysis' | 'recommendation' | 'warning' | 'encouragement';
    content: string;
    timestamp: Date;
  }>>([]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    // Initialize with welcome message
    const initialMessage = {
      id: '1',
      type: 'analysis' as const,
      content: 'Neural interface initialized. Your cognitive patterns are being analyzed for optimal enhancement protocols.',
      timestamp: new Date()
    };
    setMessages([initialMessage]);

    // Simulate periodic AI insights
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        addAIMessage();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const addAIMessage = () => {
    setIsThinking(true);
    
    setTimeout(() => {
      const messageTypes = ['analysis', 'recommendation', 'warning', 'encouragement'] as const;
      const messageContents = {
        analysis: [
          'Neural efficiency increased by 12.4% in the last session. Pattern recognition shows significant improvement.',
          'Brainwave coherence optimal for advanced cognitive tasks. Consider increasing difficulty levels.',
          'Memory consolidation patterns suggest ideal timing for new learning protocols.'
        ],
        recommendation: [
          'Recommend 15-minute meditation session to optimize focus metrics.',
          'Consider binaural beats at 40Hz for enhanced gamma wave production.',
          'Your peak cognitive performance window is detected between 2-4 PM.'
        ],
        warning: [
          'Stress indicators elevated. Consider mindfulness break to maintain neural efficiency.',
          'Cognitive load approaching threshold. Recommend brief meditation interval.',
          'Sleep quality affects morning cognitive performance. Consider sleep optimization.'
        ],
        encouragement: [
          'Exceptional progress in memory challenges! You\'re in the top 5% of users.',
          'Neural plasticity indicators show remarkable adaptation. Keep up the excellent work!',
          'Your dedication to cognitive enhancement is yielding measurable results.'
        ]
      };

      const type = messageTypes[Math.floor(Math.random() * messageTypes.length)];
      const contents = messageContents[type];
      const content = contents[Math.floor(Math.random() * contents.length)];

      const newMessage = {
        id: Date.now().toString(),
        type,
        content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev.slice(-4), newMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'analysis': return '🔬';
      case 'recommendation': return '💡';
      case 'warning': return '⚠️';
      case 'encouragement': return '🎯';
      default: return '🤖';
    }
  };

  return (
    <div className="ai-agent-container">
      <div className="ai-agent-header">
        <div className="agent-avatar">
          <div className="avatar-glow">🤖</div>
        </div>
        <div className="agent-info">
          <h3 className="agent-name">Neural AI Assistant</h3>
          <p className="agent-status">Advanced Cognitive Analysis Active</p>
        </div>
        <div className={`thinking-indicator ${isThinking ? 'active' : ''}`}>
          <div className="thinking-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="ai-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>Neural AI is analyzing your cognitive patterns...</p>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`ai-message ${message.type}`}>
              <div className="message-header">
                <span className="message-icon">{getMessageIcon(message.type)}</span>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="message-content">{message.content}</p>
            </div>
          ))
        )}
      </div>

      <div className="ai-capabilities">
        <h4 className="capabilities-title">AI Capabilities</h4>
        <div className="capabilities-grid">
          <div className="capability-item">
            <span className="capability-icon">🧠</span>
            <span>Real-time Neural Analysis</span>
          </div>
          <div className="capability-item">
            <span className="capability-icon">📊</span>
            <span>Performance Optimization</span>
          </div>
          <div className="capability-item">
            <span className="capability-icon">🎯</span>
            <span>Personalized Recommendations</span>
          </div>
          <div className="capability-item">
            <span className="capability-icon">⚡</span>
            <span>Adaptive Learning</span>
          </div>
        </div>
      </div>
    </div>
  );
}
