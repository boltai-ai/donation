import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, Package2, Tag, Calendar, ChevronDown, ChevronUp, ChevronRight, Plus } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';
import { createClient } from '@supabase/supabase-js';
import MapSelector from '../ui/MapSelector';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Reserved';
  priority: 'Low' | 'Medium' | 'High';
  expiry_date?: string;
  added_date: string;
}

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (item: Omit<InventoryItem, 'id'>) => Promise<void>;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onAdd }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 1,
    status: 'In Stock' as const,
    priority: 'Medium' as const,
    expiry_date: '',
  });
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>([51.505, -0.09]);
  const [locationAddress, setLocationAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onAdd({
        ...formData,
        added_date: new Date().toISOString(),
      });
      onClose();
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = async (lat: number, lng: number) => {
    setSelectedLocation([lat, lng]);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const address = data.display_name || `${lat}, ${lng}`;
      setLocationAddress(address);
    } catch (error) {
      console.error('Error getting address:', error);
      setLocationAddress(`${lat}, ${lng}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              className={`w-full rounded-lg border p-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              required
              className={`w-full rounded-lg border p-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Medical">Medical</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              required
              min="1"
              className={`w-full rounded-lg border p-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}
              value={formData.quantity}
              onChange={e => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              required
              className={`w-full rounded-lg border p-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}
              value={formData.status}
              onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              required
              className={`w-full rounded-lg border p-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}
              value={formData.priority}
              onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="date"
              className={`w-full rounded-lg border p-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}
              value={formData.expiry_date}
              onChange={e => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <MapSelector
              initialPosition={selectedLocation}
              onLocationSelect={handleLocationSelect}
            />
            <div className={`mt-2 p-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-gray-100'
            }`}>
              <p className="text-sm">Selected Location: {locationAddress}</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              isLoading={isLoading}
            >
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InventoryTable: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof InventoryItem | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*');

      if (error) throw error;

      setInventory(data || []);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setError('Failed to load inventory items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (field: keyof InventoryItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const addItem = async (item: Omit<InventoryItem, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .insert([item])
        .select()
        .single();

      if (error) throw error;

      setInventory(prev => [...prev, data]);
    } catch (err) {
      console.error('Error adding inventory item:', err);
      throw err;
    }
  };

  const sortedItems = [...inventory].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const filteredItems = sortedItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
        }`}>{status}</span>;
      case 'Low Stock':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
        }`}>{status}</span>;
      case 'Out of Stock':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
        }`}>{status}</span>;
      case 'Reserved':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
        }`}>{status}</span>;
      default:
        return status;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
        }`}>{priority}</span>;
      case 'Medium':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
        }`}>{priority}</span>;
      case 'Low':
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
        }`}>{priority}</span>;
      default:
        return priority;
    }
  };

  const renderSortIcon = (field: keyof InventoryItem) => {
    if (sortField !== field) return <ArrowUpDown size={14} />;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-red-500 dark:text-red-400">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setError(null);
              fetchInventory();
            }}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search inventory items..."
            className={`pl-10 pr-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white focus:ring-blue-600 border-gray-600' 
                : 'bg-gray-100 text-gray-800 focus:ring-blue-500 border-gray-300'
            } border`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button
          variant="outline"
          leftIcon={<Filter size={16} />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
          {showFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </Button>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          Add Item
        </Button>
      </div>

      {showFilters && (
        <div className={`p-4 mb-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className={`w-full rounded-lg ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-white text-gray-800 border-gray-300'
              } border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option value="">All Categories</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Medical">Medical</option>
                <option value="Education">Education</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className={`w-full rounded-lg ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-white text-gray-800 border-gray-300'
              } border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option value="">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select className={`w-full rounded-lg ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-white text-gray-800 border-gray-300'
              } border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" className="mr-2">
              Reset
            </Button>
            <Button variant="primary" size="sm">
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y ${
          theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
        }`}>
          <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <button 
                  className="flex items-center text-left" 
                  onClick={() => handleSort('name')}
                >
                  Item {renderSortIcon('name')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <button 
                  className="flex items-center text-left" 
                  onClick={() => handleSort('category')}
                >
                  Category {renderSortIcon('category')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <button 
                  className="flex items-center text-left" 
                  onClick={() => handleSort('quantity')}
                >
                  Quantity {renderSortIcon('quantity')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <button 
                  className="flex items-center text-left" 
                  onClick={() => handleSort('status')}
                >
                  Status {renderSortIcon('status')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                <button 
                  className="flex items-center text-left" 
                  onClick={() => handleSort('priority')}
                >
                  Priority {renderSortIcon('priority')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
          }`}>
            {filteredItems.map((item) => (
              <tr key={item.id} className={`${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              } transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                      <Package2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Tag size={16} className="mr-2 text-gray-400" />
                    {item.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{item.quantity}</div>
                  {item.expiry_date && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Expires: {item.expiry_date}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPriorityBadge(item.priority)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    rightIcon={<ChevronRight size={16} />}
                    onClick={() => {
                      // Open item details/edit modal
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredItems.length} of {inventory.length} items
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={addItem}
        />
      )}
    </Card>
  );
};

export default InventoryTable;