'use client';

import React, { useState, useRef, useEffect } from 'react';

interface EnhancedVideoPlayerProps {
  videoUrl: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
}

export default function EnhancedVideoPlayer({ 
  videoUrl, 
  title, 
  description, 
  icon,
  category = 'Mindfulness'
}: EnhancedVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value) / 100;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="enhanced-video-card" ref={containerRef}>
      <div className="video-header">
        <div className="video-category-badge">
          <span className="category-icon">{icon}</span>
          <span className="category-text">{category}</span>
        </div>
        <div className="video-info">
          <h3 className="video-title">{title}</h3>
          <p className="video-description">{description}</p>
        </div>
      </div>
      
      <div className="enhanced-video-container">
        {isLoading && (
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <p>Loading meditation video...</p>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="enhanced-video"
          preload="metadata"
          onClick={togglePlay}
          style={{ opacity: isLoading ? 0 : 1 }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!isLoading && (
          <div className="video-overlay">
            <button 
              className="play-pause-btn"
              onClick={togglePlay}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        )}

        {!isLoading && (
          <div className="video-controls">
            <div className="control-row">
              <button 
                className="control-btn play-btn"
                onClick={togglePlay}
              >
                {isPlaying ? '⏸️' : '▶��'}
              </button>
              
              <div className="progress-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressPercentage}
                  onChange={handleSeek}
                  className="progress-slider"
                />
                <div className="time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="volume-container">
                <span className="volume-icon">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>

              <button 
                className="control-btn fullscreen-btn"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? '🗗' : '⛶'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="video-stats">
        <div className="stat-item">
          <span className="stat-label">Duration</span>
          <span className="stat-value">{formatTime(duration)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Category</span>
          <span className="stat-value">{category}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Format</span>
          <span className="stat-value">HD Video</span>
        </div>
      </div>
    </div>
  );
}
