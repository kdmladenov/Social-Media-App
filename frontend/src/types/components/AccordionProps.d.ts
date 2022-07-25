import React from 'react';

export type AccordionItemType = React.FC<{ children: React.ReactNode; isOpen?: boolean }>;
export type AccordionHeaderType = React.FC<{ children: React.ReactNode }>;
export type AccordionBodyType = React.FC<{ children: React.ReactNode }>;
export type AccordionTitleType = React.FC<{ children: React.ReactNode }>;
export type AccordionButtonGroupType = React.FC<{ children?: React.ReactNode }>;

type AccordionType = React.FC<{ children: React.ReactNode }> & {
  Item: AccordionItemType;
  Header: AccordionHeaderType;
  Body: AccordionBodyType;
  Title: AccordionTitleType;
  ButtonGroup: AccordionButtonGroupType;
};

export default AccordionType;

export interface ToggleContextType {
  toggleShow: boolean;
  setToggleShow?: Dispatch<SetStateAction<boolean>>;
}
