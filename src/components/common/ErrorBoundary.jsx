import React from 'react';
import GlassCard from './GlassCard';
import Button from './Button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

/**
 * ERROR BOUNDARY COMPONENT
 * Catches JavaScript errors anywhere in their child component tree.
 * Essential for "Error Resilient" production apps.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an analytics service here
    console.error("Uncaught Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/'; // Redirect to home on reset
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <GlassCard className="error-card">
            <div className="error-icon-wrapper">
              <AlertTriangle size={48} className="text-red-400" />
            </div>
            
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-message">
              The app encountered an unexpected issue. Don't worry, your data stored locally is still safe.
            </p>

            <Button onClick={this.handleReset} variant="secondary">
              <RefreshCcw size={18} className="mr-2" />
              Restart App
            </Button>
          </GlassCard>

          <style jsx>{`
            .error-boundary-container {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              padding: 20px;
              background: #0f172a;
            }

            .error-card {
              text-align: center;
              max-width: 400px;
            }

            .error-icon-wrapper {
              margin-bottom: 20px;
              display: flex;
              justify-content: center;
            }

            .error-title {
              font-size: 1.5rem;
              font-weight: 700;
              margin-bottom: 12px;
              color: #f8fafc;
            }

            .error-message {
              font-size: 0.95rem;
              color: #94a3b8;
              margin-bottom: 24px;
              line-height: 1.6;
            }

            .mr-2 {
              margin-right: 8px;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
