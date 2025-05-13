import React, { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  footer?: ReactNode;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  badge,
  badgeColor = 'blue',
  footer,
  onClick,
  hover = false,
}) => {
  const { theme } = useTheme();
  
  const badgeColors = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  };
  
  return (
    <div 
      className={`rounded-lg overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700 shadow-md' 
          : 'bg-white border border-gray-200 shadow'
      } ${hover ? 'transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg' : ''} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {(title || subtitle || badge) && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              {title && <h3 className="text-lg font-semibold">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
            </div>
            {badge && (
              <span className={`text-xs px-2 py-1 rounded-full ${badgeColors[badgeColor]}`}>
                {badge}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className={`p-4 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;