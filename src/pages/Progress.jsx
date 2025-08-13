import React from 'react'
import { TrendingUp, Calendar } from 'lucide-react'

const Progress = ({ user }) => {
  return (
    <div className="progress">
      <div className="page-header">
        <h1 className="heading-xl">Progress Tracking</h1>
        <p>Comprehensive analytics of your cognitive development</p>
      </div>
      
      <div className="neural-card">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <TrendingUp size={64} color="var(--neural-secondary)" style={{ marginBottom: '20px' }} />
          <h3 className="heading-md">Advanced Analytics Coming Soon</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            Detailed progress reports and insights in development
          </p>
        </div>
      </div>
    </div>
  )
}

export default Progress
