import React, { useState, useEffect } from 'react';
import MinimalistNav from '../components/MinimalistNav';

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
  
  const handleNav = (dir) => {
    setAutoRotate(false);
    setActiveIndex((idx) => (idx + (dir === 'next' ? 1 : -1) + CARD_COUNT) % CARD_COUNT);
    setTimeout(() => setAutoRotate(true), 5000);
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', minWidth:0 }}>
      <MinimalistNav />
      <div style={{padding: '2em 0', textAlign: 'center'}}>
        <h1 style={{fontWeight: 'bold', fontSize: '2.6em', letterSpacing: '1px'}}>OUR SERVICES</h1>
        <div style={{fontSize: '1.1em', opacity: 0.85, margin: '0.4em 0 2.5em'}}>Design. Strategy. Execution. At the speed of your brand.</div>
      </div>
      <div style={{ perspective: 2400, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '700px' }}>
        <button onClick={() => handleNav('prev')} style={{border:'none',background:'none',fontSize:36,marginRight:36,cursor:'pointer'}}>⟵</button>
        <div className="service-carousel-3d" style={{position:'relative',width:700,height:650,transformStyle:'preserve-3d'}}>
          {SERVICES.map((s, i) => {
            const angle = (360 / CARD_COUNT) * i - (360 / CARD_COUNT) * activeIndex;
            const radius = 450;
            const translateZ = Math.cos((angle * Math.PI) / 180) * radius;
            const translateX = Math.sin((angle * Math.PI) / 180) * radius;
            const rotateY = -angle;
            const isFront = Math.abs(angle % 360) < 90 || Math.abs(angle % 360) > 270;
            const scale = isFront ? 1 : 0.85;
            const opacity = isFront ? 1 : 0.5;
            const zIndex = Math.round(translateZ);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 420,
                  height: 520,
                  marginLeft: -210,
                  marginTop: -260,
                  borderRadius: 30,
                  overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', alignItems: 'center',
                  background: '#111',
                  boxShadow: isFront ? '0 20px 60px rgba(0,0,0,0.25)' : '0 5px 20px rgba(0,0,0,0.1)',
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'visible',
                  zIndex,
                  opacity,
                }}
              >
                {/* Image Backdrop */}
                <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0,overflow:'hidden'}}>
                  <img src={s.img} alt="service" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.82)'}} />
                  <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'rgba(12,12,16,0.28)'}}/>
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
        <button onClick={() => handleNav('next')} style={{border:'none',background:'none',fontSize:36,marginLeft:36,cursor:'pointer'}}>⟶</button>
      </div>
    </div>
  );
};

export default OurService;
