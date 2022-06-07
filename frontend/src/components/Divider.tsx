import React from 'react';
import DividerProps from '../models/components/DividerProps';
import './styles/Divider.css';

const Divider: React.FC<DividerProps> = ({ vertical = false, margin = false, children }) => {
  return (
    <div className={`divider ${vertical ? 'vertical' : 'horizontal'} ${margin ? 'margin' : ''}`}>
      <span>{children}</span>
    </div>
  );
};

export default Divider;
