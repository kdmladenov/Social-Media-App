import CommentType from '../../CommentType';

interface CommentCreateActionRequest {
  type: 'COMMENT_CREATE_REQUEST';
}

interface CommentCreateActionSuccess {
  type: 'COMMENT_CREATE_SUCCESS';
  payload: CommentType;
}
interface CommentCreateActionError {
  type: 'COMMENT_CREATE_FAIL';
  payload: string;
}
interface CommentCreateActionReset {
  type: 'COMMENT_CREATE_RESET';
}

type CommentCreateActionType =
  | CommentCreateActionRequest
  | CommentCreateActionSuccess
  | CommentCreateActionError
  | CommentCreateActionReset;

export default CommentCreateActionType;
