import React from 'react';
import './styles/Blur.css'

const Blur = ({ top = 'auto', bottom = 'auto', left = 'auto', right = 'auto' }) => {
  return (
    <div
      className="blur"
      style={{ top: `${top}`, bottom: `${bottom}`, left: `${left}`, right: `${right}` }}
    />
  );
};

export default Blur;
