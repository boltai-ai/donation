import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { Truck, MapPin, Route, Clock, Calendar, Box } from 'lucide-react';

const LogisticsPage: React.FC = () => {
  const { theme } = useTheme();
  
  // Mock data for delivery routes
  const routes = [
    {
      id: 'R001',
      name: 'Downtown Route',
      stops: 4,
      status: 'In Progress',
      eta: '1h 15m',
      driver: 'John Smith',
      items: 12,
    },
    {
      id: 'R002',
      name: 'East Side Delivery',
      stops: 6,
      status: 'Scheduled',
      eta: '3h 30m',
      driver: 'Maria Garcia',
      items: 24,
    },
    {
      id: 'R003',
      name: 'North County Drop-offs',
      stops: 3,
      status: 'Completed',
      eta: '0h 0m',
      driver: 'David Johnson',
      items: 8,
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
        }`}>{status}</span>;
      case 'Scheduled':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
        }`}>{status}</span>;
      case 'Completed':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
        }`}>{status}</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Logistics Management</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
        Optimize the delivery of donations with our AI-powered logistics system. Plan efficient routes, track deliveries in real-time, and minimize transportation costs.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card title="Route Map" subtitle="Live tracking of all delivery routes">
            <div 
              className={`relative w-full h-[400px] rounded-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              {/* Map placeholder - would be replaced with actual map component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Interactive logistics map would be displayed here</p>
              </div>
              
              {/* Sample route markers */}
              <div className="absolute top-[30%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Truck size={24} className="text-blue-500" />
                </div>
              </div>
              
              <div className="absolute top-[50%] left-[55%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Truck size={24} className="text-yellow-500" />
                </div>
              </div>
              
              {/* Route lines would be drawn here in a real implementation */}
              
              {/* Destination markers */}
              <div className="absolute top-[35%] left-[35%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin size={20} className="text-red-500" />
                </div>
              </div>
              
              <div className="absolute top-[40%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin size={20} className="text-red-500" />
                </div>
              </div>
              
              <div className="absolute top-[25%] left-[15%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin size={20} className="text-red-500" />
                </div>
              </div>
              
              <div className="absolute top-[60%] left-[62%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin size={20} className="text-red-500" />
                </div>
              </div>
              
              <div className="absolute top-[45%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin size={20} className="text-red-500" />
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Routes</p>
                <p className="text-lg font-semibold">2</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Stops</p>
                <p className="text-lg font-semibold">13</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Items in Transit</p>
                <p className="text-lg font-semibold">36</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed Today</p>
                <p className="text-lg font-semibold">3</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="Upcoming Pickups" subtitle="Scheduled donation pickups">
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Winter Clothing Donation</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Today
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <p>Tuesday, April 16, 2025</p>
                    <p className="text-gray-500">2:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-2">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <p>123 Main Street, Apt 4B</p>
                    <p className="text-gray-500">Downtown, CA 90210</p>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Office Furniture</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    theme === 'dark' ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'
                  }`}>
                    Tomorrow
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <p>Wednesday, April 17, 2025</p>
                    <p className="text-gray-500">10:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-2">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <p>456 Business Plaza, Suite 200</p>
                    <p className="text-gray-500">Financial District, CA 90211</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  View All Scheduled Pickups
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <Card title="Delivery Routes" subtitle="AI-optimized routes for efficient delivery">
        <div className="overflow-x-auto">
          <table className={`min-w-full divide-y ${
            theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
          }`}>
            <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Driver
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Stops
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  ETA
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {routes.map((route) => (
                <tr key={route.id} className={`${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                } transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                        <Route className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{route.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{route.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {route.driver}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(route.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      {route.stops} stops
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Box size={16} className="mr-2 text-gray-400" />
                      {route.items} items
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-gray-400" />
                      {route.eta}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default LogisticsPage;