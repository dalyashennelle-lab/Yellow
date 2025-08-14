
'use client';

import { useEffect, useRef } from 'react';

interface NeuralNetwork3DProps {
  cognitiveLoad: number;
  focusLevel: number;
  memoryScore: number;
}

export default function NeuralNetwork3D({ 
  cognitiveLoad, 
  focusLevel, 
  memoryScore 
}: NeuralNetwork3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create animated neural network visualization using CSS and Canvas
    const canvas = document.createElement('canvas');
    canvas.width = mountRef.current.clientWidth;
    canvas.height = 400;
    canvas.className = 'neural-canvas';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Neural network nodes
    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 3 + 1,
      connections: []
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background grid
      ctx.strokeStyle = 'rgba(79, 172, 254, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Update and draw nodes
      nodes.forEach((node, index) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Draw connections
        nodes.forEach((otherNode, otherIndex) => {
          if (index !== otherIndex) {
            const dist = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            );
            
            if (dist < 100) {
              const opacity = (1 - dist / 100) * (focusLevel / 100) * 0.5;
              ctx.strokeStyle = `rgba(79, 172, 254, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          }
        });

        // Draw node
        const intensity = (cognitiveLoad + memoryScore) / 200;
        const hue = 200 + (focusLevel / 100) * 60;
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${0.8 + intensity * 0.2})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (1 + intensity), 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 10 + intensity * 20;
        ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (1 + intensity), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    mountRef.current.appendChild(canvas);
    animate();

    return () => {
      if (mountRef.current && canvas) {
        mountRef.current.removeChild(canvas);
      }
    };
  }, [cognitiveLoad, focusLevel, memoryScore]);

  return (
    <div className="neural-network-container">
      <div className="neural-network-header">
        <h2 className="neural-title">Neural Network Visualization</h2>
        <div className="neural-stats">
          <span className="stat">Nodes: <strong>50</strong></span>
          <span className="stat">Connections: <strong>Dynamic</strong></span>
          <span className="stat">Activity: <strong>Real-time</strong></span>
        </div>
      </div>
      <div ref={mountRef} className="neural-canvas-container">
        <div className="neural-info">
          Neural activity visualization based on cognitive metrics • 
          Node intensity reflects cognitive load • 
          Connection density shows focus level • 
          Color represents memory performance
        </div>
      </div>
    </div>
  );
}
