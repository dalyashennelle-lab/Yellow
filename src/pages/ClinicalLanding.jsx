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
  Laptop
} from 'lucide-react'

const ClinicalLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroImages = [
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F6d78af7aa0ea4ad6940d65883e9b3777?format=webp&width=800",
      title: "Professional Clinical Assessment",
      subtitle: "Advanced cognitive evaluation tools for healthcare professionals"
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F64b70066242a48c4b17ae73777389961?format=webp&width=800",
      title: "NeuroAssess Pro Platform",
      subtitle: "Comprehensive cognitive health monitoring and assessment"
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F413c835e4a9e4128b2fe89b7ad8c03b3?format=webp&width=800",
      title: "Precision in Cognitive Health",
      subtitle: "Evidence-based assessment tools trusted by clinicians worldwide"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="clinical-landing">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">NeuroMind Pro</span>
              <br />Clinical Assessment Platform
            </h1>
            <p className="hero-description">
              Advanced cognitive assessment and monitoring solution designed for healthcare professionals. 
              Deliver precise, evidence-based cognitive evaluations with our comprehensive clinical platform.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">
                <PlayCircle size={20} />
                Start Clinical Demo
              </button>
              <button className="btn btn-secondary">
                Schedule Consultation
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Assessments Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Clinical Accuracy</span>
              </div>
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label">Healthcare Partners</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="image-container">
              <img 
                src={heroImages[currentSlide].url} 
                alt={heroImages[currentSlide].title}
                className="main-image"
              />
              <div className="image-overlay">
                <h3>{heroImages[currentSlide].title}</h3>
                <p>{heroImages[currentSlide].subtitle}</p>
              </div>
            </div>
            <div className="slide-indicators">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Features */}
      <section className="clinical-features">
        <div className="container">
          <h2 className="section-title">Clinical Excellence</h2>
          <div className="features-grid">
            <div className="feature-card">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F81fe22e8bee641ffaac534cbd75cd8cb?format=webp&width=800"
                alt="Tablet Assessment Interface"
                className="feature-image"
              />
              <div className="feature-content">
                <h3>Tablet-Based Assessments</h3>
                <p>Intuitive touch interface designed for clinical environments with standardized cognitive test batteries.</p>
              </div>
            </div>

            <div className="feature-card">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F5c9dabb76aee4b138da67f4ac12a5e72?format=webp&width=800"
                alt="Progress Tracking Dashboard"
                className="feature-image"
              />
              <div className="feature-content">
                <h3>Progress Tracking</h3>
                <p>Comprehensive cognitive domain scoring with longitudinal tracking and improvement visualization.</p>
              </div>
            </div>

            <div className="feature-card">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F39a5c1cfa8ba4f569e59c104daf07f04?format=webp&width=800"
                alt="Patient Consultation"
                className="feature-image"
              />
              <div className="feature-content">
                <h3>Patient Consultation</h3>
                <p>Seamless integration into clinical workflows with patient-friendly reporting and consultation tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Device Section */}
      <section className="multi-device-section">
        <div className="container">
          <div className="device-showcase">
            <div className="device-content">
              <h2>Accessible Across All Devices</h2>
              <p>NeuroMind Pro works seamlessly across laptops, tablets, and smartphones, ensuring accessibility in any clinical setting.</p>
              <div className="device-features">
                <div className="device-feature">
                  <Laptop className="device-icon" />
                  <span>Desktop Workstations</span>
                </div>
                <div className="device-feature">
                  <Tablet className="device-icon" />
                  <span>Clinical Tablets</span>
                </div>
                <div className="device-feature">
                  <Smartphone className="device-icon" />
                  <span>Mobile Devices</span>
                </div>
              </div>
            </div>
            <div className="device-image">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F8e2b0cd1ea8448eb88f84fd3de8f9806?format=webp&width=800"
                alt="Multi-device NeuroMind Platform"
                className="devices-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Environment */}
      <section className="clinical-environment">
        <div className="container">
          <h2 className="section-title">Trusted in Clinical Settings</h2>
          <div className="environment-grid">
            <div className="environment-card">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F74a1242dba5649c9824669ee6dc0680d?format=webp&width=800"
                alt="Clinical waiting room"
                className="environment-image"
              />
              <h3>Healthcare Facilities</h3>
              <p>Optimized for hospitals, clinics, and specialized cognitive care centers</p>
            </div>

            <div className="environment-card">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fcabba278a7a1433ca6e7227b5c7dfef8?format=webp&width=800"
                alt="EEG monitoring setup"
                className="environment-image"
              />
              <h3>Advanced Monitoring</h3>
              <p>Integration with EEG and other neurological monitoring equipment</p>
            </div>

            <div className="environment-card">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fe79bd483a96549538c83d950e593cfc1?format=webp&width=800"
                alt="Clinical assessment setup"
                className="environment-image"
              />
              <h3>Professional Assessment</h3>
              <p>Standardized testing protocols meeting clinical research standards</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .clinical-landing {
          background: var(--bg-primary);
          min-height: 100vh;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 24px;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          width: 100%;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .gradient-text {
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 32px;
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--neural-primary);
          font-family: 'Space Grotesk', sans-serif;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-image {
          position: relative;
        }

        .image-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-glow);
          aspect-ratio: 4/3;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 24px;
          color: white;
        }

        .image-overlay h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .image-overlay p {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .slide-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .slide-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .slide-dot.active {
          background: var(--neural-primary);
          transform: scale(1.2);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .clinical-features {
          padding: 100px 0;
          background: var(--bg-secondary);
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 60px;
          background: var(--gradient-neural);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
        }

        .feature-card {
          background: var(--bg-card);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border-primary);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: var(--border-glow);
          box-shadow: var(--shadow-glow);
        }

        .feature-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .feature-content {
          padding: 24px;
        }

        .feature-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--neural-primary);
        }

        .feature-content p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .multi-device-section {
          padding: 100px 0;
          background: var(--bg-primary);
        }

        .device-showcase {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .device-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--text-primary);
        }

        .device-content p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .device-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .device-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .device-icon {
          color: var(--neural-primary);
        }

        .devices-img {
          width: 100%;
          border-radius: 20px;
          box-shadow: var(--shadow-glow);
        }

        .clinical-environment {
          padding: 100px 0;
          background: var(--bg-tertiary);
        }

        .environment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .environment-card {
          text-align: center;
          background: var(--bg-card);
          border-radius: 20px;
          padding: 32px 24px;
          border: 1px solid var(--border-primary);
          transition: all 0.3s ease;
        }

        .environment-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-glow);
          box-shadow: var(--shadow-glow);
        }

        .environment-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .environment-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--neural-primary);
        }

        .environment-card p {
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .device-showcase {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 16px 0;
          }

          .container {
            padding: 0 16px;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
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
