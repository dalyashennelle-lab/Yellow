import React from 'react'

const Services = () => {
  const services = [
    {
      title: "Facial Treatments",
      description: "Rejuvenating facials tailored to your skin type",
      price: "From $85",
      features: ["Deep cleansing", "Hydrating masks", "Anti-aging serums"]
    },
    {
      title: "Body Wellness",
      description: "Full-body treatments for complete relaxation",
      price: "From $120",
      features: ["Body wraps", "Exfoliation", "Massage therapy"]
    },
    {
      title: "Glow Packages",
      description: "Complete beauty transformation packages",
      price: "From $200",
      features: ["Multi-treatment", "Consultation", "Take-home products"]
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-glow">Our Services</h2>
          <p className="section-subtitle">
            Discover treatments designed to reveal your natural radiance
          </p>
        </div>
        
        <div className="services-grid grid grid-3">
          {services.map((service, index) => (
            <div key={index} className="service-card card glow-effect">
              <div className="service-header">
                <h3 className="service-title">{service.title}</h3>
                <div className="service-price">{service.price}</div>
              </div>
              
              <p className="service-description">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}>✨ {feature}</li>
                ))}
              </ul>
              
              <button
                className="btn-primary service-btn"
                onClick={() => window.open(`mailto:senushidinara2005@gmail.com?subject=Service Booking - ${service.title}&body=Hello, I would like to book the ${service.title} service.`, '_blank')}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
        
        <div className="cta-section">
          <div className="card cta-card">
            <h3>Ready to Glow?</h3>
            <p>Book your consultation today and discover the perfect treatment for you</p>
            <button className="btn-primary">Schedule Consultation</button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .services {
          padding: 100px 0;
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
        
        .service-card {
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }
        
        .service-card:hover::before {
          left: 100%;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
        }
        
        .service-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .service-title {
          font-size: 1.5rem;
          color: #4ecdc4;
          font-weight: 600;
        }
        
        .service-price {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .service-description {
          margin-bottom: 20px;
          opacity: 0.9;
          line-height: 1.5;
        }
        
        .service-features {
          list-style: none;
          margin-bottom: 30px;
          text-align: left;
        }
        
        .service-features li {
          padding: 5px 0;
          opacity: 0.8;
        }
        
        .service-btn {
          width: 100%;
          margin-top: auto;
        }
        
        .cta-section {
          margin-top: 80px;
        }
        
        .cta-card {
          text-align: center;
          background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
        
        .cta-card h3 {
          font-size: 2rem;
          margin-bottom: 15px;
          color: #ff6b6b;
        }
        
        .cta-card p {
          font-size: 1.1rem;
          margin-bottom: 25px;
          opacity: 0.9;
        }
        
        @media (max-width: 768px) {
          .services {
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .service-header {
            flex-direction: column;
            gap: 10px;
            align-items: center;
          }
          
          .cta-card h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Services
