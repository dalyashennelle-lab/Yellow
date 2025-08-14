'use client';

import { useState, useEffect } from 'react';

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
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev < 100 ? prev + 1 : 0));
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <div className="session-info">
              <div className="time-display">
                {formatTime(currentTime)} / {duration}
              </div>
            </div>
            <div className="video-waveform">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`wave-bar ${isPlaying ? 'animated' : ''}`}
                  style={{ 
                    height: isPlaying ? `${Math.random() * 30 + 10}px` : '10px',
                    animationDelay: `${i * 0.1}s`,
                    background: isPlaying ? '#4facfe' : '#64748b'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="control-buttons">
          <button className="control-btn" onClick={() => setProgress(0)}>
            ⏪
          </button>
          <button className="control-btn" onClick={handlePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="control-btn">
            ⏩
          </button>
          <button className="control-btn">
            🔊
          </button>
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