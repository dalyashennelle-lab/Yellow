'use client';

import Sidebar from '../components/Sidebar';
import EnhancedVideoPlayer from '../components/EnhancedVideoPlayer';
import EnhancedMeditation from '../components/EnhancedMeditation';
import NeuralParticles from '../components/NeuralParticles';

export default function MindfulnessPage() {
  const mindfulnessContent = [
    {
      videoUrl: 'https://cdn.builder.io/o/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F569935b2f0164533a0c9b05394b074c3?alt=media&token=528847f4-96cf-45a9-99ff-25e80cd834f8&apiKey=07e9cfb94d0443d29c8064da41e57c5b',
      title: '🧘‍♀️ Deep Mindfulness Journey',
      description: 'Immersive meditation experience designed to promote deep relaxation and mental clarity.',
      icon: '🧘‍♀️',
      category: 'Guided Meditation'
    },
    {
      videoUrl: 'https://cdn.builder.io/o/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fdbdfbe8d678246a3a4d139429965c6a0?alt=media&token=edca3d09-3353-4f69-8e94-0b0ca9989b2a&apiKey=07e9cfb94d0443d29c8064da41e57c5b',
      title: '🌬️ Advanced Breathing Techniques',
      description: 'Comprehensive breathing exercises for enhanced focus, stress reduction and energy balance.',
      icon: '🌬️',
      category: 'Breathwork'
    },
    {
      videoUrl: 'https://cdn.builder.io/o/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F799d10508dc04e3691cc83f0e9a0248c?alt=media&token=b9751b51-1bf9-4174-b775-2311d5f5ced8&apiKey=07e9cfb94d0443d29c8064da41e57c5b',
      title: '🧘‍♂️ Transformative Yoga Flow',
      description: 'Complete yoga session combining movement, breath and mindfulness for total wellness.',
      icon: '🧘‍♂️',
      category: 'Yoga Practice'
    },
    {
      videoUrl: 'https://cdn.builder.io/o/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fa39466546b6a4372abdab3519f1e5765?alt=media&token=e7f655a0-f300-43da-86cb-a367a2323525&apiKey=07e9cfb94d0443d29c8064da41e57c5b',
      title: '🌟 Neural Synchronization',
      description: 'Advanced meditation technique for optimal brain wave synchronization and cognitive enhancement.',
      icon: '🌟',
      category: 'Neural Training'
    },
    {
      videoUrl: 'https://cdn.builder.io/o/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fd2bb6cd60cd74375990fc486e2a2f3a9?alt=media&token=8b62f61f-645d-4949-a097-29da8f2ac44c&apiKey=07e9cfb94d0443d29c8064da41e57c5b',
      title: '💫 Cosmic Consciousness Meditation',
      description: 'Transcendent meditation journey for expanding awareness and spiritual connection.',
      icon: '💫',
      category: 'Advanced Practice'
    },
    {
      videoUrl: 'https://cdn.builder.io/o/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fc984de17eda8495da06240ee5965ef5e?alt=media&token=2c9ed9d5-bf01-4294-a0f7-e0a8b2e0af86&apiKey=07e9cfb94d0443d29c8064da41e57c5b',
      title: '🔮 Energy Healing Session',
      description: 'Holistic energy healing practice combining visualization, sound therapy and chakra alignment.',
      icon: '🔮',
      category: 'Energy Work'
    }
  ];

  return (
    <div className="main-container" data-tab="mindfulness">
      <NeuralParticles />
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
            <EnhancedVideoPlayer
              key={index}
              videoUrl={content.videoUrl}
              title={content.title}
              description={content.description}
              icon={content.icon}
              category={content.category}
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
