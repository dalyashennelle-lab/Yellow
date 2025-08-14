
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({ activeItem }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', href: '/' },
    { id: 'games', label: 'Brain Games', icon: '🎮', href: '/games' },
    { id: 'mindfulness', label: 'Mindfulness', icon: '🧘', href: '/mindfulness' },
    { id: 'soundscapes', label: 'Soundscapes', icon: '🎵', href: '/soundscapes' },
    { id: 'eeg', label: 'EEG Monitor', icon: '🧠', href: '/eeg' },
    { id: 'nft-rewards', label: 'NFT Rewards', icon: '🏆', href: '/nft-rewards' },
  ];

  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
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

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link 
              href={item.href}
              className={`sidebar-link ${activeItem === item.id ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          {!isCollapsed && (
            <div className="user-details">
              <div className="user-name">Neural Explorer</div>
              <div className="user-level">Level 7</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
