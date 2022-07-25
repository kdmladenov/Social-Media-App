import CommentType from '../../CommentType';

interface CommentEditActionRequest {
  type: 'COMMENT_EDIT_REQUEST';
}

interface CommentEditActionSuccess {
  type: 'COMMENT_EDIT_SUCCESS';
  payload?: CommentType;
}
interface CommentEditActionError {
  type: 'COMMENT_EDIT_FAIL';
  payload: string;
}
interface CommentEditActionReset {
  type: 'COMMENT_EDIT_RESET';
}

type CommentEditActionType =
  | CommentEditActionRequest
  | CommentEditActionSuccess
  | CommentEditActionError
  | CommentEditActionReset;

export default CommentEditActionType;
