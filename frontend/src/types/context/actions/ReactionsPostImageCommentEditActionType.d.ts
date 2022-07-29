import ReactionType from '../../ReactionType';

interface ReactionsPostImageCommentEditActionRequest {
  type: 'REACTIONS_POST_IMAGE_COMMENT_EDIT_REQUEST';
}

interface ReactionsPostImageCommentEditActionSuccess {
  type: 'REACTIONS_POST_IMAGE_COMMENT_EDIT_SUCCESS';
  payload?: ReactionType;
}
interface ReactionsPostImageCommentEditActionError {
  type: 'REACTIONS_POST_IMAGE_COMMENT_EDIT_FAIL';
  payload: string;
}
interface ReactionsPostImageCommentEditActionReset {
  type: 'REACTIONS_POST_IMAGE_COMMENT_EDIT_RESET';
}

type ReactionsPostImageCommentEditActionType =
  | ReactionsPostImageCommentEditActionRequest
  | ReactionsPostImageCommentEditActionSuccess
  | ReactionsPostImageCommentEditActionError
  | ReactionsPostImageCommentEditActionReset;

export default ReactionsPostImageCommentEditActionType;
