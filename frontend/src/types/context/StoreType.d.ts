import PostImageType from '../PostImageType';
import PostType from '../PostType';
import CommentType from '../CommentType';
import UserInfoType from '../UserInfoType';
import UserType from '../UserType';
import ReactionType from '../ReactionType';
import SchoolType from '../SchoolType';
import WorkplaceType from '../WorkplaceType';
import FriendType from '../FriendType';

interface StoreType {
  portalRefs;
  postsMyList: {
    loading: boolean;
    error?: string;
    posts: PostType[];
  };
  postDetails: {
    loading: boolean;
    error?: string;
    post: PostType;
  };
  postDelete: {
    loading: boolean;
    error?: string;
    success: boolean;
  };
  postRestore: {
    loading: boolean;
    error?: string;
    success: boolean;
  };
  postCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    post: PostType;
  };
  postUpdate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    post: PostType;
  };
  postImageUpload: {
    loading: boolean;
    error?: string;
    success?: boolean;
    post: PostType;
  };
  postImagesList: {
    loading: boolean;
    error?: string;
    postImages: PostImageType[];
  };
  postImageDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  postImageSetMain: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  postReactionCreate: {
    postReaction: ReactionType;
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  postReactionEdit: {
    postReaction: ReactionType;
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  postReactionsList: {
    postReactions: { [key: number]: ReactionType[] };
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  postReactionDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  commentCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    comment: CommentType;
  };
  commentsList: {
    loading: boolean;
    error?: string;
    comments: { [key: string]: CommentType[] };
  };
  commentEdit: {
    loading: boolean;
    error?: string;
    success?: boolean;
    comment: CommentType;
  };
  commentDelete: {
    loading: boolean;
    error?: string;
    success: boolean;
  };
  commentReactionCreate: {
    commentReaction: ReactionType;
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  commentReactionEdit: {
    commentReaction: ReactionType;
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  commentReactionsList: {
    commentReactions: { [key: number]: ReactionType[] };
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  commentReactionDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  forgottenPassword: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  passwordReset: {
    loading: boolean;
    error?: string;
    success?: boolean;
    message: string;
  };
  storiesMyList: {
    loading: boolean;
    error?: string;
    stories: StoriesType[];
  };
  userLogin: {
    loading: boolean;
    error?: string;
    userInfo: UserInfoType;
  };
  userRegister: {
    loading: boolean;
    error?: string;
    success?: boolean;
    userInfo: UserInfoType;
  };
  userDetails: {
    loading: boolean;
    error?: string;
    success?: boolean;
    user: UserType;
  };
  userList: {
    loading: boolean;
    error?: string;
    users: UserType[];
  };
  userDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  userRestore: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  userUpdateProfile: {
    loading: boolean;
    error?: string;
    success?: boolean;
    user: UserType;
  };
  userAvatarUpdate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    user: UserType;
  };
  userAvatarDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  schoolCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    school: SchoolType;
  };
  schoolDetails: {
    loading: boolean;
    error?: string;
    success?: boolean;
    school: SchoolType;
  };
  schoolList: {
    loading: boolean;
    error?: string;
    users: SchoolType[];
  };
  schoolDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  schoolUpdate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    school: SchoolType;
  };
  friendRequestCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    friendRequest: FriendType;
  };
  friendsList: {
    loading: boolean;
    error?: string;
    friends: FriendType[];
  };
  friendsRequestsSentList: {
    loading: boolean;
    error?: string;
    friendsRequestsSent: FriendType[];
  };
  friendsRequestsReceivedList: {
    loading: boolean;
    error?: string;
    friendsRequestsReceived: FriendType[];
  };
  friendsSuggestionsList: {
    loading: boolean;
    error?: string;
    friendsSuggestions: FriendType[];
  };
  friendRequestStatusUpdate: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  friendUnfriend: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  workplaceCreate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    workplace: WorkplaceType;
  };
  workplaceDetails: {
    loading: boolean;
    error?: string;
    success?: boolean;
    workplace: WorkplaceType;
  };
  workplaceList: {
    loading: boolean;
    error?: string;
    users: WorkplaceType[];
  };
  workplaceDelete: {
    loading: boolean;
    error?: string;
    success?: boolean;
  };
  workplaceUpdate: {
    loading: boolean;
    error?: string;
    success?: boolean;
    workplace: WorkplaceType;
  };
}
export default StoreType;
