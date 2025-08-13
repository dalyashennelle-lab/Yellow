'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface CognitiveMetrics {
  timestamp: number;
  attention: number;
  memory: number;
  processing: number;
  reactionTime: number;
  accuracy: number;
  cognitiveLoad: number;
}

interface BaselineData {
  attention: number;
  memory: number;
  processing: number;
  reactionTime: number;
  accuracy: number;
}

interface ZScoreData {
  metric: string;
  current: number;
  baseline: number;
  zScore: number;
  percentile: number;
  classification: string;
}

interface CognitiveDashboardProps {
  currentMetrics: CognitiveMetrics;
  historicalData: CognitiveMetrics[];
  baseline?: BaselineData;
}

export default function CognitiveDashboard({ 
  currentMetrics, 
  historicalData, 
  baseline 
}: CognitiveDashboardProps) {
  const lineChartRef = useRef<SVGSVGElement>(null);
  const barChartRef = useRef<SVGSVGElement>(null);
  const radarChartRef = useRef<SVGSVGElement>(null);
  const zScoreChartRef = useRef<SVGSVGElement>(null);

  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [selectedMetric, setSelectedMetric] = useState<keyof CognitiveMetrics>('attention');
  const [zScores, setZScores] = useState<ZScoreData[]>([]);

  // Default baseline if none provided
  const defaultBaseline: BaselineData = {
    attention: 75,
    memory: 70,
    processing: 80,
    reactionTime: 350,
    accuracy: 85
  };

  const currentBaseline = baseline || defaultBaseline;

  // Calculate Z-scores
  useEffect(() => {
    const calculateZScore = (current: number, mean: number, stdDev: number): number => {
      return (current - mean) / stdDev;
    };

    const calculatePercentile = (zScore: number): number => {
      // Approximate percentile from z-score using normal distribution
      return Math.round(50 * (1 + Math.sign(zScore) * Math.sqrt(1 - Math.exp(-2 * zScore * zScore / Math.PI))));
    };

    const getClassification = (zScore: number): string => {
      if (zScore > 2) return 'Exceptional';
      if (zScore > 1) return 'Above Average';
      if (zScore > -1) return 'Average';
      if (zScore > -2) return 'Below Average';
      return 'Needs Attention';
    };

    // Calculate standard deviations from historical data
    const calculateStdDev = (values: number[]): number => {
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
      return Math.sqrt(variance);
    };

    if (historicalData.length > 0) {
      const attentionValues = historicalData.map(d => d.attention);
      const memoryValues = historicalData.map(d => d.memory);
      const processingValues = historicalData.map(d => d.processing);
      const reactionTimeValues = historicalData.map(d => d.reactionTime);
      const accuracyValues = historicalData.map(d => d.accuracy);

      const attentionStdDev = calculateStdDev(attentionValues);
      const memoryStdDev = calculateStdDev(memoryValues);
      const processingStdDev = calculateStdDev(processingValues);
      const reactionTimeStdDev = calculateStdDev(reactionTimeValues);
      const accuracyStdDev = calculateStdDev(accuracyValues);

      const newZScores: ZScoreData[] = [
        {
          metric: 'Attention',
          current: currentMetrics.attention,
          baseline: currentBaseline.attention,
          zScore: calculateZScore(currentMetrics.attention, currentBaseline.attention, attentionStdDev || 10),
          percentile: 0,
          classification: ''
        },
        {
          metric: 'Memory',
          current: currentMetrics.memory,
          baseline: currentBaseline.memory,
          zScore: calculateZScore(currentMetrics.memory, currentBaseline.memory, memoryStdDev || 10),
          percentile: 0,
          classification: ''
        },
        {
          metric: 'Processing',
          current: currentMetrics.processing,
          baseline: currentBaseline.processing,
          zScore: calculateZScore(currentMetrics.processing, currentBaseline.processing, processingStdDev || 10),
          percentile: 0,
          classification: ''
        },
        {
          metric: 'Reaction Time',
          current: currentMetrics.reactionTime,
          baseline: currentBaseline.reactionTime,
          zScore: calculateZScore(currentBaseline.reactionTime, currentMetrics.reactionTime, reactionTimeStdDev || 50), // Inverted for reaction time
          percentile: 0,
          classification: ''
        },
        {
          metric: 'Accuracy',
          current: currentMetrics.accuracy,
          baseline: currentBaseline.accuracy,
          zScore: calculateZScore(currentMetrics.accuracy, currentBaseline.accuracy, accuracyStdDev || 10),
          percentile: 0,
          classification: ''
        }
      ].map(item => ({
        ...item,
        percentile: calculatePercentile(item.zScore),
        classification: getClassification(item.zScore)
      }));

      setZScores(newZScores);
    }
  }, [
    currentMetrics.attention,
    currentMetrics.memory,
    currentMetrics.processing,
    currentMetrics.reactionTime,
    currentMetrics.accuracy,
    currentBaseline.attention,
    currentBaseline.memory,
    currentBaseline.processing,
    currentBaseline.reactionTime,
    currentBaseline.accuracy,
    historicalData.length
  ]);

  // Line Chart Implementation
  useEffect(() => {
    if (!lineChartRef.current || historicalData.length === 0) return;

    const svg = d3.select(lineChartRef.current);
    const container = svg.node()?.parentElement;
    if (!container) return;

    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    svg.attr('width', container.clientWidth).attr('height', 300);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Filter data based on time range
    const now = Date.now();
    const timeRanges = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };

    const filteredData = historicalData.filter(d => 
      now - d.timestamp <= timeRanges[selectedTimeRange]
    );

    const xScale = d3.scaleTime()
      .domain(d3.extent(filteredData, d => new Date(d.timestamp)) as [Date, Date])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Create line generator
    const line = d3.line<CognitiveMetrics>()
      .x(d => xScale(new Date(d.timestamp)))
      .y(d => yScale(d[selectedMetric] as number))
      .curve(d3.curveMonotoneX);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%H:%M')));

    g.append('g')
      .call(d3.axisLeft(yScale));

    // Add baseline line
    const baselineValue = currentBaseline[selectedMetric as keyof BaselineData] as number;
    g.append('line')
      .attr('class', 'baseline')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', yScale(baselineValue))
      .attr('y2', yScale(baselineValue))
      .style('stroke', '#ff6b6b')
      .style('stroke-dasharray', '5,5')
      .style('stroke-width', 2);

    // Add data line
    g.append('path')
      .datum(filteredData)
      .attr('class', 'data-line')
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', '#4ecdc4')
      .style('stroke-width', 3);

    // Add data points
    g.selectAll('.data-point')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => xScale(new Date(d.timestamp)))
      .attr('cy', d => yScale(d[selectedMetric] as number))
      .attr('r', 4)
      .style('fill', '#4ecdc4')
      .style('stroke', '#ffffff')
      .style('stroke-width', 2);

    // Add labels
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('fill', '#ffffff')
      .text(selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1));

  }, [historicalData, selectedTimeRange, selectedMetric, currentBaseline]);

  // Z-Score Bar Chart
  useEffect(() => {
    if (!zScoreChartRef.current || zScores.length === 0) return;

    const svg = d3.select(zScoreChartRef.current);
    const container = svg.node()?.parentElement;
    if (!container) return;

    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 60, left: 120 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    svg.attr('width', container.clientWidth).attr('height', 350);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain([-3, 3])
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(zScores.map(d => d.metric))
      .range([0, height])
      .padding(0.1);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .call(d3.axisLeft(yScale));

    // Add zero line
    g.append('line')
      .attr('x1', xScale(0))
      .attr('x2', xScale(0))
      .attr('y1', 0)
      .attr('y2', height)
      .style('stroke', '#666')
      .style('stroke-width', 2);

    // Add bars
    g.selectAll('.z-score-bar')
      .data(zScores)
      .enter()
      .append('rect')
      .attr('class', 'z-score-bar')
      .attr('x', d => d.zScore >= 0 ? xScale(0) : xScale(d.zScore))
      .attr('y', d => yScale(d.metric)!)
      .attr('width', d => Math.abs(xScale(d.zScore) - xScale(0)))
      .attr('height', yScale.bandwidth())
      .style('fill', d => {
        if (d.zScore > 1) return '#4ecdc4';
        if (d.zScore > 0) return '#96ceb4';
        if (d.zScore > -1) return '#feca57';
        return '#ff6b6b';
      });

    // Add value labels
    g.selectAll('.z-score-label')
      .data(zScores)
      .enter()
      .append('text')
      .attr('class', 'z-score-label')
      .attr('x', d => xScale(d.zScore) + (d.zScore >= 0 ? 5 : -5))
      .attr('y', d => yScale(d.metric)! + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', d => d.zScore >= 0 ? 'start' : 'end')
      .style('fill', '#ffffff')
      .style('font-size', '12px')
      .text(d => d.zScore.toFixed(2));

  }, [zScores]);

  // Radar Chart
  useEffect(() => {
    if (!radarChartRef.current) return;

    const svg = d3.select(radarChartRef.current);
    const container = svg.node()?.parentElement;
    if (!container) return;

    svg.selectAll('*').remove();

    const size = Math.min(container.clientWidth, 350);
    const radius = size / 2 - 50;
    const center = size / 2;

    svg.attr('width', size).attr('height', size);

    const g = svg.append('g').attr('transform', `translate(${center},${center})`);

    const metrics = ['attention', 'memory', 'processing', 'accuracy'];
    const angleStep = (2 * Math.PI) / metrics.length;

    // Draw concentric circles
    const levels = 5;
    for (let i = 1; i <= levels; i++) {
      g.append('circle')
        .attr('r', (radius / levels) * i)
        .style('fill', 'none')
        .style('stroke', '#444')
        .style('stroke-width', 1);
    }

    // Draw axis lines and labels
    metrics.forEach((metric, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Axis line
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .style('stroke', '#666')
        .style('stroke-width', 1);

      // Label
      g.append('text')
        .attr('x', x * 1.1)
        .attr('y', y * 1.1)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .style('fill', '#ffffff')
        .style('font-size', '12px')
        .text(metric.charAt(0).toUpperCase() + metric.slice(1));
    });

    // Current metrics polygon
    const currentData = metrics.map((metric, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const value = currentMetrics[metric as keyof CognitiveMetrics] as number;
      const normalizedValue = value / 100;
      return {
        x: Math.cos(angle) * radius * normalizedValue,
        y: Math.sin(angle) * radius * normalizedValue
      };
    });

    const lineGenerator = d3.line<{x: number, y: number}>()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveLinearClosed);

    g.append('path')
      .datum(currentData)
      .attr('d', lineGenerator)
      .style('fill', '#4ecdc4')
      .style('fill-opacity', 0.3)
      .style('stroke', '#4ecdc4')
      .style('stroke-width', 2);

    // Baseline polygon
    const baselineData = metrics.map((metric, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const value = currentBaseline[metric as keyof BaselineData] as number;
      const normalizedValue = value / 100;
      return {
        x: Math.cos(angle) * radius * normalizedValue,
        y: Math.sin(angle) * radius * normalizedValue
      };
    });

    g.append('path')
      .datum(baselineData)
      .attr('d', lineGenerator)
      .style('fill', 'none')
      .style('stroke', '#ff6b6b')
      .style('stroke-width', 2)
      .style('stroke-dasharray', '5,5');

  }, [currentMetrics, currentBaseline]);

  return (
    <div className="cognitive-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Cognitive Performance Dashboard</h2>
        <div className="dashboard-controls">
          <div className="time-range-selector">
            {(['1h', '24h', '7d', '30d'] as const).map(range => (
              <button
                key={range}
                className={`time-btn ${selectedTimeRange === range ? 'active' : ''}`}
                onClick={() => setSelectedTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="metric-selector">
            <select 
              value={selectedMetric} 
              onChange={(e) => setSelectedMetric(e.target.value as keyof CognitiveMetrics)}
              className="metric-select"
            >
              <option value="attention">Attention</option>
              <option value="memory">Memory</option>
              <option value="processing">Processing</option>
              <option value="reactionTime">Reaction Time</option>
              <option value="accuracy">Accuracy</option>
            </select>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Current Metrics Cards */}
        <div className="metrics-cards">
          <div className="metric-card attention">
            <div className="metric-icon">🎯</div>
            <div className="metric-info">
              <h3>Attention</h3>
              <div className="metric-value">{currentMetrics.attention.toFixed(1)}%</div>
              <div className="metric-change">
                {currentMetrics.attention > currentBaseline.attention ? '↗️' : '↘️'} 
                vs baseline
              </div>
            </div>
          </div>

          <div className="metric-card memory">
            <div className="metric-icon">🧠</div>
            <div className="metric-info">
              <h3>Memory</h3>
              <div className="metric-value">{currentMetrics.memory.toFixed(1)}%</div>
              <div className="metric-change">
                {currentMetrics.memory > currentBaseline.memory ? '↗️' : '↘️'} 
                vs baseline
              </div>
            </div>
          </div>

          <div className="metric-card processing">
            <div className="metric-icon">⚡</div>
            <div className="metric-info">
              <h3>Processing</h3>
              <div className="metric-value">{currentMetrics.processing.toFixed(1)}%</div>
              <div className="metric-change">
                {currentMetrics.processing > currentBaseline.processing ? '↗️' : '↘️'} 
                vs baseline
              </div>
            </div>
          </div>

          <div className="metric-card reaction">
            <div className="metric-icon">⏱️</div>
            <div className="metric-info">
              <h3>Reaction Time</h3>
              <div className="metric-value">{currentMetrics.reactionTime.toFixed(0)}ms</div>
              <div className="metric-change">
                {currentMetrics.reactionTime < currentBaseline.reactionTime ? '↗️' : '↘️'} 
                vs baseline
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="chart-container">
          <h3>Trend Analysis - {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}</h3>
          <svg ref={lineChartRef} className="line-chart" />
        </div>

        {/* Z-Score Chart */}
        <div className="chart-container">
          <h3>Z-Score Analysis (vs Baseline)</h3>
          <svg ref={zScoreChartRef} className="z-score-chart" />
          <div className="z-score-legend">
            <div className="legend-item">
              <div className="legend-color exceptional"></div>
              <span>Exceptional (&gt;2σ)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color above-average"></div>
              <span>Above Average (1-2σ)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color average"></div>
              <span>Average (±1σ)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color below-average"></div>
              <span>Below Average (&lt;-1σ)</span>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="chart-container">
          <h3>Performance Profile</h3>
          <svg ref={radarChartRef} className="radar-chart" />
          <div className="radar-legend">
            <div className="legend-item">
              <div className="legend-line current"></div>
              <span>Current Performance</span>
            </div>
            <div className="legend-item">
              <div className="legend-line baseline"></div>
              <span>Baseline</span>
            </div>
          </div>
        </div>

        {/* Z-Score Table */}
        <div className="z-score-table-container">
          <h3>Performance Analysis</h3>
          <table className="z-score-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Current</th>
                <th>Baseline</th>
                <th>Z-Score</th>
                <th>Percentile</th>
                <th>Classification</th>
              </tr>
            </thead>
            <tbody>
              {zScores.map((item, index) => (
                <tr key={index}>
                  <td>{item.metric}</td>
                  <td>{item.current.toFixed(1)}</td>
                  <td>{item.baseline.toFixed(1)}</td>
                  <td className={`z-score ${item.zScore > 0 ? 'positive' : 'negative'}`}>
                    {item.zScore.toFixed(2)}
                  </td>
                  <td>{item.percentile}%</td>
                  <td className={`classification ${item.classification.toLowerCase().replace(' ', '-')}`}>
                    {item.classification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
