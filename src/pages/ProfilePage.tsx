import React, { useState } from 'react';
import { User, Settings, CreditCard, FileText, LogOut, Wallet, Edit3, Upload } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import AcceptedDonations from '../components/profile/AcceptedDonations';

type ProfileTab = 'account' | 'wallet' | 'history' | 'settings';

const ProfilePage: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ProfileTab>('account');
  
  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'donor',
    avatarUrl: 'https://i.pravatar.cc/150?u=1',
    joinDate: 'March 15, 2025',
    totalDonations: 12,
    walletAddress: '0x7Fc9...3a24',
    walletBalance: 500,
    walletCurrency: 'USD',
  };
  
  // Mock donation history
  const donationHistory = [
    {
      id: 'DON-001',
      type: 'Clothing',
      name: 'Winter Jackets',
      date: '2025-04-10',
      recipient: 'Eastside Shelter',
      status: 'Delivered',
    },
    {
      id: 'DON-002',
      type: 'Money',
      name: 'Medical Fund',
      date: '2025-03-28',
      recipient: 'Hope Medical Center',
      status: 'Completed',
    },
    {
      id: 'DON-003',
      type: 'Food',
      name: 'Non-perishable Items',
      date: '2025-03-15',
      recipient: 'Food Bank',
      status: 'Delivered',
    },
    {
      id: 'DON-004',
      type: 'Service',
      name: 'Delivery Transportation',
      date: '2025-02-22',
      recipient: 'Multiple Recipients',
      status: 'Completed',
    },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full md:w-1/3">
                <Card>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img 
                        src={userData.avatarUrl} 
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                      <button className={`absolute bottom-0 right-0 p-2 rounded-full ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                      } shadow-md`}>
                        <Edit3 size={16} className="text-blue-600" />
                      </button>
                    </div>
                    <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</p>
                    <div className={`mt-2 px-3 py-1 text-xs rounded-full ${
                      userData.role === 'donor'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {userData.role === 'donor' ? 'Donor' : 'NGO'}
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Member since {userData.joinDate}
                    </p>
                  </div>
                </Card>
              </div>
              
              <div className="w-full md:w-2/3 space-y-6">
                <Card title="Profile Information">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userData.name}
                        className={`w-full rounded-lg border ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        className={`w-full rounded-lg border ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Add a phone number"
                        className={`w-full rounded-lg border ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="Add your location"
                        className={`w-full rounded-lg border ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </Card>
                
                <Card title="Donation Statistics">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Donations</p>
                      <p className="text-2xl font-bold">{userData.totalDonations}</p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Impact Score</p>
                      <p className="text-2xl font-bold">8.5/10</p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Recipients Helped</p>
                      <p className="text-2xl font-bold">7</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );
        
      case 'wallet':
        return (
          <div className="space-y-6">
            <Card title="Blockchain Wallet" subtitle="Manage your blockchain wallet for transparent donations">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className={`p-6 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
                      : 'bg-gradient-to-r from-blue-500 to-teal-400'
                  } shadow-md`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-white'
                        }`}>
                          Balance
                        </p>
                        <p className={`text-2xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-white'
                        }`}>
                          ${userData.walletBalance.toFixed(2)} {userData.walletCurrency}
                        </p>
                      </div>
                      <div>
                        <Wallet size={24} className={theme === 'dark' ? 'text-gray-300' : 'text-white'} />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-white text-opacity-90'
                      }`}>
                        Wallet Address
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-sm font-mono ${
                          theme === 'dark' ? 'text-white' : 'text-white'
                        }`}>
                          {userData.walletAddress}
                        </p>
                        <button className={`p-1 rounded ${
                          theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                        }`}>
                          <Upload size={14} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button 
                      variant="primary" 
                      className="w-full"
                      leftIcon={<Upload size={16} />}
                    >
                      Deposit
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      leftIcon={<CreditCard size={16} />}
                    >
                      Link Card
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                  <div className={`rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  } p-4 space-y-4`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
                        }`}>
                          <Upload size={16} className="text-green-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Deposit</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Apr 10, 2025</p>
                        </div>
                      </div>
                      <p className="text-green-600 dark:text-green-400 font-medium">+$250.00</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
                        }`}>
                          <Wallet size={16} className="text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Medical Fund Donation</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Mar 28, 2025</p>
                        </div>
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">-$150.00</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
                        }`}>
                          <Upload size={16} className="text-green-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Deposit</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Mar 15, 2025</p>
                        </div>
                      </div>
                      <p className="text-green-600 dark:text-green-400 font-medium">+$400.00</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="ghost" className="w-full">
                      View All Transactions
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
        
      case 'history':
        return (
          <div className="space-y-6">
            <Card title="Accepted Donations" subtitle="Donations you have accepted">
              <AcceptedDonations />
            </Card>
            
            <Card title="Donation History" subtitle="Record of all your previous donations">
              <div className="overflow-x-auto">
                <table className={`min-w-full divide-y ${
                  theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
                }`}>
                  <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Donation
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Recipient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
                  }`}>
                    {donationHistory.map((donation) => (
                      <tr key={donation.id} className={`${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      } transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              donation.type === 'Clothing'
                                ? theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'
                                : donation.type === 'Money'
                                  ? theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
                                  : donation.type === 'Food'
                                    ? theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
                                    : theme === 'dark' ? 'bg-orange-900' : 'bg-orange-100'
                            }`}>
                              {donation.type === 'Clothing' ? (
                                <User size={16} className="text-purple-600" />
                              ) : donation.type === 'Money' ? (
                                <Wallet size={16} className="text-blue-600" />
                              ) : donation.type === 'Food' ? (
                                <Wallet size={16} className="text-green-600" />
                              ) : (
                                <Wallet size={16} className="text-orange-600" />
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{donation.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{donation.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {donation.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {donation.recipient}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            donation.status === 'Delivered'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button variant="ghost" size="sm" leftIcon={<FileText size={14} />}>
                            Receipt
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            <Card title="Impact Summary" subtitle="The difference your donations have made">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <h3 className="text-lg font-semibold mb-2">People Helped</h3>
                  <p className="text-3xl font-bold text-blue-600">42</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Your donations have directly impacted 42 individuals in need.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <h3 className="text-lg font-semibold mb-2">Communities</h3>
                  <p className="text-3xl font-bold text-teal-600">5</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Your contributions have reached 5 different communities.
                  </p>
                </div>
                
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <h3 className="text-lg font-semibold mb-2">Impact Score</h3>
                  <p className="text-3xl font-bold text-orange-600">8.5/10</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Your donations are making a significant difference based on AI analytics.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );
        
      case 'settings':
        return (
          <div className="space-y-6">
            <Card title="Account Settings" subtitle="Manage your account preferences">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="notifications_match" className="flex-grow">
                        Match notifications
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="notifications_match" 
                          name="notifications_match" 
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                          defaultChecked 
                        />
                        <label 
                          htmlFor="notifications_match" 
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="notifications_delivery" className="flex-grow">
                        Delivery updates
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="notifications_delivery" 
                          name="notifications_delivery" 
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                          defaultChecked 
                        />
                        <label 
                          htmlFor="notifications_delivery" 
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="notifications_impact" className="flex-grow">
                        Impact reports
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="notifications_impact" 
                          name="notifications_impact" 
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                        />
                        <label 
                          htmlFor="notifications_impact" 
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="notifications_marketing" className="flex-grow">
                        Marketing emails
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="notifications_marketing" 
                          name="notifications_marketing" 
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                        />
                        <label 
                          htmlFor="notifications_marketing" 
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <hr className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="privacy_public" className="flex-grow">
                        Make my donations public
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="privacy_public" 
                          name="privacy_public" 
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                          defaultChecked 
                        />
                        <label 
                          htmlFor="privacy_public" 
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="privacy_profile" className="flex-grow">
                        Show my profile to others
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="privacy_profile" 
                          name="privacy_profile" 
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                          defaultChecked 
                        />
                        <label 
                          htmlFor="privacy_profile" 
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="privacy_analytics" className="flex-grow">
                        Allow data for AI improvements
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="privacy_analytics" 
                          name="privacy_analytics" 
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                          defaultChecked 
                        />
                        <label 
                          htmlFor="privacy_analytics" 
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="primary">
                    Save Settings
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    These actions are irreversible. Please proceed with caution.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <Button 
                    variant="outline" 
                    className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20"
                  >
                    Delete Account
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-yellow-300 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900 dark:hover:bg-opacity-20"
                  >
                    Export My Data
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">My Profile</h1>
      
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-1">
        <div className={`grid grid-cols-2 md:grid-cols-4 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        } rounded-lg overflow-hidden`}>
          <button
            className={`py-4 px-4 flex justify-center items-center gap-2 transition-colors ${
              activeTab === 'account' 
                ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' 
                : ''
            }`}
            onClick={() => setActiveTab('account')}
          >
            <User size={18} />
            <span className="hidden md:inline">Account</span>
          </button>
          
          <button
            className={`py-4 px-4 flex justify-center items-center gap-2 transition-colors ${
              activeTab === 'wallet' 
                ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' 
                : ''
            }`}
            onClick={() => setActiveTab('wallet')}
          >
            <Wallet size={18} />
            <span className="hidden md:inline">Wallet</span>
          </button>
          
          <button
            className={`py-4 px-4 flex justify-center items-center gap-2 transition-colors ${
              activeTab === 'history' 
                ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' 
                : ''
            }`}
            onClick={() => setActiveTab('history')}
          >
            <FileText size={18} />
            <span className="hidden md:inline">History</span>
          </button>
          
          <button
            className={`py-4 px-4 flex justify-center items-center gap-2 transition-colors ${
              activeTab === 'settings' 
                ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' 
                : ''
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span className="hidden md:inline">Settings</span>
          </button>
        </div>
      </div>
      
      {renderTabContent()}
    </div>
  );
};

export default ProfilePage;