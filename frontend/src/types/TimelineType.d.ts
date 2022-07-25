import React from 'react';
import HistoryType from './HistoryType';

export type TimelineItemType = React.FC<{
  historyRecord: HistoryType;
  deleteHistoryItem: (id: number) => void;
  children: React.ReactNode;
}>;

type TimelineType = React.FC<{
  children: React.ReactNode;
  horizontal: boolean;
}> & { Item: TimelineItemType };

export default TimelineType;
