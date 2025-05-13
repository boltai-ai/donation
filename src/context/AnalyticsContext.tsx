import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DonationStats {
  totalDonations: number;
  totalRecipients: number;
  totalFunds: number;
  activeRegions: number;
}

interface CategoryStats {
  [key: string]: {
    count: number;
    percentage: number;
    trend: number;
  };
}

interface AnalyticsContextType {
  donationStats: DonationStats;
  categoryStats: CategoryStats;
  updateStats: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [donationStats, setDonationStats] = useState<DonationStats>({
    totalDonations: 0,
    totalRecipients: 0,
    totalFunds: 0,
    activeRegions: 0,
  });

  const [categoryStats, setCategoryStats] = useState<CategoryStats>({});

  const calculateStats = () => {
    const acceptedDonations = JSON.parse(localStorage.getItem('acceptedDonations') || '[]');
    const availableDonations = JSON.parse(localStorage.getItem('availableDonations') || '[]');
    const allDonations = [...acceptedDonations, ...availableDonations];

    // Calculate basic stats
    const uniqueRecipients = new Set(acceptedDonations.map(d => d.recipientName)).size;
    const totalFunds = allDonations
      .filter(d => d.type === 'money')
      .reduce((sum, d) => sum + (d.amount || 0), 0);
    const uniqueRegions = new Set(allDonations.map(d => d.location)).size;

    setDonationStats({
      totalDonations: allDonations.length,
      totalRecipients: uniqueRecipients,
      totalFunds: totalFunds,
      activeRegions: uniqueRegions,
    });

    // Calculate category stats
    const categories = allDonations.reduce((acc, donation) => {
      const category = donation.category;
      if (!acc[category]) {
        acc[category] = { count: 0, percentage: 0, trend: 0 };
      }
      acc[category].count++;
      return acc;
    }, {} as CategoryStats);

    // Calculate percentages
    const total = allDonations.length;
    Object.keys(categories).forEach(category => {
      categories[category].percentage = (categories[category].count / total) * 100;
      
      // Calculate trend (comparing with previous month)
      const previousMonth = new Date();
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      
      const currentMonthDonations = allDonations.filter(d => 
        new Date(d.datePosted) > previousMonth && 
        d.category === category
      ).length;

      const previousMonthDonations = allDonations.filter(d => 
        new Date(d.datePosted) <= previousMonth && 
        new Date(d.datePosted) > new Date(previousMonth.setMonth(previousMonth.getMonth() - 1)) &&
        d.category === category
      ).length;

      categories[category].trend = previousMonthDonations === 0 
        ? 100 
        : ((currentMonthDonations - previousMonthDonations) / previousMonthDonations) * 100;
    });

    setCategoryStats(categories);
  };

  useEffect(() => {
    calculateStats();
  }, []);

  return (
    <AnalyticsContext.Provider value={{
      donationStats,
      categoryStats,
      updateStats: calculateStats,
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};