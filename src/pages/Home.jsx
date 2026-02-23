import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import InstallPrompt from '../components/features/InstallPrompt';
import { storageService } from '../services/storageService';
import { FREE_DAILY_LIMIT } from '../utils/constants';

const Home = () => {
  const navigate = useNavigate();
  const [usageCount, setUsageCount] = useState(0);
import AdsterraBanner from '../components/features/AdsterraBanner';
  useEffect(() => {
    const fetchUsage = async () => {
      const today = new Date().toISOString().split('T')[0];
      const count = await storageService.getSetting(`usage_${today}`) || 0;
      setUsageCount(count);
    };
    fetchUsage();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="home-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="home-hero">
        <motion.h2 variants={itemVariants} className="welcome-text">
          Good day, <span className="text-gradient">Seeker</span>
        </motion.h2>
        <motion.p variants={itemVariants} className="subtitle">
          Find clarity through private, structured reflection.
        </motion.p>
      </header>
// ... Line 48 tak purana code ...
      <header className="home-hero">
        <motion.h2 variants={itemVariants} className="welcome-text">
          Good day, <span className="text-gradient">Seeker</span>
        </motion.h2>
        <motion.p variants={itemVariants} className="subtitle">
          Find clarity through private, structured reflection.
        </motion.p>
      </header>

      {/* --- YAHAN PASTE KAREIN (Approx Line 58) --- */}
      <AdsterraBanner /> 
      {/* ------------------------------------------ */}

      <GlassCard delay={0.2} onClick={() => navigate('/reflect')}>
        <div className="cta-content">
// ... baaki ka code ...
      <GlassCard delay={0.2} onClick={() => navigate('/reflect')}>
        <div className="cta-content">
          <div className="cta-text">
            <h3>Start New Reflection</h3>
            <p>Process your thoughts with AI guidance.</p>
          </div>
          <div className="cta-icon">
            <Sparkles size={24} className="text-indigo-400" />
          </div>
        </div>
        <div className="usage-bar">
          <div className="usage-info">
            <span>Daily Limit</span>
            <span>{usageCount} / {FREE_DAILY_LIMIT}</span>
          </div>
          <div className="progress-bg">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min((usageCount / FREE_DAILY_LIMIT) * 100, 100)}%` }} 
            />
          </div>
        </div>
      </GlassCard>

      <div className="grid-options">
        <GlassCard delay={0.3} className="mini-card" onClick={() => navigate('/history')}>
          <Clock size={20} className="mb-2 text-purple-400" />
          <h4>Past Logs</h4>
          <p>Review growth.</p>
        </GlassCard>

        <GlassCard delay={0.4} className="mini-card" onClick={() => navigate('/settings')}>
          <ShieldCheck size={20} className="mb-2 text-emerald-400" />
          <h4>Privacy</h4>
          <p>Local data.</p>
        </GlassCard>
      </div>

      <InstallPrompt />

      <style jsx>{`
        .home-page {
          padding-bottom: 20px;
        }
        .home-hero {
          margin-bottom: 32px;
          text-align: left;
        }
        .welcome-text {
          font-size: 2rem;
          font-weight: 800;
          margin: 0;
        }
        .subtitle {
          color: #94a3b8;
          font-size: 1rem;
          margin-top: 8px;
        }
        .cta-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .cta-text h3 {
          margin: 0;
          font-size: 1.2rem;
        }
        .cta-text p {
          margin: 4px 0 0 0;
          font-size: 0.9rem;
          color: #94a3b8;
        }
        .usage-bar {
          margin-top: 10px;
        }
        .usage-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 6px;
        }
        .progress-bg {
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #a855f7);
          border-radius: 10px;
          transition: width 1s ease-out;
        }
        .grid-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .mb-2 { margin-bottom: 8px; }
      `}</style>
    </motion.div>
  );
};

export default Home;
