import FriendType from '../../FriendType';

interface FriendsListActionRequest {
  type: 'FRIENDS_LIST_REQUEST';
}
interface FriendsListActionSuccess {
  type: 'FRIENDS_LIST_SUCCESS';
  payload: FriendType[];
}
interface FriendsListActionError {
  type: 'FRIENDS_LIST_FAIL';
  payload: string;
}
interface FriendsListActionReset {
  type: 'FRIENDS_LIST_RESET';
}

type FriendsListActionType =
  | FriendsListActionRequest
  | FriendsListActionSuccess
  | FriendsListActionError
  | FriendsListActionReset;

export default FriendsListActionType;
