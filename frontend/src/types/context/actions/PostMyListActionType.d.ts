import PostType from '../../PostType';

interface PostsMyListActionRequest {
  type: 'POST_MY_LIST_REQUEST';
}

interface PostsMyListActionSuccess {
  type: 'POST_MY_LIST_SUCCESS';
  payload: PostType[];
}
interface PostsMyListActionError {
  type: 'POST_MY_LIST_FAIL';
  payload: string;
}

type PostsMyListActionType =
  | PostsMyListActionRequest
  | PostsMyListActionSuccess
  | PostsMyListActionError;

export default PostsMyListActionType;
