import React from 'react';
import { OrderItem } from '@/types';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  user?: {
    name: string;
    address: string;
  };
}

const OrderSummaryItem: React.FC<{ item: OrderItem }> = ({ item }) => (
  <div className="flex items-center gap-4 py-2">
    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
      <img src="/api/placeholder/48/48" alt={item.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">×{item.quantity}</span>
        <span className="font-medium">{item.name}</span>
      </div>
    </div>
    <span className="font-medium">${item.price}</span>
  </div>
);

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, user }) => {
  const calculateTotal = (items: OrderItem[]): number => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  const deliveryFee = 0;
  const total = calculateTotal(orderItems);
  const [persons, setPersons] = React.useState(2);

  const handleIncrementPersons = () => {
    setPersons(prev => prev + 1);
  };

  const handleDecrementPersons = () => {
    setPersons(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg p-6">
      {/* User Info */}
      {user && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img src="/api/placeholder/32/32" alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-medium text-sm">{user.name}</h3>
            <p className="text-gray-500 text-xs">{user.address}</p>
          </div>
        </div>
      )}

      {/* Order Title */}
      <h2 className="font-medium text-lg mb-4">My order</h2>

      {/* Order Items */}
      <div className="space-y-3 mb-4">
        {orderItems.map((item) => (
          <OrderSummaryItem key={item.id} item={item} />
        ))}
      </div>

      {/* Order Details */}
      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-gray-500">
          <span>Delivery</span>
          <span>${deliveryFee}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Persons:</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleDecrementPersons}
                className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span>{persons}</span>
              <button 
                onClick={handleIncrementPersons}
                className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
          <span className="font-medium">Total: ${total}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img src="/api/placeholder/32/32" alt="Mastercard" className="w-full h-full object-contain" />
            </div>
            <span className="text-sm">•••• 8973</span>
          </div>
          <button className="text-sm text-gray-500">Change</button>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-pink-500 text-white rounded-xl py-3 font-medium hover:bg-pink-600 transition-colors">
          Submit order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;