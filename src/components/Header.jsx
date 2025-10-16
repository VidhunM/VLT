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
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Service
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/work" className="nav-link">
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Our Feed
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
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
