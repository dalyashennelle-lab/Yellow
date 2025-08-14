
'use client';

import { useEffect, useRef } from 'react';

interface BrainwaveData {
  delta: number;
  theta: number;
  alpha: number;
  beta: number;
  gamma: number;
}

interface BrainwaveChartProps {
  data: BrainwaveData;
}

export default function BrainwaveChart({ data }: BrainwaveChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const chartWidth = canvas.width - 80;
    const chartHeight = canvas.height - 60;
    const barWidth = chartWidth / 5;

    // Colors for each brainwave
    const colors = {
      delta: '#ff006e',
      theta: '#8338ec',
      alpha: '#3a86ff',
      beta: '#06ffa5',
      gamma: '#ffbe0b'
    };

    // Draw bars
    Object.entries(data).forEach(([wave, value], index) => {
      const barHeight = (value / 100) * chartHeight;
      const x = 40 + index * barWidth + barWidth * 0.1;
      const y = chartHeight - barHeight + 30;

      // Draw bar
      ctx.fillStyle = colors[wave as keyof typeof colors];
      ctx.fillRect(x, y, barWidth * 0.8, barHeight);

      // Draw label
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(wave.toUpperCase(), x + barWidth * 0.4, chartHeight + 50);
      ctx.fillText(`${Math.round(value)}%`, x + barWidth * 0.4, y - 10);
    });

  }, [data]);

  return (
    <div className="brainwave-chart">
      <h3>Real-Time Brainwave Activity</h3>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300}
        style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}
      />
    </div>
  );
}
