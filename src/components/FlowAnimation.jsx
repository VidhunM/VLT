import React, { useEffect, useState } from 'react'

const FlowAnimation = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Trigger animation when user is near bottom of page
      if (scrollPosition + windowHeight >= documentHeight - 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`flow-animation ${isVisible ? 'visible' : ''}`}>
      <div className="flow-container">
        <div className="flow-content">
          <h2 className="flow-title">Ready to Start Your Project?</h2>
          <p className="flow-description">
            Let's bring your vision to life with our expertise in web development, 
            mobile apps, and UI/UX design.
          </p>
          <div className="flow-buttons">
            <button className="flow-btn primary">
              <span>Get Started</span>
              <div className="btn-icon orange-dots"></div>
            </button>
            <button className="flow-btn secondary">
              <span>View Our Work</span>
              <div className="btn-icon white-dots"></div>
            </button>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="flow-background">
          <div className="flow-circle circle-1"></div>
          <div className="flow-circle circle-2"></div>
          <div className="flow-circle circle-3"></div>
          <div className="flow-line line-1"></div>
          <div className="flow-line line-2"></div>
        </div>
      </div>
    </div>
  )
}

export default FlowAnimation
