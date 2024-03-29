import axios from 'axios';

import {
  STORY_CREATE_FAIL,
  STORY_CREATE_REQUEST,
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
  STORY_MY_LIST_FAIL,
  STORY_MY_LIST_REQUEST,
  STORY_MY_LIST_SUCCESS,
  STORY_RESTORE_FAIL,
  STORY_RESTORE_REQUEST,
  STORY_RESTORE_SUCCESS,
  STORY_UPDATE_FAIL,
  STORY_UPDATE_REQUEST,
  STORY_UPDATE_SUCCESS
} from '../constants/storyConstants';
import { BASE_URL } from '../../data/constants';
import StoreType from '../../types/context/StoreType';
import { Dispatch } from 'redux';
import StoriesMyListActionType from '../../types/context/actions/StoriesMyListActionType';
import StoryDeleteActionType from '../../types/context/actions/StoryDeleteActionType';
import StoryRestoreActionType from '../../types/context/actions/StoryRestoreActionType';
import StoryType from '../../types/StoryType';
import StoryCreateActionType from '../../types/context/actions/StoryCreateActionType';
import StoryUpdateActionType from '../../types/context/actions/StoryUpdateActionType';
import StoryImagesListActionType from '../../types/context/actions/StoryImagesListActionType';
import StoryImageDeleteActionType from '../../types/context/actions/StoryImageDeleteActionType';
import StoryDetailsActionType from '../../types/context/actions/StoryDetailsActionType';

export const listMyStories =
  (endpoint: string = '') =>
  async (dispatch: Dispatch<StoriesMyListActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: STORY_MY_LIST_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/stories?${endpoint}`, config);

      dispatch({
        type: STORY_MY_LIST_SUCCESS,
        payload: data
      });

    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: STORY_MY_LIST_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const listStoryDetails =
  (storyId: number) => async (dispatch: Dispatch<StoryDetailsActionType>) => {
    try {
      dispatch({ type: STORY_DETAILS_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/stories/${storyId}`);

      dispatch({
        type: STORY_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: STORY_DETAILS_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const deleteStory =
  (storyId: number) =>
  async (dispatch: Dispatch<StoryDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: STORY_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/stories/${storyId}`, config);

      dispatch({
        type: STORY_DELETE_SUCCESS
      });
      // for Sidebar input map
      const { data: allStoryList } = await axios.get(
        `${BASE_URL}/stories?pageSize=${localStorage.getItem('totalMyStoryCount')}`
      );
      localStorage.setItem('allStoriesList', JSON.stringify(allStoryList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: STORY_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const restoreStory =
  (storyId: number) =>
  async (dispatch: Dispatch<StoryRestoreActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: STORY_RESTORE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.patch(`${BASE_URL}/stories/${storyId}/restore`, {}, config);

      dispatch({
        type: STORY_RESTORE_SUCCESS
      });
      // for Sidebar input map
      const { data: allStoryList } = await axios.get(
        `${BASE_URL}/stories?pageSize=${localStorage.getItem('totalMyStoryCount')}`
      );
      localStorage.setItem('allStoriesList', JSON.stringify(allStoryList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: STORY_RESTORE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };


export const createStory =
  (
    userId: number,
    mode: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.DragEvent<HTMLDivElement>,
    imageAddress?: string
  ) =>
  async (dispatch: Dispatch<StoryCreateActionType>, getState: () => StoreType) => {
    // mode: 'file_upload' or 'add_image_url'
    let image = imageAddress || '';

    try {
      dispatch({
        type: STORY_CREATE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      if (mode === 'file_upload') {
        // Case file upload
        const file =
          (event.target as HTMLInputElement).files?.[0] ||
          (event as React.DragEvent<HTMLDivElement>).dataTransfer.files?.[0];
        const formData = new FormData();
        formData.append('story', file);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const { data } = await axios.post(`${BASE_URL}/images/stories/upload`, formData, config);

        image = data?.image;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(`${BASE_URL}/stories/${userId}`, { image }, config);

      dispatch({
        type: STORY_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: STORY_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const updateStory =
  (storyId: number, updatedStory: StoryType) =>
  async (
    dispatch: Dispatch<StoryUpdateActionType | StoryDetailsActionType>,
    getState: () => StoreType
  ) => {
    try {
      dispatch({
        type: STORY_UPDATE_REQUEST
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
        `${BASE_URL}/stories/${userInfo?.userId}/${storyId}`,
        updatedStory,
        config
      );

      dispatch({
        type: STORY_UPDATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: STORY_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listStoryImages =
  (storyId: number) => async (dispatch: Dispatch<StoryImagesListActionType>) => {
    try {
      dispatch({ type: STORY_IMAGES_LIST_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/stories/${storyId}/images`);

      dispatch({
        type: STORY_IMAGES_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: STORY_IMAGES_LIST_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const deleteStoryImage =
  (storyImageId: number) =>
  async (dispatch: Dispatch<StoryImageDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: STORY_IMAGE_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/stories/${storyImageId}/images`, config);

      dispatch({
        type: STORY_IMAGE_DELETE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: STORY_IMAGE_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

