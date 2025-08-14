import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';

export default function MindfulnessPage() {
  const mindfulnessContent = [
    {
      videoId: 'j734gLbQFbU',
      title: '🧘‍♀️ Guided Meditation Session',
      description: 'Meditation designed to promote relaxation and mental clarity.',
      icon: '🧘‍♀️'
    },
    {
      videoId: 'LiUnFJ8P4gM', 
      title: '🌬️ Breathing Exercises for Focus',
      description: 'A series of breathing exercises aimed at enhancing focus and reducing stress.',
      icon: '🌬️'
    },
    {
      videoId: 'yPK7ISPEu3M',
      title: '🧘‍♂️ Full-Body Yoga Routine', 
      description: 'A comprehensive yoga session targeting flexibility and strength.',
      icon: '🧘‍♂️'
    }
  ];

  return (
    <div className="main-container">
      <Sidebar activeItem="mindfulness" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Mindfulness & Meditation</h1>
          <p className="dashboard-subtitle">Enhance your cognitive wellness through guided meditation, breathing exercises, and yoga</p>
          <div className="section-divider"></div>ssName="section-divider"></div>
        </div>

        <div className="mindfulness-grid">
          {mindfulnessContent.map((content, index) => (
            <VideoPlayer
              key={index}
              videoId={content.videoId}
              title={content.title}
              description={content.description}
              icon={content.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}n}
            />
          ))}
        </div>

        <div className="section-card">
          <h2 className="section-title">Neural Benefits</h2>
          <div className="section-divider"></div>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🧠</div>
              <h3 className="benefit-title">Enhanced Neuroplasticity</h3>
              <p className="benefit-description">Meditation increases gray matter density and promotes neural connectivity</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <h3 className="benefit-title">Gamma Wave Activity</h3>
              <p className="benefit-description">Breathing exercises increase gamma oscillations linked to higher cognition</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <h3 className="benefit-title">Attention Networks</h3>
              <p className="benefit-description">Yoga strengthens the anterior cingulate cortex and improves focus</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">🌊</div>
              <h3 className="benefit-title">Stress Reduction</h3>
              <p className="benefit-description">Reduces cortisol levels and activates the parasympathetic nervous system</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
