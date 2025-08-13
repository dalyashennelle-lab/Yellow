'use client';

import React, { useState } from 'react';
import EnhancedVideoPlayer from './EnhancedVideoPlayer';

interface VideoContent {
  type: 'youtube' | 'custom';
  videoId?: string;
  videoUrl?: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

interface HybridVideoPlayerProps {
  content: VideoContent;
}

export default function HybridVideoPlayer({ content }: HybridVideoPlayerProps) {
  const [hasError, setHasError] = useState(false);

  if (content.type === 'custom' && content.videoUrl) {
    return (
      <EnhancedVideoPlayer
        videoUrl={content.videoUrl}
        title={content.title}
        description={content.description}
        icon={content.icon}
        category={content.category}
      />
    );
  }

  // YouTube video player
  return (
    <div className="enhanced-video-card">
      <div className="video-header">
        <div className="video-category-badge">
          <span className="category-icon">{content.icon}</span>
          <span className="category-text">{content.category}</span>
        </div>
        <div className="video-info">
          <h3 className="video-title">{content.title}</h3>
          <p className="video-description">{content.description}</p>
        </div>
      </div>
      
      <div className="enhanced-video-container">
        {hasError ? (
          <div className="video-error">
            <div className="error-icon">⚠️</div>
            <p>Unable to load video. Please try again.</p>
            <button 
              className="retry-btn"
              onClick={() => setHasError(false)}
            >
              Retry
            </button>
          </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${content.videoId}?rel=0&modestbranding=1&controls=1`}
            title={content.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="youtube-iframe"
            onError={() => setHasError(true)}
            style={{
              borderRadius: '15px',
              background: 'rgba(0, 0, 0, 0.5)'
            }}
          />
        )}
      </div>

      <div className="video-stats">
        <div className="stat-item">
          <span className="stat-label">Platform</span>
          <span className="stat-value">YouTube</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Category</span>
          <span className="stat-value">{content.category}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Quality</span>
          <span className="stat-value">HD</span>
        </div>
      </div>
    </div>
  );
}
