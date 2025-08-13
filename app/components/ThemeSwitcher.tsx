'use client';

import { useState, useEffect } from 'react';

interface Theme {
  name: string;
  label: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
  };
}

const themes: Theme[] = [
  {
    name: 'light',
    label: '🌅 Light Mode',
    colors: {
      primary: '#4facfe',
      secondary: '#00f2fe',
      background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)',
      surface: 'rgba(255, 255, 255, 0.95)',
      text: '#2d3748',
      accent: '#4facfe'
    }
  },
  {
    name: 'dark',
    label: '🌙 Dark Mode',
    colors: {
      primary: '#4facfe',
      secondary: '#00f2fe',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
      surface: 'rgba(20, 25, 35, 0.95)',
      text: '#ffffff',
      accent: '#4facfe'
    }
  },
  {
    name: 'calm',
    label: '🧘 Calm Mode',
    colors: {
      primary: '#48bb78',
      secondary: '#38a169',
      background: 'linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)',
      surface: 'rgba(240, 253, 250, 0.95)',
      text: '#234e52',
      accent: '#48bb78'
    }
  },
  {
    name: 'forest',
    label: '🌲 Forest Mode',
    colors: {
      primary: '#38a169',
      secondary: '#2f855a',
      background: 'linear-gradient(135deg, #22543d 0%, #1a202c 100%)',
      surface: 'rgba(34, 84, 61, 0.95)',
      text: '#f7fafc',
      accent: '#68d391'
    }
  }
];

interface ThemeSwitcherProps {
  onThemeChange?: (theme: Theme) => void;
}

export default function ThemeSwitcher({ onThemeChange }: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isOpen, setIsOpen] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('neuromind-theme');
    if (savedTheme) {
      const theme = themes.find(t => t.name === savedTheme) || themes[0];
      setCurrentTheme(theme);
      applyTheme(theme);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--primary-color', theme.colors.primary);
    root.style.setProperty('--secondary-color', theme.colors.secondary);
    root.style.setProperty('--background-gradient', theme.colors.background);
    root.style.setProperty('--surface-color', theme.colors.surface);
    root.style.setProperty('--text-color', theme.colors.text);
    root.style.setProperty('--accent-color', theme.colors.accent);
    
    // Apply to body
    document.body.style.background = theme.colors.background;
    document.body.style.color = theme.colors.text;
    
    // Save to localStorage
    localStorage.setItem('neuromind-theme', theme.name);
    
    // Notify parent component
    onThemeChange?.(theme);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher">
      <button 
        className="theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch theme"
      >
        <span className="theme-icon">{currentTheme.label.split(' ')[0]}</span>
        <span className="theme-label">{currentTheme.label.split(' ')[1]}</span>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-options">
            {themes.map((theme) => (
              <button
                key={theme.name}
                className={`theme-option ${currentTheme.name === theme.name ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme)}
              >
                <div className="theme-preview">
                  <div 
                    className="theme-preview-bg"
                    style={{ background: theme.colors.background }}
                  />
                  <div 
                    className="theme-preview-surface"
                    style={{ background: theme.colors.surface }}
                  />
                  <div 
                    className="theme-preview-accent"
                    style={{ background: theme.colors.primary }}
                  />
                </div>
                <div className="theme-info">
                  <span className="theme-name">{theme.label}</span>
                  <span className="theme-description">
                    {theme.name === 'light' && 'Bright and clean interface'}
                    {theme.name === 'dark' && 'Easy on the eyes'}
                    {theme.name === 'calm' && 'Peaceful and relaxing'}
                    {theme.name === 'forest' && 'Natural and grounding'}
                  </span>
                </div>
                {currentTheme.name === theme.name && (
                  <span className="theme-checkmark">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="theme-footer">
            <p>Theme changes are automatically saved</p>
          </div>
        </div>
      )}
    </div>
  );
}
