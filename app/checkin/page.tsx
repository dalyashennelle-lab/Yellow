'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

interface CheckInData {
  mood: number;
  focus: number;
  memory: number;
  stress: number;
  sleep: number;
  notes: string;
}

export default function CheckInPage() {
  const [checkInData, setCheckInData] = useState<CheckInData>({
    mood: 5,
    focus: 5,
    memory: 5,
    stress: 5,
    sleep: 5,
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSliderChange = (field: keyof CheckInData, value: number) => {
    setCheckInData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Here you would typically save to database
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const getMoodEmoji = (value: number) => {
    const emojis = ['😰', '😕', '😐', '🙂', '😊', '😄', '😍', '🤩', '🚀', '✨'];
    return emojis[value - 1] || '😐';
  };

  const getStressColor = (value: number) => {
    if (value <= 3) return '#10b981';
    if (value <= 6) return '#fbbf24';
    return '#ef4444';
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="checkin" />
      
      <main className="main-content">
        <div className="checkin-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">Daily Check-In</h1>
              <p className="hero-description">
                Track your cognitive wellness with personalized counseling sessions and mood monitoring
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F6a10eb857d21476b9ed7371608004a87?format=webp&width=800" 
                alt="Evening counseling session in comfortable environment"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">How are you feeling today?</h2>
          <div className="section-divider"></div>
          
          <div className="checkin-form">
            <div className="checkin-item">
              <div className="checkin-label">
                <span>Mood</span>
                <span className="mood-emoji">{getMoodEmoji(checkInData.mood)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.mood}
                onChange={(e) => handleSliderChange('mood', parseInt(e.target.value))}
                className="checkin-slider"
              />
              <div className="slider-labels">
                <span>Low</span>
                <span>{checkInData.mood}/10</span>
                <span>High</span>
              </div>
            </div>

            <div className="checkin-item">
              <div className="checkin-label">
                <span>Focus Level</span>
                <span>🎯</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.focus}
                onChange={(e) => handleSliderChange('focus', parseInt(e.target.value))}
                className="checkin-slider"
              />
              <div className="slider-labels">
                <span>Scattered</span>
                <span>{checkInData.focus}/10</span>
                <span>Laser Focus</span>
              </div>
            </div>

            <div className="checkin-item">
              <div className="checkin-label">
                <span>Memory Performance</span>
                <span>🧠</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.memory}
                onChange={(e) => handleSliderChange('memory', parseInt(e.target.value))}
                className="checkin-slider"
              />
              <div className="slider-labels">
                <span>Foggy</span>
                <span>{checkInData.memory}/10</span>
                <span>Sharp</span>
              </div>
            </div>

            <div className="checkin-item">
              <div className="checkin-label">
                <span>Stress Level</span>
                <span style={{ color: getStressColor(checkInData.stress) }}>⚡</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.stress}
                onChange={(e) => handleSliderChange('stress', parseInt(e.target.value))}
                className="checkin-slider"
                style={{ '--slider-color': getStressColor(checkInData.stress) } as any}
              />
              <div className="slider-labels">
                <span>Calm</span>
                <span>{checkInData.stress}/10</span>
                <span>Overwhelmed</span>
              </div>
            </div>

            <div className="checkin-item">
              <div className="checkin-label">
                <span>Sleep Quality</span>
                <span>💤</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.sleep}
                onChange={(e) => handleSliderChange('sleep', parseInt(e.target.value))}
                className="checkin-slider"
              />
              <div className="slider-labels">
                <span>Poor</span>
                <span>{checkInData.sleep}/10</span>
                <span>Excellent</span>
              </div>
            </div>

            <div className="checkin-notes">
              <label className="notes-label">Additional Notes</label>
              <textarea
                value={checkInData.notes}
                onChange={(e) => setCheckInData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="How are you feeling? Any specific concerns or achievements today?"
                className="notes-textarea"
                rows={4}
              />
            </div>

            <button 
              className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
              onClick={handleSubmit}
              disabled={isSubmitted}
            >
              {isSubmitted ? '✓ Submitted' : 'Complete Check-In'}
            </button>
          </div>
        </div>

        <div className="counseling-sessions">
          <h2 className="section-title">Professional Support</h2>
          <div className="section-divider"></div>
          
          <div className="sessions-grid">
            <div className="session-card">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F8ad8f2267ab2487a84c1bbd0384af2ba?format=webp&width=800" 
                alt="Evening counseling session"
                className="session-img"
              />
              <div className="session-content">
                <h3>Evening Counseling</h3>
                <p>Personalized therapy sessions focused on cognitive wellness and mental health</p>
                <button className="session-button">Schedule Session</button>
              </div>
            </div>

            <div className="session-card">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fb4dbad1ff4ff4222bca8f59c5f4a7c2c?format=webp&width=800" 
                alt="Evening counseling session"
                className="session-img"
              />
              <div className="session-content">
                <h3>Group Therapy</h3>
                <p>Connect with others on similar cognitive enhancement journeys</p>
                <button className="session-button">Join Group</button>
              </div>
            </div>

            <div className="session-card">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F52570c5495bc4c28a5a27c5e3c23a360?format=webp&width=800" 
                alt="Evening counseling session"
                className="session-img"
              />
              <div className="session-content">
                <h3>Mindfulness Coaching</h3>
                <p>Learn practical techniques for stress management and emotional regulation</p>
                <button className="session-button">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
