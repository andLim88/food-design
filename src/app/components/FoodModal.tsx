import React from 'react';
import { Restaurant } from '@/types';

interface FoodModalProps {
  food: Restaurant | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const FoodModal: React.FC<FoodModalProps> = ({ food, quantity, onQuantityChange, onClose, onSubmit }) => {
  if (!food) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="font-semibold text-lg">{food.name}</h2>
        <img src={food.image} alt={food.name} className="w-full h-48 object-cover rounded-lg mb-4" />
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold">Price: ${food.price}</span>
          <span className="text-sm text-gray-500">{food.location}</span>
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-2">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            className="border border-gray-300 rounded-md w-16 text-center"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="text-gray-500">Close</button>
          <button onClick={onSubmit} className="bg-pink-500 text-white rounded-lg px-4 py-2">Add to Order</button>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;