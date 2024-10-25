import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotificationProvider } from "./contexts/NotificationContext";
import { CartProvider } from "./contexts/CartContext";
import { QuickViewProvider } from "./contexts/QuickViewContext";
import MainLayout from "./components/layouts/MainLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/atoms/LoadingSpinner";
import ScrollToTop from "./components/atoms/ScrollToTop";
import QuickViewModal from "./components/molecules/QuickViewModal";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <CartProvider>
          <QuickViewProvider>
            <Router>
              <ScrollToTop />
              <MainLayout>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path="/product/:id"
                      element={<ProductDetailPage />}
                    />
                  </Routes>
                </Suspense>
              </MainLayout>
              <QuickViewModal />
            </Router>
          </QuickViewProvider>
        </CartProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
