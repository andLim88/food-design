"use client";
import React, { useState } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faIceCream, faPizzaSlice, faHamburger, faBowlRice, faFire } from '@fortawesome/free-solid-svg-icons';
import mockData from './data/mockData.json';
import { Restaurant, OrderItem, CategoryButton as CategoryType } from './types';
import Sidebar from './components/Sidebar';
import RestaurantCard from './components/RestaurantCard';
import OrderSummary from './components/OrderSummary';
import FoodModal from './components/FoodModal';
import Banner from './components/Banner';

const iconMap: { [key: string]: any } = {
  faStar,
  faIceCream,
  faPizzaSlice,
  faHamburger,
  faBowlRice,
  faFire,
};

const FoodDelivery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFood, setSelectedFood] = useState<Restaurant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

 
  const categories: CategoryType[] = mockData.categories.map((category) => ({
    ...category,
    icon: <FontAwesomeIcon icon={iconMap[category.icon]} className="w-4 h-4" />
  }));

  const userData = {
    name: mockData.user.name,
    address: mockData.user.address,
  };

  const CategoryButton: React.FC<{ category: CategoryType }> = ({ category }) => (
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
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  price: item.price + quantity * selectedFood.price,
                }
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
            image: selectedFood.image,
          },
        ]);
      }
      setSelectedFood(null);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
    
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 lg:ml-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
   
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
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

          <Banner />

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-4">Restaurants</h2>
            <p className="text-black mb-4">Select category you'd like to see from</p>
            <div className="flex flex-wrap gap-4 mb-6">
              {categories.map((category) => (
                <CategoryButton key={category.id} category={category} />
              ))}
            </div>

            {/* Restaurant Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.restaurants
                .filter(
                  (restaurant) =>
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

   
      <div className="hidden lg:block">
        <OrderSummary orderItems={orderItems} setOrderItems={setOrderItems} user={userData} />
      </div>

      
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
