import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  forgottenPasswordReducer,
  passwordResetReducer,
  userAvatarDeleteReducer,
  userAvatarUpdateReducer,
  userCoverUpdateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userImagesListReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userRestoreReducer,
  userUpdateProfileReducer
} from './reducers/userReducers';
import { portalRefsReducer } from './reducers/portalReducers';
import { postCreateReducer, postImagesUploadReducer, postsMyListReducer, postUpdateReducer } from './reducers/postReducers';
import {
  commentCreateReducer,
  commentDeleteReducer,
  commentEditReducer,
  commentsListReducer,
  imageCommentCreateReducer,
  imageCommentDeleteReducer,
  imageCommentEditReducer,
  imageCommentsListReducer
} from './reducers/commentsReducers';
import { storiesMyListReducer, storyCreateReducer, storyUpdateReducer } from './reducers/storyReducers';
import {
  commentPostImageReactionCreateReducer,
  commentPostImageReactionDeleteReducer,
  commentPostImageReactionEditReducer,
  commentPostImageReactionsListReducer,
  commentReactionCreateReducer,
  commentReactionDeleteReducer,
  commentReactionEditReducer,
  commentReactionsListReducer,
  postImageReactionCreateReducer,
  postImageReactionDeleteReducer,
  postImageReactionEditReducer,
  postImageReactionsListReducer,
  postReactionCreateReducer,
  postReactionDeleteReducer,
  postReactionEditReducer,
  postReactionsListReducer
} from './reducers/reactionsReducers';
import {
  schoolCreateReducer,
  schoolDeleteReducer,
  schoolDetailsReducer,
  schoolListReducer,
  schoolUpdateReducer
} from './reducers/schoolReducers';
import {
  workplaceCreateReducer,
  workplaceDeleteReducer,
  workplaceDetailsReducer,
  workplaceListReducer,
  workplaceUpdateReducer
} from './reducers/workplaceReducers';
import {
  friendRequestCreateReducer,
  friendRequestStatusUpdateReducer,
  friendsListReducer,
  friendsRequestsListReducer,
  friendsRequestsReceivedListReducer,
  friendsRequestsSentListReducer,
  friendsSuggestionsListReducer,
  friendUnfriendReducer
} from './reducers/friendReducers';
import {
  collectionCreateReducer,
  collectionDeleteReducer,
  collectionsListReducer,
  collectionUpdateReducer,
  savedPostCreateReducer,
  savedPostDeleteReducer,
  savedPostsListReducer,
  savedPostUpdateReducer
} from './reducers/savedPostsReducers';
import { locationCreateReducer, locationDetailsReducer, locationsListReducer } from './reducers/locationReducers';

const reducers = combineReducers({
  portalRefs: portalRefsReducer,
  forgottenPassword: forgottenPasswordReducer,
  passwordReset: passwordResetReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userRestore: userRestoreReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAvatarUpdate: userAvatarUpdateReducer,
  userAvatarDelete: userAvatarDeleteReducer,
  userCoverUpdate: userCoverUpdateReducer,
  userImagesList: userImagesListReducer,
  commentsList: commentsListReducer,
  commentCreate: commentCreateReducer,
  commentEdit: commentEditReducer,
  commentDelete: commentDeleteReducer,
  imageCommentCreate: imageCommentCreateReducer,
  imageCommentsList: imageCommentsListReducer,
  imageCommentEdit: imageCommentEditReducer,
  imageCommentDelete: imageCommentDeleteReducer,
  postsMyList: postsMyListReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postImagesUpload: postImagesUploadReducer,
  storiesMyList: storiesMyListReducer,
  storyCreate: storyCreateReducer,
  storyUpdate: storyUpdateReducer,
  postReactionCreate: postReactionCreateReducer,
  postReactionsList: postReactionsListReducer,
  postReactionEdit: postReactionEditReducer,
  postReactionDelete: postReactionDeleteReducer,
  commentReactionCreate: commentReactionCreateReducer,
  commentReactionsList: commentReactionsListReducer,
  commentReactionEdit: commentReactionEditReducer,
  commentReactionDelete: commentReactionDeleteReducer,
  postImageReactionCreate: postImageReactionCreateReducer,
  postImageReactionsList: postImageReactionsListReducer,
  postImageReactionEdit: postImageReactionEditReducer,
  postImageReactionDelete: postImageReactionDeleteReducer,
  commentPostImageReactionCreate: commentPostImageReactionCreateReducer,
  commentPostImageReactionsList: commentPostImageReactionsListReducer,
  commentPostImageReactionEdit: commentPostImageReactionEditReducer,
  commentPostImageReactionDelete: commentPostImageReactionDeleteReducer,
  schoolCreate: schoolCreateReducer,
  schoolDetails: schoolDetailsReducer,
  schoolUpdate: schoolUpdateReducer,
  schoolList: schoolListReducer,
  schoolDelete: schoolDeleteReducer,
  savedPostCreate: savedPostCreateReducer,
  savedPostUpdate: savedPostUpdateReducer,
  savedPostsList: savedPostsListReducer,
  savedPostDelete: savedPostDeleteReducer,
  collectionCreate: collectionCreateReducer,
  collectionUpdate: collectionUpdateReducer,
  collectionsList: collectionsListReducer,
  collectionDelete: collectionDeleteReducer,
  friendRequestCreate: friendRequestCreateReducer,
  friendsList: friendsListReducer,
  friendsRequestsList:friendsRequestsListReducer,
  friendsSuggestionsList: friendsSuggestionsListReducer,
  friendsRequestsSentList: friendsRequestsSentListReducer,
  friendsRequestsReceivedList: friendsRequestsReceivedListReducer,
  friendRequestStatusUpdate: friendRequestStatusUpdateReducer,
  friendUnfriend: friendUnfriendReducer,
  workplaceCreate: workplaceCreateReducer,
  workplaceDetails: workplaceDetailsReducer,
  workplaceUpdate: workplaceUpdateReducer,
  workplaceList: workplaceListReducer,
  workplaceDelete: workplaceDeleteReducer,
  locationCreate: locationCreateReducer,
  locationDetails: locationDetailsReducer,
  locationsList: locationsListReducer
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage }
};

const middleware = [thunk]; // in case we add additional middleware

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
