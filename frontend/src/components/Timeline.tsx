import React, { useState } from 'react';

import './styles/Timeline.css';
import getDate from '../utils/getDate';

import Tooltip from './Tooltip';
import TimelineType, { TimelineItemType } from '../types/TimelineType';

const Timeline: TimelineType = ({ horizontal, children }) => {
  return <ul className={`timeline_container ${horizontal ? 'horizontal' : ''}`}>{children}</ul>;
};

const Item: TimelineItemType = ({ historyRecord, deleteHistoryItem, children }) => {
  const [removeMode, setRemoveMode] = useState(false);

  return (
    <li
      className="timeline_item"
      onMouseEnter={() => setRemoveMode(true)}
      onMouseLeave={() => setRemoveMode(false)}
    >
      <div className="timeline_item_content">
        {children}
        {removeMode ? (
          <span className="remove_btn" onClick={() => deleteHistoryItem(historyRecord.postId)}>
            <Tooltip text="Remove">
              <i className="fa fa-times" />
            </Tooltip>
          </span>
        ) : (
          <span className="point" />
        )}
        {removeMode ? (
          <span className="date">Remove</span>
        ) : (
          <span className="date">
            {getDate(historyRecord.dateVisited, 0, false)
              .split(',')
              .map((subString, index) => (
                <span key={index}>{subString}</span>
              ))}
          </span>
        )}
      </div>
    </li>
  );
};

Timeline.Item = Item;

export default Timeline;
