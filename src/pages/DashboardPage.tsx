import React from 'react';
import DonationStats from '../components/dashboard/DonationStats';
import MatchingStatus from '../components/dashboard/MatchingStatus';
import ImpactMap from '../components/dashboard/ImpactMap';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { Activity, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { theme } = useTheme();
  
  // Mock data for AI predictions
  const predictions = [
    {
      category: 'Winter Clothing',
      trend: 'increasing',
      percentage: 24,
      urgency: 'high',
    },
    {
      category: 'Non-perishable Food',
      trend: 'stable',
      percentage: 5,
      urgency: 'medium',
    },
    {
      category: 'Medical Supplies',
      trend: 'decreasing',
      percentage: 12,
      urgency: 'low',
    },
    {
      category: 'School Supplies',
      trend: 'increasing',
      percentage: 18,
      urgency: 'medium',
    },
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center text-sm">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
            theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
          }`}></span>
          <span className="text-gray-500 dark:text-gray-400">AI System: Active</span>
        </div>
      </div>
      
      <DonationStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MatchingStatus />
        </div>
        
        <div>
          <Card 
            title="AI Demand Predictions" 
            subtitle="Forecasted needs based on historical data"
            badge="Live"
            badgeColor="blue"
          >
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{prediction.category}</span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      prediction.urgency === 'high'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : prediction.urgency === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {prediction.urgency} urgency
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    {prediction.trend === 'increasing' ? (
                      <TrendingUp size={18} className="text-green-500 mr-2" />
                    ) : prediction.trend === 'decreasing' ? (
                      <TrendingDown size={18} className="text-red-500 mr-2" />
                    ) : (
                      <Activity size={18} className="text-blue-500 mr-2" />
                    )}
                    
                    <div className="flex-1">
                      <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            prediction.trend === 'increasing'
                              ? 'bg-green-500'
                              : prediction.trend === 'decreasing'
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                          }`}
                          style={{ width: `${prediction.percentage * 3}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <span className="ml-2 text-sm font-medium">
                      {prediction.trend === 'increasing' ? '+' : prediction.trend === 'decreasing' ? '-' : ''}
                      {prediction.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <AlertTriangle size={14} className="text-yellow-500 mr-2" />
              Predictions are based on AI analysis of historical data and current trends
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <ImpactMap />
      </div>
    </div>
  );
};

export default DashboardPage;