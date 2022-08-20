import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_IMAGES_LIST_FAIL,
  POST_IMAGES_LIST_REQUEST,
  POST_IMAGES_LIST_SUCCESS,
  POST_IMAGE_DELETE_FAIL,
  POST_IMAGE_DELETE_REQUEST,
  POST_IMAGE_DELETE_SUCCESS,
  POST_IMAGE_SET_MAIN_FAIL,
  POST_IMAGE_SET_MAIN_REQUEST,
  POST_IMAGE_SET_MAIN_SUCCESS,
  POST_IMAGE_UPLOAD_FAIL,
  POST_IMAGE_UPLOAD_REQUEST,
  POST_IMAGE_UPLOAD_SUCCESS,
  POST_MY_LIST_FAIL,
  POST_MY_LIST_REQUEST,
  POST_MY_LIST_SUCCESS,
  POST_RESTORE_FAIL,
  POST_RESTORE_REQUEST,
  POST_RESTORE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_RESET,
  POST_UPDATE_SUCCESS
} from '../constants/postConstants';
import PostCreateActionType from '../../types/context/actions/PostCreateActionType';
import PostUpdateActionType from '../../types/context/actions/PostUpdateActionType';
import PostImageUploadActionType from '../../types/context/actions/PostImageUploadActionType';
import PostImagesListActionType from '../../types/context/actions/PostImagesListActionType';
import PostImageDeleteActionType from '../../types/context/actions/PostImageDeleteActionType';
import PostImageSetMainActionType from '../../types/context/actions/PostImageSetMainActionType';
import PostDetailsActionType from '../../types/context/actions/PostDetailsActionType';
import PostRestoreActionType from '../../types/context/actions/PostRestoreActionType';
import PostDeleteActionType from '../../types/context/actions/PostDeleteActionType';
import PostsMyListActionType from '../../types/context/actions/PostMyListActionType';

export const postsMyListReducer = (state = {posts: []}, action: PostsMyListActionType) => {
  switch (action.type) {
    case POST_MY_LIST_REQUEST:
      return { loading: true};
    case POST_MY_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_MY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDetailsReducer = (
  state = { post: {} },
  action: PostDetailsActionType
) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true, post: {} };
    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action: PostDeleteActionType) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postRestoreReducer = (state = {}, action: PostRestoreActionType) => {
  switch (action.type) {
    case POST_RESTORE_REQUEST:
      return { loading: true };
    case POST_RESTORE_SUCCESS:
      return { loading: false, success: true };
    case POST_RESTORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action: PostCreateActionType) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postUpdateReducer = (state = { post: {} }, action: PostUpdateActionType) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_UPDATE_RESET:
      return { post: {} };
    default:
      return state;
  }
};

export const postImageUploadReducer = (state = {}, action: PostImageUploadActionType) => {
  switch (action.type) {
    case POST_IMAGE_UPLOAD_REQUEST:
      return { loading: true };
    case POST_IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_IMAGE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postImagesListReducer = (
  state = { postImages: [] },
  action: PostImagesListActionType
) => {
  switch (action.type) {
    case POST_IMAGES_LIST_REQUEST:
      return { loading: true, postImages: [] };
    case POST_IMAGES_LIST_SUCCESS:
      return { loading: false, postImages: action.payload };
    case POST_IMAGES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postImageDeleteReducer = (state = {}, action: PostImageDeleteActionType) => {
  switch (action.type) {
    case POST_IMAGE_DELETE_REQUEST:
      return { loading: true };
    case POST_IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postImageSetMainReducer = (state = {}, action: PostImageSetMainActionType) => {
  switch (action.type) {
    case POST_IMAGE_SET_MAIN_REQUEST:
      return { loading: true };
    case POST_IMAGE_SET_MAIN_SUCCESS:
      return { loading: false, success: true };
    case POST_IMAGE_SET_MAIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
