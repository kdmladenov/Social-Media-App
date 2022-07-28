import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../data/constants';
import CommentType from '../../types/CommentType';
import CommentCreateActionType from '../../types/context/actions/CommentCreateActionType';
import CommentDeleteActionType from '../../types/context/actions/CommentDeleteActionType';
import CommentEditActionType from '../../types/context/actions/CommentEditActionType';
import CommentsListActionType from '../../types/context/actions/CommentsListActionType';
import ImageCommentCreateActionType from '../../types/context/actions/ImageCommentCreateActionType';
import ImageCommentDeleteActionType from '../../types/context/actions/ImageCommentDeleteActionType';
import ImageCommentEditActionType from '../../types/context/actions/ImageCommentEditActionType';
import ImageCommentsListActionType from '../../types/context/actions/ImageCommentsListActionType';
import StoreType from '../../types/context/StoreType';
import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_EDIT_FAIL,
  COMMENT_EDIT_REQUEST,
  COMMENT_EDIT_SUCCESS,
  IMAGE_COMMENT_CREATE_REQUEST,
  IMAGE_COMMENT_CREATE_SUCCESS,
  IMAGE_COMMENT_CREATE_FAIL,
  IMAGE_COMMENT_LIST_REQUEST,
  IMAGE_COMMENT_LIST_SUCCESS,
  IMAGE_COMMENT_LIST_FAIL,
  IMAGE_COMMENT_EDIT_REQUEST,
  IMAGE_COMMENT_EDIT_SUCCESS,
  IMAGE_COMMENT_EDIT_FAIL,
  IMAGE_COMMENT_DELETE_REQUEST,
  IMAGE_COMMENT_DELETE_SUCCESS,
  IMAGE_COMMENT_DELETE_FAIL
} from '../constants/commentsConstants';

export const createComment =
  (postId: number, content: string, replyTo?: number) =>
  async (dispatch: Dispatch<CommentCreateActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: COMMENT_CREATE_REQUEST });

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
        `${BASE_URL}/comments/${postId}`,
        { content, replyTo },
        config
      );

      dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: COMMENT_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listComments =
  (postId: number, endpoint: string = '') =>
  async (dispatch: Dispatch<CommentsListActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: COMMENT_LIST_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/comments/${postId}?${endpoint}`, config);

      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: { comments: data, postId }
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: COMMENT_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const editComment =
  (commentId: number, content: string) =>
  async (dispatch: Dispatch<CommentEditActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: COMMENT_EDIT_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(`${BASE_URL}/comments/${commentId}`, { content }, config);

      dispatch({ type: COMMENT_EDIT_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: COMMENT_EDIT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteComment =
  (commentId: number) =>
  async (dispatch: Dispatch<CommentDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: COMMENT_DELETE_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.delete(`${BASE_URL}/comments/${commentId}`, config);

      dispatch({ type: COMMENT_DELETE_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: COMMENT_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };


  export const createImageComment =
    (postId: number, imageId:number, content: string, replyTo?: number) =>
    async (dispatch: Dispatch<ImageCommentCreateActionType>, getState: () => StoreType) => {
      try {
        dispatch({ type: IMAGE_COMMENT_CREATE_REQUEST });

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
          `${BASE_URL}/comments-images/${postId}/${imageId}`,
          { content, replyTo },
          config
        );

        dispatch({ type: IMAGE_COMMENT_CREATE_SUCCESS, payload: data });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: IMAGE_COMMENT_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const listImageComments =
    (postId: number, imageId:number, endpoint: string = '') =>
    async (dispatch: Dispatch<ImageCommentsListActionType>, getState: () => StoreType) => {
      try {
        dispatch({ type: IMAGE_COMMENT_LIST_REQUEST });

        const {
          userLogin: { userInfo }
        } = getState();

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const { data } = await axios.get(
          `${BASE_URL}/comments-images/${postId}/${imageId}?${endpoint}`,
          config
        );

        dispatch({
          type: IMAGE_COMMENT_LIST_SUCCESS,
          payload: { imageComments: data, postId, imageId }
        });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: IMAGE_COMMENT_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const editImageComment =
    (postImageCommentId: number, content: string) =>
    async (dispatch: Dispatch<ImageCommentEditActionType>, getState: () => StoreType) => {
      try {
        dispatch({ type: IMAGE_COMMENT_EDIT_REQUEST });

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
          `${BASE_URL}/comments-images/${postImageCommentId}`,
          { content },
          config
        );

        dispatch({ type: IMAGE_COMMENT_EDIT_SUCCESS, payload: data });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: IMAGE_COMMENT_EDIT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const deleteImageComment =
    (postImageCommentId: number) =>
    async (dispatch: Dispatch<ImageCommentDeleteActionType>, getState: () => StoreType) => {
      try {
        dispatch({ type: IMAGE_COMMENT_DELETE_REQUEST });

        const {
          userLogin: { userInfo }
        } = getState();

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const { data } = await axios.delete(
          `${BASE_URL}/comments-images/${postImageCommentId}`,
          config
        );

        dispatch({ type: IMAGE_COMMENT_DELETE_SUCCESS, payload: data });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: IMAGE_COMMENT_DELETE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };