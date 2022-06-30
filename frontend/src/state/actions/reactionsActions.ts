import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../constants/constants';
import ReactionsCommentCreateActionType from '../../models/state/actions/ReactionsCommentCreateActionType';
import ReactionsCommentDeleteActionType from '../../models/state/actions/ReactionsCommentDeleteActionType';
import ReactionsCommentEditActionType from '../../models/state/actions/ReactionsCommentEditActionType';
import ReactionsCommentsListActionType from '../../models/state/actions/ReactionsCommentsListActionType';
import ReactionsPostCreateActionType from '../../models/state/actions/ReactionsPostCreateActionType';
import ReactionsPostDeleteActionType from '../../models/state/actions/ReactionsPostDeleteActionType';
import ReactionsPostEditActionType from '../../models/state/actions/ReactionsPostEditActionType';
import ReactionsPostListActionType from '../../models/state/actions/ReactionsPostListActionType';
import StateType from '../../models/state/StateType';
import {
  REACTIONS_COMMENT_LIST_FAIL,
  REACTIONS_COMMENT_LIST_REQUEST,
  REACTIONS_COMMENT_LIST_SUCCESS,
  REACTIONS_COMMENT_CREATE_FAIL,
  REACTIONS_COMMENT_CREATE_REQUEST,
  REACTIONS_COMMENT_CREATE_SUCCESS,
  REACTIONS_COMMENT_DELETE_FAIL,
  REACTIONS_COMMENT_DELETE_REQUEST,
  REACTIONS_COMMENT_DELETE_SUCCESS,
  REACTIONS_COMMENT_EDIT_FAIL,
  REACTIONS_COMMENT_EDIT_REQUEST,
  REACTIONS_COMMENT_EDIT_SUCCESS,
  REACTIONS_POST_CREATE_REQUEST,
  REACTIONS_POST_CREATE_SUCCESS,
  REACTIONS_POST_CREATE_FAIL,
  REACTIONS_POST_LIST_REQUEST,
  REACTIONS_POST_LIST_SUCCESS,
  REACTIONS_POST_LIST_FAIL,
  REACTIONS_POST_EDIT_REQUEST,
  REACTIONS_POST_EDIT_SUCCESS,
  REACTIONS_POST_EDIT_FAIL,
  REACTIONS_POST_DELETE_REQUEST,
  REACTIONS_POST_DELETE_SUCCESS,
  REACTIONS_POST_DELETE_FAIL
} from '../constants/reactionsConstants';

export const createPostReaction =
  (postId: number, reactionName: string) =>
  async (dispatch: Dispatch<ReactionsPostCreateActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REACTIONS_POST_CREATE_REQUEST });

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
        `${BASE_URL}/reactions/post/${postId}`,
        { reactionName },
        config
      );

      dispatch({ type: REACTIONS_POST_CREATE_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REACTIONS_POST_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listPostsReactions =
  (postId: number) =>
  async (dispatch: Dispatch<ReactionsPostListActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REACTIONS_POST_LIST_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/reactions/post/${postId}`, config);

      dispatch({ type: REACTIONS_POST_LIST_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REACTIONS_POST_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const editPostReaction =
  (reactionId: number, reactionName: string) =>
  async (dispatch: Dispatch<ReactionsPostEditActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REACTIONS_POST_EDIT_REQUEST });

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
        `${BASE_URL}/reactions/post/${reactionId}`,
        { reactionName },
        config
      );

      dispatch({ type: REACTIONS_POST_EDIT_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REACTIONS_POST_EDIT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deletePostReaction =
  (reactionId: number) =>
  async (dispatch: Dispatch<ReactionsPostDeleteActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REACTIONS_POST_DELETE_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/reactions/post/${reactionId}`, config);

      dispatch({ type: REACTIONS_POST_DELETE_SUCCESS });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REACTIONS_POST_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const createCommentReaction =
  (commentId: number, reactionName: string) =>
  async (dispatch: Dispatch<ReactionsCommentCreateActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REACTIONS_COMMENT_CREATE_REQUEST });

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
        `${BASE_URL}/reactions/comment/${commentId}`,
        { reactionName },
        config
      );

      dispatch({ type: REACTIONS_COMMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REACTIONS_COMMENT_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listCommentsReactions =
  (commentId: number) =>
  async (dispatch: Dispatch<ReactionsCommentsListActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REACTIONS_COMMENT_LIST_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/reactions/comment/${commentId}`, config);

      dispatch({ type: REACTIONS_COMMENT_LIST_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REACTIONS_COMMENT_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const editCommentReaction =
  (reactionId: number, reactionName: string) =>
  async (dispatch: Dispatch<ReactionsCommentEditActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REACTIONS_COMMENT_EDIT_REQUEST });

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
        `${BASE_URL}/reactions/comment/${reactionId}`,
        { reactionName },
        config
      );

      dispatch({ type: REACTIONS_COMMENT_EDIT_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REACTIONS_COMMENT_EDIT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteCommentReaction =
  (reactionId: number) =>
  async (dispatch: Dispatch<ReactionsCommentDeleteActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: REACTIONS_COMMENT_DELETE_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/reactions/comment/${reactionId}`, config);

      dispatch({ type: REACTIONS_COMMENT_DELETE_SUCCESS });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: REACTIONS_COMMENT_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
