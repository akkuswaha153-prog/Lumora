import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Common Components
import AppLayout from './components/layout/AppLayout';
import LoadingSkeleton from './components/common/LoadingSkeleton';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy Loaded Pages for Performance
const Home = lazy(() => import('./pages/Home'));
const Reflection = lazy(() => import('./pages/Reflection'));
const History = lazy(() => import('./pages/History'));
const Settings = lazy(() => import('./pages/Settings'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

/**
 * MAIN APP COMPONENT
 * Handles routing with transition animations and lazy loading.
 */
function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <AppLayout>
        <Suspense fallback={<LoadingSkeleton fullPage />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/reflect" element={<Reflection />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
