import FeelingTypes from './FeelingTypes';

interface PostType {
  postId: number;
  userId: number;
  authorId: number;
  message: string;
  image: string;
  feelingType: FeelingTypes;
  city: string;
  country: string;
  isDeleted: boolean;
}

export default PostType;
