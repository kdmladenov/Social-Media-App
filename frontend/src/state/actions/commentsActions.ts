import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../constants/constants';
import CommentType from '../../models/CommentType';
import CommentCreateActionType from '../../models/state/actions/CommentCreateActionType';
import CommentDeleteActionType from '../../models/state/actions/CommentDeleteActionType';
import CommentEditActionType from '../../models/state/actions/CommentEditActionType';
import CommentsListActionType from '../../models/state/actions/CommentsListActionType';
import StateType from '../../models/state/StateType';
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
  COMMENT_EDIT_SUCCESS
} from '../constants/commentsConstants';

export const createComment =
  (postId: number, contentComment: string) =>
  async (dispatch: Dispatch<CommentCreateActionType>, getState: () => StateType) => {
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
        { contentComment },
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
  async (dispatch: Dispatch<CommentsListActionType>, getState: () => StateType) => {
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
  (commentId: number, update: string) =>
  async (dispatch: Dispatch<CommentEditActionType>, getState: () => StateType) => {
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

      await axios.put(`${BASE_URL}/comments/${commentId}`, { update }, config);

      dispatch({ type: COMMENT_EDIT_SUCCESS });
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
  async (dispatch: Dispatch<CommentDeleteActionType>, getState: () => StateType) => {
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

      await axios.delete(`${BASE_URL}/comments/${commentId}`, config);

      dispatch({ type: COMMENT_DELETE_SUCCESS });
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
