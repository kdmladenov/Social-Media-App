interface CommentDeleteActionRequest {
  type: 'COMMENT_DELETE_REQUEST';
}
interface CommentDeleteActionSuccess {
  type: 'COMMENT_DELETE_SUCCESS';
}
interface CommentDeleteActionError {
  type: 'COMMENT_DELETE_FAIL';
  payload: string;
}

type CommentDeleteActionType =
  | CommentDeleteActionRequest
  | CommentDeleteActionSuccess
  | CommentDeleteActionError;

export default CommentDeleteActionType;
