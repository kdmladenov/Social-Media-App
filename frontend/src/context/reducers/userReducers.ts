import ForgottenPasswordActionType from '../../types/context/actions/ForgottenPasswordActionType';
import PasswordResetActionType from '../../types/context/actions/PasswordResetActionType';
import UserAvatarDeleteActionType from '../../types/context/actions/UserAvatarDeleteActionType';
import UserAvatarUpdateActionType from '../../types/context/actions/UserAvatarUpdateActionType';
import UserDeleteActionType from '../../types/context/actions/UserDeleteActionType';
import UserDetailsActionType from '../../types/context/actions/UserDetailsActionType';
import UserListActionType from '../../types/context/actions/UserListActionType';
import UserLoginActionType from '../../types/context/actions/UserLoginActionType';
import UserRegisterActionType from '../../types/context/actions/UserRegisterActionType';
import UserRestoreActionType from '../../types/context/actions/UserRestoreActionType';
import UserUpdateProfileActionType from '../../types/context/actions/UserUpdateProfileActionType';
import {
  FORGOTTEN_PASSWORD_FAIL,
  FORGOTTEN_PASSWORD_REQUEST,
  FORGOTTEN_PASSWORD_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  USER_DELETE_AVATAR_FAIL,
  USER_DELETE_AVATAR_REQUEST,
  USER_DELETE_AVATAR_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  // USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESTORE_FAIL,
  USER_RESTORE_REQUEST,
  USER_RESTORE_SUCCESS,
  USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action: UserLoginActionType) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action: UserRegisterActionType) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action: UserDetailsActionType) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action: UserUpdateProfileActionType) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return { user: [] };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action: UserListActionType) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action: UserDeleteActionType) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRestoreReducer = (state = {}, action: UserRestoreActionType) => {
  switch (action.type) {
    case USER_RESTORE_REQUEST:
      return { loading: true };
    case USER_RESTORE_SUCCESS:
      return { loading: false, success: true };
    case USER_RESTORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAvatarUpdateReducer = (state = {}, action: UserAvatarUpdateActionType) => {
  switch (action.type) {
    case USER_UPDATE_AVATAR_REQUEST:
      return { loading: true };
    case USER_UPDATE_AVATAR_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_UPDATE_AVATAR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAvatarDeleteReducer = (state = {}, action: UserAvatarDeleteActionType) => {
  switch (action.type) {
    case USER_DELETE_AVATAR_REQUEST:
      return { loading: true };
    case USER_DELETE_AVATAR_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_AVATAR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forgottenPasswordReducer = (state = {}, action: ForgottenPasswordActionType) => {
  switch (action.type) {
    case FORGOTTEN_PASSWORD_REQUEST:
      return { loading: true };
    case FORGOTTEN_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case FORGOTTEN_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const passwordResetReducer = (state = {}, action: PasswordResetActionType) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return { loading: true };
    case PASSWORD_RESET_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
