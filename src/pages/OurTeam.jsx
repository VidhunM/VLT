import React, { useEffect, useRef, useState } from 'react'
import MinimalistNav from '../components/MinimalistNav'
import FlowAnimation from '../components/FlowAnimation'

const OurTeam = () => {
  const boardSectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedDirector, setSelectedDirector] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

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

  useEffect(() => {
    const handleScroll = () => {
      if (boardSectionRef.current) {
        const rect = boardSectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Check if mobile device
        const isMobile = window.innerWidth <= 768
        
        // Calculate scroll progress - simplified for mobile
        if (isMobile) {
          // On mobile, use simpler calculation based on section visibility
          const sectionTop = rect.top
          const sectionHeight = rect.height
          
          // Start scrolling when section enters viewport
          if (sectionTop <= 0 && rect.bottom > windowHeight) {
            // Calculate progress based on how far scrolled into section
            const scrolledIntoView = Math.abs(sectionTop)
            const maxScroll = sectionHeight - windowHeight
            
            let rawProgress = Math.min(Math.max(scrolledIntoView / maxScroll, 0), 1)
            
            // Reduce scroll sensitivity by 50% on mobile (makes it scroll 2x slower)
            rawProgress = rawProgress * 0.5
            
            // Apply ease-out function for smoother deceleration
            rawProgress = 1 - Math.pow(1 - rawProgress, 2.5)
            
            setScrollProgress(rawProgress)
            // Debug log - remove in production
            // if (Math.floor(rawProgress * 100) % 10 === 0) {
            //   console.log('Mobile scroll progress:', rawProgress.toFixed(2))
            // }
          } else if (rect.bottom <= windowHeight) {
            // Section fully scrolled past
            setScrollProgress(0.5)
          } else if (sectionTop > 0) {
            // Section not yet reached
            setScrollProgress(0)
          }
        } else {
          // Desktop calculation
          const scrollStart = rect.top
          const scrollEnd = rect.bottom - windowHeight
          const scrollRange = scrollEnd - scrollStart
          
          if (scrollStart <= 0 && scrollEnd >= 0) {
            const progress = Math.min(Math.max(-scrollStart / scrollRange, 0), 1)
            setScrollProgress(progress)
          }
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
  }, [])

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
              className="board-members-slider"
              style={{
                transform: `translateX(-${scrollProgress * 100}%)`
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