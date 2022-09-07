interface PostImagesUploadActionRequest {
  type: 'POST_IMAGES_UPLOAD_REQUEST';
}

interface PostImagesUploadActionSuccess {
  type: 'POST_IMAGES_UPLOAD_SUCCESS';
  payload: string[];
}
interface PostImagesUploadActionError {
  type: 'POST_IMAGES_UPLOAD_FAIL';
  payload: string;
}

interface PostImagesUploadActionReset {
  type: 'POST_IMAGES_UPLOAD_RESET';
}

type PostImagesUploadActionType =
  | PostImagesUploadActionRequest
  | PostImagesUploadActionSuccess
  | PostImagesUploadActionError
  | PostImagesUploadActionReset;

export default PostImagesUploadActionType;
