import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const ProgressChart = ({ cognitiveData }) => {
  // Generate mock weekly data
  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return days.map((day, index) => ({
      day,
      memory: Math.max(70, Math.min(95, cognitiveData.memoryHealth + (Math.random() - 0.5) * 10)),
      focus: Math.max(65, Math.min(90, cognitiveData.focusLevel + (Math.random() - 0.5) * 12)),
      stress: Math.max(40, Math.min(80, cognitiveData.stressLevel + (Math.random() - 0.5) * 15)),
      neuroplasticity: Math.max(75, Math.min(95, cognitiveData.neuroplasticity + (Math.random() - 0.5) * 8))
    }))
  }

  const weeklyData = generateWeeklyData()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="neural-card">
      <div className="chart-header">
        <h3 className="heading-md">Cognitive Trends</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#00d4ff' }} />
            <span>Memory</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#7c3aed' }} />
            <span>Focus</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#ff0080' }} />
            <span>Stress</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#00ff88' }} />
            <span>Neuroplasticity</span>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff0080" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ff0080" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="neuroplasticityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00ff88" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255, 255, 255, 0.1)" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="day" 
              stroke="var(--text-secondary)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--text-secondary)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[40, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="neuroplasticity"
              stroke="#00ff88"
              strokeWidth={2}
              fill="url(#neuroplasticityGradient)"
              name="Neuroplasticity"
            />
            <Area
              type="monotone"
              dataKey="memory"
              stroke="#00d4ff"
              strokeWidth={2}
              fill="url(#memoryGradient)"
              name="Memory"
            />
            <Area
              type="monotone"
              dataKey="focus"
              stroke="#7c3aed"
              strokeWidth={2}
              fill="url(#focusGradient)"
              name="Focus"
            />
            <Area
              type="monotone"
              dataKey="stress"
              stroke="#ff0080"
              strokeWidth={2}
              fill="url(#stressGradient)"
              name="Stress"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <style jsx>{`
        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .chart-legend {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .chart-container {
          position: relative;
        }

        .chart-tooltip {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          padding: 12px;
          backdrop-filter: blur(10px);
          font-size: 0.875rem;
        }

        .tooltip-label {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        @media (max-width: 768px) {
          .chart-header {
            flex-direction: column;
            align-items: stretch;
          }

          .chart-legend {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default ProgressChart
