import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trash2, ChevronRight, Inbox } from 'lucide-react';
import { storageService } from '../services/storageService';
import GlassCard from '../components/common/GlassCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

const History = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const data = await storageService.getAllReflections();
    // Sort by date (newest first)
    const sortedData = data.sort((a, b) => b.timestamp - a.timestamp);
    setLogs(sortedData);
    setLoading(false);
  };

  const deleteLog = async (id, e) => {
    e.stopPropagation();
    if (confirm("Delete this reflection permanently?")) {
      await storageService.deleteReflection(id);
      setLogs(logs.filter(log => log.id !== id));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="history-page"
    >
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Your Journey</h2>
        <p className="text-slate-400 text-sm">All data is stored locally on your device.</p>
      </header>

      {loading ? (
        <LoadingSkeleton />
      ) : logs.length === 0 ? (
        <div className="empty-state">
          <Inbox size={48} className="text-slate-700 mb-4" />
          <p>No reflections yet. Start your first session!</p>
        </div>
      ) : (
        <div className="logs-list">
          <AnimatePresence>
            {logs.map((log) => (
              <GlassCard key={log.id} className="history-item">
                <div className="item-header">
                  <div className="date-tag">
                    <Calendar size={14} />
                    <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                  </div>
                  <button 
                    onClick={(e) => deleteLog(log.id, e)}
                    className="delete-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <p className="preview-text">
                  {log.text.substring(0, 100)}...
                </p>

                <div className="item-footer">
                  <span className={`type-tag ${log.role}`}>
                    {log.role === 'user' ? 'Reflection' : 'AI Insight'}
                  </span>
                  <ChevronRight size={18} className="text-slate-500" />
                </div>
              </GlassCard>
            ))}
          </AnimatePresence>
        </div>
      )}

      <style jsx>{`
        .history-page { padding-bottom: 20px; }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #64748b;
          text-align: center;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .date-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .preview-text {
          font-size: 0.95rem;
          line-height: 1.5;
          color: #f1f5f9;
          margin-bottom: 16px;
        }
        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .type-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .type-tag.user { color: #818cf8; background: rgba(129, 140, 248, 0.1); }
        .type-tag.ai { color: #a855f7; background: rgba(168, 85, 247, 0.1); }
        .delete-btn {
          background: transparent;
          border: none;
          color: #ef4444;
          opacity: 0.6;
          cursor: pointer;
        }
        .delete-btn:hover { opacity: 1; }
      `}</style>
    </motion.div>
  );
};

export default History;
