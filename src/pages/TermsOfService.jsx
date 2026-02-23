import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';

/**
 * TERMS OF SERVICE
 * Standard usage agreement. 
 * Includes critical AI safety and medical disclaimers.
 */
const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="legal-page"
    >
      <button onClick={() => navigate(-1)} className="back-btn-float">
        <ChevronLeft size={24} />
      </button>

      <div className="center-icon">
        <Scale size={48} className="text-indigo-400" />
      </div>

      <h2 className="text-center text-2xl font-bold mb-6">Terms of Service</h2>

      <GlassCard className="legal-content">
        <section>
          <h3>1. Acceptance of Terms</h3>
          <p>By using AI Life Companion, you agree to these terms. If you do not agree, please uninstall the application.</p>
        </section>

        <section>
          <h3>2. Not a Professional Service</h3>
          <p className="highlight-box">
            <strong>IMPORTANT:</strong> This app provides AI-generated reflections for self-improvement only. It is NOT a substitute for professional therapy, medical advice, or crisis intervention. 
          </p>
        </section>

        <section>
          <h3>3. User Responsibility</h3>
          <p>You are responsible for the content you input. You agree not to use the service for any illegal or harmful activities.</p>
        </section>

        <section>
          <h3>4. Limitation of Liability</h3>
          <p>We provide this tool "as-is." We are not liable for any decisions made based on AI-generated content. AI can occasionally produce inaccurate or biased information.</p>
        </section>

        <p className="update-text">Effective Date: February 2026</p>
      </GlassCard>

      <style jsx>{`
        .legal-page { padding: 20px; padding-top: 60px; }
        .back-btn-float {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 8px;
          border-radius: 50%;
          z-index: 100;
        }
        .center-icon { display: flex; justify-content: center; margin-bottom: 16px; }
        .legal-content h3 {
          font-size: 1.1rem;
          color: #a855f7;
          margin: 20px 0 10px 0;
        }
        .highlight-box {
          background: rgba(249, 115, 22, 0.1);
          border-left: 3px solid #f97316;
          padding: 12px;
          border-radius: 4px;
          color: #fdba74 !important;
        }
        .legal-content p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #cbd5e1;
        }
        .update-text {
          margin-top: 30px;
          font-size: 0.75rem;
          color: #64748b;
          text-align: center;
        }
      `}</style>
    </motion.div>
  );
};

export default TermsOfService;
