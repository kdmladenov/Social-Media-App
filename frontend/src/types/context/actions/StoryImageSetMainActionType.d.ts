
interface StoryImageSetMainActionRequest {
  type: 'STORY_IMAGE_SET_MAIN_REQUEST';
}

interface StoryImageSetMainActionSuccess {
  type: 'STORY_IMAGE_SET_MAIN_SUCCESS';
}
interface StoryImageSetMainActionError {
  type: 'STORY_IMAGE_SET_MAIN_FAIL';
  payload: string;
}

type StoryImageSetMainActionType =
  | StoryImageSetMainActionRequest
  | StoryImageSetMainActionSuccess
  | StoryImageSetMainActionError;

export default StoryImageSetMainActionType;
