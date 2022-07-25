import React from 'react';

interface ButtonProps {
  classes?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export default ButtonProps;
