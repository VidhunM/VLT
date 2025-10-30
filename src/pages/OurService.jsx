import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const SERVICES = [
  { img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80', keywords: ['BRAND', 'WEB', 'MOTION', 'AI'] },
  { img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', keywords: ['WEB', 'STRATEGY', 'UI/UX'] },
  { img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', keywords: ['MOTION', 'CONTENT', 'SOCIAL'] },
  { img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80', keywords: ['BRAND', 'PRINT', 'IDENTITY'] },
  { img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', keywords: ['AI', 'INNOVATION', 'CONSULT'] },
  { img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', keywords: ['DIGITAL', 'STRATEGY', 'BRAND'] },
  { img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80', keywords: ['UX', 'UI', 'DEVELOPMENT'] },
  { img: 'https://images.unsplash.com/photo-1519121783406-9933958887c9?auto=format&fit=crop&w=800&q=80', keywords: ['RESEARCH', 'ANALYTICS', 'MOTION'] },
];
const CARD_COUNT = SERVICES.length;
const VISIBLE_CARDS = 5;

// Four project blocks for zigzag section
const PROJECTS = [
  {
    title: 'ACTIVE RESEARCH COLLECTIVE®',
    meta: 'DTC, HEALTH & WELLNESS • 1-MONTH',
    description:
      'A new wellness brand thoughtfully built from the ground up with purpose and precision. We crafted the website, store and packaging to confidently compete alongside established names in the space.',
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1600&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'LUDEO®',
    meta: 'TECH, STARTUP • 1-MONTH',
    description:
      'Launching with a clear roadmap and strong identity, the site we built keeps pace with an evolving brand and supports growth without sacrificing performance.',
    image:
      'https://images.unsplash.com/photo-1550291652-38c4b04a57b8?q=80&w=1600&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'NOMAD COFFEE®',
    meta: 'DTC, HOSPITALITY • 2-MONTHS',
    description:
      'From packaging to storefront, we unified brand touchpoints and built an experience that scales from local to national demand.',
    image:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop',
    link: '#'
  },
  {
    title: 'ATLAS FITNESS®',
    meta: 'HEALTH & FITNESS • 6-WEEKS',
    description:
      'A conversion-focused site with strong visuals and clear messaging, designed to showcase programs and drive signups across devices.',
    image:
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1600&auto=format&fit=crop',
    link: '#'
  }
];

const KLogo = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="90" height="90" fill="transparent"/>
    <path d="M20 65V25H34.5V41L45.5 25H61L44 49.25L65 65H49.5L34.5 51.5V65H20Z" fill="white"/>
  </svg>
);

const getCardPosition = (index, activeIndex) => {
  let position = ((index - activeIndex) + CARD_COUNT) % CARD_COUNT;
  if (position > CARD_COUNT / 2) position -= CARD_COUNT;
  return position;
};

const OurService = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => setActiveIndex((i) => (i + 1) % CARD_COUNT), 3500);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Zoom-in/out on scroll for project images
  useEffect(() => {
    const elems = () => Array.from(document.querySelectorAll('[data-zoom="true"]'));

    const onScroll = () => {
      const viewportHeight = window.innerHeight || 1;
      const viewportCenter = window.scrollY + viewportHeight / 2;
      elems().forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = window.scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        const norm = Math.min(distance / viewportHeight, 1); // 0 near center → 1 far
        const intensity = 1 - norm; // 1 at center, 0 far
        const scale = 0.96 + intensity * 0.08; // 0.96 → 1.04
        el.style.transform = `scale(${scale.toFixed(3)})`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // initial
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  
  const handleNav = (dir) => {
    setAutoRotate(false);
    setActiveIndex((idx) => (idx + (dir === 'next' ? 1 : -1) + CARD_COUNT) % CARD_COUNT);
    setTimeout(() => setAutoRotate(true), 5000);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', minWidth:0 }}>
      <Header
        logoSrc={'/assets/Images/Vlt_logo1.png'}
        menuItems={[
          { label: 'Home', href: '/' },
          { label: 'Our Service', href: '/our-service' },
          { label: 'Projects', href: '/work' },
          { label: 'Contact', href: '/contact' }
        ]}
      />
      <div style={{padding: '2em 0', textAlign: 'center'}}>
        <h1 style={{fontWeight: 'bold', fontSize: '2.6em', letterSpacing: '1px'}}>OUR SERVICES</h1>
        <div style={{fontSize: '1.1em', opacity: 0.85, margin: '0.4em 0 2.5em'}}>Design. Strategy. Execution. At the speed of your brand.</div>
      </div>
      <div style={{ perspective: 2600, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '700px' }}>
        <div className="service-carousel-3d" style={{position:'relative',width:'min(88vw, 900px)',height:'min(80vh, 650px)',transformStyle:'preserve-3d'}}>
          {SERVICES.map((s, i) => {
            // position offset relative to current active card in range ...,-2,-1,0,1,2,...
            let pos = ((i - activeIndex) + CARD_COUNT) % CARD_COUNT;
            if (pos > CARD_COUNT / 2) pos -= CARD_COUNT;

            // Only keep −2..2 visible to mimic screenshot (edge-on side cards only)
            const clamped = Math.abs(pos) <= 2;

            // Angle mapping: center 0°, near sides ±45°, far sides ±78° (edge look)
            const angle = pos === 0 ? 0 : (Math.abs(pos) === 2 ? 78 * Math.sign(pos) : 45 * pos);
            const radius = 520;
            const rad = (angle * Math.PI) / 180;
            const translateZ = Math.cos(rad) * radius;
            let translateX = Math.sin(rad) * radius;
            // Extra horizontal spacing between cards based on relative position
            const spacingPerStep = 20; // px separation per step from center
            translateX += pos * spacingPerStep;
            // Outward-facing yaw: sides tilt away from the center
            const rotateY = angle * 0.9;
            const isFront = pos === 0;
            // Make immediate side cards (±1) face forward and be fully visible like center
            const isNeighbor = Math.abs(pos) === 1;
            const scale = isFront || isNeighbor ? 1 : 0.86;
            const opacity = (isFront || isNeighbor) ? 1 : 0.28;
            const zIndex = 1000 + Math.round(translateZ);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'clamp(280px, 32vw, 420px)',
                  height: 'clamp(380px, 50vw, 520px)',
                  marginLeft: 'calc(-1 * clamp(280px, 32vw, 420px) / 2)',
                  marginTop: 'calc(-1 * clamp(380px, 50vw, 520px) / 2)',
                  borderRadius: 30,
                  overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', alignItems: 'center',
                  background: '#111',
                  boxShadow: (isFront || isNeighbor) ? '0 30px 90px rgba(0,0,0,0.35)' : '0 10px 28px rgba(0,0,0,0.18)',
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'visible',
                  zIndex,
                  opacity: clamped ? opacity : 0,
                  pointerEvents: clamped ? 'auto' : 'none'
                }}
              >
                {/* Image Backdrop */}
                <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0,overflow:'hidden'}}>
                  <img src={s.img} alt="service" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.8)'}} />
                  <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.25))'}}/>
                </div>
                {/* Logo Centered */}
                <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flex:1}}>
                  <div style={{ marginTop: 36, marginBottom: 26 }}><KLogo /></div>
                </div>
                {/* Keywords Bottom Left */}
                <div style={{position:'absolute',bottom:18,left:26,zIndex:2,color:'#fff',fontWeight:700,letterSpacing:'1px',fontSize:'1.11em',textAlign:'left',display:'flex',flexDirection:'column',gap:2}}>
                  {s.keywords.map(str => (<span key={str}>{str}</span>))}
                </div>
                {/* Copyright Bottom Right */}
                <div style={{position:'absolute',bottom:18,right:22,zIndex:2,fontSize:12,color:'#fff',opacity:0.92,fontWeight:400}}>© 2025 KUE CONCEPTS, LLC.</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zigzag Project Sections */}
      {PROJECTS.map((p, idx) => {
        const isReversed = idx % 2 === 1;
        return (
          <section
            key={p.title + idx}
            style={{
              width: '100%',
              maxWidth: 1200,
              margin: '60px auto',
              padding: '0 24px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                gap: 32,
                flexDirection: isReversed ? 'row-reverse' : 'row'
              }}
            >
              <div
                style={{
                  flex: '1 1 520px',
                  minWidth: 280,
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  willChange: 'transform',
                  transition: 'transform 0.15s ease-out'
                }}
                data-zoom="true"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: '1 1 420px', minWidth: 280 }}>
                <h2 style={{ fontSize: '48px', lineHeight: 1.05, margin: '0 0 10px', letterSpacing: '0.5px' }}>
                  {p.title}
                </h2>
                <div style={{ fontSize: 14, color: '#7a7a7a', letterSpacing: '0.5px', marginBottom: 18 }}>
                  {p.meta}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: '#222', margin: '0 0 22px', maxWidth: 620 }}>
                  {p.description}
                </p>
                <a
                  href={p.link}
                  style={{
                    display: 'inline-block',
                    textDecoration: 'none',
                    color: '#111',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #111',
                    paddingBottom: 4
                  }}
                >
                  VIEW PROJECT →
                </a>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default OurService;
