import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ logoSrc, menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const { body } = document

    if (!body) return

    if (isMenuOpen) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }

    return () => {
      body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const resolvedLogo = logoSrc || '/assets/Images/Vultureline_img1.png'

  const defaultMenu = [
    { label: 'Home', href: '/' },
    { label: 'Our Service', href: '/our-service' },
    { label: 'Projects', href: '/work' },
    { label: 'Our Team', href: '/our-team' },
    { label: 'Our Feed', href: '/our-feed' },
    { label: 'Contact', href: '/contact' }
  ]

  const items = Array.isArray(menuItems) && menuItems.length ? menuItems : defaultMenu

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/" className="nav-logo">
            <img src={resolvedLogo} alt="Vulture Lines" className="logo-image" />
          </Link>
        </div>
        <div className="nav-actions">
          <button className="nav-circle-btn" onClick={toggleMenu}>
            <span className="circle-v">{isMenuOpen ? 'V' : '='}</span>
          </button>
        </div>
      </nav>
      <div className={`nav-overlay ${isMenuOpen ? 'nav-overlay-open' : ''}`} onClick={closeMenu}>
        <button className="nav-overlay-close" onClick={closeMenu} aria-label="Close navigation">
          V
        </button>
        <div className="nav-overlay-content" onClick={event => event.stopPropagation()}>
          <ul className="nav-menu">
            {items.map((item, idx) => (
              <li className="nav-item" key={`${item.label}-${idx}`}>
                {typeof item.href === 'string' && item.href.startsWith('#') ? (
                  <a href={item.href} className="nav-link" onClick={closeMenu}>
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.href || '/'} className="nav-link" onClick={closeMenu}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
