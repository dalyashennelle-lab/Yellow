'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AnimatedNeuronsProps {
  cognitiveLoad: number;
  activity: number;
  neuronCount?: number;
  connectionStrength?: number;
}

interface Neuron {
  position: THREE.Vector3;
  mesh: THREE.Mesh;
  connections: number[];
  activity: number;
  pulsePhase: number;
}

export default function AnimatedNeurons({ 
  cognitiveLoad, 
  activity, 
  neuronCount = 50,
  connectionStrength = 0.3 
}: AnimatedNeuronsProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const neuronsRef = useRef<Neuron[]>([]);
  const connectionLinesRef = useRef<THREE.LineSegments>();
  const animationFrameRef = useRef<number>();

  const [isPlaying, setIsPlaying] = useState(true);
  const [neuronSpeed, setNeuronSpeed] = useState(1);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Create neurons
    const neurons: Neuron[] = [];
    const neuronGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    
    for (let i = 0; i < neuronCount; i++) {
      // Create neuron material with dynamic properties
      const neuronMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.8, 0.5),
        emissive: new THREE.Color().setHSL(0.6, 0.3, 0.1),
        shininess: 100,
        transparent: true,
        opacity: 0.8
      });

      const neuronMesh = new THREE.Mesh(neuronGeometry, neuronMaterial);
      
      // Random position in 3D space
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20
      );
      
      neuronMesh.position.copy(position);
      neuronMesh.castShadow = true;
      neuronMesh.receiveShadow = true;
      
      scene.add(neuronMesh);

      // Create connections to nearby neurons
      const connections: number[] = [];
      
      neurons.push({
        position,
        mesh: neuronMesh,
        connections,
        activity: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Create connections between nearby neurons
    neurons.forEach((neuron, index) => {
      neurons.forEach((otherNeuron, otherIndex) => {
        if (index !== otherIndex) {
          const distance = neuron.position.distanceTo(otherNeuron.position);
          if (distance < 15 && Math.random() < connectionStrength) {
            neuron.connections.push(otherIndex);
          }
        }
      });
    });

    neuronsRef.current = neurons;

    // Create connection lines
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.3,
      linewidth: 2
    });

    const connectionLines = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connectionLines);
    connectionLinesRef.current = connectionLines;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 0.5, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Mouse controls
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isPlaying) {
        // Update neurons
        neuronsRef.current.forEach((neuron, index) => {
          // Pulse animation based on activity
          neuron.pulsePhase += deltaTime * 2 * neuronSpeed;
          const pulse = Math.sin(neuron.pulsePhase) * 0.5 + 0.5;
          
          // Scale based on cognitive load and activity
          const activityScale = 0.8 + (activity / 100) * 0.4;
          const cognitiveScale = 0.9 + (cognitiveLoad / 100) * 0.3;
          const scale = activityScale * cognitiveScale * (0.8 + pulse * 0.4);
          
          neuron.mesh.scale.setScalar(scale);

          // Color changes based on activity
          const material = neuron.mesh.material as THREE.MeshPhongMaterial;
          const hue = 0.6 + (activity / 100) * 0.2;
          const saturation = 0.8 + (cognitiveLoad / 100) * 0.2;
          const lightness = 0.4 + pulse * 0.3;
          
          material.color.setHSL(hue, saturation, lightness);
          material.emissive.setHSL(hue, 0.5, lightness * 0.3);

          // Floating animation
          const floatOffset = Math.sin(currentTime * 0.001 + index) * 0.5;
          neuron.mesh.position.y = neuron.position.y + floatOffset;

          // Activity-based rotation
          neuron.mesh.rotation.x += deltaTime * neuron.activity * neuronSpeed;
          neuron.mesh.rotation.y += deltaTime * neuron.activity * 0.5 * neuronSpeed;
        });

        // Update connection lines
        const positions: number[] = [];
        const colors: number[] = [];

        neuronsRef.current.forEach((neuron, index) => {
          neuron.connections.forEach(connectionIndex => {
            const connectedNeuron = neuronsRef.current[connectionIndex];
            
            // Line positions
            positions.push(
              neuron.mesh.position.x, neuron.mesh.position.y, neuron.mesh.position.z,
              connectedNeuron.mesh.position.x, connectedNeuron.mesh.position.y, connectedNeuron.mesh.position.z
            );

            // Dynamic line colors based on activity
            const activityLevel = (neuron.activity + connectedNeuron.activity) / 2;
            const pulseStrength = Math.sin(currentTime * 0.005 + index) * 0.5 + 0.5;
            
            const r = 0.3 + activityLevel * 0.4 + pulseStrength * 0.3;
            const g = 0.5 + activityLevel * 0.3;
            const b = 0.9;

            colors.push(r, g, b, r, g, b);
          });
        });

        if (connectionLinesRef.current) {
          const geometry = connectionLinesRef.current.geometry;
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
          
          const material = connectionLinesRef.current.material as THREE.LineBasicMaterial;
          material.vertexColors = true;
          material.opacity = 0.2 + (activity / 100) * 0.3;
        }

        // Camera movement based on mouse and activity
        const targetX = mouseX * 5;
        const targetY = mouseY * 5;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        
        // Auto-rotation based on cognitive load
        const autoRotation = cognitiveLoad / 1000;
        camera.position.x = Math.cos(currentTime * autoRotation) * 30;
        camera.position.z = Math.sin(currentTime * autoRotation) * 30;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      neurons.forEach(neuron => {
        scene.remove(neuron.mesh);
        neuron.mesh.geometry.dispose();
        (neuron.mesh.material as THREE.Material).dispose();
      });
      
      renderer.dispose();
    };
  }, [neuronCount, connectionStrength]);

  // Update speed based on cognitive load and activity
  useEffect(() => {
    setNeuronSpeed(1 + (cognitiveLoad + activity) / 200);
  }, [cognitiveLoad, activity]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  const resetView = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 30);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  return (
    <div className="animated-neurons-container">
      <div className="neurons-controls">
        <button className="control-btn" onClick={toggleAnimation}>
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button className="control-btn" onClick={resetView}>
          🔄 Reset View
        </button>
        <div className="activity-indicator">
          <span>Neural Activity: {Math.round(activity)}%</span>
          <span>Cognitive Load: {Math.round(cognitiveLoad)}%</span>
        </div>
      </div>
      <div ref={mountRef} className="neurons-canvas" />
    </div>
  );
}
