import React from 'react'

const FlowAnimation = () => {
  return (
    <div style={{ background: '#0a2a1a', padding: '80px 48px 40px', color: '#fff' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Top Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 60 }}>
          {/* Left: Logo & Tagline */}
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 30 }}>
              {/* Vulturelines Logo */}
              <div style={{ width: 60, height: 60, marginRight: 20 }}>
                <img src="/assets/Images/Vlt_logo1.png" alt="Vulturelines" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
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
                {['Our Service', 'Projects', 'Work', 'Our Team', 'Our Feed', 'Contact'].map((item, idx) => (
                  <a key={idx} href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: 16, transition: 'color 0.2s' }}
                     onMouseEnter={(e) => e.target.style.color = '#ff6b35'}
                     onMouseLeave={(e) => e.target.style.color = '#fff'}>
                    {item}
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
    </div>
  )
}

export default FlowAnimation
