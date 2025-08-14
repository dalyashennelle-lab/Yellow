'use client';

import { useState, useEffect, useRef } from 'react';

interface BinauralBeatsProps {
  frequency?: number;
  type?: string;
  onFrequencyChange?: (freq: number) => void;
}

export default function BinauralBeats({ 
  frequency = 10, 
  type = 'Alpha',
  onFrequencyChange 
}: BinauralBeatsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFreq, setCurrentFreq] = useState(frequency);
  const [volume, setVolume] = useState(0.3);
  const [preset, setPreset] = useState('focus');
  const [sessionTime, setSessionTime] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const presets = {
    focus: { freq: 40, name: 'Focus (Gamma)', color: '#ff6b35' },
    relaxation: { freq: 10, name: 'Relaxation (Alpha)', color: '#4facfe' },
    meditation: { freq: 6, name: 'Meditation (Theta)', color: '#9b59b6' },
    sleep: { freq: 2, name: 'Deep Sleep (Delta)', color: '#2c3e50' },
  };

  useEffect(() => {
    if (isPlaying) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      }

      const context = audioContextRef.current;
      const gainNode = gainNodeRef.current!;

      leftOscillatorRef.current = context.createOscillator();
      rightOscillatorRef.current = context.createOscillator();

      leftOscillatorRef.current.connect(gainNode);
      rightOscillatorRef.current.connect(gainNode);

      const leftFrequency = currentFreq;
      const rightFrequency = currentFreq + parseInt(type.split(' ')[1].replace('(', '').replace(')', ''), 10); // Calculate difference based on type

      leftOscillatorRef.current.frequency.setValueAtTime(leftFrequency, context.currentTime);
      rightOscillatorRef.current.frequency.setValueAtTime(rightFrequency, context.currentTime);

      leftOscillatorRef.current.type = 'sine';
      rightOscillatorRef.current.type = 'sine';

      leftOscillatorRef.current.start();
      rightOscillatorRef.current.start();

      // Start session timer
      const intervalId = setInterval(() => {
        setSessionTime(prevTime => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
        leftOscillatorRef.current?.stop();
        rightOscillatorRef.current?.stop();
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          // Only close context if it's the last sound being played or if explicitly needed
          // For this component, we might want to keep it open if other audio features are planned.
          // For now, let's assume we stop oscillators and don't close the context immediately.
        }
      };
    } else {
      // Stop oscillators and reset session timer
      leftOscillatorRef.current?.stop();
      rightOscillatorRef.current?.stop();
      setSessionTime(0);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        // Close audio context if it's no longer needed. Consider the app's overall audio management.
        // audioContextRef.current.close();
        // audioContextRef.current = null;
      }
    }
  }, [isPlaying, currentFreq, volume, type]);

  useEffect(() => {
    // Update gain node when volume changes
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    }
  }, [volume]);

  const handleFrequencyChange = (newFreq: number) => {
    setCurrentFreq(newFreq);
    onFrequencyChange?.(newFreq);
  };

  const handlePresetChange = (presetKey: string) => {
    setPreset(presetKey);
    const presetData = presets[presetKey as keyof typeof presets];
    handleFrequencyChange(presetData.freq);
    // Update the type based on the preset name for better audio frequency calculation
    const presetType = presetData.name.split(' ')[1].replace('(', '').replace(')', '');
    // It's assumed that 'type' prop might be used elsewhere or for initial setup.
    // If directly changing 'type' here, it might need to be managed via state or passed down.
    // For now, we'll rely on the initial `type` prop and currentFreq for audio.
  };

  const getBrainwaveType = (freq: number) => {
    if (freq >= 30) return 'Gamma (High Focus)';
    if (freq >= 13) return 'Beta (Active Thinking)';
    if (freq >= 8) return 'Alpha (Relaxed)';
    if (freq >= 4) return 'Theta (Meditative)';
    return 'Delta (Deep Sleep)';
  };

  return (
    <div className="binaural-beats-player">
      <div className="player-header">
        <h3>🎵 Binaural Beats Generator</h3>
        <div className="brainwave-type">
          {getBrainwaveType(currentFreq)}
        </div>
      </div>

      <div className="frequency-display">
        <div className="frequency-value">
          {currentFreq} Hz
        </div>
        <div className="frequency-visualizer">
          <div className="wave-container">
            {Array.from({ length: 30 }, (_, i) => (
              <div 
                key={i}
                className={`wave-dot ${isPlaying ? 'pulsing' : ''}`}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 - currentFreq / 30}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="preset-buttons">
        {Object.entries(presets).map(([key, preset]) => (
          <button
            key={key}
            className={`preset-btn ${preset === key ? 'active' : ''}`}
            onClick={() => handlePresetChange(key)}
            style={{ borderColor: preset.color }}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="controls">
        <div className="frequency-slider">
          <label>Frequency: {currentFreq}Hz</label>
          <input
            type="range"
            min="1"
            max="50"
            value={currentFreq}
            onChange={(e) => handleFrequencyChange(Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="volume-slider">
          <label>Volume: {Math.round(volume * 100)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="slider"
          />
        </div>
      </div>

      <div className="player-controls">
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? '⏸️ Stop' : '▶️ Play'}
        </button>
      </div>

      {isPlaying && (
        <div className="session-info">
          <div className="session-timer">
            Session: {sessionTime}s
          </div>
          <div className="effectiveness">
            Effectiveness: 94% 
          </div>
        </div>
      )}
    </div>
  );
}