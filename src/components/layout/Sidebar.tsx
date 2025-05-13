import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Heart, Package, Truck as TruckDelivery, BarChart, Settings, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Donation', icon: Heart, path: '/donate' },
    { name: 'Available Donations', icon: Gift, path: '/available-donations' },
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Logistics', icon: TruckDelivery, path: '/logistics' },
    { name: 'Analytics', icon: BarChart, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${
        theme === 'dark' 
          ? 'bg-gray-900 text-white border-r border-gray-800' 
          : 'bg-white text-gray-900 border-r border-gray-200'
      } z-40 hidden sm:block`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? theme === 'dark'
                        ? 'bg-blue-900 bg-opacity-50 text-blue-300'
                        : 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-700 hover:bg-opacity-20'
                  }`}
                >
                  <item.icon size={20} className={isActive(item.path) ? 'text-blue-500' : ''} />
                  {!isCollapsed && (
                    <span className="ml-3 transition-opacity duration-200">{item.name}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="w-full flex justify-center items-center p-2 rounded-lg hover:bg-gray-700 hover:bg-opacity-20 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;