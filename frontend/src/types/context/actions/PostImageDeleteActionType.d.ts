interface PostImageDeleteActionRequest {
  type: 'POST_IMAGE_DELETE_REQUEST';
}

interface PostImageDeleteActionSuccess {
  type: 'POST_IMAGE_DELETE_SUCCESS';
}
interface PostImageDeleteActionError {
  type: 'POST_IMAGE_DELETE_FAIL';
  payload: string;
}

type PostImageDeleteActionType =
  | PostImageDeleteActionRequest
  | PostImageDeleteActionSuccess
  | PostImageDeleteActionError;

export default PostImageDeleteActionType;
