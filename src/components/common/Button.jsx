import React from 'react';
import { motion } from 'framer-motion';

/**
 * ACCESSIBLE BUTTON COMPONENT
 * Optimized for mobile touch targets (min 48px height).
 * Includes vibration feedback (where supported) and loading states.
 */
const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  disabled = false, 
  isLoading = false,
  ariaLabel
}) => {
  
  const handleInteraction = (e) => {
    if (disabled || isLoading) return;
    
    // Haptic feedback for mobile users
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
    
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type={type}
      onClick={handleInteraction}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      className={`btn-base btn-${variant} ${isLoading ? 'btn-loading' : ''}`}
    >
      {isLoading ? (
        <span className="loader-dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
      ) : (
        children
      )}

      <style jsx>{`
        .btn-base {
          width: 100%;
          min-height: 56px; /* Play Store accessibility standard */
          border: none;
          border-radius: 18px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-danger {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .btn-base:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }

        .loader-dots span {
          animation: blink 1.4s infinite both;
          font-size: 2rem;
          line-height: 0;
          margin: 0 2px;
        }

        .loader-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loader-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </motion.button>
  );
};

export default Button;
