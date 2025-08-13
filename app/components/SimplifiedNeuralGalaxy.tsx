'use client';

import React, { useRef, useEffect, useState } from 'react';

interface SimplifiedNeuralGalaxyProps {
  isActive?: boolean;
  brainwave?: 'gamma' | 'beta' | 'alpha' | 'theta' | 'delta';
}

const SimplifiedNeuralGalaxy: React.FC<SimplifiedNeuralGalaxyProps> = ({ 
  isActive = true, 
  brainwave = 'alpha' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const [isInitialized, setIsInitialized] = useState(false);

  // Neural constellation data
  const neurons = useRef<Array<{
    x: number;
    y: number;
    intensity: number;
    frequency: number;
    phase: number;
    vx: number;
    vy: number;
  }>>([]);

  const getColorForBrainwave = (wave: string) => {
    const colors = {
      gamma: { r: 255, g: 102, b: 204 }, // Bright pink
      beta: { r: 77, g: 158, b: 255 },   // Blue
      alpha: { r: 102, g: 255, b: 153 }, // Green
      theta: { r: 255, g: 153, b: 51 },  // Orange
      delta: { r: 153, g: 102, b: 255 }  // Purple
    };
    return colors[wave as keyof typeof colors] || colors.alpha;
  };

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    updateCanvasSize();

    // Initialize neurons
    neurons.current = [];
    for (let i = 0; i < 150; i++) {
      neurons.current.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        intensity: Math.random() * 0.8 + 0.2,
        frequency: Math.random() * 40 + 1,
        phase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    setIsInitialized(true);

    let time = 0;
    const animate = () => {
      if (!ctx || !canvas.offsetWidth || !canvas.offsetHeight) return;

      time += 0.02;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const baseColor = getColorForBrainwave(brainwave);

      // Draw neurons
      neurons.current.forEach((neuron, i) => {
        // Update position with gentle drift
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        // Bounce off edges
        if (neuron.x < 0 || neuron.x > canvas.offsetWidth) neuron.vx *= -1;
        if (neuron.y < 0 || neuron.y > canvas.offsetHeight) neuron.vy *= -1;

        // Keep in bounds
        neuron.x = Math.max(0, Math.min(canvas.offsetWidth, neuron.x));
        neuron.y = Math.max(0, Math.min(canvas.offsetHeight, neuron.y));

        // Pulsing intensity based on time and frequency
        const pulse = Math.sin(time * 2 + neuron.phase + i * 0.1) * 0.5 + 0.5;
        const finalIntensity = neuron.intensity * pulse * (isActive ? 1 : 0.3);

        // Draw neuron with glow
        const size = 2 + finalIntensity * 4;
        const alpha = finalIntensity * 0.8;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, size * 3
        );
        gradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${Math.min(alpha * 2, 1)})`;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections between nearby neurons
      ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.2)`;
      ctx.lineWidth = 1;

      for (let i = 0; i < neurons.current.length; i++) {
        for (let j = i + 1; j < neurons.current.length; j++) {
          const neuronA = neurons.current[i];
          const neuronB = neurons.current[j];
          const distance = Math.sqrt(
            Math.pow(neuronA.x - neuronB.x, 2) + 
            Math.pow(neuronA.y - neuronB.y, 2)
          );

          if (distance < 80) {
            const opacity = (80 - distance) / 80 * 0.3;
            ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(neuronA.x, neuronA.y);
            ctx.lineTo(neuronB.x, neuronB.y);
            ctx.stroke();
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isActive, brainwave]);

  const getBrainwaveInfo = (wave: string) => {
    const info = {
      gamma: { name: 'Gamma', range: '30+ Hz', state: 'Peak Focus' },
      beta: { name: 'Beta', range: '13-30 Hz', state: 'Alert & Active' },
      alpha: { name: 'Alpha', range: '8-13 Hz', state: 'Relaxed Focus' },
      theta: { name: 'Theta', range: '4-8 Hz', state: 'Creative Flow' },
      delta: { name: 'Delta', range: '<4 Hz', state: 'Deep Rest' }
    };
    return info[wave as keyof typeof info] || info.alpha;
  };

  const currentInfo = getBrainwaveInfo(brainwave);
  const currentColor = getColorForBrainwave(brainwave);

  return (
    <div className="simplified-neural-galaxy">
      <div className="galaxy-header">
        <h3 className="galaxy-title">
          🌌 Neural Constellation - {currentInfo.name} Waves
        </h3>
        <div className="galaxy-info">
          <div 
            className="brainwave-indicator"
            style={{ 
              background: `linear-gradient(135deg, 
                rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.8) 0%, 
                rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.4) 100%)` 
            }}
          >
            <span className="wave-range">{currentInfo.range}</span>
            <span className="wave-state">{currentInfo.state}</span>
          </div>
        </div>
      </div>

      <div className="galaxy-canvas-container">
        {!isInitialized && (
          <div className="galaxy-loading">
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <p>Mapping neural activity...</p>
          </div>
        )}
        
        <canvas 
          ref={canvasRef}
          className={`galaxy-canvas ${isInitialized ? 'visible' : ''}`}
          style={{ opacity: isInitialized ? 1 : 0 }}
        />
      </div>

      <div className="galaxy-stats">
        <div className="stat-item">
          <span className="stat-value">150</span>
          <span className="stat-label">Active Neurons</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{isActive ? '●' : '○'}</span>
          <span className="stat-label">Live Feed</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">Real-time</span>
          <span className="stat-label">Processing</span>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedNeuralGalaxy;
