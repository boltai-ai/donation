import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, Lock, Eye, Database, LogOut } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Bell className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex-grow">Email notifications</label>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex-grow">Push notifications</label>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex-grow">SMS notifications</label>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Lock className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>
            
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Active Sessions
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Eye className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold">Privacy</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex-grow">Profile visibility</label>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex-grow">Show donation history</label>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex-grow">Allow contact from NGOs</label>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Database className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold">Data</h2>
            </div>
            
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Download Reports
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Sign Out</h3>
            <p className="text-sm text-red-600/70 dark:text-red-400/70">
              You will be logged out of your account
            </p>
          </div>
          <Button
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
            leftIcon={<LogOut size={16} />}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;