import CommentType from '../../CommentType';

interface ImageCommentsListActionRequest {
  type: 'IMAGE_COMMENT_LIST_REQUEST';
}

interface ImageCommentsListActionSuccess {
  type: 'IMAGE_COMMENT_LIST_SUCCESS';
  payload: { imageComments: CommentType[]; postId: number; imageId: number };
}
interface ImageCommentsListActionError {
  type: 'IMAGE_COMMENT_LIST_FAIL';
  payload: string;
}

interface ImageCommentsListActionReset {
  type: 'IMAGE_COMMENT_LIST_RESET';
}

type ImageCommentsListActionType =
  | ImageCommentsListActionRequest
  | ImageCommentsListActionSuccess
  | ImageCommentsListActionError
  | ImageCommentsListActionReset;

export default ImageCommentsListActionType;
