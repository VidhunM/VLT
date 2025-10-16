import React from 'react'
import ProjectCard from '../components/ProjectCard'

const Work = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce solution with advanced features and seamless user experience.",
      category: "Web Development",
      link: "#"
    },
    {
      title: "Brand Identity",
      description: "Complete brand identity design for a tech startup including logo, colors, and guidelines.",
      category: "Branding",
      link: "#"
    },
    {
      title: "Mobile App Design",
      description: "User interface design for a fitness tracking mobile application.",
      category: "UI/UX Design",
      link: "#"
    },
    {
      title: "Corporate Website",
      description: "Professional website design and development for a consulting firm.",
      category: "Web Design",
      link: "#"
    }
  ]

  return (
    <div className="page work">
      <section className="work-hero">
        <div className="container">
          <h1>Our Work</h1>
          <p>Explore our portfolio of creative projects and digital solutions.</p>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Work
