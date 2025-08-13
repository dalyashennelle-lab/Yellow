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
            value="87%"
            label="Memory Health"
            color="#4facfe"
          />
          <MetricCard
            icon="🌙"
            value="6.8h"
            label="Avg. Sleep"
            color="#4facfe"
          />
          <MetricCard
            icon="💖"
            value="74%"
            label="Stress Level"
            color="#4facfe"
          />
          <MetricCard
            icon="🔥"
            value="28"
            label="Current Streak"
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
          <h2 className="section-title">Cognitive Trends</h2>
          <div className="section-divider"></div>
          <CognitiveChart />
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
