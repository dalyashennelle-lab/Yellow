'use client';

import React, { useEffect, useState } from 'react';

const NeuralParticles: React.FC = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.4
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="neural-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="neural-particle"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            opacity: particle.opacity,
            background: `hsl(${240 + Math.random() * 60}, 70%, ${60 + Math.random() * 30}%)`
          }}
        />
      ))}
      
      {/* Neural connection lines */}
      <svg 
        className="neural-connections" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.3
        }}
      >
        {particles.slice(0, 20).map((particle, index) => {
          const nextParticle = particles[(index + 1) % 20];
          if (!nextParticle) return null;
          
          return (
            <line
              key={`connection-${index}`}
              x1={`${particle.x}%`}
              y1={`${20 + Math.sin(Date.now() * 0.001 + index) * 30}%`}
              x2={`${nextParticle.x}%`}
              y2={`${20 + Math.sin(Date.now() * 0.001 + index + 1) * 30}%`}
              stroke="rgba(120, 119, 198, 0.3)"
              strokeWidth="1"
              style={{
                animation: `neural-pulse ${3 + Math.random() * 4}s ease-in-out infinite`
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default NeuralParticles;
