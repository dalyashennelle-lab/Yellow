
'use client';

import { useState } from 'react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  icon: string;
  duration?: string;
}

export default function VideoPlayer({ 
  videoId, 
  title, 
  description, 
  icon,
  duration = '10 min'
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Simulate progress for demo
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }
  };

  return (
    <div className="video-player-card">
      <div className="video-header">
        <div className="video-icon">{icon}</div>
        <div className="video-info">
          <h3 className="video-title">{title}</h3>
          <p className="video-description">{description}</p>
          <span className="video-duration">⏱️ {duration}</span>
        </div>
      </div>

      <div className="video-player">
        <div className="video-screen">
          <div className="video-placeholder">
            <div className="play-button" onClick={handlePlay}>
              {isPlaying ? '⏸️' : '▶️'}
            </div>
            <div className="video-waveform">
              {Array.from({ length: 20 }, (_, i) => (
                <div 
                  key={i} 
                  className={`wave-bar ${isPlaying ? 'animated' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="video-controls">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="control-buttons">
            <button className="control-btn">⏮️</button>
            <button className="control-btn play-btn" onClick={handlePlay}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button className="control-btn">⏭️</button>
            <button className="control-btn">🔊</button>
          </div>
        </div>
      </div>

      <div className="session-stats">
        <div className="stat">
          <span className="stat-label">Sessions:</span>
          <span className="stat-value">12</span>
        </div>
        <div className="stat">
          <span className="stat-label">Total Time:</span>
          <span className="stat-value">2.5h</span>
        </div>
      </div>
    </div>
  );
}
