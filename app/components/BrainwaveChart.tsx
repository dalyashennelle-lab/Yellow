'use client';

import { useEffect, useState } from 'react';

interface BrainwaveData {
  gamma: number;
  beta: number;
  alpha: number;
  theta: number;
  delta: number;
}

interface BrainwaveChartProps {
  isRecording: boolean;
}

export default function BrainwaveChart({ isRecording }: BrainwaveChartProps) {
  const [brainwaves, setBrainwaves] = useState<BrainwaveData>({
    gamma: 45,
    beta: 65,
    alpha: 78,
    theta: 32,
    delta: 15
  });

  const [history, setHistory] = useState<BrainwaveData[]>([]);

  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      const newData: BrainwaveData = {
        gamma: Math.max(5, Math.min(95, brainwaves.gamma + (Math.random() - 0.5) * 20)),
        beta: Math.max(5, Math.min(95, brainwaves.beta + (Math.random() - 0.5) * 15)),
        alpha: Math.max(5, Math.min(95, brainwaves.alpha + (Math.random() - 0.5) * 10)),
        theta: Math.max(5, Math.min(95, brainwaves.theta + (Math.random() - 0.5) * 25)),
        delta: Math.max(5, Math.min(95, brainwaves.delta + (Math.random() - 0.5) * 8))
      };
      
      setBrainwaves(newData);
      setHistory(prev => [...prev.slice(-30), newData]);
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording, brainwaves]);

  const waveTypes = [
    { name: 'Gamma', value: brainwaves.gamma, color: '#ff006e', frequency: '30-100 Hz', description: 'Higher cognitive functions, IQ correlation' },
    { name: 'Beta', value: brainwaves.beta, color: '#4facfe', frequency: '13-30 Hz', description: 'Active concentration, alertness' },
    { name: 'Alpha', value: brainwaves.alpha, color: '#00f2fe', frequency: '8-13 Hz', description: 'Relaxed awareness, meditation' },
    { name: 'Theta', value: brainwaves.theta, color: '#8338ec', frequency: '4-8 Hz', description: 'Deep relaxation, creativity' },
    { name: 'Delta', value: brainwaves.delta, color: '#fbbf24', frequency: '0.5-4 Hz', description: 'Deep sleep, healing' }
  ];

  return (
    <div className="brainwave-container">
      <div className="brainwave-header">
        <h3 className="brainwave-title">Real-Time EEG Analysis</h3>
        <div className={`recording-indicator ${isRecording ? 'active' : ''}`}>
          <div className="pulse-dot"></div>
          {isRecording ? 'Recording' : 'Standby'}
        </div>
      </div>

      <div className="brainwave-grid">
        {waveTypes.map((wave, index) => (
          <div key={wave.name} className="wave-card">
            <div className="wave-header">
              <div className="wave-color" style={{ backgroundColor: wave.color }}></div>
              <div className="wave-info">
                <h4 className="wave-name">{wave.name}</h4>
                <span className="wave-frequency">{wave.frequency}</span>
              </div>
              <div className="wave-value" style={{ color: wave.color }}>
                {Math.round(wave.value)}%
              </div>
            </div>
            
            <div className="wave-bar-container">
              <div 
                className="wave-bar" 
                style={{ 
                  width: `${wave.value}%`,
                  background: `linear-gradient(90deg, ${wave.color}20, ${wave.color})`
                }}
              >
                <div className="wave-bar-glow" style={{ backgroundColor: wave.color }}></div>
              </div>
            </div>
            
            <p className="wave-description">{wave.description}</p>
          </div>
        ))}
      </div>

      <div className="brain-visualization">
        <div className="brain-outline">
          <div className="brain-region frontal" style={{ 
            background: `radial-gradient(circle, ${waveTypes[1].color}${Math.round(brainwaves.beta)}), transparent)`
          }}>
            <span className="region-label">PFC</span>
          </div>
          <div className="brain-region parietal" style={{ 
            background: `radial-gradient(circle, ${waveTypes[2].color}${Math.round(brainwaves.alpha)}), transparent)`
          }}>
            <span className="region-label">Parietal</span>
          </div>
          <div className="brain-region temporal" style={{ 
            background: `radial-gradient(circle, ${waveTypes[3].color}${Math.round(brainwaves.theta)}), transparent)`
          }}>
            <span className="region-label">Temporal</span>
          </div>
          <div className="brain-region occipital" style={{ 
            background: `radial-gradient(circle, ${waveTypes[0].color}${Math.round(brainwaves.gamma)}), transparent)`
          }}>
            <span className="region-label">Visual</span>
          </div>
        </div>
      </div>
    </div>
  );
}
