import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { navigateWithCircle } from '../utils/navigation'

const FlowAnimation = () => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const handleFooterNavClick = (event, path) => {
    navigateWithCircle(event, path, () => {
      navigate(path)
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let animationFrameId = null
    let lastScrollY = window.scrollY
    let isAnimating = false
    let scrollThreshold = 50 // Minimum scroll distance to trigger animation

    const drawRectangle = (ctx, width, height, progress) => {
      const padding = 20
      const rectX = padding
      const rectY = padding
      const rectWidth = width - padding * 2
      const rectHeight = height - padding * 2

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Set line style
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Easing function for smooth animation
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }
      const easedProgress = easeInOutCubic(progress)

      // Draw initial half rectangle (top half: top horizontal line and left/right vertical lines down to middle)
      // Top horizontal line - always visible
      ctx.beginPath()
      ctx.moveTo(rectX, rectY)
      ctx.lineTo(rectX + rectWidth, rectY)
      ctx.stroke()

      // Left vertical line down to middle - always visible
      ctx.beginPath()
      ctx.moveTo(rectX, rectY)
      ctx.lineTo(rectX, rectY + rectHeight / 2)
      ctx.stroke()

      // Right vertical line down to middle - always visible
      ctx.beginPath()
      ctx.moveTo(rectX + rectWidth, rectY)
      ctx.lineTo(rectX + rectWidth, rectY + rectHeight / 2)
      ctx.stroke()

      // Animate left vertical line completion (from middle to bottom)
      const leftLineProgress = Math.min(easedProgress * 2, 1) // Completes at 50% of animation
      if (leftLineProgress > 0) {
        ctx.beginPath()
        ctx.moveTo(rectX, rectY + rectHeight / 2)
        ctx.lineTo(rectX, rectY + rectHeight / 2 + (rectHeight / 2) * leftLineProgress)
        ctx.stroke()
      }

      // Animate right vertical line completion (from middle to bottom)
      const rightLineProgress = Math.min(easedProgress * 2, 1) // Completes at 50% of animation
      if (rightLineProgress > 0) {
        ctx.beginPath()
        ctx.moveTo(rectX + rectWidth, rectY + rectHeight / 2)
        ctx.lineTo(rectX + rectWidth, rectY + rectHeight / 2 + (rectHeight / 2) * rightLineProgress)
        ctx.stroke()
      }

      // Animate bottom horizontal line (from left to right)
      const bottomLineProgress = Math.max(0, (easedProgress - 0.5) * 2) // Starts at 50% of animation
      if (bottomLineProgress > 0) {
        ctx.beginPath()
        ctx.moveTo(rectX, rectY + rectHeight)
        ctx.lineTo(rectX + rectWidth * bottomLineProgress, rectY + rectHeight)
        ctx.stroke()
      }
    }

    const startAnimation = () => {
      // Don't restart if already animating
      if (isAnimating) return
      
      // Cancel any ongoing animation
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      
      isAnimating = true
      
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      const ctx = canvas.getContext('2d')
      const width = canvas.width
      const height = canvas.height

      // Animation parameters
      let animationProgress = 0
      const animationDuration = 2000 // 2 seconds
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        animationProgress = Math.min(elapsed / animationDuration, 1)

        drawRectangle(ctx, width, height, animationProgress)

        // Continue animation until complete
        if (animationProgress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          isAnimating = false
        }
      }

      animate()
    }

    const updateCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      const ctx = canvas.getContext('2d')
      // Draw final rectangle if not animating
      if (!isAnimating) {
        drawRectangle(ctx, canvas.width, canvas.height, 1)
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const rect = container.getBoundingClientRect()
      
      // Check if container is in viewport
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      
      // Check if scrolling down with sufficient scroll distance and container is visible
      const scrollDelta = currentScrollY - lastScrollY
      if (scrollDelta > scrollThreshold && isInViewport && !isAnimating) {
        startAnimation()
        lastScrollY = currentScrollY
      } else if (scrollDelta > 0) {
        // Update lastScrollY even if not triggering animation
        lastScrollY = currentScrollY
      }
    }

    // Initial setup
    updateCanvas()
    
    // Initial animation on mount if in viewport
    const rect = container.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation()
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Update on resize
    const resizeObserver = new ResizeObserver(updateCanvas)
    resizeObserver.observe(container)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      window.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div style={{ background: '#0a2a1a', padding: '80px 48px 40px', color: '#fff' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Container with animated rectangle border */}
        <div 
          ref={containerRef}
          style={{ 
            position: 'relative', 
            padding: '50px',
            minHeight: '400px'
          }}
        >
          {/* Canvas overlay for rectangle animation */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Content inside rectangle */}
          <div style={{ position: 'relative', zIndex: 0 }}>
            {/* Top Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 60 }}>
          {/* Left: Logo & Tagline */}
          <div>
            <div style={{ marginBottom: 30 }}>
              {/* Vulturelines Logo */}
              <img src="/assets/Images/Vlt_logo1.png" alt="Vulturelines" style={{ width: 200, height: 200, objectFit: 'contain', display: 'block' }} />
            </div>
            <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.2, color: '#000' }}>
              <div>Vulturelines</div>
              <div style={{ fontSize: 24, color: '#fff', fontWeight: 400, marginTop: 12 }}>
                With strategic design and<br />Webflow development.
              </div>
            </div>
          </div>

          {/* Right: Navigation & Contact */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, flex: '1 1 auto', maxWidth: 600 }}>
            {/* Navigation */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#ff6b35', marginBottom: 20, letterSpacing: '1px' }}>
                EXPLORA
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Our Service', path: '/our-service' },
                  { label: 'Projects', path: '/work' },
                  { label: 'Work', path: '/work' },
                  { label: 'Our Team', path: '/our-team' },
                  { label: 'Our Feed', path: '/our-feed' },
                  { label: 'Contact', path: '/contact' }
                ].map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.path} 
                    style={{ color: '#fff', textDecoration: 'none', fontSize: 16, transition: 'color 0.2s', cursor: 'pointer' }}
                    onClick={(e) => handleFooterNavClick(e, item.path)}
                    onMouseEnter={(e) => e.target.style.color = '#ff6b35'}
                    onMouseLeave={(e) => e.target.style.color = '#fff'}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#ff6b35', marginBottom: 20, letterSpacing: '1px' }}>
                CONTACT
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 14, color: '#999' }}>
                  7th Floor, Centre Point,<br />
                  2/4, Mount Pollamallee High Road,<br />
                  Manapakkam, Porur, Chennai
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>+91 9791670504</div>
                <div style={{ fontSize: 16, color: '#fff' }}>sutheesh.s@vulturelines.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Divider Line */}
          <div style={{ borderTop: '1px solid #333', marginBottom: 30 }}></div>

          {/* Social Media & Copyright */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Social Media Icons */}
            <div style={{ display: 'flex', gap: 12 }}>
              {['Instagram', 'LinkedIn', 'TikTok'].map((platform, idx) => (
                <div key={idx} style={{ width: 40, height: 40, background: '#2d1a2d', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <span style={{ fontSize: 18, color: '#fff' }}>
                    {platform === 'Instagram' && '📷'}
                    {platform === 'LinkedIn' && '💼'}
                    {platform === 'TikTok' && '🎵'}
                  </span>
                </div>
              ))}
            </div>

            {/* Copyright & Legal Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <div style={{ fontSize: 12, color: '#999' }}>© 2025 StepHouse. All rights reserved.</div>
              <div style={{ display: 'flex', gap: 20 }}>
                {['Política de cookies', 'Aviso legal', 'Política de privacidad', 'Canal de denuncias'].map((link, idx) => (
                  <a key={idx} href="#" style={{ fontSize: 12, color: '#ff6b35', textDecoration: 'none' }}
                     onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                     onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
          </div>
          {/* End Content inside rectangle */}
        </div>
        {/* End Container with animated rectangle border */}
      </div>
    </div>
  )
}

export default FlowAnimation
