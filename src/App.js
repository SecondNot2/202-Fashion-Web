import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import MainLayout from './components/layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/atoms/LoadingSpinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </Router>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;