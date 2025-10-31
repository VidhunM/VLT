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
  const groupRef = useRef(null);
  const ringRefs = useRef([]);
  // Scroll-driven rotation for the circular carousel rings
  useEffect(() => {
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

    let raf = 0;
    const rotatePerProgress = [360, -270, 180]; // inner, middle, outer (degrees for full page scroll)

    const tick = () => {
      const p = getScrollProgress();
      ringRefs.current.forEach((el, idx) => {
        if (!el) return;
        const deg = (rotatePerProgress[idx] || 0) * p;
        el.style.transform = `rotateY(${deg}deg)`;
        el.style.transformStyle = "preserve-3d";
        el.style.willChange = "transform";
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    const onScroll = () => { /* scroll read happens in rAF */ };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Build the 3D pattern (6 - 5 - 6)
  const items = useMemo(() => {
    const result = [];
    const baseZ = 280;
    const radii = { x: 380, z: 190 };
    const yLevels = [-160, 0, 160];
    const sizes = [100, 100, 100];
    let imgIdx = 0;

    // Row 1: 6
    const r1Count = 6;
    for (let i = 0; i < r1Count; i++) {
      const t = (i / r1Count) * Math.PI * 2;
      const x = radii.x * Math.sin(t);
      const z = baseZ + radii.z * Math.cos(t);
      result.push({ src: IMAGES[imgIdx++ % IMAGES.length], x, y: yLevels[0], z, size: sizes[0] });
    }

    // Row 2: 5 (odd slots of 10)
    const r2Slots = 10;
    for (let k = 0; k < 5; k++) {
      const slot = 2 * k + 1;
      const t = (slot / r2Slots) * Math.PI * 2;
      const x = radii.x * Math.sin(t);
      const z = baseZ + radii.z * Math.cos(t);
      result.push({ src: IMAGES[imgIdx++ % IMAGES.length], x, y: yLevels[1], z, size: sizes[1] });
    }

    // Row 3: 6 (even slots of 12)
    const r3Slots = 12;
    for (let k = 1; k <= 6; k++) {
      const slot = 2 * k;
      const t = (slot / r3Slots) * Math.PI * 2;
      const x = radii.x * Math.sin(t);
      const z = baseZ + radii.z * Math.cos(t);
      result.push({ src: IMAGES[imgIdx++ % IMAGES.length], x, y: yLevels[2], z, size: sizes[2] });
    }

    return result.slice(0, 17);
  }, []);

  // Animation: map scroll progress to rotation, then rotate the group.
  // Also update each child's transform so cards face the camera (negate group rotation + a small local tilt).
  useEffect(() => {
    const node = groupRef.current;
    if (!node) return;

    let lastRotY = 0; // degrees
    const ease = 0.08; // smoothing
    const baseRotationOffset = -8; // keep a slight X tilt for depth

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
    const children = Array.from(node.children);
    children.forEach((child, i) => {
      // Expect each child to have data attributes already set (we'll set them in render)
      // If not present, parse transforms from style (fallback)
      const dx = child.dataset.x ?? "0";
      const dy = child.dataset.y ?? "0";
      const dz = child.dataset.z ?? "0";
      const tilt = child.dataset.tilt ?? "0";
      child.__pos = { x: parseFloat(dx), y: parseFloat(dy), z: parseFloat(dz), tilt: parseFloat(tilt) || 0 };
      // ensure 3d rendering hints
      child.style.transformStyle = "preserve-3d";
      child.style.willChange = "transform";
    });

    // animation loop
    let raf = 0;
    const animate = () => {
      const progress = getScrollProgress(); // 0..1
      // map progress to a rotation range. Tune multiplier to taste.
      // Here: full page scroll -> 360 degrees * 0.9 (almost one full spin)
      const targetRotY = progress * 360 * 0.9;
      lastRotY += (targetRotY - lastRotY) * ease;

      // apply rotation to group container
      node.style.transform = `rotateX(${baseRotationOffset}deg) rotateY(${lastRotY}deg)`;
      node.style.transformStyle = "preserve-3d";

      // update each child so it faces the camera:
      // child rotation = -groupRotation + localTilt
      children.forEach((child) => {
        const p = child.__pos;
        // local tilt gives a little card face orientation based on x position
        const localTilt = p.tilt || 0;
        const finalRotY = -lastRotY + localTilt;
        // translate3d uses px values; preserve the card's own translate(-50%,-50%) via inner wrapper
        child.style.transform = `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateY(${finalRotY}deg)`;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    // Keep scroll handling passive (we rely on requestAnimationFrame to read scroll)
    const onScroll = () => {
      /* no-op: scroll read happens in animation frame via getScrollProgress */
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

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
            height: "100vh",
            overflow: "hidden",
            perspective: "1600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            ref={groupRef}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {items.map((it, idx) => {
              // compute a small local tilt so cards don't look perfectly flat — tweak divisor for effect
              const localTilt = -it.x / 10; // degrees
              return (
              <div
                key={idx}
                  className="feed-3d-item"
                  // store positions & tilt as data attributes for the animation loop
                  data-x={it.x}
                  data-y={it.y}
                  data-z={it.z}
                  data-tilt={localTilt}
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transformStyle: "preserve-3d",
                    // initial transform; animation loop will overwrite this each frame
                    transform: `translate3d(${it.x}px, ${it.y}px, ${it.z}px) rotateY(${localTilt}deg)`,
                }}
              >
                <div
                  style={{
                    width: it.size,
                    height: it.size,
                      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                      transform: "translate(-50%, -50%)",
                    borderRadius: 6,
                      overflow: "hidden",
                      background: "#111",
                      willChange: "transform",
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
                        transform: "translateZ(20px)", // give subtle pop forward
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

      {/* Black Circular Carousel Section (fixed center, rotating rings) */}
      <section style={{ background: "#000", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
          <style>{`
            @keyframes cc-rotate-y-cw { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
            @keyframes cc-rotate-y-ccw { from { transform: rotateY(0deg); } to { transform: rotateY(-360deg); } }
            .cc-ring { transform-style: preserve-3d; will-change: transform; }
            .cc-item { position: absolute; left: 50%; top: 50%; transform-style: preserve-3d; will-change: transform; }
            .cc-card { transform: translate(-50%, -50%); border-radius: 8px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.45); background:#111; }
            .cc-card img { width: 100%; height: 100%; object-fit: cover; display:block; backface-visibility:hidden; -webkit-backface-visibility:hidden; }
            /* scroll-driven: no autoplay animation */
          `}</style>

          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 1, marginBottom: 16 }}>CIRCULAR CAROUSEL</div>

          <div
            className="cc-root"
            style={{
              position: "relative",
              width: "100%",
              height: "70vh",
              maxHeight: 720,
              minHeight: 420,
              perspective: "1600px",
              overflow: "hidden"
            }}
          >
            {/* Static center (blank) */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 240,
                height: 240,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "transparent",
                pointerEvents: "none",
                zIndex: 2
              }}
            />

            {/* Rings */}
            {[
              { count: 8, radius: 260, size: 90, speed: 40, dir: 1 },
              { count: 10, radius: 340, size: 90, speed: 55, dir: -1 },
              { count: 12, radius: 420, size: 90, speed: 70, dir: 1 }
            ].map((ring, rIdx) => {
              const imgs = new Array(ring.count).fill(null).map((_, i) => IMAGES[(i + rIdx * 3) % IMAGES.length]);
              return (
                <div
                  key={`ring-${rIdx}`}
                  className="cc-ring"
                  ref={(el) => (ringRefs.current[rIdx] = el)}
                  style={{ position: "absolute", inset: 0 }}
                >
                  {imgs.map((src, i) => {
                    const angle = (i / ring.count) * Math.PI * 2;
                    const transform = `rotateY(${(angle * 180) / Math.PI}deg) translateZ(${ring.radius}px)`;
                    return (
                      <div key={`item-${rIdx}-${i}`} className="cc-item" style={{ transform }}>
                        <div className="cc-card" style={{ width: ring.size, height: ring.size }}>
                          <img src={src} alt="carousel" />
                        </div>
                      </div>
                    );
                  })}
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
