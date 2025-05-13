import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { Calendar, BarChart, PieChart, TrendingUp, MessageSquare, Activity } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { createClient } from '@supabase/supabase-js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AnalyticsPage: React.FC = () => {
  const { theme } = useTheme();
  const [donationData, setDonationData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Donations',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.8)',
      },
    ],
  });

  const [categoryData, setCategoryData] = useState({
    labels: ['Clothing', 'Food', 'Medical', 'Education', 'Other'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(234, 179, 8, 0.8)',
        ],
      },
    ],
  });

  const [predictionData, setPredictionData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Actual',
        data: [0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Predicted',
        data: [0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(234, 179, 8, 1)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch donation trends
        const { data: donations } = await supabase
          .from('inventory')
          .select('created_at')
          .order('created_at', { ascending: true });

        if (donations) {
          const monthlyDonations = new Array(6).fill(0);
          donations.forEach((donation) => {
            const month = new Date(donation.created_at).getMonth();
            if (month >= 0 && month < 6) {
              monthlyDonations[month]++;
            }
          });

          setDonationData(prev => ({
            ...prev,
            datasets: [{
              ...prev.datasets[0],
              data: monthlyDonations,
            }],
          }));
        }

        // Fetch category distribution
        const { data: categories } = await supabase
          .from('inventory')
          .select('category');

        if (categories) {
          const categoryCounts = {
            Clothing: 0,
            Food: 0,
            Medical: 0,
            Education: 0,
            Other: 0,
          };

          categories.forEach((item) => {
            if (item.category in categoryCounts) {
              categoryCounts[item.category as keyof typeof categoryCounts]++;
            } else {
              categoryCounts.Other++;
            }
          });

          setCategoryData(prev => ({
            ...prev,
            datasets: [{
              ...prev.datasets[0],
              data: Object.values(categoryCounts),
            }],
          }));
        }

        // Generate prediction data (mock data for demonstration)
        const actualData = [65, 72, 78, 85, 82, 90];
        const predictedData = [68, 75, 80, 88, 85, 95];

        setPredictionData(prev => ({
          ...prev,
          datasets: [
            {
              ...prev.datasets[0],
              data: actualData,
            },
            {
              ...prev.datasets[1],
              data: predictedData,
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchData();

    // Set up real-time subscription
    const subscription = supabase
      .channel('inventory_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [theme]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Analytics & Insights</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
        Gain valuable insights into donation patterns, impact metrics, and AI predictions to make data-driven decisions.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Donations
              </p>
              <h3 className="text-2xl font-bold mt-1">2,856</h3>
              <p className="text-sm flex items-center mt-2 text-green-600 dark:text-green-400">
                <TrendingUp size={14} className="mr-1" />
                <span>+14.6%</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-blue-900 bg-opacity-50' 
                : 'bg-blue-100'
            }`}>
              <BarChart size={20} className="text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Matching Accuracy
              </p>
              <h3 className="text-2xl font-bold mt-1">92.4%</h3>
              <p className="text-sm flex items-center mt-2 text-green-600 dark:text-green-400">
                <TrendingUp size={14} className="mr-1" />
                <span>+3.2%</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-green-900 bg-opacity-50' 
                : 'bg-green-100'
            }`}>
              <Activity size={20} className="text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Feedback Score
              </p>
              <h3 className="text-2xl font-bold mt-1">4.8/5</h3>
              <p className="text-sm flex items-center mt-2 text-green-600 dark:text-green-400">
                <TrendingUp size={14} className="mr-1" />
                <span>+0.3</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-purple-900 bg-opacity-50' 
                : 'bg-purple-100'
            }`}>
              <MessageSquare size={20} className="text-purple-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Distribution Efficiency
              </p>
              <h3 className="text-2xl font-bold mt-1">86.7%</h3>
              <p className="text-sm flex items-center mt-2 text-green-600 dark:text-green-400">
                <TrendingUp size={14} className="mr-1" />
                <span>+5.1%</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-orange-900 bg-opacity-50' 
                : 'bg-orange-100'
            }`}>
              <PieChart size={20} className="text-orange-600" />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Donation Trends" subtitle="Monthly donation volume by category">
          <div className="w-full h-[300px]">
            <Bar data={donationData} options={chartOptions} />
          </div>
        </Card>
        
        <Card title="Donation Distribution" subtitle="Percentage allocation across categories">
          <div className="w-full h-[300px]">
            <Pie data={categoryData} options={pieOptions} />
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="AI Prediction Accuracy" subtitle="Model performance metrics">
          <div className="w-full h-[250px]">
            <Line data={predictionData} options={chartOptions} />
          </div>
        </Card>
        
        <Card title="Recent Activity" subtitle="Latest platform events">
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
                }`}>
                  <Calendar size={16} className="text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">New Donation Matched</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Winter Clothing donation matched with Eastside Shelter</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  <TrendingUp size={16} className="text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">AI Model Updated</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Matching algorithm improved with new training data</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'
                }`}>
                  <MessageSquare size={16} className="text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">Feedback Received</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hope Community Center rated their experience 5/5</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="Blockchain Transparency" subtitle="Smart contract activity">
          <div className="mt-4 space-y-2 text-sm">
            <div className={`p-2 rounded ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex justify-between">
                <span className="font-mono text-xs truncate w-32">0x7Fc9...3a24</span>
                <span className="text-green-600 dark:text-green-400">+$500</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Donation to Medical Fund
              </div>
            </div>
            
            <div className={`p-2 rounded ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex justify-between">
                <span className="font-mono text-xs truncate w-32">0x3aB8...9c12</span>
                <span className="text-blue-600 dark:text-blue-400">Transfer</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Fund distribution to recipient
              </div>
            </div>
            
            <div className={`p-2 rounded ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="flex justify-between">
                <span className="font-mono text-xs truncate w-32">0x8dF1...6b45</span>
                <span className="text-green-600 dark:text-green-400">+$250</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Donation to Education Fund
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;