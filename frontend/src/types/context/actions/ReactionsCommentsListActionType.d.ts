import ReactionType from '../../ReactionType';

interface ReactionsCommentsListActionRequest {
  type: 'REACTIONS_COMMENT_LIST_REQUEST';
}

interface ReactionsCommentsListActionSuccess {
  type: 'REACTIONS_COMMENT_LIST_SUCCESS';
  payload: { reactions: ReactionType[]; commentId: number };
}
interface ReactionsCommentsListActionError {
  type: 'REACTIONS_COMMENT_LIST_FAIL';
  payload: string;
}

type ReactionsCommentsListActionType =
  | ReactionsCommentsListActionRequest
  | ReactionsCommentsListActionSuccess
  | ReactionsCommentsListActionError;

export default ReactionsCommentsListActionType;
