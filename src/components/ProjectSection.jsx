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
      position: "far-left",
      offsetX: "clamp(-460px, -42vw, -320px)",
      offsetY: "clamp(50px, 8vw, 90px)",
      rotation: -30,
      zIndex: 2
    },
    {
      id: 2,
      title: "CORRIDOR",
      subtitle: "The Corridor is a new gallery to discover unique, one-of-a-kind works of art.",
      type: "mobile",
      theme: "dark",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      position: "left",
      offsetX: "clamp(-320px, -30vw, -200px)",
      offsetY: "clamp(20px, 2vw, 50px)",
      rotation: -18,
      zIndex: 3
    },
    {
      id: 3,
      title: "AMANAH",
      subtitle: "Building conflict resilient communities.",
      description: "In a world where unresolved conflicts and ineffective communication can lead to harm and disconnection, we provide tools for healthy relationships and effective communication.",
      type: "website",
      theme: "light",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      position: "center-left",
      offsetX: "clamp(-180px, -18vw, -100px)",
      offsetY: "clamp(-20px, -4vw, 20px)",
      rotation: -6,
      zIndex: 5
    },
    {
      id: 4,
      title: "ATLAS",
      subtitle: "An immersive app that lets teams explore design systems in context.",
      type: "mobile",
      theme: "dark",
      image: "https://images.unsplash.com/photo-1604079628040-94301bb21b14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      position: "center-right",
      offsetX: "clamp(100px, 18vw, 190px)",
      offsetY: "clamp(-20px, -4vw, 20px)",
      rotation: 6,
      zIndex: 5
    },
    {
      id: 5,
      title: "STRATEGY",
      subtitle: "AI • MOTION • WEB • BRAND • STRATEGY • AI • MOTION • WEB",
      type: "card",
      theme: "white",
      position: "right",
      offsetX: "clamp(230px, 30vw, 340px)",
      offsetY: "clamp(20px, 2vw, 50px)",
      rotation: 18,
      zIndex: 5
    },
    {
      id: 6,
      title: "GEOMETRIC",
      subtitle: "Design System",
      type: "card",
      theme: "dark",
      position: "far-right",
      offsetX: "clamp(360px, 42vw, 480px)",
      offsetY: "clamp(50px, 8vw, 90px)",
      rotation: 30,
      zIndex: 6
    }
  ]

  const renderProject = (project) => {
    const baseClasses = `project-mockup project-${project.type} project-${project.theme} project-${project.position}`
    const animationClass = isVisible ? 'animate-in' : ''
    const cardStyle = {
      '--card-translate-x': typeof project.offsetX === 'number' ? `${project.offsetX}px` : project.offsetX,
      '--card-translate-y': typeof project.offsetY === 'number' ? `${project.offsetY}px` : project.offsetY,
      '--card-rotate': `${project.rotation ?? 0}deg`,
      '--card-z-index': `${project.zIndex ?? 1}`
    }

    if (project.type === 'mobile') {
      return (
        <div key={project.id} className={`${baseClasses} ${animationClass}`} style={cardStyle}>
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
        <div key={project.id} className={`${baseClasses} ${animationClass}`} style={cardStyle}>
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
        <div key={project.id} className={`${baseClasses} ${animationClass}`} style={cardStyle}>
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