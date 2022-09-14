import FriendType from '../../FriendType';

interface FriendsRequestsListActionRequest {
  type: 'FRIENDS_REQUESTS_LIST_REQUEST';
}
interface FriendsRequestsListActionSuccess {
  type: 'FRIENDS_REQUESTS_LIST_SUCCESS';
  payload: FriendType[];
}
interface FriendsRequestsListActionError {
  type: 'FRIENDS_REQUESTS_LIST_FAIL';
  payload: string;
}
interface FriendsRequestsListActionReset {
  type: 'FRIENDS_REQUESTS_LIST_RESET';
}

type FriendsRequestsListActionType =
  | FriendsRequestsListActionRequest
  | FriendsRequestsListActionSuccess
  | FriendsRequestsListActionError
  | FriendsRequestsListActionReset;

export default FriendsRequestsListActionType;
