interface CommentImageType {
  postImageCommentId: number;
  postId: number;
  imageId: number;
  replyTo: number;
  authorId: number;
  authorFirstName: string;
  authorLastName: string;
  authorAvatar: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  isDeleted: boolean;
  totalDBItems: number;
}

export default CommentImageType;
