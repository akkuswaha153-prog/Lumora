import React from 'react';

/**
 * LOADING SKELETON COMPONENT
 * Mimics the structure of a long-form AI reflection.
 * Used for "Perceived Performance" during async API calls.
 */
const LoadingSkeleton = ({ fullPage = false }) => {
  return (
    <div className={`skeleton-container ${fullPage ? 'full-page' : ''}`} aria-hidden="true">
      <div className="skeleton-item title" />
      <div className="skeleton-item line-long" />
      <div className="skeleton-item line-medium" />
      <div className="skeleton-item line-short" />
      
      <div className="skeleton-spacer" />
      
      <div className="skeleton-item line-long" />
      <div className="skeleton-item line-long" />
      <div className="skeleton-item line-medium" />

      <style jsx>{`
        .skeleton-container {
          padding: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .full-page {
          margin-top: 80px;
        }

        .skeleton-item {
          background: linear-gradient(
            90deg, 
            rgba(30, 41, 59, 0.4) 25%, 
            rgba(51, 65, 85, 0.6) 50%, 
            rgba(30, 41, 59, 0.4) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
          border-radius: 8px;
        }

        .title { height: 32px; width: 60%; margin-bottom: 12px; }
        .line-long { height: 16px; width: 100%; }
        .line-medium { height: 16px; width: 85%; }
        .line-short { height: 16px; width: 40%; }
        
        .skeleton-spacer { height: 20px; }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;
