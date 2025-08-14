
'use client';

import { useState, useEffect } from 'react';

interface FrequencyPreset {
  name: string;
  frequency: number;
  description: string;
  color: string;
  benefits: string[];
}

export default function BinauralBeats() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(10);
  const [volume, setVolume] = useState(50);
  const [activePreset, setActivePreset] = useState<string>('alpha');

  const frequencyPresets: Record<string, FrequencyPreset> = {
    delta: {
      name: 'Delta Waves',
      frequency: 2,
      description: 'Deep sleep and healing',
      color: '#8b5cf6',
      benefits: ['Deep Sleep', 'Recovery', 'Healing']
    },
    theta: {
      name: 'Theta Waves',
      frequency: 6,
      description: 'Deep meditation and creativity',
      color: '#06b6d4',
      benefits: ['Meditation', 'Creativity', 'Intuition']
    },
    alpha: {
      name: 'Alpha Waves',
      frequency: 10,
      description: 'Relaxed focus and learning',
      color: '#10b981',
      benefits: ['Focus', 'Learning', 'Relaxation']
    },
    beta: {
      name: 'Beta Waves',
      frequency: 20,
      description: 'Active concentration and alertness',
      color: '#f59e0b',
      benefits: ['Concentration', 'Alertness', 'Problem Solving']
    },
    gamma: {
      name: 'Gamma Waves',
      frequency: 40,
      description: 'Enhanced cognition and perception',
      color: '#ef4444',
      benefits: ['Enhanced Cognition', 'Perception', 'Peak Performance']
    }
  };

  const currentPreset = frequencyPresets[activePreset];

  useEffect(() => {
    setCurrentFrequency(currentPreset.frequency);
  }, [activePreset, currentPreset.frequency]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const selectPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    if (isPlaying) {
      // In a real app, this would change the audio frequency
      console.log(`Switching to ${frequencyPresets[presetKey].name}`);
    }
  };

  return (
    <div className="binaural-beats-container">
      <div className="binaural-header">
        <div className="frequency-info">
          <h3 className="frequency-name" style={{ color: currentPreset.color }}>
            {currentPreset.name}
          </h3>
          <p className="frequency-description">{currentPreset.description}</p>
        </div>
        <div className="frequency-visual">
          <div 
            className={`wave-animation ${isPlaying ? 'active' : ''}`}
            style={{ borderColor: currentPreset.color }}
          >
            <div 
              className="wave-circle"
              style={{ background: currentPreset.color }}
            ></div>
          </div>
        </div>
      </div>

      <div className="binaural-controls">
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlayback}
          style={{ 
            borderColor: currentPreset.color,
            color: isPlaying ? '#fff' : currentPreset.color 
          }}
        >
          <span className="button-icon">{isPlaying ? '⏸️' : '▶️'}</span>
          <span className="button-text">{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <div className="volume-control">
          <span className="volume-label">Volume</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-slider"
            style={{ accentColor: currentPreset.color }}
          />
          <span className="volume-value">{volume}%</span>
        </div>
      </div>

      <div className="binaural-info">
        <div className="info-row">
          <span className="info-label">Frequency:</span>
          <span className="info-value" style={{ color: currentPreset.color }}>
            {currentFrequency} Hz
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Brainwave State:</span>
          <span className="info-value">{currentPreset.name}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Benefits:</span>
          <span className="info-value">{currentPreset.benefits.join(', ')}</span>
        </div>
      </div>

      <div className="preset-selector">
        <h4 style={{ color: '#4facfe', marginBottom: '1rem' }}>Frequency Presets</h4>
        <div className="preset-grid">
          {Object.entries(frequencyPresets).map(([key, preset]) => (
            <button
              key={key}
              className={`preset-button ${activePreset === key ? 'active' : ''}`}
              onClick={() => selectPreset(key)}
              style={{
                borderColor: preset.color,
                backgroundColor: activePreset === key ? `${preset.color}20` : 'transparent'
              }}
            >
              <div className="preset-name">{preset.name}</div>
              <div className="preset-freq">{preset.frequency} Hz</div>
            </button>
          ))}
        </div>
      </div>

      <div className="usage-notice">
        <p><strong>Usage Guidelines:</strong></p>
        <p>• Use headphones for optimal binaural beat experience</p>
        <p>• Start with lower volumes and gradually increase</p>
        <p>• Sessions of 15-30 minutes are recommended</p>
      </div>
    </div>
  );
}
