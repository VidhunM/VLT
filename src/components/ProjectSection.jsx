import React, { useEffect, useRef, useState } from 'react'
import '../styles/projectShowcase.css'

const ProjectSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const projects = [
    {
      id: 1,
      title: "G",
      subtitle: "Community Gallery",
      type: "mobile",
      theme: "gradient",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      position: "left",
      rotation: -8
    },
    {
      id: 2,
      title: "CORRIDOR",
      subtitle: "The Corridor is a new gallery to discover unique, one-of-a-kind works of art.",
      type: "mobile",
      theme: "dark",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      position: "bottom-left",
      rotation: 3
    },
    {
      id: 3,
      title: "AMANAH",
      subtitle: "Building conflict resilient communities.",
      description: "In a world where unresolved conflicts and ineffective communication can lead to harm and disconnection, we provide tools for healthy relationships and effective communication.",
      type: "website",
      theme: "light",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      position: "center",
      rotation: 0
    },
    {
      id: 4,
      title: "STRATEGY",
      subtitle: "AI • MOTION • WEB • BRAND • STRATEGY • AI • MOTION • WEB",
      type: "card",
      theme: "white",
      position: "right",
      rotation: -5
    },
    {
      id: 5,
      title: "GEOMETRIC",
      subtitle: "Design System",
      type: "card",
      theme: "dark",
      position: "bottom-right",
      rotation: -3
    }
  ]

  const renderProject = (project) => {
    const baseClasses = `project-mockup project-${project.type} project-${project.theme} project-${project.position}`
    const animationClass = isVisible ? 'animate-in' : ''

    if (project.type === 'mobile') {
      return (
        <div key={project.id} className={`${baseClasses} ${animationClass}`} style={{ transform: `rotate(${project.rotation}deg)` }}>
          <div className="mockup-frame mobile-frame">
            <div className="mockup-screen">
              <div className="mockup-header">
                <div className="status-bar">
                  <span className="time">9:41</span>
                  <div className="status-icons">
                    <span className="signal"></span>
                    <span className="wifi"></span>
                    <span className="battery"></span>
                  </div>
                </div>
              </div>
              <div className="mockup-content">
                <h3 className="mockup-title">{project.title}</h3>
                <p className="mockup-subtitle">{project.subtitle}</p>
                {project.image && (
                  <div className="mockup-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (project.type === 'website') {
      return (
        <div key={project.id} className={`${baseClasses} ${animationClass}`} style={{ transform: `rotate(${project.rotation}deg)` }}>
          <div className="mockup-frame website-frame">
            <div className="mockup-screen">
              <div className="website-header">
                <div className="website-nav">
                  <div className="logo">A</div>
                  <nav className="nav-links">
                    <a href="#">Services</a>
                    <a href="#">Workshops</a>
                    <a href="#">Our Team</a>
                  </nav>
                  <button className="cta-button">Request Consultation</button>
                </div>
              </div>
              <div className="website-content">
                <h2 className="website-title">{project.title}</h2>
                <p className="website-subtitle">{project.subtitle}</p>
                <p className="website-description">{project.description}</p>
                <div className="website-features">
                  <div className="feature-block">Training</div>
                  <div className="feature-block">Facilitation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (project.type === 'card') {
      return (
        <div key={project.id} className={`${baseClasses} ${animationClass}`} style={{ transform: `rotate(${project.rotation}deg)` }}>
          <div className="mockup-frame card-frame">
            <div className="mockup-screen">
              {project.theme === 'white' ? (
                <div className="white-card-content">
                  <div className="keyword-list">
                    <div className="keyword">STRATEGY</div>
                    <div className="keyword">AI</div>
                    <div className="keyword">MOTION</div>
                    <div className="keyword">WEB</div>
                    <div className="keyword">BRAND</div>
                    
                  </div>
                </div>
              ) : (
                <div className="dark-card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-subtitle">{project.subtitle}</p>
                  <div className="geometric-shapes">
                    <div className="shape circle"></div>
                    <div className="shape square"></div>
                    <div className="shape triangle"></div>
                    <div className="shape grid-lines"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <section ref={sectionRef} className="projects-showcase-section">
      <div className="projects-showcase-container">
        <div className="projects-showcase-header">
          <h2 className="projects-showcase-title">OUR PROJECTS</h2>
          <p className="projects-showcase-subtitle">Creative solutions that make a difference</p>
        </div>
        
        <div className="projects-showcase-grid">
          {projects.map(project => renderProject(project))}
        </div>
      </div>
    </section>
  )
}

export default ProjectSection
