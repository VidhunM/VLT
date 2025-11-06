import React, { useEffect, useMemo, useRef } from "react";
import Header from "../components/Header";

const IMAGES = [
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521312703500-9ce0c0a0e2d9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=800&auto=format&fit=crop",
];

function OurFeed() {
  const ringGroupRef = useRef(null);
  
  // Build cylindrical ring structure (center column removed)
  const ringItems = useMemo(() => {
    const ringItems = [];
    let imgIdx = 0;
    
    const baseZ = -200; // Negative Z brings elements closer to camera
    const ringRadius = 440; // Slightly increased radius for middle row (wider structure)
    const outerRingRadius = 470; // Slightly increased radius for 1st and 3rd rows (wider structure)
    const ringImageSize = 115; // Slightly decreased image size
    
    // Cylindrical ring: 3 vertical levels, each with 6 images in a circle
    const ringYLevels = [-130, 0, 130]; // Slightly decreased vertical spread
    const imagesPerLevel = 6;
    
    ringYLevels.forEach((y, levelIdx) => {
      // Use larger radius for 1st (0) and 3rd (2) rows
      const currentRadius = (levelIdx === 0 || levelIdx === 2) ? outerRingRadius : ringRadius;
      // Offset 2nd row (middle) by half angle step to position images between outer rows
      const angleOffset = (levelIdx === 1) ? (Math.PI / imagesPerLevel) : 0;
      
      for (let i = 0; i < imagesPerLevel; i++) {
        const angle = (i / imagesPerLevel) * Math.PI * 2 + angleOffset;
        const x = currentRadius * Math.sin(angle);
        const z = baseZ + currentRadius * Math.cos(angle);
        ringItems.push({
          src: IMAGES[imgIdx++ % IMAGES.length],
          x,
          y,
          z,
          size: ringImageSize,
          angle, // Store angle for rotation
          radius: currentRadius, // Store radius for animation
        });
      }
    });
    
    return ringItems;
  }, []);

  // Animation: map scroll progress to rotation, then rotate the ring.
  useEffect(() => {
    const ringNode = ringGroupRef.current; // Ring container
    if (!ringNode) return;

    let lastRotY = 0; // degrees
    let autoRotY = 0; // Automatic rotation angle
    const ease = 0.08; // smoothing
    const autoRotSpeed = 0.3; // Automatic rotation speed (degrees per frame)
    const baseRotationOffsetX = 0; // No X tilt - keep everything centered
    const baseRotationOffsetZ = -350; // Fixed -350 degree Z-axis rotation (not rotating)
    const verticalOffset = -40; // Move structure slightly downward (less negative = down)
    const horizontalOffset = -60; // Move structure to left (negative = left)
    
    // Scroll stop detection
    let scrollTimeout = null;
    let isScrolling = false;
    let lastScrollTop = 0;

    // Helper: page scroll -> normalized [0,1]
    const getScrollProgress = () => {
      const h = document.documentElement;
      const scrollTop = window.scrollY || h.scrollTop || document.body.scrollTop || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const winH = window.innerHeight || 1;
      const maxScroll = Math.max(1, docHeight - winH);
      return Math.min(1, Math.max(0, scrollTop / maxScroll));
    };

    // Pre-store each child's data-attributes for performance
    const ringChildren = Array.from(ringNode.children);
    ringChildren.forEach((child) => {
      const dx = child.dataset.x ?? "0";
      const dy = child.dataset.y ?? "0";
      const dz = child.dataset.z ?? "0";
      const angle = child.dataset.angle ?? "0";
      const radius = child.dataset.radius ?? "440";
      child.__pos = {
        x: parseFloat(dx),
        y: parseFloat(dy),
        z: parseFloat(dz),
        angle: parseFloat(angle) || 0,
        radius: parseFloat(radius) || 440,
      };
      child.style.transformStyle = "preserve-3d";
      child.style.willChange = "transform";
    });

    // animation loop
    let raf = 0;
    const animate = () => {
      const progress = getScrollProgress(); // 0..1
      // map progress to a rotation range
      const targetRotY = progress * 360 * 0.9;
      lastRotY += (targetRotY - lastRotY) * ease;
      
      // Automatic rotation when scroll stops
      if (!isScrolling) {
        autoRotY += autoRotSpeed;
        if (autoRotY >= 360) autoRotY -= 360; // Keep in 0-360 range
      }
      
      // Combine scroll-based rotation with automatic rotation
      const finalRotY = lastRotY + autoRotY;

      // Apply centering with fixed -350 degree Z-axis rotation, upward and leftward offsets
      ringNode.style.transform = `translate(calc(-50% + ${horizontalOffset}px), calc(-50% + ${verticalOffset}px)) rotateX(${baseRotationOffsetX}deg) rotateZ(${baseRotationOffsetZ}deg)`;
      ringNode.style.transformStyle = "preserve-3d";

      // Update ring items: rotate around center and face camera
      const centerZ = -200; // Match the baseZ from useMemo (negative = closer)
      ringChildren.forEach((child) => {
        const p = child.__pos;
        // Use each item's stored radius (different for each row)
        const itemRadius = p.radius || 440;
        // Calculate new position after rotation (using combined rotation)
        const rotatedAngle = p.angle + (finalRotY * Math.PI / 180);
        const newX = itemRadius * Math.sin(rotatedAngle);
        const newZ = centerZ + itemRadius * Math.cos(rotatedAngle);
        // Face camera: rotate Y to face outward (tangent to circle)
        const faceAngle = rotatedAngle * (180 / Math.PI);
        child.style.transform = `translate3d(${newX}px, ${p.y}px, ${newZ}px) rotateY(${faceAngle}deg)`;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    // Scroll stop detection
    const onScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      
      // Check if scroll position changed
      if (Math.abs(currentScrollTop - lastScrollTop) > 1) {
        isScrolling = true;
        lastScrollTop = currentScrollTop;
        
        // Clear existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        
        // Set timeout to detect scroll stop (300ms after last scroll)
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 300);
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [ringItems]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#000" }}>
      <style>{`
        @keyframes feedPan {
          0% { transform: translateX(-10%); }
          50% { transform: translateX(10%); }
          100% { transform: translateX(-10%); }
        }
        /* minor CSS to help with rendering */
        .feed-3d-item img { backface-visibility: hidden; -webkit-backface-visibility: hidden; display:block; }
      `}</style>

      {/* Header */}
      <Header
        logoSrc={"/assets/Images/Vlt_logo1.png"}
        menuItems={[
          { label: "Home", href: "/" },
          { label: "Our Service", href: "/our-service" },
          { label: "Projects", href: "/work" },
          { label: "Our Feed", href: "/our-feed" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      {/* FEED Heading */}
      <section style={{ padding: "120px 24px 36px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
          <h1 style={{ fontSize: 72, lineHeight: 1, margin: 0, letterSpacing: 1 }}>FEED</h1>
          <div style={{ alignSelf: "center", fontSize: 14, letterSpacing: 1, whiteSpace: "nowrap" }}>
            LESS NOISE ✦ MORE SUBSTANCE
          </div>
        </div>
      </section>

      {/* 3D Scroll Gallery */}
      <section style={{ background: "#000", color: "#fff" }}>
        <div
          style={{
            padding: "28px 24px 0",
            maxWidth: 1200,
            margin: "0 auto",
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 1 }}>VIBES</div>
            <div style={{ fontSize: 12, opacity: 0.85, maxWidth: 760, textAlign: "right", letterSpacing: 0.5 }}>
              HANDPICKED INSPIRATIONS, INFLUENCES, AND VISUAL CANDY FROM THE KUE TEAM.
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "130vh",
            overflow: "hidden",
            perspective: "800px",
            perspectiveOrigin: "50% 50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Cylindrical Ring - Rotates on Scroll */}
          <div
            ref={ringGroupRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: "translate(-50%, -50%)",
              willChange: "transform",
              pointerEvents: "none",
            }}
          >
            {ringItems.map((it, idx) => {
              // Calculate initial face angle for ring items
              const faceAngle = it.angle * (180 / Math.PI);
              return (
                <div
                  key={`ring-${idx}`}
                  className="feed-3d-item feed-ring-item"
                  data-x={it.x}
                  data-y={it.y}
                  data-z={it.z}
                  data-angle={it.angle}
                  data-radius={it.radius}
                  data-is-center="false"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transformStyle: "preserve-3d",
                    transform: `translate3d(${it.x}px, ${it.y}px, ${it.z}px) rotateY(${faceAngle}deg)`,
                  }}
                >
                  <div
                    style={{
                      width: it.size,
                      height: it.size,
                      boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                      transform: "translate(-50%, -50%)",
                      borderRadius: 0,
                      overflow: "hidden",
                      background: "#111",
                      willChange: "transform",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <img
                      src={it.src}
                      alt="feed"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transform: "translateZ(20px)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section style={{ background: "#fff", color: "#000" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "48px 24px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 20,
          }}
        >
          <h2 style={{ fontSize: 36, margin: 0, letterSpacing: 1 }}>HIGHLIGHTS</h2>
          <div style={{ fontSize: 12, opacity: 0.85, maxWidth: 560, textAlign: "right", letterSpacing: 0.5 }}>
            BITE-SIZED UPDATES AND HIGHLIGHTS FROM KUE STUDIO.
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ width: "100%", aspectRatio: "1 / 1", background: "#eee" }}>
                  <img
                    src={
                      i === 2
                        ? "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop"
                        : IMAGES[(i + 3) % IMAGES.length]
                    }
                    alt="highlight"
                    style={{
                      width: "120%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      willChange: "transform",
                      animation: "feedPan 12s ease-in-out infinite",
                    }}
                  />
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.5, marginBottom: 10 }}>
                    {["OCTOBER 2025", "SEPTEMBER 2025", "AUGUST 2025"][i]}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: "#333" }}>
                    {[
                      "Kue is honored to partner on a new short film that melds meticulous storytelling with bold, purpose-driven motion GFX.",
                      "We’re thrilled to begin a new partnership with award-winning leadership on upcoming brand, web, and AI campaigns.",
                      "We refreshed our brand and website to reflect a sharper, more intentional identity aligned with our partners.",
                    ][i]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurFeed;
