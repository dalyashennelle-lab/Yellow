import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'

const YouTubePlayer = ({ 
  videoId, 
  title, 
  autoplay = false, 
  controls = true, 
  className = '',
  onPlay,
  onPause 
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer()
      }
    } else {
      initializePlayer()
    }
  }, [videoId])

  const initializePlayer = () => {
    if (playerRef.current && window.YT && window.YT.Player) {
      new window.YT.Player(playerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 0, // We'll use custom controls
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0
        },
        events: {
          onReady: (event) => {
            setIsReady(true)
            if (autoplay) {
              event.target.playVideo()
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              onPlay?.()
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
              onPause?.()
            }
          }
        }
      })
    }
  }

  const togglePlay = () => {
    if (playerRef.current && window.YT) {
      const player = window.YT.get(playerRef.current.id)
      if (player) {
        if (isPlaying) {
          player.pauseVideo()
        } else {
          player.playVideo()
        }
      }
    }
  }

  const toggleMute = () => {
    if (playerRef.current && window.YT) {
      const player = window.YT.get(playerRef.current.id)
      if (player) {
        if (isMuted) {
          player.unMute()
        } else {
          player.mute()
        }
        setIsMuted(!isMuted)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`youtube-player-container ${className} ${isFullscreen ? 'fullscreen' : ''}`}
    >
      <div className="video-wrapper">
        <div 
          ref={playerRef}
          id={`youtube-player-${videoId}`}
          className="youtube-iframe"
        />
        
        {!isReady && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p>Loading {title}...</p>
          </div>
        )}

        {controls && isReady && (
          <div className="custom-controls">
            <div className="controls-left">
              <button 
                className="control-btn play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button 
                className="control-btn mute-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>

            <div className="controls-center">
              <span className="video-title">{title}</span>
            </div>

            <div className="controls-right">
              <button 
                className="control-btn fullscreen-btn"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .youtube-player-container {
          position: relative;
          width: 100%;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .youtube-player-container.fullscreen {
          border-radius: 0;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
        }

        .fullscreen .video-wrapper {
          padding-bottom: 0;
          height: 100%;
        }

        .youtube-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          gap: 16px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid var(--neural-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .custom-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          padding: 20px 16px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .youtube-player-container:hover .custom-controls {
          opacity: 1;
        }

        .controls-left,
        .controls-right {
          display: flex;
          gap: 8px;
        }

        .controls-center {
          flex: 1;
          text-align: center;
          padding: 0 16px;
        }

        .video-title {
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .control-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .play-btn {
          background: var(--neural-primary);
        }

        .play-btn:hover {
          background: var(--neural-secondary);
        }

        @media (max-width: 768px) {
          .controls-center {
            display: none;
          }
          
          .custom-controls {
            padding: 16px 12px 12px;
          }
          
          .control-btn {
            padding: 6px;
          }
        }
      `}</style>
    </div>
  )
}

export default YouTubePlayer
