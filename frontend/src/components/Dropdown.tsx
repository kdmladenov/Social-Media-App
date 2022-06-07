import React, { LegacyRef, useState } from 'react';

import './styles/DropDown.css';
import useOutsideClick from '../hooks/useOutsideClick';

import Tooltip from './Tooltip';
import DropDownProps from '../models/components/DropDownProps';

const DropDown: React.FC<DropDownProps> = ({ button, tooltipText, userInfo, children }) => {
  const [showBody, setShowBody] = useState(false);

  let nodeRef: LegacyRef<HTMLDivElement> = useOutsideClick(() => setShowBody(false));

  return (
    <div className="dropdown" ref={nodeRef}>
      <div onClick={() => setShowBody(!showBody)}>
        <Tooltip text={tooltipText}>{button}</Tooltip>
      </div>

      <div
        onClick={() => userInfo?.token && setShowBody(false)}
        className={`body ${showBody ? 'show' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
