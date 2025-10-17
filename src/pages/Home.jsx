import React, { useEffect, useRef, useState } from 'react'
import HeroThree from '../components/HeroThree'

const Home = () => {
  const emblemRef = useRef(null)
  const servicesRef = useRef(null)
  const service1Ref = useRef(null)
  const service2Ref = useRef(null)
  const service3Ref = useRef(null)
  const service4Ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [service1Visible, setService1Visible] = useState(false)
  const [service2Visible, setService2Visible] = useState(false)
  const [service3Visible, setService3Visible] = useState(false)
  const [service4Visible, setService4Visible] = useState(false)
  const [selectedClient, setSelectedClient] = useState(0)

  // Client data with different images
  const clients = [
    {
      name: "HBO",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/HBO-Logo.png",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      name: "Disney",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Disney-Logo.png",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      name: "Stanford",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Stanford-University-Logo.png",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "The Salvation Army",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Salvation-Army-Logo.png",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "FENWICK",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Fenwick-Logo.png",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
    },
    {
      name: "Ludeo",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Ludeo-Logo.png",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "PlayStation",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/PlayStation-Logo.png",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
    },
    {
      name: "Kaiser Permanente",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Kaiser-Permanente-Logo.png",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
    },
    {
      name: "Hasbro",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Hasbro-Logo.png",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    }
  ]

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

    // Create individual observers for each service with bidirectional logic
    const service1Observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setService1Visible(true)
        } else {
          setService1Visible(false)
        }
      },
      { threshold: 0.1 }
    )

    const service2Observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setService2Visible(true)
        } else {
          setService2Visible(false)
        }
      },
      { threshold: 0.1 }
    )

    const service3Observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setService3Visible(true)
        } else {
          setService3Visible(false)
        }
      },
      { threshold: 0.1 }
    )

    const service4Observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setService4Visible(true)
        } else {
          setService4Visible(false)
        }
      },
      { threshold: 0.1 }
    )

    // Observe elements
    if (emblemRef.current) {
      emblemObserver.observe(emblemRef.current)
    }

    if (service1Ref.current) {
      service1Observer.observe(service1Ref.current)
    }

    if (service2Ref.current) {
      service2Observer.observe(service2Ref.current)
    }

    if (service3Ref.current) {
      service3Observer.observe(service3Ref.current)
    }

    if (service4Ref.current) {
      service4Observer.observe(service4Ref.current)
    }

    return () => {
      if (emblemRef.current) {
        emblemObserver.unobserve(emblemRef.current)
      }
      if (service1Ref.current) {
        service1Observer.unobserve(service1Ref.current)
      }
      if (service2Ref.current) {
        service2Observer.unobserve(service2Ref.current)
      }
      if (service3Ref.current) {
        service3Observer.unobserve(service3Ref.current)
      }
      if (service4Ref.current) {
        service4Observer.unobserve(service4Ref.current)
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
              Build success in Software Engineer and Property Services
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
          {/* Trigger elements for scroll detection */}
          <div ref={service1Ref} style={{ position: 'absolute', top: '100vh', height: '1px', width: '100%' }}></div>
          <div ref={service2Ref} style={{ position: 'absolute', top: '200vh', height: '1px', width: '100%' }}></div>
          <div ref={service3Ref} style={{ position: 'absolute', top: '300vh', height: '1px', width: '100%' }}></div>
          <div ref={service4Ref} style={{ position: 'absolute', top: '400vh', height: '1px', width: '100%' }}></div>

          {/* Service 1: Web Development */}
          <div className={`service-overlay service-1 ${service1Visible ? 'animate-overlay-slide' : 'animate-overlay-slide-reverse'}`}>
            <div className="service-row">
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
          </div>

          {/* Service 2: Mobile Apps */}
          <div className={`service-overlay service-2 ${service2Visible ? 'animate-overlay-slide' : 'animate-overlay-slide-reverse'}`}>
            <div className="service-row">
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
          </div>

          {/* Service 3: UI/UX Design */}
          <div className={`service-overlay service-3 ${service3Visible ? 'animate-overlay-slide' : 'animate-overlay-slide-reverse'}`}>
            <div className="service-row">
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
          </div>

          {/* Service 4: Property Services */}
          <div className={`service-overlay service-4 ${service4Visible ? 'animate-overlay-slide' : 'animate-overlay-slide-reverse'}`}>
            <div className="service-row">
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
        </div>
      </section>

      {/* Client Experience Section */}
      <section className="client-experience-section">
        <div className="client-experience-container">
          <div className="client-experience-split">
            {/* Left Side - Client Logos */}
            <div className="client-experience-left">
              <div className="client-experience-header">
                <h2 className="client-experience-title">CLIENT EXPERIENCE</h2>
                <span className="client-experience-subtitle">PAST & PRESENT</span>
              </div>
              <div className="client-logos-grid">
                {clients.map((client, index) => (
                  <div 
                    key={index}
                    className={`client-logo ${selectedClient === index ? 'active' : ''}`}
                    onClick={() => setSelectedClient(index)}
                  >
                    <img src={client.logo} alt={client.name} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Client Image */}
            <div className="client-experience-right">
              <div className="laptop-image-container">
                <img 
                  src={clients[selectedClient].image} 
                  alt={`${clients[selectedClient].name} project`} 
                  className="laptop-image"
                />
                <div className="client-overlay">
                  <h3 className="client-name">{clients[selectedClient].name}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          </div>
  )
}

export default Home
