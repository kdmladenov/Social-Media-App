import CommentType from './CommentType';

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
  images: { image: string; imageId: number }[];
  comments?: CommentType[];
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
