'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface WebXRMeditationProps {
  environment: 'beach' | 'garden' | 'forest' | 'space';
  onSessionStart?: () => void;
  onSessionEnd?: () => void;
}

export default function WebXRMeditation({ 
  environment = 'beach',
  onSessionStart,
  onSessionEnd
}: WebXRMeditationProps) {
  const [isXRSupported, setIsXRSupported] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentEnvironment, setCurrentEnvironment] = useState(environment);
  const [meditationTimer, setMeditationTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const environmentRef = useRef<THREE.Group>();
  const breathingGuideRef = useRef<THREE.Mesh>();
  const audioRef = useRef<HTMLAudioElement>();

  // Environment configurations
  const environments = {
    beach: {
      name: 'Tranquil Beach',
      colors: {
        sky: new THREE.Color(0x87CEEB),
        horizon: new THREE.Color(0xFFE4B5),
        ground: new THREE.Color(0xF4A460)
      },
      sounds: '/sounds/ocean-waves.mp3',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F5c2e1743615f4df1951e18014a943f3a?format=webp&width=800'
    },
    garden: {
      name: 'Zen Garden',
      colors: {
        sky: new THREE.Color(0x98FB98),
        horizon: new THREE.Color(0x90EE90),
        ground: new THREE.Color(0x228B22)
      },
      sounds: '/sounds/nature-birds.mp3',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F1bda850233fa4ea3808cf7a13e7fad46?format=webp&width=800'
    },
    forest: {
      name: 'Mystical Forest',
      colors: {
        sky: new THREE.Color(0x2E8B57),
        horizon: new THREE.Color(0x32CD32),
        ground: new THREE.Color(0x006400)
      },
      sounds: '/sounds/forest-ambience.mp3',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2Fda37912a6ce349fa873dffed40007693?format=webp&width=800'
    },
    space: {
      name: 'Cosmic Void',
      colors: {
        sky: new THREE.Color(0x000011),
        horizon: new THREE.Color(0x001122),
        ground: new THREE.Color(0x000000)
      },
      sounds: '/sounds/cosmic-ambience.mp3',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F6b620c84ffcc4f3cad5b02ad7fa2530d?format=webp&width=800'
    }
  };

  // Check for WebXR support
  useEffect(() => {
    const checkXRSupport = async () => {
      if ('xr' in navigator) {
        try {
          const isSupported = await (navigator as any).xr.isSessionSupported('immersive-vr');
          setIsXRSupported(isSupported);
        } catch (error) {
          console.log('WebXR not supported:', error);
          setIsXRSupported(false);
        }
      }
    };

    checkXRSupport();
  }, []);

  // Initialize 3D scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Renderer with XR support
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(800, 600);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.xr.enabled = true;
    rendererRef.current = renderer;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
    camera.position.set(0, 1.6, 0); // Average human eye height
    cameraRef.current = camera;

    // Create immersive environment
    createEnvironment(scene, currentEnvironment);

    // Add breathing guide
    createBreathingGuide(scene);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    mountRef.current.appendChild(renderer.domElement);

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate breathing guide
      if (breathingGuideRef.current) {
        animateBreathingGuide(elapsedTime);
      }

      // Animate environment
      if (environmentRef.current) {
        animateEnvironment(elapsedTime);
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentEnvironment, breathingPhase]);

  const createEnvironment = (scene: THREE.Scene, envType: string) => {
    // Remove existing environment
    if (environmentRef.current) {
      scene.remove(environmentRef.current);
    }

    const group = new THREE.Group();
    environmentRef.current = group;

    const config = environments[envType as keyof typeof environments];

    // Create skybox
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
      color: config.colors.sky,
      side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    group.add(sky);

    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshLambertMaterial({
      color: config.colors.ground
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    group.add(ground);

    // Environment-specific elements
    switch (envType) {
      case 'beach':
        createBeachEnvironment(group);
        break;
      case 'garden':
        createGardenEnvironment(group);
        break;
      case 'forest':
        createForestEnvironment(group);
        break;
      case 'space':
        createSpaceEnvironment(group);
        break;
    }

    scene.add(group);
  };

  const createBeachEnvironment = (group: THREE.Group) => {
    // Create ocean
    const oceanGeometry = new THREE.PlaneGeometry(200, 200);
    const oceanMaterial = new THREE.MeshLambertMaterial({
      color: 0x006994,
      transparent: true,
      opacity: 0.8
    });
    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = -0.8;
    ocean.position.z = -20;
    group.add(ocean);

    // Add palm trees
    for (let i = 0; i < 5; i++) {
      const palmTree = createPalmTree();
      palmTree.position.set(
        (Math.random() - 0.5) * 40,
        -1,
        -10 + Math.random() * 20
      );
      palmTree.rotation.y = Math.random() * Math.PI * 2;
      group.add(palmTree);
    }
  };

  const createGardenEnvironment = (group: THREE.Group) => {
    // Create zen stones
    for (let i = 0; i < 8; i++) {
      const stoneGeometry = new THREE.SphereGeometry(0.5 + Math.random() * 0.5, 8, 6);
      const stoneMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
      const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
      stone.position.set(
        (Math.random() - 0.5) * 20,
        -0.5,
        (Math.random() - 0.5) * 20
      );
      stone.scale.y = 0.6;
      group.add(stone);
    }

    // Add bamboo
    for (let i = 0; i < 12; i++) {
      const bamboo = createBamboo();
      bamboo.position.set(
        (Math.random() - 0.5) * 30,
        -1,
        (Math.random() - 0.5) * 30
      );
      group.add(bamboo);
    }
  };

  const createForestEnvironment = (group: THREE.Group) => {
    // Add trees
    for (let i = 0; i < 15; i++) {
      const tree = createTree();
      tree.position.set(
        (Math.random() - 0.5) * 60,
        -1,
        (Math.random() - 0.5) * 60
      );
      tree.scale.set(
        0.8 + Math.random() * 0.4,
        0.8 + Math.random() * 0.6,
        0.8 + Math.random() * 0.4
      );
      group.add(tree);
    }

    // Add fog effect
    sceneRef.current!.fog = new THREE.Fog(0x2E8B57, 10, 50);
  };

  const createSpaceEnvironment = (group: THREE.Group) => {
    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(2000 * 3);

    for (let i = 0; i < 2000; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 1000;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    group.add(stars);

    // Add floating crystals
    for (let i = 0; i < 8; i++) {
      const crystalGeometry = new THREE.OctahedronGeometry(1 + Math.random());
      const crystalMaterial = new THREE.MeshLambertMaterial({ 
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.8),
        transparent: true,
        opacity: 0.7
      });
      const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
      crystal.position.set(
        (Math.random() - 0.5) * 40,
        2 + Math.random() * 8,
        (Math.random() - 0.5) * 40
      );
      group.add(crystal);
    }
  };

  const createBreathingGuide = (scene: THREE.Scene) => {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshLambertMaterial({
      color: 0x4facfe,
      transparent: true,
      opacity: 0.8
    });
    const breathingGuide = new THREE.Mesh(geometry, material);
    breathingGuide.position.set(0, 2, -3);
    breathingGuideRef.current = breathingGuide;
    scene.add(breathingGuide);
  };

  const animateBreathingGuide = (time: number) => {
    if (!breathingGuideRef.current) return;

    const guide = breathingGuideRef.current;
    const breathCycle = 8; // 8 seconds per full cycle
    const phase = (time % breathCycle) / breathCycle;

    let scale = 1;
    let opacity = 0.8;

    if (phase < 0.4) { // Inhale (40%)
      scale = 1 + phase * 2.5; // Scale from 1 to 2
      setBreathingPhase('inhale');
    } else if (phase < 0.5) { // Hold (10%)
      scale = 2;
      setBreathingPhase('hold');
    } else { // Exhale (50%)
      scale = 2 - (phase - 0.5) * 4; // Scale from 2 to 0
      setBreathingPhase('exhale');
    }

    scale = Math.max(0.5, scale);
    opacity = 0.5 + Math.sin(time * 2) * 0.3;

    guide.scale.setScalar(scale);
    (guide.material as THREE.MeshLambertMaterial).opacity = opacity;
    guide.rotation.y = time * 0.5;
  };

  const animateEnvironment = (time: number) => {
    if (!environmentRef.current) return;

    // Gentle rotation for immersion
    environmentRef.current.rotation.y = time * 0.001;

    // Animate specific environment elements
    environmentRef.current.children.forEach((child, index) => {
      if (child.userData.type === 'palmTree') {
        child.rotation.z = Math.sin(time * 0.5 + index) * 0.1;
      } else if (child.userData.type === 'bamboo') {
        child.rotation.z = Math.sin(time * 0.8 + index) * 0.05;
      } else if (child.userData.type === 'crystal') {
        child.rotation.x = time * 0.3;
        child.rotation.y = time * 0.5;
        child.position.y += Math.sin(time + index) * 0.02;
      }
    });
  };

  // Helper functions for creating 3D objects
  const createPalmTree = () => {
    const group = new THREE.Group();
    group.userData.type = 'palmTree';

    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 8, 8);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 4;
    group.add(trunk);

    // Leaves
    for (let i = 0; i < 6; i++) {
      const leafGeometry = new THREE.PlaneGeometry(6, 1);
      const leafMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x228B22,
        side: THREE.DoubleSide
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.y = 8;
      leaf.rotation.z = (i * Math.PI) / 3;
      leaf.rotation.x = -0.3;
      group.add(leaf);
    }

    return group;
  };

  const createBamboo = () => {
    const group = new THREE.Group();
    group.userData.type = 'bamboo';

    const segments = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < segments; i++) {
      const geometry = new THREE.CylinderGeometry(0.1, 0.12, 2, 8);
      const material = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
      const segment = new THREE.Mesh(geometry, material);
      segment.position.y = i * 2 + 1;
      group.add(segment);
    }

    return group;
  };

  const createTree = () => {
    const group = new THREE.Group();
    group.userData.type = 'tree';

    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.8, 6, 8);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 3;
    group.add(trunk);

    // Crown
    const crownGeometry = new THREE.SphereGeometry(4, 8, 6);
    const crownMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 8;
    crown.scale.y = 0.7;
    group.add(crown);

    return group;
  };

  // Start XR session
  const startXRSession = async () => {
    if (!isXRSupported || !rendererRef.current) return;

    try {
      setIsSessionActive(true);
      onSessionStart?.();

      // Start meditation timer
      const timer = setInterval(() => {
        setMeditationTimer(prev => prev + 1);
      }, 1000);

      // Start background audio
      if (audioRef.current) {
        audioRef.current.play();
      }

      // Set up XR session end handler
      rendererRef.current.xr.addEventListener('sessionend', () => {
        clearInterval(timer);
        setIsSessionActive(false);
        setMeditationTimer(0);
        onSessionEnd?.();
        
        if (audioRef.current) {
          audioRef.current.pause();
        }
      });

    } catch (error) {
      console.error('Failed to start XR session:', error);
      setIsSessionActive(false);
    }
  };

  // Format timer
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="webxr-meditation-container">
      <div className="meditation-header">
        <h2 className="meditation-title">Immersive Meditation Experience</h2>
        {isXRSupported && (
          <div className="xr-badge">
            🥽 WebXR Ready
          </div>
        )}
      </div>

      <div className="environment-selector">
        <h3>Choose Your Environment</h3>
        <div className="environment-grid">
          {Object.entries(environments).map(([key, env]) => (
            <div
              key={key}
              className={`environment-card ${currentEnvironment === key ? 'active' : ''}`}
              onClick={() => setCurrentEnvironment(key)}
            >
              <img src={env.image} alt={env.name} className="environment-image" />
              <div className="environment-overlay">
                <h4>{env.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="meditation-preview" ref={mountRef} />

      <div className="meditation-controls">
        <div className="session-info">
          {isSessionActive && (
            <div className="session-active">
              <div className="timer">{formatTimer(meditationTimer)}</div>
              <div className="breathing-indicator">
                <span className={`phase-indicator ${breathingPhase}`}>
                  {breathingPhase === 'inhale' && '🌬️ Breathe In'}
                  {breathingPhase === 'hold' && '⏸️ Hold'}
                  {breathingPhase === 'exhale' && '💨 Breathe Out'}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="control-buttons">
          {isXRSupported ? (
            <button
              className="xr-button primary"
              onClick={startXRSession}
              disabled={isSessionActive}
            >
              {isSessionActive ? '🧘 Session Active' : '🥽 Enter VR Meditation'}
            </button>
          ) : (
            <div className="xr-fallback">
              <p>WebXR not supported. Enjoy the 3D preview above!</p>
              <button
                className="meditation-button"
                onClick={() => {
                  setIsSessionActive(!isSessionActive);
                  if (!isSessionActive) {
                    onSessionStart?.();
                    if (audioRef.current) {
                      audioRef.current.play();
                    }
                  } else {
                    onSessionEnd?.();
                    if (audioRef.current) {
                      audioRef.current.pause();
                    }
                  }
                }}
              >
                {isSessionActive ? '⏹️ Stop Session' : '▶️ Start Meditation'}
              </button>
            </div>
          )}
        </div>
      </div>

      <audio
        ref={audioRef}
        loop
        preload="none"
        src={environments[currentEnvironment as keyof typeof environments].sounds}
      />

      <div className="meditation-benefits">
        <h3>Immersive Meditation Benefits</h3>
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-icon">🧠</span>
            <span>Enhanced focus through visual immersion</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🌊</span>
            <span>Guided breathing with 3D visual cues</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🎵</span>
            <span>Spatial audio for deeper relaxation</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">⚡</span>
            <span>Real-time stress reduction tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
}
