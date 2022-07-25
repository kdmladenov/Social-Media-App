interface ReactionsCommentDeleteActionRequest {
  type: 'REACTIONS_COMMENT_DELETE_REQUEST';
}
interface ReactionsCommentDeleteActionSuccess {
  type: 'REACTIONS_COMMENT_DELETE_SUCCESS';
}
interface ReactionsCommentDeleteActionError {
  type: 'REACTIONS_COMMENT_DELETE_FAIL';
  payload: string;
}

type ReactionsCommentDeleteActionType =
  | ReactionsCommentDeleteActionRequest
  | ReactionsCommentDeleteActionSuccess
  | ReactionsCommentDeleteActionError;

export default ReactionsCommentDeleteActionType;
