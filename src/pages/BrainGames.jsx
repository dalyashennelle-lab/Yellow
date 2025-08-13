import React from 'react'
import { GameController2, Target, Brain, Clock } from 'lucide-react'

const BrainGames = ({ user }) => {
  return (
    <div className="brain-games">
      <div className="page-header">
        <h1 className="heading-xl">Brain Training Games</h1>
        <p>Enhance your cognitive abilities with scientifically designed games</p>
      </div>
      
      <div className="neural-card">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <GameController2 size={64} color="var(--neural-primary)" style={{ marginBottom: '20px' }} />
          <h3 className="heading-md">Advanced Brain Games Coming Soon</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            Interactive cognitive training modules are being developed
          </p>
        </div>
      </div>
    </div>
  )
}

export default BrainGames
