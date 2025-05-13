import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Package, MapPin, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface Donation {
  id: string;
  name: string;
  type: string;
  description: string;
  quantity: number;
  location: string;
  donorName: string;
  datePosted: string;
  expiryDate?: string;
  status: 'available' | 'pending' | 'accepted' | 'declined';
  urgency: 'low' | 'medium' | 'high';
  matchScore: number;
  category: string;
  amount?: number;
  contactEmail: string;
  contactPhone?: string;
  pickupAvailable?: boolean;
  deliveryAvailable?: boolean;
}

const AvailableDonations: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedDonation, setSelectedDonation] = useState<string | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  
  useEffect(() => {
    // Load available donations from localStorage
    const availableDonations = JSON.parse(localStorage.getItem('availableDonations') || '[]');
    setDonations(availableDonations.filter((d: Donation) => d.status === 'available'));
  }, []);

  const handleAccept = async (donation: Donation) => {
    try {
      // Update donation status
      const updatedDonation = {
        ...donation,
        status: 'accepted',
        acceptedDate: new Date().toISOString(),
      };
      
      // Update available donations
      const availableDonations = JSON.parse(localStorage.getItem('availableDonations') || '[]');
      const updatedAvailableDonations = availableDonations.map((d: Donation) => 
        d.id === donation.id ? updatedDonation : d
      );
      localStorage.setItem('availableDonations', JSON.stringify(updatedAvailableDonations));
      
      // Add to accepted donations
      const acceptedDonations = JSON.parse(localStorage.getItem('acceptedDonations') || '[]');
      acceptedDonations.push(updatedDonation);
      localStorage.setItem('acceptedDonations', JSON.stringify(acceptedDonations));
      
      // Update local state
      setDonations(donations.filter(d => d.id !== donation.id));
      
      // Navigate to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error accepting donation:', error);
    } finally {
      setSelectedDonation(null);
    }
  };

  const handleDecline = async (donationId: string) => {
    try {
      // Update donation status in available donations
      const availableDonations = JSON.parse(localStorage.getItem('availableDonations') || '[]');
      const updatedAvailableDonations = availableDonations.map((d: Donation) => 
        d.id === donationId ? { ...d, status: 'declined' } : d
      );
      localStorage.setItem('availableDonations', JSON.stringify(updatedAvailableDonations));
      
      // Update local state
      setDonations(donations.filter(d => d.id !== donationId));
    } catch (error) {
      console.error('Error declining donation:', error);
    } finally {
      setSelectedDonation(null);
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    
    switch (urgency) {
      case 'high':
        return <span className={`${baseClasses} ${
          theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
        }`}>High Priority</span>;
      case 'medium':
        return <span className={`${baseClasses} ${
          theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
        }`}>Medium Priority</span>;
      case 'low':
        return <span className={`${baseClasses} ${
          theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
        }`}>Low Priority</span>;
      default:
        return null;
    }
  };

  if (donations.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Available Donations</h3>
          <p className="text-gray-500 dark:text-gray-400">
            There are currently no available donations. Please check back later.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {donations.map((donation) => (
        <Card 
          key={donation.id}
          className={`transition-transform duration-200 ${
            selectedDonation === donation.id ? 'scale-[1.02]' : ''
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Package size={24} className="text-blue-500" />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{donation.name}</h3>
                    {getUrgencyBadge(donation.urgency)}
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {donation.description}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {donation.type === 'item' && (
                      <div className="flex items-center">
                        <Package size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">{donation.quantity} items</span>
                      </div>
                    )}
                    
                    {donation.type === 'money' && (
                      <div className="flex items-center">
                        <Package size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">${donation.amount}</span>
                      </div>
                    )}
                    
                    {donation.location && (
                      <div className="flex items-center">
                        <MapPin size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">{donation.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">
                        {format(new Date(donation.datePosted), 'MMM d, yyyy')}
                      </span>
                    </div>
                    
                    {donation.expiryDate && (
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">
                          Expires: {format(new Date(donation.expiryDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>Category: {donation.category}</p>
                    {donation.pickupAvailable && <p>✓ Available for pickup</p>}
                    {donation.deliveryAvailable && <p>✓ Delivery available</p>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
              }`}>
                {donation.matchScore}% Match
              </div>
              
              <div className="mt-4 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900 dark:hover:bg-opacity-20"
                  leftIcon={<XCircle size={16} />}
                  onClick={() => handleDecline(donation.id)}
                >
                  Decline
                </Button>
                
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<CheckCircle size={16} />}
                  onClick={() => handleAccept(donation)}
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AvailableDonations;