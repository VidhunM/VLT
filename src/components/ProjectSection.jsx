import React, { useEffect, useRef, useState } from 'react'
import './ProjectSection.css'

const ProjectSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      id: 1,
      type: 'mobile',
      img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=900&auto=format&fit=crop',
      style: { left: '-200px', top: '120px', rotate: '-15deg', zIndex: 1 },
    },
    {
      id: 2,
      type: 'website',
      img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=900&auto=format&fit=crop',
      style: { left: '0px', top: '40px', rotate: '-3deg', zIndex: 3 },
    },
    {
      id: 3,
      type: 'text',
      text: ['BRAND', 'STRATEGY', 'AI', 'MOTION', 'WEB', 'BRAND', 'STRATEGY', 'AI', 'MOTION', 'WEB'],
      style: { left: '360px', top: '60px', rotate: '5deg', zIndex: 2 },
    },
    {
      id: 4,
      type: 'dark',
      img: 'https://images.unsplash.com/photo-1602526210235-9f4b7e8c8a46?q=80&w=900&auto=format&fit=crop',
      style: { left: '600px', top: '100px', rotate: '-4deg', zIndex: 1 },
    },
  ]

  return (
    <section ref={sectionRef} className="projects-section">
      <div className={`projects-container ${isVisible ? 'visible' : ''}`}>
        {projects.map((p) => (
          <div
            key={p.id}
            className={`project-card ${p.type}`}
            style={{
              ...p.style,
              transform: `rotate(${p.style.rotate}) translateZ(${p.style.zIndex * 40}px)`,
            }}
          >
            {p.type === 'text' ? (
              <div className="text-card">
                {p.text.map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </div>
            ) : (
              <img src={p.img} alt={p.type} className="card-image" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectSection
