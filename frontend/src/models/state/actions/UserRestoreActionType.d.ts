
interface UserRestoreActionRequest {
  type: 'USER_RESTORE_REQUEST';
}
interface UserRestoreActionSuccess {
  type: 'USER_RESTORE_SUCCESS';
}
interface UserRestoreActionError {
  type: 'USER_RESTORE_FAIL';
  payload: string;
}

type UserRestoreActionType =
  | UserRestoreActionRequest
  | UserRestoreActionSuccess
  | UserRestoreActionError;

export default UserRestoreActionType;
