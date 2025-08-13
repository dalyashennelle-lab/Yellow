import React from 'react'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-glow">About Glow Sanctuary</h2>
          <p className="section-subtitle">
            Where beauty meets wellness in perfect harmony
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <div className="card">
              <h3>Our Mission</h3>
              <p>
                At Glow Sanctuary, we believe that true beauty radiates from within. 
                Our mission is to provide a transformative experience that nurtures 
                both your skin and spirit, helping you discover your natural radiance.
              </p>
            </div>
            
            <div className="card">
              <h3>Our Approach</h3>
              <p>
                We combine cutting-edge skincare technology with time-honored wellness 
                practices. Our holistic approach ensures that every treatment not only 
                enhances your appearance but also promotes overall well-being.
              </p>
            </div>
          </div>
          
          <div className="about-features">
            <div className="feature-card glow-effect">
              <div className="feature-icon">🌟</div>
              <h4>Premium Treatments</h4>
              <p>State-of-the-art skincare and beauty treatments</p>
            </div>
            
            <div className="feature-card glow-effect">
              <div className="feature-icon">🧘‍♀️</div>
              <h4>Wellness Focus</h4>
              <p>Holistic approach to beauty and well-being</p>
            </div>
            
            <div className="feature-card glow-effect">
              <div className="feature-icon">✨</div>
              <h4>Expert Team</h4>
              <p>Certified professionals dedicated to your glow</p>
            </div>
            
            <div className="feature-card glow-effect">
              <div className="feature-icon">🌿</div>
              <h4>Natural Products</h4>
              <p>Organic and eco-friendly beauty solutions</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .about {
          padding: 100px 0;
          background: rgba(0, 0, 0, 0.1);
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          opacity: 0.8;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        
        .about-text .card {
          margin-bottom: 30px;
        }
        
        .about-text h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #4ecdc4;
        }
        
        .about-text p {
          line-height: 1.6;
          opacity: 0.9;
        }
        
        .about-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 30px 20px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.1);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }
        
        .feature-card h4 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #ff6b6b;
        }
        
        .feature-card p {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.4;
        }
        
        @media (max-width: 768px) {
          .about {
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .about-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .about-features {
            grid-template-columns: 1fr;
          }
          
          .feature-card {
            padding: 25px 15px;
          }
        }
      `}</style>
    </section>
  )
}

export default About
