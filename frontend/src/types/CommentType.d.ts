interface CommentType {
  commentId: number;
  postId: number;
  imageId: number;
  replyTo: number | null;
  authorId?: number;
  authorFirstName?: string;
  authorLastName?: string;
  authorAvatar?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  isDeleted?: boolean;
  content?: string;
  replies?: CommentType[];
}
export default CommentType;
