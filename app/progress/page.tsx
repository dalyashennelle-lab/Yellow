'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function ProgressPage() {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('week');

  const progressData = {
    week: {
      cognitiveScore: 87,
      memoryImprovement: 23,
      focusLevel: 74,
      stressReduction: 31,
      sleepQuality: 68,
      streakDays: 12
    },
    month: {
      cognitiveScore: 85,
      memoryImprovement: 45,
      focusLevel: 78,
      stressReduction: 42,
      sleepQuality: 72,
      streakDays: 28
    },
    year: {
      cognitiveScore: 83,
      memoryImprovement: 78,
      focusLevel: 81,
      stressReduction: 56,
      sleepQuality: 75,
      streakDays: 365
    }
  };

  const currentData = progressData[timeFrame];

  const achievements = [
    { title: "Memory Master", description: "Completed 50 memory games", icon: "🧠", earned: true },
    { title: "Focus Champion", description: "Maintained focus for 2+ hours", icon: "🎯", earned: true },
    { title: "Meditation Guru", description: "Meditated for 30 days straight", icon: "🧘", earned: true },
    { title: "Sleep Optimizer", description: "Achieved 8h sleep for 7 days", icon: "💤", earned: false },
    { title: "Stress Buster", description: "Reduced stress by 50%", icon: "⚡", earned: false },
    { title: "Brain Scientist", description: "Read 100 research articles", icon: "🔬", earned: true }
  ];

  return (
    <div className="main-container">
      <Sidebar activeItem="progress" />
      
      <main className="main-content">
        <div className="progress-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">Progress Tracking</h1>
              <p className="hero-description">
                Monitor your cognitive enhancement journey with detailed analytics and personalized nutrition insights
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fdb5619d6d5d4428d9fc23c6a1dec6a4e?format=webp&width=800" 
                alt="Physical activity and nutrition recommendations for brain health"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <div className="section-card">
          <div className="progress-header">
            <h2 className="section-title">Cognitive Performance</h2>
            <div className="time-selector">
              {(['week', 'month', 'year'] as const).map((period) => (
                <button
                  key={period}
                  className={`time-button ${timeFrame === period ? 'active' : ''}`}
                  onClick={() => setTimeFrame(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="section-divider"></div>
          
          <div className="metrics-overview">
            <div className="metric-large">
              <div className="metric-icon">🧠</div>
              <div className="metric-value-large">{currentData.cognitiveScore}%</div>
              <div className="metric-label-large">Overall Cognitive Score</div>
            </div>

            <div className="metrics-grid-small">
              <div className="metric-small">
                <div className="metric-value-small">+{currentData.memoryImprovement}%</div>
                <div className="metric-label-small">Memory</div>
              </div>
              <div className="metric-small">
                <div className="metric-value-small">{currentData.focusLevel}%</div>
                <div className="metric-label-small">Focus</div>
              </div>
              <div className="metric-small">
                <div className="metric-value-small">-{currentData.stressReduction}%</div>
                <div className="metric-label-small">Stress</div>
              </div>
              <div className="metric-small">
                <div className="metric-value-small">{currentData.sleepQuality}%</div>
                <div className="metric-label-small">Sleep</div>
              </div>
            </div>
          </div>
        </div>

        <div className="wellness-insights">
          <h2 className="section-title">Wellness Insights</h2>
          <div className="section-divider"></div>
          
          <div className="insights-grid">
            <div className="insight-card-large">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F6d7487c0bc6245d4aa7e08983c3428d2?format=webp&width=800" 
                alt="Physical activity recommendations"
                className="insight-img"
              />
              <div className="insight-content">
                <h3>Physical Activity</h3>
                <p><strong>Today:</strong> 30 min brisk walk</p>
                <p>Your activity level is 18% below optimal. Aim for at least 8,000 steps today.</p>
                <div className="insight-action">
                  <button className="insight-button">View Workout Plan</button>
                </div>
              </div>
            </div>

            <div className="insight-card-large">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fa954391c7d1442109c3f58d9a4e7cd18?format=webp&width=800" 
                alt="Nutrition recommendations for brain health"
                className="insight-img"
              />
              <div className="insight-content">
                <h3>Nutrition</h3>
                <p><strong>Focus on:</strong> Omega-3 rich foods</p>
                <p>Consider adding salmon or walnuts to your meals for brain health benefits.</p>
                <div className="insight-action">
                  <button className="insight-button">Meal Suggestions</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sleep-analysis">
          <h2 className="section-title">Sleep & Memory Analysis</h2>
          <div className="section-divider"></div>
          
          <div className="sleep-content">
            <div className="sleep-visual">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F5886af4d52f34b129a07f471bd52ebab?format=webp&width=800" 
                alt="How sleep affects memory consolidation"
                className="sleep-img"
              />
            </div>
            <div className="sleep-insights">
              <h3>Sleep Impact on Memory</h3>
              <div className="sleep-stats">
                <div className="sleep-stat">
                  <span className="stat-value">7.2h</span>
                  <span className="stat-label">Avg Sleep</span>
                </div>
                <div className="sleep-stat">
                  <span className="stat-value">85%</span>
                  <span className="stat-label">REM Quality</span>
                </div>
                <div className="sleep-stat">
                  <span className="stat-value">+23%</span>
                  <span className="stat-label">Memory Boost</span>
                </div>
              </div>
              <p>Your sleep patterns show strong correlation with memory performance. Deep sleep phases are optimal for memory consolidation.</p>
              <button className="sleep-button">Optimize Sleep Schedule</button>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Achievements & Milestones</h2>
          <div className="section-divider"></div>
          
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
                <div className="achievement-icon">{achievement.icon}</div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
                <div className="achievement-status">
                  {achievement.earned ? '✓ Earned' : '🔒 Locked'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="streak-section">
          <div className="streak-card">
            <div className="streak-icon">🔥</div>
            <div className="streak-content">
              <h3>Current Streak</h3>
              <div className="streak-value">{currentData.streakDays} days</div>
              <p>Keep up the amazing work! Consistency is key to neuroplasticity.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
