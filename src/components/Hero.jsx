import React from 'react'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title text-glow">
              Welcome to Your 
              <span className="highlight"> Glow Sanctuary</span>
            </h1>
            <p className="hero-description">
              Discover a world of radiant beauty and wellness. Transform your skin, 
              elevate your spirit, and embrace your natural glow in our luxurious sanctuary.
            </p>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => window.open(`mailto:senushidinara2005@gmail.com?subject=Appointment Request&body=Hello, I would like to book a cognitive assessment appointment.`, '_blank')}
              >
                Book Appointment
              </button>
              <button
                className="btn-secondary"
                onClick={() => window.scrollTo({ top: document.getElementById('services')?.offsetTop || 0, behavior: 'smooth' })}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glow-orb"></div>
            <div className="glow-orb secondary"></div>
            <div className="glow-orb tertiary"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          width: 100%;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        
        .highlight {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-description {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 40px;
          opacity: 0.9;
        }
        
        .hero-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .btn-secondary {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 12px 24px;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }
        
        .hero-visual {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          animation: float 6s ease-in-out infinite;
          filter: blur(1px);
        }
        
        .glow-orb:nth-child(1) {
          width: 200px;
          height: 200px;
          opacity: 0.8;
          animation-delay: 0s;
        }
        
        .glow-orb.secondary {
          width: 120px;
          height: 120px;
          background: linear-gradient(45deg, #4ecdc4, #45b7aa);
          opacity: 0.6;
          animation-delay: -2s;
          right: 20px;
          top: 20px;
        }
        
        .glow-orb.tertiary {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          opacity: 0.4;
          animation-delay: -4s;
          left: 30px;
          bottom: 30px;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
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
          
          .hero-description {
            font-size: 1.1rem;
          }
          
          .hero-visual {
            height: 250px;
          }
          
          .glow-orb:nth-child(1) {
            width: 150px;
            height: 150px;
          }
          
          .glow-orb.secondary {
            width: 80px;
            height: 80px;
          }
          
          .glow-orb.tertiary {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
