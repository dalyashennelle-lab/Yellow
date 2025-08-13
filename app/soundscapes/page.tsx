'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BinauralBeats from '../components/BinauralBeats';
import SimplifiedNeuralGalaxy from '../components/SimplifiedNeuralGalaxy';
import AIInsightsPanel from '../components/AIInsightsPanel';

interface Soundscape {
  id: string;
  name: string;
  description: string;
  category: 'Focus' | 'Relaxation' | 'Sleep' | 'Creativity' | 'Memory';
  targetBrainwave: 'gamma' | 'beta' | 'alpha' | 'theta' | 'delta';
  icon: string;
  color: string;
  ambientSounds: string[];
}

export default function SoundscapesPage() {
  const [activeSoundscape, setActiveSoundscape] = useState<string | null>(null);
  const [isBinauralPlaying, setIsBinauralPlaying] = useState(false);

  const soundscapes: Soundscape[] = [
    {
      id: 'deep-focus',
      name: 'Deep Focus Zone',
      description: 'Gamma wave entrainment for maximum concentration and cognitive performance',
      category: 'Focus',
      targetBrainwave: 'gamma',
      icon: '🎯',
      color: '#ff006e',
      ambientSounds: ['Rain', 'Brown Noise', 'Forest']
    },
    {
      id: 'active-learning',
      name: 'Active Learning',
      description: 'Beta wave stimulation for alert, engaged learning and information processing',
      category: 'Focus',
      targetBrainwave: 'beta',
      icon: '📚',
      color: '#4facfe',
      ambientSounds: ['Coffee Shop', 'Light Rain', 'White Noise']
    },
    {
      id: 'mindful-meditation',
      name: 'Mindful Meditation',
      description: 'Alpha wave induction for relaxed awareness and mindfulness practice',
      category: 'Relaxation',
      targetBrainwave: 'alpha',
      icon: '🧘',
      color: '#00f2fe',
      ambientSounds: ['Tibetan Bowls', 'Ocean Waves', 'Wind Chimes']
    },
    {
      id: 'creative-flow',
      name: 'Creative Flow State',
      description: 'Theta wave enhancement for deep creativity and innovative thinking',
      category: 'Creativity',
      targetBrainwave: 'theta',
      icon: '🎨',
      color: '#8338ec',
      ambientSounds: ['Cosmic Ambience', 'Gentle Rain', 'Birds']
    },
    {
      id: 'memory-consolidation',
      name: 'Memory Consolidation',
      description: 'Theta rhythms to support memory formation and information encoding',
      category: 'Memory',
      targetBrainwave: 'theta',
      icon: '🧠',
      color: '#8338ec',
      ambientSounds: ['Underwater', 'Soft Piano', 'Nature Sounds']
    },
    {
      id: 'deep-sleep',
      name: 'Deep Sleep Recovery',
      description: 'Delta wave synchronization for restorative sleep and neural recovery',
      category: 'Sleep',
      targetBrainwave: 'delta',
      icon: '🌙',
      color: '#fbbf24',
      ambientSounds: ['Night Rain', 'Heartbeat', 'Deep Ocean']
    }
  ];

  const activeSoundscapeData = activeSoundscape 
    ? soundscapes.find(s => s.id === activeSoundscape)
    : null;

  const startSoundscape = (soundscapeId: string) => {
    console.log('🎵 Starting soundscape:', soundscapeId);
    setActiveSoundscape(soundscapeId);
    setIsBinauralPlaying(true);

    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const stopSoundscape = () => {
    console.log('⏹️ Stopping soundscape');
    setActiveSoundscape(null);
    setIsBinauralPlaying(false);

    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div className="main-container" data-tab="soundscapes">
      <Sidebar activeItem="soundscapes" />
      
      <main className="main-content">
        <div className="soundscapes-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">Neural Soundscapes</h1>
              <p className="hero-description">
                Adaptive binaural beats and ambient sounds for cognitive enhancement in calming environments
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F3523311277ec45bea23afd2acf036ec7?format=webp&width=800"
                alt="Serene calming environment for mindfulness and meditation"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        {activeSoundscapeData && (
          <div className="section-card">
            <h2 className="section-title">Active Soundscape</h2>
            <div className="section-divider"></div>
            
            <div className="active-soundscape">
              <div className="soundscape-header">
                <div className="soundscape-info">
                  <span className="soundscape-icon" style={{ filter: `drop-shadow(0 0 10px ${activeSoundscapeData.color})` }}>
                    {activeSoundscapeData.icon}
                  </span>
                  <div>
                    <h3 className="soundscape-name" style={{ color: activeSoundscapeData.color }}>
                      {activeSoundscapeData.name}
                    </h3>
                    <p className="soundscape-category">{activeSoundscapeData.category} • {activeSoundscapeData.targetBrainwave.toUpperCase()} Waves</p>
                  </div>
                </div>
                
                <button className="stop-button" onClick={stopSoundscape}>
                  Stop Session
                </button>
              </div>

              <BinauralBeats 
                targetBrainwave={activeSoundscapeData.targetBrainwave}
                isPlaying={isBinauralPlaying}
                onPlayingChange={setIsBinauralPlaying}
              />
              
              <div className="ambient-controls">
                <h4>Ambient Sounds</h4>
                <div className="ambient-buttons">
                  {activeSoundscapeData.ambientSounds.map((sound) => (
                    <button key={sound} className="ambient-button">
                      {sound}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="section-card">
          <h2 className="section-title">Available Soundscapes</h2>
          <div className="section-divider"></div>
          
          <div className="soundscapes-grid">
            {soundscapes.map((soundscape) => (
              <div 
                key={soundscape.id} 
                className={`soundscape-card ${activeSoundscape === soundscape.id ? 'active' : ''}`}
              >
                <div className="soundscape-card-header">
                  <span 
                    className="soundscape-card-icon"
                    style={{ filter: `drop-shadow(0 0 15px ${soundscape.color})` }}
                  >
                    {soundscape.icon}
                  </span>
                  <span 
                    className="category-pill"
                    style={{ backgroundColor: `${soundscape.color}20`, color: soundscape.color }}
                  >
                    {soundscape.category}
                  </span>
                </div>

                <h3 className="soundscape-card-title" style={{ color: soundscape.color }}>
                  {soundscape.name}
                </h3>
                
                <p className="soundscape-card-description">
                  {soundscape.description}
                </p>

                <div className="brainwave-info">
                  <span className="brainwave-label">Target:</span>
                  <span 
                    className="brainwave-type"
                    style={{ color: soundscape.color }}
                  >
                    {soundscape.targetBrainwave.toUpperCase()} Waves
                  </span>
                </div>

                <div className="ambient-preview">
                  <span className="ambient-label">Includes:</span>
                  <div className="ambient-tags">
                    {soundscape.ambientSounds.slice(0, 2).map((sound) => (
                      <span key={sound} className="ambient-tag">{sound}</span>
                    ))}
                    {soundscape.ambientSounds.length > 2 && (
                      <span className="ambient-tag">+{soundscape.ambientSounds.length - 2}</span>
                    )}
                  </div>
                </div>

                <div className="soundscape-actions">
                  {activeSoundscape === soundscape.id ? (
                    <button
                      className="soundscape-button active"
                      onClick={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.currentTarget.style.transform = '';
                        }, 150);
                        stopSoundscape();
                      }}
                    >
                      ⏹️ Stop Session
                    </button>
                  ) : (
                    <button
                      className="soundscape-button"
                      onClick={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.currentTarget.style.transform = '';
                        }, 150);
                        startSoundscape(soundscape.id);
                      }}
                      style={{
                        borderColor: soundscape.color,
                        '--primary-color': soundscape.color
                      } as React.CSSProperties}
                    >
                      ▶️ Start Session
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <SimplifiedNeuralGalaxy
          isActive={!!activeSoundscape}
          brainwave={activeSoundscape ? soundscapes.find(s => s.id === activeSoundscape)?.targetBrainwave : 'alpha'}
        />

        <AIInsightsPanel
          isActive={!!activeSoundscape}
          brainState={activeSoundscape ? {
            dominantWave: soundscapes.find(s => s.id === activeSoundscape)?.targetBrainwave || 'alpha',
            focusLevel: Math.floor(Math.random() * 40) + 60,
            stressLevel: Math.floor(Math.random() * 30) + 20,
            creativity: Math.floor(Math.random() * 50) + 50,
            fatigue: Math.floor(Math.random() * 40) + 10,
            timestamp: Date.now()
          } : undefined}
        />

        <div className="section-card">
          <h2 className="section-title">Neuroscience of Sound</h2>
          <div className="section-divider"></div>

          <div className="science-grid">
            <div className="science-item">
              <div className="science-icon">🌊</div>
              <h3>Binaural Beats</h3>
              <p>Different frequencies in each ear create beat patterns that synchronize brainwaves to desired states</p>
            </div>

            <div className="science-item">
              <div className="science-icon">🎵</div>
              <h3>Entrainment</h3>
              <p>Neural oscillations naturally align with rhythmic auditory stimuli, optimizing cognitive performance</p>
            </div>

            <div className="science-item">
              <div className="science-icon">🧬</div>
              <h3>Neuroplasticity</h3>
              <p>Regular audio training strengthens neural pathways and enhances cognitive flexibility</p>
            </div>

            <div className="science-item">
              <div className="science-icon">⚖️</div>
              <h3>Hemispheric Sync</h3>
              <p>Binaural processing promotes communication between brain hemispheres for enhanced cognition</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
