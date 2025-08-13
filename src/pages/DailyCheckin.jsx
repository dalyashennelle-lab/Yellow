import React, { useState } from 'react'
import { Heart, Brain, Zap, Moon, Star, Smile } from 'lucide-react'

const DailyCheckin = ({ user }) => {
  const [checkinData, setCheckinData] = useState({
    mood: 7,
    energy: 6,
    focus: 8,
    sleep: 7,
    stress: 4,
    motivation: 8
  })

  const [currentStep, setCurrentStep] = useState(0)

  const questions = [
    {
      id: 'mood',
      question: "How's your overall mood today?",
      description: "Rate how you're feeling emotionally right now",
      icon: Smile,
      color: 'var(--neural-success)',
      scale: ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent']
    },
    {
      id: 'energy',
      question: "What's your energy level?",
      description: "How energetic and alert do you feel?",
      icon: Zap,
      color: 'var(--neural-warning)',
      scale: ['Exhausted', 'Tired', 'Okay', 'Energetic', 'Very High']
    },
    {
      id: 'focus',
      question: "How's your focus today?",
      description: "Rate your ability to concentrate and stay on task",
      icon: Brain,
      color: 'var(--neural-primary)',
      scale: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent']
    },
    {
      id: 'sleep',
      question: "How was your sleep quality?",
      description: "Rate the quality of your most recent sleep",
      icon: Moon,
      color: 'var(--neural-accent)',
      scale: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent']
    },
    {
      id: 'stress',
      question: "What's your stress level?",
      description: "How stressed or anxious are you feeling?",
      icon: Heart,
      color: 'var(--neural-error)',
      scale: ['Very High', 'High', 'Moderate', 'Low', 'Very Low'],
      reverse: true
    },
    {
      id: 'motivation',
      question: "How motivated do you feel?",
      description: "Rate your drive to accomplish goals today",
      icon: Star,
      color: 'var(--neural-secondary)',
      scale: ['Very Low', 'Low', 'Neutral', 'High', 'Very High']
    }
  ]

  const currentQuestion = questions[currentStep]
  const Icon = currentQuestion?.icon

  const handleRatingChange = (value) => {
    setCheckinData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitCheckin = () => {
    console.log('Check-in data:', checkinData)
    // Handle submission logic here
    alert('Daily check-in completed! 🎉')
  }

  const getScaleLabel = (value, reverse = false) => {
    const labels = currentQuestion.scale
    const index = reverse ? labels.length - value : value - 1
    return labels[index] || labels[0]
  }

  if (!currentQuestion) {
    return (
      <div className="checkin-complete">
        <div className="neural-card" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <h2 className="heading-lg">Check-in Complete! 🎉</h2>
          <p>Thank you for your daily check-in. Your data helps us provide better insights.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="daily-checkin">
      <div className="checkin-container">
        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${((currentStep + 1) / questions.length) * 100}%`,
              background: currentQuestion.color 
            }}
          />
        </div>

        {/* Question Card */}
        <div className="neural-card question-card">
          <div className="question-header">
            <div className="question-icon" style={{ background: currentQuestion.color }}>
              <Icon size={24} color="white" />
            </div>
            <div className="question-info">
              <h2 className="question-title">{currentQuestion.question}</h2>
              <p className="question-description">{currentQuestion.description}</p>
            </div>
          </div>

          {/* Rating Scale */}
          <div className="rating-container">
            <div className="rating-scale">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                <button
                  key={value}
                  className={`rating-button ${checkinData[currentQuestion.id] === value ? 'active' : ''}`}
                  onClick={() => handleRatingChange(value)}
                  style={{
                    borderColor: checkinData[currentQuestion.id] === value ? currentQuestion.color : 'var(--border-primary)',
                    background: checkinData[currentQuestion.id] === value ? `${currentQuestion.color}20` : 'transparent'
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
            
            <div className="scale-labels">
              <span>{currentQuestion.scale[0]}</span>
              <span className="current-label" style={{ color: currentQuestion.color }}>
                {getScaleLabel(checkinData[currentQuestion.id], currentQuestion.reverse)}
              </span>
              <span>{currentQuestion.scale[currentQuestion.scale.length - 1]}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="question-nav">
            <button 
              className="btn btn-secondary"
              onClick={prevQuestion}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            
            <span className="question-counter">
              {currentStep + 1} of {questions.length}
            </span>
            
            {currentStep === questions.length - 1 ? (
              <button 
                className="btn btn-primary"
                onClick={submitCheckin}
                style={{ background: currentQuestion.color }}
              >
                Complete Check-in
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={nextQuestion}
                style={{ background: currentQuestion.color }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .daily-checkin {
          padding: 80px 24px 24px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkin-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: var(--bg-tertiary);
          border-radius: 2px;
          margin-bottom: 32px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        .question-card {
          padding: 40px;
        }

        .question-header {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
        }

        .question-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .question-info {
          flex: 1;
        }

        .question-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .question-description {
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .rating-container {
          margin-bottom: 40px;
        }

        .rating-scale {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }

        .rating-button {
          aspect-ratio: 1;
          border: 2px solid var(--border-primary);
          border-radius: 12px;
          background: transparent;
          color: var(--text-primary);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rating-button:hover {
          border-color: var(--border-glow);
          background: rgba(255, 255, 255, 0.05);
        }

        .rating-button.active {
          transform: scale(1.1);
        }

        .scale-labels {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .current-label {
          font-weight: 600;
          font-size: 1rem;
        }

        .question-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .question-counter {
          font-size: 0.875rem;
          color: var(--text-secondary);
          background: var(--bg-glass);
          padding: 8px 16px;
          border-radius: 20px;
        }

        @media (max-width: 768px) {
          .daily-checkin {
            padding: 80px 16px 16px;
          }

          .question-card {
            padding: 24px;
          }

          .question-header {
            gap: 16px;
            margin-bottom: 32px;
          }

          .question-icon {
            width: 48px;
            height: 48px;
          }

          .question-title {
            font-size: 1.25rem;
          }

          .rating-scale {
            grid-template-columns: repeat(5, 1fr);
            gap: 6px;
          }

          .question-nav {
            flex-direction: column;
            gap: 16px;
          }

          .question-nav .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default DailyCheckin
