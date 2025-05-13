import React from 'react';
import { format } from 'date-fns';
import { Package, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';

interface AcceptedDonation {
  id: string;
  name: string;
  type: string;
  description: string;
  quantity: number;
  location: string;
  donorName: string;
  datePosted: string;
  expiryDate?: string;
  status: string;
  urgency: string;
  matchScore: number;
  acceptedDate: string;
}

const AcceptedDonations: React.FC = () => {
  const { theme } = useTheme();
  
  // Get accepted donations from local storage
  const acceptedDonations: AcceptedDonation[] = JSON.parse(localStorage.getItem('acceptedDonations') || '[]');
  
  if (acceptedDonations.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No accepted donations yet</p>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {acceptedDonations.map((donation) => (
        <Card key={donation.id}>
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Package size={24} className="text-blue-500" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold">{donation.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                }`}>
                  <CheckCircle size={12} className="inline mr-1" />
                  Accepted
                </span>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {donation.description}
              </p>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <Package size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm">{donation.quantity} items</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm">{donation.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm">
                    Accepted: {format(new Date(donation.acceptedDate), 'MMM d, yyyy')}
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
              
              <div className="mt-4 flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>
                  {donation.matchScore}% Match
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Donor: {donation.donorName}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AcceptedDonations;