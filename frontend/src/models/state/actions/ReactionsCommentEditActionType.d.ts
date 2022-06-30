import ReactionType from '../../ReactionType';

interface ReactionsCommentEditActionRequest {
  type: 'REACTIONS_COMMENT_EDIT_REQUEST';
}

interface ReactionsCommentEditActionSuccess {
  type: 'REACTIONS_COMMENT_EDIT_SUCCESS';
  payload?: ReactionType;
}
interface ReactionsCommentEditActionError {
  type: 'REACTIONS_COMMENT_EDIT_FAIL';
  payload: string;
}
interface ReactionsCommentEditActionReset {
  type: 'REACTIONS_COMMENT_EDIT_RESET';
}

type ReactionsCommentEditActionType =
  | ReactionsCommentEditActionRequest
  | ReactionsCommentEditActionSuccess
  | ReactionsCommentEditActionError
  | ReactionsCommentEditActionReset;

export default ReactionsCommentEditActionType;
