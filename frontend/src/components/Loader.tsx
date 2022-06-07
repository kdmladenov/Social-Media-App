import React from 'react';
import './styles/Loader.css';
import Tooltip from './Tooltip';

const Loader: React.FC = () => {
  return (
    <div className="spinner">
      <Tooltip direction="top" text="Loading...">
        <i className="fa fa-spinner" />
      </Tooltip>
    </div>
  );
};

export default Loader;
