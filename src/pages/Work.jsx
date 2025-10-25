import React, { useRef, useEffect, useState } from 'react'
import MinimalistNav from '../components/MinimalistNav'
import ProjectSection from '../components/ProjectSection'
import StatisticsSection from '../components/StatisticsSection'
import FlowAnimation from '../components/FlowAnimation'

const PROJECTS = [
  {
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Active Research Collective',
    category: 'DTC, HEALTH & WELLNESS • 1-MONTH',
    title: 'ACTIVE RESEARCH COLLECTIVE®',
    description:
      `A new wellness brand thoughtfully built from the ground up with purpose and precision. We carefully crafted ARC's website, store, packaging, and Amazon FBA assets to ensure it can confidently compete alongside the biggest and most established names in the supplement space.`,
    link: '#',
    right: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Ludeo VR Platform',
    category: 'TECH, STARTUP • 1-MONTH',
    title: 'LUDEO®',
    description: 'When Ludeo came to us, they already had a strong and well-established visual identity along with a clear and detailed roadmap. What they needed was a website that could effectively communicate their innovative VR technology platform to potential clients and partners.',
    link: '#',
    right: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Stanford Research App',
    category: 'EDUCATION, RESEARCH • 2-MONTHS',
    title: 'STANFORD RESEARCH APP',
    description: 'Stanford Research App enables collaboration for research teams to conduct data-collection and share results. We built an intuitive, scalable React-based platform with custom dashboards, secure user portals, and API integration.',
    link: '#',
    right: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Salvation Army Portal',
    category: 'NONPROFIT, HEALTH • 3-MONTHS',
    title: 'THE SALVATION ARMY PORTAL',
    description: 'A robust management portal for The Salvation Army, allowing multiple branches to manage logistics, volunteers, and reporting. Custom role-based dashboards and a mobile companion increased nationwide response efficiency.',
    link: '#',
    right: true,
  },
]

const Work = () => {
  const blocksRef = useRef([])
  const imageRefs = useRef([])
  const [visible, setVisible] = useState(Array(PROJECTS.length).fill(false))

  useEffect(() => {
    const observers = []
    blocksRef.current.forEach((el, idx) => {
      if (!el) return
      observers[idx] = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => {
              if (prev[idx]) return prev
              const nv = [...prev]; nv[idx] = true; return nv
            })
            observers[idx]?.disconnect()
          }
        },
        { threshold: 0.2 }
      )
      observers[idx].observe(el)
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  // Zoom animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      imageRefs.current.forEach((img) => {
        if (!img) return
        
        const rect = img.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        
        // Calculate visibility percentage (0 to 1)
        const visibleTop = Math.max(0, rect.top)
        const visibleBottom = Math.min(viewportHeight, rect.bottom)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const totalHeight = rect.height
        const visibilityRatio = visibleHeight / totalHeight
        
        // Calculate scale based on position in viewport
        // When entering/leaving viewport: scale down, when in center: scale up
        const centerY = (rect.top + rect.bottom) / 2
        const distanceFromCenter = Math.abs(centerY - viewportHeight / 2)
        const maxDistance = viewportHeight / 2
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1)
        
        // Scale range: 1.0 (center) to 0.95 (edges)
        const scale = 1.15 - (normalizedDistance * 0.2)
        
        // Only apply if element is visible
        if (visibilityRatio > 0) {
          img.style.transform = `scale(${scale})`
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="page work">
      <MinimalistNav />
      {/* Projects Showcase Section */}
      <section id="projects">
        <ProjectSection />
      </section>
      {/* Animated Zigzag Case Studies */}
      <div className="work-case-studies">
        {PROJECTS.map((p, i) => (
          <div
            ref={el => (blocksRef.current[i] = el)}
            key={i}
            className={`project-case-study${p.right ? ' reverse' : ''}${visible[i] ? ' animate-in' : ''}`}
          >
            <div className="project-image-section">
              <img 
                ref={el => (imageRefs.current[i] = el)}
                src={p.img} 
                alt={p.alt} 
                className="zoom-on-scroll"
              />
            </div>
            <div className="project-content-section">
              <div className="project-category">{p.category}</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-description">{p.description}</p>
              <a href={p.link} className="project-link">VIEW PROJECT →</a>
            </div>
        </div>
            ))}
          </div>
    </div>
  )
}

export default Work

