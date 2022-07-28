import CommentType from '../../CommentType';

interface ImageCommentCreateActionRequest {
  type: 'IMAGE_COMMENT_CREATE_REQUEST';
}

interface ImageCommentCreateActionSuccess {
  type: 'IMAGE_COMMENT_CREATE_SUCCESS';
  payload: CommentType;
}
interface ImageCommentCreateActionError {
  type: 'IMAGE_COMMENT_CREATE_FAIL';
  payload: string;
}
interface ImageCommentCreateActionReset {
  type: 'IMAGE_COMMENT_CREATE_RESET';
}

type ImageCommentCreateActionType =
  | ImageCommentCreateActionRequest
  | ImageCommentCreateActionSuccess
  | ImageCommentCreateActionError
  | ImageCommentCreateActionReset;

export default ImageCommentCreateActionType;
