import React, { useState, useEffect } from 'react'
import {
  PlayCircle,
  ChevronRight,
  Users,
  Award,
  TrendingUp,
  Stethoscope,
  Monitor,
  Brain,
  Tablet,
  Smartphone,
  Laptop,
  Heart,
  Activity,
  Zap,
  MessageCircle
} from 'lucide-react'

const ClinicalLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentImageSet, setCurrentImageSet] = useState(0)
  
  const heroImages = [
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa15f3559262c4c23a96a8b8edac690bd?format=webp&width=800",
      title: "Advanced Neuroscience Research",
      subtitle: "Girl conducting brain research in advanced laboratory"
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F7e4c6421330e4951ac66f311c1531449?format=webp&width=800",
      title: "Cutting-edge Neuroscience",
      subtitle: "Advanced research for cognitive health breakthroughs"
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fedb3613c06c24b669bb87fd5e0075da3?format=webp&width=800",
      title: "Futuristic Brain Research",
      subtitle: "Next-generation cognitive assessment technology"
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Ffe7d56c2cebb4f01ba34c6178e0d1d05?format=webp&width=800",
      title: "Clinical Excellence",
      subtitle: "Professional brain research in advanced lab environment"
    }
  ]

  const themeImageSets = [
    {
      title: "Mindfulness & Wellness",
      images: [
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F2fbaa246ccb347fe89d3b5fa64b0fb61?format=webp&width=800",
          title: "Group Mindfulness Practice",
          description: "Children practicing mindfulness and yoga together"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F3cc92a57fb04440889368d56e92898d4?format=webp&width=800",
          title: "Diverse Meditation",
          description: "Inclusive mindfulness activities for all ages"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fc8b91b075c8d4735bbba9a2653647a5d?format=webp&width=800",
          title: "Focused Meditation",
          description: "Children in peaceful meditation practice"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F43f847a708284599b3aea23c4edebdfb?format=webp&width=800",
          title: "Yoga & Balance",
          description: "Individual yoga practice for mind-body wellness"
        }
      ]
    },
    {
      title: "Calming Environments",
      images: [
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F10490e924aa147a097d7749f2608d1eb?format=webp&width=800",
          title: "Garden Serenity",
          description: "Peaceful garden pathway for stress relief"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F393c10b906d043d384b19d0616a9b24b?format=webp&width=800",
          title: "Colorful Garden Walk",
          description: "Vibrant garden environment for relaxation"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa64b4be64d5743b4821735e5a99d3a87?format=webp&width=800",
          title: "Ocean Tranquility",
          description: "Calming sea environment at sunset"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F01d05736468d4ef6a79fbc3f56df02f9?format=webp&width=800",
          title: "Beach Meditation",
          description: "Serene beach setting for mindfulness practice"
        }
      ]
    },
    {
      title: "Physical Activity & Nutrition",
      images: [
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fcac333fde156491d9ffe335413fbeb03?format=webp&width=800",
          title: "Active Lifestyle",
          description: "Physical activity and nutrition recommendations"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa9db42c657864b9aafbde401ab814b77?format=webp&width=800",
          title: "Brain-Healthy Nutrition",
          description: "Omega-3 rich foods for cognitive enhancement"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F3993f7cc7a4548898b3da81de6fe1bcd?format=webp&width=800",
          title: "Exercise & Brain Health",
          description: "Daily physical activity for optimal brain function"
        }
      ]
    },
    {
      title: "Sleep & Memory",
      images: [
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F5f5bb2def30a45228ab08dcf1385b587?format=webp&width=800",
          title: "Sleep & Brain Health",
          description: "How sleep affects brain function and cognition"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fc3548fb7e5fc4582b889bd7433d332b5?format=webp&width=800",
          title: "Neural Sleep Patterns",
          description: "Understanding brain activity during sleep"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F5416e2a29be046a28d2c1bcbf51f9503?format=webp&width=800",
          title: "Memory Consolidation",
          description: "How sleep affects memory formation and retention"
        }
      ]
    },
    {
      title: "Cognitive Training",
      images: [
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fd3b03ef89de9467b9610092b5db3e912?format=webp&width=800",
          title: "Memory Enhancement",
          description: "Interactive activities for memory improvement"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F75afea9da9634afeaab85d2c89eaebc3?format=webp&width=800",
          title: "Brain Training Games",
          description: "Engaging activities for cognitive enhancement"
        }
      ]
    },
    {
      title: "Breathing Exercises",
      images: [
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fccd0ada48ad3420ea08a4f1edeb95e40?format=webp&width=800",
          title: "Mindful Breathing",
          description: "Guided breathing exercises for stress reduction"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fba8d2fee0f314362acccf739599e217c?format=webp&width=800",
          title: "Breathing Meditation",
          description: "Deep breathing techniques for relaxation"
        }
      ]
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageSet((prev) => (prev + 1) % themeImageSets.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="clinical-landing animated-bg">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text slide-in-left">
            <h1 className="hero-title">
              NeuroMind Pro
              <span className="neural-pulse">🧠</span>
            </h1>
            <h2 className="hero-subtitle breathe-glow">
              Advanced Cognitive Health Platform
            </h2>
            <p className="hero-description">
              Revolutionizing cognitive health with AI-powered assessment tools, 
              real-time brain monitoring, and personalized therapeutic interventions 
              for healthcare professionals worldwide.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item scale-in animate-delay-1">
                <div className="stat-icon float-slow">
                  <Users size={24} />
                </div>
                <div className="stat-text">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Clinicians</div>
                </div>
              </div>
              
              <div className="stat-item scale-in animate-delay-2">
                <div className="stat-icon float-medium">
                  <Brain size={24} />
                </div>
                <div className="stat-text">
                  <div className="stat-number">1M+</div>
                  <div className="stat-label">Assessments</div>
                </div>
              </div>
              
              <div className="stat-item scale-in animate-delay-3">
                <div className="stat-icon float-fast">
                  <Award size={24} />
                </div>
                <div className="stat-text">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Accuracy</div>
                </div>
            </div>

            <div className="hero-actions">
              <button
                className="btn btn-primary specialist-chat-btn"
                onClick={() => window.open(`mailto:senushidinara2005@gmail.com?subject=Specialist Consultation Request&body=Hello, I would like to schedule a consultation with a cognitive health specialist.`, '_blank')}
              >
                <MessageCircle size={20} />
                Chat with Specialist
              </button>
            </div>
          </div>
          </div>
          
          <div className="hero-image slide-in-right">
            <div className="image-carousel">
              {heroImages.map((image, index) => (
                <div 
                  key={index}
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <div className="theme-image-container float-slow">
                    <img 
                      src={image.url} 
                      alt={image.title}
                      className="theme-image"
                    />
                    <div className="theme-image-overlay"></div>
                  </div>
                  <div className="slide-info">
                    <h3>{image.title}</h3>
                    <p>{image.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Theme Image Showcase */}
      <section className="theme-showcase">
        <div className="section-header slide-in-up">
          <h2 className="section-title">
            Comprehensive Cognitive Wellness
          </h2>
          <p className="section-description">
            Explore our integrated approach to cognitive health through mindfulness, 
            physical activity, sleep optimization, and advanced brain training.
          </p>
        </div>

        <div className="theme-rotation">
          {themeImageSets.map((set, setIndex) => (
            <div 
              key={setIndex}
              className={`theme-set ${setIndex === currentImageSet ? 'active' : ''}`}
            >
              <h3 className="theme-set-title breathe-glow">{set.title}</h3>
              <div className="theme-gallery">
                {set.images.map((image, imageIndex) => (
                  <div 
                    key={imageIndex} 
                    className={`theme-card scale-in animate-delay-${imageIndex + 1}`}
                  >
                    <div className="theme-image-container float-medium">
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="theme-card-image"
                      />
                      <div className="theme-image-overlay"></div>
                    </div>
                    <h4 className="theme-card-title">{image.title}</h4>
                    <p className="theme-card-description">{image.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card slide-in-left animate-delay-1">
            <div className="feature-icon neural-pulse">
              <Brain size={48} />
            </div>
            <h3>Real-time EEG Analysis</h3>
            <p>Advanced brainwave monitoring with AI-powered pattern recognition and clinical insights.</p>
          </div>
          
          <div className="feature-card slide-in-up animate-delay-2">
            <div className="feature-icon neural-pulse">
              <Activity size={48} />
            </div>
            <h3>Cognitive Assessment</h3>
            <p>Comprehensive cognitive evaluations with evidence-based metrics and personalized recommendations.</p>
          </div>
          
          <div className="feature-card slide-in-right animate-delay-3">
            <div className="feature-icon neural-pulse">
              <Heart size={48} />
            </div>
            <h3>Wellness Integration</h3>
            <p>Holistic approach combining mindfulness, physical activity, sleep, and nutrition for optimal brain health.</p>
          </div>
          
          <div className="feature-card slide-in-left animate-delay-4">
            <div className="feature-icon neural-pulse">
              <Zap size={48} />
            </div>
            <h3>AI-Powered Insights</h3>
            <p>Machine learning algorithms provide predictive analytics and personalized intervention strategies.</p>
          </div>
          
          <div className="feature-card slide-in-up animate-delay-5">
            <div className="feature-icon neural-pulse">
              <Monitor size={48} />
            </div>
            <h3>Clinical Dashboard</h3>
            <p>Professional-grade interface with real-time monitoring and comprehensive reporting tools.</p>
          </div>
          
          <div className="feature-card slide-in-right animate-delay-6">
            <div className="feature-icon neural-pulse">
              <TrendingUp size={48} />
            </div>
            <h3>Progress Tracking</h3>
            <p>Detailed analytics and longitudinal studies to track cognitive improvements over time.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .clinical-landing {
          min-height: 100vh;
          overflow-x: hidden;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 80px 24px;
          position: relative;
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          line-height: 1.1;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--neural-primary);
          margin-bottom: 24px;
          font-weight: 600;
        }

        .hero-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          margin-bottom: 40px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-neural);
          border-radius: 12px;
          color: white;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .hero-image {
          position: relative;
        }

        .image-carousel {
          position: relative;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .carousel-slide.active {
          opacity: 1;
        }

        .carousel-slide .theme-image-container {
          height: 400px;
          margin-bottom: 16px;
        }

        .slide-info {
          text-align: center;
          padding: 16px;
        }

        .slide-info h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .slide-info p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .theme-showcase {
          padding: 80px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
        }

        .section-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .theme-rotation {
          position: relative;
          min-height: 600px;
        }

        .theme-set {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
        }

        .theme-set.active {
          opacity: 1;
          position: relative;
        }

        .theme-set-title {
          font-size: 2rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 40px;
          color: var(--neural-primary);
        }

        .features-section {
          padding: 80px 24px;
          background: var(--bg-secondary);
          margin-top: 80px;
        }

        .features-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .feature-card {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 32px;
          text-align: center;
          border: 1px solid var(--border-primary);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-neural);
          border-color: var(--neural-primary);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-neural);
          border-radius: 20px;
          color: white;
        }

        .feature-card h3 {
          font-size: 1.375rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .theme-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          padding: 40px 24px;
        }

        .theme-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          border: 1px solid var(--border-primary);
          transition: all 0.3s ease;
        }

        .theme-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-neural);
          border-color: var(--neural-primary);
        }

        .theme-card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 16px 0 8px;
        }

        .theme-card-description {
          color: var(--text-secondary);
          line-height: 1.5;
          flex-grow: 1;
        }

        .theme-card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-stats {
            justify-content: center;
          }

          .section-title {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default ClinicalLanding
