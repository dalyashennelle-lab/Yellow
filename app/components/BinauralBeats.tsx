'use client';

import { useState, useRef, useEffect } from 'react';

interface BinauralBeatsProps {
  targetBrainwave: 'gamma' | 'beta' | 'alpha' | 'theta' | 'delta';
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
}

interface BrainwaveFrequency {
  name: string;
  baseFreq: number;
  beatFreq: number;
  description: string;
  color: string;
}

export default function BinauralBeats({ targetBrainwave, isPlaying, onPlayingChange }: BinauralBeatsProps) {
  const [volume, setVolume] = useState(0.3);
  const [isLoading, setIsLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillator1Ref = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const brainwaveFrequencies: Record<string, BrainwaveFrequency> = {
    gamma: {
      name: 'Gamma (40 Hz)',
      baseFreq: 200,
      beatFreq: 40,
      description: 'Enhanced cognition, focus, and learning',
      color: '#ff006e'
    },
    beta: {
      name: 'Beta (20 Hz)', 
      baseFreq: 200,
      beatFreq: 20,
      description: 'Alert concentration and active thinking',
      color: '#4facfe'
    },
    alpha: {
      name: 'Alpha (10 Hz)',
      baseFreq: 200,
      beatFreq: 10,
      description: 'Relaxed awareness and meditation',
      color: '#00f2fe'
    },
    theta: {
      name: 'Theta (6 Hz)',
      baseFreq: 200,
      beatFreq: 6,
      description: 'Deep relaxation and creativity',
      color: '#8338ec'
    },
    delta: {
      name: 'Delta (2 Hz)',
      baseFreq: 200,
      beatFreq: 2,
      description: 'Deep sleep and healing',
      color: '#fbbf24'
    }
  };

  const currentFreq = brainwaveFrequencies[targetBrainwave];

  useEffect(() => {
    if (isPlaying) {
      startBinauralBeats();
    } else {
      stopBinauralBeats();
    }

    return () => {
      stopBinauralBeats();
    };
  }, [isPlaying, targetBrainwave]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current?.currentTime || 0);
    }
  }, [volume]);

  const startBinauralBeats = async () => {
    try {
      setIsLoading(true);

      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume context if suspended (required by Chrome)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Create gain node for volume control
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      gainNodeRef.current.connect(audioContextRef.current.destination);

      // Create left ear oscillator (base frequency)
      oscillator1Ref.current = audioContextRef.current.createOscillator();
      oscillator1Ref.current.type = 'sine';
      oscillator1Ref.current.frequency.setValueAtTime(currentFreq.baseFreq, audioContextRef.current.currentTime);
      
      // Create right ear oscillator (base frequency + beat frequency)
      oscillator2Ref.current = audioContextRef.current.createOscillator();
      oscillator2Ref.current.type = 'sine';
      oscillator2Ref.current.frequency.setValueAtTime(
        currentFreq.baseFreq + currentFreq.beatFreq,
        audioContextRef.current.currentTime
      );

      // Create stereo panner for left/right separation
      const leftPanner = audioContextRef.current.createStereoPanner();
      leftPanner.pan.setValueAtTime(-1, audioContextRef.current.currentTime); // Full left
      const rightPanner = audioContextRef.current.createStereoPanner();
      rightPanner.pan.setValueAtTime(1, audioContextRef.current.currentTime); // Full right

      // Connect nodes
      oscillator1Ref.current.connect(leftPanner);
      leftPanner.connect(gainNodeRef.current);
      
      oscillator2Ref.current.connect(rightPanner);
      rightPanner.connect(gainNodeRef.current);

      // Start oscillators
      oscillator1Ref.current.start();
      oscillator2Ref.current.start();

      setIsLoading(false);
    } catch (error) {
      console.error('Error starting binaural beats:', error);
      setIsLoading(false);
      onPlayingChange(false);
    }
  };

  const stopBinauralBeats = () => {
    if (oscillator1Ref.current) {
      oscillator1Ref.current.stop();
      oscillator1Ref.current.disconnect();
      oscillator1Ref.current = null;
    }

    if (oscillator2Ref.current) {
      oscillator2Ref.current.stop();
      oscillator2Ref.current.disconnect();
      oscillator2Ref.current = null;
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsLoading(false);
  };

  const togglePlayback = () => {
    onPlayingChange(!isPlaying);
  };

  return (
    <div className="binaural-beats-container">
      <div className="binaural-header">
        <div className="frequency-info">
          <h3 className="frequency-name" style={{ color: currentFreq.color }}>
            {currentFreq.name}
          </h3>
          <p className="frequency-description">{currentFreq.description}</p>
        </div>
        
        <div className="frequency-visual">
          <div 
            className={`wave-animation ${isPlaying ? 'active' : ''}`}
            style={{ borderColor: currentFreq.color }}
          >
            <div className="wave-circle" style={{ backgroundColor: currentFreq.color }}></div>
          </div>
        </div>
      </div>

      <div className="binaural-controls">
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlayback}
          disabled={isLoading}
          style={{ borderColor: currentFreq.color }}
        >
          {isLoading ? '⏳' : isPlaying ? '⏸️' : '▶️'}
          <span className="button-text">
            {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
          </span>
        </button>

        <div className="volume-control">
          <label className="volume-label">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
            style={{ accentColor: currentFreq.color }}
          />
          <span className="volume-value">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      <div className="binaural-info">
        <div className="info-row">
          <span className="info-label">Left Ear:</span>
          <span className="info-value">{currentFreq.baseFreq} Hz</span>
        </div>
        <div className="info-row">
          <span className="info-label">Right Ear:</span>
          <span className="info-value">{currentFreq.baseFreq + currentFreq.beatFreq} Hz</span>
        </div>
        <div className="info-row">
          <span className="info-label">Beat Frequency:</span>
          <span className="info-value" style={{ color: currentFreq.color }}>
            {currentFreq.beatFreq} Hz
          </span>
        </div>
      </div>

      <div className="usage-notice">
        <p>🎧 Use headphones for optimal binaural beat effect</p>
        <p>⚠️ Start with low volume and adjust gradually</p>
      </div>
    </div>
  );
}
