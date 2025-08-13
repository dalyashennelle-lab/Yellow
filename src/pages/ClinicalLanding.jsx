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
  MessageCircle,
  Star,
  Shield,
  Target,
  Globe,
  Sparkles
} from 'lucide-react'

const ClinicalLanding = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentImageSet, setCurrentImageSet] = useState(0)
  
  const heroImages = [
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F1eaa7d90c80344b3975cd7d103f8ee96?format=webp&width=800",
      title: "NeuroMind Pro Facility",
      subtitle: "Professional cognitive health center with expert staff"
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fc26c4ae341ad4293954d04eab5245651?format=webp&width=800",
      title: "Expert Clinical Care",
      subtitle: "Dedicated healthcare professionals for cognitive wellness"
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F8849c3d33bb64dd593961485aa79ae80?format=webp&width=800",
      title: "EEG Brain Monitoring",
      subtitle: "Advanced EEG systems for real-time cognitive assessment"
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fe5f4b17fbed04905b759cf7fe7dfce1c?format=webp&width=800",
      title: "NeuroMind Pro Branding",
      subtitle: "Leading cognitive health technology company"
    }
  ]

  const appFeatures = [
    {
      icon: Brain,
      title: "Cognitive Assessment",
      description: "Comprehensive brain training games and memory challenges designed by neuroscientists",
      color: "#7dd3fc"
    },
    {
      icon: Activity,
      title: "EEG Brain Monitoring",
      description: "Real-time brainwave analysis with advanced AI pattern recognition technology",
      color: "#a78bfa"
    },
    {
      icon: Heart,
      title: "Mindfulness & Wellness",
      description: "Guided meditation, breathing exercises, and stress reduction techniques",
      color: "#fb7185"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Detailed analytics and insights to track your cognitive improvement journey",
      color: "#34d399"
    },
    {
      icon: Target,
      title: "Personalized Training",
      description: "AI-powered adaptive difficulty that adjusts to your performance level",
      color: "#fbbf24"
    },
    {
      icon: Globe,
      title: "Clinical Integration",
      description: "Professional-grade tools for healthcare providers and clinical research",
      color: "#8b5cf6"
    }
  ]

  const themeImageSets = [
    {
      title: "Beach Mindfulness & Wellness",
      images: [
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Ff28b7b4be9f3440c8a2a5f038b966287?format=webp&width=800",
          title: "Beach Meditation",
          description: "Peaceful beach meditation for mental clarity"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F32753069f6034bd39e9f7206d46cd99b?format=webp&width=800",
          title: "Sunrise Yoga",
          description: "Morning beach yoga for cognitive wellness"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F598339923d9943a494c4e7e903babb0e?format=webp&width=800",
          title: "Beach Breathing",
          description: "Ocean-side breathing exercises for relaxation"
        },
        {
          url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fadf18e7d2492434cbdb40f6235853384?format=webp&width=800",
          title: "Beach Fitness",
          description: "Beach exercises for physical and mental health"
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
      {/* Main Hero Section - Centered */}
      <section className="hero-section">
        <div className="hero-container">
          
          {/* Centered Hero Content */}
          <div className="hero-main-content">
            <div className="hero-badge slide-in-up">
              <Sparkles size={20} />
              <span>Welcome to the Future of Cognitive Health</span>
            </div>
            
            <h1 className="hero-title slide-in-up animate-delay-1">
              <span className="title-gradient">NeuroMind</span>
              <span className="title-accent">Pro</span>
              <span className="neural-pulse">🧠</span>
            </h1>
            
            <h2 className="hero-subtitle slide-in-up animate-delay-2">
              Advanced AI-Powered Cognitive Health Platform
            </h2>
            
            <p className="hero-description slide-in-up animate-delay-3">
              Transform your brain health with our revolutionary platform that combines cutting-edge 
              neuroscience, AI-powered assessment tools, and personalized cognitive training. 
              Whether you're a healthcare professional or individual seeking cognitive enhancement, 
              NeuroMind Pro provides comprehensive solutions for optimal brain performance.
            </p>

            {/* What We Do Section */}
            <div className="what-we-do slide-in-up animate-delay-4">
              <h3 className="what-we-do-title">What NeuroMind Pro Does</h3>
              <div className="feature-highlights">
                <div className="highlight-item">
                  <Brain size={24} />
                  <span>Cognitive Training & Brain Games</span>
                </div>
                <div className="highlight-item">
                  <Activity size={24} />
                  <span>Real-time EEG Monitoring</span>
                </div>
                <div className="highlight-item">
                  <Heart size={24} />
                  <span>Mindfulness & Wellness</span>
                </div>
                <div className="highlight-item">
                  <TrendingUp size={24} />
                  <span>Progress Analytics</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-actions slide-in-up animate-delay-5">
              <button
                className="btn btn-primary cta-button"
                onClick={() => navigate('/dashboard')}
              >
                <PlayCircle size={24} />
                Start Your Journey
                <ChevronRight size={20} />
              </button>
              
              <button
                className="btn btn-secondary demo-button"
                onClick={() => navigate('/games')}
              >
                <Brain size={24} />
                Try Brain Games
              </button>
              
              <button
                className="btn btn-ghost contact-button"
                onClick={() => window.open(`mailto:senushidinara2005@gmail.com?subject=NeuroMind Pro Consultation&body=Hello, I would like to learn more about NeuroMind Pro.`, '_blank')}
              >
                <MessageCircle size={20} />
                Contact Specialist
              </button>
            </div>

            {/* Hero Stats */}
            <div className="hero-stats slide-in-up animate-delay-6">
              <div className="stat-item">
                <div className="stat-icon">
                  <Users size={28} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Active Users</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <Brain size={28} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">1M+</div>
                  <div className="stat-label">Brain Assessments</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <Award size={28} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <Shield size={28} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">HIPAA Compliant</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Showcase */}
          <div className="hero-showcase slide-in-right animate-delay-4">
            <div className="showcase-container">
              <div className="image-carousel">
                {heroImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                  >
                    <div className="theme-image-container">
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="theme-image"
                      />
                      <div className="image-overlay">
                        <h4>{image.title}</h4>
                        <p>{image.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="carousel-indicators">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title slide-in-up">
              Comprehensive Cognitive Solutions
            </h2>
            <p className="section-description slide-in-up animate-delay-1">
              Discover how NeuroMind Pro revolutionizes cognitive health through advanced technology and scientific research
            </p>
          </div>

          <div className="features-grid">
            {appFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card slide-in-up animate-delay-${index + 1}`}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  <feature.icon size={48} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-glow" style={{ background: feature.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content slide-in-up">
            <h2>Ready to Transform Your Cognitive Health?</h2>
            <p>Join thousands of users and healthcare professionals who trust NeuroMind Pro for cognitive enhancement</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary cta-main"
                onClick={() => navigate('/dashboard')}
              >
                <Zap size={24} />
                Get Started Now
                <ChevronRight size={20} />
              </button>
              <button 
                className="btn btn-ghost cta-secondary"
                onClick={() => navigate('/advanced')}
              >
                <Monitor size={20} />
                View Clinical Features
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .clinical-landing {
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          position: relative;
        }

        .hero-container {
          max-width: 1400px;
          width: 100%;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          align-items: center;
        }

        .hero-main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 32px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--gradient-neural);
          color: white;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          box-shadow: var(--shadow-glow);
          animation: breatheGlow 3s ease-in-out infinite;
        }

        .hero-title {
          font-size: clamp(4rem, 8vw, 7rem);
          font-weight: 800;
          line-height: 1.1;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .title-gradient {
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-accent {
          color: var(--neural-primary);
          text-shadow: 0 0 30px currentColor;
        }

        .hero-subtitle {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          color: var(--neural-secondary);
          font-weight: 600;
          margin: 0;
          opacity: 0.9;
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 700px;
          margin: 0 auto;
        }

        .what-we-do {
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-primary);
          border-radius: 24px;
          padding: 32px;
          width: 100%;
          max-width: 800px;
        }

        .what-we-do-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
          text-align: center;
        }

        .feature-highlights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--bg-soft);
          border-radius: 16px;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .highlight-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-soft);
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }

        .cta-button {
          background: var(--gradient-neural);
          color: white;
          padding: 20px 40px;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 15px 35px rgba(0, 212, 255, 0.3);
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.4);
        }

        .demo-button {
          background: var(--gradient-mint);
          color: var(--text-primary);
          padding: 18px 32px;
          font-size: 1.125rem;
          font-weight: 600;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .demo-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-neural);
        }

        .contact-button {
          padding: 16px 28px;
          font-size: 1rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 32px;
          width: 100%;
          max-width: 800px;
          margin-top: 20px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-primary);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-glow);
          border-color: var(--neural-primary);
        }

        .stat-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-neural);
          border-radius: 20px;
          color: white;
        }

        .stat-content {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .hero-showcase {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .showcase-container {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .image-carousel {
          position: relative;
          height: 600px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow-neural);
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
        }

        .carousel-slide.active {
          opacity: 1;
        }

        .theme-image-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .theme-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .carousel-slide:hover .theme-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 32px 24px;
          text-align: center;
        }

        .image-overlay h4 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .image-overlay p {
          font-size: 1rem;
          opacity: 0.9;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: var(--neural-primary);
          transform: scale(1.2);
          box-shadow: 0 0 12px var(--neural-primary);
        }

        .features-section {
          padding: 120px 24px;
          background: var(--bg-secondary);
        }

        .section-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
        }

        .section-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .feature-card {
          background: var(--bg-card);
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
          border: 1px solid var(--border-primary);
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
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
          background: var(--bg-glass);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1);
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1.125rem;
        }

        .feature-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover .feature-glow {
          opacity: 0.8;
        }

        .cta-section {
          padding: 120px 24px;
          background: var(--bg-primary);
          text-align: center;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 24px;
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-content p {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-main {
          background: var(--gradient-neural);
          color: white;
          padding: 20px 40px;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 15px 35px rgba(0, 212, 255, 0.3);
        }

        .cta-main:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.4);
        }

        .cta-secondary {
          padding: 18px 32px;
          font-size: 1.125rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 60px;
            text-align: center;
          }

          .hero-main-content {
            order: 1;
          }

          .hero-showcase {
            order: 2;
          }

          .hero-title {
            font-size: clamp(2.5rem, 8vw, 4rem);
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .feature-highlights {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-stats {
            grid-template-columns: 1fr;
          }
          
          .cta-button,
          .demo-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default ClinicalLanding
