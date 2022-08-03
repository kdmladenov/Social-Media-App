interface PostImageType {
  postImageId: number;
  postId: number;
  image: string;
  isMain: number | boolean;
  isDeleted: number | boolean;
}

export default PostImageType;
