"use client"
import React, { useState } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import mockData from './data/mockData.json';
import { Restaurant, OrderItem, CategoryButton } from './types';
import Sidebar from './components/Sidebar';
import RestaurantCard from './components/RestaurantCard';
import OrderSummary from './components/OrderSummary';
import FoodModal from './components/FoodModal';
import Banner from './components/Banner';

const FoodDelivery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFood, setSelectedFood] = useState<Restaurant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const categories: CategoryButton[] = [
    { id: '1', label: 'Surprise me!', icon: <ShoppingCart className="w-4 h-4" /> },
    ...mockData.categories.slice(1)
  ];
  const userData = {
    name: mockData.user.name,
    address: mockData.user.address
  };

  const CategoryButton: React.FC<{ category: CategoryButton }> = ({ category }) => (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
        category.id === selectedCategory ? 'bg-pink-100 text-pink-500' : 'border border-gray-200'
      }`}
      onClick={() => setSelectedCategory(category.id)}
    >
      {category.icon}
      {category.label}
    </button>
  );

  const handleOrderSubmit = () => {
    if (selectedFood) {
      const existingItem = orderItems.find((item) => item.id === selectedFood.id);
      if (existingItem) {
        setOrderItems(
          orderItems.map((item) =>
            item.id === selectedFood.id
              ? { ...item, quantity: item.quantity + quantity, price: item.price + quantity * selectedFood.price }
              : item
          )
        );
      } else {
        setOrderItems([
          ...orderItems,
          {
            id: selectedFood.id,
            name: selectedFood.name,
            quantity,
            price: quantity * selectedFood.price,
          },
        ]);
      }
      setSelectedFood(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          {/* Promo Banner */}
          <Banner/>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Restaurants</h2>
            <p className="text-black mb-4">Select category you'd like to see from</p>
            <div className="flex flex-wrap gap-4 mb-6">
              {categories.map((category) => (
                <CategoryButton key={category.id} category={category} />
              ))}
            </div>

            {/* Restaurant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.restaurants
                .filter((restaurant) =>
                  restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (restaurant.id === selectedCategory || selectedCategory === '1')
                )
                .map((restaurant) => (
                  <RestaurantCard 
                    key={restaurant.id} 
                    restaurant={restaurant}
                    onSelect={(restaurant) => {
                      setSelectedFood(restaurant);
                      setQuantity(1);
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <OrderSummary orderItems={orderItems}    user={userData} />

      <FoodModal
        food={selectedFood}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onClose={() => setSelectedFood(null)}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
};

export default FoodDelivery;