
'use client';

import { useState, useEffect } from 'react';

interface Winner {
  id: string;
  name: string;
  achievement: string;
  score: number;
  category: string;
  date: string;
  avatar: string;
}

export default function WinnersCelebration() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const winnersData: Winner[] = [
      {
        id: '1',
        name: 'Emma Chen',
        achievement: 'Memory Master',
        score: 2847,
        category: 'memory',
        date: '2024-01-15',
        avatar: '👧'
      },
      {
        id: '2',
        name: 'Alex Rodriguez',
        achievement: 'Focus Champion',
        score: 3156,
        category: 'focus',
        date: '2024-01-14',
        avatar: '👦'
      },
      {
        id: '3',
        name: 'Sophia Kim',
        achievement: 'Neural Network Explorer',
        score: 2934,
        category: 'exploration',
        date: '2024-01-13',
        avatar: '👧'
      },
      {
        id: '4',
        name: 'Marcus Johnson',
        achievement: 'Mindfulness Guru',
        score: 3289,
        category: 'mindfulness',
        date: '2024-01-12',
        avatar: '👦'
      },
      {
        id: '5',
        name: 'Luna Zhang',
        achievement: 'Cognitive Scientist',
        score: 3567,
        category: 'science',
        date: '2024-01-11',
        avatar: '👧'
      },
      {
        id: '6',
        name: 'Diego Santos',
        achievement: 'Brain Training Elite',
        score: 2678,
        category: 'training',
        date: '2024-01-10',
        avatar: '👦'
      }
    ];
    
    setWinners(winnersData);
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🏆' },
    { id: 'memory', name: 'Memory', icon: '🧠' },
    { id: 'focus', name: 'Focus', icon: '🎯' },
    { id: 'mindfulness', name: 'Mindfulness', icon: '🧘' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'training', name: 'Training', icon: '💪' },
    { id: 'exploration', name: 'Exploration', icon: '🚀' }
  ];

  const filteredWinners = activeCategory === 'all' 
    ? winners 
    : winners.filter(winner => winner.category === activeCategory);

  return (
    <div className="winners-celebration-container">
      <div className="celebration-header">
        <h2>🏆 Winners & Champions</h2>
        <div className="celebration-stats">
          <div className="stat-item">
            <span className="stat-icon">👑</span>
            <div>
              <div className="stat-value">{winners.length}</div>
              <div className="stat-label">Champions</div>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🌟</span>
            <div>
              <div className="stat-value">{winners.reduce((sum, w) => sum + w.score, 0).toLocaleString()}</div>
              <div className="stat-label">Total Points</div>
            </div>
          </div>
        </div>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="winners-grid">
        {filteredWinners.map((winner, index) => (
          <div key={winner.id} className={`winner-card ${index < 3 ? 'top-winner' : ''}`}>
            <div className="winner-rank">
              {index === 0 && '🥇'}
              {index === 1 && '🥈'}
              {index === 2 && '🥉'}
              {index > 2 && `#${index + 1}`}
            </div>
            <div className="winner-avatar">{winner.avatar}</div>
            <div className="winner-info">
              <h3 className="winner-name">{winner.name}</h3>
              <p className="winner-achievement">{winner.achievement}</p>
              <div className="winner-score">{winner.score.toLocaleString()} points</div>
              <div className="winner-date">{new Date(winner.date).toLocaleDateString()}</div>
            </div>
            <div className="winner-celebration">
              <div className="celebration-particles">
                ✨🎉⭐🌟💫
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="achievement-gallery">
        <h3>Recent Achievements</h3>
        <div className="achievements-scroll">
          {winners.slice(0, 3).map(winner => (
            <div key={`achievement-${winner.id}`} className="achievement-item">
              <div className="achievement-icon">🏆</div>
              <div className="achievement-text">
                <strong>{winner.name}</strong> earned <em>{winner.achievement}</em>
              </div>
              <div className="achievement-sparkle">✨</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
