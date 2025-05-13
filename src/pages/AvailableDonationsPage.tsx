import React from 'react';
import AvailableDonations from '../components/donation/AvailableDonations';

const AvailableDonationsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Available Donations</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Review and accept donations that match your organization's needs. Our AI system has automatically matched these donations based on your profile and requirements.
        </p>
      </div>
      
      <AvailableDonations />
    </div>
  );
};

export default AvailableDonationsPage;