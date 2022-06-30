import ReactionType from '../../ReactionType';

interface ReactionsPostListActionRequest {
  type: 'REACTIONS_POST_LIST_REQUEST';
}

interface ReactionsPostListActionSuccess {
  type: 'REACTIONS_POST_LIST_SUCCESS';
  payload: ReactionType[];
}
interface ReactionsPostListActionError {
  type: 'REACTIONS_POST_LIST_FAIL';
  payload: string;
}

type ReactionsPostListActionType =
  | ReactionsPostListActionRequest
  | ReactionsPostListActionSuccess
  | ReactionsPostListActionError;

export default ReactionsPostListActionType;
