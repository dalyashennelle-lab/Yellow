
'use client';

import { useState, useEffect, useRef } from 'react';

interface NeuralNetwork3DProps {
  cognitiveLoad: number;
  focusLevel: number;
  memoryScore: number;
}

interface Node {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  activity: number;
  connections: number[];
}

export default function NeuralNetwork3D({ 
  cognitiveLoad, 
  focusLevel, 
  memoryScore 
}: NeuralNetwork3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    // Generate neural network nodes
    const generateNodes = (): Node[] => {
      const nodeCount = 50;
      const newNodes: Node[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const node: Node = {
          id: i,
          x: Math.random() * 400 - 200,
          y: Math.random() * 300 - 150,
          z: Math.random() * 200 - 100,
          size: Math.random() * 3 + 2,
          activity: Math.random(),
          connections: []
        };

        // Create connections to nearby nodes
        if (newNodes.length > 0) {
          const nearbyNodes = newNodes.filter(n => {
            const distance = Math.sqrt(
              Math.pow(n.x - node.x, 2) + 
              Math.pow(n.y - node.y, 2) + 
              Math.pow(n.z - node.z, 2)
            );
            return distance < 100;
          });

          node.connections = nearbyNodes
            .slice(0, Math.floor(Math.random() * 4) + 1)
            .map(n => n.id);
        }

        newNodes.push(node);
      }

      return newNodes;
    };

    setNodes(generateNodes());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set canvas center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw connections
      ctx.strokeStyle = 'rgba(79, 172, 254, 0.2)';
      ctx.lineWidth = 1;
      
      nodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const connectedNode = nodes.find(n => n.id === connectionId);
          if (connectedNode) {
            // Simple 2D projection from 3D
            const x1 = centerX + node.x + Math.sin(animationFrame * 0.01 + node.z * 0.01) * 20;
            const y1 = centerY + node.y + Math.cos(animationFrame * 0.01 + node.z * 0.01) * 10;
            const x2 = centerX + connectedNode.x + Math.sin(animationFrame * 0.01 + connectedNode.z * 0.01) * 20;
            const y2 = centerY + connectedNode.y + Math.cos(animationFrame * 0.01 + connectedNode.z * 0.01) * 10;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        const x = centerX + node.x + Math.sin(animationFrame * 0.01 + node.z * 0.01) * 20;
        const y = centerY + node.y + Math.cos(animationFrame * 0.01 + node.z * 0.01) * 10;
        
        // Node activity affects color and size
        const activity = 0.3 + (node.activity + Math.sin(animationFrame * 0.02 + node.id) * 0.5) * 0.7;
        const size = node.size * (1 + activity * 0.5);
        
        // Color based on cognitive metrics
        const red = Math.floor(79 + focusLevel * 1.76);
        const green = Math.floor(172 + memoryScore * 0.83);
        const blue = Math.floor(254);
        
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${activity})`;
        ctx.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.6)`;
        ctx.shadowBlur = size * 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      setAnimationFrame(prev => prev + 1);
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [nodes, animationFrame, focusLevel, memoryScore]);

  return (
    <div className="neural-network-container">
      <div className="neural-network-header">
        <h3 className="neural-title">3D Neural Network Visualization</h3>
        <div className="neural-stats">
          <div className="stat">
            <strong>Cognitive Load:</strong> {cognitiveLoad}%
          </div>
          <div className="stat">
            <strong>Focus Level:</strong> {focusLevel}%
          </div>
          <div className="stat">
            <strong>Memory Score:</strong> {memoryScore}%
          </div>
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="neural-canvas"
      />
      
      <div className="neural-info">
        Real-time neural network simulation • {nodes.length} nodes active • 
        Activity patterns reflect your cognitive performance metrics
      </div>
    </div>
  );
}
