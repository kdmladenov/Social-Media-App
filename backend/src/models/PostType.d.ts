import FeelingTypes from './FeelingTypes';

interface PostType {
  postId: number;
  userId: number;
  sharedPostId: number;
  message: string;
  images: { image: string; imageId: number }[];
  feelingType: FeelingTypes;
  city: string;
  country: string;
  isDeleted: boolean;
}

export default PostType;

export interface PostTypeImagesAsJson extends PostType {
  images: string;
}