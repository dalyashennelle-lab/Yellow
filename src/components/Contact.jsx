import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-glow">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to begin your glow journey? We'd love to hear from you
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="card">
              <h3>Visit Our Sanctuary</h3>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>123 Glow Street<br />Wellness District<br />Beauty City, BC 12345</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>(555) 123-GLOW</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>hello@glowsanctuary.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">🕒</span>
                <div>
                  <strong>Hours</strong>
                  <p>Mon-Fri: 9am-7pm<br />Sat-Sun: 10am-6pm</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form card">
              <h3>Book Your Experience</h3>
              
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select a Service</option>
                  <option value="facial">Facial Treatment</option>
                  <option value="body">Body Wellness</option>
                  <option value="package">Glow Package</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your beauty goals..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="form-input"
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact {
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
        
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }
        
        .contact-info h3 {
          font-size: 1.5rem;
          margin-bottom: 30px;
          color: #4ecdc4;
          text-align: center;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 25px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .info-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }
        
        .info-icon {
          font-size: 1.5rem;
          min-width: 30px;
        }
        
        .info-item strong {
          display: block;
          color: #ff6b6b;
          margin-bottom: 5px;
        }
        
        .info-item p {
          margin: 0;
          opacity: 0.9;
          line-height: 1.4;
        }
        
        .contact-form h3 {
          font-size: 1.5rem;
          margin-bottom: 30px;
          color: #4ecdc4;
          text-align: center;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .form-input {
          width: 100%;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .form-input:focus {
          outline: none;
          border-color: #4ecdc4;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(78, 205, 196, 0.2);
        }
        
        .form-input option {
          background: #333;
          color: white;
        }
        
        .submit-btn {
          width: 100%;
          padding: 15px;
          font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
          .contact {
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact
