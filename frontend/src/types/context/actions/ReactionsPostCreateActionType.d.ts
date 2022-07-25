import ReactionType from '../../ReactionType';

interface ReactionsPostCreateActionRequest {
  type: 'REACTIONS_POST_CREATE_REQUEST';
}

interface ReactionsPostCreateActionSuccess {
  type: 'REACTIONS_POST_CREATE_SUCCESS';
  payload: ReactionType;
}
interface ReactionsPostCreateActionError {
  type: 'REACTIONS_POST_CREATE_FAIL';
  payload: string;
}
interface ReactionsPostCreateActionReset {
  type: 'REACTIONS_POST_CREATE_RESET';
}

type ReactionsPostCreateActionType =
  | ReactionsPostCreateActionRequest
  | ReactionsPostCreateActionSuccess
  | ReactionsPostCreateActionError
  | ReactionsPostCreateActionReset;

export default ReactionsPostCreateActionType;
