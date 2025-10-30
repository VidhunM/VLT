import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MinimalistNav = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('HOME')
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)

  const menuItems = [
    { name: 'HOME', href: '/', sectionId: 'home' },
    { name: 'OUR SERVICE', href: '#services', sectionId: 'services' },
    { name: 'PROJECTS', href: '/work', sectionId: 'projects' },
    { name: 'OUR FEED', href: '/our-feed', sectionId: 'feed' },
    { name: 'CONTACT', href: '/contact', sectionId: 'contact' }
  ]

  // Function to detect which section is currently in view
  const getActiveSection = () => {
    // Check current page route
    const currentPath = window.location.pathname
    
    // Handle different pages
    if (currentPath === '/work') return 'projects'
    if (currentPath === '/our-team') return 'team'
    if (currentPath === '/contact') return 'contact'
    
    // For home page, detect sections
    const sections = [
      { id: 'home', element: document.querySelector('.hero-three') },
      { id: 'services', element: document.querySelector('#services') },
      { id: 'projects', element: document.querySelector('#projects') },
      { id: 'feed', element: document.querySelector('#feed') },
      { id: 'contact', element: document.querySelector('#contact') }
    ]

    const scrollPosition = window.scrollY + window.innerHeight / 3
    let activeSection = 'home'

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      if (section.element) {
        const rect = section.element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height
        
        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          activeSection = section.id
          break
        }
        else if (scrollPosition > elementTop) {
          activeSection = section.id
        }
      }
    }
    
    return activeSection
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentPath = window.location.pathname
      let heroSection = null
      
      // Determine hero section based on current page
      if (currentPath === '/work') {
        heroSection = document.querySelector('.work-hero') || document.querySelector('.page.work')
      } else if (currentPath === '/our-team') {
        heroSection = document.querySelector('.team-hero') || document.querySelector('.our-team')
      } else if (currentPath === '/contact') {
        heroSection = document.querySelector('.contact-page-dark')
      } else {
        heroSection = document.querySelector('.hero-three')
      }
      
      const currentScrollY = window.scrollY
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }
      setLastScrollY(currentScrollY)
      
      // Show nav when scrolled past hero section or immediately on certain pages
      if (currentPath === '/contact') {
        // Always show nav on contact page
        setIsVisible(true)
      } else if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        
        if (currentScrollY > heroHeight * 0.8) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }

      // Update active section based on scroll position
      const currentActiveSection = getActiveSection()
      setActiveSection(currentActiveSection.toUpperCase())
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavClick = (item) => {
    // Handle navigation
    if (item.href.startsWith('/')) {
      // Route navigation - use React Router
      window.location.href = item.href
    } else if (item.href.startsWith('#')) {
      // Check if we're on home page for section scrolling
      const currentPath = window.location.pathname
      
      if (currentPath !== '/') {
        // Redirect to home page with hash
        window.location.href = '/' + item.href
      } else {
        // Smooth scroll to section on current page
        const sectionId = item.href.substring(1) // Remove '#' from href
        const element = document.getElementById(sectionId)
        
        if (element) {
          // Use scrollIntoView with offset for better UX
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - 80 // Account for nav height
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
          
          // Update active section immediately for better responsiveness
          setActiveSection(item.name)
        }
      }
    }
  }

  return (
    <div className={`minimalist-nav ${isVisible ? 'visible' : ''} ${scrollDirection === 'up' ? 'slide-up' : 'slide-down'}`}>
      <div className="minimalist-nav-container">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`nav-item ${activeSection === item.name ? 'active' : ''}`}
            onClick={() => handleNavClick(item)}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MinimalistNav
