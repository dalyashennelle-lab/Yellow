
'use client';

import { useState, useEffect } from 'react';

interface BinauralBeatsProps {
  frequency?: number;
  type?: string;
}

export default function BinauralBeats({ frequency = 40, type = 'Gamma' }: BinauralBeatsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentFreq, setCurrentFreq] = useState(frequency);

  const beatTypes = [
    { name: 'Delta', freq: 2, description: 'Deep sleep, healing' },
    { name: 'Theta', freq: 6, description: 'Meditation, creativity' },
    { name: 'Alpha', freq: 10, description: 'Relaxation, learning' },
    { name: 'Beta', freq: 20, description: 'Focus, concentration' },
    { name: 'Gamma', freq: 40, description: 'Peak performance, insight' }
  ];

  return (
    <div className="binaural-beats-container">
      <div className="beats-header">
        <h3>🎵 Binaural Beats Generator</h3>
        <p>Current: {type} waves at {currentFreq}Hz</p>
      </div>

      <div className="frequency-selector">
        {beatTypes.map((beat) => (
          <button
            key={beat.name}
            className={`freq-btn ${beat.name === type ? 'active' : ''}`}
            onClick={() => {
              setCurrentFreq(beat.freq);
            }}
          >
            <span className="freq-name">{beat.name}</span>
            <span className="freq-value">{beat.freq}Hz</span>
            <span className="freq-desc">{beat.description}</span>
          </button>
        ))}
      </div>

      <div className="audio-controls">
        <button 
          className="play-pause-btn"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>

        <div className="volume-control">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-slider"
          />
          <span>{volume}%</span>
        </div>
      </div>

      <div className="visualization">
        <div className="wave-form">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="wave-bar"
              style={{
                height: `${Math.sin(i * 0.5) * 20 + 30}px`,
                animationDelay: `${i * 0.1}s`,
                animationPlayState: isPlaying ? 'running' : 'paused'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
