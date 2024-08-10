import React, { useEffect } from "react";

const ParticleEmitter = () => {
  useEffect(() => {
    const emitter = document.getElementById("emitter");
    const emitEvery = 50; // Emit new particle every X ms
    const removeAfter = 1000; // Remove particles after X ms

    function create() {
      const particle = document.createElement("div");
      particle.className = "particle";

      const x = randMinMax(-200, 200);
      const y = randMinMax(-200, 50);
      const z = randMinMax(-200, 200);
      const degree = randMinMax(0, 360);
      const color = `hsla(${randMinMax(200, 320)}, 80%, 60%, 1)`;
      const size = randMinMax(4, 10); // Random size for variation

      Object.assign(particle.style, {
        background: color,
        width: `${size}px`,
        height: `${size}px`,
        position: "absolute",
        borderRadius: "50%",
        boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
        transition: "1s ease-in",
      });

      emitter.appendChild(particle);

      setTimeout(() => {
        particle.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateX(${degree}deg)`;
        particle.style.opacity = 0;
      }, 50);

      setTimeout(() => {
        particle.remove();
      }, removeAfter);

      setTimeout(create, emitEvery);
    }

    function randMinMax(min, max) {
      return min + Math.random() * (max - min);
    }

    create();

    return () => {
      // Cleanup logic here if needed
    };
  }, []);

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 9999, // Ensure it covers everything else
  };

  const loaderStyle = {
    width: "50px",
    height: "50px",
    border: "8px solid rgba(255, 255, 255, 0.3)",
    borderTop: "8px solid rgb(255, 255, 255)",
    boxShadow: "0 0 6px 3px rgba(255, 255, 255, 0.668)",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const sceneAnimation = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = sceneAnimation;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={overlayStyle}>
      <div id="emitter"></div>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default ParticleEmitter;
