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
        <div className="mindfulness-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">Mindfulness & Meditation</h1>
              <p className="hero-description">
                Enhance your cognitive wellness through guided meditation, breathing exercises, and yoga in serene environments
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fc410b98d5fd848a7b3af1bac349c6fc2?format=webp&width=800"
                alt="Peaceful beach meditation at sunset"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <div className="mindfulness-gallery">
          <div className="gallery-grid">
            <div className="gallery-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fff40f1951e0b41d5b70b0ad8707328f0?format=webp&width=800"
                alt="Beach meditation exercises"
                className="gallery-img"
              />
              <h3 className="gallery-title">Beach Meditation</h3>
            </div>
            <div className="gallery-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fcbc2f728411b462e8db4e0172e517080?format=webp&width=800"
                alt="Yoga practice outdoors"
                className="gallery-img"
              />
              <h3 className="gallery-title">Yoga Practice</h3>
            </div>
            <div className="gallery-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F646a1879e22a42a9a1a92a236397b947?format=webp&width=800"
                alt="Breathing exercises by the ocean"
                className="gallery-img"
              />
              <h3 className="gallery-title">Breathing Exercises</h3>
            </div>
          </div>
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
