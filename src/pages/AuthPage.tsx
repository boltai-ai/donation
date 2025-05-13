import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, UserPlus, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

type AuthView = 'login' | 'register';

const AuthPage: React.FC = () => {
  const { theme } = useTheme();
  const { signIn, signUp, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>('login');
  const [userRole, setUserRole] = useState<'donor' | 'receiver'>('donor');
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      // Get user's location after successful auth
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Update user's location in the database
            updateUserLocation(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }

      // Redirect based on role
      if (user.role === 'donor') {
        navigate('/donate');
      } else {
        navigate('/available-donations');
      }
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    
    try {
      if (view === 'login') {
        await signIn(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await signUp(formData.email, formData.password, userRole, formData.name);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      // Handle specific error cases
      if (error?.message?.toLowerCase().includes('user already registered') || 
          error?.message?.toLowerCase().includes('user_already_exists')) {
        setError('This email is already registered. Please sign in instead.');
        setView('login'); // Automatically switch to login view
        setFormData(prev => ({
          ...prev,
          password: '',
          confirmPassword: '',
        }));
      } else if (error?.message?.toLowerCase().includes('invalid_credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (error?.message?.toLowerCase().includes('invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Authentication failed. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`max-w-md w-full ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-lg p-8`}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {view === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {view === 'login' 
              ? 'Sign in to continue to the platform' 
              : 'Join our community and start making a difference'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {view === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  required
                  className={`pl-10 w-full rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } p-2.5`}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                required
                className={`pl-10 w-full rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } p-2.5`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                required
                className={`pl-10 w-full rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } p-2.5`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {view === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className={`pl-10 w-full rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } p-2.5`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">I am a:</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
                      userRole === 'donor'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : theme === 'dark'
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-gray-100 border-gray-300'
                    }`}
                    onClick={() => setUserRole('donor')}
                  >
                    <UserPlus size={20} className="mr-2" />
                    Donor
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
                      userRole === 'receiver'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : theme === 'dark'
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-gray-100 border-gray-300'
                    }`}
                    onClick={() => setUserRole('receiver')}
                  >
                    <MapPin size={20} className="mr-2" />
                    Receiver
                  </button>
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            {view === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setView(view === 'login' ? 'register' : 'login');
              setError(''); // Clear errors when switching views
              setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form
            }}
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            {view === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;