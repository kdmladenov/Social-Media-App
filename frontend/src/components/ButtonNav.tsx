import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ButtonNav.css';
import ButtonNavProps from '../types/components/ButtonNavProps';
import TabType from '../types/TabType';
import Tooltip from './Tooltip';
import buttonNavMap from '../data/inputs/buttonNavMap';

const ButtonNav: React.FC<ButtonNavProps> = ({ currentPath, screen, userId }) => {
  const navigate = useNavigate();

  const buttonsMap = buttonNavMap(userId, screen);

  return (
    <nav className={`button_nav ${screen}`}>
      {buttonsMap.map((tab: TabType, index: number) => (
        <button
          className={`tab ${
            currentPath.split('/')[currentPath.split('/').length - 1] ===
            tab.path.split('/')[tab.path.split('/').length - 1]
              ? 'active'
              : ''
          }`}
          onClick={() => navigate(tab.path)}
          key={index}
          disabled={tab.disabled}
        >
          <Tooltip direction="bottom" text={tab.name}>
            {tab.icon ? <i className={tab.icon} /> : <span>{tab.name}</span>}
          </Tooltip>
        </button>
      ))}
    </nav>
  );
};

export default ButtonNav;
