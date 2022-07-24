import React from 'react';
import ButtonProps from '../types/components/ButtonProps';
import './styles/Button.css';

const Button: React.FC<ButtonProps> = ({
  classes,
  children,
  type = 'button',
  disabled = false,
  onClick
}) => {
  return (
    <button
      className={`button_container ${classes}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

// classes:
// rounding: rounded, circle
// sizes: small, medium, large
// colors: white, orange, red, blue
// types: icon, text
