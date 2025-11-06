import React, { useEffect, useRef, useState } from 'react'
import MinimalistNav from '../components/MinimalistNav'
import FlowAnimation from '../components/FlowAnimation'

const OurTeam = () => {
  const boardSectionRef = useRef(null)
  const boardWrapperRef = useRef(null)
  const sliderRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedDirector, setSelectedDirector] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isMobile, setIsMobile] = useState(false)
  const [isSectionInView, setIsSectionInView] = useState(false)
  const [cardWidth, setCardWidth] = useState(520) // Default desktop width

  const boardMembers = [
    {
      name: "Robert Chen",
      position: "Chairman",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Experienced leader with 20+ years in technology and business strategy.",
      details: {
        experience: "20+ years in technology leadership",
        education: "MBA from Harvard Business School",
        expertise: "Strategic planning, technology innovation, corporate governance",
        achievements: "Led 3 successful IPOs, founded 2 tech companies"
      }
    },
    {
      name: "Sarah Williams",
      position: "Vice Chairman",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Financial expert with extensive experience in corporate finance and risk management.",
      details: {
        experience: "15+ years in corporate finance",
        education: "CPA, CFA Charterholder",
        expertise: "Financial strategy, risk management, audit oversight",
        achievements: "Managed $2B+ in assets, reduced operational costs by 30%"
      }
    },
    {
      name: "Michael Thompson",
      position: "Independent Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Technology visionary with deep expertise in digital transformation and innovation.",
      details: {
        experience: "18+ years in technology and innovation",
        education: "PhD in Computer Science from MIT",
        expertise: "Digital transformation, AI/ML, cybersecurity",
        achievements: "Patented 12 technologies, led digital transformation for Fortune 500"
      }
    },
    {
      name: "Emily Rodriguez",
      position: "Independent Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Marketing and brand expert with proven track record in global market expansion.",
      details: {
        experience: "12+ years in marketing and brand management",
        education: "Master's in Marketing from Wharton",
        expertise: "Brand strategy, global marketing, customer experience",
        achievements: "Launched 5 successful global brands, increased market share by 40%"
      }
    },
    {
      name: "David Park",
      position: "Independent Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Operations specialist with expertise in scaling businesses and operational excellence.",
      details: {
        experience: "16+ years in operations and supply chain",
        education: "MBA in Operations Management from Stanford",
        expertise: "Operations strategy, supply chain optimization, process improvement",
        achievements: "Reduced operational costs by 25%, improved efficiency by 35%"
      }
    }
  ]

  const teamMembers = [
    {
      name: "Alex Morgan",
      position: "CEO & Founder",
      bio: "With over 10 years of experience in digital solutions, Alex leads our team with vision and innovation.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Commercial Team"
    },
    {
      name: "Sarah Johnson",
      position: "Creative Director",
      bio: "Sarah brings creativity and strategic thinking to every project, ensuring exceptional design outcomes.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Commercial Team"
    },
    {
      name: "Michael Chen",
      position: "Lead Developer",
      bio: "Michael specializes in full-stack development and is passionate about creating robust, scalable solutions.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Project Team"
    },
    {
      name: "Emily Rodriguez",
      position: "UX/UI Designer",
      bio: "Emily focuses on user-centered design, creating intuitive and engaging experiences for our clients.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Project Team"
    },
    {
      name: "David Wilson",
      position: "Project Manager",
      bio: "David ensures seamless project execution and client satisfaction through effective communication and planning.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Project Team"
    },
    {
      name: "Jessica Lee",
      position: "Marketing Specialist",
      bio: "Jessica drives our brand presence and client engagement through strategic marketing initiatives.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      team: "Commercial Team"
    }
  ]

  const filteredTeamMembers = activeFilter === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.team === activeFilter)

  // Check mobile on mount and resize, and measure card width
  useEffect(() => {
    const measureCardWidth = () => {
      if (sliderRef.current) {
        const firstCard = sliderRef.current.querySelector('.board-member-card')
        if (firstCard) {
          const cardRect = firstCard.getBoundingClientRect()
          const sliderStyle = window.getComputedStyle(sliderRef.current)
          const isMobileDevice = window.innerWidth <= 768
          
          // On mobile, cards are full-width with no gap
          // On desktop, include gap for translation calculation
          if (isMobileDevice) {
            // On mobile, card width is viewport width (cards are full-width)
            const newCardWidth = window.innerWidth
            if (newCardWidth > 0) {
              setCardWidth(prev => {
                if (prev !== newCardWidth) {
                  return newCardWidth
                }
                return prev
              })
            }
          } else {
            const gap = parseFloat(sliderStyle.gap) || 40 // Default gap if not found
            // Card width includes the gap to next card for translation calculation
            const newCardWidth = cardRect.width + gap
            if (newCardWidth > 0) {
              setCardWidth(prev => {
                if (prev !== newCardWidth) {
                  return newCardWidth
                }
                return prev
              })
            }
          }
        }
      }
    }
    
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      measureCardWidth()
    }
    
    checkMobile()
    
    // Re-measure after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkMobile, 100)
    const timeoutId2 = setTimeout(checkMobile, 500) // Second measurement to be sure
    
    window.addEventListener('resize', checkMobile, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    const measureCardWidth = () => {
      if (sliderRef.current) {
        const firstCard = sliderRef.current.querySelector('.board-member-card')
        if (firstCard) {
          const cardRect = firstCard.getBoundingClientRect()
          const sliderStyle = window.getComputedStyle(sliderRef.current)
          const isMobileDevice = window.innerWidth <= 768
          
          // On mobile, cards are full-width with no gap
          // On desktop, include gap for translation calculation
          if (isMobileDevice) {
            // On mobile, card width is viewport width (cards are full-width)
            const newCardWidth = window.innerWidth
            if (newCardWidth > 0) {
              setCardWidth(prev => prev !== newCardWidth ? newCardWidth : prev)
            }
          } else {
            const gap = parseFloat(sliderStyle.gap) || 40
            const newCardWidth = cardRect.width + gap
            if (newCardWidth > 0) {
              setCardWidth(prev => prev !== newCardWidth ? newCardWidth : prev)
            }
          }
        }
      }
    }
    
    const handleScroll = () => {
      if (boardSectionRef.current) {
        // Measure card width on first scroll if not measured yet
        if (cardWidth === 520) {
          measureCardWidth()
        }
        
        const rect = boardSectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Check if mobile device
        const isMobileDevice = window.innerWidth <= 768
        
        // Simple scroll progress calculation that works for both desktop and mobile
        // Calculate when section is in viewport
        const sectionTop = rect.top
        const sectionBottom = rect.bottom
        const sectionHeight = rect.height
        
        // If section is in viewport
        if (sectionTop < windowHeight && sectionBottom > 0) {
          // Mark section as in view for animation trigger
          setIsSectionInView(true)
          
          // Calculate how much of the section is visible
          const visibleHeight = Math.min(sectionBottom, windowHeight) - Math.max(sectionTop, 0)
          
          // Progress from 0 to 1 as section moves through viewport
          let progress = 1 - (sectionBottom / (windowHeight + sectionHeight))
          progress = Math.min(Math.max(progress, 0), 1)
          
          let adjustedProgress = 0
          
          // On mobile, implement the new scroll behavior:
          // 1. Initially, section appears fully in view
          // 2. Enable image-by-image scrolling where only images move
          // 3. After final image, section comes back into full view
          if (isMobileDevice) {
            const totalCards = boardMembers.length
            
            // Define scroll phases:
            // Phase 1 (0-25%): Section fully visible, no movement
            // Phase 2 (25-75%): Image-by-image scrolling
            // Phase 3 (75-100%): Section fully visible again
            
            if (progress < 0.25) {
              // Phase 1: Keep first image fully visible (no movement)
              adjustedProgress = 0
            } else if (progress < 0.75) {
              // Phase 2: Image-by-image scrolling
              // Map 25-75% progress to 0 to (totalCards-1)
              const phaseProgress = (progress - 0.25) / 0.5
              adjustedProgress = phaseProgress * (totalCards - 1)
            } else {
              // Phase 3: Keep last image fully visible (no movement)
              adjustedProgress = totalCards - 1
            }
          } else {
            // Desktop: First 25% of scroll progress: keep first image stuck (translateX = 0)
            // After 25%: start translating image by image
            const stickyThreshold = 0.25
            
            if (progress > stickyThreshold) {
              // Map remaining 75% progress to card indices (0 to totalCards - 1)
              const remainingProgress = (progress - stickyThreshold) / (1 - stickyThreshold)
              const totalCards = boardMembers.length
              // Calculate which card index to show (0 = first card, totalCards-1 = last card)
              // This will be used to calculate pixel translation
              adjustedProgress = remainingProgress * (totalCards - 1)
            }
          }
          
          setScrollProgress(adjustedProgress)
        } else if (sectionTop >= windowHeight) {
          // Section not yet reached
          setScrollProgress(0)
          setIsSectionInView(false)
        } else if (sectionBottom <= 0) {
          // Section fully scrolled past - show last image
          const totalCards = boardMembers.length
          setScrollProgress(totalCards - 1)
          setIsSectionInView(true)
        }
      }
    }

    // Initial call
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [cardWidth, boardMembers.length])

  const handleDirectorClick = (director) => {
    setSelectedDirector(director)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDirector(null)
  }

  return (
    <div className="page our-team">
      <MinimalistNav />
      
      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-hero-background">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="Professional team in office" />
        </div>
        <div className="team-hero-overlay">
          <div className="team-hero-content">
            <h1 className="team-hero-title">We are Vulture Lines.</h1>
            <div className="team-hero-actions">
              <button className="btn-join-team-hero">
                <span>Join The Team</span>
                <div className="btn-icon orange-dots"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="board-section" ref={boardSectionRef}>
        <div className="board-container">
          <div className="board-header">
            <h2 className="board-title">Board of Directors</h2>
          </div>
          <div className="board-members-container">
            <div 
              ref={sliderRef}
              className="board-members-slider"
              style={{
                // Calculate translateX based on scroll progress
                // scrollProgress: 0 = first image stuck, 0 to (totalCards-1) = card index to show
                // Translate by card index * cardWidth (including gap) to show images one by one
                transform: `translateX(-${scrollProgress * cardWidth}px)`,
                transition: isMobile ? 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {boardMembers.map((member, index) => (
                <div key={index} className="board-member-card">
                  <div 
                    className="board-member-image"
                    onClick={() => handleDirectorClick(member)}
                  >
                    <img src={member.image} alt={member.name} />
                    <div className="hover-dot">
                      <div className="dot-content">
                        <p className="dot-bio">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                  <div className="board-member-info">
                    <h3 className="board-member-name">{member.name}</h3>
                    <p className="board-member-position">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="team-members-section">
        <div className="team-members-container">
          <div className="team-header">
            <h2 className="team-section-title">Meet your team</h2>
            <div className="team-filters">
              <button 
                className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
                onClick={() => setActiveFilter('All')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'Commercial Team' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Commercial Team')}
              >
                Commercial Team
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'Project Team' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Project Team')}
              >
                Project Team
              </button>
            </div>
          </div>
          <div className="team-grid">
            {filteredTeamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-social">
                    <a href={member.social.linkedin} className="social-link">LinkedIn</a>
                    <a href={member.social.twitter} className="social-link">Twitter</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="team-values-section">
        <div className="team-values-container">
          <h2 className="values-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Innovation</h3>
              <p>We constantly push boundaries to deliver cutting-edge solutions.</p>
            </div>
            <div className="value-item">
              <h3>Collaboration</h3>
              <p>Teamwork is at the heart of everything we create.</p>
            </div>
            <div className="value-item">
              <h3>Excellence</h3>
              <p>We strive for perfection in every project we undertake.</p>
            </div>
            <div className="value-item">
              <h3>Integrity</h3>
              <p>Trust and transparency guide our relationships with clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="team-cta-section">
        <div className="team-cta-container">
          <h2>Join Our Team</h2>
          <p>We're always looking for talented individuals to join our growing team.</p>
          <button className="cta-button">View Open Positions</button>
        </div>
      </section>

      {/* Director Details Modal */}
      {isModalOpen && selectedDirector && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="director-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedDirector.image} alt={selectedDirector.name} />
              </div>
              <div className="modal-info">
                <h2 className="modal-name">{selectedDirector.name}</h2>
                <p className="modal-position">{selectedDirector.position}</p>
                <div className="modal-details">
                  <div className="detail-item">
                    <h4>Experience</h4>
                    <p>{selectedDirector.details.experience}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Education</h4>
                    <p>{selectedDirector.details.education}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Expertise</h4>
                    <p>{selectedDirector.details.expertise}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Key Achievements</h4>
                    <p>{selectedDirector.details.achievements}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flow Animation */}
      <FlowAnimation />
    </div>
  )
}

export default OurTeam