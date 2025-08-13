'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';
import RecommendationCard from './components/RecommendationCard';
import ActivityItem from './components/ActivityItem';
import CognitiveChart from './components/CognitiveChart';
import AIAgent from './components/AIAgent';
import AnimatedNeurons from './components/AnimatedNeurons';
import BrainwaveStrips from './components/BrainwaveStrips';
import CognitiveDashboard from './components/CognitiveDashboard';

export default function HomePage() {
  const [cognitiveMetrics, setCognitiveMetrics] = useState({
    timestamp: Date.now(),
    attention: 87,
    memory: 74,
    processing: 82,
    reactionTime: 285,
    accuracy: 92,
    cognitiveLoad: 72
  });

  const [historicalData, setHistoricalData] = useState([
    { timestamp: Date.now() - 3600000, attention: 82, memory: 78, processing: 85, reactionTime: 295, accuracy: 88, cognitiveLoad: 68 },
    { timestamp: Date.now() - 7200000, attention: 85, memory: 72, processing: 80, reactionTime: 310, accuracy: 85, cognitiveLoad: 75 },
    { timestamp: Date.now(), attention: 87, memory: 74, processing: 82, reactionTime: 285, accuracy: 92, cognitiveLoad: 72 }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCognitiveMetrics(prev => ({
        ...prev,
        timestamp: Date.now(),
        attention: Math.max(60, Math.min(100, prev.attention + (Math.random() - 0.5) * 10)),
        memory: Math.max(60, Math.min(100, prev.memory + (Math.random() - 0.5) * 8)),
        processing: Math.max(60, Math.min(100, prev.processing + (Math.random() - 0.5) * 12)),
        reactionTime: Math.max(200, Math.min(500, prev.reactionTime + (Math.random() - 0.5) * 50)),
        accuracy: Math.max(70, Math.min(100, prev.accuracy + (Math.random() - 0.5) * 5)),
        cognitiveLoad: Math.max(50, Math.min(100, prev.cognitiveLoad + (Math.random() - 0.5) * 15))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <Sidebar activeItem="dashboard" />

      <main className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">Cognitive Health Dashboard</h1>
              <p className="hero-description">
                Advanced EEG monitoring and AI-powered insights for optimal brain performance
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F1acec4e148274b8c806968bdb7513a4f?format=webp&width=800"
                alt="EEG system with people working while wearing neural monitoring headbands"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <div className="metrics-grid">
          <MetricCard
            icon="🧠"
            value={`${cognitiveMetrics.memory.toFixed(0)}%`}
            label="Memory Health"
            color="#4facfe"
          />
          <MetricCard
            icon="⚡"
            value={`${cognitiveMetrics.reactionTime.toFixed(0)}ms`}
            label="Reaction Time"
            color="#4facfe"
          />
          <MetricCard
            icon="🎯"
            value={`${cognitiveMetrics.attention.toFixed(0)}%`}
            label="Attention"
            color="#4facfe"
          />
          <MetricCard
            icon="📊"
            value={`${cognitiveMetrics.accuracy.toFixed(0)}%`}
            label="Accuracy"
            color="#4facfe"
          />
        </div>

        <div className="section-card">
          <h2 className="section-title">Daily Recommendations</h2>
          <div className="section-divider"></div>

          <RecommendationCard
            icon="🏃"
            title="Physical Activity"
            content="Today: 30 min brisk walk. Your activity level is 18% below optimal. Aim for at least 8,000 steps today."
            highlight="30 min brisk walk"
          />

          <RecommendationCard
            icon="🍎"
            title="Nutrition"
            content="Focus on: Omega-3 rich foods. Consider adding salmon or walnuts to your meals for brain health benefits."
            highlight="Omega-3 rich foods"
          />
        </div>

        <div className="section-card">
          <h2 className="section-title">Real-time Neural Activity</h2>
          <div className="section-divider"></div>
          <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}>
            <p>🧠 Animated Neurons Component</p>
            <p>Cognitive Load: {cognitiveMetrics.cognitiveLoad}%</p>
            <p>Activity: {cognitiveMetrics.attention}%</p>
            <p><em>3D visualization loading...</em></p>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Live Brainwave Analysis</h2>
          <div className="section-divider"></div>
          <BrainwaveStrips
            cognitiveLoad={cognitiveMetrics.cognitiveLoad}
            activity={cognitiveMetrics.attention}
            channels={4}
          />
        </div>

        <div className="section-card">
          <h2 className="section-title">Cognitive Performance Dashboard</h2>
          <div className="section-divider"></div>
          <CognitiveDashboard
            currentMetrics={cognitiveMetrics}
            historicalData={historicalData}
          />
        </div>

        <div className="dashboard-row">
          <div className="section-card">
            <h2 className="section-title">Recent Activity</h2>
            <div className="section-divider"></div>

            <ActivityItem
              icon="🎮"
              title="Memory Game"
              details="Completed level 5 with 92% accuracy"
              time="Today at 10:30 AM"
            />

            <ActivityItem
              icon="✅"
              title="Daily Check-in"
              details="Mood: 8/10 | Focus: 7/10 | Memory: 6/10"
              time="Today at 8:15 AM"
            />
          </div>

          <div className="section-card">
            <h2 className="section-title">AI Neural Coach</h2>
            <div className="section-divider"></div>
            <AIAgent
              cognitiveLoad={72}
              memoryScore={87}
              focusLevel={74}
              stressLevel={28}
            />
          </div>
        </div>

        <footer className="footer">
          © 2023 NeuroMind Pro - Advanced Cognitive Health Platform
          <br />
          Powered by Neuroscience & AI | Your data is always secure and private
        </footer>
      </main>
    </div>
  )
}
