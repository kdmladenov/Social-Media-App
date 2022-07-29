import ReactionType from '../../ReactionType';

interface ReactionsPostImageCreateActionRequest {
  type: 'REACTIONS_POST_IMAGE_CREATE_REQUEST';
}

interface ReactionsPostImageCreateActionSuccess {
  type: 'REACTIONS_POST_IMAGE_CREATE_SUCCESS';
  payload: ReactionType;
}
interface ReactionsPostImageCreateActionError {
  type: 'REACTIONS_POST_IMAGE_CREATE_FAIL';
  payload: string;
}
interface ReactionsPostImageCreateActionReset {
  type: 'REACTIONS_POST_IMAGE_CREATE_RESET';
}

type ReactionsPostImageCreateActionType =
  | ReactionsPostImageCreateActionRequest
  | ReactionsPostImageCreateActionSuccess
  | ReactionsPostImageCreateActionError
  | ReactionsPostImageCreateActionReset;

export default ReactionsPostImageCreateActionType;
