import React from 'react'
import { Brain, Heart } from 'lucide-react'

const Mindfulness = ({ user }) => {
  return (
    <div className="mindfulness">
      <div className="page-header">
        <h1 className="heading-xl">Mindfulness & Meditation</h1>
        <p>Guided exercises for mental clarity and emotional balance</p>
      </div>
      
      <div className="neural-card">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Heart size={64} color="var(--neural-success)" style={{ marginBottom: '20px' }} />
          <h3 className="heading-md">Mindfulness Modules Coming Soon</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            Guided meditation and breathing exercises in development
          </p>
        </div>
      </div>
    </div>
  )
}

export default Mindfulness
