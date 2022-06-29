interface StoryImageDeleteActionRequest {
  type: 'STORY_IMAGE_DELETE_REQUEST';
}

interface StoryImageDeleteActionSuccess {
  type: 'STORY_IMAGE_DELETE_SUCCESS';
}
interface StoryImageDeleteActionError {
  type: 'STORY_IMAGE_DELETE_FAIL';
  payload: string;
}

type StoryImageDeleteActionType =
  | StoryImageDeleteActionRequest
  | StoryImageDeleteActionSuccess
  | StoryImageDeleteActionError;

export default StoryImageDeleteActionType;
