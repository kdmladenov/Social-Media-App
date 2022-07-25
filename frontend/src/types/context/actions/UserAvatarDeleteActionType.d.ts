interface UserAvatarDeleteActionRequest {
  type: 'USER_DELETE_AVATAR_REQUEST';
}
interface UserAvatarDeleteActionSuccess {
  type: 'USER_DELETE_AVATAR_SUCCESS';
}
interface UserAvatarDeleteActionError {
  type: 'USER_DELETE_AVATAR_FAIL';
  payload: string;
}

type UserAvatarDeleteActionType =
  | UserAvatarDeleteActionRequest
  | UserAvatarDeleteActionSuccess
  | UserAvatarDeleteActionError;

export default UserAvatarDeleteActionType;
