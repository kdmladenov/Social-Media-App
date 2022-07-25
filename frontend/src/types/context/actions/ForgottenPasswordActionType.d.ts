interface ForgottenPasswordActionRequest {
  type: 'FORGOTTEN_PASSWORD_REQUEST';
}
interface ForgottenPasswordActionSuccess {
  type: 'FORGOTTEN_PASSWORD_SUCCESS';
}
interface ForgottenPasswordActionError {
  type: 'FORGOTTEN_PASSWORD_FAIL';
  payload: string;
}

type ForgottenPasswordActionType =
  | ForgottenPasswordActionRequest
  | ForgottenPasswordActionSuccess
  | ForgottenPasswordActionError;

export default ForgottenPasswordActionType;
