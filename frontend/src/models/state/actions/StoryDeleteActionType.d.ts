interface StoryDeleteActionRequest {
  type: 'STORY_DELETE_REQUEST';
}

interface StoryDeleteActionSuccess {
  type: 'STORY_DELETE_SUCCESS';
}
interface StoryDeleteActionError {
  type: 'STORY_DELETE_FAIL';
  payload: string;
}

type StoryDeleteActionType =
  | StoryDeleteActionRequest
  | StoryDeleteActionSuccess
  | StoryDeleteActionError;

export default StoryDeleteActionType;
