import PostType from '../../PostType';

interface PostDetailsActionRequest {
  type: 'POST_DETAILS_REQUEST';
}

interface PostDetailsActionSuccess {
  type: 'POST_DETAILS_SUCCESS';
  payload: PostType;
}
interface PostDetailsActionError {
  type: 'POST_DETAILS_FAIL';
  payload: string;
}

type PostDetailsActionType =
  | PostDetailsActionRequest
  | PostDetailsActionSuccess
  | PostDetailsActionError;

export default PostDetailsActionType;
