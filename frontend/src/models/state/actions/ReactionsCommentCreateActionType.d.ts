import ReactionType from '../../ReactionType';

interface ReactionsCommentCreateActionRequest {
  type: 'REACTIONS_COMMENT_CREATE_REQUEST';
}

interface ReactionsCommentCreateActionSuccess {
  type: 'REACTIONS_COMMENT_CREATE_SUCCESS';
  payload: ReactionType;
}
interface ReactionsCommentCreateActionError {
  type: 'REACTIONS_COMMENT_CREATE_FAIL';
  payload: string;
}
interface ReactionsCommentCreateActionReset {
  type: 'REACTIONS_COMMENT_CREATE_RESET';
}

type ReactionsCommentCreateActionType =
  | ReactionsCommentCreateActionRequest
  | ReactionsCommentCreateActionSuccess
  | ReactionsCommentCreateActionError
  | ReactionsCommentCreateActionReset;

export default ReactionsCommentCreateActionType;
