'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralNetwork3DProps {
  cognitiveLoad: number;
  memoryActivity: number;
  focusLevel: number;
}

export default function NeuralNetwork3D({ cognitiveLoad, memoryActivity, focusLevel }: NeuralNetwork3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const neuronsRef = useRef<THREE.Group[]>([]);
  const connectionsRef = useRef<THREE.Line[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1c);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x0a0f1c, 0.8);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create neural network
    createNeuralNetwork(scene);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the entire scene
      scene.rotation.y += 0.005;
      scene.rotation.x += 0.002;

      // Update neuron pulsing based on brain activity
      updateNeuronActivity();
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const createNeuralNetwork = (scene: THREE.Scene) => {
    // Create neuron positions in 3D space
    const neuronPositions = [];
    const layers = [
      { count: 8, z: -6, color: 0x4facfe, name: 'input' },
      { count: 12, z: -2, color: 0x00f2fe, name: 'hidden1' },
      { count: 10, z: 2, color: 0xff006e, name: 'hidden2' },
      { count: 6, z: 6, color: 0x8338ec, name: 'output' }
    ];

    neuronsRef.current = [];
    connectionsRef.current = [];

    layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2;
        const radius = 3 + layerIndex * 0.5;
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = layer.z;

        neuronPositions.push({ x, y, z, layer: layerIndex, color: layer.color });

        // Create neuron sphere
        const geometry = new THREE.SphereGeometry(0.1, 16, 16);
        const material = new THREE.MeshBasicMaterial({ 
          color: layer.color,
          transparent: true,
          opacity: 0.8
        });
        const neuron = new THREE.Mesh(geometry, material);
        neuron.position.set(x, y, z);

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(x, y, z);

        const neuronGroup = new THREE.Group();
        neuronGroup.add(neuron);
        neuronGroup.add(glow);
        
        neuronsRef.current.push(neuronGroup);
        scene.add(neuronGroup);
      }
    });

    // Create connections between layers
    neuronPositions.forEach((neuron, i) => {
      neuronPositions.forEach((target, j) => {
        if (target.layer === neuron.layer + 1) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(neuron.x, neuron.y, neuron.z),
            new THREE.Vector3(target.x, target.y, target.z)
          ]);

          const material = new THREE.LineBasicMaterial({
            color: 0x4facfe,
            transparent: true,
            opacity: 0.2
          });

          const line = new THREE.Line(geometry, material);
          connectionsRef.current.push(line);
          scene.add(line);
        }
      });
    });

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // Add point lights for effects
    const light1 = new THREE.PointLight(0x4facfe, 1, 100);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xff006e, 1, 100);
    light2.position.set(-10, -10, 10);
    scene.add(light2);
  };

  const updateNeuronActivity = () => {
    neuronsRef.current.forEach((neuronGroup, index) => {
      const time = Date.now() * 0.001;
      const activity = (cognitiveLoad + memoryActivity + focusLevel) / 300;
      
      // Pulsing based on brain activity
      const pulse = 1 + Math.sin(time * 2 + index * 0.1) * 0.3 * activity;
      neuronGroup.scale.setScalar(pulse);

      // Update opacity based on activity
      const opacity = 0.5 + activity * 0.5;
      neuronGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = opacity;
        }
      });
    });

    // Update connection opacity based on focus level
    connectionsRef.current.forEach((connection, index) => {
      if (connection.material instanceof THREE.LineBasicMaterial) {
        const focusIntensity = focusLevel / 100;
        connection.material.opacity = 0.1 + focusIntensity * 0.4;
      }
    });
  };

  return (
    <div className="neural-network-container">
      <div className="neural-network-header">
        <h3 className="neural-title">3D Neural Network Visualization</h3>
        <div className="neural-stats">
          <span className="stat">Cognitive Load: <strong>{cognitiveLoad}%</strong></span>
          <span className="stat">Memory: <strong>{memoryActivity}%</strong></span>
          <span className="stat">Focus: <strong>{focusLevel}%</strong></span>
        </div>
      </div>
      <div ref={mountRef} className="neural-canvas" />
      <div className="neural-info">
        <p>Interactive 3D representation of neural pathways. Neuron pulsing indicates cognitive activity levels.</p>
      </div>
    </div>
  );
}
