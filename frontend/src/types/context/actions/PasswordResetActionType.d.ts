interface PasswordResetActionRequest {
  type: 'PASSWORD_RESET_REQUEST';
}
interface PasswordResetActionSuccess {
  type: 'PASSWORD_RESET_SUCCESS';
  payload: string;
}
interface PasswordResetActionError {
  type: 'PASSWORD_RESET_FAIL';
  payload: string;
}

type PasswordResetActionType =
  | PasswordResetActionRequest
  | PasswordResetActionSuccess
  | PasswordResetActionError;

export default PasswordResetActionType;
