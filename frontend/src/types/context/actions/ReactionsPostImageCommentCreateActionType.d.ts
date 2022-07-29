import ReactionType from '../../ReactionType';

interface ReactionsPostImageCommentCreateActionRequest {
  type: 'REACTIONS_POST_IMAGE_COMMENT_CREATE_REQUEST';
}

interface ReactionsPostImageCommentCreateActionSuccess {
  type: 'REACTIONS_POST_IMAGE_COMMENT_CREATE_SUCCESS';
  payload: ReactionType;
}
interface ReactionsPostImageCommentCreateActionError {
  type: 'REACTIONS_POST_IMAGE_COMMENT_CREATE_FAIL';
  payload: string;
}
interface ReactionsPostImageCommentCreateActionReset {
  type: 'REACTIONS_POST_IMAGE_COMMENT_CREATE_RESET';
}

type ReactionsPostImageCommentCreateActionType =
  | ReactionsPostImageCommentCreateActionRequest
  | ReactionsPostImageCommentCreateActionSuccess
  | ReactionsPostImageCommentCreateActionError
  | ReactionsPostImageCommentCreateActionReset;

export default ReactionsPostImageCommentCreateActionType;
