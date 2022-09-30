import React, { useState } from 'react';

import './styles/Timeline.css';
import TimelineType, { TimelineItemType } from '../types/TimelineType';

const Timeline: TimelineType = ({ horizontal = false, children }) => {
  return <ul className={`timeline_container ${horizontal ? 'horizontal' : ''}`}>{children}</ul>;
};

const Item: TimelineItemType = ({ children, button, text, hoverText }) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <li
      className="timeline_item"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className="timeline_item_content">
        {children}
        {showButton ? button : <span className="point" />}
        {<span className="date">{showButton ? hoverText : text}</span>}
      </div>
    </li>
  );
};

Timeline.Item = Item;

export default Timeline;
