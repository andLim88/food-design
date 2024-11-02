import React from 'react';
import { Home, Heart, PlayCircle, Image, Calendar } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 h-full w-16 bg-pink-500 flex flex-col items-center py-6 space-y-8">
      <Home className="text-white w-6 h-6" />
      <Heart className="text-white/70 w-6 h-6" />
      <PlayCircle className="text-white/70 w-6 h-6" />
      <Image className="text-white/70 w-6 h-6" />
      <Calendar className="text-white/70 w-6 h-6" />
    </div>
  );
};

export default Sidebar;