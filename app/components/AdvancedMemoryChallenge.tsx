
'use client';

import { useState, useEffect } from 'react';

interface MemoryPattern {
  id: number;
  sequence: number[];
  difficulty: string;
  timeLimit: number;
}

export default function AdvancedMemoryChallenge() {
  const [currentPattern, setCurrentPattern] = useState<MemoryPattern | null>(null);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const difficulties = [
    { name: 'Novice', length: 3, time: 3000 },
    { name: 'Intermediate', length: 5, time: 2500 },
    { name: 'Advanced', length: 7, time: 2000 },
    { name: 'Expert', length: 9, time: 1500 },
    { name: 'Master', length: 12, time: 1000 }
  ];

  const generatePattern = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
  };

  const startChallenge = () => {
    const difficulty = difficulties[Math.min(Math.floor(level / 3), difficulties.length - 1)];
    const pattern: MemoryPattern = {
      id: Date.now(),
      sequence: generatePattern(difficulty.length),
      difficulty: difficulty.name,
      timeLimit: difficulty.time
    };
    
    setCurrentPattern(pattern);
    setUserSequence([]);
    setIsShowing(true);
    setGameActive(true);
    setTimeLeft(pattern.timeLimit);
    
    setTimeout(() => {
      setIsShowing(false);
    }, pattern.timeLimit);
  };

  const handleNumberClick = (number: number) => {
    if (isShowing || !gameActive) return;
    
    const newSequence = [...userSequence, number];
    setUserSequence(newSequence);
    
    if (currentPattern && newSequence.length === currentPattern.sequence.length) {
      checkAnswer(newSequence);
    }
  };

  const checkAnswer = (sequence: number[]) => {
    if (!currentPattern) return;
    
    const correct = sequence.every((num, index) => num === currentPattern.sequence[index]);
    
    if (correct) {
      setScore(score + level * 10);
      setLevel(level + 1);
      setTimeout(startChallenge, 1000);
    } else {
      setGameActive(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && isShowing) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 100), 100);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isShowing]);

  return (
    <div className="memory-challenge-container">
      <div className="challenge-header">
        <h2>🧠 Advanced Memory Challenge</h2>
        <div className="challenge-stats">
          <div className="stat">Level: {level}</div>
          <div className="stat">Score: {score}</div>
          <div className="stat">Difficulty: {currentPattern?.difficulty || 'Ready'}</div>
        </div>
      </div>

      {!gameActive ? (
        <div className="challenge-start">
          <button onClick={startChallenge} className="start-challenge-btn">
            {score === 0 ? 'Start Challenge' : 'Try Again'}
          </button>
          {score > 0 && (
            <div className="final-score">
              <h3>Final Score: {score}</h3>
              <p>Level Reached: {level - 1}</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {isShowing && (
            <div className="pattern-display">
              <div className="timer-bar">
                <div 
                  className="timer-fill"
                  style={{ width: `${(timeLeft / (currentPattern?.timeLimit || 1)) * 100}%` }}
                />
              </div>
              <p>Memorize this sequence:</p>
              <div className="sequence-display">
                {currentPattern?.sequence.map((num, index) => (
                  <div key={index} className="sequence-number active">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isShowing && (
            <div className="input-phase">
              <p>Click the numbers in the correct order:</p>
              <div className="user-sequence">
                {userSequence.map((num, index) => (
                  <div key={index} className="sequence-number user-input">
                    {num}
                  </div>
                ))}
              </div>
              <div className="number-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    className="number-btn"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
