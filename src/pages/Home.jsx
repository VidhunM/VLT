import React, { useEffect, useRef, useState } from 'react'
import HeroThree from '../components/HeroThree'

const Home = () => {
  const emblemRef = useRef(null)
  const servicesRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [servicesVisible, setServicesVisible] = useState(false)

  useEffect(() => {
    const emblemObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.3 }
    )

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesVisible(true)
        } else {
          setServicesVisible(false)
        }
      },
      { threshold: 0.2 }
    )

    if (emblemRef.current) {
      emblemObserver.observe(emblemRef.current)
    }

    if (servicesRef.current) {
      servicesObserver.observe(servicesRef.current)
    }

    return () => {
      if (emblemRef.current) {
        emblemObserver.unobserve(emblemRef.current)
      }
      if (servicesRef.current) {
        servicesObserver.unobserve(servicesRef.current)
      }
    }
  }, [])

  return (
    <div className="page home">
      <HeroThree />
      
      <section className="excellence-section">
        <div className="excellence-container">
          <div className="excellence-left">
            <h2 className="excellence-title">
              <span>2+ Years of</span>
              <span>Excellence.</span>
            </h2>
            <div className="excellence-emblem" ref={emblemRef}>
              <div className="circular-emblem">
                <div className={`emblem-number ${isVisible ? 'animate-number' : ''}`}>2</div>
                <div className={`emblem-text ${isVisible ? 'animate-text' : ''}`}>YEARS</div>
                <svg className="circular-text-svg" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle-path" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                  </defs>
                  <g className={`rotating-group ${isVisible ? 'animate-rotating' : ''}`}>
                    <text className="circular-text">
                      <textPath href="#circle-path" startOffset="0%">
                        CELEBRATING TWO PLUS YEARS • CELEBRATING TWO PLUS YEARS • 
                      </textPath>
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="excellence-right">
            <h3 className="excellence-subtitle">
              Build success in , Software Engineer and Property Services
            </h3>
            <p className="excellence-description">
            If you mind thinks about mobile/website development, then we have created a niche for ourselves. We started in 2021 with just 3 employees and now have expanded ourselves to 20+ which shows about the growth and the quality of work that we did over the years.

Our team comprises highly skilled IT professionals whose target is to provide top-notch yet cost-effective solutions to SMEs. We have expertise in designing and developing custom-made websites and apps for all industries. So if there’s a specific requirement you can reach to us.
            </p>
            <div className="excellence-buttons">
              <button className="btn-our-people">
                <span>Our People</span>
                <div className="btn-icon orange-dots"></div>
              </button>
              <button className="btn-join-team">
                <span>Join The Team</span>
                <div className="btn-icon white-dots"></div>
              </button>
            </div>
          </div>
          <div className="excellence-scroll-indicator"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" ref={servicesRef}>
        <div className="services-container">
          {/* Service 1: Web Development */}
          <div className={`service-row ${servicesVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.1s' }}>
            <div className="service-image-section">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80" alt="Web Development" />
            </div>
            <div className="service-content-section">
              <div className="service-label">Our Services</div>
              <h2 className="service-main-title">Web Development</h2>
              <p className="service-description">
                We specialize in creating custom websites and web applications using modern technologies and best practices. Our development team ensures your digital presence is both functional and visually appealing, delivering solutions that drive business growth and user engagement.
              </p>
              <button className="service-cta-btn">
                <span>Find Out More</span>
                <div className="btn-icon orange-dots"></div>
              </button>
            </div>
          </div>

          {/* Service 2: Mobile Apps */}
          <div className={`service-row ${servicesVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.2s' }}>
            <div className="service-image-section">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Mobile Apps" />
            </div>
            <div className="service-content-section">
              <div className="service-label">Our Services</div>
              <h2 className="service-main-title">Mobile Apps</h2>
              <p className="service-description">
                Native and cross-platform mobile applications for iOS and Android devices. We create intuitive, high-performance mobile solutions that provide seamless user experiences across all devices and platforms.
              </p>
              <button className="service-cta-btn">
                <span>Find Out More</span>
                <div className="btn-icon orange-dots"></div>
              </button>
            </div>
          </div>

          {/* Service 3: UI/UX Design */}
          <div className={`service-row ${servicesVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="service-image-section">
              <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80" alt="UI/UX Design" />
            </div>
            <div className="service-content-section">
              <div className="service-label">Our Services</div>
              <h2 className="service-main-title">UI/UX Design</h2>
              <p className="service-description">
                Beautiful and intuitive user interfaces designed for optimal user experience. Our design team focuses on creating engaging, accessible, and conversion-focused designs that resonate with your target audience.
              </p>
              <button className="service-cta-btn">
                <span>Find Out More</span>
                <div className="btn-icon orange-dots"></div>
              </button>
            </div>
          </div>

          {/* Service 4: Property Services */}
          <div className={`service-row ${servicesVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.4s' }}>
            <div className="service-image-section">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80" alt="Property Services" />
            </div>
            <div className="service-content-section">
              <div className="service-label">Our Services</div>
              <h2 className="service-main-title">Property Services</h2>
              <p className="service-description">
                Comprehensive property management and real estate technology solutions. We provide innovative digital tools and platforms that streamline property operations and enhance tenant experiences.
              </p>
              <button className="service-cta-btn">
                <span>Find Out More</span>
                <div className="btn-icon orange-dots"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

          </div>
  )
}

export default Home
