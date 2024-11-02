import React from 'react';
import { Star } from 'lucide-react';
import { Restaurant } from './types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onSelect }) => (
  <div
    className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
    onClick={() => onSelect(restaurant)}
  >
    <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{restaurant.name}</h3>
        <span className="text-lg font-semibold">${restaurant.price}</span>
      </div>
      <p className="text-gray-500 text-sm mb-2">{restaurant.location}</p>
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm">{restaurant.rating}</span>
        <span className="text-gray-500 text-sm">({restaurant.reviews} reviews)</span>
      </div>
    </div>
  </div>
);

export default RestaurantCard;