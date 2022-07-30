import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../data/constants';
import StoreType from '../../types/context/StoreType';
import {
  SAVED_POST_DELETE_FAIL,
  SAVED_POST_DELETE_REQUEST,
  SAVED_POST_DELETE_SUCCESS,
  SAVED_POSTS_LIST_FAIL,
  SAVED_POSTS_LIST_REQUEST,
  SAVED_POSTS_LIST_SUCCESS,
  SAVED_POST_CREATE_FAIL,
  SAVED_POST_CREATE_REQUEST,
  SAVED_POST_CREATE_SUCCESS,
  SAVED_POST_UPDATE_FAIL,
  SAVED_POST_UPDATE_REQUEST,
  SAVED_POST_UPDATE_SUCCESS,
  COLLECTION_DELETE_FAIL,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTIONS_LIST_FAIL,
  COLLECTIONS_LIST_REQUEST,
  COLLECTIONS_LIST_SUCCESS,
  COLLECTION_CREATE_FAIL,
  COLLECTION_CREATE_REQUEST,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_UPDATE_FAIL,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS
} from '../constants/savedPostsConstants';
import SavedPostCreateActionType from '../../types/context/actions/SavedPostCreateActionType';
import SavedPostUpdateActionType from '../../types/context/actions/SavedPostUpdateActionType';
import SavedPostsListActionType from '../../types/context/actions/SavedPostsListActionType';
import SavedPostDeleteActionType from '../../types/context/actions/SavedPostDeleteActionType';
import CollectionCreateActionType from '../../types/context/actions/CollectionCreateActionType';
import CollectionUpdateActionType from '../../types/context/actions/CollectionUpdateActionType';
import CollectionsListActionType from '../../types/context/actions/CollectionsListActionType';
import CollectionDeleteActionType from '../../types/context/actions/CollectionDeleteActionType';

export const createSavedPost =
  (postId: number, collection: string) =>
  async (dispatch: Dispatch<SavedPostCreateActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: SAVED_POST_CREATE_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/saved-posts/${postId}`,
        { collection },
        config
      );

      dispatch({
        type: SAVED_POST_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: SAVED_POST_CREATE_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const updateSavedPost =
  (postId: number, collection: string) =>
  async (dispatch: Dispatch<SavedPostUpdateActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: SAVED_POST_UPDATE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(`${BASE_URL}/saved-posts/${postId}`, { collection }, config);

      dispatch({
        type: SAVED_POST_UPDATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: SAVED_POST_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listSavedPosts =
  (endpoint = '') =>
  async (dispatch: Dispatch<SavedPostsListActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: SAVED_POSTS_LIST_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/saved-posts?${endpoint}`, config);

      dispatch({
        type: SAVED_POSTS_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: SAVED_POSTS_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteSavedPost =
  (postId: number) =>
  async (dispatch: Dispatch<SavedPostDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: SAVED_POST_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/saved-posts/${postId}`, config);

      dispatch({
        type: SAVED_POST_DELETE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: SAVED_POST_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const createCollection =
  (collection: string) =>
  async (dispatch: Dispatch<CollectionCreateActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: COLLECTION_CREATE_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/saved-posts/${userInfo?.userId}/collections`,
        { collection },
        config
      );

      dispatch({
        type: COLLECTION_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: COLLECTION_CREATE_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const updateCollection =
  (collectionId: number, collection: string) =>
  async (dispatch: Dispatch<CollectionUpdateActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: COLLECTION_UPDATE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(
        `${BASE_URL}/saved-posts/${collectionId}/collections`,
        { collection },
        config
      );

      dispatch({
        type: COLLECTION_UPDATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: COLLECTION_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listCollections =
  (endpoint = '') =>
  async (dispatch: Dispatch<CollectionsListActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: COLLECTIONS_LIST_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/saved-posts/collections?${endpoint}`, config);

      dispatch({
        type: COLLECTIONS_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: COLLECTIONS_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteCollection =
  (collectionId: number) =>
  async (dispatch: Dispatch<CollectionDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: COLLECTION_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/saved-posts/${collectionId}/collections`, config);

      dispatch({
        type: COLLECTION_DELETE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: COLLECTION_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
