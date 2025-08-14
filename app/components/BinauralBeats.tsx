'use client';

import { useState, useEffect } from 'react';

interface BinauralBeatsProps {
  frequency?: number;
  onFrequencyChange?: (freq: number) => void;
}

export default function BinauralBeats({
  frequency = 10,
  onFrequencyChange
}: BinauralBeatsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFreq, setCurrentFreq] = useState(frequency);
  const [volume, setVolume] = useState(0.5);
  const [preset, setPreset] = useState('relaxation'); // Default to relaxation preset

  const presets = {
    focus: { id: 'focus', freq: 40, name: 'Focus (Gamma)', color: '#ff6b35' },
    relaxation: { id: 'relaxation', freq: 10, name: 'Relaxation (Alpha)', color: '#4facfe' },
    meditation: { id: 'meditation', freq: 6, name: 'Meditation (Theta)', color: '#9b59b6' },
    sleep: { id: 'sleep', freq: 2, name: 'Deep Sleep (Delta)', color: '#2c3e50' },
  };

  const handleFrequencyChange = (newFreq: number) => {
    setCurrentFreq(newFreq);
    onFrequencyChange?.(newFreq);
  };

  const handlePresetChange = (presetKey: string) => {
    setPreset(presetKey);
    const presetData = presets[presetKey as keyof typeof presets];
    handleFrequencyChange(presetData.freq);
  };

  const getBrainwaveType = (freq: number) => {
    if (freq >= 30) return 'Gamma (High Focus)';
    if (freq >= 13) return 'Beta (Active Thinking)';
    if (freq >= 8) return 'Alpha (Relaxed)';
    if (freq >= 4) return 'Theta (Meditative)';
    return 'Delta (Deep Sleep)';
  };

  return (
    <div className="binaural-beats-player">
      <div className="player-header">
        <h3>🎵 Binaural Beats Generator</h3>
        <div className="brainwave-type">
          {getBrainwaveType(currentFreq)}
        </div>
      </div>

      <div className="frequency-display">
        <div className="frequency-value">
          {currentFreq} Hz
        </div>
        <div className="frequency-visualizer">
          <div className="wave-container">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className={`wave-dot ${isPlaying ? 'pulsing' : ''}`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 - currentFreq / 30}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="preset-buttons">
        {Object.entries(presets).map(([key, preset]) => (
          <button
            key={key}
            className={`preset-btn ${preset.id === preset ? 'active' : ''}`}
            onClick={() => handlePresetChange(key)}
            style={{ borderColor: preset.color }}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="controls">
        <div className="frequency-slider">
          <label>Frequency: {currentFreq}Hz</label>
          <input
            type="range"
            min="1"
            max="50"
            value={currentFreq}
            onChange={(e) => handleFrequencyChange(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="volume-slider">
          <label>Volume: {Math.round(volume * 100)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>

      <div className="player-controls">
        <button
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? '⏸️ Stop' : '▶️ Play'}
        </button>
      </div>

      {isPlaying && (
        <div className="session-info">
          <div className="session-timer">
            Session: 05:23
          </div>
          <div className="effectiveness">
            Effectiveness: 94%
          </div>
        </div>
      )}
    </div>
  );
}