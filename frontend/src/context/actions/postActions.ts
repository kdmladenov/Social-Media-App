import axios from 'axios';

import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
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
  POST_IMAGES_UPLOAD_FAIL,
  POST_IMAGES_UPLOAD_REQUEST,
  POST_IMAGES_UPLOAD_SUCCESS,
  POST_IMAGE_DELETE_FAIL,
  POST_IMAGE_DELETE_REQUEST,
  POST_IMAGE_DELETE_SUCCESS,
  POST_MY_LIST_FAIL,
  POST_MY_LIST_REQUEST,
  POST_MY_LIST_SUCCESS,
  POST_RESTORE_FAIL,
  POST_RESTORE_REQUEST,
  POST_RESTORE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS
} from '../constants/postConstants';
import { BASE_URL, GOOGLE_DRIVE_PUBLIC_URL } from '../../data/constants';
import StoreType from '../../types/context/StoreType';
import { Dispatch } from 'redux';
import PostsMyListActionType from '../../types/context/actions/PostMyListActionType';
import PostDeleteActionType from '../../types/context/actions/PostDeleteActionType';
import PostRestoreActionType from '../../types/context/actions/PostRestoreActionType';
import PostType from '../../types/PostType';
import PostCreateActionType from '../../types/context/actions/PostCreateActionType';
import PostUpdateActionType from '../../types/context/actions/PostUpdateActionType';
import PostImagesListActionType from '../../types/context/actions/PostImagesListActionType';
import PostImageDeleteActionType from '../../types/context/actions/PostImageDeleteActionType';
import PostDetailsActionType from '../../types/context/actions/PostDetailsActionType';
import ImageFileType from '../../types/ImageFileType';
import PostImagesUploadActionType from '../../types/context/actions/PostImagesUploadActionType';
import NewPostType from '../../types/NewPostType';

export const listMyPosts =
  (endpoint = '') =>
  async (dispatch: Dispatch<PostsMyListActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: POST_MY_LIST_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/posts?${endpoint}`, config);

      dispatch({
        type: POST_MY_LIST_SUCCESS,
        payload: data
      });

    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: POST_MY_LIST_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const listPostDetails =
  (postId: number) => async (dispatch: Dispatch<PostDetailsActionType>) => {
    try {
      dispatch({ type: POST_DETAILS_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/posts/${postId}`);

      dispatch({
        type: POST_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: POST_DETAILS_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const deletePost =
  (postId: number) =>
  async (dispatch: Dispatch<PostDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: POST_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/posts/${postId}`, config);

      dispatch({
        type: POST_DELETE_SUCCESS
      });
      // for Sidebar input map
      const { data: allPostList } = await axios.get(
        `${BASE_URL}/posts?pageSize=${localStorage.getItem('totalMyPostCount')}`
      );
      localStorage.setItem('allPostsList', JSON.stringify(allPostList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: POST_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const restorePost =
  (postId: number) =>
  async (dispatch: Dispatch<PostRestoreActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: POST_RESTORE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.patch(`${BASE_URL}/posts/${postId}/restore`, {}, config);

      dispatch({
        type: POST_RESTORE_SUCCESS
      });
      // for Sidebar input map
      const { data: allPostList } = await axios.get(
        `${BASE_URL}/posts?pageSize=${localStorage.getItem('totalMyPostCount')}`
      );
      localStorage.setItem('allPostsList', JSON.stringify(allPostList));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: POST_RESTORE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const uploadPostImages =
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
  async (dispatch: Dispatch<PostImagesUploadActionType>, getState: () => StoreType) => {
    // mode: 'file_upload' or 'add_image_url'
    let images = imageAddress ? [imageAddress] : [];

    try {
      dispatch({
        type: POST_IMAGES_UPLOAD_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      if (mode === 'file_upload') {
        // Case file upload

        const files =
          (event.target as HTMLInputElement).files ||
          (event as React.DragEvent<HTMLDivElement>).dataTransfer.files;
        const formData = new FormData();
        if (files.length !== 0) {
          for (const single_file of files) {
            formData.append('postImages', single_file);
          }
        }

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const { data } = await axios.post(`${BASE_URL}/images/posts/upload`, formData, config);

        data?.forEach((image: ImageFileType) =>
          images.push(`${GOOGLE_DRIVE_PUBLIC_URL}${image.id}`)
        );
      }

      dispatch({
        type: POST_IMAGES_UPLOAD_SUCCESS,
        payload: images
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: POST_IMAGES_UPLOAD_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const createPost =
  (_: number, createPostData: NewPostType) =>
  async (dispatch: Dispatch<PostCreateActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: POST_CREATE_REQUEST
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

      const { data } = await axios.post(`${BASE_URL}/posts`, createPostData, config);

      dispatch({
        type: POST_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: POST_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const updatePost =
  (postId: number, updatedPost: PostType) =>
  async (
    dispatch: Dispatch<PostUpdateActionType | PostDetailsActionType>,
    getState: () => StoreType
  ) => {
    try {
      dispatch({
        type: POST_UPDATE_REQUEST
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
        `${BASE_URL}/posts/${userInfo?.userId}/${postId}`,
        updatedPost,
        config
      );

      dispatch({
        type: POST_UPDATE_SUCCESS,
        payload: data
      });
      // // update the state everywhere
      dispatch({
        type: POST_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: POST_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listPostImages =
  (postId: number) => async (dispatch: Dispatch<PostImagesListActionType>) => {
    try {
      dispatch({ type: POST_IMAGES_LIST_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/posts/${postId}/images`);

      dispatch({
        type: POST_IMAGES_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: POST_IMAGES_LIST_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const deletePostImage =
  (imageId: number) =>
  async (dispatch: Dispatch<PostImageDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: POST_IMAGE_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/posts/${imageId}/images`, config);

      dispatch({
        type: POST_IMAGE_DELETE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: POST_IMAGE_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
