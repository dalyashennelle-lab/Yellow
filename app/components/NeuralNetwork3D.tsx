
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralNetwork3DProps {
  cognitiveLoad: number;
  memoryScore: number;
  focusLevel: number;
  stressLevel: number;
}

export default function NeuralNetwork3D({ cognitiveLoad, memoryScore, focusLevel, stressLevel }: NeuralNetwork3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create neural network nodes
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    
    for (let i = 0; i < 50; i++) {
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6, 1, 0.5 + Math.random() * 0.5)
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      node.position.x = (Math.random() - 0.5) * 8;
      node.position.y = (Math.random() - 0.5) * 6;
      node.position.z = (Math.random() - 0.5) * 4;
      
      scene.add(node);
      nodes.push(node);
    }

    // Create connections between nodes
    const connections: THREE.Line[] = [];
    const lineGeometry = new THREE.BufferGeometry();
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < 0.1) { // 10% chance of connection
          const points = [
            nodes[i].position,
            nodes[j].position
          ];
          
          lineGeometry.setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x4facfe,
            opacity: 0.3,
            transparent: true
          });
          
          const line = new THREE.Line(lineGeometry.clone(), lineMaterial);
          scene.add(line);
          connections.push(line);
        }
      }
    }

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Animate nodes based on cognitive metrics
      nodes.forEach((node, index) => {
        const time = Date.now() * 0.001;
        node.rotation.x = time * 0.5;
        node.rotation.y = time * 0.3;
        
        // Pulse based on cognitive load
        const scale = 1 + Math.sin(time + index) * 0.3 * (cognitiveLoad / 100);
        node.scale.setScalar(scale);
        
        // Color based on focus level
        const hue = 0.6 + (focusLevel / 100) * 0.4;
        (node.material as THREE.MeshBasicMaterial).color.setHSL(hue, 1, 0.5);
      });

      // Animate connections
      connections.forEach((connection, index) => {
        const opacity = 0.1 + (memoryScore / 100) * 0.5 + Math.sin(Date.now() * 0.001 + index) * 0.2;
        (connection.material as THREE.LineBasicMaterial).opacity = Math.max(0, opacity);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [cognitiveLoad, memoryScore, focusLevel, stressLevel]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '400px',
        borderRadius: '12px',
        overflow: 'hidden'
      }} 
    />
  );
}
