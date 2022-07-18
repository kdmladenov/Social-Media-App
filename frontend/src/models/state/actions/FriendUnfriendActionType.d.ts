interface FriendUnfriendActionRequest {
  type: 'FRIEND_UNFRIEND_REQUEST';
}
interface FriendUnfriendActionSuccess {
  type: 'FRIEND_UNFRIEND_SUCCESS';
}
interface FriendUnfriendActionError {
  type: 'FRIEND_UNFRIEND_FAIL';
  payload: string;
}

type FriendUnfriendActionType =
  | FriendUnfriendActionRequest
  | FriendUnfriendActionSuccess
  | FriendUnfriendActionError;

export default FriendUnfriendActionType;
