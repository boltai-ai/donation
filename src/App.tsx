import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { LocationProvider } from './context/LocationContext';
import { InventoryProvider } from './context/InventoryContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { MatchingProvider } from './context/MatchingContext';
import { AuthProvider } from './context/AuthContext';
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

const queryClient = new QueryClient();

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
                      <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="donate" element={<DonationPage />} />
                        <Route path="available-donations" element={<AvailableDonationsPage />} />
                        <Route path="inventory" element={<InventoryPage />} />
                        <Route path="logistics" element={<LogisticsPage />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </Route>
                      <Route path="/auth" element={<AuthPage />} />
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