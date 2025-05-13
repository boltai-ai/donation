import React from 'react';
import { Heart } from 'lucide-react';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 24 }) => {
  return (
    <div 
      className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-400"
      style={{ width: size, height: size }}
    >
      <Heart 
        size={size * 0.6} 
        className="text-white" 
        fill="white"
      />
    </div>
  );
};

export default Logo;