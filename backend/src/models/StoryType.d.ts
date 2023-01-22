import FeelingTypes from './FeelingTypes';

interface StoryType {
  storyId: number;
  userId: number;
  message: string;
  messageSize: number;
  messageColor: string;
  messageBackground: string;
  image: string;
  feelingType: FeelingTypes;
  city: string;
  country: string;
  isDeleted: boolean;
}

export default StoryType;
