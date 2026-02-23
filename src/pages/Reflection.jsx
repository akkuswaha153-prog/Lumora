import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIChatInterface from '../components/features/AIChatInterface';

/**
 * REFLECTION PAGE
 * The dedicated workspace for AI-guided sessions.
 * Optimized for concentration and long-form reading.
 */
const Reflection = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="reflection-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back">
          <ChevronLeft size={24} />
        </button>
        <div className="header-text">
          <h2>New Reflection</h2>
          <p>Privacy-First Guidance</p>
        </div>
        <div className="info-icon">
          <Info size={20} className="text-slate-500" />
        </div>
      </header>

      <div className="content-body">
        <AIChatInterface />
      </div>

      <style jsx>{`
        .reflection-page {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 150px); /* Adjusting for header and nav */
        }

        .page-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding: 0 4px;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 8px;
          border-radius: 12px;
          cursor: pointer;
        }

        .header-text h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .header-text p {
          margin: 2px 0 0 0;
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .info-icon {
          margin-left: auto;
        }

        .content-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </motion.div>
  );
};

export default Reflection;
