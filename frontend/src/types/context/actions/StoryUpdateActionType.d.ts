import StoryType from '../../StoryType';

interface StoryUpdateActionRequest {
  type: 'STORY_UPDATE_REQUEST';
}

interface StoryUpdateActionSuccess {
  type: 'STORY_UPDATE_SUCCESS';
  payload: StoryType;
}
interface StoryUpdateActionError {
  type: 'STORY_UPDATE_FAIL';
  payload: string;
}

interface StoryUpdateActionReset {
  type: 'STORY_UPDATE_RESET';
}

type StoryUpdateActionType =
  | StoryUpdateActionRequest
  | StoryUpdateActionSuccess
  | StoryUpdateActionError
  | StoryUpdateActionReset;

export default StoryUpdateActionType;
