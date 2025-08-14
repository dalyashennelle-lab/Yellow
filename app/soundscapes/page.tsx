'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BinauralBeats from '../components/BinauralBeats';

export default function SoundscapesPage() {
  const [activePreset, setActivePreset] = useState('focus');

  const soundPresets = [
    { id: 'focus', name: '🎯 Deep Focus', freq: 40, type: 'Gamma' },
    { id: 'relax', name: '😌 Relaxation', freq: 10, type: 'Alpha' },
    { id: 'sleep', name: '😴 Deep Sleep', freq: 2, type: 'Delta' },
    { id: 'creative', name: '🎨 Creativity', freq: 6, type: 'Theta' },
    { id: 'energy', name: '⚡ Energy Boost', freq: 20, type: 'Beta' }
  ];

  return (
    <div className="app-container">
      <Sidebar activeItem="soundscapes" />
      <main className="main-content">
        <div className="content-header">
          <div className="header-content">
            <h1 className="main-title">🎵 Binaural Soundscapes</h1>
            <p className="main-subtitle">
              Brainwave entrainment through carefully crafted audio experiences
            </p>
          </div>
        </div>

        <div className="soundscape-presets">
          {soundPresets.map((preset) => (
            <button
              key={preset.id}
              className={`preset-btn ${activePreset === preset.id ? 'active' : ''}`}
              onClick={() => setActivePreset(preset.id)}
            >
              {preset.name}
            </button>
          ))}
        </div>

        <BinauralBeats
          frequency={soundPresets.find(p => p.id === activePreset)?.freq || 40}
          type={soundPresets.find(p => p.id === activePreset)?.type || 'Gamma'}
        />

        <div className="soundscape-info">
          <div className="info-card">
            <h3>🧠 How It Works</h3>
            <p>Binaural beats create specific brainwave patterns by playing slightly different frequencies in each ear.</p>
          </div>
          <div className="info-card">
            <h3>⏱️ Recommended Usage</h3>
            <p>Listen for 15-30 minutes with headphones for optimal entrainment effects.</p>
          </div>
        </div>
      </main>
    </div>
  );
}