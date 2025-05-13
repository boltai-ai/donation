import React from 'react';
import Card from '../ui/Card';
import { MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ImpactMap: React.FC = () => {
  const { theme } = useTheme();
  
  // Note: In a real implementation, you would use a mapping library like Leaflet or Google Maps
  // This is a simplified visual representation for the prototype
  
  return (
    <Card title="Donation Impact Map" subtitle="Geographic distribution of donations">
      <div 
        className={`relative w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
        }`}
      >
        {/* Map placeholder - would be replaced with actual map component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Interactive map would be displayed here</p>
        </div>
        
        {/* Sample donation markers */}
        <div className="absolute top-[30%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin size={28} className="text-red-500" />
            <span className={`absolute top-0 right-0 flex h-3 w-3 ${
              theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
            } rounded-full`}></span>
          </div>
        </div>
        
        <div className="absolute top-[40%] left-[60%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin size={28} className="text-red-500" />
            <span className={`absolute top-0 right-0 flex h-3 w-3 ${
              theme === 'dark' ? 'bg-green-400' : 'bg-green-600'
            } rounded-full`}></span>
          </div>
        </div>
        
        <div className="absolute top-[60%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin size={28} className="text-red-500" />
            <span className={`absolute top-0 right-0 flex h-3 w-3 ${
              theme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-600'
            } rounded-full`}></span>
          </div>
        </div>
        
        <div className="absolute top-[70%] left-[70%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin size={28} className="text-red-500" />
            <span className={`absolute top-0 right-0 flex h-3 w-3 ${
              theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'
            } rounded-full`}></span>
          </div>
        </div>
        
        {/* Map legend */}
        <div className={`absolute bottom-4 left-4 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } p-2 rounded-lg shadow-md`}>
          <div className="text-sm font-medium mb-2">Donation Type</div>
          <div className="space-y-1">
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full ${
                theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
              } mr-2`}></span>
              <span className="text-xs">Food</span>
            </div>
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full ${
                theme === 'dark' ? 'bg-green-400' : 'bg-green-600'
              } mr-2`}></span>
              <span className="text-xs">Clothing</span>
            </div>
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full ${
                theme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-600'
              } mr-2`}></span>
              <span className="text-xs">Medical</span>
            </div>
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full ${
                theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'
              } mr-2`}></span>
              <span className="text-xs">Education</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Active Regions</p>
          <p className="text-lg font-semibold">14</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Donations</p>
          <p className="text-lg font-semibold">2,856</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Recipients</p>
          <p className="text-lg font-semibold">97</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Impact Score</p>
          <p className="text-lg font-semibold">8.7/10</p>
        </div>
      </div>
    </Card>
  );
};

export default ImpactMap;