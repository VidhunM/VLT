import React from 'react'
import MinimalistNav from '../components/MinimalistNav'

const Contact = () => {
  return (
    <div className="contact-page-dark">
      <MinimalistNav />
      <div className="contact-wrapper">
        <div className="contact-container">
        {/* Left Info */}
        <div className="contact-sidebar">
          <div className="sidebar-block">
            <span className="contact-head">Head Office</span>
            <address className="contact-address">
              MacMillan House,<br />
              Paddington Stn.<br />
              London, W2 1FT
            </address>
          </div>
          <div className="sidebar-block">
            <span className="contact-head">Phone</span>
            <a href="tel:+4402073871268" className="contact-phone">+44 (0)20 7387 1268</a>
          </div>
          <a href="#" className="contact-linkedin">LinkedIn</a>
        </div>

        {/* Right Form */}
        <form className="contact-form" autoComplete="off">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="forename">Forename*</label>
              <input type="text" id="forename" required />
            </div>
            <div className="form-field">
              <label htmlFor="surname">Surname*</label>
              <input type="text" id="surname" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="company">Company name*</label>
              <input type="text" id="company" required />
            </div>
            <div className="form-field">
              <label htmlFor="relationship">Relationship with Spence</label>
              <select id="relationship">
                <option>Client</option>
                <option>Prospect</option>
                <option>Supplier</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="sector">Sector / Service</label>
              <select id="sector">
                <option>Select an option</option>
                <option>Infrastructure</option>
                <option>Consulting</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email Address*</label>
              <input type="email" id="email" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full-width">
              <label htmlFor="message">Tell us about your project*</label>
              <textarea id="message" rows="4" required />
            </div>
          </div>
        </form>
      </div>

      {/* Location Map Section - Below Form */}
      <div className="location-section">
        <div className="location-container">
          {/* Left Side - Location Details */}
          <div className="location-details">
            <h2 className="location-title">
              We Are <br /> Located on
            </h2>
            
            <div className="location-addresses">
              <div className="location-item">
                <div className="location-icon">📍</div>
                <p>Tidle Neo, Kullagoundanoor, Karuppur, Salem, TamilNadu, 636011</p>
              </div>
              
              <div className="location-item">
                <div className="location-icon">📍</div>
                <p>7th Floor, Centre Point, 2/4, Mount Pollamallee High Road, Manapakkam, Porur, Chennai, Tamil Nadu 600089</p>
              </div>
              
              <div className="location-item">
                <div className="location-icon">📍</div>
                <p>Brown Road, Jaffna, Sri Lanka</p>
              </div>
            </div>
            
            <div className="location-contact">
              <p>Contact no: <a href="tel:+919791670504">+91 9791670504</a></p>
              <p>WhatsApp: <a href="https://wa.me/919791670504" target="_blank" rel="noopener noreferrer">+91 9791670504</a></p>
              <p>Email: <a href="mailto:sutheesh.s@vulturelines.com">sutheesh.s@vulturelines.com</a></p>
            </div>
          </div>

          {/* Right Side - Google Maps Embed */}
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5926341894877!2d80.17429731482162!3d13.024825990817846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267f1e5e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sPorur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
            ></iframe>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Contact
