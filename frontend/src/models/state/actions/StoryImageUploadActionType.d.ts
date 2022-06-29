import StoryImageType from '../../StoryImageType';

interface StoryImageUploadActionRequest {
  type: 'STORY_IMAGE_UPLOAD_REQUEST';
}

interface StoryImageUploadActionSuccess {
  type: 'STORY_IMAGE_UPLOAD_SUCCESS';
  payload: StoryImageType;
}
interface StoryImageUploadActionError {
  type: 'STORY_IMAGE_UPLOAD_FAIL';
  payload: string;
}

type StoryImageUploadActionType =
  | StoryImageUploadActionRequest
  | StoryImageUploadActionSuccess
  | StoryImageUploadActionError;

export default StoryImageUploadActionType;
