import React, { useState, useEffect } from 'react'
import MinimalistNav from '../components/MinimalistNav'
import ProjectSection from '../components/ProjectSection'
import FlowAnimation from '../components/FlowAnimation'

const PROJECTS = [
  {
    title: 'ACTIVE RESEARCH COLLECTIVE®',
    category: 'DTC, Health & Wellness',
    link: '#',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
  },
  {
    title: 'LUDEO®',
    category: 'Tech, Gaming',
    link: '#',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  },
  {
    title: 'KTM AGENCY',
    category: 'Agency, PR',
    link: '#',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'NEIGHBORS & FRIENDS',
    category: 'Food & Beverage',
    link: '#',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'FOUNDRSPACE COWORKING',
    category: 'Real Estate, Business',
    link: '#',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
  },
  {
    title: 'ILLUMINATION FOUNDATION',
    category: 'Nonprofit',
    link: '#',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
]

const Work = () => {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    if (hoveredProject !== null) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [hoveredProject])

  return (
    <div className="page work">
      <MinimalistNav />
      {/* Projects Showcase Section */}
      <section id="projects">
        <ProjectSection />
      </section>
      {/* Projects List Section */}
      <section className="work-projects-list">
        <div className="work-projects-list-container">
          <div className="work-projects-header">
            <h2 className="work-projects-title">RECENT WORK</h2>
          </div>
          {PROJECTS.map((project, index) => (
            <React.Fragment key={index}>
              <div 
                className="work-project-item"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="work-project-name">{project.title}</div>
                <div className="work-project-category">{project.category}</div>
                <a href={project.link} className="work-project-link">VIEW PROJECT</a>
              </div>
              {index < PROJECTS.length - 1 && <div className="work-project-divider"></div>}
            </React.Fragment>
          ))}
        </div>
        
        {/* Project Image - Follows Cursor */}
        {hoveredProject !== null && (
          <div 
            className="work-project-image-follow"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
            }}
          >
            <div className="work-project-image-container-small">
              <img 
                src={PROJECTS[hoveredProject].image} 
                alt={PROJECTS[hoveredProject].title}
                className="work-project-image-small"
              />
              <div className="work-project-image-badge-small">
                <span className="badge-text-small">R</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Flow Animation */}
      <FlowAnimation />
    </div>
  )
}

export default Work

