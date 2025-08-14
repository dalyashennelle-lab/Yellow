
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  activeItem: string;
}

export default function Sidebar({ activeItem }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      id: 'dashboard',
      icon: '🧠',
      label: 'Neural Dashboard',
      subtitle: 'Command Center',
      href: '/',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'mindfulness',
      icon: '🧘‍♀️',
      label: 'Neural Meditation',
      subtitle: 'Mindful Enhancement',
      href: '/mindfulness',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      id: 'games',
      icon: '🎮',
      label: 'Brain Training',
      subtitle: 'Cognitive Games',
      href: '/games',
      gradient: 'from-green-500 to-emerald-400'
    },
    {
      id: 'soundscapes',
      icon: '🎵',
      label: 'Quantum Beats',
      subtitle: 'Binaural Soundscapes',
      href: '/soundscapes',
      gradient: 'from-orange-500 to-red-400'
    },
    {
      id: 'eeg',
      icon: '⚡',
      label: 'EEG Analysis',
      subtitle: 'Brainwave Monitoring',
      href: '/eeg',
      gradient: 'from-yellow-500 to-orange-400'
    },
    {
      id: 'nft-rewards',
      icon: '💎',
      label: 'Neural NFTs',
      subtitle: 'Achievement Rewards',
      href: '/nft-rewards',
      gradient: 'from-indigo-500 to-purple-400'
    }
  ];

  return (
    <div className={`modern-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-section">
          <div className="brand-icon-container">
            <div className="brand-icon">🧠</div>
            <div className="brand-pulse"></div>
          </div>
          {!isCollapsed && (
            <div className="brand-text">
              <h1 className="brand-title">NeuroMind Pro</h1>
              <p className="brand-subtitle">Advanced Neural Interface</p>
            </div>
          )}
        </div>
        
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className={`collapse-icon ${isCollapsed ? 'collapsed' : ''}`}>
            ◀
          </span>
        </button>
      </div>

      <div className="neural-status-bar">
        <div className="status-dot"></div>
        {!isCollapsed && <span className="status-text">Neural Link Active</span>}
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationItems.map((item) => (
            <li key={item.id} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link ${activeItem === item.id ? 'active' : ''}`}
              >
                <div className="nav-icon-container">
                  <span className="nav-icon">{item.icon}</span>
                  <div className={`nav-gradient bg-gradient-to-r ${item.gradient}`}></div>
                </div>
                
                {!isCollapsed && (
                  <div className="nav-content">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-subtitle">{item.subtitle}</span>
                  </div>
                )}
                
                {activeItem === item.id && <div className="active-indicator"></div>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="neural-stats">
            <div className="stat-item">
              <span className="stat-icon">⚡</span>
              <span className="stat-text">98.2% Efficiency</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <span className="stat-text">Level 24 Neural</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
