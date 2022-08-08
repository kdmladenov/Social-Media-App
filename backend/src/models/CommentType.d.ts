interface CommentType {
  commentId: number;
  postId: number;
  imageId: number;
  replyTo: number | null;
  authorId: number;
  authorFirstName: string;
  authorLastName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  totalDBItems: number;
}

export default CommentType;
