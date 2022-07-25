import UserType from '../../UserType';

interface UserUpdateProfileActionRequest {
  type: 'USER_UPDATE_PROFILE_REQUEST';
}
interface UserUpdateProfileActionSuccess {
  type: 'USER_UPDATE_PROFILE_SUCCESS';
  payload: UserType;
}
interface UserUpdateProfileActionError {
  type: 'USER_UPDATE_PROFILE_FAIL';
  payload: string;
}
interface UserUpdateProfileActionReset {
  type: 'USER_UPDATE_PROFILE_RESET';
}

type UserUpdateProfileActionType =
  | UserUpdateProfileActionRequest
  | UserUpdateProfileActionSuccess
  | UserUpdateProfileActionError
  | UserUpdateProfileActionReset;

export default UserUpdateProfileActionType;
