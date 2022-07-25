import UserInfoType from '../../UserInfoType';

interface UserRegisterActionRequest {
  type: 'USER_REGISTER_REQUEST';
}
interface UserRegisterActionSuccess {
  type: 'USER_REGISTER_SUCCESS';
  payload: UserInfoType;
}
interface UserRegisterActionError {
  type: 'USER_REGISTER_FAIL';
  payload: string;
}

type UserRegisterActionType =
  | UserRegisterActionRequest
  | UserRegisterActionSuccess
  | UserRegisterActionError;

export default UserRegisterActionType;
