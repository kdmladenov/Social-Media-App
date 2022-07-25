import SchoolType from '../../SchoolType';

interface FriendRequestStatusUpdateActionRequest {
  type: 'FRIEND_REQUEST_STATUS_UPDATE_REQUEST';
}
interface FriendRequestStatusUpdateActionSuccess {
  type: 'FRIEND_REQUEST_STATUS_UPDATE_SUCCESS';
  payload: SchoolType;
}
interface FriendRequestStatusUpdateActionError {
  type: 'FRIEND_REQUEST_STATUS_UPDATE_FAIL';
  payload: string;
}
interface FriendRequestStatusUpdateActionReset {
  type: 'FRIEND_REQUEST_STATUS_UPDATE_RESET';
}

type FriendRequestStatusUpdateActionType =
  | FriendRequestStatusUpdateActionRequest
  | FriendRequestStatusUpdateActionSuccess
  | FriendRequestStatusUpdateActionError
  | FriendRequestStatusUpdateActionReset;

export default FriendRequestStatusUpdateActionType;
