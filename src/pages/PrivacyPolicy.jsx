import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';

const PrivacyPolicy = () => {
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
        <ShieldCheck size={48} className="text-emerald-400" />
      </div>

      <h2 className="text-center text-2xl font-bold mb-6">Privacy Policy</h2>

      <GlassCard className="legal-content">
        <section>
          <h3>1. Data Collection</h3>
          <p>AI Life Companion is designed as a <strong>Local-First</strong> application. We do not collect, store, or sell your personal reflections on any external servers.</p>
        </section>

        <section>
          <h3>2. AI Processing</h3>
          <p>To provide reflections, your input is sent to an AI Model Provider (OpenAI/Google). This data is used only for real-time generation and is not stored by us. Please refer to their respective privacy policies for how they handle transient data.</p>
        </section>

        <section>
          <h3>3. Local Storage</h3>
          <p>Your history is stored in your device's <strong>IndexedDB</strong>. You have 100% control over this data and can wipe it at any time from the Settings menu.</p>
        </section>

        <section>
          <h3>4. Safety</h3>
          <p>We do not use trackers or third-party analytics that identify you personally.</p>
        </section>

        <p className="update-text">Last Updated: February 2026</p>
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
          color: #818cf8;
          margin: 20px 0 10px 0;
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

export default PrivacyPolicy;
