import React, { LegacyRef, useState } from 'react';

import './styles/DropDown.css';
import useOutsideClick from '../hooks/useOutsideClick';

import Tooltip from './Tooltip';
import DropDownProps from '../types/components/DropDownProps';

const DropDown: React.FC<DropDownProps> = ({
  button,
  tooltipText = '',
  children,
  isPointed = false
}) => {
  const [showBody, setShowBody] = useState(false);

  let nodeRef: LegacyRef<HTMLDivElement> = useOutsideClick(() => setShowBody(false));

  return (
    <div className="dropdown" ref={nodeRef}>
      <div onClick={() => setShowBody(!showBody)} className="header flex">
        {tooltipText ? <Tooltip text={tooltipText}>{button}</Tooltip> : button}
      </div>

      <div
        onClick={() => setShowBody(false)}
        className={`body ${showBody ? 'show' : ''} ${isPointed ? 'pointed' : 'not_pointed'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
