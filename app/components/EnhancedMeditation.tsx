'use client';

import React, { useState, useEffect, useRef } from 'react';

interface EnhancedMeditationProps {
  onSessionChange?: (isActive: boolean) => void;
}

const EnhancedMeditation: React.FC<EnhancedMeditationProps> = ({ onSessionChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [sessionTimer, setSessionTimer] = useState(0);
  const [selectedEnvironment, setSelectedEnvironment] = useState('beach');
  const breathingGuideRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Beautiful meditation environments using user's photos
  const meditationEnvironments = {
    beach: {
      name: 'Ocean Serenity',
      description: 'Find peace with gentle waves and golden sunsets',
      images: [
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F45c5212b12344cbfa68860e97a9be6da?format=webp&width=800',
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fb9c46240bfa44dcd8ca951d95c0011f2?format=webp&width=800',
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fe68667bf37aa43cea556305af05b96db?format=webp&width=800'
      ],
      color: '#00b4db',
      icon: '🌊'
    },
    garden: {
      name: 'Mystic Garden',
      description: 'Immerse in vibrant nature pathways',
      images: [
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F9e4f20befb4a449284c7ceb55f285c48?format=webp&width=800',
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F344b9846b54d4b2d9b4cd356ef199f71?format=webp&width=800',
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F9b913595bd734015a2cdc79cf222b261?format=webp&width=800'
      ],
      color: '#56ab2f',
      icon: '🌸'
    },
    lake: {
      name: 'Mountain Lake',
      description: 'Reflect in crystal clear mountain waters',
      images: [
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F3994d507b32b4c4bb60224df7fd29609?format=webp&width=800',
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F6450e8edc9ac4008b6698eaa2336297e?format=webp&width=800',
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F644f4d11a1174561b4527d67d24bd227?format=webp&width=800'
      ],
      color: '#667eea',
      icon: '🏔️'
    },
    yoga: {
      name: 'Sacred Space',
      description: 'Connect body and mind in peaceful practice',
      images: [
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F6c9f4b3db7be4187bdde0f70d6311b43?format=webp&width=800',
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Ff4b5cab08819487b860fbca1ed72beb5?format=webp&width=800',
        'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fedf5a1bb0b5f44a58d77f7be121a12da?format=webp&width=800'
      ],
      color: '#764ba2',
      icon: '🧘‍♀️'
    }
  };

  const currentEnvironment = meditationEnvironments[selectedEnvironment as keyof typeof meditationEnvironments];

  // Smooth image cycling animation
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        (prev + 1) % currentEnvironment.images.length
      );
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [isActive, currentEnvironment.images.length]);

  // Breathing animation
  useEffect(() => {
    if (!isActive) return;

    const breathingCycle = () => {
      setBreathingPhase('inhale');
      
      setTimeout(() => {
        setBreathingPhase('exhale');
      }, 4000); // 4 seconds inhale
      
      setTimeout(() => {
        setBreathingPhase('inhale');
      }, 8000); // 4 seconds exhale
    };

    breathingCycle();
    const interval = setInterval(breathingCycle, 8000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Session timer
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSessionTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const startMeditation = (environment: string) => {
    // Immediate visual feedback
    const button = document.activeElement as HTMLElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      requestAnimationFrame(() => {
        button.style.transform = '';
      });
    }

    // Use RAF for smooth state updates
    requestAnimationFrame(() => {
      setSelectedEnvironment(environment);
      setIsActive(true);
      setSessionTimer(0);
      setCurrentImageIndex(0);
      onSessionChange?.(true);

      // Smooth start animation
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = 'scale(1.05)';
        setTimeout(() => {
          if (backgroundRef.current) {
            backgroundRef.current.style.transform = 'scale(1)';
          }
        }, 300);
      }
    });
  };

  const stopMeditation = () => {
    setIsActive(false);
    setSessionTimer(0);
    onSessionChange?.(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="enhanced-meditation">
      {!isActive ? (
        // Environment Selection
        <div className="meditation-selection">
          <h2 className="meditation-title">🌅 Immersive Meditation Experience</h2>
          <p className="meditation-subtitle">Choose your perfect sanctuary for mindful practice</p>
          
          <div className="environment-grid">
            {Object.entries(meditationEnvironments).map(([key, env]) => (
              <div
                key={key}
                className="environment-card"
                style={{ '--env-color': env.color } as React.CSSProperties}
                onClick={() => startMeditation(key)}
              >
                <div className="environment-preview">
                  <img
                    src={env.images[0]}
                    alt={env.name}
                    className="environment-image"
                  />
                  <div className="environment-overlay">
                    <span className="environment-icon">{env.icon}</span>
                  </div>
                </div>
                <div className="environment-info">
                  <h3 className="environment-name">{env.name}</h3>
                  <p className="environment-description">{env.description}</p>
                  <button 
                    className="start-meditation-btn"
                    style={{ backgroundColor: env.color }}
                  >
                    ▶️ Begin Journey
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Active Meditation Session
        <div className="meditation-session">
          <div 
            ref={backgroundRef}
            className="meditation-background"
            style={{
              backgroundImage: `url(${currentEnvironment.images[currentImageIndex]})`,
            }}
          >
            <div className="meditation-overlay" />
          </div>

          {/* Session Controls */}
          <div className="session-controls">
            <div className="session-info">
              <h3 className="session-title">{currentEnvironment.name}</h3>
              <div className="session-timer">{formatTime(sessionTimer)}</div>
            </div>
            
            <button 
              className="stop-session-btn"
              onClick={stopMeditation}
            >
              ⏹️ End Session
            </button>
          </div>

          {/* Breathing Guide */}
          <div className="breathing-container">
            <div 
              ref={breathingGuideRef}
              className={`breathing-guide ${breathingPhase}`}
              style={{ backgroundColor: currentEnvironment.color }}
            />
            <div className="breathing-text">
              <span className="breathing-instruction">
                {breathingPhase === 'inhale' ? 'Breathe In...' : 'Breathe Out...'}
              </span>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="meditation-progress">
            <div className="image-indicators">
              {currentEnvironment.images.map((_, index) => (
                <div
                  key={index}
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                  style={{ backgroundColor: index === currentImageIndex ? currentEnvironment.color : 'rgba(255,255,255,0.3)' }}
                />
              ))}
            </div>
          </div>

          {/* Ambient particles */}
          <div className="ambient-particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  backgroundColor: currentEnvironment.color
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedMeditation;
