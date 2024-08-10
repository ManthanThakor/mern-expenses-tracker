import React, { useEffect } from "react";
import "./Loading.css"; // Import CSS styles

const ParticleEmitter = () => {
  useEffect(() => {
    const emitter = document.getElementById("emitter");
    const emitEvery = 30; // Emit new particle every X ms
    const removeAfter = 3000; // Remove particles after X ms

    function create() {
      const particle = document.createElement("div");
      particle.className = "particle";

      const angle = randMinMax(0, 360); // Random starting angle
      const distance = randMinMax(50, 200); // Distance from the center
      const size = randMinMax(8, 20); // Size of the particles
      const depth = randMinMax(-300, 300); // Varying depth for 3D effect

      const hue = randMinMax(200, 320); // Hue for hsla color
      particle.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 70%, 1), transparent)`;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.transform = `translateZ(${depth}px) rotate(${angle}deg) translate(${distance}px)`;

      emitter.appendChild(particle);

      setTimeout(() => {
        const newAngle = angle + randMinMax(180, 540); // Spiral effect
        particle.style.transform = `translateZ(${depth}px) rotate(${newAngle}deg) translate(${distance}px) scale(${randMinMax(
          0.5,
          1.5
        )})`;
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
