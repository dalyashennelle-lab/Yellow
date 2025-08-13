'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface CognitiveMetrics {
  reactionTime: number;
  accuracy: number;
  workingMemory: number;
  attention: number;
  processing: number;
  fatigue: number;
}

interface AIRealtimeCognitiveProps {
  onMetricsUpdate?: (metrics: CognitiveMetrics) => void;
}

export default function AIRealtimeCognitive({ onMetricsUpdate }: AIRealtimeCognitiveProps) {
  const [isAssessing, setIsAssessing] = useState(false);
  const [currentTest, setCurrentTest] = useState<'reaction' | 'memory' | 'attention' | null>(null);
  const [metrics, setMetrics] = useState<CognitiveMetrics>({
    reactionTime: 0,
    accuracy: 0,
    workingMemory: 0,
    attention: 0,
    processing: 0,
    fatigue: 0
  });
  const [testSequence, setTestSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [showStimulus, setShowStimulus] = useState(false);
  const [stimulusColor, setStimulusColor] = useState('#4facfe');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const attentionTargets = useRef<Array<{x: number, y: number, active: boolean}>>([]);
  const animationRef = useRef<number>();

  // Load TensorFlow.js model (simulated for now)
  const [aiModel, setAiModel] = useState<any>(null);
  
  useEffect(() => {
    // Initialize AI model (placeholder for actual TensorFlow.js model)
    const initAIModel = async () => {
      // In a real implementation, you would load a pre-trained model:
      // const model = await tf.loadLayersModel('/models/cognitive-assessment.json');
      // setAiModel(model);
      
      // For now, we'll simulate with a sophisticated algorithm
      setAiModel({ 
        predict: (data: number[]) => simulateAIPrediction(data),
        loaded: true 
      });
    };
    
    initAIModel();
  }, []);

  // Simulate AI prediction for cognitive metrics
  const simulateAIPrediction = (inputData: number[]) => {
    // Advanced algorithm that simulates machine learning prediction
    const baseline = {
      reactionTime: 250, // ms
      accuracy: 85, // %
      workingMemory: 75, // %
      attention: 80, // %
      processing: 70, // %
      fatigue: 20 // %
    };

    // Apply AI-like transformations based on input data
    const avgReactionTime = inputData.reduce((a, b) => a + b, 0) / inputData.length;
    const variance = inputData.reduce((acc, val) => acc + Math.pow(val - avgReactionTime, 2), 0) / inputData.length;
    const consistency = Math.max(0, 100 - variance / 10);
    
    return {
      reactionTime: Math.round(avgReactionTime),
      accuracy: Math.min(100, Math.max(0, baseline.accuracy + (consistency - 50) * 0.3)),
      workingMemory: Math.min(100, Math.max(0, baseline.workingMemory + (100 - avgReactionTime / 3))),
      attention: Math.min(100, Math.max(0, baseline.attention + consistency * 0.2)),
      processing: Math.min(100, Math.max(0, baseline.processing + (300 - avgReactionTime) / 5)),
      fatigue: Math.min(100, Math.max(0, baseline.fatigue + variance / 20))
    };
  };

  // Reaction Time Test
  const startReactionTest = () => {
    setCurrentTest('reaction');
    setIsAssessing(true);
    setCurrentStep(0);
    
    const runReactionTest = () => {
      const delay = 1000 + Math.random() * 3000; // Random delay 1-4 seconds
      
      setTimeout(() => {
        setStimulusColor(`hsl(${Math.random() * 360}, 70%, 60%)`);
        setShowStimulus(true);
        setStartTime(Date.now());
        
        // Hide stimulus after 2 seconds if no response
        setTimeout(() => {
          if (showStimulus) {
            setShowStimulus(false);
            if (currentStep < 9) {
              setCurrentStep(prev => prev + 1);
              runReactionTest();
            } else {
              finishReactionTest();
            }
          }
        }, 2000);
      }, delay);
    };
    
    runReactionTest();
  };

  const handleReactionClick = () => {
    if (showStimulus && startTime > 0) {
      const reactionTime = Date.now() - startTime;
      setShowStimulus(false);
      
      // Store reaction time data
      const newData = [...(JSON.parse(localStorage.getItem('reactionTimes') || '[]')), reactionTime];
      localStorage.setItem('reactionTimes', JSON.stringify(newData.slice(-20))); // Keep last 20
      
      if (currentStep < 9) {
        setCurrentStep(prev => prev + 1);
        setTimeout(() => {
          startReactionTest();
        }, 500);
      } else {
        finishReactionTest();
      }
    }
  };

  const finishReactionTest = () => {
    const reactionTimes = JSON.parse(localStorage.getItem('reactionTimes') || '[]');
    if (reactionTimes.length > 0 && aiModel) {
      const newMetrics = aiModel.predict(reactionTimes);
      setMetrics(newMetrics);
      onMetricsUpdate?.(newMetrics);
    }
    setCurrentTest(null);
    setIsAssessing(false);
  };

  // Working Memory Test (N-Back Test)
  const startMemoryTest = () => {
    setCurrentTest('memory');
    setIsAssessing(true);
    setCurrentStep(0);
    
    // Generate sequence for 2-back test
    const sequence = Array.from({ length: 20 }, () => Math.floor(Math.random() * 9) + 1);
    setTestSequence(sequence);
    setUserSequence([]);
    
    // Start showing sequence
    showMemorySequence(sequence, 0);
  };

  const showMemorySequence = (sequence: number[], index: number) => {
    if (index >= sequence.length) {
      setCurrentTest(null);
      setIsAssessing(false);
      calculateMemoryScore();
      return;
    }

    setCurrentStep(sequence[index]);
    
    setTimeout(() => {
      setCurrentStep(0);
      setTimeout(() => {
        showMemorySequence(sequence, index + 1);
      }, 500);
    }, 1500);
  };

  const handleMemoryResponse = (isMatch: boolean) => {
    setUserSequence(prev => [...prev, isMatch ? 1 : 0]);
  };

  const calculateMemoryScore = () => {
    // Calculate n-back accuracy
    let correct = 0;
    const nBack = 2;
    
    for (let i = nBack; i < testSequence.length; i++) {
      const isActualMatch = testSequence[i] === testSequence[i - nBack];
      const userResponse = userSequence[i - nBack] === 1;
      
      if (isActualMatch === userResponse) {
        correct++;
      }
    }
    
    const accuracy = (correct / (testSequence.length - nBack)) * 100;
    const newMetrics = { ...metrics, workingMemory: Math.round(accuracy) };
    setMetrics(newMetrics);
    onMetricsUpdate?.(newMetrics);
  };

  // Attention Test (Visual Search)
  const startAttentionTest = () => {
    setCurrentTest('attention');
    setIsAssessing(true);
    setCurrentStep(0);
    
    initializeAttentionCanvas();
    runAttentionTask();
  };

  const initializeAttentionCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d')!;
    canvas.width = 600;
    canvas.height = 400;
    
    // Generate random targets
    attentionTargets.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 40) + 20,
      active: Math.random() > 0.95 // Only 5% are targets
    }));
  };

  const runAttentionTask = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d')!;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      const gradient = ctx.createRadialGradient(300, 200, 0, 300, 200, 300);
      gradient.addColorStop(0, 'rgba(79, 172, 254, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw targets
      attentionTargets.current.forEach(target => {
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.active ? 8 : 6, 0, Math.PI * 2);
        ctx.fillStyle = target.active ? '#ff006e' : '#4facfe';
        ctx.fill();
        
        if (target.active) {
          // Add glow effect for targets
          ctx.shadowColor = '#ff006e';
          ctx.shadowBlur = 20;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      
      if (isAssessing && currentTest === 'attention') {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    // Auto-finish after 30 seconds
    setTimeout(() => {
      if (currentTest === 'attention') {
        finishAttentionTest();
      }
    }, 30000);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (currentTest !== 'attention') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if click hit a target
    const hitTarget = attentionTargets.current.find(target => {
      const distance = Math.sqrt((x - target.x) ** 2 + (y - target.y) ** 2);
      return distance <= (target.active ? 8 : 6);
    });
    
    if (hitTarget && hitTarget.active) {
      // Correct hit
      hitTarget.active = false;
      setCurrentStep(prev => prev + 1);
      
      // Add new target
      attentionTargets.current.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: Math.random() * (canvas.height - 40) + 20,
        active: Math.random() > 0.98
      });
    }
  };

  const finishAttentionTest = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const score = Math.min(100, currentStep * 5); // 5 points per correct target
    const newMetrics = { ...metrics, attention: score };
    setMetrics(newMetrics);
    onMetricsUpdate?.(newMetrics);
    
    setCurrentTest(null);
    setIsAssessing(false);
  };

  // Comprehensive Assessment
  const runFullAssessment = async () => {
    setIsAssessing(true);
    
    // Run all tests in sequence
    await new Promise(resolve => {
      startReactionTest();
      const checkReaction = setInterval(() => {
        if (!isAssessing) {
          clearInterval(checkReaction);
          resolve(void 0);
        }
      }, 100);
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await new Promise(resolve => {
      startMemoryTest();
      const checkMemory = setInterval(() => {
        if (!isAssessing) {
          clearInterval(checkMemory);
          resolve(void 0);
        }
      }, 100);
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    startAttentionTest();
  };

  // Animate metrics updates
  useEffect(() => {
    const elements = document.querySelectorAll('.metric-value');
    elements.forEach((element, index) => {
      gsap.to(element, {
        textContent: Object.values(metrics)[index],
        duration: 1,
        ease: "power2.out",
        snap: { textContent: 1 }
      });
    });
  }, [metrics]);

  return (
    <div className="ai-cognitive-container">
      <div className="cognitive-header">
        <h2 className="cognitive-title">AI-Powered Cognitive Assessment</h2>
        <div className="ai-status">
          <span className={`ai-indicator ${aiModel ? 'active' : 'loading'}`}>
            🧠 {aiModel ? 'AI Ready' : 'Loading AI...'}
          </span>
        </div>
      </div>

      <div className="metrics-dashboard">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="metric-item">
            <div className="metric-icon">
              {key === 'reactionTime' && '⚡'}
              {key === 'accuracy' && '🎯'}
              {key === 'workingMemory' && '🧠'}
              {key === 'attention' && '👁️'}
              {key === 'processing' && '⚙️'}
              {key === 'fatigue' && '😴'}
            </div>
            <div className="metric-info">
              <span className="metric-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              <span className="metric-value">{value}</span>
              <span className="metric-unit">
                {key === 'reactionTime' ? 'ms' : '%'}
              </span>
            </div>
            <div className="metric-trend">
              <div className={`trend-indicator ${value > 75 ? 'positive' : value > 50 ? 'neutral' : 'negative'}`}>
                {value > 75 ? '📈' : value > 50 ? '➡️' : '📉'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="test-interface">
        {!isAssessing ? (
          <div className="test-selection">
            <button 
              className="test-button primary"
              onClick={runFullAssessment}
            >
              🚀 Full Cognitive Assessment
            </button>
            
            <div className="individual-tests">
              <button 
                className="test-button secondary"
                onClick={startReactionTest}
              >
                ⚡ Reaction Time
              </button>
              <button 
                className="test-button secondary"
                onClick={startMemoryTest}
              >
                🧠 Working Memory
              </button>
              <button 
                className="test-button secondary"
                onClick={startAttentionTest}
              >
                👁️ Attention
              </button>
            </div>
          </div>
        ) : (
          <div className="active-test">
            {currentTest === 'reaction' && (
              <div className="reaction-test">
                <h3>Reaction Time Test</h3>
                <p>Click when you see the colored circle appear</p>
                <div 
                  className={`stimulus ${showStimulus ? 'visible' : ''}`}
                  style={{ backgroundColor: stimulusColor }}
                  onClick={handleReactionClick}
                />
                <div className="progress">Step {currentStep + 1} of 10</div>
              </div>
            )}

            {currentTest === 'memory' && (
              <div className="memory-test">
                <h3>Working Memory Test (2-Back)</h3>
                <p>Press "Match" if current number matches the one 2 steps back</p>
                <div className="memory-display">
                  {currentStep > 0 ? currentStep : ''}
                </div>
                <div className="memory-controls">
                  <button onClick={() => handleMemoryResponse(true)}>Match</button>
                  <button onClick={() => handleMemoryResponse(false)}>No Match</button>
                </div>
              </div>
            )}

            {currentTest === 'attention' && (
              <div className="attention-test">
                <h3>Visual Attention Test</h3>
                <p>Click on the red (target) circles as quickly as possible</p>
                <canvas 
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="attention-canvas"
                />
                <div className="targets-found">Targets Found: {currentStep}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="ai-insights">
        <h3>AI Analysis</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Performance Trend</h4>
            <p>Your cognitive performance shows {metrics.attention > 70 ? 'strong' : 'developing'} attention control with {metrics.reactionTime < 300 ? 'excellent' : 'good'} response times.</p>
          </div>
          <div className="insight-card">
            <h4>Recommendations</h4>
            <p>Based on your results, focus on {metrics.workingMemory < 70 ? 'memory training exercises' : 'advanced cognitive challenges'} to optimize performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
