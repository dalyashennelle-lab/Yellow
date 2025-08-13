interface SidebarProps {
  activeItem: string;
}

import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/' },
  { id: 'checkin', label: 'Daily Check-In', icon: '✅', href: '/checkin' },
  { id: 'games', label: 'Brain Games', icon: '🎮', href: '/games' },
  { id: 'mindfulness', label: 'Mindfulness', icon: '🧘', href: '/mindfulness' },
  { id: 'soundscapes', label: 'Neural Soundscapes', icon: '🎵', href: '/soundscapes' },
  { id: 'eeg', label: 'EEG Analysis', icon: '📈', href: '/eeg' },
  { id: 'nft-rewards', label: 'NFT Rewards', icon: '🏆', href: '/nft-rewards' },
  { id: 'progress', label: 'Progress', icon: '📊', href: '/progress' },
  { id: 'settings', label: 'Settings', icon: '⚙️', href: '/settings' },
];

export default function Sidebar({ activeItem }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h1 className="brand-title">NEUROMIND PRO</h1>
        <p className="brand-subtitle">Advanced Cognitive Assessment & Enhancement Platform</p>
      </div>
      
      <nav>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link ${activeItem === item.id ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
