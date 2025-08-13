import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  color = 'primary',
  description,
  animated = true 
}) => {
  const colorMap = {
    primary: 'var(--neural-primary)',
    secondary: 'var(--neural-secondary)',
    accent: 'var(--neural-accent)',
    success: 'var(--neural-success)',
    warning: 'var(--neural-warning)',
    error: 'var(--neural-error)'
  }

  const iconColor = colorMap[color]

  return (
    <div className={`metric-card-advanced ${animated ? 'animate-pulse-glow' : ''}`}>
      <div className="metric-header">
        <Icon 
          className="metric-icon" 
          size={24}
          style={{ color: iconColor }}
        />
        <span className="metric-title">{title}</span>
      </div>
      
      <div className="metric-content">
        <div className="metric-main">
          <span className="metric-value" style={{ color: iconColor }}>
            {value}
          </span>
          <span className="metric-unit">{unit}</span>
        </div>
        
        {trend !== undefined && (
          <div className={`metric-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend >= 0 ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span>{Math.abs(trend).toFixed(1)}%</span>
          </div>
        )}
      </div>
      
      {description && (
        <div className="metric-description">
          {description}
        </div>
      )}

      <div className="metric-glow" style={{ background: iconColor, opacity: 0.1 }} />

      <style jsx>{`
        .metric-card-advanced {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 16px;
          padding: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .metric-card-advanced:hover {
          border-color: var(--border-glow);
          transform: translateY(-4px);
          box-shadow: var(--shadow-glow);
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .metric-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .metric-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 12px;
        }

        .metric-main {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
          line-height: 1;
        }

        .metric-unit {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .metric-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .metric-trend.positive {
          color: var(--neural-success);
          background: rgba(0, 255, 136, 0.1);
        }

        .metric-trend.negative {
          color: var(--neural-error);
          background: rgba(255, 68, 68, 0.1);
        }

        .metric-description {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .metric-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          border-radius: 16px 16px 0 0;
        }

        @media (max-width: 768px) {
          .metric-value {
            font-size: 2rem;
          }
          
          .metric-card-advanced {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default MetricCard
