import React from 'react';
import DonationForm from '../components/donation/DonationForm';

const DonationPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Make a Donation</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
        Your donations make a real difference. Our AI system ensures your contribution reaches those who need it most, and our blockchain technology provides complete transparency.
      </p>
      
      <DonationForm />
    </div>
  );
};

export default DonationPage;