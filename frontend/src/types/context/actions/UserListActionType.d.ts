import UserType from '../../UserType';

interface UserListActionRequest {
  type: 'USER_LIST_REQUEST';
}
interface UserListActionSuccess {
  type: 'USER_LIST_SUCCESS';
  payload: UserType[];
}
interface UserListActionError {
  type: 'USER_LIST_FAIL';
  payload: string;
}
interface UserListActionReset {
  type: 'USER_LIST_RESET';
}

type UserListActionType =
  | UserListActionRequest
  | UserListActionSuccess
  | UserListActionError
  | UserListActionReset;

export default UserListActionType;
