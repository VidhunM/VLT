import React, { useEffect, useMemo, useRef, useState } from 'react'
import Header from '../components/Header'

const IMAGES = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521312703500-9ce0c0a0e2d9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
]

function OurFeed() {
  const groupRef = useRef(null)
  const [tab, setTab] = useState('VIBES')

  // Deterministic 3D circular rows: row1 (6 equal), row2 (5 odd slots of 10), row3 (6 even slots of 12)
  const items = useMemo(() => {
    const result = []
    const baseZ = 280 // push slightly farther for a zoomed-out feel
    const radii = { x: 520, z: 260 }
    const yLevels = [-160, 0, 160]
    const sizes = [120, 120, 120] // smaller circles for a zoomed-out look

    let imgIdx = 0

    // Row 1: 6 equally spaced
    const r1Count = 6
    for (let i = 0; i < r1Count; i++) {
      const t = (i / r1Count) * Math.PI * 2
      const x = radii.x * Math.sin(t)
      const z = baseZ + radii.z * Math.cos(t)
      const rotY = (-t * 180) / Math.PI * 0.7
      result.push({ src: IMAGES[imgIdx++ % IMAGES.length], x, y: yLevels[0], z, rotY, size: sizes[0] })
    }

    // Row 2: 5 images at odd indices of a 10-slot ring → angles at (2k+1)/10 * 2π
    const r2Slots = 10
    for (let k = 0; k < 5; k++) {
      const slot = 2 * k + 1 // 1,3,5,7,9
      const t = (slot / r2Slots) * Math.PI * 2
      const x = radii.x * Math.sin(t)
      const z = baseZ + radii.z * Math.cos(t)
      const rotY = (-t * 180) / Math.PI * 0.7
      result.push({ src: IMAGES[imgIdx++ % IMAGES.length], x, y: yLevels[1], z, rotY, size: sizes[1] })
    }

    // Row 3: 6 images at even indices of a 12-slot ring → angles at 2k/12 * 2π
    const r3Slots = 12
    for (let k = 1; k <= 6; k++) { // even indices: 2,4,6,8,10,12
      const slot = 2 * k
      const t = (slot / r3Slots) * Math.PI * 2
      const x = radii.x * Math.sin(t)
      const z = baseZ + radii.z * Math.cos(t)
      const rotY = (-t * 180) / Math.PI * 0.7
      result.push({ src: IMAGES[imgIdx++ % IMAGES.length], x, y: yLevels[2], z, rotY, size: sizes[2] })
    }

    return result.slice(0, 17) // ensure we use 17 images total
  }, [])

  useEffect(() => {
    const node = groupRef.current
    if (!node) return

    let rafId = 0
    let rotationY = -8
    let targetRotX = 0
    let targetRotY = -8

    const onMove = (e) => {
      const ww = window.innerWidth
      const wh = window.innerHeight
      const nx = (e.clientX / ww) * 2 - 1
      const ny = (e.clientY / wh) * 2 - 1
      targetRotX = ny * 6
      targetRotY = -8 + nx * 8
    }

    const animate = () => {
      rotationY += (targetRotY - rotationY) * 0.06
      node.style.transform = `rotateX(${targetRotX.toFixed(2)}deg) rotateY(${rotationY.toFixed(2)}deg)`
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#000' }}>
      <style>{`
        @keyframes feedPan {
          0% { transform: translateX(-10%); }
          50% { transform: translateX(10%); }
          100% { transform: translateX(-10%); }
        }
      `}</style>
      <Header
        logoSrc={'/assets/Images/Vlt_logo1.png'}
        menuItems={[
          { label: 'Home', href: '/' },
          { label: 'Our Service', href: '/our-service' },
          { label: 'Projects', href: '/work' },
          { label: 'Our Feed', href: '/our-feed' },
          { label: 'Contact', href: '/contact' }
        ]}
      />
      {/* Top white header like reference */}
      <section
        style={{
          padding: '120px 24px 36px',
          maxWidth: 1200,
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
          <h1 style={{ fontSize: 72, lineHeight: 1, margin: 0, letterSpacing: 1 }}>FEED</h1>
          <div style={{ alignSelf: 'center', fontSize: 14, letterSpacing: 1, whiteSpace: 'nowrap' }}>
            LESS NOISE ✦ MORE SUBSTANCE
          </div>
        </div>
      </section>

      {/* Black section that contains the VIBES row and the 3D collage */}
      <section style={{ background: '#000', color: '#fff' }}>
        <div style={{ padding: '28px 24px 0', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 1 }}>VIBES</div>
            <div style={{ fontSize: 12, opacity: 0.85, maxWidth: 760, textAlign: 'right', letterSpacing: 0.5 }}>
              HANDPICKED INSPIRATIONS, INFLUENCES, AND VISUAL CANDY FROM THE KUE TEAM.
            </div>
          </div>
        </div>

        <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          perspective: '1600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          ref={groupRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.2s ease-out'
          }}
        >
          {items.map((it, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transformStyle: 'preserve-3d',
                transform: `translate3d(${it.x}px, ${it.y}px, ${it.z}px) rotateY(${it.rotY}deg)`
              }}
            >
              <div
                style={{
                  width: it.size,
                  height: it.size,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: 6,
                  overflow: 'hidden',
                  background: '#111'
                }}
              >
                <img
                  src={it.src}
                  alt="feed"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          ))}

          
        </div>
        </div>
      </section>
            {/* Highlights section below, similar to reference */}
            <section style={{ background: '#fff', color: '#000' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
          <h2 style={{ fontSize: 36, margin: 0, letterSpacing: 1 }}>HIGHLIGHTS</h2>
          <div style={{ fontSize: 12, opacity: 0.85, maxWidth: 560, textAlign: 'right', letterSpacing: 0.5 }}>
            BITE-SIZED UPDATES AND HIGHLIGHTS FROM KUE STUDIO.
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[0,1,2].map((i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 8px 28px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', aspectRatio: '1 / 1', background: '#eee' }}>
                  <img
                    src={i === 2
                      ? 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop'
                      : IMAGES[(i+3)%IMAGES.length]}
                    alt="highlight"
                    style={{ width: '120%', height: '100%', objectFit: 'cover', display: 'block', willChange: 'transform', animation: 'feedPan 12s ease-in-out infinite' }}
                  />
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.5, marginBottom: 10 }}>
                    {['OCTOBER 2025','SEPTEMBER 2025','AUGUST 2025'][i]}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: '#333' }}>
                    {[
                      'Kue is honored to partner on a new short film that melds meticulous storytelling with bold, purpose-driven motion GFX.',
                      'We’re thrilled to begin a new partnership with award-winning leadership on upcoming brand, web, and AI campaigns.',
                      'We refreshed our brand and website to reflect a sharper, more intentional identity aligned with our partners.'
                    ][i]}
                  </div>
                </div>
                {i === 1 && (
                  <div style={{ padding: '0 20px 20px', display: 'flex', gap: 8 }}>
                    {['VIBES','HIGHLIGHTS','ARTICLES'].map((t) => (
                      <span key={t} style={{ padding: '8px 12px', borderRadius: 999, border: '1px solid #ddd', fontSize: 12, fontWeight: 700 }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurFeed


