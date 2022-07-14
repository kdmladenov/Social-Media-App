import UserType from '../../UserType';

interface UserDetailsActionRequest {
  type: 'USER_DETAILS_REQUEST';
}
interface UserDetailsActionSuccess {
  type: 'USER_DETAILS_SUCCESS';
  payload: UserType;
}
interface UserDetailsActionError {
  type: 'USER_DETAILS_FAIL';
  payload: string;
}
interface UserDetailsActionReset {
  type: 'USER_DETAILS_RESET';
}

type UserDetailsActionType =
  | UserDetailsActionRequest
  | UserDetailsActionSuccess
  | UserDetailsActionError
  | UserDetailsActionReset;

export default UserDetailsActionType;
