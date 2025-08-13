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
  Sparkles
} from 'lucide-react'
import MetricCard from '../components/MetricCard'
import ProgressChart from '../components/ProgressChart'
import RecentActivity from '../components/RecentActivity'
import AIInsights from '../components/AIInsights'

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
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="heading-xl">
            {getGreeting()}, {user.name.split(' ')[0]}
          </h1>
          <p className="welcome-subtitle">
            Ready to enhance your cognitive performance today?
          </p>
        </div>
        
        <div className="quick-actions">
          <button className="btn btn-primary">
            <Play size={16} />
            Start Brain Training
          </button>
          <button className="btn btn-secondary">
            <Sparkles size={16} />
            Quick Check-in
          </button>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="metrics-grid grid grid-4">
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
      <div className="secondary-metrics grid grid-4">
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
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          padding: 80px 24px 24px;
          max-width: 1400px;
          margin: 0 auto;
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

        .metrics-grid {
          margin-bottom: 32px;
        }

        .secondary-metrics {
          margin-bottom: 32px;
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

        @media (max-width: 1024px) {
          .content-grid {
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
      `}</style>
    </div>
  )
}

export default Dashboard
