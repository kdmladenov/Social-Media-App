import SavedPostType from '../../SavedPostType';

interface SavedPostCreateActionRequest {
  type: 'SAVED_POST_CREATE_REQUEST';
}
interface SavedPostCreateActionSuccess {
  type: 'SAVED_POST_CREATE_SUCCESS';
  payload: SavedPostType;
}
interface SavedPostCreateActionError {
  type: 'SAVED_POST_CREATE_FAIL';
  payload: string;
}

type SavedPostCreateActionType =
  | SavedPostCreateActionRequest
  | SavedPostCreateActionSuccess
  | SavedPostCreateActionError;

export default SavedPostCreateActionType;
