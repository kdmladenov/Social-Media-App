import StoryImageType from '../../StoryImageType';

interface StoryImagesListActionRequest {
  type: 'STORY_IMAGES_LIST_REQUEST';
}

interface StoryImagesListActionSuccess {
  type: 'STORY_IMAGES_LIST_SUCCESS';
  payload: StoryImageType[];
}
interface StoryImagesListActionError {
  type: 'STORY_IMAGES_LIST_FAIL';
  payload: string;
}

type StoryImagesListActionType =
  | StoryImagesListActionRequest
  | StoryImagesListActionSuccess
  | StoryImagesListActionError;

export default StoryImagesListActionType;
