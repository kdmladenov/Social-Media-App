import SavedPostCreateActionType from '../../types/context/actions/SavedPostCreateActionType';
import SavedPostDeleteActionType from '../../types/context/actions/SavedPostDeleteActionType';
import SavedPostsListActionType from '../../types/context/actions/SavedPostsListActionType';
import SavedPostUpdateActionType from '../../types/context/actions/SavedPostUpdateActionType';
import CollectionCreateActionType from '../../types/context/actions/CollectionCreateActionType';
import CollectionDeleteActionType from '../../types/context/actions/CollectionDeleteActionType';
import CollectionsListActionType from '../../types/context/actions/CollectionsListActionType';
import CollectionUpdateActionType from '../../types/context/actions/CollectionUpdateActionType';
import {
  SAVED_POST_DELETE_FAIL,
  SAVED_POST_DELETE_REQUEST,
  SAVED_POST_DELETE_SUCCESS,
  SAVED_POSTS_LIST_FAIL,
  SAVED_POSTS_LIST_REQUEST,
  SAVED_POSTS_LIST_RESET,
  SAVED_POSTS_LIST_SUCCESS,
  SAVED_POST_CREATE_FAIL,
  SAVED_POST_CREATE_REQUEST,
  SAVED_POST_CREATE_SUCCESS,
  SAVED_POST_UPDATE_FAIL,
  SAVED_POST_UPDATE_REQUEST,
  SAVED_POST_UPDATE_RESET,
  SAVED_POST_UPDATE_SUCCESS,
  COLLECTION_DELETE_FAIL,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTIONS_LIST_FAIL,
  COLLECTIONS_LIST_REQUEST,
  COLLECTIONS_LIST_RESET,
  COLLECTIONS_LIST_SUCCESS,
  COLLECTION_CREATE_FAIL,
  COLLECTION_CREATE_REQUEST,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_UPDATE_FAIL,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_RESET,
  COLLECTION_UPDATE_SUCCESS
} from '../constants/savedPostsConstants';

export const savedPostCreateReducer = (state = {}, action: SavedPostCreateActionType) => {
  switch (action.type) {
    case SAVED_POST_CREATE_REQUEST:
      return { loading: true };
    case SAVED_POST_CREATE_SUCCESS:
      return { loading: false, success: true, savedPost: action.payload };
    case SAVED_POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const savedPostUpdateReducer = (state = {}, action: SavedPostUpdateActionType) => {
  switch (action.type) {
    case SAVED_POST_UPDATE_REQUEST:
      return { loading: true };
    case SAVED_POST_UPDATE_SUCCESS:
      return { loading: false, savedPost: action.payload, success: true };
    case SAVED_POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SAVED_POST_UPDATE_RESET:
      return { savedPost: {} };
    default:
      return state;
  }
};

export const savedPostsListReducer = (
  state = { savedPosts: [] },
  action: SavedPostsListActionType
) => {
  switch (action.type) {
    case SAVED_POSTS_LIST_REQUEST:
      return { loading: true };
    case SAVED_POSTS_LIST_SUCCESS:
      return { loading: false, savedPosts: action.payload};
    case SAVED_POSTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case SAVED_POSTS_LIST_RESET:
      return { savedPosts: [] };
    default:
      return state;
  }
};

export const savedPostDeleteReducer = (state = {}, action: SavedPostDeleteActionType) => {
  switch (action.type) {
    case SAVED_POST_DELETE_REQUEST:
      return { loading: true };
    case SAVED_POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SAVED_POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const collectionCreateReducer = (state = {}, action: CollectionCreateActionType) => {
  switch (action.type) {
    case COLLECTION_CREATE_REQUEST:
      return { loading: true };
    case COLLECTION_CREATE_SUCCESS:
      return { loading: false, success: true, collection: action.payload };
    case COLLECTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const collectionUpdateReducer = (state = {}, action: CollectionUpdateActionType) => {
  switch (action.type) {
    case COLLECTION_UPDATE_REQUEST:
      return { loading: true };
    case COLLECTION_UPDATE_SUCCESS:
      return { loading: false, collection: action.payload, success: true };
    case COLLECTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COLLECTION_UPDATE_RESET:
      return { collection: {}, success: false };
    default:
      return state;
  }
};

export const collectionsListReducer = (
  state = { collections: [] },
  action: CollectionsListActionType
) => {
  switch (action.type) {
    case COLLECTIONS_LIST_REQUEST:
      return { loading: true };
    case COLLECTIONS_LIST_SUCCESS:
      return { loading: false, collections: action.payload, success: true };
    case COLLECTIONS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case COLLECTIONS_LIST_RESET:
      return { collections: [] };
    default:
      return state;
  }
};

export const collectionDeleteReducer = (state = {}, action: CollectionDeleteActionType) => {
  switch (action.type) {
    case COLLECTION_DELETE_REQUEST:
      return { loading: true };
    case COLLECTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COLLECTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
