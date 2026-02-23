import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * SNACKBAR COMPONENT
 * Temporary floating notification for user feedback.
 * Optimized for thumb-reachability near the bottom of the screen.
 */
const Snackbar = ({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    info: <Info size={18} className="text-indigo-400" />,
    error: <AlertCircle size={18} className="text-red-400" />,
    success: <CheckCircle2 size={18} className="text-emerald-400" />
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="snackbar-wrapper"
          role="alert"
          aria-live="polite"
        >
          <div className={`snackbar-content snackbar-${type}`}>
            {icons[type]}
            <span className="snackbar-message">{message}</span>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .snackbar-wrapper {
          position: fixed;
          bottom: 100px; /* Sits above the bottom nav */
          left: 50%;
          z-index: 1000;
          width: calc(100% - 40px);
          max-width: 400px;
          pointer-events: none;
        }

        .snackbar-content {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 16px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          pointer-events: auto;
        }

        .snackbar-message {
          color: #f8fafc;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .snackbar-error {
          border-left: 4px solid #ef4444;
        }

        .snackbar-success {
          border-left: 4px solid #10b981;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default Snackbar;
