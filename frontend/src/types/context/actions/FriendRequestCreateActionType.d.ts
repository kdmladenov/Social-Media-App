import FriendType from '../../FriendType';

interface FriendRequestCreateActionRequest {
  type: 'FRIEND_REQUEST_CREATE_REQUEST';
}
interface FriendRequestCreateActionSuccess {
  type: 'FRIEND_REQUEST_CREATE_SUCCESS';
  payload: FriendType;
}
interface FriendRequestCreateActionError {
  type: 'FRIEND_REQUEST_CREATE_FAIL';
  payload: string;
}

type FriendRequestCreateActionType =
  | FriendRequestCreateActionRequest
  | FriendRequestCreateActionSuccess
  | FriendRequestCreateActionError;

export default FriendRequestCreateActionType;
