import ReactionType from '../../ReactionType';

interface ReactionsPostImageListActionRequest {
  type: 'REACTIONS_POST_IMAGE_LIST_REQUEST';
}

interface ReactionsPostImageListActionSuccess {
  type: 'REACTIONS_POST_IMAGE_LIST_SUCCESS';
  payload: { postImageReactions: ReactionType[]; postId: number; imageId: number };
}
interface ReactionsPostImageListActionError {
  type: 'REACTIONS_POST_IMAGE_LIST_FAIL';
  payload: string;
}

type ReactionsPostImageListActionType =
  | ReactionsPostImageListActionRequest
  | ReactionsPostImageListActionSuccess
  | ReactionsPostImageListActionError;

export default ReactionsPostImageListActionType;
