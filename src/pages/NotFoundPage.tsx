import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Search size={64} className="text-gray-300 dark:text-gray-600 mb-6" />
      
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the home page.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;