import React from 'react';
import StoryType from '../StoryType';

type SliderType = React.FC<{
  dots: boolean;
  children: JSX.Element[];
  slideIndex: number;
  setSlideIndex: Dispatch<SetStateAction<number>>;
}> & { Item: SliderItemType };

export default SliderType;


export type SliderItemType = React.FC<{ 
  item: StoryType
}>;