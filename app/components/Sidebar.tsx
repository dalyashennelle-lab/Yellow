
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  activeItem: string;
}

export default function Sidebar({ activeItem }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', href: '/' },
    { id: 'games', label: 'Brain Games', icon: '🎮', href: '/games' },
    { id: 'mindfulness', label: 'Mindfulness', icon: '🧘', href: '/mindfulness' },
    { id: 'soundscapes', label: 'Soundscapes', icon: '🎵', href: '/soundscapes' },
    { id: 'eeg', label: 'EEG Monitor', icon: '🧠', href: '/eeg' },
    { id: 'nft-rewards', label: 'NFT Rewards', icon: '🏆', href: '/nft-rewards' }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🧠</span>
          {!isCollapsed && <span className="logo-text">NeuroMind</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link 
            key={item.id} 
            href={item.href}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-status">
          <div className="status-indicator active"></div>
          {!isCollapsed && <span>Neural State: Optimal</span>}
        </div>
      </div>
    </aside>
  );
}
