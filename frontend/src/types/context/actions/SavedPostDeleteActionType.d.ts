interface SavedPostDeleteActionRequest {
  type: 'SAVED_POST_DELETE_REQUEST';
}
interface SavedPostDeleteActionSuccess {
  type: 'SAVED_POST_DELETE_SUCCESS';
}
interface SavedPostDeleteActionError {
  type: 'SAVED_POST_DELETE_FAIL';
  payload: string;
}

type SavedPostDeleteActionType =
  | SavedPostDeleteActionRequest
  | SavedPostDeleteActionSuccess
  | SavedPostDeleteActionError;

export default SavedPostDeleteActionType;
