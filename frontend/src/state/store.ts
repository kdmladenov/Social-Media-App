import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  forgottenPasswordReducer,
  passwordResetReducer,
  userAvatarDeleteReducer,
  userAvatarUpdateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userRestoreReducer,
  userUpdateProfileReducer
} from './reducers/userReducers';
import { portalRefsReducer } from './reducers/portalReducers';
import { postsMyListReducer } from './reducers/postReducers';
import {
  commentCreateReducer,
  commentDeleteReducer,
  commentEditReducer,
  commentsListReducer
} from './reducers/commentsReducers';
import { storiesMyListReducer } from './reducers/storyReducers';
import {
  commentReactionCreateReducer,
  commentReactionDeleteReducer,
  commentReactionEditReducer,
  commentReactionsListReducer,
  postReactionCreateReducer,
  postReactionDeleteReducer,
  postReactionEditReducer,
  postReactionsListReducer
} from './reducers/reactionsReducers';
import { schoolCreateReducer, schoolDeleteReducer, schoolDetailsReducer, schoolListReducer, schoolUpdateReducer } from './reducers/schoolReducers';
import { workplaceCreateReducer, workplaceDeleteReducer, workplaceDetailsReducer, workplaceListReducer, workplaceUpdateReducer } from './reducers/workplaceReducers';

const reducer = combineReducers({
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
  commentsList: commentsListReducer,
  commentCreate: commentCreateReducer,
  commentEdit: commentEditReducer,
  commentDelete: commentDeleteReducer,
  postsMyList: postsMyListReducer,
  storiesMyList: storiesMyListReducer,
  postReactionCreate: postReactionCreateReducer,
  postReactionsList: postReactionsListReducer,
  postReactionEdit: postReactionEditReducer,
  postReactionDelete: postReactionDeleteReducer,
  commentReactionCreate: commentReactionCreateReducer,
  commentReactionsList: commentReactionsListReducer,
  commentReactionEdit: commentReactionEditReducer,
  commentReactionDelete: commentReactionDeleteReducer,
  schoolCreate: schoolCreateReducer,
  schoolDetails: schoolDetailsReducer,
  schoolUpdate: schoolUpdateReducer,
  schoolList: schoolListReducer,
  schoolDelete: schoolDeleteReducer,
  workplaceCreate: workplaceCreateReducer,
  workplaceDetails: workplaceDetailsReducer,
  workplaceUpdate: workplaceUpdateReducer,
  workplaceList: workplaceListReducer,
  workplaceDelete: workplaceDeleteReducer
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage }
};

const middleware = [thunk]; // in case we add additional middleware

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
