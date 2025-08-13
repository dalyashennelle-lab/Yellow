'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Brain connection nodes for animation
  const connectionNodes = [
    { x: 20, y: 30, active: false },
    { x: 80, y: 25, active: false },
    { x: 45, y: 55, active: false },
    { x: 75, y: 70, active: false },
    { x: 30, y: 80, active: false },
    { x: 65, y: 40, active: false },
    { x: 15, y: 60, active: false },
    { x: 90, y: 55, active: false },
    { x: 50, y: 15, active: false },
    { x: 25, y: 45, active: false }
  ];

  useEffect(() => {
    const timeline = [
      { delay: 500, action: () => setShowLogo(true) },
      { delay: 1500, action: () => setShowConnections(true) },
      { delay: 2000, action: () => setShowText(true) },
      { delay: 5000, action: onComplete }
    ];

    const timeouts = timeline.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  useEffect(() => {
    if (!showConnections || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let animationId: number;
    let time = 0;
    const nodes = [...connectionNodes];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.02;

      // Animate connection nodes
      nodes.forEach((node, index) => {
        const activationDelay = index * 200;
        const isActive = time * 1000 > activationDelay;
        
        if (isActive) {
          node.active = true;
          
          // Draw pulsing nodes
          const pulseScale = 1 + Math.sin(time * 3 + index) * 0.3;
          const opacity = 0.6 + Math.sin(time * 2 + index) * 0.4;
          
          ctx.save();
          ctx.globalAlpha = opacity;
          
          // Gradient for nodes
          const gradient = ctx.createRadialGradient(
            (node.x / 100) * canvas.offsetWidth,
            (node.y / 100) * canvas.offsetHeight,
            0,
            (node.x / 100) * canvas.offsetWidth,
            (node.y / 100) * canvas.offsetHeight,
            8 * pulseScale
          );
          
          gradient.addColorStop(0, '#ff9a9e');
          gradient.addColorStop(0.3, '#fecfef');
          gradient.addColorStop(0.6, '#fecfef');
          gradient.addColorStop(1, 'rgba(254, 207, 239, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(
            (node.x / 100) * canvas.offsetWidth,
            (node.y / 100) * canvas.offsetHeight,
            8 * pulseScale,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.restore();
        }
      });

      // Draw connections between active nodes
      const activeNodes = nodes.filter(node => node.active);
      ctx.strokeStyle = 'rgba(132, 204, 246, 0.4)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < activeNodes.length; i++) {
        for (let j = i + 1; j < activeNodes.length; j++) {
          const nodeA = activeNodes[i];
          const nodeB = activeNodes[j];
          const distance = Math.sqrt(
            Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
          );
          
          if (distance < 40) {
            const opacity = Math.sin(time * 2) * 0.3 + 0.4;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(
              (nodeA.x / 100) * canvas.offsetWidth,
              (nodeA.y / 100) * canvas.offsetHeight
            );
            ctx.lineTo(
              (nodeB.x / 100) * canvas.offsetWidth,
              (nodeB.y / 100) * canvas.offsetHeight
            );
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [showConnections]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        {/* Logo Section */}
        <div className={`splash-logo ${showLogo ? 'visible' : ''}`}>
          <div className="logo-icon">
            <div className="brain-symbol">🧠</div>
          </div>
          <h1 className="logo-text">NeuroX</h1>
          <div className="logo-subtitle">Cognitive Enhancement Suite</div>
        </div>

        {/* Animated Brain Connections Canvas */}
        <canvas 
          ref={canvasRef}
          className={`brain-connections ${showConnections ? 'visible' : ''}`}
        />

        {/* Animated Text */}
        <div className={`splash-text ${showText ? 'visible' : ''}`}>
          <p className="research-quote">
            Rooted in years of original neuroscience research by the creator, 
            NeuroX is more than an app — it's the embodiment of data, dreams, 
            and discovery.
          </p>
        </div>

        {/* Loading indicator */}
        <div className="loading-indicator">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
