interface SidebarProps {
  activeItem: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'checkin', label: 'Daily Check-In', icon: '✅' },
  { id: 'games', label: 'Brain Games', icon: '🎮' },
  { id: 'mindfulness', label: 'Mindfulness', icon: '🧘' },
  { id: 'yoga', label: 'Yoga & Stretch', icon: '🧘‍♀️' },
  { id: 'eeg', label: 'EEG Analysis', icon: '📈' },
  { id: 'progress', label: 'Progress', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
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
              <a 
                href={`#${item.id}`} 
                className={`nav-link ${activeItem === item.id ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
