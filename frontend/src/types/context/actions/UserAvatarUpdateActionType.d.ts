import UserType from '../../UserType';

interface UserAvatarUpdateActionRequest {
  type: 'USER_UPDATE_AVATAR_REQUEST';
}
interface UserAvatarUpdateActionSuccess {
  type: 'USER_UPDATE_AVATAR_SUCCESS';
  payload: UserType;
}
interface UserAvatarUpdateActionError {
  type: 'USER_UPDATE_AVATAR_FAIL';
  payload: string;
}

type UserAvatarUpdateActionType =
  | UserAvatarUpdateActionRequest
  | UserAvatarUpdateActionSuccess
  | UserAvatarUpdateActionError;

export default UserAvatarUpdateActionType;
