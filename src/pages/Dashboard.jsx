import React, { useState, useEffect } from 'react'
import { 
  Brain, 
  Heart, 
  Zap, 
  Activity, 
  Target, 
  TrendingUp,
  Clock,
  Flame,
  ChevronRight,
  Play,
  Sparkles,
  Stethoscope,
  Monitor
} from 'lucide-react'
import MetricCard from '../components/MetricCard'
import ProgressChart from '../components/ProgressChart'
import RecentActivity from '../components/RecentActivity'
import AIInsights from '../components/AIInsights'
import AIAgent from '../components/AIAgent'
import BlockchainNFT from '../components/BlockchainNFT'
import EmotionResponsiveVR from '../components/EmotionResponsiveVR'

const Dashboard = ({ user, cognitiveData, setCognitiveData }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [dailyGoals, setDailyGoals] = useState({
    meditation: { current: 15, target: 20, unit: 'min' },
    games: { current: 3, target: 5, unit: 'games' },
    sleep: { current: 6.8, target: 8, unit: 'hours' },
    focus: { current: 80, target: 85, unit: '%' }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const recentActivities = [
    {
      id: 1,
      type: 'game',
      title: 'Memory Matrix Challenge',
      description: 'Completed level 8 with 94% accuracy',
      time: '2 hours ago',
      score: 94,
      icon: Brain
    },
    {
      id: 2,
      type: 'meditation',
      title: 'Mindfulness Session',
      description: '15-minute focused breathing exercise',
      time: '4 hours ago',
      score: null,
      icon: Heart
    },
    {
      id: 3,
      type: 'checkin',
      title: 'Daily Check-in',
      description: 'Mood: 8/10 | Focus: 7/10 | Energy: 8/10',
      time: 'This morning',
      score: null,
      icon: Activity
    }
  ]

  return (
    <div className="dashboard">
      {/* Animated Background Images */}
      <div className="dashboard-bg-images">
        <div className="bg-image-float float-slow">
          <img src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F5f5bb2def30a45228ab08dcf1385b587?format=webp&width=800" alt="Sleep and Brain" className="dashboard-bg-img" />
        </div>
        <div className="bg-image-float float-medium">
          <img src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F10490e924aa147a097d7749f2608d1eb?format=webp&width=800" alt="Garden Environment" className="dashboard-bg-img" />
        </div>
        <div className="bg-image-float float-fast">
          <img src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fcac333fde156491d9ffe335413fbeb03?format=webp&width=800" alt="Physical Activity" className="dashboard-bg-img" />
        </div>
      </div>
      {/* Header Section */}
      <div className="dashboard-header slide-in-up">
        <div className="welcome-section">
          <h1 className="heading-xl breathe-glow">
            {getGreeting()}, {user.name.split(' ')[0]}
          </h1>
          <p className="welcome-subtitle">
            {user.role} - Ready to enhance cognitive performance today?
          </p>
        </div>
        
        <div className="quick-actions">
          <button className="btn btn-primary">
            <Play size={16} />
            Start Assessment
          </button>
          <button className="btn btn-secondary">
            <Sparkles size={16} />
            Quick Check-in
          </button>
        </div>
      </div>

      {/* Wellness Preview Section */}
      <div className="wellness-preview slide-in-up animate-delay-1">
        <h2 className="section-title">Your Wellness Journey</h2>
        <div className="wellness-cards">
          <div className="wellness-card theme-image-container float-slow">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F2fbaa246ccb347fe89d3b5fa64b0fb61?format=webp&width=800" alt="Mindfulness Practice" className="wellness-image" />
            <div className="theme-image-overlay"></div>
            <div className="wellness-content">
              <h3>Mindfulness Practice</h3>
              <p>Daily meditation sessions</p>
              <span className="wellness-stat neural-pulse">15 min today</span>
            </div>
          </div>

          <div className="wellness-card theme-image-container float-medium">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fd3b03ef89de9467b9610092b5db3e912?format=webp&width=800" alt="Memory Training" className="wellness-image" />
            <div className="theme-image-overlay"></div>
            <div className="wellness-content">
              <h3>Memory Training</h3>
              <p>Cognitive enhancement activities</p>
              <span className="wellness-stat neural-pulse">3 games completed</span>
            </div>
          </div>

          <div className="wellness-card theme-image-container float-fast">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa64b4be64d5743b4821735e5a99d3a87?format=webp&width=800" alt="Calming Environment" className="wellness-image" />
            <div className="theme-image-overlay"></div>
            <div className="wellness-content">
              <h3>Stress Relief</h3>
              <p>Calming environments</p>
              <span className="wellness-stat neural-pulse">Ocean sounds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Progress Section */}
      <div className="clinical-progress slide-in-up animate-delay-2">
        <h2 className="section-title">Clinical Progress Overview</h2>
        <div className="progress-showcase">
          <div className="progress-image">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F5c9dabb76aee4b138da67f4ac12a5e72?format=webp&width=800"
              alt="Clinical Progress Dashboard"
              className="clinical-dashboard-img"
            />
          </div>
          <div className="progress-details">
            <h3>Advanced Analytics</h3>
            <p>Monitor cognitive domain improvements over time with comprehensive tracking and detailed progress reports.</p>
            <div className="progress-metrics">
              <div className="progress-metric">
                <Stethoscope className="metric-icon" />
                <div>
                  <span className="metric-label">Clinical Accuracy</span>
                  <span className="metric-value">98.5%</span>
                </div>
              </div>
              <div className="progress-metric">
                <Monitor className="metric-icon" />
                <div>
                  <span className="metric-label">Assessment Reliability</span>
                  <span className="metric-value">99.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="metrics-grid grid grid-4 slide-in-up animate-delay-3">
        <MetricCard
          title="Memory Health"
          value={cognitiveData.memoryHealth}
          unit="%"
          icon={Brain}
          trend={+2.3}
          color="primary"
          description="Working memory capacity"
        />
        <MetricCard
          title="Focus Level"
          value={cognitiveData.focusLevel}
          unit="%"
          icon={Target}
          trend={+1.8}
          color="success"
          description="Sustained attention span"
        />
        <MetricCard
          title="Cognitive Load"
          value={cognitiveData.cognitiveLoad}
          unit="%"
          icon={Activity}
          trend={-0.5}
          color="warning"
          description="Mental processing demand"
        />
        <MetricCard
          title="Neuroplasticity"
          value={cognitiveData.neuroplasticity}
          unit="%"
          icon={Zap}
          trend={+3.2}
          color="accent"
          description="Brain adaptation capacity"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="secondary-metrics grid grid-4 slide-in-up animate-delay-4">
        <div className="metric-card">
          <div className="metric-header">
            <Heart className="metric-icon" style={{color: 'var(--neural-error)'}} />
            <span className="metric-label">Heart Rate</span>
          </div>
          <div className="metric-value">{Math.round(cognitiveData.heartRate)}</div>
          <div className="metric-unit">BPM</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <Clock className="metric-icon" style={{color: 'var(--neural-primary)'}} />
            <span className="metric-label">Avg Sleep</span>
          </div>
          <div className="metric-value">{cognitiveData.avgSleep}</div>
          <div className="metric-unit">hours</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <Activity className="metric-icon" style={{color: 'var(--neural-warning)'}} />
            <span className="metric-label">Stress Level</span>
          </div>
          <div className="metric-value">{cognitiveData.stressLevel}</div>
          <div className="metric-unit">%</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <Flame className="metric-icon" style={{color: 'var(--neural-success)'}} />
            <span className="metric-label">Current Streak</span>
          </div>
          <div className="metric-value">{user.streak}</div>
          <div className="metric-unit">days</div>
        </div>
      </div>

      {/* Clinical Assessment Section */}
      <div className="clinical-assessment">
        <div className="assessment-content">
          <h3>Professional Assessment Tools</h3>
          <p>Access clinical-grade cognitive assessment protocols designed for healthcare professionals.</p>
          <button className="btn btn-primary">
            <Monitor size={16} />
            Start Clinical Assessment
          </button>
        </div>
        <div className="assessment-image">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F81fe22e8bee641ffaac534cbd75cd8cb?format=webp&width=800"
            alt="Clinical Assessment Interface"
            className="assessment-img"
          />
        </div>
      </div>

      {/* AI Agent Section */}
      <div className="ai-agent-section slide-in-up animate-delay-5">
        <AIAgent
          user={user}
          cognitiveData={cognitiveData}
          onRecommendation={(type) => console.log('AI Recommendation:', type)}
        />
      </div>

      {/* VR Neural Environment */}
      <div className="vr-section slide-in-up animate-delay-6">
        <EmotionResponsiveVR
          emotionalData={{ mood: 'calm', energy: 'moderate' }}
          eegData={null}
          biometricData={{ heartRate: cognitiveData.heartRate }}
          onEnvironmentChange={(emotion, state) => console.log('Environment changed:', emotion, state)}
        />
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        <div className="content-left">
          <ProgressChart cognitiveData={cognitiveData} />
          <RecentActivity activities={recentActivities} />
        </div>
        
        <div className="content-right">
          <AIInsights user={user} cognitiveData={cognitiveData} />
          
          {/* Daily Goals */}
          <div className="neural-card">
            <h3 className="heading-md" style={{marginBottom: '24px'}}>Today's Goals</h3>
            <div className="goals-list">
              {Object.entries(dailyGoals).map(([key, goal]) => (
                <div key={key} className="goal-item">
                  <div className="goal-info">
                    <span className="goal-title">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className="goal-progress">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="goal-bar">
                    <div 
                      className="goal-fill"
                      style={{
                        width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                        background: goal.current >= goal.target ? 'var(--neural-success)' : 'var(--gradient-neural)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain NFT Collection */}
          <div className="nft-collection neural-card">
            <BlockchainNFT
              user={user}
              cognitiveData={cognitiveData}
              achievements={{ sessionsCompleted: 35 }}
            />
          </div>
        </div>
      </div>


      <style jsx>{`
        .dashboard {
          padding: 80px 24px 24px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .dashboard-bg-images {
          position: fixed;
          top: 0;
          left: 280px;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .bg-image-float {
          position: absolute;
          opacity: 0.03;
          border-radius: 20px;
          overflow: hidden;
        }

        .bg-image-float:nth-child(1) {
          top: 10%;
          right: 10%;
          width: 300px;
          height: 200px;
        }

        .bg-image-float:nth-child(2) {
          bottom: 20%;
          left: 5%;
          width: 250px;
          height: 180px;
        }

        .bg-image-float:nth-child(3) {
          top: 50%;
          right: 30%;
          width: 200px;
          height: 150px;
        }

        .dashboard-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wellness-preview {
          margin-bottom: 40px;
          padding: 32px;
          background: var(--bg-card);
          border-radius: 20px;
          border: 1px solid var(--border-primary);
        }

        .wellness-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .wellness-card {
          position: relative;
          height: 200px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .wellness-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-glow);
        }

        .wellness-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wellness-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
        }

        .wellness-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .wellness-content p {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 8px;
        }

        .wellness-stat {
          display: inline-block;
          background: var(--neural-primary);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          gap: 24px;
        }

        .welcome-subtitle {
          color: var(--text-secondary);
          font-size: 1.125rem;
          margin-top: 8px;
        }

        .quick-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        .clinical-progress {
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--neural-primary);
        }

        .progress-showcase {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          background: var(--bg-card);
          border-radius: 20px;
          padding: 32px;
          border: 1px solid var(--border-primary);
        }

        .clinical-dashboard-img {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-glow);
        }

        .progress-details h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .progress-details p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .progress-metrics {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .progress-metric {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .metric-icon {
          color: var(--neural-primary);
        }

        .metric-label {
          display: block;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .metric-value {
          display: block;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--neural-primary);
        }

        .metrics-grid {
          margin-bottom: 32px;
        }

        .secondary-metrics {
          margin-bottom: 32px;
        }

        .clinical-assessment {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          background: var(--bg-tertiary);
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 40px;
          border: 1px solid var(--border-primary);
        }

        .assessment-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--neural-secondary);
        }

        .assessment-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .assessment-img {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-glow);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }

        .content-left {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .content-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .goal-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .goal-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .goal-title {
          font-weight: 500;
          color: var(--text-primary);
        }

        .goal-progress {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .goal-bar {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
        }

        .goal-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .consultation-preview {
          text-align: center;
        }

        .consultation-preview h3 {
          margin-bottom: 16px;
          color: var(--neural-accent);
        }

        .consultation-img {
          width: 100%;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .consultation-preview p {
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .progress-showcase,
          .clinical-assessment {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 80px 16px 16px;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: stretch;
          }

          .quick-actions {
            width: 100%;
          }

          .quick-actions .btn {
            flex: 1;
          }
        }

        .ai-agent-section,
        .vr-section,
        .video-section {
          margin-bottom: 40px;
        }

        .nft-collection {
          grid-column: 1 / -1;
        }
      `}</style>
    </div>
  )
}

export default Dashboard
