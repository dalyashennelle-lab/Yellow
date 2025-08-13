import React from 'react'
import { Settings as SettingsIcon, User } from 'lucide-react'

const Settings = ({ user, setUser }) => {
  return (
    <div className="settings">
      <div className="page-header">
        <h1 className="heading-xl">Settings</h1>
        <p>Customize your NeuroMind Pro experience</p>
      </div>
      
      <div className="neural-card">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <SettingsIcon size={64} color="var(--neural-warning)" style={{ marginBottom: '20px' }} />
          <h3 className="heading-md">Settings Panel Coming Soon</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            User preferences and configuration options in development
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings
