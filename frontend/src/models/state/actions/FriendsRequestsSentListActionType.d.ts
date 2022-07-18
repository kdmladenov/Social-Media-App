import FriendType from '../../FriendType';

interface FriendsRequestsSentListActionRequest {
  type: 'FRIENDS_REQUESTS_SENT_REQUEST';
}
interface FriendsRequestsSentListActionSuccess {
  type: 'FRIENDS_REQUESTS_SENT_SUCCESS';
  payload: FriendType[];
}
interface FriendsRequestsSentListActionError {
  type: 'FRIENDS_REQUESTS_SENT_FAIL';
  payload: string;
}
interface FriendsRequestsSentListActionReset {
  type: 'FRIENDS_REQUESTS_SENT_RESET';
}

type FriendsRequestsSentListActionType =
  | FriendsRequestsSentListActionRequest
  | FriendsRequestsSentListActionSuccess
  | FriendsRequestsSentListActionError
  | FriendsRequestsSentListActionReset;

export default FriendsRequestsSentListActionType;
