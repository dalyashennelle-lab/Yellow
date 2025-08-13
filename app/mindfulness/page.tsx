'use client';

import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';
import EnhancedMeditation from '../components/EnhancedMeditation';
import NeuralParticles from '../components/NeuralParticles';

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
    <div className="main-container" data-tab="mindfulness">
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
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F45c5212b12344cbfa68860e97a9be6da?format=webp&width=800"
                alt="Serene beach meditation at golden sunset"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <EnhancedMeditation
          onSessionChange={(isActive) => console.log('🧘 Meditation session:', isActive ? 'Started' : 'Ended')}
        />

        <div className="mindfulness-gallery">
          <div className="gallery-grid">
            <div className="gallery-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F5c2e1743615f4df1951e18014a943f3a?format=webp&width=800"
                alt="Tranquil sea environment for meditation"
                className="gallery-img"
              />
              <h3 className="gallery-title">Sea Meditation</h3>
            </div>
            <div className="gallery-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fb8c278c23cfa4139b8dd575f5bb927c6?format=webp&width=800"
                alt="Yoga practice in serene setting"
                className="gallery-img"
              />
              <h3 className="gallery-title">Yoga Practice</h3>
            </div>
            <div className="gallery-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F98fefdd1866d45af96205a72498b2e10?format=webp&width=800"
                alt="Breathing exercises in nature"
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

        <div className="memory-enhancement">
          <h2 className="section-title">Memory Enhancement Activities</h2>
          <div className="section-divider"></div>

          <div className="memory-gallery">
            <div className="memory-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Ffa6c5edad14c46f195c319c2297d64c4?format=webp&width=800"
                alt="Advanced memory enhancing activities with neuroscience backing"
                className="memory-img"
              />
              <div className="memory-content">
                <h3>Cognitive Training</h3>
                <p>Evidence-based exercises designed to strengthen working memory and attention span</p>
                <button className="memory-button">Start Training</button>
              </div>
            </div>

            <div className="memory-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F0f8b8b8234bd441ba2a14032034e85df?format=webp&width=800"
                alt="Neuroscience-based memory enhancement techniques"
                className="memory-img"
              />
              <div className="memory-content">
                <h3>Memory Palace</h3>
                <p>Learn the ancient method of loci technique for superior information retention</p>
                <button className="memory-button">Build Palace</button>
              </div>
            </div>
          </div>
        </div>

        <div className="neuroscience-research">
          <h2 className="section-title">Neuroscience Research</h2>
          <div className="section-divider"></div>

          <div className="research-content">
            <div className="research-visual">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fdd097e3c760c48ab8232e145c15cd5c3?format=webp&width=800"
                alt="Advanced neuroscience research on mindfulness and meditation"
                className="research-img"
              />
            </div>
            <div className="research-info">
              <h3>Cutting-Edge Research</h3>
              <p>Our mindfulness programs are backed by the latest neuroscience research, showing measurable improvements in brain structure and function through neuroplasticity.</p>
              <div className="research-stats">
                <div className="research-stat">
                  <span className="stat-number">23%</span>
                  <span className="stat-label">Increased Gray Matter</span>
                </div>
                <div className="research-stat">
                  <span className="stat-number">40%</span>
                  <span className="stat-label">Stress Reduction</span>
                </div>
                <div className="research-stat">
                  <span className="stat-number">67%</span>
                  <span className="stat-label">Focus Improvement</span>
                </div>
              </div>
              <button className="research-button">View Studies</button>
            </div>
          </div>
        </div>

        <div className="mindfulness-groups">
          <h2 className="section-title">Group Mindfulness Sessions</h2>
          <div className="section-divider"></div>

          <div className="groups-gallery">
            <div className="group-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fd243332b2d844f23aa89acfe673fd9af?format=webp&width=800"
                alt="Boys and girls practicing mindfulness activities together"
                className="group-img"
              />
              <div className="group-content">
                <h3>Youth Mindfulness</h3>
                <p>Specialized programs for children and teenagers to develop emotional regulation and focus</p>
                <button className="group-button">Join Session</button>
              </div>
            </div>

            <div className="group-item">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fb333081fc46e45cbbd0efca0d028b832?format=webp&width=800"
                alt="Group yoga and mindfulness practice"
                className="group-img"
              />
              <div className="group-content">
                <h3>Community Practice</h3>
                <p>Connect with others in supportive group meditation and mindfulness sessions</p>
                <button className="group-button">Find Groups</button>
              </div>
            </div>
          </div>
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
