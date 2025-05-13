import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  positive?: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, positive = true, icon }) => {
  const { theme } = useTheme();
  
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${
          theme === 'dark' 
            ? 'bg-blue-900 bg-opacity-50' 
            : 'bg-blue-100'
        }`}>
          {icon}
        </div>
      </div>
      <div className={`flex items-center mt-4 text-sm ${
        positive 
          ? 'text-green-600 dark:text-green-400' 
          : 'text-red-600 dark:text-red-400'
      }`}>
        <TrendingUp size={16} className="mr-1" />
        <span>{change}</span>
      </div>
    </Card>
  );
};

const DonationStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    uniqueDonors: 0,
    totalFunds: 0,
    incompleteDonations: 0,
    changes: {
      donations: '0%',
      donors: '0%',
      funds: '0%',
      incomplete: '0%'
    }
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get current month's stats
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        
        // Get donations count
        const { count: currentDonations } = await supabase
          .from('inventory')
          .select('*', { count: 'exact' })
          .gte('created_at', firstDayOfMonth.toISOString());

        // Get unique donors
        const { data: donors } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('role', 'donor');

        // Get total funds
        const { data: funds } = await supabase
          .from('inventory')
          .select('quantity')
          .eq('category', 'Money');

        // Get incomplete donations
        const { count: incomplete } = await supabase
          .from('inventory')
          .select('*', { count: 'exact' })
          .eq('status', 'Reserved');

        // Calculate total funds
        const totalFunds = funds?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

        // Get previous month's stats for comparison
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const { count: prevDonations } = await supabase
          .from('inventory')
          .select('*', { count: 'exact' })
          .gte('created_at', prevMonth.toISOString())
          .lt('created_at', firstDayOfMonth.toISOString());

        // Calculate percentage changes
        const donationChange = prevDonations ? ((currentDonations - prevDonations) / prevDonations * 100).toFixed(1) : '0';
        
        setStats({
          totalDonations: currentDonations || 0,
          uniqueDonors: donors?.length || 0,
          totalFunds,
          incompleteDonations: incomplete || 0,
          changes: {
            donations: `${donationChange}%`,
            donors: '0%', // Implement historical comparison
            funds: '0%', // Implement historical comparison
            incomplete: '0%' // Implement historical comparison
          }
        });
      } catch (error) {
        console.error('Error fetching donation stats:', error);
      }
    };

    fetchStats();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('inventory_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Donations"
        value={stats.totalDonations}
        change={stats.changes.donations}
        icon={<Package size={24} className="text-blue-600" />}
      />
      <StatCard
        title="Active Donors"
        value={stats.uniqueDonors}
        change={stats.changes.donors}
        icon={<Users size={24} className="text-blue-600" />}
      />
      <StatCard
        title="Total Funds"
        value={`$${stats.totalFunds.toLocaleString()}`}
        change={stats.changes.funds}
        icon={<DollarSign size={24} className="text-blue-600" />}
      />
      <StatCard
        title="Incomplete Donations"
        value={stats.incompleteDonations}
        change={stats.changes.incomplete}
        positive={false}
        icon={<Package size={24} className="text-blue-600" />}
      />
    </div>
  );
};

export default DonationStats;