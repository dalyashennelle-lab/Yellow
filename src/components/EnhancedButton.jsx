import React from 'react'
import { motion } from 'framer-motion'

const EnhancedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  icon: Icon,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: {
      background: 'var(--gradient-neural)',
      color: 'white',
      border: 'none',
      shadow: 'var(--shadow-neural)'
    },
    secondary: {
      background: 'var(--gradient-mint)',
      color: 'var(--text-primary)',
      border: 'none',
      shadow: 'var(--shadow-soft)'
    },
    soft: {
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
      border: '2px solid var(--border-primary)',
      shadow: 'var(--shadow-soft)'
    },
    pastel: {
      background: 'var(--gradient-sunset)',
      color: 'var(--text-primary)',
      border: 'none',
      shadow: 'var(--shadow-medium)'
    },
    aurora: {
      background: 'var(--gradient-aurora)',
      color: 'var(--text-primary)',
      border: 'none',
      shadow: 'var(--shadow-large)'
    }
  }

  const sizes = {
    small: {
      padding: '8px 16px',
      fontSize: '0.875rem',
      borderRadius: '12px'
    },
    medium: {
      padding: '12px 24px',
      fontSize: '1rem',
      borderRadius: '16px'
    },
    large: {
      padding: '16px 32px',
      fontSize: '1.125rem',
      borderRadius: '20px'
    },
    xl: {
      padding: '20px 40px',
      fontSize: '1.25rem',
      borderRadius: '24px'
    }
  }

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  return (
    <motion.button
      className={`enhanced-button ${variant} ${size} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { 
        scale: 1.02,
        y: -2,
        boxShadow: currentVariant.shadow
      }}
      whileTap={disabled ? {} : { 
        scale: 0.98,
        y: 0
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
      {...props}
    >
      {Icon && (
        <span className="button-icon">
          <Icon size={size === 'small' ? 16 : size === 'large' || size === 'xl' ? 24 : 20} />
        </span>
      )}
      <span className="button-text">{children}</span>
      
      <style jsx>{`
        .enhanced-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          cursor: pointer;
          border: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.6, -0.05, 0.01, 0.99);
          text-decoration: none;
          box-shadow: ${currentVariant.shadow};
          background: ${currentVariant.background};
          color: ${currentVariant.color};
          border: ${currentVariant.border || 'none'};
          padding: ${currentSize.padding};
          font-size: ${currentSize.fontSize};
          border-radius: ${currentSize.borderRadius};
        }

        .enhanced-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .enhanced-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .enhanced-button:hover::before {
          left: 100%;
        }

        .enhanced-button.primary {
          background: var(--gradient-neural);
          box-shadow: 0 8px 25px rgba(125, 211, 252, 0.25);
        }

        .enhanced-button.primary:hover {
          box-shadow: 0 12px 35px rgba(125, 211, 252, 0.35);
        }

        .enhanced-button.secondary {
          background: var(--gradient-mint);
          box-shadow: 0 6px 20px rgba(168, 230, 207, 0.2);
        }

        .enhanced-button.secondary:hover {
          box-shadow: 0 10px 30px rgba(168, 230, 207, 0.3);
        }

        .enhanced-button.soft {
          background: var(--bg-card);
          border: 2px solid var(--border-primary);
          box-shadow: 0 4px 15px rgba(148, 163, 184, 0.1);
        }

        .enhanced-button.soft:hover {
          border-color: var(--neural-primary);
          box-shadow: 0 8px 25px rgba(125, 211, 252, 0.15);
        }

        .enhanced-button.pastel {
          background: var(--gradient-sunset);
          box-shadow: 0 6px 20px rgba(255, 211, 225, 0.2);
        }

        .enhanced-button.pastel:hover {
          box-shadow: 0 10px 30px rgba(255, 211, 225, 0.3);
        }

        .enhanced-button.aurora {
          background: var(--gradient-aurora);
          box-shadow: 0 8px 25px rgba(230, 230, 250, 0.2);
        }

        .enhanced-button.aurora:hover {
          box-shadow: 0 12px 35px rgba(230, 230, 250, 0.3);
        }

        .button-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .button-text {
          white-space: nowrap;
        }

        /* Size variations */
        .enhanced-button.small {
          font-size: 0.875rem;
          padding: 8px 16px;
          border-radius: 12px;
        }

        .enhanced-button.medium {
          font-size: 1rem;
          padding: 12px 24px;
          border-radius: 16px;
        }

        .enhanced-button.large {
          font-size: 1.125rem;
          padding: 16px 32px;
          border-radius: 20px;
        }

        .enhanced-button.xl {
          font-size: 1.25rem;
          padding: 20px 40px;
          border-radius: 24px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .enhanced-button {
            font-size: 0.875rem;
            padding: 10px 20px;
          }
          
          .enhanced-button.large,
          .enhanced-button.xl {
            font-size: 1rem;
            padding: 14px 28px;
          }
        }
      `}</style>
    </motion.button>
  )
}

export default EnhancedButton
