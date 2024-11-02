import React from 'react';
import { CategoryButton } from '../types';

interface Props {
  category: CategoryButton;
  selectedCategory: string;
  onSelect: (id: string) => void;
}

const CategoryButton: React.FC<Props> = ({ category, selectedCategory, onSelect }) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-full ${
      category.id === selectedCategory ? 'bg-pink-100 text-pink-500' : 'border border-gray-200'
    }`}
    onClick={() => onSelect(category.id)}
  >
    {category.icon}
    {category.label}
  </button>
);

export default CategoryButton;
