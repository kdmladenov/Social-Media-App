interface ReactionType {
  reactionId?: number;
  reactionPostImageId?: number;
  postId?: number;
  commentId?: number;
  userId: number;
  authorFirstName: string;
  authorLastName: string;
  reactionTypeId: number;
  reactionName: string;
  reactionCode: string;
  isDeleted: boolean;
  totalDBItems: number;
}
export default ReactionType;
