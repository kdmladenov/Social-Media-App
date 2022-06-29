import StoryType from '../../StoryType';

interface StoriesMyListActionRequest {
  type: 'STORY_MY_LIST_REQUEST';
}

interface StoriesMyListActionSuccess {
  type: 'STORY_MY_LIST_SUCCESS';
  payload: StoryType[];
}
interface StoriesMyListActionError {
  type: 'STORY_MY_LIST_FAIL';
  payload: string;
}

type StoriesMyListActionType =
  | StoriesMyListActionRequest
  | StoriesMyListActionSuccess
  | StoriesMyListActionError;

export default StoriesMyListActionType;
