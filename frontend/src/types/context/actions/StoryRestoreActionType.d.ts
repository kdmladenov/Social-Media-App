interface StoryRestoreActionRequest {
  type: 'STORY_RESTORE_REQUEST';
}

interface StoryRestoreActionSuccess {
  type: 'STORY_RESTORE_SUCCESS';
}
interface StoryRestoreActionError {
  type: 'STORY_RESTORE_FAIL';
  payload: string;
}

type StoryRestoreActionType =
  | StoryRestoreActionRequest
  | StoryRestoreActionSuccess
  | StoryRestoreActionError;

export default StoryRestoreActionType;
