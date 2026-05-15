import React from 'react';

const Font = ({ 
  family = 'dm', 
  children, 
  color, 
  size, 
  weight, 
  style = {}, 
  className = "", 
  as: Component = "span" 
}) => {
  const families = {
    dm: "'DM Sans', sans-serif",
    oswald: "'Oswald', sans-serif",
    inter: "'Inter', sans-serif"
  };

  const combinedStyle = {
    fontFamily: families[family] || families.dm,
    color: color || 'inherit',
    fontSize: size || 'inherit',
    fontWeight: weight || 'inherit',
    ...style
  };

  return (
    <Component style={combinedStyle} className={className}>
      {children}
    </Component>
  );
};

export default Font;
