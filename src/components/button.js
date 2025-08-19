import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-bold focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-indigo-800 text-white hover:from-indigo-700 hover:to-indigo-900 focus:ring-indigo-500/50',
    secondary: 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400 focus:ring-gray-400/50',
    outline: 'bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500/30'
  };
  
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
    xl: 'py-5 px-10 text-xl'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-70 cursor-not-allowed hover:transform-none' : '';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;