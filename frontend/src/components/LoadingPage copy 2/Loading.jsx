import React, { useEffect } from "react";
import "./Loading.css"; // Import CSS styles

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
      const size = randMinMax(2, 10); // Random size for variation

      particle.style.background = color;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

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

  return (
    <div id="scene">
      <div id="emitter"></div>
    </div>
  );
};

export default ParticleEmitter;
