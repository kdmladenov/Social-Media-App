import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/ButtonNav.css';
import ButtonNavProps from '../models/components/ButtonNavProps';
import TabType from '../models/TabType';
import Tooltip from './Tooltip';
import buttonNavMap from '../inputs/buttonNavMap';

const ButtonNav: React.FC<ButtonNavProps> = ({ currentPath, screen }) => {
  const navigate = useNavigate();

  const buttonNav: {
    [key: string]: TabType[];
  } = buttonNavMap;


  return (
    <nav className={`button_nav ${screen}`}>
      {buttonNav[screen].map((tab: TabType, index: number) => (
        <button
          className={`tab ${currentPath === tab.path ? 'active' : ''}`}
          onClick={() => navigate(tab.path)}
          key={index}
          disabled={tab.disabled}
        >
          <Tooltip direction="bottom" text={tab.name}>
            <i className={tab.icon} />
          </Tooltip>
        </button>
      ))}
    </nav>
  );
};

export default ButtonNav;
