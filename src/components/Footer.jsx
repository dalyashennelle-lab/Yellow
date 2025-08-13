import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo text-glow">✨ Glow Sanctuary</h3>
            <p className="footer-description">
              Your destination for radiant beauty and wellness. 
              Discover your natural glow in our luxurious sanctuary.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#">Facial Treatments</a></li>
              <li><a href="#">Body Wellness</a></li>
              <li><a href="#">Glow Packages</a></li>
              <li><a href="#">Consultations</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📍 123 Glow Street, Beauty City</p>
              <p>📞 (555) 123-GLOW</p>
              <p>✉️ hello@glowsanctuary.com</p>
              <p>🕒 Mon-Sun: 9am-7pm</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; 2024 Glow Sanctuary. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background: rgba(0, 0, 0, 0.2);
          padding: 60px 0 20px;
          margin-top: 100px;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        
        .footer-section h3,
        .footer-section h4 {
          margin-bottom: 20px;
          color: #4ecdc4;
        }
        
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .footer-description {
          margin-bottom: 25px;
          line-height: 1.6;
          opacity: 0.9;
        }
        
        .social-links {
          display: flex;
          gap: 15px;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 10px;
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #4ecdc4;
          padding-left: 5px;
        }
        
        .contact-info p {
          margin-bottom: 8px;
          opacity: 0.8;
          font-size: 0.95rem;
        }
        
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          margin-bottom: 20px;
        }
        
        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .footer-bottom-content p {
          opacity: 0.7;
          margin: 0;
        }
        
        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }
        
        .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }
        
        .footer-bottom-links a:hover {
          color: #4ecdc4;
        }
        
        @media (max-width: 768px) {
          .footer {
            padding: 40px 0 20px;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }
          
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
          
          .footer-bottom-links {
            justify-content: center;
          }
        }
        
        @media (max-width: 1024px) and (min-width: 769px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
