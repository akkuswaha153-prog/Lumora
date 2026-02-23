import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';
import AdUnit from '../components/features/AdUnit'; // <--- IMPORTED

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="home-hero">
        <h2 className="text-3xl font-bold">Good day, Seeker</h2>
        <p className="text-slate-400">Find clarity through private reflection.</p>
      </header>

      {/* --- ADSTERRA BANNER PLACEMENT --- */}
      <AdUnit /> 
      {/* -------------------------------- */}

      <GlassCard onClick={() => navigate('/reflect')}>
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold">Start New Reflection</h3>
          <p className="text-sm text-slate-400">Process your thoughts with AI.</p>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <GlassCard onClick={() => navigate('/history')}>History</GlassCard>
        <GlassCard onClick={() => navigate('/settings')}>Settings</GlassCard>
      </div>
    </motion.div>
  );
};

export default Home;
