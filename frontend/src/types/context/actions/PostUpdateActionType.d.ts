import PostType from '../../PostType';

interface PostUpdateActionRequest {
  type: 'POST_UPDATE_REQUEST';
}

interface PostUpdateActionSuccess {
  type: 'POST_UPDATE_SUCCESS';
  payload: PostType;
}
interface PostUpdateActionError {
  type: 'POST_UPDATE_FAIL';
  payload: string;
}

interface PostUpdateActionReset {
  type: 'POST_UPDATE_RESET';
}

type PostUpdateActionType =
  | PostUpdateActionRequest
  | PostUpdateActionSuccess
  | PostUpdateActionError
  | PostUpdateActionReset;

export default PostUpdateActionType;
