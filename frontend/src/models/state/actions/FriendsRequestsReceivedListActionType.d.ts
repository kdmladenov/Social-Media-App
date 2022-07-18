import FriendType from '../../FriendType';

interface FriendsRequestsReceivedListActionRequest {
  type: 'FRIENDS_REQUESTS_RECEIVED_REQUEST';
}
interface FriendsRequestsReceivedListActionSuccess {
  type: 'FRIENDS_REQUESTS_RECEIVED_SUCCESS';
  payload: FriendType[];
}
interface FriendsRequestsReceivedListActionError {
  type: 'FRIENDS_REQUESTS_RECEIVED_FAIL';
  payload: string;
}
interface FriendsRequestsReceivedListActionReset {
  type: 'FRIENDS_REQUESTS_RECEIVED_RESET';
}

type FriendsRequestsReceivedListActionType =
  | FriendsRequestsReceivedListActionRequest
  | FriendsRequestsReceivedListActionSuccess
  | FriendsRequestsReceivedListActionError
  | FriendsRequestsReceivedListActionReset;

export default FriendsRequestsReceivedListActionType;
