'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface BrainwaveData {
  timestamp: number;
  alpha: number;
  beta: number;
  gamma: number;
  theta: number;
  delta: number;
}

interface BrainwaveStripsProps {
  cognitiveLoad: number;
  activity: number;
  isActive?: boolean;
  channels?: number;
}

export default function BrainwaveStrips({ 
  cognitiveLoad, 
  activity, 
  isActive = true,
  channels = 8 
}: BrainwaveStripsProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dataRef = useRef<BrainwaveData[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);

  const [isRecording, setIsRecording] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [amplitude, setAmplitude] = useState(1);
  const [timeScale, setTimeScale] = useState(1);

  // Brainwave frequency ranges
  const brainwaveTypes = [
    { name: 'Delta', range: '0.5-4 Hz', color: '#ff6b6b', frequency: 2 },
    { name: 'Theta', range: '4-8 Hz', color: '#4ecdc4', frequency: 6 },
    { name: 'Alpha', range: '8-13 Hz', color: '#45b7d1', frequency: 10.5 },
    { name: 'Beta', range: '13-30 Hz', color: '#96ceb4', frequency: 21.5 },
    { name: 'Gamma', range: '30-100 Hz', color: '#ffeaa7', frequency: 65 }
  ];

  const channelLabels = [
    'Fp1', 'Fp2', 'F3', 'F4', 'C3', 'C4', 'P3', 'P4',
    'O1', 'O2', 'F7', 'F8', 'T3', 'T4', 'T5', 'T6'
  ];

  useEffect(() => {
    if (!svgRef.current || !isActive) return;

    const svg = d3.select(svgRef.current);
    const container = svg.node()?.parentElement;
    if (!container) return;

    const margin = { top: 20, right: 40, bottom: 40, left: 80 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;

    svg.selectAll('*').remove();
    svg.attr('width', container.clientWidth).attr('height', container.clientHeight);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([-channels, channels])
      .range([height, 0]);

    // Line generator
    const line = d3.line<{ x: number; y: number }>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveCardinal);

    // Background grid
    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(channels);

    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis.tickSize(-height).tickFormat(() => ''))
      .style('stroke-dasharray', '2,2')
      .style('opacity', 0.3);

    g.append('g')
      .attr('class', 'grid')
      .call(yAxis.tickSize(-width).tickFormat(() => ''))
      .style('stroke-dasharray', '2,2')
      .style('opacity', 0.3);

    // Channel labels
    g.selectAll('.channel-label')
      .data(channelLabels.slice(0, channels))
      .enter()
      .append('text')
      .attr('class', 'channel-label')
      .attr('x', -10)
      .attr('y', (d, i) => yScale(channels - 1 - i * 2))
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .style('font-size', '12px')
      .style('fill', '#ffffff')
      .text(d => d);

    // Create channel groups
    const channelGroups = g.selectAll('.channel-group')
      .data(d3.range(channels))
      .enter()
      .append('g')
      .attr('class', 'channel-group');

    // Add baseline for each channel
    channelGroups.append('line')
      .attr('class', 'baseline')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d, i) => yScale(channels - 1 - i * 2))
      .attr('y2', (d, i) => yScale(channels - 1 - i * 2))
      .style('stroke', '#444')
      .style('stroke-width', 1);

    // Animation function
    const animate = () => {
      if (!isRecording) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.1 * timeScale;

      // Generate realistic brainwave data
      const newData: BrainwaveData = {
        timestamp: timeRef.current,
        delta: generateBrainwave(2, timeRef.current, cognitiveLoad, activity),
        theta: generateBrainwave(6, timeRef.current, cognitiveLoad, activity),
        alpha: generateBrainwave(10.5, timeRef.current, cognitiveLoad, activity),
        beta: generateBrainwave(21.5, timeRef.current, cognitiveLoad, activity),
        gamma: generateBrainwave(65, timeRef.current, cognitiveLoad, activity)
      };

      dataRef.current.push(newData);

      // Keep only last 1000 data points
      if (dataRef.current.length > 1000) {
        dataRef.current = dataRef.current.slice(-1000);
      }

      // Update each channel
      channelGroups.each(function(channelIndex) {
        const group = d3.select(this);
        
        // Generate channel-specific waveform combining all brainwave types
        const channelData = dataRef.current.map((d, i) => {
          const baseY = channels - 1 - channelIndex * 2;
          let waveValue = 0;

          // Combine different brainwave types with varying weights per channel
          const channelWeights = getChannelWeights(channelIndex);
          waveValue += d.delta * channelWeights.delta;
          waveValue += d.theta * channelWeights.theta;
          waveValue += d.alpha * channelWeights.alpha;
          waveValue += d.beta * channelWeights.beta;
          waveValue += d.gamma * channelWeights.gamma;

          // Add some noise for realism
          waveValue += (Math.random() - 0.5) * 0.1;

          return {
            x: (i / dataRef.current.length) * 100,
            y: baseY + waveValue * amplitude * 0.8
          };
        });

        // Update or create the waveform path
        let path = group.select('.waveform');
        if (path.empty()) {
          path = group.append('path')
            .attr('class', 'waveform')
            .style('fill', 'none')
            .style('stroke-width', 2)
            .style('opacity', 0.8);
        }

        // Color based on channel activity
        const activityLevel = Math.abs(channelData[channelData.length - 1]?.y - (channels - 1 - channelIndex * 2)) || 0;
        const color = d3.interpolateViridis(Math.min(activityLevel / 2, 1));
        
        path
          .datum(channelData)
          .attr('d', line)
          .style('stroke', color)
          .style('filter', selectedChannel === channelIndex ? 'drop-shadow(0 0 5px currentColor)' : 'none');

        // Add frequency-specific overlays for selected channel
        if (selectedChannel === channelIndex) {
          brainwaveTypes.forEach((brainwave, typeIndex) => {
            const typeData = dataRef.current.map((d, i) => {
              const baseY = channels - 1 - channelIndex * 2;
              const typeValue = d[brainwave.name.toLowerCase() as keyof BrainwaveData] as number;
              
              return {
                x: (i / dataRef.current.length) * 100,
                y: baseY + typeValue * amplitude * 0.3
              };
            });

            let typePath = group.select(`.type-${typeIndex}`);
            if (typePath.empty()) {
              typePath = group.append('path')
                .attr('class', `type-${typeIndex}`)
                .style('fill', 'none')
                .style('stroke-width', 1)
                .style('opacity', 0.6);
            }

            typePath
              .datum(typeData)
              .attr('d', line)
              .style('stroke', brainwave.color);
          });
        } else {
          // Remove type-specific paths for non-selected channels
          group.selectAll('[class^="type-"]').remove();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, channels, selectedChannel, amplitude, timeScale, cognitiveLoad, activity, isRecording]);

  // Generate realistic brainwave data
  const generateBrainwave = (frequency: number, time: number, cogLoad: number, act: number): number => {
    const baseAmplitude = 0.5;
    const cognitiveInfluence = (cogLoad / 100) * 0.3;
    const activityInfluence = (act / 100) * 0.2;
    
    // Primary frequency component
    let wave = Math.sin(2 * Math.PI * frequency * time * 0.1) * baseAmplitude;
    
    // Add harmonics for realism
    wave += Math.sin(2 * Math.PI * frequency * 2 * time * 0.1) * baseAmplitude * 0.3;
    wave += Math.sin(2 * Math.PI * frequency * 0.5 * time * 0.1) * baseAmplitude * 0.2;
    
    // Modulate based on cognitive state
    wave *= (1 + cognitiveInfluence + activityInfluence);
    
    // Add some randomness
    wave += (Math.random() - 0.5) * 0.1;
    
    return wave;
  };

  // Get channel-specific weights for different brainwave types
  const getChannelWeights = (channelIndex: number) => {
    const weights = [
      // Frontal channels (Fp1, Fp2, F3, F4) - more beta and gamma
      { delta: 0.2, theta: 0.3, alpha: 0.5, beta: 0.8, gamma: 0.7 },
      { delta: 0.2, theta: 0.3, alpha: 0.5, beta: 0.8, gamma: 0.7 },
      { delta: 0.3, theta: 0.4, alpha: 0.6, beta: 0.9, gamma: 0.8 },
      { delta: 0.3, theta: 0.4, alpha: 0.6, beta: 0.9, gamma: 0.8 },
      // Central channels (C3, C4) - balanced
      { delta: 0.4, theta: 0.5, alpha: 0.7, beta: 0.6, gamma: 0.5 },
      { delta: 0.4, theta: 0.5, alpha: 0.7, beta: 0.6, gamma: 0.5 },
      // Parietal channels (P3, P4) - more alpha
      { delta: 0.3, theta: 0.4, alpha: 0.9, beta: 0.5, gamma: 0.4 },
      { delta: 0.3, theta: 0.4, alpha: 0.9, beta: 0.5, gamma: 0.4 }
    ];
    
    return weights[channelIndex] || weights[0];
  };

  const exportData = () => {
    const csvContent = [
      'Timestamp,Delta,Theta,Alpha,Beta,Gamma',
      ...dataRef.current.map(d => 
        `${d.timestamp},${d.delta},${d.theta},${d.alpha},${d.beta},${d.gamma}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brainwave_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="brainwave-strips-container">
      <div className="brainwave-controls">
        <div className="control-group">
          <button 
            className={`control-btn ${isRecording ? 'recording' : ''}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? '⏹️ Stop' : '▶️ Record'}
          </button>
          <button className="control-btn" onClick={() => dataRef.current = []}>
            🗑️ Clear
          </button>
          <button className="control-btn" onClick={exportData}>
            💾 Export
          </button>
        </div>

        <div className="control-group">
          <label>
            Channel:
            <select 
              value={selectedChannel} 
              onChange={(e) => setSelectedChannel(Number(e.target.value))}
              className="control-select"
            >
              {channelLabels.slice(0, channels).map((label, index) => (
                <option key={index} value={index}>{label}</option>
              ))}
            </select>
          </label>
          
          <label>
            Amplitude:
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
              className="control-range"
            />
            <span>{amplitude.toFixed(1)}x</span>
          </label>
          
          <label>
            Speed:
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={timeScale}
              onChange={(e) => setTimeScale(Number(e.target.value))}
              className="control-range"
            />
            <span>{timeScale.toFixed(1)}x</span>
          </label>
        </div>
      </div>

      <div className="brainwave-legend">
        {brainwaveTypes.map((type, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: type.color }}
            />
            <span className="legend-label">
              {type.name} ({type.range})
            </span>
          </div>
        ))}
      </div>

      <div className="brainwave-visualization">
        <svg ref={svgRef} className="brainwave-svg" />
      </div>

      <div className="brainwave-stats">
        <div className="stat-item">
          <span className="stat-label">Data Points:</span>
          <span className="stat-value">{dataRef.current.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Recording:</span>
          <span className={`stat-value ${isRecording ? 'active' : 'inactive'}`}>
            {isRecording ? 'Active' : 'Stopped'}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Selected:</span>
          <span className="stat-value">{channelLabels[selectedChannel]}</span>
        </div>
      </div>
    </div>
  );
}
