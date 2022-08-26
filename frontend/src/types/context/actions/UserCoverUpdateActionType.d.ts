import UserType from '../../UserType';

interface UserCoverUpdateActionRequest {
  type: 'USER_UPDATE_COVER_REQUEST';
}
interface UserCoverUpdateActionSuccess {
  type: 'USER_UPDATE_COVER_SUCCESS';
  payload: UserType;
}
interface UserCoverUpdateActionError {
  type: 'USER_UPDATE_COVER_FAIL';
  payload: string;
}

type UserCoverUpdateActionType =
  | UserCoverUpdateActionRequest
  | UserCoverUpdateActionSuccess
  | UserCoverUpdateActionError;

export default UserCoverUpdateActionType;
