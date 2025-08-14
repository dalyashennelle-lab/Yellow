
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SidebarProps {
  activeItem: string;
}

export default function Sidebar({ activeItem }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const navigationItems = [
    {
      id: 'dashboard',
      icon: '🧠',
      label: 'Neural Dashboard',
      href: '/',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Cognitive Command Center'
    },
    {
      id: 'mindfulness',
      icon: '🧘‍♀️',
      label: 'Neural Meditation',
      href: '/mindfulness',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      description: 'Mindful Enhancement'
    },
    {
      id: 'games',
      icon: '🎮',
      label: 'Brain Training',
      href: '/games',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      description: 'Cognitive Games Suite'
    },
    {
      id: 'soundscapes',
      icon: '🎵',
      label: 'Quantum Beats',
      href: '/soundscapes',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      description: 'Binaural Soundscapes'
    },
    {
      id: 'eeg',
      icon: '⚡',
      label: 'EEG Analysis',
      href: '/eeg',
      gradient: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
      description: 'Brainwave Monitoring'
    },
    {
      id: 'nft-rewards',
      icon: '💎',
      label: 'Neural NFTs',
      href: '/nft-rewards',
      gradient: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
      description: 'Achievement Rewards'
    }
  ];

  return (
    <div className={`advanced-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-container">
          <div className="brand-icon">🧠</div>
          {!isCollapsed && (
            <div className="brand-info">
              <h1 className="brand-title">NeuroMind Pro</h1>
              <p className="brand-subtitle">Advanced Neural Interface</p>
            </div>
          )}
        </div>
        <button 
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
      </div>

      <div className="neural-status">
        <div className="status-indicator">
          <div className="pulse-dot"></div>
          {!isCollapsed && <span>Neural Link Active</span>}
        </div>
      </div>

      <nav className="navigation-menu">
        {navigationItems.map((item) => (
          <Link key={item.id} href={item.href} className="nav-item-wrapper">
            <div 
              className={`advanced-nav-item ${activeItem === item.id ? 'active' : ''}`}
              style={{ '--item-gradient': item.gradient } as React.CSSProperties}
            >
              <div className="nav-item-background"></div>
              <div className="nav-item-content">
                <div className="nav-icon">{item.icon}</div>
                {!isCollapsed && (
                  <div className="nav-text">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </div>
                )}
              </div>
              <div className="nav-item-glow"></div>
            </div>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="neural-metrics">
          {!isCollapsed && (
            <>
              <div className="metric-mini">
                <span className="metric-icon">⚡</span>
                <span className="metric-text">98.2% Efficiency</span>
              </div>
              <div className="metric-mini">
                <span className="metric-icon">🎯</span>
                <span className="metric-text">Level 24 Neural</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
