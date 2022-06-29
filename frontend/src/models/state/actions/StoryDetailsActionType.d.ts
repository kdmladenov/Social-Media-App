import StoryType from '../../StoryType';

interface StoryDetailsActionRequest {
  type: 'STORY_DETAILS_REQUEST';
}

interface StoryDetailsActionSuccess {
  type: 'STORY_DETAILS_SUCCESS';
  payload: StoryType;
}
interface StoryDetailsActionError {
  type: 'STORY_DETAILS_FAIL';
  payload: string;
}

type StoryDetailsActionType =
  | StoryDetailsActionRequest
  | StoryDetailsActionSuccess
  | StoryDetailsActionError;

export default StoryDetailsActionType;
