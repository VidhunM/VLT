import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/" className="nav-logo">
            <img src="/assets/Images/Vultureline_img1.png" alt="Vulture Lines" className="logo-image" />
          </Link>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/our-service" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Our Service
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/work" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/our-team" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Our Team
            </Link>
          </li>
          <li className="nav-item">
            <a href="#feed" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Our Feed
            </a>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
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
