import SavedPostType from '../../SavedPostType';


interface SavedPostsListActionRequest {
  type: 'SAVED_POSTS_LIST_REQUEST';
}
interface SavedPostsListActionSuccess {
  type: 'SAVED_POSTS_LIST_SUCCESS';
  payload: SavedPostType[];
}
interface SavedPostsListActionError {
  type: 'SAVED_POSTS_LIST_FAIL';
  payload: string;
}
interface SavedPostsListActionReset {
  type: 'SAVED_POSTS_LIST_RESET';
}

type SavedPostsListActionType =
  | SavedPostsListActionRequest
  | SavedPostsListActionSuccess
  | SavedPostsListActionError
  | SavedPostsListActionReset;

export default SavedPostsListActionType;
