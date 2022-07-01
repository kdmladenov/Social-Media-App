import CommentType from '../../CommentType';

interface CommentsListActionRequest {
  type: 'COMMENT_LIST_REQUEST';
}

interface CommentsListActionSuccess {
  type: 'COMMENT_LIST_SUCCESS';
  payload: { comments: CommentType[]; postId: number };
}
interface CommentsListActionError {
  type: 'COMMENT_LIST_FAIL';
  payload: string;
}

interface CommentsListActionReset {
  type: 'COMMENT_LIST_RESET';
}

type CommentsListActionType =
  | CommentsListActionRequest
  | CommentsListActionSuccess
  | CommentsListActionError
  | CommentsListActionReset;

export default CommentsListActionType;
