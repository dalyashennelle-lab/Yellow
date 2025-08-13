import React from 'react'
import { ChevronRight, Trophy, Clock } from 'lucide-react'

const RecentActivity = ({ activities }) => {
  const getActivityColor = (type) => {
    const colors = {
      game: 'var(--neural-primary)',
      meditation: 'var(--neural-success)',
      checkin: 'var(--neural-secondary)',
      exercise: 'var(--neural-warning)',
      sleep: 'var(--neural-accent)'
    }
    return colors[type] || 'var(--neural-primary)'
  }

  const getScoreBadge = (score) => {
    if (!score) return null
    
    let badgeClass = 'score-badge '
    if (score >= 90) badgeClass += 'excellent'
    else if (score >= 80) badgeClass += 'good'
    else if (score >= 70) badgeClass += 'average'
    else badgeClass += 'needs-work'

    return (
      <div className={badgeClass}>
        <Trophy size={12} />
        {score}%
      </div>
    )
  }

  return (
    <div className="neural-card">
      <div className="activity-header">
        <h3 className="heading-md">Recent Activity</h3>
        <button className="btn btn-ghost">
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon" style={{ background: getActivityColor(activity.type) }}>
                <Icon size={18} color="white" />
              </div>
              
              <div className="activity-content">
                <div className="activity-main">
                  <h4 className="activity-title">{activity.title}</h4>
                  <p className="activity-description">{activity.description}</p>
                </div>
                
                <div className="activity-meta">
                  <div className="activity-time">
                    <Clock size={12} />
                    {activity.time}
                  </div>
                  {getScoreBadge(activity.score)}
                </div>
              </div>

              <div className="activity-arrow">
                <ChevronRight size={16} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="activity-summary">
        <div className="summary-stat">
          <span className="stat-value">12</span>
          <span className="stat-label">Activities Today</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">2.5h</span>
          <span className="stat-label">Total Time</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">+15</span>
          <span className="stat-label">Brain Points</span>
        </div>
      </div>

      <style jsx>{`
        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .activity-item:hover {
          border-color: var(--border-glow);
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
          min-width: 0;
        }

        .activity-main {
          margin-bottom: 8px;
        }

        .activity-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .activity-description {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .activity-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .activity-time {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .score-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .score-badge.excellent {
          background: rgba(0, 255, 136, 0.2);
          color: var(--neural-success);
        }

        .score-badge.good {
          background: rgba(0, 212, 255, 0.2);
          color: var(--neural-primary);
        }

        .score-badge.average {
          background: rgba(255, 170, 0, 0.2);
          color: var(--neural-warning);
        }

        .score-badge.needs-work {
          background: rgba(255, 68, 68, 0.2);
          color: var(--neural-error);
        }

        .activity-arrow {
          color: var(--text-muted);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .activity-item:hover .activity-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        .activity-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-primary);
        }

        .summary-stat {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-value {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--neural-primary);
          font-family: 'Space Grotesk', sans-serif;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .activity-item {
            padding: 12px;
          }

          .activity-description {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
          }

          .activity-summary {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  )
}

export default RecentActivity
