import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Zap } from 'lucide-react'

const SplashScreen = ({ onFinish }) => {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [particles, setParticles] = useState([])

  // Generate floating particles for background
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10
    }))
    setParticles(newParticles)
  }, [])

  // Phase progression
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentPhase(1), 500)
    const timer2 = setTimeout(() => setCurrentPhase(2), 2000)
    const timer3 = setTimeout(() => setCurrentPhase(3), 3500)
    const timer4 = setTimeout(() => onFinish?.(), 6000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onFinish])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.1,
      transition: { duration: 0.8 }
    }
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 1.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const quoteText = "Rooted in years of original research by the app's creator, this isn't just an app — it's the embodiment of data, dreams, and discovery."

  return (
    <AnimatePresence>
      <motion.div 
        className="splash-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Animated Background Particles */}
        <div className="particles-container">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="particle"
              initial={{ 
                x: `${particle.x}vw`, 
                y: `${particle.y}vh`,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                x: [`${particle.x}vw`, `${particle.x + 20}vw`, `${particle.x}vw`],
                y: [`${particle.y}vh`, `${particle.y - 30}vh`, `${particle.y}vh`],
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`
              }}
            />
          ))}
        </div>

        {/* Neural Network Background */}
        <div className="neural-background">
          <motion.div 
            className="neural-node node-1"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="neural-node node-2"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="neural-node node-3"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Content Container */}
        <motion.div className="splash-content">
          {/* Logo Animation */}
          {currentPhase >= 1 && (
            <motion.div 
              className="logo-container"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="logo-icon">
                <Brain size={48} />
                <motion.div 
                  className="logo-pulse"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </div>
              <h1 className="logo-text">NeuroMind Pro</h1>
            </motion.div>
          )}

          {/* Research Quote */}
          {currentPhase >= 2 && (
            <motion.div 
              className="quote-container"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p 
                className="research-quote"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                {quoteText}
              </motion.p>
            </motion.div>
          )}

          {/* Tagline */}
          {currentPhase >= 3 && (
            <motion.div 
              className="tagline-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <div className="tagline-icon">
                <Zap size={20} />
              </div>
              <span className="tagline">Cognitive Health Technology</span>
            </motion.div>
          )}
        </motion.div>

        {/* Loading Indicator */}
        <motion.div 
          className="loading-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          <motion.div 
            className="loading-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>

        <style jsx>{`
          .splash-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg,
              #fefefe 0%,
              #f8fafc 25%,
              #dceefb 50%,
              #a8e6cf 75%,
              #e6e6fa 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            overflow: hidden;
            animation: backgroundShift 8s ease-in-out infinite;
          }

          @keyframes backgroundShift {
            0%, 100% {
              background: linear-gradient(135deg, #fefefe 0%, #f8fafc 25%, #dceefb 50%, #a8e6cf 75%, #e6e6fa 100%);
            }
            50% {
              background: linear-gradient(135deg, #e6e6fa 0%, #a8e6cf 25%, #dceefb 50%, #ffd3e1 75%, #ffe4b5 100%);
            }
          }

          .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }

          .particle {
            position: absolute;
            background: linear-gradient(45deg, var(--pastel-secondary), var(--pastel-accent));
            border-radius: 50%;
            filter: blur(0.5px);
            box-shadow: 0 0 10px rgba(168, 230, 207, 0.3);
          }

          .neural-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }

          .neural-node {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
          }

          .node-1 {
            width: 300px;
            height: 300px;
            top: 20%;
            left: 15%;
          }

          .node-2 {
            width: 200px;
            height: 200px;
            top: 60%;
            right: 20%;
          }

          .node-3 {
            width: 150px;
            height: 150px;
            top: 10%;
            right: 10%;
          }

          .splash-content {
            text-align: center;
            z-index: 2;
            max-width: 800px;
            padding: 0 40px;
          }

          .logo-container {
            margin-bottom: 60px;
          }

          .logo-icon {
            position: relative;
            display: inline-block;
            margin-bottom: 20px;
          }

          .logo-icon svg {
            color: var(--neural-primary);
            filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
          }

          .logo-pulse {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 48px;
            height: 48px;
            border: 2px solid var(--neural-primary);
            border-radius: 50%;
          }

          .logo-text {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            background: var(--gradient-neural);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0;
          }

          .quote-container {
            margin-bottom: 40px;
          }

          .research-quote {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.4rem;
            line-height: 1.6;
            color: #f2f2f2;
            margin: 0;
            font-weight: 300;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }

          .tagline-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 40px;
          }

          .tagline-icon {
            color: var(--neural-secondary);
          }

          .tagline {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 500;
          }

          .loading-indicator {
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1px;
            overflow: hidden;
          }

          .loading-bar {
            height: 100%;
            background: var(--gradient-neural);
            border-radius: 1px;
          }

          @media (max-width: 768px) {
            .splash-content {
              padding: 0 20px;
              max-width: 90%;
            }

            .logo-text {
              font-size: 2.2rem;
            }

            .research-quote {
              font-size: 1.1rem;
            }

            .loading-indicator {
              width: 250px;
              bottom: 60px;
            }
          }

          @media (max-width: 480px) {
            .logo-text {
              font-size: 1.8rem;
            }

            .research-quote {
              font-size: 1rem;
              line-height: 1.5;
            }

            .tagline {
              font-size: 0.875rem;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  )
}

export default SplashScreen
