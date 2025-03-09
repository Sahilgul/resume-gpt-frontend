import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  hoverable = false,
  bordered = true,
  shadow = 'md',
  onHeaderClick = null
}) => {
  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  const baseClasses = 'bg-white rounded-lg overflow-hidden';
  const hoverClasses = hoverable ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg' : '';
  const borderClasses = bordered ? 'border border-gray-200' : '';
  
  return (
    <div className={`${baseClasses} ${shadowClasses[shadow]} ${hoverClasses} ${borderClasses} ${className}`}>
      {title && (
        <div 
          className={`px-6 py-4 border-b border-gray-200 ${headerClassName} ${onHeaderClick ? 'cursor-pointer' : ''}`}
          onClick={onHeaderClick}
        >
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div className={`px-6 py-4 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`px-6 py-4 border-t border-gray-200 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;