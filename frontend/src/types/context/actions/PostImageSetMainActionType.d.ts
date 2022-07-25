
interface PostImageSetMainActionRequest {
  type: 'POST_IMAGE_SET_MAIN_REQUEST';
}

interface PostImageSetMainActionSuccess {
  type: 'POST_IMAGE_SET_MAIN_SUCCESS';
}
interface PostImageSetMainActionError {
  type: 'POST_IMAGE_SET_MAIN_FAIL';
  payload: string;
}

type PostImageSetMainActionType =
  | PostImageSetMainActionRequest
  | PostImageSetMainActionSuccess
  | PostImageSetMainActionError;

export default PostImageSetMainActionType;
