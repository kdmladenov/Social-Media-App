import FeelingTypes from './FeelingTypes';

interface PostType {
  postId: number;
  userId: number;
  sharedPostId: number;
  message: string;
  images: { image: string; imageId: number }[] | string[];
  feelingType: FeelingTypes;
  taggedFriends: UserType[];
  city: string;
  country: string;
  isDeleted: boolean;
}

export default PostType;

export interface PostTypeImagesAsJson extends PostType {
  images: string;
  taggedFriends: string;
}

export interface newPostType extends PostType {
  images: string[];
}