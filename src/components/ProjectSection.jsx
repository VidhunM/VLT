import React, { useEffect, useRef, useState } from 'react'
import '../styles/projectShowcase.css'

const VISIBLE_SLOTS = 5
const SWING_INTERVAL = 5200
const SWING_START_DELAY = 1200
const HIT_DELAY_STEP = 0.08

const SLOT_PRESETS = [
  {
    x: 'clamp(-360px, -32vw, -220px)',
    y: 'clamp(140px, 8vw, 60px)',
    rotate: -18,
    scale: 0.92,
    z: 2
  },
  {
    x: 'clamp(-170px, -18vw, -40px)',
    y: 'clamp(70px, 5vw, 20px)',
    rotate: -8,
    scale: 0.95,
    z: 3
  },
  {
    x: 'clamp(0px, 0vw, 0px)',
    y: 'clamp(0px, 0vw, -10px)',
    rotate: 0,
    scale: 1,
    z: 6
  },
  {
    x: 'clamp(190px, 18vw, 40px)',
    y: 'clamp(70px, 5vw, 20px)',
    rotate: 6,
    scale: 0.95,
    z: 4
  },
  {
    x: 'clamp(360px, 32vw, 220px)',
    y: 'clamp(140px, 8vw, 60px)',
    rotate: 14,
    scale: 0.9,
    z: 3
  }
]

const HIDDEN_LEFT_PRESET = {
  x: 'clamp(-640px, -48vw, -420px)',
  y: 'clamp(190px, 12vw, 90px)',
  rotate: -24,
  scale: 0.88,
  z: 1
}

const HIDDEN_RIGHT_PRESET = {
  x: 'clamp(640px, 48vw, 420px)',
  y: 'clamp(190px, 12vw, 90px)',
  rotate: 20,
  scale: 0.88,
  z: 1
}

const initializeSlots = (count) =>
  Array.from({ length: count }, (_, idx) => {
    if (idx === 0) return -1
    return Math.min(idx - 1, VISIBLE_SLOTS - 1)
  })

const shiftSlots = (slots, direction) =>
  slots.map((slot) => {
    if (direction === 'left') {
      if (slot === -1) return 0
      if (slot >= 0 && slot < VISIBLE_SLOTS) {
        return slot === VISIBLE_SLOTS - 1 ? VISIBLE_SLOTS : slot + 1
      }
      return slot
    }

    if (slot === VISIBLE_SLOTS) return VISIBLE_SLOTS - 1
    if (slot >= 0 && slot < VISIBLE_SLOTS) {
      return slot === 0 ? -1 : slot - 1
    }
    return slot
  })

const getSlotPreset = (slot) => {
  if (slot === -1) return HIDDEN_LEFT_PRESET
  if (slot === VISIBLE_SLOTS) return HIDDEN_RIGHT_PRESET
  return SLOT_PRESETS[slot] ?? SLOT_PRESETS[SLOT_PRESETS.length - 1]
}

const getDelayMultiplier = (slot, direction) => {
  if (direction === 'left') {
    if (slot === VISIBLE_SLOTS) return VISIBLE_SLOTS + 1
    if (slot === -1) return 0
    return slot + 1
  }

  if (slot === -1) return VISIBLE_SLOTS + 1
  if (slot === VISIBLE_SLOTS) return 0
  return VISIBLE_SLOTS - slot
}

const ProjectSection = () => {
  const projects = [
    {
      id: 1,
      title: 'G',
      subtitle: 'Community Gallery',
      type: 'mobile',
      theme: 'gradient',
      image:
        'https://images.unsplash.com/photo-1574285013029-29296a71930e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
      position: 'far-left'
    },
    {
      id: 2,
      title: 'CORRIDOR',
      subtitle:
        'The Corridor is a new gallery to discover unique, one-of-a-kind works of art.',
      type: 'mobile',
      theme: 'dark',
      image:
        'https://images.unsplash.com/photo-1564754943164-e83c08469116?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
      position: 'left'
    },
    {
      id: 3,
      title: 'AMANAH',
      subtitle: 'Building conflict resilient communities.',
      description:
        'In a world where unresolved conflicts and ineffective communication can lead to harm and disconnection, we provide tools for healthy relationships and effective communication.',
      type: 'website',
      theme: 'light',
      image:
        'https://images.unsplash.com/photo-1531966662811-c6501e46eda6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
      position: 'center-left'
    },
    {
      id: 4,
      title: 'ATLAS',
      subtitle: 'An immersive app that lets teams explore design systems in context.',
      type: 'mobile',
      theme: 'dark',
      image:
        'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
      position: 'center-right'
    },
    {
      id: 5,
      title: 'STRATEGY',
      subtitle: 'AI • MOTION • WEB • BRAND • STRATEGY • AI • MOTION • WEB',
      type: 'card',
      theme: 'white',
      image:
        'https://images.unsplash.com/photo-1530236668220-b9c6c098c9aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
      position: 'right'
    },
    {
      id: 6,
      title: 'GEOMETRIC',
      subtitle: 'Design System',
      type: 'card',
      theme: 'dark',
      image:
        'https://images.unsplash.com/photo-1564698010692-0fe284aae806?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZlcnRpY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
      position: 'far-right'
    }
  ]

  const [isVisible, setIsVisible] = useState(false)
  const [slotMap, setSlotMap] = useState(() => initializeSlots(projects.length))
  const [swingDirection, setSwingDirection] = useState('left')
  const [isMobile, setIsMobile] = useState(false)

  const sectionRef = useRef(null)
  const directionRef = useRef('left')
  const swingTimeoutRef = useRef(null)

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

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
    if (!isVisible || isMobile) {
      if (swingTimeoutRef.current) {
        clearTimeout(swingTimeoutRef.current)
        swingTimeoutRef.current = null
      }
      directionRef.current = 'left'
      setSwingDirection('left')
      setSlotMap(initializeSlots(projects.length))
      return
    }

    const runSwing = () => {
      const currentDirection = directionRef.current
      setSwingDirection(currentDirection)
      setSlotMap((prev) => shiftSlots(prev, currentDirection))
      directionRef.current = currentDirection === 'left' ? 'right' : 'left'
      swingTimeoutRef.current = setTimeout(runSwing, SWING_INTERVAL)
    }

    swingTimeoutRef.current = setTimeout(runSwing, SWING_START_DELAY)

    return () => {
      if (swingTimeoutRef.current) {
        clearTimeout(swingTimeoutRef.current)
        swingTimeoutRef.current = null
      }
    }
  }, [isVisible, projects.length, isMobile])

  const renderAnimatedProject = (project, index) => {
    const baseClasses = `project-mockup project-${project.type} project-${project.theme} project-${project.position}`
    const animationClass = isVisible ? 'animate-in' : ''

    const slotIndex = slotMap[index] ?? 0
    const slotPreset = getSlotPreset(slotIndex)
    const delayMultiplier = getDelayMultiplier(slotIndex, swingDirection)

    const cardStyle = {
      '--card-base-translate-x': slotPreset.x,
      '--card-base-translate-y': slotPreset.y,
      '--card-base-rotate': `${slotPreset.rotate ?? 0}deg`,
      '--card-base-scale': slotPreset.scale ?? 1,
      '--card-hit-delay': `${delayMultiplier * HIT_DELAY_STEP}s`,
      '--card-dynamic-translate-x': '0px',
      '--card-dynamic-translate-y': '0px',
      '--card-dynamic-rotate': '0deg',
      '--card-depth': slotPreset.z ?? 1,
      zIndex: slotPreset.z ?? 1
    }

    const imageUrl = project.image
    const altText = project.title ? `${project.title} visual` : 'Project visual'

    return (
      <div
        key={project.id}
        className={`${baseClasses} ${animationClass}`}
        style={cardStyle}
        data-slot={slotIndex}
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

  const renderGridProject = (project, index) => {
    const baseClasses = `project-mockup project-${project.type} project-${project.theme} project-${project.position}`
    
    const imageUrl = project.image
    const altText = project.title ? `${project.title} visual` : 'Project visual'

    return (
      <div
        key={project.id}
        className={`${baseClasses} grid-view`}
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
          <p className="projects-showcase-subtitle">
            Creative solutions that make a difference
          </p>
        </div>

        <div className="projects-showcase-stage">
          {isMobile 
            ? projects.map((project, index) => renderGridProject(project, index))
            : projects.map((project, index) => renderAnimatedProject(project, index))}
        </div>
      </div>
    </section>
  )
}

export default ProjectSection

