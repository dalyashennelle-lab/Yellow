
'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';
import Image from 'next/image';

interface MindfulnessContent {
  videoId: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  type: string;
}

export default function MindfulnessPage() {
  const [activeSession, setActiveSession] = useState<string | null>(null);

  const mindfulnessContent: MindfulnessContent[] = [
    {
      videoId: 'demo-breathing',
      title: '🌬️ Breath Awareness',
      description: 'Foundational breathing techniques for mental clarity',
      icon: '🌬️',
      duration: '10 min',
      type: 'Breathing'
    },
    {
      videoId: 'demo-body-scan',
      title: '🧘 Body Scan Meditation',
      description: 'Progressive relaxation and body awareness',
      icon: '🧘',
      duration: '20 min',
      type: 'Meditation'
    },
    {
      videoId: 'demo-visualization',
      title: '🌅 Guided Visualization',
      description: 'Immersive mental imagery for stress relief',
      icon: '🌅',
      duration: '15 min',
      type: 'Visualization'
    },
    {
      videoId: 'demo-walking',
      title: '🚶 Walking Meditation',
      description: 'Mindful movement and present moment awareness',
      icon: '🚶',
      duration: '12 min',
      type: 'Movement'
    }
  ];

  return (
    <div className="app-container">
      <Sidebar activeItem="mindfulness" />
      <main className="main-content">
        <div className="content-header">
          <div className="header-content">
            <h1 className="main-title">🧘 Mindfulness Training</h1>
            <p className="main-subtitle">
              Guided meditation and breathing exercises for enhanced mental clarity and emotional regulation
            </p>
          </div>
          <div className="section-divider"></div>
        </div>

        <div className="mindfulness-grid">
          {mindfulnessContent.map((content, index) => (
            <VideoPlayer
              key={index}
              videoId={content.videoId}
              title={content.title}
              description={content.description}
              icon={content.icon}
              duration={content.duration}
            />
          ))}
        </div>

        <div className="meditation-gallery">
          <div className="gallery-header">
            <h2 className="section-title">🏖️ Peaceful Environments</h2>
            <p>Immerse yourself in calming beach scenes for deeper relaxation</p>
          </div>
          <div className="gallery-grid">
            <div className="meditation-scene">
              <div className="scene-image">
                <div className="scene-placeholder">
                  🏖️ Serene Beach Sunset
                </div>
              </div>
              <h3>Beach Meditation</h3>
              <p>Find peace with gentle ocean waves</p>
            </div>
            <div className="meditation-scene">
              <div className="scene-image">
                <div className="scene-placeholder">
                  🌊 Ocean Waves
                </div>
              </div>
              <h3>Wave Meditation</h3>
              <p>Let the rhythmic sounds calm your mind</p>
            </div>
            <div className="meditation-scene">
              <div className="scene-image">
                <div className="scene-placeholder">
                  🌅 Dawn Reflection
                </div>
              </div>
              <h3>Morning Mindfulness</h3>
              <p>Start your day with peaceful intention</p>
            </div>
          </div>
        </div>

        <div className="mindfulness-stats">
          <div className="stat-card">
            <h3>🎯 Focus Score</h3>
            <div className="stat-value">87%</div>
            <p>Today's mindfulness rating</p>
          </div>
          <div className="stat-card">
            <h3>⏱️ Session Time</h3>
            <div className="stat-value">45 min</div>
            <p>Total meditation today</p>
          </div>
          <div className="stat-card">
            <h3>🔥 Streak</h3>
            <div className="stat-value">12 days</div>
            <p>Consecutive practice</p>
          </div>
        </div>
      </main>
    </div>
  );
}
