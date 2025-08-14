
'use client';

import { useState, useEffect } from 'react';

interface ScientificData {
  timestamp: number;
  brainwaves: {
    alpha: number;
    beta: number;
    gamma: number;
    theta: number;
    delta: number;
  };
  cognitiveLoad: number;
  neuroplasticity: number;
}

export default function AdvancedScience() {
  const [realTimeData, setRealTimeData] = useState<ScientificData[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring) {
      interval = setInterval(() => {
        const newData: ScientificData = {
          timestamp: Date.now(),
          brainwaves: {
            alpha: Math.random() * 40 + 30,
            beta: Math.random() * 35 + 25,
            gamma: Math.random() * 20 + 10,
            theta: Math.random() * 25 + 15,
            delta: Math.random() * 15 + 5
          },
          cognitiveLoad: Math.random() * 40 + 40,
          neuroplasticity: Math.random() * 30 + 60
        };
        
        setRealTimeData(prev => [...prev.slice(-19), newData]);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isMonitoring]);

  const avgBrainwaves = realTimeData.length > 0 
    ? realTimeData.reduce((acc, data) => ({
        alpha: acc.alpha + data.brainwaves.alpha / realTimeData.length,
        beta: acc.beta + data.brainwaves.beta / realTimeData.length,
        gamma: acc.gamma + data.brainwaves.gamma / realTimeData.length,
        theta: acc.theta + data.brainwaves.theta / realTimeData.length,
        delta: acc.delta + data.brainwaves.delta / realTimeData.length,
      }), { alpha: 0, beta: 0, gamma: 0, theta: 0, delta: 0 })
    : { alpha: 0, beta: 0, gamma: 0, theta: 0, delta: 0 };

  return (
    <div className="advanced-science-container">
      <div className="science-header">
        <h2>🧬 Advancement of Science</h2>
        <div className="monitoring-controls">
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`monitor-btn ${isMonitoring ? 'active' : ''}`}
          >
            {isMonitoring ? '⏹️ Stop Monitoring' : '▶️ Start Monitoring'}
          </button>
        </div>
      </div>

      <div className="science-grid">
        <div className="real-time-monitor">
          <h3>Real-Time Neural Activity</h3>
          <div className="brainwave-chart">
            {Object.entries(avgBrainwaves).map(([wave, value]) => (
              <div key={wave} className="wave-bar">
                <div className="wave-label">{wave.toUpperCase()}</div>
                <div className="wave-meter">
                  <div 
                    className="wave-fill"
                    style={{ 
                      width: `${value}%`,
                      backgroundColor: getWaveColor(wave)
                    }}
                  />
                </div>
                <div className="wave-value">{value.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="scientific-insights">
          <h3>Scientific Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">🧠</div>
              <h4>Neuroplasticity Index</h4>
              <div className="insight-value">87.3%</div>
              <p>Brain's ability to reorganize and form new connections</p>
            </div>
            <div className="insight-card">
              <div className="insight-icon">⚡</div>
              <h4>Synaptic Efficiency</h4>
              <div className="insight-value">92.1%</div>
              <p>Speed and accuracy of neural signal transmission</p>
            </div>
            <div className="insight-card">
              <div className="insight-icon">🎯</div>
              <h4>Cognitive Flexibility</h4>
              <div className="insight-value">78.9%</div>
              <p>Ability to switch between different mental tasks</p>
            </div>
            <div className="insight-card">
              <div className="insight-icon">💡</div>
              <h4>Learning Rate</h4>
              <div className="insight-value">95.7%</div>
              <p>Rate of information acquisition and retention</p>
            </div>
          </div>
        </div>

        <div className="research-protocols">
          <h3>Active Protocols</h3>
          <div className="protocol-list">
            <div className="protocol-item">
              <div className="protocol-status active"></div>
              <div className="protocol-info">
                <h4>Gamma Wave Enhancement</h4>
                <p>40Hz binaural beat stimulation for cognitive improvement</p>
                <div className="protocol-progress">Progress: 67%</div>
              </div>
            </div>
            <div className="protocol-item">
              <div className="protocol-status active"></div>
              <div className="protocol-info">
                <h4>Memory Consolidation Study</h4>
                <p>Sleep-based learning enhancement protocol</p>
                <div className="protocol-progress">Progress: 84%</div>
              </div>
            </div>
            <div className="protocol-item">
              <div className="protocol-status pending"></div>
              <div className="protocol-info">
                <h4>Attention Network Training</h4>
                <p>Dual n-back cognitive training program</p>
                <div className="protocol-progress">Progress: 23%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getWaveColor(wave: string): string {
  const colors = {
    alpha: '#4facfe',
    beta: '#00f2fe',
    gamma: '#ff006e',
    theta: '#8338ec',
    delta: '#10b981'
  };
  return colors[wave as keyof typeof colors] || '#4facfe';
}
