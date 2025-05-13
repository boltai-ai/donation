import React, { useState } from 'react';
import Button from '../ui/Button';
import { Package, Truck, DollarSign, Camera, Upload } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

type DonationType = 'item' | 'money' | 'service';

const DonationForm: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [donationType, setDonationType] = useState<DonationType>('item');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    quantity: 1,
    amount: 10,
    location: '',
    images: [] as File[],
    contactEmail: '',
    contactPhone: '',
    pickupAvailable: false,
    deliveryAvailable: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: [...Array.from(e.target.files)] });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create donation object
      const donation = {
        id: `DON-${Date.now()}`,
        type: donationType,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        quantity: formData.quantity,
        amount: formData.amount,
        location: formData.location,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        pickupAvailable: formData.pickupAvailable,
        deliveryAvailable: formData.deliveryAvailable,
        status: 'available',
        datePosted: new Date().toISOString(),
        donorName: 'Anonymous Donor', // In real app, this would come from auth context
        urgency: 'medium',
        matchScore: Math.floor(Math.random() * 15) + 85, // Mock AI matching score
      };

      // Get existing donations or initialize empty array
      const existingDonations = JSON.parse(localStorage.getItem('availableDonations') || '[]');
      
      // Add new donation
      localStorage.setItem('availableDonations', JSON.stringify([...existingDonations, donation]));
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        quantity: 1,
        amount: 10,
        location: '',
        images: [],
        contactEmail: '',
        contactPhone: '',
        pickupAvailable: false,
        deliveryAvailable: false,
      });
      
      alert('Donation submitted successfully! Our AI system will now match your donation with recipients.');
      navigate('/available-donations');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const donationTypeOptions = [
    { id: 'item', label: 'Donate Items', icon: Package },
    { id: 'money', label: 'Monetary Donation', icon: DollarSign },
    { id: 'service', label: 'Transport Services', icon: Truck },
  ];
  
  const formBackgroundColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const inputBackgroundColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
  const inputBorderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const inputTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const labelTextColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
  
  return (
    <div className={`${formBackgroundColor} rounded-lg shadow-md p-6 max-w-3xl mx-auto`}>
      <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        {donationTypeOptions.map(option => (
          <button
            key={option.id}
            type="button"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              donationType === option.id 
                ? 'bg-blue-600 text-white' 
                : theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setDonationType(option.id as DonationType)}
          >
            <option.icon size={20} className="mr-2" />
            {option.label}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Common fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={`block mb-2 text-sm font-medium ${labelTextColor}`}>
              {donationType === 'item' ? 'Item Name' : donationType === 'money' ? 'Campaign Name' : 'Service Name'}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full rounded-lg ${inputBackgroundColor} ${inputBorderColor} ${inputTextColor} border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder={donationType === 'item' ? 'e.g., Winter Clothes' : donationType === 'money' ? 'e.g., School Supplies Fund' : 'e.g., Local Delivery'}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className={`block mb-2 text-sm font-medium ${labelTextColor}`}>
              Category
            </label>
            <select
              id="category"
              name="category"
              className={`w-full rounded-lg ${inputBackgroundColor} ${inputBorderColor} ${inputTextColor} border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {donationType === 'item' && (
                <>
                  <option value="clothing">Clothing</option>
                  <option value="food">Food</option>
                  <option value="furniture">Furniture</option>
                  <option value="electronics">Electronics</option>
                  <option value="toys">Toys</option>
                  <option value="books">Books & Education</option>
                  <option value="medical">Medical Supplies</option>
                  <option value="other">Other</option>
                </>
              )}
              {donationType === 'money' && (
                <>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="housing">Housing</option>
                  <option value="food">Food Security</option>
                  <option value="disaster">Disaster Relief</option>
                  <option value="environment">Environment</option>
                  <option value="other">Other</option>
                </>
              )}
              {donationType === 'service' && (
                <>
                  <option value="transportation">Transportation</option>
                  <option value="storage">Storage</option>
                  <option value="delivery">Delivery</option>
                  <option value="professional">Professional Services</option>
                  <option value="other">Other</option>
                </>
              )}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className={`block mb-2 text-sm font-medium ${labelTextColor}`}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className={`w-full rounded-lg ${inputBackgroundColor} ${inputBorderColor} ${inputTextColor} border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Please provide details about your donation..."
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        
        {/* Item-specific fields */}
        {donationType === 'item' && (
          <>
            <div>
              <label htmlFor="quantity" className={`block mb-2 text-sm font-medium ${labelTextColor}`}>
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                className={`w-full rounded-lg ${inputBackgroundColor} ${inputBorderColor} ${inputTextColor} border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="images" className={`block mb-2 text-sm font-medium ${labelTextColor}`}>
                Upload Images (helps AI categorize the item)
              </label>
              <div className={`flex items-center justify-center w-full ${inputBackgroundColor} ${inputBorderColor} border-2 border-dashed rounded-lg p-6`}>
                <div className="flex flex-col items-center justify-center">
                  <Camera size={48} className="text-gray-400 mb-2" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG (MAX. 5MB per image)
                  </p>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    leftIcon={<Upload size={16} />}
                    onClick={() => document.getElementById('images')?.click()}
                  >
                    Select Files
                  </Button>
                </div>
              </div>
              {formData.images.length > 0 && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {formData.images.length} file(s) selected
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  id="pickupAvailable"
                  name="pickupAvailable"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={formData.pickupAvailable}
                  onChange={handleInputChange}
                />
                <label htmlFor="pickupAvailable" className={`ml-2 text-sm ${labelTextColor}`}>
                  Available for pickup
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="deliveryAvailable"
                  name="deliveryAvailable"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={formData.deliveryAvailable}
                  onChange={handleInputChange}
                />
                <label htmlFor="deliveryAvailable" className={`ml-2 text-sm ${labelTextColor}`}>
                  Can deliver
                </label>
              </div>
            </div>
          </>
        )}
        
        {/* Money-specific fields */}
        {donationType === 'money' && (
          <div>
            <label htmlFor="amount" className={`block mb-2 text-sm font-medium ${labelTextColor}`}>
              Donation Amount ($)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign size={16} className="text-gray-500" />
              </div>
              <input
                type="number"
                id="amount"
                name="amount"
                min="1"
                step="0.01"
                className={`w-full rounded-lg ${inputBackgroundColor} ${inputBorderColor} ${inputTextColor} border pl-10 p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              All donations are processed securely through our blockchain-based system for complete transparency.
            </p>
          </div>
        )}
        
        {/* Service-specific fields */}
        {donationType === 'service' && (
          <div>
            <label htmlFor="location" className={`block mb-2 text-sm font-medium ${labelTextColor}`}>
              Service Area
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className={`w-full rounded-lg ${inputBackgroundColor} ${inputBorderColor} ${inputTextColor} border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="e.g., Downtown, Within 5 miles of 90210"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        
        {/* Common contact info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contactEmail" className={`block mb-2 text-sm font-medium ${labelTextColor}`}>
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              className={`w-full rounded-lg ${inputBackgroundColor} ${inputBorderColor} ${inputTextColor} border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="email@example.com"
              value={formData.contactEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="contactPhone" className={`block mb-2 text-sm font-medium ${labelTextColor}`}>
              Contact Phone (optional)
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              className={`w-full rounded-lg ${inputBackgroundColor} ${inputBorderColor} ${inputTextColor} border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="(123) 456-7890"
              value={formData.contactPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
          >
            {donationType === 'item' ? 'Donate Item' : donationType === 'money' ? 'Donate Funds' : 'Offer Service'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;