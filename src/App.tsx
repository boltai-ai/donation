import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { LocationProvider } from './context/LocationContext';
import { InventoryProvider } from './context/InventoryContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { MatchingProvider } from './context/MatchingContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DonationPage from './pages/DonationPage';
import InventoryPage from './pages/InventoryPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import LogisticsPage from './pages/LogisticsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AvailableDonationsPage from './pages/AvailableDonationsPage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient();

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// Public Route wrapper component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocationProvider>
          <InventoryProvider>
            <AnalyticsProvider>
              <MatchingProvider>
                <AuthProvider>
                  <Router>
                    <Routes>
                      {/* Public routes */}
                      <Route path="/auth" element={
                        <PublicRoute>
                          <AuthPage />
                        </PublicRoute>
                      } />

                      {/* Protected routes */}
                      <Route path="/" element={
                        <ProtectedRoute>
                          <Layout />
                        </ProtectedRoute>
                      }>
                        <Route index element={<HomePage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="donate" element={<DonationPage />} />
                        <Route path="available-donations" element={<AvailableDonationsPage />} />
                        <Route path="inventory" element={<InventoryPage />} />
                        <Route path="logistics" element={<LogisticsPage />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </Route>
                    </Routes>
                  </Router>
                </AuthProvider>
              </MatchingProvider>
            </AnalyticsProvider>
          </InventoryProvider>
        </LocationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;