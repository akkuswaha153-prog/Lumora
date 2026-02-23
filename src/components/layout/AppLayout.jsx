import React from 'react';
import Navigation from './Navigation';
import Header from './Header';

/**
 * APP LAYOUT COMPONENT
 * Provides a consistent structure with semantic HTML5 elements.
 * Optimized for mobile viewport constraints and accessibility.
 */
const AppLayout = ({ children }) => {
  return (
    <div className="app-container">
      {/* Semantic Header for Screen Readers */}
      <Header />

      {/* Main Content Area */}
      <main 
        id="main-content"
        className="flex-grow w-full py-4 relative"
        role="main"
        aria-label="Main Content"
      >
        {children}
      </main>

      {/* Persistent Navigation (Bottom for Mobile UX) */}
      <Navigation />

      {/* Decorative Background Elements (Glassmorphism support) */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
      </div>

      <style jsx>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-height: -webkit-fill-available; /* Fix for iOS Safari height */
          max-width: 500px;
          margin: 0 auto;
          position: relative;
        }
        
        main {
          flex: 1 0 auto;
          padding-bottom: 80px; /* Space for bottom nav */
          padding-top: 70px;    /* Space for header */
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
