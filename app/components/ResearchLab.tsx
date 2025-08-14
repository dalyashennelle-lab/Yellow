
'use client';

import { useState, useEffect } from 'react';

interface ResearchData {
  id: string;
  title: string;
  progress: number;
  category: string;
  researchers: number;
  findings: string[];
  status: 'active' | 'completed' | 'pending';
}

export default function ResearchLab() {
  const [activeResearch, setActiveResearch] = useState<ResearchData[]>([]);
  const [selectedResearch, setSelectedResearch] = useState<ResearchData | null>(null);

  useEffect(() => {
    const research: ResearchData[] = [
      {
        id: 'neural-plasticity',
        title: 'Neural Plasticity Enhancement',
        progress: 87,
        category: 'Neuroplasticity',
        researchers: 12,
        findings: [
          'Gamma wave stimulation increases synaptic connectivity by 23%',
          'Combined meditation and binaural beats show 41% improvement',
          'Memory consolidation enhanced during theta-delta transitions'
        ],
        status: 'active'
      },
      {
        id: 'cognitive-load',
        title: 'Cognitive Load Optimization',
        progress: 94,
        category: 'Performance',
        researchers: 8,
        findings: [
          'Optimal task switching occurs at 7-minute intervals',
          'Visual-spatial tasks benefit from 40Hz binaural beats',
          'Stress reduction correlates with improved working memory'
        ],
        status: 'active'
      },
      {
        id: 'memory-consolidation',
        title: 'Memory Consolidation Protocols',
        progress: 100,
        category: 'Memory',
        researchers: 15,
        findings: [
          'Sleep spindle enhancement improves long-term retention by 35%',
          'Spaced repetition with theta waves shows superior results',
          'Emotional tagging increases recall accuracy by 28%'
        ],
        status: 'completed'
      },
      {
        id: 'attention-training',
        title: 'Attention Network Training',
        progress: 62,
        category: 'Focus',
        researchers: 10,
        findings: [
          'Dual n-back training strengthens working memory networks',
          'Mindfulness meditation enhances sustained attention',
          'Gamma entrainment improves selective attention by 19%'
        ],
        status: 'active'
      }
    ];
    
    setActiveResearch(research);
    setSelectedResearch(research[0]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'completed': return '#4facfe';
      case 'pending': return '#fbbf24';
      default: return '#6b7280';
    }
  };

  return (
    <div className="research-lab-container">
      <div className="lab-header">
        <h2>🔬 Advanced Research Laboratory</h2>
        <div className="lab-stats">
          <div className="lab-stat">
            <span className="stat-icon">👨‍🔬</span>
            <div>
              <div className="stat-value">45</div>
              <div className="stat-label">Researchers</div>
            </div>
          </div>
          <div className="lab-stat">
            <span className="stat-icon">📊</span>
            <div>
              <div className="stat-value">127</div>
              <div className="stat-label">Studies</div>
            </div>
          </div>
          <div className="lab-stat">
            <span className="stat-icon">🏆</span>
            <div>
              <div className="stat-value">23</div>
              <div className="stat-label">Breakthroughs</div>
            </div>
          </div>
        </div>
      </div>

      <div className="research-grid">
        <div className="research-list">
          <h3>Active Research Projects</h3>
          {activeResearch.map(research => (
            <div
              key={research.id}
              className={`research-item ${selectedResearch?.id === research.id ? 'selected' : ''}`}
              onClick={() => setSelectedResearch(research)}
            >
              <div className="research-info">
                <h4>{research.title}</h4>
                <p className="research-category">{research.category}</p>
                <div className="research-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${research.progress}%` }}
                    />
                  </div>
                  <span>{research.progress}%</span>
                </div>
              </div>
              <div 
                className="research-status"
                style={{ backgroundColor: getStatusColor(research.status) }}
              >
                {research.status}
              </div>
            </div>
          ))}
        </div>

        <div className="research-details">
          {selectedResearch && (
            <>
              <div className="detail-header">
                <h3>{selectedResearch.title}</h3>
                <div className="detail-meta">
                  <span>👥 {selectedResearch.researchers} researchers</span>
                  <span>📂 {selectedResearch.category}</span>
                </div>
              </div>

              <div className="research-findings">
                <h4>Key Findings</h4>
                <div className="findings-list">
                  {selectedResearch.findings.map((finding, index) => (
                    <div key={index} className="finding-item">
                      <span className="finding-icon">💡</span>
                      <p>{finding}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="research-metrics">
                <div className="metric-card">
                  <h5>Efficacy Rate</h5>
                  <div className="metric-value">94.7%</div>
                </div>
                <div className="metric-card">
                  <h5>Sample Size</h5>
                  <div className="metric-value">2,847</div>
                </div>
                <div className="metric-card">
                  <h5>Duration</h5>
                  <div className="metric-value">18 mo</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
