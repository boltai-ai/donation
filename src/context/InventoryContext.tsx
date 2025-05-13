import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Reserved';
  priority: 'Low' | 'Medium' | 'High';
  expiryDate?: string;
  addedDate: string;
  location: string;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  removeItem: (id: string) => void;
  getInventoryStats: () => {
    totalItems: number;
    lowStock: number;
    outOfStock: number;
    expiringItems: number;
  };
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const savedInventory = localStorage.getItem('inventory');
    return savedInventory ? JSON.parse(savedInventory) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const addItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem = {
      ...item,
      id: uuidv4(),
    };
    setInventory(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const getInventoryStats = () => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return {
      totalItems: inventory.reduce((sum, item) => sum + item.quantity, 0),
      lowStock: inventory.filter(item => item.status === 'Low Stock').length,
      outOfStock: inventory.filter(item => item.status === 'Out of Stock').length,
      expiringItems: inventory.filter(item => 
        item.expiryDate && new Date(item.expiryDate) <= thirtyDaysFromNow
      ).length,
    };
  };

  return (
    <InventoryContext.Provider value={{
      inventory,
      addItem,
      updateItem,
      removeItem,
      getInventoryStats,
    }}>
      {children}
    </InventoryContext.Provider>
  );
};