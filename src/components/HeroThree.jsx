import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { navigateWithCircle } from '../utils/navigation'

const HeroThree = () => {
  const [selectedProject, setSelectedProject] = useState(0)
  const navigate = useNavigate()
  
  const handleNavigationClick = (event, path) => {
    navigateWithCircle(event, path, () => {
      navigate(path)
    })
  }
  
  const projects = [
    {
      name: 'drone-technology ',
      bgImage: 'https://cdn.pixabay.com/photo/2022/06/13/09/11/dji-mini-3-pro-7259550_1280.jpg'
    },
    {
      name: 'artificial-intelligence',
      bgImage: 'https://cdn.pixabay.com/photo/2021/11/04/06/26/ai-6767501_1280.jpg'
    },
    {
      name: 'iot-development',
      bgImage: 'https://images.unsplash.com/photo-1553341640-6b28ff92098a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870'
    },
    {
      name: 'application-development',
      bgImage: 'https://images.pexels.com/photos/38544/imac-apple-mockup-app-38544.jpeg'
    }
  ]

  // Auto-rotate through projects every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedProject((prev) => (prev + 1) % projects.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [projects.length])

  return (
    <section className="hero-three">
      <div className="hero-background">
        <div 
          className="hero-bg-active" 
          style={{ backgroundImage: `url(${projects[selectedProject].bgImage})` }}
        ></div>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Experience Excellence with Vulturelines </h1>
          <p className="hero-description">
          With strategic design and Webflow development.
          </p>
        </div>
      </div>

      <div className="hero-sidebar">
        <div className="project-selector">
          {projects.map((project, index) => (
            <div 
              key={project.name}
              className={`project-item ${selectedProject === index ? 'active' : ''}`}
              onClick={() => setSelectedProject(index)}
            >
              <span className="project-name">{project.name}</span>
              <div className="project-indicator">
                <div className={`indicator-dot ${selectedProject === index ? 'active' : ''}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-actions">
        <button 
          className="btn btn-outline"
          onClick={(e) => handleNavigationClick(e, '/work')}
        >
          All Projects
        </button>
        <button 
          className="btn btn-outline-white"
          onClick={(e) => handleNavigationClick(e, '/our-service')}
        >
          Our Services
        </button>
      </div>
    </section>
  )
}

export default HeroThree
