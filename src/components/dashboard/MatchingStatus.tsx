import React from 'react';
import { ArrowRight, AlertCircle, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

interface MatchProps {
  id: string;
  status: 'pending' | 'matched' | 'completed' | 'declined';
  donationType: string;
  donationName: string;
  recipientName: string;
  recipientType: string;
  matchScore: number;
  date: string;
  urgency: 'low' | 'medium' | 'high';
}

const getStatusBadge = (status: string, theme: 'light' | 'dark') => {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
  
  switch (status) {
    case 'pending':
      return (
        <div className={`${baseClasses} ${theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'} flex items-center`}>
          <Clock size={12} className="mr-1" />
          Pending
        </div>
      );
    case 'matched':
      return (
        <div className={`${baseClasses} ${theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'} flex items-center`}>
          <CheckCircle2 size={12} className="mr-1" />
          Matched
        </div>
      );
    case 'completed':
      return (
        <div className={`${baseClasses} ${theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'} flex items-center`}>
          <CheckCircle2 size={12} className="mr-1" />
          Completed
        </div>
      );
    case 'declined':
      return (
        <div className={`${baseClasses} ${theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'} flex items-center`}>
          <AlertCircle size={12} className="mr-1" />
          Declined
        </div>
      );
    default:
      return null;
  }
};

const getUrgencyBadge = (urgency: string, theme: 'light' | 'dark') => {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
  
  switch (urgency) {
    case 'low':
      return (
        <div className={`${baseClasses} ${theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
          Low
        </div>
      );
    case 'medium':
      return (
        <div className={`${baseClasses} ${theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>
          Medium
        </div>
      );
    case 'high':
      return (
        <div className={`${baseClasses} ${theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`}>
          High
        </div>
      );
    default:
      return null;
  }
};

const MatchRow: React.FC<{ match: MatchProps }> = ({ match }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${
      theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
    } p-4 rounded-lg transition-colors cursor-pointer`}>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-3">
          <div className="font-medium">{match.donationName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{match.donationType}</div>
        </div>
        
        <div className="col-span-3 flex justify-center items-center">
          <ArrowRight size={16} className="text-gray-400" />
        </div>
        
        <div className="col-span-3">
          <div className="font-medium">{match.recipientName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{match.recipientType}</div>
        </div>
        
        <div className="col-span-1 text-center">
          <div className={`inline-block px-2 py-1 rounded-full font-medium ${
            match.matchScore > 80 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
              : match.matchScore > 60 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}>
            {match.matchScore}%
          </div>
        </div>
        
        <div className="col-span-1 text-center">
          {getUrgencyBadge(match.urgency, theme)}
        </div>
        
        <div className="col-span-1 text-center">
          {getStatusBadge(match.status, theme)}
        </div>
      </div>
    </div>
  );
};

const MatchingStatus: React.FC = () => {
  const { theme } = useTheme();
  
  // Get all donations from localStorage and sort by date
  const acceptedDonations = JSON.parse(localStorage.getItem('acceptedDonations') || '[]')
    .sort((a, b) => new Date(b.acceptedDate).getTime() - new Date(a.acceptedDate).getTime())
    .slice(0, 4) // Show only the 4 most recent donations
    .map(donation => ({
      id: donation.id,
      status: donation.status || 'matched',
      donationType: donation.type,
      donationName: donation.name,
      recipientName: donation.recipientName || 'Pending Assignment',
      recipientType: donation.recipientType || 'Pending',
      matchScore: donation.matchScore || 85,
      date: donation.acceptedDate,
      urgency: donation.urgency || 'medium'
    }));
  
  return (
    <Card 
      title="AI Matching Status"
      subtitle="Recent donations and their AI-recommended matches"
      footer={
        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            rightIcon={<ChevronRight size={16} />}
          >
            View All Matches
          </Button>
        </div>
      }
    >
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {acceptedDonations.length > 0 ? (
          acceptedDonations.map((match) => (
            <MatchRow key={match.id} match={match} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No donations have been made yet
          </div>
        )}
      </div>
    </Card>
  );
};

export default MatchingStatus;