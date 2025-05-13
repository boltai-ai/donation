import React from 'react';
import InventoryTable from '../components/inventory/InventoryTable';

const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Inventory Management</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
        Track all donations in real-time with our AI-powered inventory management system. Categorize items, monitor stock levels, and optimize storage and distribution.
      </p>
      
      <InventoryTable />
    </div>
  );
};

export default InventoryPage;