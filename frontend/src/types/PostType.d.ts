import CommentType from './CommentType';
import PostImageType from './PostImageType';
import UserType from './UserType';

interface PostType {
  postId: number;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userAvatar: string;
  authorId: number;
  authorFirstName: string;
  authorLastName: string;
  authorAvatar: string;
  message: string;
  images: PostImageType[];
  comments?: CommentType[];
  taggedFriends: UserType[];
  feelingTypeId: number;
  feelingType: string;
  locationId: number;
  city: string;
  country: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  isDeleted: boolean;
  totalDBItems: number;
}

export default PostType;
