import React from 'react';
import { APP_NAME, APP_VERSION } from '../../utils/constants';
import { ShieldCheck } from 'lucide-react';

/**
 * HEADER COMPONENT
 * Fixed position branding with glassmorphism effect.
 * Includes accessibility support for screen readers.
 */
const Header = () => {
  return (
    <header className="header-fixed">
      <div className="header-content">
        <div className="brand">
          <div className="logo-icon" aria-hidden="true">
            🧠
          </div>
          <div className="brand-text">
            <h1 className="app-title">{APP_NAME}</h1>
            <span className="app-version">v{APP_VERSION}</span>
          </div>
        </div>
        
        <div className="status-indicator" title="Privacy Protected">
          <ShieldCheck size={18} className="text-indigo-400" />
          <span className="status-text">Local-Only</span>
        </div>
      </div>

      <style jsx>{`
        .header-fixed {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 500px;
          height: 70px;
          z-index: 50;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          padding: 0 20px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          font-size: 1.5rem;
          filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.5));
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .app-title {
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
          line-height: 1;
          color: #f8fafc;
        }

        .app-version {
          font-size: 0.65rem;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(99, 102, 241, 0.1);
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .status-text {
          font-size: 0.7rem;
          font-weight: 600;
          color: #818cf8;
        }
      `}</style>
    </header>
  );
};

export default Header;
