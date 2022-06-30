import ReactionType from '../../ReactionType';

interface ReactionsPostEditActionRequest {
  type: 'REACTIONS_POST_EDIT_REQUEST';
}

interface ReactionsPostEditActionSuccess {
  type: 'REACTIONS_POST_EDIT_SUCCESS';
  payload?: ReactionType;
}
interface ReactionsPostEditActionError {
  type: 'REACTIONS_POST_EDIT_FAIL';
  payload: string;
}
interface ReactionsPostEditActionReset {
  type: 'REACTIONS_POST_EDIT_RESET';
}

type ReactionsPostEditActionType =
  | ReactionsPostEditActionRequest
  | ReactionsPostEditActionSuccess
  | ReactionsPostEditActionError
  | ReactionsPostEditActionReset;

export default ReactionsPostEditActionType;
