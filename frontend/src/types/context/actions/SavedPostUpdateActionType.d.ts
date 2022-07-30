import SavedPostType from '../../SavedPostType';

interface SavedPostUpdateActionRequest {
  type: 'SAVED_POST_UPDATE_REQUEST';
}
interface SavedPostUpdateActionSuccess {
  type: 'SAVED_POST_UPDATE_SUCCESS';
  payload: SavedPostType;
}
interface SavedPostUpdateActionError {
  type: 'SAVED_POST_UPDATE_FAIL';
  payload: string;
}
interface SavedPostUpdateActionReset {
  type: 'SAVED_POST_UPDATE_RESET';
}

type SavedPostUpdateActionType =
  | SavedPostUpdateActionRequest
  | SavedPostUpdateActionSuccess
  | SavedPostUpdateActionError
  | SavedPostUpdateActionReset;

export default SavedPostUpdateActionType;
