interface PostImageType {
  imageId: number;
  postId: number;
  image: string;
  isDeleted: number | boolean;
  totalDBItems?: number;
}

export default PostImageType;
