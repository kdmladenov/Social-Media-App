interface PostRestoreActionRequest {
  type: 'POST_RESTORE_REQUEST';
}

interface PostRestoreActionSuccess {
  type: 'POST_RESTORE_SUCCESS';
}
interface PostRestoreActionError {
  type: 'POST_RESTORE_FAIL';
  payload: string;
}

type PostRestoreActionType =
  | PostRestoreActionRequest
  | PostRestoreActionSuccess
  | PostRestoreActionError;

export default PostRestoreActionType;
