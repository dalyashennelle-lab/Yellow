import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Brain, 
  BarChart3, 
  GameController2, 
  Heart, 
  Waves, 
  TrendingUp, 
  Settings, 
  User,
  Menu,
  X,
  Zap
} from 'lucide-react'

const Navigation = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard', active: location.pathname === '/' },
    { path: '/checkin', icon: Heart, label: 'Daily Check-In', active: location.pathname === '/checkin' },
    { path: '/games', icon: GameController2, label: 'Brain Games', active: location.pathname === '/games' },
    { path: '/mindfulness', icon: Brain, label: 'Mindfulness', active: location.pathname === '/mindfulness' },
    { path: '/eeg', icon: Waves, label: 'EEG Analysis', active: location.pathname === '/eeg' },
    { path: '/progress', icon: TrendingUp, label: 'Progress', active: location.pathname === '/progress' },
    { path: '/settings', icon: Settings, label: 'Settings', active: location.pathname === '/settings' }
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-menu-btn"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Sidebar */}
      <nav className={`navigation ${isOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <div className="logo">
            <Zap className="logo-icon" />
            <span className="logo-text">NeuroMind Pro</span>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-details">
              <p className="user-name">{user.name}</p>
              <p className="user-streak">🔥 {user.streak} day streak</p>
            </div>
          </div>
        </div>

        <div className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${item.active ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {item.active && <div className="active-indicator" />}
              </Link>
            )
          })}
        </div>

        <div className="nav-footer">
          <div className="neural-status">
            <div className="status-indicator animate-pulse-glow" />
            <span>Neural Network Active</span>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}

      <style jsx>{`
        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1001;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 12px;
          color: var(--text-primary);
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--border-glow);
        }

        .navigation {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 280px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-primary);
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          transition: transform 0.3s ease;
          backdrop-filter: blur(20px);
        }

        .nav-header {
          padding: 0 24px 24px;
          border-bottom: 1px solid var(--border-primary);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          color: var(--neural-primary);
          filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
        }

        .logo-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: var(--gradient-neural);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .user-streak {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .nav-menu {
          flex: 1;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          position: relative;
          border-radius: 0;
        }

        .nav-item:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          color: var(--neural-primary);
          background: rgba(0, 212, 255, 0.1);
        }

        .nav-item.active .nav-icon {
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));
        }

        .active-indicator {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: var(--gradient-neural);
          border-radius: 2px;
        }

        .nav-footer {
          padding: 0 24px;
          border-top: 1px solid var(--border-primary);
          padding-top: 24px;
        }

        .neural-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          background: var(--neural-success);
          border-radius: 50%;
        }

        .nav-overlay {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .navigation {
            transform: translateX(-100%);
          }

          .navigation.open {
            transform: translateX(0);
          }

          .nav-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
        }
      `}</style>
    </>
  )
}

export default Navigation
