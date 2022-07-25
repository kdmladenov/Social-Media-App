import UserType from '../UserType';

interface CommentsCardProps {
  currentUser: UserType;
  userId: number;
  firstName: string;
  lastName: string;
  avatar: string;
  commentId: number;
  commentContent: string;
  thumbsUp: number;
  thumbsDown: number;
  userThumbsUpList: string;
  userThumbsDownList: string;
}
export default CommentsCardProps;
