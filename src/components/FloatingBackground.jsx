import React, { useEffect, useRef } from "react";

// Lightweight floating particle background using particles.js via CDN
// Renders an absolute, pointer-events-none layer behind content
const FloatingBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ensureScript = () =>
      new Promise((resolve, reject) => {
        if (window.particlesJS) return resolve();
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.body.appendChild(script);
      });

    let mounted = true;

    ensureScript()
      .then(() => {
        if (!mounted || !containerRef.current || !window.particlesJS) return;
        const cs = getComputedStyle(document.documentElement);
        const primary = cs.getPropertyValue('--primary').trim() || '#ff6b6b';
        const accent = cs.getPropertyValue('--accent').trim() || '#ffb347';
        const id = containerRef.current.id;
        window.particlesJS(id, {
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: [primary, accent] },
            shape: { type: "circle" },
            opacity: { value: 0.25, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: false }, onclick: { enable: false }, resize: true },
          },
          retina_detect: true,
        });
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      id="qb-floating-bg"
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10"
    />
  );
};

export default FloatingBackground;
