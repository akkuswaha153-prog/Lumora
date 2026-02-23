import React from 'react';
import { motion } from 'framer-motion';

/**
 * GLASS CARD COMPONENT
 * The core UI container for all content.
 * Provides consistent rounding, blur, and entry animations.
 */
const GlassCard = ({ children, className = "", delay = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      onClick={onClick}
      className={`glass-card ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}

      <style jsx>{`
        .glass-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          padding: 24px;
          margin-bottom: 16px;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
          overflow: hidden;
          position: relative;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .glass-card:active {
          ${onClick ? 'transform: scale(0.98); transition: transform 0.1s;' : ''}
        }
      `}</style>
    </motion.div>
  );
};

export default GlassCard;
