import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, Bell } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../ui/Logo';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock authenticated state - would come from AuthContext in real app
  const isAuthenticated = false;
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white border-b border-gray-800' 
        : 'bg-white text-gray-800 border-b border-gray-200'
    } transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo size={32} />
              <span className="ml-2 text-xl font-bold">CharityAI</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md font-medium hover:bg-opacity-10 hover:bg-gray-500 transition-colors">
                Home
              </Link>
              <Link to="/dashboard" className="px-3 py-2 rounded-md font-medium hover:bg-opacity-10 hover:bg-gray-500 transition-colors">
                Dashboard
              </Link>
              <Link to="/donate" className="px-3 py-2 rounded-md font-medium hover:bg-opacity-10 hover:bg-gray-500 transition-colors">
                Donate
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center">
            <div className="relative mx-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 rounded-full w-48 md:w-64 focus:outline-none focus:ring-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-white focus:ring-blue-600' 
                    : 'bg-gray-100 text-gray-800 focus:ring-blue-500'
                }`}
              />
            </div>
            
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              className="ml-2 p-2 relative rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors" 
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/profile')}
                className="ml-2 flex items-center"
              >
                <img 
                  src="https://i.pravatar.cc/150?u=1" 
                  alt="User profile" 
                  className="h-8 w-8 rounded-full border-2 border-blue-500"
                />
              </button>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="ml-4 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md font-medium hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="block px-3 py-2 rounded-md font-medium hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/donate" 
            className="block px-3 py-2 rounded-md font-medium hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Donate
          </Link>
          
          <div className="relative my-3 px-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white focus:ring-blue-600' 
                  : 'bg-gray-100 text-gray-800 focus:ring-blue-500'
              }`}
            />
          </div>
          
          {!isAuthenticated && (
            <button
              onClick={() => {
                navigate('/auth');
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;