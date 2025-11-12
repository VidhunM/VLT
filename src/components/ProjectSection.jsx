import React, { useEffect, useRef, useState } from 'react'
import '../styles/projectShowcase.css'

const ProjectSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const animationFrameRef = useRef(null)

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

  useEffect(() => {
    if (!isVisible) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      cardsRef.current.forEach((card) => {
        if (!card) return
        card.style.setProperty('--card-dynamic-translate-x', '0px')
        card.style.setProperty('--card-dynamic-translate-y', '0px')
        card.style.setProperty('--card-dynamic-rotate', '0deg')
        if (card.dataset.baseZ) {
          card.style.zIndex = card.dataset.baseZ
        }
      })
      return
    }

    let start = null
    const period = 6000
    const directionalPush = 70
    const rippleSpacing = 0.16
    const rippleWidth = 0.45
    const followAmplitude = 14
    const liftAmplitude = 18
    const twoPi = Math.PI * 2
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp) => {
      if (start === null) {
        start = timestamp
      }

      const elapsed = timestamp - start
      const cycleProgress = (elapsed % period) / period
      const cycleIndex = Math.floor(elapsed / period)
      const activeSide = cycleIndex % 2 === 0 ? 'left' : 'right'
      const waveEnvelope = Math.sin(cycleProgress * Math.PI)
      const waveStrength = waveEnvelope <= 0 ? 0 : easeOutCubic(waveEnvelope)

      cardsRef.current.forEach((card, idx) => {
        if (!card) return

        const sequenceIndex =
          activeSide === 'right' ? cardsRef.current.length - 1 - idx : idx
        const activationRaw =
          (waveStrength - sequenceIndex * rippleSpacing) / rippleWidth
        const clampedActivation = Math.max(0, Math.min(1, activationRaw))
        const easedActivation = easeOutCubic(clampedActivation)
        const directionalMagnitude =
          (activeSide === 'right' ? 1 : -1) * directionalPush * easedActivation
        const lag = idx * 0.22
        const localTheta = cycleProgress * twoPi - lag
    const follower = Math.sin(localTheta) * followAmplitude * easedActivation

    const cardX = directionalMagnitude + follower
    const cardY = 0
        const rotateAdjustment =
          activeSide === 'right' ? easedActivation * 3 : -easedActivation * 3

        card.style.setProperty('--card-dynamic-translate-x', `${cardX}px`)
        card.style.setProperty('--card-dynamic-translate-y', `${cardY}px`)
        card.style.setProperty('--card-dynamic-rotate', `${rotateAdjustment}deg`)

        if (card.dataset.baseZ) {
          card.style.zIndex = card.dataset.baseZ
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isVisible])

  const projects = [
    {
      id: 1,
      title: "G",
      subtitle: "Community Gallery",
      type: "mobile",
      theme: "gradient",
      image: "https://images.unsplash.com/photo-1574285013029-29296a71930e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      position: "far-left",
      offsetX: "clamp(-1020px, -50vw, -320px)",
      offsetY: "clamp(120px, 10vw, 50px)",
      rotation: -30,
      zIndex: 2
    },
    {
      id: 2,
      title: "CORRIDOR",
      subtitle: "The Corridor is a new gallery to discover unique, one-of-a-kind works of art.",
      type: "mobile",
      theme: "dark",
      image: "https://images.unsplash.com/photo-1564754943164-e83c08469116?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      position: "left",
      offsetX: "clamp(-380px, -38vw, -200px)",
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
      image: "https://images.unsplash.com/photo-1531966662811-c6501e46eda6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      position: "center-left",
      offsetX: "clamp(-90px, -16vw, -90px)",
      offsetY: "clamp(-20px, -4vw, 20px)",
      rotation: -4,
      zIndex: 5
    },
    {
      id: 4,
      title: "ATLAS",
      subtitle: "An immersive app that lets teams explore design systems in context.",
      type: "mobile",
      theme: "dark",
      image: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      position: "center-right",
      offsetX: "clamp(220px, 16vw, 180px)",
      offsetY: "clamp(-18px, -4vw, 18px)",
      rotation: 6,
      zIndex: 5
    },
    {
      id: 5,
      title: "STRATEGY",
      subtitle: "AI • MOTION • WEB • BRAND • STRATEGY • AI • MOTION • WEB",
      type: "card",
      theme: "white",
      image: "https://images.unsplash.com/photo-1530236668220-b9c6c098c9aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      position: "right",
      offsetX: "clamp(520px, 28vw, 340px)",
      offsetY: "clamp(20px, 2vw, 50px)",
      rotation: 10,
      zIndex: 5
    },
    {
      id: 6,
      title: "GEOMETRIC",
      subtitle: "Design System",
      type: "card",
      theme: "dark",
      image: "https://images.unsplash.com/photo-1564698010692-0fe284aae806?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      position: "far-right",
      offsetX: "clamp(820px, 40vw, 480px)",
      offsetY: "clamp(50px, 8vw, 90px)",
      rotation: 20,
      zIndex: 6
    }
  ]

  const renderProject = (project, index) => {
    const baseClasses = `project-mockup project-${project.type} project-${project.theme} project-${project.position}`
    const animationClass = isVisible ? 'animate-in' : ''
    const cardStyle = {
      '--card-base-translate-x':
        typeof project.offsetX === 'number' ? `${project.offsetX}px` : project.offsetX,
      '--card-base-translate-y':
        typeof project.offsetY === 'number' ? `${project.offsetY}px` : project.offsetY,
      '--card-base-rotate': `${project.rotation ?? 0}deg`,
      '--card-dynamic-translate-x': '0px',
      '--card-dynamic-translate-y': '0px',
      '--card-dynamic-rotate': '0deg',
      zIndex: project.zIndex ?? 1
    }
    const setCardRef = (el) => {
      cardsRef.current[index] = el
    }

    const imageUrl = project.image
    const altText = project.title ? `${project.title} visual` : 'Project visual'

    return (
      <div
        key={project.id}
        className={`${baseClasses} ${animationClass}`}
        style={cardStyle}
        ref={setCardRef}
        data-base-z={project.zIndex ?? 1}
      >
        <div className="project-image-wrapper">
          {imageUrl ? (
            <img src={imageUrl} alt={altText} loading="lazy" />
          ) : (
            <div className="project-image-placeholder">
              {project.title && <span>{project.title}</span>}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="projects-showcase-section">
      <div className="projects-showcase-container">
        <div className="projects-showcase-header">
          <h2 className="projects-showcase-title">OUR PROJECTS</h2>
          <p className="projects-showcase-subtitle">Creative solutions that make a difference</p>
        </div>
        <div className="projects-showcase-stage">
          {projects.map((project, index) => renderProject(project, index))}
        </div>
      </div>
    </section>
  )
}

export default ProjectSection