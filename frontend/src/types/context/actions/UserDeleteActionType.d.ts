interface UserDeleteActionRequest {
  type: 'USER_DELETE_REQUEST';
}
interface UserDeleteActionSuccess {
  type: 'USER_DELETE_SUCCESS';
}
interface UserDeleteActionError {
  type: 'USER_DELETE_FAIL';
  payload: string;
}

type UserDeleteActionType =
  | UserDeleteActionRequest
  | UserDeleteActionSuccess
  | UserDeleteActionError;

export default UserDeleteActionType;
