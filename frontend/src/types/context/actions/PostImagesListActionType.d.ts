import PostImageType from '../../PostImageType';

interface PostImagesListActionRequest {
  type: 'POST_IMAGES_LIST_REQUEST';
}

interface PostImagesListActionSuccess {
  type: 'POST_IMAGES_LIST_SUCCESS';
  payload: PostImageType[];
}
interface PostImagesListActionError {
  type: 'POST_IMAGES_LIST_FAIL';
  payload: string;
}

type PostImagesListActionType =
  | PostImagesListActionRequest
  | PostImagesListActionSuccess
  | PostImagesListActionError;

export default PostImagesListActionType;
