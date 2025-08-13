'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface EEGDataPoint {
  x: number;
  y: number;
  z: number;
  intensity: number;
  frequency: number;
  timestamp: number;
  brainRegion: string;
}

interface NeuralGalaxyProps {
  eegData?: EEGDataPoint[];
  isActive?: boolean;
}

const vertexShader = `
  attribute float intensity;
  attribute float frequency;
  varying float vIntensity;
  varying float vFrequency;
  
  void main() {
    vIntensity = intensity;
    vFrequency = frequency;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (5.0 + intensity * 10.0) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float vIntensity;
  varying float vFrequency;
  
  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    // Color based on frequency bands
    vec3 color;
    if (vFrequency > 30.0) {
      // Gamma waves - bright pink/magenta
      color = vec3(1.0, 0.4, 0.8);
    } else if (vFrequency > 13.0) {
      // Beta waves - blue
      color = vec3(0.3, 0.7, 1.0);
    } else if (vFrequency > 8.0) {
      // Alpha waves - green
      color = vec3(0.4, 1.0, 0.6);
    } else if (vFrequency > 4.0) {
      // Theta waves - orange
      color = vec3(1.0, 0.6, 0.2);
    } else {
      // Delta waves - deep purple
      color = vec3(0.6, 0.2, 1.0);
    }
    
    float alpha = (1.0 - dist) * vIntensity * 0.8;
    float glow = exp(-dist * 3.0) * vIntensity;
    
    gl_FragColor = vec4(color * (0.8 + glow), alpha);
  }
`;

const NeuralGalaxy: React.FC<NeuralGalaxyProps> = ({ eegData, isActive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const pointsRef = useRef<THREE.Points>();
  const animationIdRef = useRef<number>();
  const [isLoading, setIsLoading] = useState(true);

  // Generate simulated EEG data if none provided
  const generateEEGData = (): EEGDataPoint[] => {
    const data: EEGDataPoint[] = [];
    const regions = ['frontal', 'parietal', 'temporal', 'occipital', 'central'];
    
    for (let i = 0; i < 2000; i++) {
      // Create galaxy-like distribution
      const radius = Math.random() * 50 + 10;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 20;
      
      data.push({
        x: Math.cos(angle) * radius + (Math.random() - 0.5) * 10,
        y: height + (Math.random() - 0.5) * 5,
        z: Math.sin(angle) * radius + (Math.random() - 0.5) * 10,
        intensity: Math.random() * 0.8 + 0.2,
        frequency: Math.random() * 40 + 1, // 1-40 Hz
        timestamp: Date.now() - Math.random() * 10000,
        brainRegion: regions[Math.floor(Math.random() * regions.length)]
      });
    }
    
    return data;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 20, 80);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create neural galaxy
    const currentEEGData = eegData || generateEEGData();
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(currentEEGData.length * 3);
    const intensities = new Float32Array(currentEEGData.length);
    const frequencies = new Float32Array(currentEEGData.length);

    currentEEGData.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
      intensities[i] = point.intensity;
      frequencies[i] = point.frequency;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('intensity', new THREE.BufferAttribute(intensities, 1));
    geometry.setAttribute('frequency', new THREE.BufferAttribute(frequencies, 1));

    // Shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Add starfield background
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 400;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      color: 0x88aaff,
      size: 1,
      transparent: true,
      opacity: 0.3
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    setIsLoading(false);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      if (pointsRef.current && isActive) {
        pointsRef.current.rotation.y += 0.002;
        
        // Update intensities for pulsing effect
        const intensityAttribute = pointsRef.current.geometry.getAttribute('intensity') as THREE.BufferAttribute;
        const intensityArray = intensityAttribute.array as Float32Array;
        
        for (let i = 0; i < intensityArray.length; i++) {
          intensityArray[i] = 0.3 + Math.sin(time * 2 + i * 0.01) * 0.3;
        }
        intensityAttribute.needsUpdate = true;
      }

      // Rotate camera around the galaxy
      if (cameraRef.current && isActive) {
        const radius = 80;
        cameraRef.current.position.x = Math.cos(time * 0.1) * radius;
        cameraRef.current.position.z = Math.sin(time * 0.1) * radius;
        cameraRef.current.lookAt(0, 0, 0);
      }

      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [eegData, isActive]);

  return (
    <div className="neural-galaxy-container">
      <div className="neural-galaxy-header">
        <h3 className="neural-galaxy-title">🌌 Neural Galaxy EEG Visualization</h3>
        <p className="neural-galaxy-description">
          Real-time EEG data points displayed as constellations of neurons firing in space
        </p>
      </div>
      
      {isLoading && (
        <div className="neural-galaxy-loading">
          <div className="loading-spinner"></div>
          <p>Initializing Neural Galaxy...</p>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="neural-galaxy-canvas"
        style={{ opacity: isLoading ? 0 : 1 }}
      />
      
      <div className="neural-galaxy-legend">
        <div className="legend-item">
          <div className="legend-color gamma"></div>
          <span>Gamma (30+ Hz) - Focus</span>
        </div>
        <div className="legend-item">
          <div className="legend-color beta"></div>
          <span>Beta (13-30 Hz) - Alert</span>
        </div>
        <div className="legend-item">
          <div className="legend-color alpha"></div>
          <span>Alpha (8-13 Hz) - Relaxed</span>
        </div>
        <div className="legend-item">
          <div className="legend-color theta"></div>
          <span>Theta (4-8 Hz) - Creative</span>
        </div>
        <div className="legend-item">
          <div className="legend-color delta"></div>
          <span>Delta (&lt;4 Hz) - Deep Sleep</span>
        </div>
      </div>
    </div>
  );
};

export default NeuralGalaxy;
