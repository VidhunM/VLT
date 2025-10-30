import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Work from './pages/Work'
import OurTeam from './pages/OurTeam'
import Contact from './pages/Contact'
import CustomCursor from './components/CustomCursor'
import OurService from './pages/OurService'
import OurFeed from './pages/OurFeed'

function App() {
  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/our-service" element={<OurService />} />
            <Route path="/our-feed" element={<OurFeed />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
