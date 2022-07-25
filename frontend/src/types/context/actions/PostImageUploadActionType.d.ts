import PostImageType from '../../PostImageType';

interface PostImageUploadActionRequest {
  type: 'POST_IMAGE_UPLOAD_REQUEST';
}

interface PostImageUploadActionSuccess {
  type: 'POST_IMAGE_UPLOAD_SUCCESS';
  payload: PostImageType;
}
interface PostImageUploadActionError {
  type: 'POST_IMAGE_UPLOAD_FAIL';
  payload: string;
}

type PostImageUploadActionType =
  | PostImageUploadActionRequest
  | PostImageUploadActionSuccess
  | PostImageUploadActionError;

export default PostImageUploadActionType;
