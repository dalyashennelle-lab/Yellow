'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface GameSession {
  gameType: string;
  score: number;
  accuracy: number;
  reactionTime: number;
  difficulty: number;
  timestamp: number;
  duration: number;
}

interface AdaptiveMiniGamesProps {
  onScoreUpdate?: (score: number, accuracy: number, reactionTime: number) => void;
  onDifficultyChange?: (difficulty: number) => void;
}

type GameType = 'nback' | 'reaction' | 'pattern';

interface NBackItem {
  value: string;
  isMatch: boolean;
  userResponse?: boolean;
}

interface PatternItem {
  id: number;
  color: string;
  position: { x: number; y: number };
  isActive: boolean;
}

export default function AdaptiveMiniGames({ 
  onScoreUpdate, 
  onDifficultyChange 
}: AdaptiveMiniGamesProps) {
  const [currentGame, setCurrentGame] = useState<GameType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [difficulty, setDifficulty] = useState(1);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  // N-Back Game State
  const [nBackSequence, setNBackSequence] = useState<NBackItem[]>([]);
  const [currentNBackIndex, setCurrentNBackIndex] = useState(0);
  const [nBackN, setNBackN] = useState(2);
  const [showingNBackItem, setShowingNBackItem] = useState(false);

  // Reaction Game State
  const [reactionStartTime, setReactionStartTime] = useState<number | null>(null);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [waitingForReaction, setWaitingForReaction] = useState(false);
  const [reactionCount, setReactionCount] = useState(0);

  // Pattern Game State
  const [patternSequence, setPatternSequence] = useState<PatternItem[]>([]);
  const [showingPattern, setShowingPattern] = useState(false);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [patternStep, setPatternStep] = useState(0);

  const gameTimeoutRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>(0);

  // Adaptive difficulty adjustment
  const adjustDifficulty = useCallback((performance: number) => {
    let newDifficulty = difficulty;
    
    if (performance > 85) {
      newDifficulty = Math.min(10, difficulty + 0.5);
    } else if (performance < 60) {
      newDifficulty = Math.max(1, difficulty - 0.5);
    }
    
    if (newDifficulty !== difficulty) {
      setDifficulty(newDifficulty);
      onDifficultyChange?.(newDifficulty);
    }
  }, [difficulty, onDifficultyChange]);

  // N-Back Game Implementation
  const generateNBackSequence = useCallback((length: number, nValue: number) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const sequence: NBackItem[] = [];
    
    for (let i = 0; i < length; i++) {
      const isMatch = i >= nValue && Math.random() < 0.3;
      const value = isMatch 
        ? sequence[i - nValue].value 
        : letters[Math.floor(Math.random() * letters.length)];
      
      sequence.push({ value, isMatch });
    }
    
    return sequence;
  }, []);

  const startNBackGame = useCallback(() => {
    const sequenceLength = Math.max(20, Math.floor(difficulty * 5));
    const sequence = generateNBackSequence(sequenceLength, nBackN);
    setNBackSequence(sequence);
    setCurrentNBackIndex(0);
    setScore(0);
    setAccuracy(100);
    startTimeRef.current = Date.now();
    
    // Start showing sequence
    setShowingNBackItem(true);
    gameTimeoutRef.current = setTimeout(() => {
      setShowingNBackItem(false);
      setTimeout(() => showNextNBackItem(sequence, 1), 500);
    }, 1500);
  }, [difficulty, nBackN, generateNBackSequence]);

  const showNextNBackItem = useCallback((sequence: NBackItem[], index: number) => {
    if (index >= sequence.length) {
      endNBackGame();
      return;
    }
    
    setCurrentNBackIndex(index);
    setShowingNBackItem(true);
    
    gameTimeoutRef.current = setTimeout(() => {
      setShowingNBackItem(false);
      setTimeout(() => showNextNBackItem(sequence, index + 1), 500);
    }, 1500);
  }, []);

  const handleNBackResponse = useCallback((isMatch: boolean) => {
    if (currentNBackIndex < nBackN) return;
    
    const correctAnswer = nBackSequence[currentNBackIndex]?.isMatch;
    const isCorrect = isMatch === correctAnswer;
    
    // Update sequence with user response
    const updatedSequence = [...nBackSequence];
    updatedSequence[currentNBackIndex] = {
      ...updatedSequence[currentNBackIndex],
      userResponse: isMatch
    };
    setNBackSequence(updatedSequence);
    
    // Update score and accuracy
    const newScore = isCorrect ? score + 10 : score;
    setScore(newScore);
    
    const totalResponses = updatedSequence.filter(item => item.userResponse !== undefined).length;
    const correctResponses = updatedSequence.filter(item => 
      item.userResponse !== undefined && item.userResponse === item.isMatch
    ).length;
    
    const newAccuracy = totalResponses > 0 ? (correctResponses / totalResponses) * 100 : 100;
    setAccuracy(newAccuracy);
    
    onScoreUpdate?.(newScore, newAccuracy, 0);
  }, [currentNBackIndex, nBackN, nBackSequence, score, onScoreUpdate]);

  const endNBackGame = useCallback(() => {
    const duration = Date.now() - startTimeRef.current;
    const session: GameSession = {
      gameType: 'nback',
      score,
      accuracy,
      reactionTime: 0,
      difficulty,
      timestamp: Date.now(),
      duration
    };
    setGameSession(session);
    adjustDifficulty(accuracy);
    setIsPlaying(false);
  }, [score, accuracy, difficulty, adjustDifficulty]);

  // Reaction Time Game Implementation
  const startReactionGame = useCallback(() => {
    setReactionTimes([]);
    setReactionCount(0);
    setScore(0);
    setAccuracy(100);
    startTimeRef.current = Date.now();
    scheduleNextReaction();
  }, []);

  const scheduleNextReaction = useCallback(() => {
    const delay = 1000 + Math.random() * 3000; // 1-4 seconds
    
    gameTimeoutRef.current = setTimeout(() => {
      setReactionStartTime(Date.now());
      setWaitingForReaction(true);
    }, delay);
  }, []);

  const handleReactionClick = useCallback(() => {
    if (!waitingForReaction || !reactionStartTime) return;
    
    const reactionTime = Date.now() - reactionStartTime;
    const newReactionTimes = [...reactionTimes, reactionTime];
    setReactionTimes(newReactionTimes);
    setWaitingForReaction(false);
    setReactionStartTime(null);
    
    // Calculate score based on reaction time
    const maxTime = 1000 + (difficulty * 100);
    const timeScore = Math.max(0, maxTime - reactionTime);
    const newScore = score + Math.floor(timeScore / 10);
    setScore(newScore);
    
    // Calculate accuracy (percentage of reactions under target time)
    const targetTime = 500 + (difficulty * 50);
    const fastReactions = newReactionTimes.filter(time => time < targetTime).length;
    const newAccuracy = (fastReactions / newReactionTimes.length) * 100;
    setAccuracy(newAccuracy);
    
    const avgReactionTime = newReactionTimes.reduce((a, b) => a + b, 0) / newReactionTimes.length;
    onScoreUpdate?.(newScore, newAccuracy, avgReactionTime);
    
    setReactionCount(prev => prev + 1);
    
    if (newReactionTimes.length < 10) {
      setTimeout(scheduleNextReaction, 1000);
    } else {
      endReactionGame(newScore, newAccuracy, avgReactionTime);
    }
  }, [waitingForReaction, reactionStartTime, reactionTimes, score, difficulty, onScoreUpdate, scheduleNextReaction]);

  const endReactionGame = useCallback((finalScore: number, finalAccuracy: number, avgReactionTime: number) => {
    const duration = Date.now() - startTimeRef.current;
    const session: GameSession = {
      gameType: 'reaction',
      score: finalScore,
      accuracy: finalAccuracy,
      reactionTime: avgReactionTime,
      difficulty,
      timestamp: Date.now(),
      duration
    };
    setGameSession(session);
    adjustDifficulty(finalAccuracy);
    setIsPlaying(false);
  }, [difficulty, adjustDifficulty]);

  // Pattern Matching Game Implementation
  const generatePattern = useCallback((length: number) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#48dbfb', '#ff9ff3'];
    const pattern: PatternItem[] = [];
    
    for (let i = 0; i < length; i++) {
      pattern.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        position: {
          x: Math.floor(Math.random() * 4),
          y: Math.floor(Math.random() * 4)
        },
        isActive: false
      });
    }
    
    return pattern;
  }, []);

  const startPatternGame = useCallback(() => {
    const patternLength = Math.max(3, Math.floor(difficulty * 2));
    const pattern = generatePattern(patternLength);
    setPatternSequence(pattern);
    setUserPattern([]);
    setPatternStep(0);
    setScore(0);
    setAccuracy(100);
    startTimeRef.current = Date.now();
    
    // Show pattern sequence
    showPatternSequence(pattern, 0);
  }, [difficulty, generatePattern]);

  const showPatternSequence = useCallback((pattern: PatternItem[], step: number) => {
    if (step >= pattern.length) {
      setShowingPattern(false);
      return;
    }
    
    setShowingPattern(true);
    const updatedPattern = pattern.map((item, index) => ({
      ...item,
      isActive: index === step
    }));
    setPatternSequence(updatedPattern);
    
    gameTimeoutRef.current = setTimeout(() => {
      const clearedPattern = pattern.map(item => ({ ...item, isActive: false }));
      setPatternSequence(clearedPattern);
      setTimeout(() => showPatternSequence(pattern, step + 1), 200);
    }, 800);
  }, []);

  const handlePatternClick = useCallback((itemId: number) => {
    if (showingPattern) return;
    
    const newUserPattern = [...userPattern, itemId];
    setUserPattern(newUserPattern);
    
    // Check if correct
    const isCorrect = newUserPattern[newUserPattern.length - 1] === patternSequence[newUserPattern.length - 1].id;
    
    if (!isCorrect) {
      // End game on first mistake
      const finalAccuracy = ((newUserPattern.length - 1) / patternSequence.length) * 100;
      endPatternGame(score, finalAccuracy);
      return;
    }
    
    if (newUserPattern.length === patternSequence.length) {
      // Pattern completed successfully
      const newScore = score + (patternSequence.length * 10 * difficulty);
      setScore(newScore);
      setAccuracy(100);
      onScoreUpdate?.(newScore, 100, 0);
      endPatternGame(newScore, 100);
    }
  }, [showingPattern, userPattern, patternSequence, score, difficulty, onScoreUpdate]);

  const endPatternGame = useCallback((finalScore: number, finalAccuracy: number) => {
    const duration = Date.now() - startTimeRef.current;
    const session: GameSession = {
      gameType: 'pattern',
      score: finalScore,
      accuracy: finalAccuracy,
      reactionTime: 0,
      difficulty,
      timestamp: Date.now(),
      duration
    };
    setGameSession(session);
    adjustDifficulty(finalAccuracy);
    setIsPlaying(false);
  }, [difficulty, adjustDifficulty]);

  // Game control functions
  const startGame = (gameType: GameType) => {
    setCurrentGame(gameType);
    setIsPlaying(true);
    setGameSession(null);
    
    switch (gameType) {
      case 'nback':
        startNBackGame();
        break;
      case 'reaction':
        startReactionGame();
        break;
      case 'pattern':
        startPatternGame();
        break;
    }
  };

  const stopGame = () => {
    setIsPlaying(false);
    setCurrentGame(null);
    if (gameTimeoutRef.current) {
      clearTimeout(gameTimeoutRef.current);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameTimeoutRef.current) {
        clearTimeout(gameTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="adaptive-mini-games">
      <div className="games-header">
        <h2 className="games-title">Adaptive Cognitive Training</h2>
        <div className="difficulty-indicator">
          <span>Difficulty Level: {difficulty.toFixed(1)}</span>
          <div className="difficulty-bar">
            <div 
              className="difficulty-fill" 
              style={{ width: `${(difficulty / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {!isPlaying ? (
        <div className="game-selection">
          <div className="game-cards">
            <div 
              className="game-card"
              onClick={() => startGame('nback')}
            >
              <div className="game-icon">🧠</div>
              <h3>N-Back Memory</h3>
              <p>Working memory training with {nBackN}-back sequences</p>
              <div className="game-stats">
                <span>Difficulty: {nBackN}-back</span>
                <span>Adaptive: ✓</span>
              </div>
            </div>

            <div 
              className="game-card"
              onClick={() => startGame('reaction')}
            >
              <div className="game-icon">⚡</div>
              <h3>Reaction Speed</h3>
              <p>Test and improve your reaction time</p>
              <div className="game-stats">
                <span>Target: &lt;{500 + (difficulty * 50)}ms</span>
                <span>Trials: 10</span>
              </div>
            </div>

            <div 
              className="game-card"
              onClick={() => startGame('pattern')}
            >
              <div className="game-icon">🎯</div>
              <h3>Pattern Matching</h3>
              <p>Remember and reproduce complex patterns</p>
              <div className="game-stats">
                <span>Length: {Math.max(3, Math.floor(difficulty * 2))}</span>
                <span>Colors: 6</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="active-game">
          <div className="game-controls">
            <button className="stop-button" onClick={stopGame}>
              Stop Game
            </button>
            <div className="game-stats-live">
              <span>Score: {score}</span>
              <span>Accuracy: {accuracy.toFixed(1)}%</span>
              {currentGame === 'reaction' && (
                <span>Avg RT: {reactionTimes.length > 0 ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) : 0}ms</span>
              )}
            </div>
          </div>

          {/* N-Back Game Interface */}
          {currentGame === 'nback' && (
            <div className="nback-game">
              <div className="nback-display">
                {showingNBackItem && nBackSequence[currentNBackIndex] && (
                  <div className="nback-letter">
                    {nBackSequence[currentNBackIndex].value}
                  </div>
                )}
              </div>
              <div className="nback-controls">
                <p>Press "Match" if the current letter matches the one {nBackN} positions back</p>
                <div className="nback-buttons">
                  <button 
                    className="game-button no-match"
                    onClick={() => handleNBackResponse(false)}
                    disabled={!showingNBackItem || currentNBackIndex < nBackN}
                  >
                    No Match
                  </button>
                  <button 
                    className="game-button match"
                    onClick={() => handleNBackResponse(true)}
                    disabled={!showingNBackItem || currentNBackIndex < nBackN}
                  >
                    Match
                  </button>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(currentNBackIndex / nBackSequence.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Reaction Game Interface */}
          {currentGame === 'reaction' && (
            <div className="reaction-game">
              <div className="reaction-display">
                {waitingForReaction ? (
                  <div 
                    className="reaction-target active"
                    onClick={handleReactionClick}
                  >
                    CLICK NOW!
                  </div>
                ) : (
                  <div className="reaction-target">
                    {reactionCount < 10 ? 'Wait for the signal...' : 'Game Complete!'}
                  </div>
                )}
              </div>
              <div className="reaction-stats">
                <div>Trial: {reactionCount}/10</div>
                {reactionTimes.length > 0 && (
                  <div>Last: {reactionTimes[reactionTimes.length - 1]}ms</div>
                )}
              </div>
            </div>
          )}

          {/* Pattern Game Interface */}
          {currentGame === 'pattern' && (
            <div className="pattern-game">
              <div className="pattern-display">
                <div className="pattern-grid">
                  {Array.from({ length: 16 }).map((_, index) => {
                    const x = index % 4;
                    const y = Math.floor(index / 4);
                    const patternItem = patternSequence.find(item => 
                      item.position.x === x && item.position.y === y
                    );
                    
                    return (
                      <div
                        key={index}
                        className={`pattern-cell ${patternItem?.isActive ? 'active' : ''} ${
                          userPattern.includes(patternItem?.id || -1) ? 'selected' : ''
                        }`}
                        style={{
                          backgroundColor: patternItem?.isActive ? patternItem.color : 
                                         userPattern.includes(patternItem?.id || -1) ? patternItem?.color : 'transparent'
                        }}
                        onClick={() => patternItem && handlePatternClick(patternItem.id)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="pattern-info">
                <p>{showingPattern ? 'Watch the pattern...' : 'Click the squares in the correct order'}</p>
                <div>Progress: {userPattern.length}/{patternSequence.length}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {gameSession && (
        <div className="game-results">
          <h3>Game Complete!</h3>
          <div className="results-grid">
            <div className="result-item">
              <span className="result-label">Game:</span>
              <span className="result-value">{gameSession.gameType.toUpperCase()}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Score:</span>
              <span className="result-value">{gameSession.score}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Accuracy:</span>
              <span className="result-value">{gameSession.accuracy.toFixed(1)}%</span>
            </div>
            <div className="result-item">
              <span className="result-label">Duration:</span>
              <span className="result-value">{Math.round(gameSession.duration / 1000)}s</span>
            </div>
            {gameSession.reactionTime > 0 && (
              <div className="result-item">
                <span className="result-label">Avg RT:</span>
                <span className="result-value">{Math.round(gameSession.reactionTime)}ms</span>
              </div>
            )}
            <div className="result-item">
              <span className="result-label">New Difficulty:</span>
              <span className="result-value">{difficulty.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
