import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Shield, FileText, ChevronRight, Info, HardDrive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import Snackbar from '../components/common/Snackbar';
import { storageService } from '../services/storageService';
import { APP_VERSION } from '../utils/constants';

const Settings = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ show: false, msg: '', type: 'info' });

  const handleClearData = async () => {
    if (confirm("Are you absolutely sure? This will wipe all your reflections locally and cannot be undone.")) {
      try {
        await storageService.clearAllData();
        setSnackbar({ show: true, msg: 'All local data has been wiped.', type: 'success' });
      } catch (err) {
        setSnackbar({ show: true, msg: 'Error clearing data.', type: 'error' });
      }
    }
  };

  const settingsLinks = [
    { label: 'Privacy Policy', path: '/privacy', icon: <Shield size={18} /> },
    { label: 'Terms of Service', path: '/terms', icon: <FileText size={18} /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="settings-page"
    >
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-slate-400 text-sm">Manage your preferences and data.</p>
      </header>

      <section className="settings-section">
        <h3 className="section-title">Data & Privacy</h3>
        <GlassCard className="p-0 overflow-hidden">
          <div className="data-info">
            <HardDrive size={20} className="text-indigo-400" />
            <div>
              <p className="font-semibold">Local Storage Only</p>
              <p className="text-xs text-slate-400">Your conversations never leave this device.</p>
            </div>
          </div>
          
          <div className="danger-zone">
            <button onClick={handleClearData} className="delete-all-btn">
              <Trash2 size={18} />
              <span>Delete All Reflections</span>
            </button>
          </div>
        </GlassCard>
      </section>

      <section className="settings-section mt-6">
        <h3 className="section-title">Legal & About</h3>
        <div className="links-list">
          {settingsLinks.map((link) => (
            <GlassCard 
              key={link.path} 
              className="link-card" 
              onClick={() => navigate(link.path)}
            >
              <div className="link-content">
                {link.icon}
                <span>{link.label}</span>
                <ChevronRight size={18} className="ml-auto text-slate-500" />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <footer className="version-footer">
        <Info size={14} />
        <span>Build Version {APP_VERSION} (Stable)</span>
      </footer>

      <Snackbar 
        isVisible={snackbar.show} 
        message={snackbar.msg} 
        type={snackbar.type} 
        onClose={() => setSnackbar({ ...snackbar, show: false })} 
      />

      <style jsx>{`
        .settings-page { padding-bottom: 40px; }
        .section-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 12px;
          padding-left: 4px;
        }
        .data-info {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .danger-zone { padding: 12px; }
        .delete-all-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.1);
          border-radius: 16px;
          font-weight: 600;
          cursor: pointer;
        }
        .link-card { padding: 16px !important; margin-bottom: 8px !important; }
        .link-content { display: flex; align-items: center; gap: 12px; }
        .version-footer {
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.75rem;
          color: #475569;
        }
      `}</style>
    </motion.div>
  );
};

export default Settings;
