import FriendType from '../../FriendType';

interface FriendsSuggestionsListActionRequest {
  type: 'FRIENDS_SUGGESTIONS_LIST_REQUEST';
}
interface FriendsSuggestionsListActionSuccess {
  type: 'FRIENDS_SUGGESTIONS_LIST_SUCCESS';
  payload: FriendType[];
}
interface FriendsSuggestionsListActionError {
  type: 'FRIENDS_SUGGESTIONS_LIST_FAIL';
  payload: string;
}
interface FriendsSuggestionsListActionReset {
  type: 'FRIENDS_SUGGESTIONS_LIST_RESET';
}

type FriendsSuggestionsListActionType =
  | FriendsSuggestionsListActionRequest
  | FriendsSuggestionsListActionSuccess
  | FriendsSuggestionsListActionError
  | FriendsSuggestionsListActionReset;

export default FriendsSuggestionsListActionType;
