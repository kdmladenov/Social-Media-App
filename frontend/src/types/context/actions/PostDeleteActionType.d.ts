interface PostDeleteActionRequest {
  type: 'POST_DELETE_REQUEST';
}

interface PostDeleteActionSuccess {
  type: 'POST_DELETE_SUCCESS';
}
interface PostDeleteActionError {
  type: 'POST_DELETE_FAIL';
  payload: string;
}

type PostDeleteActionType =
  | PostDeleteActionRequest
  | PostDeleteActionSuccess
  | PostDeleteActionError;

export default PostDeleteActionType;
