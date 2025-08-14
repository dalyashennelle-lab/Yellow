
'use client';

import { useState, useEffect } from 'react';

interface BinauralBeatsProps {
  frequency?: number;
  isPlaying?: boolean;
}

export default function BinauralBeats({ 
  frequency = 10, 
  isPlaying = false 
}: BinauralBeatsProps) {
  const [currentFreq, setCurrentFreq] = useState(frequency);
  const [volume, setVolume] = useState(50);
  const [playing, setPlaying] = useState(isPlaying);
  const [selectedPreset, setSelectedPreset] = useState('alpha');

  const presets = {
    delta: { freq: 2, name: 'Delta', color: '#8B5CF6', description: 'Deep sleep & healing' },
    theta: { freq: 6, name: 'Theta', color: '#06B6D4', description: 'Meditation & creativity' },
    alpha: { freq: 10, name: 'Alpha', color: '#10B981', description: 'Relaxation & focus' },
    beta: { freq: 20, name: 'Beta', color: '#F59E0B', description: 'Active concentration' },
    gamma: { freq: 40, name: 'Gamma', color: '#EF4444', description: 'Peak awareness' },
  };

  useEffect(() => {
    setCurrentFreq(presets[selectedPreset as keyof typeof presets].freq);
  }, [selectedPreset]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const WaveAnimation = () => (
    <div className="wave-container">
      {Array.from({ length: 20 }, (_, i) => (
        <div 
          key={i}
          className={`wave-dot ${playing ? 'pulsing' : ''}`}
          style={{
            animationDelay: `${i * 0.1}s`,
            color: presets[selectedPreset as keyof typeof presets].color
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="binaural-beats-container">
      <div className="binaural-header">
        <div className="frequency-info">
          <h3 className="frequency-name" style={{ 
            color: presets[selectedPreset as keyof typeof presets].color 
          }}>
            {presets[selectedPreset as keyof typeof presets].name} Waves
          </h3>
          <p className="frequency-description">
            {presets[selectedPreset as keyof typeof presets].description}
          </p>
        </div>
        <div className="frequency-visual">
          <div 
            className={`wave-animation ${playing ? 'active' : ''}`}
            style={{ 
              borderColor: presets[selectedPreset as keyof typeof presets].color,
              color: presets[selectedPreset as keyof typeof presets].color 
            }}
          >
            <div 
              className="wave-circle" 
              style={{ 
                backgroundColor: presets[selectedPreset as keyof typeof presets].color 
              }}
            />
          </div>
        </div>
      </div>

      <div className="frequency-display">
        <div className="frequency-value" style={{ 
          color: presets[selectedPreset as keyof typeof presets].color 
        }}>
          {currentFreq}Hz
        </div>
        <WaveAnimation />
      </div>

      <div className="preset-buttons">
        {Object.entries(presets).map(([key, preset]) => (
          <button
            key={key}
            className={`preset-btn ${selectedPreset === key ? 'active' : ''}`}
            style={{ 
              borderColor: preset.color,
              color: selectedPreset === key ? '#fff' : preset.color,
              backgroundColor: selectedPreset === key ? preset.color : 'transparent'
            }}
            onClick={() => setSelectedPreset(key)}
          >
            {preset.name}
            <br />
            <small>{preset.freq}Hz</small>
          </button>
        ))}
      </div>

      <div className="binaural-controls">
        <button
          className={`play-button ${playing ? 'playing' : ''}`}
          onClick={handlePlayPause}
          style={{ 
            borderColor: presets[selectedPreset as keyof typeof presets].color 
          }}
        >
          <span className="button-icon">
            {playing ? '⏸️' : '▶️'}
          </span>
          <span className="button-text">
            {playing ? 'Pause' : 'Play'}
          </span>
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
          />
          <span className="volume-value">{volume}%</span>
        </div>
      </div>

      <div className="binaural-info">
        <div className="info-row">
          <span className="info-label">Target Frequency:</span>
          <span className="info-value">{currentFreq}Hz</span>
        </div>
        <div className="info-row">
          <span className="info-label">Wave Type:</span>
          <span className="info-value">{presets[selectedPreset as keyof typeof presets].name}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Duration:</span>
          <span className="info-value">∞ Continuous</span>
        </div>
      </div>

      <div className="usage-notice">
        <p><strong>💡 Usage Tip:</strong> Use headphones for optimal binaural beat effect.</p>
        <p><strong>⚠️ Safety:</strong> Start with low volume and gradually increase to comfortable levels.</p>
      </div>
    </div>
  );
}
