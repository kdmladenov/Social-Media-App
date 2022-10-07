import React from 'react';
import PostType from '../PostType';
import StoryType from '../StoryType';

type SliderType = React.FC<{
  dots?: boolean;
  children: JSX.Element[];
  slideIndex?: number;
  setSlideIndex?: Dispatch<SetStateAction<number>>;
}> & { Item: SliderItemType };

export default SliderType;

export type SliderItemType = React.FC<{
  item: {
    image?: string;
    imageId?: number;
    storyId?: number;
    message?: string;
    userId?: number;
    userFirstName?: string;
    userLastName?: string;
    isFullScreen?: boolean;
    setIsFullScreen?: Dispatch<SetStateAction<boolean>>;
  };
  button_controls?: boolean;
  isFullScreen?: boolean;
  setIsFullScreen?: Dispatch<SetStateAction<boolean>>;
}>;
