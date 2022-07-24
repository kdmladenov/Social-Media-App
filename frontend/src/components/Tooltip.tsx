import React from 'react';
import TooltipProps from '../types/components/TooltipProps';
import './styles/Tooltip.css';

const Tooltip: React.FC<TooltipProps> = ({ text, direction, children }) => {
  return (
    <div className="tooltip">
      {children}
      <div className={`tooltip_body ${direction ? direction : 'bottom'}`}>{text}</div>
    </div>
  );
};

export default Tooltip;
