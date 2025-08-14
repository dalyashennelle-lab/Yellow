
'use client';

import { useState } from 'react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  icon: string;
}

export default function VideoPlayer({ videoId, title, description, icon }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="video-card">
      <div className="video-thumbnail">
        <div className="thumbnail-overlay">
          <span className="video-icon">{icon}</span>
          <button 
            className="play-button"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>
      <div className="video-info">
        <h3 className="video-title">{title}</h3>
        <p className="video-description">{description}</p>
        <div className="video-controls">
          <button className="control-btn">⏮️</button>
          <button className="control-btn">⏯️</button>
          <button className="control-btn">⏭️</button>
          <div className="progress-bar">
            <div className="progress" style={{ width: '30%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
