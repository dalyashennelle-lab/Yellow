
'use client';

import { useState, useEffect } from 'react';

export default function BrainwaveChart() {
  const [data, setData] = useState<number[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  // Simulate EEG data
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRecording) {
        setData(prev => {
          const newData = [...prev];
          // Generate realistic brainwave data
          const alpha = Math.sin(Date.now() / 1000 * 10) * 30 + 50;
          const beta = Math.sin(Date.now() / 1000 * 20) * 20 + 40;
          const theta = Math.sin(Date.now() / 1000 * 6) * 25 + 35;
          const delta = Math.sin(Date.now() / 1000 * 3) * 15 + 25;
          
          newData.push(alpha, beta, theta, delta);
          return newData.slice(-200); // Keep last 200 points
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRecording]);

  const brainwaveTypes = [
    { name: 'Alpha (8-13 Hz)', color: '#4facfe', value: 65 },
    { name: 'Beta (13-30 Hz)', color: '#ff6b35', value: 45 },
    { name: 'Theta (4-8 Hz)', color: '#9b59b6', value: 35 },
    { name: 'Delta (0.5-4 Hz)', color: '#2ecc71', value: 25 },
  ];

  return (
    <div className="brainwave-chart">
      <div className="chart-header">
        <h3>🧠 Real-time Brainwave Activity</h3>
        <button 
          className={`record-btn ${isRecording ? 'recording' : ''}`}
          onClick={() => setIsRecording(!isRecording)}
        >
          {isRecording ? '⏹️ Stop' : '🔴 Record'}
        </button>
      </div>

      <div className="chart-container">
        <div className="waveform-display">
          <svg width="100%" height="200" className="waveform-svg">
            {/* Grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={i * 40 + 20}
                x2="100%"
                y2={i * 40 + 20}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            ))}
            
            {/* Waveform */}
            {data.length > 1 && (
              <polyline
                fill="none"
                stroke="#4facfe"
                strokeWidth="2"
                points={data
                  .map((value, index) => `${(index / data.length) * 100}%,${200 - (value / 100) * 180}`)
                  .join(' ')
                }
              />
            )}
          </svg>
        </div>

        <div className="brainwave-meters">
          {brainwaveTypes.map((wave, index) => (
            <div key={index} className="meter-container">
              <div className="meter-label">{wave.name}</div>
              <div className="meter-bar">
                <div 
                  className="meter-fill"
                  style={{ 
                    width: `${wave.value}%`,
                    backgroundColor: wave.color 
                  }}
                />
              </div>
              <div className="meter-value">{wave.value}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-stats">
        <div className="stat-item">
          <span className="stat-label">Coherence:</span>
          <span className="stat-value">87%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Meditation Depth:</span>
          <span className="stat-value">High</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Session:</span>
          <span className="stat-value">12:34</span>
        </div>
      </div>
    </div>
  );
}
