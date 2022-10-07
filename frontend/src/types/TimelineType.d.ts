import React from 'react';
import HistoryType from './HistoryType';

export type TimelineItemType = React.FC<{
  children: React.ReactNode;
  button: React.ReactNode;
  text: string;
  hoverText: string;
}>;

type TimelineType = React.FC<{
  children: React.ReactNode;
  horizontal?: boolean;
}> & { Item: TimelineItemType };

export default TimelineType;
