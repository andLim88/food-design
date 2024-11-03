import React, { useState } from 'react';
import { OrderItem } from '@/types';
import SuccessModal from './SuccessModal';
import Icon from './Icon';
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  user?: {
    name: string;
    address: string;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, setOrderItems, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [persons, setPersons] = useState(2);
  const [selectedCard, setSelectedCard] = useState('Mastercard •••• 8973'); // Example card info

  const calculateTotal = (items: OrderItem[]): number => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  const handleOrderSubmit = () => {
    setOrderItems([]); // Reset the order items
    setIsModalOpen(true); // Show success modal
  };

  const handleCardChange = () => {
    // This function could open a modal or redirect to a payment method selection page
    alert('Open payment method selection');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* User Info */}
      {user && (
        <div className="flex items-center gap-5 justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon icon={faUser} className='text-pink-500' />
            <h3 className="font-medium text-sm">{user.name}</h3>
          </div>
          <div className="flex w-1/2 gap-2">
          <Icon icon={faUser} className='text-pink-500 mt-2' />
          <p className="text-wrap">{user.address}</p>
          </div>
        </div>
      )}

      <h2 className="font-medium text-lg mb-4">My order</h2>
      <div className="space-y-3 mb-4">
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-2">
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <span className="font-medium">{item.name}</span>
            </div>
            <span className="font-medium">${item.price}</span>
          </div>
        ))}
      </div>

      {/* Order Details */}
      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-gray-500">
          <span>Delivery</span>
          <span>$0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Total: ${calculateTotal(orderItems)}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img src="/images/mastercard.png" alt="Payment Method" className="w-full h-full object-contain" />
          </div>
          <span className="text-sm">{selectedCard}</span>
        </div>
        <button onClick={handleCardChange} className="text-sm text-gray-500">
          Change
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleOrderSubmit}
        className="w-full bg-pink-500 text-white rounded-xl py-3 font-medium hover:bg-pink-600 transition-colors mt-6"
      >
        Submit Order
      </button>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="Your order has been placed successfully!"
      />
    </div>
  );
};

export default OrderSummary;
