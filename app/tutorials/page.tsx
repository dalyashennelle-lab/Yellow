'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'meditation' | 'breathing' | 'yoga' | 'neuroscience' | 'research';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl?: string;
  content: string[];
  image: string;
  highlights: string[];
  completed: boolean;
  progress: number;
}

interface ResearchArticle {
  id: string;
  title: string;
  authors: string[];
  summary: string;
  highlights: string[];
  fullText: string;
  category: string;
  publishDate: string;
  image: string;
}

export default function TutorialsPage() {
  const [activeTab, setActiveTab] = useState<'tutorials' | 'research'>('tutorials');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle | null>(null);

  const tutorials: Tutorial[] = [
    {
      id: 'meditation-basics',
      title: 'Mindfulness Meditation Fundamentals',
      description: 'Learn the basics of mindfulness meditation for cognitive enhancement',
      category: 'meditation',
      duration: '15 min',
      difficulty: 'beginner',
      videoUrl: 'https://youtu.be/j734gLbQFbU?si=4CrafZZgC88lS9yY',
      content: [
        'Introduction to mindfulness meditation',
        'Setting up your meditation space',
        'Basic breathing techniques',
        'Dealing with wandering thoughts',
        'Building a daily practice'
      ],
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F3232ccfee17c42398810d697b0c1cd20?format=webp&width=800',
      highlights: ['Improves focus and attention', 'Reduces stress and anxiety', 'Enhances memory consolidation'],
      completed: false,
      progress: 0
    },
    {
      id: 'breathing-techniques',
      title: 'Advanced Breathing Techniques',
      description: 'Master breathing patterns for optimal brain oxygenation and cognitive performance',
      category: 'breathing',
      duration: '12 min',
      difficulty: 'intermediate',
      videoUrl: 'https://youtu.be/LiUnFJ8P4gM?si=zSqDGi_a5YKANS3g',
      content: [
        'Box breathing technique',
        '4-7-8 breathing pattern',
        'Wim Hof method basics',
        'Breath retention exercises',
        'Breathing for cognitive enhancement'
      ],
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fddd19324350d426b83d3a5afc376d2c6?format=webp&width=800',
      highlights: ['Increases oxygen delivery to brain', 'Improves focus and concentration', 'Activates parasympathetic nervous system'],
      completed: true,
      progress: 100
    },
    {
      id: 'yoga-cognitive',
      title: 'Yoga for Cognitive Enhancement',
      description: 'Yoga sequences specifically designed to boost brain function and memory',
      category: 'yoga',
      duration: '25 min',
      difficulty: 'beginner',
      videoUrl: 'https://youtu.be/yPK7ISPEu3M?si=nFk38Drz3Bkfjt35',
      content: [
        'Brain-boosting yoga sequences',
        'Inversions for blood flow',
        'Balancing poses for neural coordination',
        'Meditation in movement',
        'Cool-down and relaxation'
      ],
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fb5142025652245d1949b55206bc86fc2?format=webp&width=800',
      highlights: ['Improves blood flow to brain', 'Enhances neuroplasticity', 'Reduces cortisol levels'],
      completed: false,
      progress: 30
    },
    {
      id: 'neuroscience-basics',
      title: 'Understanding Your Brain',
      description: 'Essential neuroscience concepts for cognitive optimization',
      category: 'neuroscience',
      duration: '20 min',
      difficulty: 'intermediate',
      content: [
        'Brain anatomy and function',
        'Neuroplasticity principles',
        'Memory formation processes',
        'Neurotransmitter systems',
        'Brain training science'
      ],
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F3defa3926b534f8198e6f178db04d158?format=webp&width=800',
      highlights: ['Learn how memory works', 'Understand neuroplasticity', 'Optimize cognitive function'],
      completed: false,
      progress: 0
    }
  ];

  const researchArticles: ResearchArticle[] = [
    {
      id: 'memory-consolidation',
      title: 'Sleep-Dependent Memory Consolidation in the Human Brain',
      authors: ['Dr. Sarah Chen', 'Dr. Michael Rodriguez', 'Dr. Anna Kim'],
      summary: 'This study examines how different sleep stages contribute to memory consolidation and long-term retention.',
      highlights: [
        'REM sleep crucial for procedural memory',
        'Deep sleep enhances declarative memory',
        'Sleep spindles correlate with memory performance'
      ],
      fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      category: 'memory',
      publishDate: '2024-01-15',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fedb2fd9925ce4b5d93764e32005899d3?format=webp&width=800'
    },
    {
      id: 'neuroplasticity-exercise',
      title: 'Exercise-Induced Neuroplasticity and Cognitive Enhancement',
      authors: ['Dr. James Wilson', 'Dr. Lisa Park'],
      summary: 'Research on how physical exercise promotes neuroplasticity and improves cognitive function across age groups.',
      highlights: [
        'BDNF levels increase with exercise',
        'New neuron formation in hippocampus',
        'Improved executive function'
      ],
      fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      category: 'neuroplasticity',
      publishDate: '2024-01-10',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F90b1d9466ced41a8894e0391db51b3f5?format=webp&width=800'
    },
    {
      id: 'meditation-brain-changes',
      title: 'Structural Brain Changes Following Meditation Training',
      authors: ['Dr. Rachel Green', 'Dr. David Kumar', 'Dr. Elena Vasquez'],
      summary: 'Longitudinal study showing how meditation practice leads to measurable changes in brain structure.',
      highlights: [
        'Increased gray matter density',
        'Enhanced prefrontal cortex function',
        'Reduced amygdala reactivity'
      ],
      fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      category: 'meditation',
      publishDate: '2024-01-05',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Ff2d4fc557ad84793a595a29e90670906?format=webp&width=800'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: '📚' },
    { id: 'meditation', label: 'Meditation', icon: '🧘' },
    { id: 'breathing', label: 'Breathing', icon: '🫁' },
    { id: 'yoga', label: 'Yoga', icon: '🤸' },
    { id: 'neuroscience', label: 'Neuroscience', icon: '🧠' },
    { id: 'research', label: 'Research', icon: '🔬' }
  ];

  const filteredTutorials = selectedCategory === 'all' 
    ? tutorials 
    : tutorials.filter(t => t.category === selectedCategory);

  const embedVideoUrl = (url: string) => {
    if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop()?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const markTutorialComplete = (tutorialId: string) => {
    // Mark tutorial as completed
    console.log('Marking tutorial complete:', tutorialId);
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="tutorials" />
      
      <main className="main-content">
        <div className="tutorials-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">Tutorials & Learning</h1>
              <p className="hero-description">
                Guided exercises, neuroscience knowledge, and research-backed techniques for cognitive enhancement
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F1827a48527ab4722a3bd9e898967bd10?format=webp&width=800"
                alt="Learning and tutorial environment"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <div className="tutorials-nav">
          <div className="tab-selector">
            <button 
              className={`tab-btn ${activeTab === 'tutorials' ? 'active' : ''}`}
              onClick={() => setActiveTab('tutorials')}
            >
              🎓 Tutorials
            </button>
            <button 
              className={`tab-btn ${activeTab === 'research' ? 'active' : ''}`}
              onClick={() => setActiveTab('research')}
            >
              📄 Research
            </button>
          </div>

          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'tutorials' && (
          <div className="tutorials-content">
            {!selectedTutorial ? (
              <div className="tutorials-grid">
                {filteredTutorials.map(tutorial => (
                  <div 
                    key={tutorial.id} 
                    className="tutorial-card"
                    onClick={() => setSelectedTutorial(tutorial)}
                  >
                    <div className="tutorial-image">
                      <img src={tutorial.image} alt={tutorial.title} />
                      <div className="tutorial-overlay">
                        <div className="tutorial-duration">{tutorial.duration}</div>
                        <div className={`tutorial-difficulty ${tutorial.difficulty}`}>
                          {tutorial.difficulty}
                        </div>
                      </div>
                    </div>
                    
                    <div className="tutorial-content">
                      <h3 className="tutorial-title">{tutorial.title}</h3>
                      <p className="tutorial-description">{tutorial.description}</p>
                      
                      <div className="tutorial-highlights">
                        {tutorial.highlights.map((highlight, index) => (
                          <span key={index} className="highlight-tag">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      
                      <div className="tutorial-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${tutorial.progress}%` }}
                          />
                        </div>
                        <span className="progress-text">
                          {tutorial.completed ? 'Completed' : `${tutorial.progress}% Complete`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="tutorial-viewer">
                <div className="viewer-header">
                  <button 
                    className="back-btn"
                    onClick={() => setSelectedTutorial(null)}
                  >
                    ← Back to Tutorials
                  </button>
                  <h2>{selectedTutorial.title}</h2>
                </div>

                <div className="tutorial-layout">
                  <div className="tutorial-main">
                    {selectedTutorial.videoUrl && (
                      <div className="video-container">
                        <iframe
                          src={embedVideoUrl(selectedTutorial.videoUrl)}
                          title={selectedTutorial.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: '100%', height: '400px', borderRadius: '12px' }}
                        />
                      </div>
                    )}

                    <div className="tutorial-info">
                      <div className="info-header">
                        <div className="tutorial-meta">
                          <span className="duration">⏱️ {selectedTutorial.duration}</span>
                          <span className={`difficulty ${selectedTutorial.difficulty}`}>
                            🎯 {selectedTutorial.difficulty}
                          </span>
                          <span className="category">
                            📚 {selectedTutorial.category}
                          </span>
                        </div>
                        <button 
                          className="complete-btn"
                          onClick={() => markTutorialComplete(selectedTutorial.id)}
                        >
                          {selectedTutorial.completed ? '✅ Completed' : '📝 Mark Complete'}
                        </button>
                      </div>

                      <p className="tutorial-description">{selectedTutorial.description}</p>

                      <div className="tutorial-sections">
                        <h4>What You'll Learn:</h4>
                        <ul className="content-list">
                          {selectedTutorial.content.map((item, index) => (
                            <li key={index} className="content-item">
                              <span className="item-number">{index + 1}</span>
                              <span className="item-text">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="tutorial-benefits">
                        <h4>Benefits:</h4>
                        <div className="benefits-list">
                          {selectedTutorial.highlights.map((benefit, index) => (
                            <div key={index} className="benefit-item">
                              <span className="benefit-icon">✨</span>
                              <span className="benefit-text">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tutorial-sidebar">
                    <div className="related-tutorials">
                      <h4>Related Tutorials</h4>
                      {tutorials
                        .filter(t => t.id !== selectedTutorial.id && t.category === selectedTutorial.category)
                        .slice(0, 3)
                        .map(tutorial => (
                          <div 
                            key={tutorial.id}
                            className="related-item"
                            onClick={() => setSelectedTutorial(tutorial)}
                          >
                            <img src={tutorial.image} alt={tutorial.title} />
                            <div className="related-info">
                              <h5>{tutorial.title}</h5>
                              <span className="related-duration">{tutorial.duration}</span>
                            </div>
                          </div>
                        ))
                      }
                    </div>

                    <div className="practice-notes">
                      <h4>Practice Notes</h4>
                      <textarea 
                        className="notes-input"
                        placeholder="Add your practice notes here..."
                        rows={6}
                      />
                      <button className="save-notes-btn">💾 Save Notes</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'research' && (
          <div className="research-content">
            {!selectedArticle ? (
              <div className="research-grid">
                {researchArticles.map(article => (
                  <div 
                    key={article.id}
                    className="research-card"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="research-image">
                      <img src={article.image} alt={article.title} />
                    </div>
                    
                    <div className="research-content">
                      <div className="research-meta">
                        <span className="research-category">{article.category}</span>
                        <span className="research-date">{article.publishDate}</span>
                      </div>
                      
                      <h3 className="research-title">{article.title}</h3>
                      
                      <div className="research-authors">
                        <span>By: {article.authors.join(', ')}</span>
                      </div>
                      
                      <p className="research-summary">{article.summary}</p>
                      
                      <div className="research-highlights">
                        <h5>Key Findings:</h5>
                        <ul>
                          {article.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="research-viewer">
                <div className="viewer-header">
                  <button 
                    className="back-btn"
                    onClick={() => setSelectedArticle(null)}
                  >
                    ← Back to Research
                  </button>
                  <div className="article-meta">
                    <span className="article-category">{selectedArticle.category}</span>
                    <span className="article-date">{selectedArticle.publishDate}</span>
                  </div>
                </div>

                <div className="article-content">
                  <h1 className="article-title">{selectedArticle.title}</h1>
                  
                  <div className="article-authors">
                    <strong>Authors:</strong> {selectedArticle.authors.join(', ')}
                  </div>

                  <div className="article-image">
                    <img src={selectedArticle.image} alt={selectedArticle.title} />
                  </div>

                  <div className="article-abstract">
                    <h3>Abstract</h3>
                    <p>{selectedArticle.summary}</p>
                  </div>

                  <div className="article-highlights">
                    <h3>Key Findings</h3>
                    <div className="highlights-list">
                      {selectedArticle.highlights.map((highlight, index) => (
                        <div key={index} className="highlight-item">
                          <span className="highlight-marker">🔬</span>
                          <span className="highlight-text">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="article-text">
                    <h3>Full Article</h3>
                    <div className="scrollable-text">
                      <p>{selectedArticle.fullText}</p>
                      <p>Detailed research content would be displayed here with interactive highlights and annotations...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="learning-progress">
          <h3>Your Learning Progress</h3>
          <div className="progress-stats">
            <div className="stat-item">
              <span className="stat-number">
                {tutorials.filter(t => t.completed).length}
              </span>
              <span className="stat-label">Completed Tutorials</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {Math.round(tutorials.reduce((sum, t) => sum + t.progress, 0) / tutorials.length)}%
              </span>
              <span className="stat-label">Overall Progress</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{researchArticles.length}</span>
              <span className="stat-label">Research Articles</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
