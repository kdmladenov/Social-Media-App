import StoryType from '../../StoryType';

interface StoryCreateActionRequest {
  type: 'STORY_CREATE_REQUEST';
}

interface StoryCreateActionSuccess {
  type: 'STORY_CREATE_SUCCESS';
  payload: StoryType;
}
interface StoryCreateActionError {
  type: 'STORY_CREATE_FAIL';
  payload: string;
}

interface StoryCreateActionReset {
  type: 'STORY_CREATE_RESET';
}

type StoryCreateActionType =
  | StoryCreateActionRequest
  | StoryCreateActionSuccess
  | StoryCreateActionError
  | StoryCreateActionReset;

export default StoryCreateActionType;
