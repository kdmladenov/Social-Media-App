import ReactionType from '../../ReactionType';

interface ReactionsPostImageCommentsListActionRequest {
  type: 'REACTIONS_POST_IMAGE_COMMENT_LIST_REQUEST';
}

interface ReactionsPostImageCommentsListActionSuccess {
  type: 'REACTIONS_POST_IMAGE_COMMENT_LIST_SUCCESS';
  payload: { postImageCommentReactions: ReactionType[]; commentId: number };
}
interface ReactionsPostImageCommentsListActionError {
  type: 'REACTIONS_POST_IMAGE_COMMENT_LIST_FAIL';
  payload: string;
}

type ReactionsPostImageCommentsListActionType =
  | ReactionsPostImageCommentsListActionRequest
  | ReactionsPostImageCommentsListActionSuccess
  | ReactionsPostImageCommentsListActionError;

export default ReactionsPostImageCommentsListActionType;
