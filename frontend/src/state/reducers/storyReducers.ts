import {
  STORY_CREATE_FAIL,
  STORY_CREATE_REQUEST,
  STORY_CREATE_RESET,
  STORY_CREATE_SUCCESS,
  STORY_DELETE_FAIL,
  STORY_DELETE_REQUEST,
  STORY_DELETE_SUCCESS,
  STORY_DETAILS_FAIL,
  STORY_DETAILS_REQUEST,
  STORY_DETAILS_SUCCESS,
  STORY_IMAGES_LIST_FAIL,
  STORY_IMAGES_LIST_REQUEST,
  STORY_IMAGES_LIST_SUCCESS,
  STORY_IMAGE_DELETE_FAIL,
  STORY_IMAGE_DELETE_REQUEST,
  STORY_IMAGE_DELETE_SUCCESS,
  STORY_IMAGE_SET_MAIN_FAIL,
  STORY_IMAGE_SET_MAIN_REQUEST,
  STORY_IMAGE_SET_MAIN_SUCCESS,
  STORY_IMAGE_UPLOAD_FAIL,
  STORY_IMAGE_UPLOAD_REQUEST,
  STORY_IMAGE_UPLOAD_SUCCESS,
  STORY_MY_LIST_FAIL,
  STORY_MY_LIST_REQUEST,
  STORY_MY_LIST_SUCCESS,
  STORY_RESTORE_FAIL,
  STORY_RESTORE_REQUEST,
  STORY_RESTORE_SUCCESS,
  STORY_UPDATE_FAIL,
  STORY_UPDATE_REQUEST,
  STORY_UPDATE_RESET,
  STORY_UPDATE_SUCCESS
} from '../constants/storyConstants';
import StoryCreateActionType from '../../models/state/actions/StoryCreateActionType';
import StoryUpdateActionType from '../../models/state/actions/StoryUpdateActionType';
import StoryImageUploadActionType from '../../models/state/actions/StoryImageUploadActionType';
import StoryImagesListActionType from '../../models/state/actions/StoryImagesListActionType';
import StoryImageDeleteActionType from '../../models/state/actions/StoryImageDeleteActionType';
import StoryImageSetMainActionType from '../../models/state/actions/StoryImageSetMainActionType';
import StoryDetailsActionType from '../../models/state/actions/StoryDetailsActionType';
import StoryRestoreActionType from '../../models/state/actions/StoryRestoreActionType';
import StoryDeleteActionType from '../../models/state/actions/StoryDeleteActionType';
import StoriesMyListActionType from '../../models/state/actions/StoriesMyListActionType';

export const storiesMyListReducer = (state = { stories: [] }, action: StoriesMyListActionType) => {
  switch (action.type) {
    case STORY_MY_LIST_REQUEST:
      return { loading: true };
    case STORY_MY_LIST_SUCCESS:
      return { loading: false, stories: action.payload };
    case STORY_MY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storyDetailsReducer = (state = { story: {} }, action: StoryDetailsActionType) => {
  switch (action.type) {
    case STORY_DETAILS_REQUEST:
      return { loading: true, story: {} };
    case STORY_DETAILS_SUCCESS:
      return { loading: false, story: action.payload };
    case STORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storyDeleteReducer = (state = {}, action: StoryDeleteActionType) => {
  switch (action.type) {
    case STORY_DELETE_REQUEST:
      return { loading: true };
    case STORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storyRestoreReducer = (state = {}, action: StoryRestoreActionType) => {
  switch (action.type) {
    case STORY_RESTORE_REQUEST:
      return { loading: true };
    case STORY_RESTORE_SUCCESS:
      return { loading: false, success: true };
    case STORY_RESTORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storyCreateReducer = (state = {}, action: StoryCreateActionType) => {
  switch (action.type) {
    case STORY_CREATE_REQUEST:
      return { loading: true };
    case STORY_CREATE_SUCCESS:
      return { loading: false, success: true, story: action.payload };
    case STORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const storyUpdateReducer = (state = { story: {} }, action: StoryUpdateActionType) => {
  switch (action.type) {
    case STORY_UPDATE_REQUEST:
      return { loading: true };
    case STORY_UPDATE_SUCCESS:
      return { loading: false, success: true, story: action.payload };
    case STORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STORY_UPDATE_RESET:
      return { story: {} };
    default:
      return state;
  }
};

export const storyImageUploadReducer = (state = {}, action: StoryImageUploadActionType) => {
  switch (action.type) {
    case STORY_IMAGE_UPLOAD_REQUEST:
      return { loading: true };
    case STORY_IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true, story: action.payload };
    case STORY_IMAGE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storyImagesListReducer = (
  state = { storyImages: [] },
  action: StoryImagesListActionType
) => {
  switch (action.type) {
    case STORY_IMAGES_LIST_REQUEST:
      return { loading: true, storyImages: [] };
    case STORY_IMAGES_LIST_SUCCESS:
      return { loading: false, storyImages: action.payload };
    case STORY_IMAGES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storyImageDeleteReducer = (state = {}, action: StoryImageDeleteActionType) => {
  switch (action.type) {
    case STORY_IMAGE_DELETE_REQUEST:
      return { loading: true };
    case STORY_IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STORY_IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storyImageSetMainReducer = (state = {}, action: StoryImageSetMainActionType) => {
  switch (action.type) {
    case STORY_IMAGE_SET_MAIN_REQUEST:
      return { loading: true };
    case STORY_IMAGE_SET_MAIN_SUCCESS:
      return { loading: false, success: true };
    case STORY_IMAGE_SET_MAIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
