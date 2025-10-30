import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ logoSrc, menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
        <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          {items.map((item, idx) => (
            <li className="nav-item" key={`${item.label}-${idx}`}>
              {typeof item.href === 'string' && item.href.startsWith('#') ? (
                <a href={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>
              ) : (
                <Link to={item.href || '/'} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="nav-circle-btn" onClick={toggleMenu}>
            <span className="circle-v">V</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
