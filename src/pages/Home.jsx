import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';
// Sahi path aur component import
import AdUnit from '../components/features/AdUnit';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
    >
      <header className="home-hero py-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Good day, Seeker
        </h2>
        <p className="text-slate-400 mt-2">Find clarity through private reflection.</p>
      </header>

      {/* Adsterra Banner Section */}
      <div className="flex justify-center w-full overflow-hidden">
        <AdUnit />
      </div>

      <div className="grid gap-6">
        <GlassCard onClick={() => navigate('/reflect')} className="cursor-pointer group hover:border-blue-500/50 transition-all">
          <div className="p-6 text-center space-y-2">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Start New Reflection</h3>
            <p className="text-sm text-slate-400">Process your thoughts with Lumora AI</p>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-4">
          <GlassCard onClick={() => navigate('/history')} className="cursor-pointer hover:bg-white/5 transition-colors">
            <div className="p-4 text-center">
              <span className="block text-xl mb-1">📜</span>
              <span className="text-sm font-medium">History</span>
            </div>
          </GlassCard>
          
          <GlassCard onClick={() => navigate('/settings')} className="cursor-pointer hover:bg-white/5 transition-colors">
            <div className="p-4 text-center">
              <span className="block text-xl mb-1">⚙️</span>
              <span className="text-sm font-medium">Settings</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
