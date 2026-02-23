import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BrainCircuit, History, Settings } from 'lucide-react';

/**
 * NAVIGATION COMPONENT
 * Bottom-docked tab bar optimized for mobile UX.
 * Uses semantic <nav> and NavLink for active state management.
 */
const Navigation = () => {
  const navItems = [
    { path: '/', icon: <Home size={22} />, label: 'Home' },
    { path: '/reflect', icon: <BrainCircuit size={22} />, label: 'Reflect' },
    { path: '/history', icon: <History size={22} />, label: 'History' },
    { path: '/settings', icon: <Settings size={22} />, label: 'Settings' },
  ];

  return (
    <nav className="nav-container" aria-label="Main Navigation">
      <div className="nav-content">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <style jsx>{`
        .nav-container {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 500px;
          height: 80px;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 100;
          padding-bottom: env(safe-area-inset-bottom); /* iOS Notch Support */
        }

        .nav-content {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 100%;
          padding: 0 10px;
        }

        .nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          text-decoration: none;
          gap: 4px;
          flex: 1;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link.active {
          color: #818cf8;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          top: -12px;
          width: 20px;
          height: 4px;
          background: #818cf8;
          border-radius: 0 0 4px 4px;
          box-shadow: 0 4px 12px rgba(129, 140, 248, 0.5);
        }

        .nav-icon {
          transition: transform 0.2s ease;
        }

        .nav-link:active .nav-icon {
          transform: scale(0.8);
        }

        .nav-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
