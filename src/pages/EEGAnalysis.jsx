import React from 'react'
import { Waves, Brain, Activity } from 'lucide-react'

const EEGAnalysis = ({ user, cognitiveData }) => {
  return (
    <div className="eeg-analysis">
      <div className="page-header">
        <h1 className="heading-xl">EEG Brain Analysis</h1>
        <p>Real-time brainwave monitoring and neural activity insights</p>
      </div>
      
      <div className="grid grid-2">
        <div className="neural-card">
          <h3 className="heading-md">Neural Activity</h3>
          <div className="metric-grid">
            <div className="metric-item">
              <Activity size={20} color="var(--neural-primary)" />
              <span>Alpha Waves</span>
              <span className="metric-value">8.2 Hz</span>
            </div>
            <div className="metric-item">
              <Waves size={20} color="var(--neural-secondary)" />
              <span>Beta Waves</span>
              <span className="metric-value">18.7 Hz</span>
            </div>
          </div>
        </div>
        
        <div className="neural-card">
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <Brain size={48} color="var(--neural-accent)" style={{ marginBottom: '16px' }} />
            <h3 className="heading-sm">Advanced EEG Features</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Full EEG analysis coming in next update
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EEGAnalysis
