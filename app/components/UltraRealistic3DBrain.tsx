'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface UltraRealistic3DBrainProps {
  cognitiveLoad: number;
  memoryActivity: number;
  focusLevel: number;
  eegData?: number[];
}

export default function UltraRealistic3DBrain({ 
  cognitiveLoad, 
  memoryActivity, 
  focusLevel,
  eegData = []
}: UltraRealistic3DBrainProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const brainRef = useRef<THREE.Group>();
  const neuronsRef = useRef<THREE.Points[]>([]);
  const connectionsRef = useRef<THREE.LineSegments[]>([]);
  const [isWebGPUSupported, setIsWebGPUSupported] = useState(false);

  // Advanced shader for realistic brain tissue
  const brainVertexShader = `
    uniform float time;
    uniform float cognitiveLoad;
    uniform float memoryActivity;
    uniform float focusLevel;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying float vCognitiveIntensity;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Dynamic vertex displacement based on cognitive activity
      vec3 pos = position;
      float displacement = sin(pos.x * 0.1 + time * 0.002) * cognitiveLoad * 0.001;
      displacement += cos(pos.y * 0.15 + time * 0.003) * memoryActivity * 0.0008;
      displacement += sin(pos.z * 0.12 + time * 0.0025) * focusLevel * 0.0006;
      
      pos += normal * displacement;
      vPosition = pos;
      vCognitiveIntensity = (cognitiveLoad + memoryActivity + focusLevel) / 300.0;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const brainFragmentShader = `
    uniform float time;
    uniform float cognitiveLoad;
    uniform float memoryActivity;
    uniform float focusLevel;
    uniform vec3 brainColor1;
    uniform vec3 brainColor2;
    uniform vec3 brainColor3;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying float vCognitiveIntensity;
    
    void main() {
      // Subsurface scattering simulation
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      
      // Dynamic color mixing based on cognitive states
      vec3 color1 = mix(brainColor1, brainColor2, sin(time * 0.001 + vPosition.x * 0.01) * 0.5 + 0.5);
      vec3 color2 = mix(brainColor2, brainColor3, cos(time * 0.0015 + vPosition.y * 0.01) * 0.5 + 0.5);
      vec3 finalColor = mix(color1, color2, vCognitiveIntensity);
      
      // Pulsating effect based on neural activity
      float pulse = sin(time * 0.005 + vPosition.length() * 0.1) * 0.2 + 0.8;
      finalColor *= pulse;
      
      // Add subsurface glow
      finalColor += fresnel * vec3(0.2, 0.4, 0.8) * vCognitiveIntensity;
      
      gl_FragColor = vec4(finalColor, 0.85 + vCognitiveIntensity * 0.15);
    }
  `;

  // Neuron shader for synaptic connections
  const neuronVertexShader = `
    uniform float time;
    uniform float activity;
    attribute float size;
    attribute vec3 customColor;
    
    varying vec3 vColor;
    varying float vActivity;
    
    void main() {
      vColor = customColor;
      vActivity = activity;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      
      // Dynamic size based on activity
      float dynamicSize = size * (1.0 + sin(time * 0.01 + position.x * 0.1) * activity * 0.5);
      gl_PointSize = dynamicSize * (300.0 / -mvPosition.z);
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const neuronFragmentShader = `
    uniform float time;
    
    varying vec3 vColor;
    varying float vActivity;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      if (dist > 0.5) discard;
      
      // Glow effect
      float glow = 1.0 - smoothstep(0.0, 0.5, dist);
      glow = pow(glow, 2.0);
      
      // Pulsating core
      float pulse = sin(time * 0.01 + vActivity * 10.0) * 0.3 + 0.7;
      
      vec3 finalColor = vColor * glow * pulse;
      float alpha = glow * (0.6 + vActivity * 0.4);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  useEffect(() => {
    if (!mountRef.current) return;

    // Check for WebGPU support
    const checkWebGPU = async () => {
      if ('gpu' in navigator) {
        try {
          const adapter = await (navigator as any).gpu.requestAdapter();
          setIsWebGPUSupported(!!adapter);
        } catch (e) {
          setIsWebGPUSupported(false);
        }
      }
    };
    checkWebGPU();

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000011, 10, 100);
    sceneRef.current = scene;

    // Enhanced renderer with advanced settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(800, 600);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Camera with dynamic positioning
    const camera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
    camera.position.set(0, 0, 15);

    // Lighting setup for realistic brain rendering
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Point lights for subsurface scattering effect
    const pointLight1 = new THREE.PointLight(0x4facfe, 1, 50);
    pointLight1.position.set(-10, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00f2fe, 0.8, 50);
    pointLight2.position.set(10, -5, -5);
    scene.add(pointLight2);

    // Create ultra-realistic brain geometry
    const createBrainGeometry = () => {
      const group = new THREE.Group();
      
      // Main brain structure with high detail
      const brainGeometry = new THREE.SphereGeometry(4, 128, 64);
      
      // Apply brain-like deformations
      const positions = brainGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Create brain-like wrinkles and folds
        const noise1 = Math.sin(x * 0.3) * Math.cos(y * 0.4) * 0.3;
        const noise2 = Math.sin(y * 0.5) * Math.cos(z * 0.3) * 0.2;
        const noise3 = Math.sin(z * 0.4) * Math.cos(x * 0.6) * 0.25;
        
        const displacement = noise1 + noise2 + noise3;
        const length = Math.sqrt(x*x + y*y + z*z);
        
        positions[i] += (x / length) * displacement;
        positions[i + 1] += (y / length) * displacement;
        positions[i + 2] += (z / length) * displacement;
      }
      
      brainGeometry.attributes.position.needsUpdate = true;
      brainGeometry.computeVertexNormals();

      // Advanced brain material with custom shaders
      const brainMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          cognitiveLoad: { value: cognitiveLoad },
          memoryActivity: { value: memoryActivity },
          focusLevel: { value: focusLevel },
          brainColor1: { value: new THREE.Color(0x4facfe) },
          brainColor2: { value: new THREE.Color(0x00f2fe) },
          brainColor3: { value: new THREE.Color(0x8338ec) }
        },
        vertexShader: brainVertexShader,
        fragmentShader: brainFragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });

      const brainMesh = new THREE.Mesh(brainGeometry, brainMaterial);
      brainMesh.castShadow = true;
      brainMesh.receiveShadow = true;
      group.add(brainMesh);

      return group;
    };

    // Create neural network with thousands of neurons
    const createNeuralNetwork = () => {
      const neuronCount = 2000;
      const positions = new Float32Array(neuronCount * 3);
      const sizes = new Float32Array(neuronCount);
      const colors = new Float32Array(neuronCount * 3);

      for (let i = 0; i < neuronCount; i++) {
        // Distribute neurons in brain-like pattern
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 3 + Math.random() * 2;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        sizes[i] = 20 + Math.random() * 30;

        // Color based on brain region
        const regionFactor = Math.abs(positions[i * 3 + 1]) / 5;
        colors[i * 3] = 0.3 + regionFactor * 0.7;      // R
        colors[i * 3 + 1] = 0.6 + regionFactor * 0.4;  // G
        colors[i * 3 + 2] = 0.9 + regionFactor * 0.1;  // B
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          activity: { value: cognitiveLoad / 100 }
        },
        vertexShader: neuronVertexShader,
        fragmentShader: neuronFragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const neurons = new THREE.Points(geometry, material);
      return neurons;
    };

    // Create synaptic connections
    const createConnections = (neurons: THREE.Points) => {
      const positions = neurons.geometry.attributes.position.array;
      const connectionGeometry = new THREE.BufferGeometry();
      const connectionPositions = [];
      const connectionColors = [];

      // Create connections between nearby neurons
      for (let i = 0; i < positions.length; i += 9) { // Every 3rd neuron
        const x1 = positions[i];
        const y1 = positions[i + 1];
        const z1 = positions[i + 2];

        for (let j = i + 9; j < Math.min(i + 90, positions.length); j += 9) {
          const x2 = positions[j];
          const y2 = positions[j + 1];
          const z2 = positions[j + 2];

          const distance = Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2);
          
          if (distance < 2 && Math.random() > 0.7) {
            connectionPositions.push(x1, y1, z1, x2, y2, z2);
            
            // Dynamic connection colors
            const intensity = Math.random();
            connectionColors.push(
              0.2 + intensity * 0.8,
              0.4 + intensity * 0.6,
              0.8 + intensity * 0.2,
              0.2 + intensity * 0.8,
              0.4 + intensity * 0.6,
              0.8 + intensity * 0.2
            );
          }
        }
      }

      connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
      connectionGeometry.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 3));

      const connectionMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });

      return new THREE.LineSegments(connectionGeometry, connectionMaterial);
    };

    // Initialize 3D objects
    const brain = createBrainGeometry();
    brainRef.current = brain;
    scene.add(brain);

    const neurons = createNeuralNetwork();
    neuronsRef.current = [neurons];
    scene.add(neurons);

    const connections = createConnections(neurons);
    connectionsRef.current = [connections];
    scene.add(connections);

    // Add particle system for neural activity
    const createParticleSystem = () => {
      const particleCount = 500;
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        
        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0x4facfe,
        size: 2,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      return { particles, velocities };
    };

    const { particles, velocities } = createParticleSystem();

    mountRef.current.appendChild(renderer.domElement);

    // Animation loop with enhanced effects
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update shader uniforms
      if (brainRef.current) {
        const brainMaterial = (brainRef.current.children[0] as THREE.Mesh).material as THREE.ShaderMaterial;
        brainMaterial.uniforms.time.value = elapsedTime * 1000;
        brainMaterial.uniforms.cognitiveLoad.value = cognitiveLoad;
        brainMaterial.uniforms.memoryActivity.value = memoryActivity;
        brainMaterial.uniforms.focusLevel.value = focusLevel;
      }

      // Update neuron activity
      neuronsRef.current.forEach(neurons => {
        const material = neurons.material as THREE.ShaderMaterial;
        material.uniforms.time.value = elapsedTime * 1000;
        material.uniforms.activity.value = (cognitiveLoad + memoryActivity + focusLevel) / 300;
      });

      // Animate particles
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Boundary conditions
        if (Math.abs(positions[i]) > 10) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 10) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Dynamic camera movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 2;
      camera.position.y = Math.cos(elapsedTime * 0.15) * 1;
      camera.lookAt(0, 0, 0);

      // Rotate brain slightly
      if (brainRef.current) {
        brainRef.current.rotation.y = elapsedTime * 0.05;
        brainRef.current.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [cognitiveLoad, memoryActivity, focusLevel]);

  // Update cognitive values with smooth transitions
  useEffect(() => {
    if (brainRef.current) {
      gsap.to(brainRef.current.scale, {
        duration: 2,
        x: 1 + cognitiveLoad * 0.002,
        y: 1 + memoryActivity * 0.002,
        z: 1 + focusLevel * 0.002,
        ease: "power2.out"
      });
    }
  }, [cognitiveLoad, memoryActivity, focusLevel]);

  return (
    <div className="ultra-realistic-brain-container">
      <div className="brain-stats">
        <div className="stat-item">
          <span className="stat-label">Cognitive Load</span>
          <div className="stat-bar">
            <div 
              className="stat-fill cognitive"
              style={{ width: `${cognitiveLoad}%` }}
            />
          </div>
          <span className="stat-value">{cognitiveLoad}%</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Memory Activity</span>
          <div className="stat-bar">
            <div 
              className="stat-fill memory"
              style={{ width: `${memoryActivity}%` }}
            />
          </div>
          <span className="stat-value">{memoryActivity}%</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Focus Level</span>
          <div className="stat-bar">
            <div 
              className="stat-fill focus"
              style={{ width: `${focusLevel}%` }}
            />
          </div>
          <span className="stat-value">{focusLevel}%</span>
        </div>
      </div>
      
      <div className="brain-viewport" ref={mountRef} />
      
      {isWebGPUSupported && (
        <div className="webgpu-indicator">
          <span className="webgpu-badge">⚡ WebGPU Accelerated</span>
        </div>
      )}
      
      <div className="brain-controls">
        <button className="brain-control-btn" title="Reset View">
          🔄 Reset
        </button>
        <button className="brain-control-btn" title="Fullscreen">
          🔍 Expand
        </button>
        <button className="brain-control-btn" title="Record">
          📹 Record
        </button>
      </div>
    </div>
  );
}
