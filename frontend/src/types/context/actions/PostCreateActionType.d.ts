import PostType from '../../PostType';

interface PostCreateActionRequest {
  type: 'POST_CREATE_REQUEST';
}

interface PostCreateActionSuccess {
  type: 'POST_CREATE_SUCCESS';
  payload: PostType;
}
interface PostCreateActionError {
  type: 'POST_CREATE_FAIL';
  payload: string;
}

interface PostCreateActionReset {
  type: 'POST_CREATE_RESET';
}

type PostCreateActionType =
  | PostCreateActionRequest
  | PostCreateActionSuccess
  | PostCreateActionError
  | PostCreateActionReset;

export default PostCreateActionType;
