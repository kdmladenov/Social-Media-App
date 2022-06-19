import UserInfoType from '../../UserInfoType';

interface UserLoginActionRequest {
  type: 'USER_LOGIN_REQUEST';
}
interface UserLoginActionSuccess {
  type: 'USER_LOGIN_SUCCESS';
  payload: UserInfoType;
}
interface UserLoginActionError {
  type: 'USER_LOGIN_FAIL';
  payload: string;
}
interface UserLoginActionLogout {
  type: 'USER_LOGOUT';
}

type UserLoginActionType =
  | UserLoginActionRequest
  | UserLoginActionSuccess
  | UserLoginActionError
  | UserLoginActionLogout;

export default UserLoginActionType;
