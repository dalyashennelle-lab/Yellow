'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Player {
  id: string;
  name: string;
  score: number;
  accuracy: number;
  isOnline: boolean;
  avatar: string;
}

interface MemoryPalace {
  id: string;
  name: string;
  rooms: Room[];
  creator: string;
  collaborators: string[];
  isPublic: boolean;
}

interface Room {
  id: string;
  name: string;
  objects: MemoryObject[];
  environment: string;
}

interface MemoryObject {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  association: string;
  difficulty: number;
}

interface AdvancedMemoryGamesProps {
  eegData?: {
    gamma: number;
    alpha: number;
    theta: number;
    beta: number;
  };
  onScoreUpdate?: (score: number, accuracy: number) => void;
}

export default function AdvancedMemoryGames({ eegData, onScoreUpdate }: AdvancedMemoryGamesProps) {
  const [gameMode, setGameMode] = useState<'single' | 'collaborative' | 'competitive'>('single');
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'You', score: 0, accuracy: 100, isOnline: true, avatar: '🧠' },
    { id: '2', name: 'Alex Chen', score: 850, accuracy: 94, isOnline: true, avatar: '🎯' },
    { id: '3', name: 'Maria Santos', score: 720, accuracy: 89, isOnline: true, avatar: '⚡' },
    { id: '4', name: 'David Kim', score: 650, accuracy: 92, isOnline: false, avatar: '🌟' }
  ]);
  const [memoryPalaces, setMemoryPalaces] = useState<MemoryPalace[]>([]);
  const [currentPalace, setCurrentPalace] = useState<MemoryPalace | null>(null);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(1);
  const [gameSession, setGameSession] = useState<any>(null);

  const sceneRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  // Advanced memory games
  const memoryGames = [
    {
      id: 'spatial-memory-3d',
      title: '🏛️ 3D Memory Palace',
      description: 'Build and navigate virtual memory palaces in 3D space',
      type: 'spatial',
      minPlayers: 1,
      maxPlayers: 8,
      difficulty: 'adaptive',
      eegTarget: 'theta',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fff642ab6968947f398e5d9f7bff29403?format=webp&width=800'
    },
    {
      id: 'collaborative-sequence',
      title: '🤝 Team Sequence Challenge',
      description: 'Work together to complete complex memory sequences',
      type: 'collaborative',
      minPlayers: 2,
      maxPlayers: 6,
      difficulty: 'progressive',
      eegTarget: 'gamma',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F02b80179cefd486c87d73915bc2642af?format=webp&width=800'
    },
    {
      id: 'pattern-battle',
      title: '⚔️ Pattern Battle Arena',
      description: 'Competitive pattern recognition with real-time ranking',
      type: 'competitive',
      minPlayers: 2,
      maxPlayers: 12,
      difficulty: 'dynamic',
      eegTarget: 'beta',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F3defa3926b534f8198e6f178db04d158?format=webp&width=800'
    },
    {
      id: 'hippocampus-trainer',
      title: '🧩 Hippocampus Deep Training',
      description: 'Advanced hippocampal stimulation with EEG feedback',
      type: 'adaptive',
      minPlayers: 1,
      maxPlayers: 4,
      difficulty: 'eeg-adaptive',
      eegTarget: 'theta',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F23cf905664fd4fe39498ee9e82249058?format=webp&width=800'
    }
  ];

  // Initialize 3D scene for memory palace
  useEffect(() => {
    if (!sceneRef.current) return;

    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x87ceeb);

    const newCamera = new THREE.PerspectiveCamera(
      75,
      sceneRef.current.clientWidth / sceneRef.current.clientHeight,
      0.1,
      1000
    );
    newCamera.position.set(0, 5, 10);

    const newRenderer = new THREE.WebGLRenderer({ antialias: true });
    newRenderer.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight);
    newRenderer.shadowMap.enabled = true;
    newRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    sceneRef.current.appendChild(newRenderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    newScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    newScene.add(directionalLight);

    // Create a simple memory palace room
    const roomGeometry = new THREE.BoxGeometry(20, 8, 20);
    const roomMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xf0f8ff,
      transparent: true,
      opacity: 0.8
    });
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    room.position.y = 4;
    newScene.add(room);

    // Add floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x8b7355 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    newScene.add(floor);

    // Add memory objects
    const objectGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xfeca57, 0x48dbfb];
    
    for (let i = 0; i < 5; i++) {
      const objectMaterial = new THREE.MeshPhongMaterial({ color: colors[i] });
      const memoryObj = new THREE.Mesh(objectGeometry, objectMaterial);
      memoryObj.position.set(
        (Math.random() - 0.5) * 15,
        1,
        (Math.random() - 0.5) * 15
      );
      memoryObj.castShadow = true;
      newScene.add(memoryObj);
    }

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate camera around the scene
      const time = Date.now() * 0.0005;
      newCamera.position.x = Math.cos(time) * 15;
      newCamera.position.z = Math.sin(time) * 15;
      newCamera.lookAt(0, 0, 0);
      
      newRenderer.render(newScene, newCamera);
    };
    animate();

    return () => {
      if (sceneRef.current && newRenderer.domElement) {
        sceneRef.current.removeChild(newRenderer.domElement);
      }
      newRenderer.dispose();
    };
  }, []);

  // EEG-based adaptive difficulty
  useEffect(() => {
    if (eegData) {
      // Adjust difficulty based on EEG patterns
      const gammaLevel = eegData.gamma;
      const thetaLevel = eegData.theta;
      
      if (gammaLevel > 0.7 && thetaLevel > 0.6) {
        setAdaptiveDifficulty(prev => Math.min(10, prev + 0.1));
      } else if (gammaLevel < 0.4 || thetaLevel < 0.3) {
        setAdaptiveDifficulty(prev => Math.max(1, prev - 0.1));
      }
    }
  }, [eegData]);

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
    const game = memoryGames.find(g => g.id === gameId);
    
    if (game) {
      setGameSession({
        gameId,
        startTime: Date.now(),
        score: 0,
        accuracy: 100,
        difficulty: adaptiveDifficulty,
        players: gameMode === 'single' ? [players[0]] : players.filter(p => p.isOnline)
      });
    }
  };

  const joinCollaborativeSession = (sessionId: string) => {
    // Simulate joining a collaborative session
    console.log('Joining collaborative session:', sessionId);
  };

  const createMemoryPalace = () => {
    const newPalace: MemoryPalace = {
      id: `palace_${Date.now()}`,
      name: `Memory Palace ${memoryPalaces.length + 1}`,
      rooms: [
        {
          id: 'room_1',
          name: 'Main Hall',
          objects: [],
          environment: 'classical'
        }
      ],
      creator: 'You',
      collaborators: [],
      isPublic: false
    };
    
    setMemoryPalaces([...memoryPalaces, newPalace]);
    setCurrentPalace(newPalace);
  };

  return (
    <div className="advanced-memory-games">
      <div className="games-header">
        <h2 className="games-title">Advanced Memory Training</h2>
        <div className="eeg-status">
          {eegData && (
            <div className="eeg-indicators">
              <span className="eeg-indicator">
                Gamma: {(eegData.gamma * 100).toFixed(1)}%
              </span>
              <span className="eeg-indicator">
                Theta: {(eegData.theta * 100).toFixed(1)}%
              </span>
              <span className="adaptive-diff">
                Adaptive Difficulty: {adaptiveDifficulty.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="game-mode-selector">
        <button 
          className={`mode-btn ${gameMode === 'single' ? 'active' : ''}`}
          onClick={() => setGameMode('single')}
        >
          👤 Solo Training
        </button>
        <button 
          className={`mode-btn ${gameMode === 'collaborative' ? 'active' : ''}`}
          onClick={() => setGameMode('collaborative')}
        >
          🤝 Collaborative
        </button>
        <button 
          className={`mode-btn ${gameMode === 'competitive' ? 'active' : ''}`}
          onClick={() => setGameMode('competitive')}
        >
          ⚔️ Competitive
        </button>
      </div>

      {!activeGame ? (
        <div className="game-selection">
          <div className="players-online">
            <h3>Players Online ({players.filter(p => p.isOnline).length})</h3>
            <div className="players-list">
              {players.map(player => (
                <div key={player.id} className={`player-card ${player.isOnline ? 'online' : 'offline'}`}>
                  <span className="player-avatar">{player.avatar}</span>
                  <div className="player-info">
                    <span className="player-name">{player.name}</span>
                    <span className="player-stats">
                      Score: {player.score} | Accuracy: {player.accuracy}%
                    </span>
                  </div>
                  <div className={`status-indicator ${player.isOnline ? 'online' : 'offline'}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="games-grid">
            {memoryGames.map(game => (
              <div key={game.id} className="advanced-game-card">
                <div className="game-image">
                  <img src={game.image} alt={game.title} />
                </div>
                <div className="game-content">
                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-description">{game.description}</p>
                  <div className="game-meta">
                    <span className="game-type">{game.type}</span>
                    <span className="player-count">
                      {game.minPlayers}-{game.maxPlayers} players
                    </span>
                    <span className="eeg-target">
                      EEG Target: {game.eegTarget}
                    </span>
                  </div>
                  <button 
                    className="start-game-btn"
                    onClick={() => startGame(game.id)}
                    disabled={gameMode !== 'single' && players.filter(p => p.isOnline).length < game.minPlayers}
                  >
                    Start Game
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="memory-palace-section">
            <h3>Memory Palaces</h3>
            <div className="palace-controls">
              <button className="create-palace-btn" onClick={createMemoryPalace}>
                🏛️ Create New Palace
              </button>
            </div>
            
            {currentPalace && (
              <div className="active-palace">
                <h4>Current Palace: {currentPalace.name}</h4>
                <div className="palace-3d-view" ref={sceneRef} style={{ height: '300px' }} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="active-game-session">
          <div className="game-header">
            <h3>Playing: {memoryGames.find(g => g.id === activeGame)?.title}</h3>
            <button 
              className="end-game-btn"
              onClick={() => setActiveGame(null)}
            >
              End Game
            </button>
          </div>

          {gameSession && (
            <div className="game-interface">
              <div className="session-stats">
                <div className="stat">Score: {gameSession.score}</div>
                <div className="stat">Accuracy: {gameSession.accuracy}%</div>
                <div className="stat">Difficulty: {gameSession.difficulty.toFixed(1)}</div>
                <div className="stat">
                  Time: {Math.floor((Date.now() - gameSession.startTime) / 1000)}s
                </div>
              </div>

              {gameMode !== 'single' && (
                <div className="multiplayer-status">
                  <h4>Active Players:</h4>
                  <div className="active-players">
                    {gameSession.players.map((player: Player) => (
                      <div key={player.id} className="active-player">
                        <span className="player-avatar">{player.avatar}</span>
                        <span className="player-name">{player.name}</span>
                        <span className="player-score">{player.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="game-area">
                {activeGame === 'spatial-memory-3d' && (
                  <div className="memory-palace-game">
                    <div className="palace-view" ref={sceneRef} style={{ height: '400px' }} />
                    <div className="palace-controls">
                      <p>Navigate through the memory palace and recall object positions</p>
                      <div className="recall-buttons">
                        <button className="recall-btn">🔴 Red Sphere</button>
                        <button className="recall-btn">🔵 Blue Sphere</button>
                        <button className="recall-btn">🟡 Yellow Sphere</button>
                        <button className="recall-btn">🟢 Green Sphere</button>
                        <button className="recall-btn">🟣 Purple Sphere</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeGame === 'collaborative-sequence' && (
                  <div className="collaborative-game">
                    <div className="sequence-display">
                      <p>Team Sequence Challenge - Work together to complete the pattern</p>
                      <div className="sequence-grid">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="sequence-cell" />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeGame === 'pattern-battle' && (
                  <div className="competitive-game">
                    <div className="battle-arena">
                      <p>Pattern Battle Arena - Compete in real-time</p>
                      <div className="battle-grid">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div key={i} className="battle-cell" />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeGame === 'hippocampus-trainer' && (
                  <div className="hippocampus-game">
                    <div className="brain-visualization">
                      <img 
                        src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F23cf905664fd4fe39498ee9e82249058?format=webp&width=800"
                        alt="Brain visualization during training"
                        style={{ width: '100%', maxWidth: '400px' }}
                      />
                    </div>
                    <div className="hippocampus-controls">
                      <p>Deep hippocampal training with real-time EEG feedback</p>
                      <div className="training-buttons">
                        <button className="training-btn">🧠 Encode Memory</button>
                        <button className="training-btn">🔄 Recall Pattern</button>
                        <button className="training-btn">🎯 Consolidate</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
