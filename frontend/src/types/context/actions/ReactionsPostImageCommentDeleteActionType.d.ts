interface ReactionsPostImageCommentDeleteActionRequest {
  type: 'REACTIONS_POST_IMAGE_COMMENT_DELETE_REQUEST';
}
interface ReactionsPostImageCommentDeleteActionSuccess {
  type: 'REACTIONS_POST_IMAGE_COMMENT_DELETE_SUCCESS';
}
interface ReactionsPostImageCommentDeleteActionError {
  type: 'REACTIONS_POST_IMAGE_COMMENT_DELETE_FAIL';
  payload: string;
}

type ReactionsPostImageCommentDeleteActionType =
  | ReactionsPostImageCommentDeleteActionRequest
  | ReactionsPostImageCommentDeleteActionSuccess
  | ReactionsPostImageCommentDeleteActionError;

export default ReactionsPostImageCommentDeleteActionType;
