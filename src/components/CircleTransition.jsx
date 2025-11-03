import React, { useState, useEffect } from 'react'

const CircleTransition = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [circleStyle, setCircleStyle] = useState({})
  const [pendingNavigation, setPendingNavigation] = useState(null)
  const [circleColor, setCircleColor] = useState('#ff6b35')

  useEffect(() => {
    // Listen for custom navigation events
    const handleCircleNavigation = (event) => {
      const { x, y, href, callback, color = '#ff6b35' } = event.detail
      
      // Set circle color
      setCircleColor(color)
      
      // Set circle position and start animation
      setCircleStyle({
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%) scale(0)'
      })
      
      setIsAnimating(true)
      setPendingNavigation({ href, callback })
      
      // Trigger expand animation after a brief delay
      setTimeout(() => {
        setCircleStyle(prev => ({
          ...prev,
          transform: 'translate(-50%, -50%) scale(1)'
        }))
      }, 10)
      
      // Navigate after animation completes
      setTimeout(() => {
        if (callback) {
          callback()
        } else if (href) {
          window.location.href = href
        }
      }, 800) // Match animation duration
      
      // Reset after navigation
      setTimeout(() => {
        setIsAnimating(false)
        setPendingNavigation(null)
      }, 1000)
    }

    window.addEventListener('circleNavigation', handleCircleNavigation)
    
    return () => {
      window.removeEventListener('circleNavigation', handleCircleNavigation)
    }
  }, [])

  if (!isAnimating) return null

  return (
    <div 
      className="circle-transition"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
      <div 
        className="circle-transition-inner"
        style={{
          position: 'absolute',
          ...circleStyle,
          width: '200vmax',
          height: '200vmax',
          borderRadius: '50%',
          background: circleColor,
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform'
        }}
      />
    </div>
  )
}

export default CircleTransition
