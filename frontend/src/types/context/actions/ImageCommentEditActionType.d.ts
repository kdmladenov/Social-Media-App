import CommentType from '../../CommentType';

interface ImageCommentEditActionRequest {
  type: 'IMAGE_COMMENT_EDIT_REQUEST';
}

interface ImageCommentEditActionSuccess {
  type: 'IMAGE_COMMENT_EDIT_SUCCESS';
  payload?: CommentType;
}
interface ImageCommentEditActionError {
  type: 'IMAGE_COMMENT_EDIT_FAIL';
  payload: string;
}
interface ImageCommentEditActionReset {
  type: 'IMAGE_COMMENT_EDIT_RESET';
}

type ImageCommentEditActionType =
  | ImageCommentEditActionRequest
  | ImageCommentEditActionSuccess
  | ImageCommentEditActionError
  | ImageCommentEditActionReset;

export default ImageCommentEditActionType;
