interface ImageCommentDeleteActionRequest {
  type: 'IMAGE_COMMENT_DELETE_REQUEST';
}
interface ImageCommentDeleteActionSuccess {
  type: 'IMAGE_COMMENT_DELETE_SUCCESS';
}
interface ImageCommentDeleteActionError {
  type: 'IMAGE_COMMENT_DELETE_FAIL';
  payload: string;
}

type ImageCommentDeleteActionType =
  | ImageCommentDeleteActionRequest
  | ImageCommentDeleteActionSuccess
  | ImageCommentDeleteActionError;

export default ImageCommentDeleteActionType;
