import ReactionType from '../../ReactionType';

interface ReactionsPostImageEditActionRequest {
  type: 'REACTIONS_POST_IMAGE_EDIT_REQUEST';
}

interface ReactionsPostImageEditActionSuccess {
  type: 'REACTIONS_POST_IMAGE_EDIT_SUCCESS';
  payload?: ReactionType;
}
interface ReactionsPostImageEditActionError {
  type: 'REACTIONS_POST_IMAGE_EDIT_FAIL';
  payload: string;
}
interface ReactionsPostImageEditActionReset {
  type: 'REACTIONS_POST_IMAGE_EDIT_RESET';
}

type ReactionsPostImageEditActionType =
  | ReactionsPostImageEditActionRequest
  | ReactionsPostImageEditActionSuccess
  | ReactionsPostImageEditActionError
  | ReactionsPostImageEditActionReset;

export default ReactionsPostImageEditActionType;
