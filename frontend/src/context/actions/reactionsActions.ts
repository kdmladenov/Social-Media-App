import axios from 'axios';
import { Dispatch } from 'redux';
import { BASE_URL } from '../../data/constants';

import ReactionsCommentCreateActionType from '../../types/context/actions/ReactionsCommentCreateActionType';
import ReactionsCommentDeleteActionType from '../../types/context/actions/ReactionsCommentDeleteActionType';
import ReactionsCommentEditActionType from '../../types/context/actions/ReactionsCommentEditActionType';
import ReactionsCommentsListActionType from '../../types/context/actions/ReactionsCommentsListActionType';
import ReactionsPostCreateActionType from '../../types/context/actions/ReactionsPostCreateActionType';
import ReactionsPostDeleteActionType from '../../types/context/actions/ReactionsPostDeleteActionType';
import ReactionsPostEditActionType from '../../types/context/actions/ReactionsPostEditActionType';
import ReactionsPostImageCommentCreateActionType from '../../types/context/actions/ReactionsPostImageCommentCreateActionType';
import ReactionsPostImageCommentDeleteActionType from '../../types/context/actions/ReactionsPostImageCommentDeleteActionType';
import ReactionsPostImageCommentEditActionType from '../../types/context/actions/ReactionsPostImageCommentEditActionType';
import ReactionsPostImageCommentsListActionType from '../../types/context/actions/ReactionsPostImageCommentsListActionType';
import ReactionsPostImageCreateActionType from '../../types/context/actions/ReactionsPostImageCreateActionType';
import ReactionsPostImageDeleteActionType from '../../types/context/actions/ReactionsPostImageDeleteActionType';
import ReactionsPostImageEditActionType from '../../types/context/actions/ReactionsPostImageEditActionType';
import ReactionsPostImageListActionType from '../../types/context/actions/ReactionsPostImageListActionType';
import ReactionsPostListActionType from '../../types/context/actions/ReactionsPostListActionType';
import StoreType from '../../types/context/StoreType';
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
  REACTIONS_POST_DELETE_FAIL,
  REACTIONS_POST_IMAGE_CREATE_REQUEST,
  REACTIONS_POST_IMAGE_CREATE_SUCCESS,
  REACTIONS_POST_IMAGE_LIST_REQUEST,
  REACTIONS_POST_IMAGE_LIST_SUCCESS,
  REACTIONS_POST_IMAGE_LIST_FAIL,
  REACTIONS_POST_IMAGE_EDIT_SUCCESS,
  REACTIONS_POST_IMAGE_DELETE_REQUEST,
  REACTIONS_POST_IMAGE_DELETE_SUCCESS,
  REACTIONS_POST_IMAGE_DELETE_FAIL,
  REACTIONS_POST_IMAGE_COMMENT_CREATE_REQUEST,
  REACTIONS_POST_IMAGE_COMMENT_CREATE_SUCCESS,
  REACTIONS_POST_IMAGE_COMMENT_CREATE_FAIL,
  REACTIONS_POST_IMAGE_COMMENT_LIST_REQUEST,
  REACTIONS_POST_IMAGE_COMMENT_LIST_SUCCESS,
  REACTIONS_POST_IMAGE_COMMENT_LIST_FAIL,
  REACTIONS_POST_IMAGE_COMMENT_EDIT_REQUEST,
  REACTIONS_POST_IMAGE_COMMENT_EDIT_SUCCESS,
  REACTIONS_POST_IMAGE_COMMENT_EDIT_FAIL,
  REACTIONS_POST_IMAGE_COMMENT_DELETE_REQUEST,
  REACTIONS_POST_IMAGE_COMMENT_DELETE_SUCCESS,
  REACTIONS_POST_IMAGE_COMMENT_DELETE_FAIL,
  REACTIONS_POST_IMAGE_CREATE_FAIL,
  REACTIONS_POST_IMAGE_EDIT_REQUEST,
  REACTIONS_POST_IMAGE_EDIT_FAIL
} from '../constants/reactionsConstants';

export const createPostReaction =
  (postId: number, reactionName: string) =>
  async (dispatch: Dispatch<ReactionsPostCreateActionType>, getState: () => StoreType) => {
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
  async (dispatch: Dispatch<ReactionsPostListActionType>, getState: () => StoreType) => {
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

      dispatch({ type: REACTIONS_POST_LIST_SUCCESS, payload: { reactions: data, postId } });
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
  async (dispatch: Dispatch<ReactionsPostEditActionType>, getState: () => StoreType) => {
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
  async (dispatch: Dispatch<ReactionsPostDeleteActionType>, getState: () => StoreType) => {
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
  async (dispatch: Dispatch<ReactionsCommentCreateActionType>, getState: () => StoreType) => {
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
  async (dispatch: Dispatch<ReactionsCommentsListActionType>, getState: () => StoreType) => {
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

      dispatch({ type: REACTIONS_COMMENT_LIST_SUCCESS, payload: { reactions: data, commentId } });
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
  async (dispatch: Dispatch<ReactionsCommentEditActionType>, getState: () => StoreType) => {
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
  async (dispatch: Dispatch<ReactionsCommentDeleteActionType>, getState: () => StoreType) => {
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


  export const createPostImageReaction =
    (postId: number,imageId: number, reactionName: string) =>
    async (dispatch: Dispatch<ReactionsPostImageCreateActionType>, getState: () => StoreType) => {
      try {
        dispatch({ type: REACTIONS_POST_IMAGE_CREATE_REQUEST });
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
          `${BASE_URL}/reactions-images/post-images/${postId}/${imageId}`,
          { reactionName },
          config
        );

        dispatch({ type: REACTIONS_POST_IMAGE_CREATE_SUCCESS, payload: data });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: REACTIONS_POST_IMAGE_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const listPostImageReactions =
    (postId: number, imageId:number) =>
    async (dispatch: Dispatch<ReactionsPostImageListActionType>, getState: () => StoreType) => {
      try {
        dispatch({ type: REACTIONS_POST_IMAGE_LIST_REQUEST });
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
          `${BASE_URL}/reactions-images/post-images/${postId}/${imageId}`,
          config
        );

        dispatch({
          type: REACTIONS_POST_IMAGE_LIST_SUCCESS,
          payload: { postImageReactions: data, postId, imageId }
        });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: REACTIONS_POST_IMAGE_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const editPostImageReaction =
    (reactionId: number, reactionName: string) =>
    async (dispatch: Dispatch<ReactionsPostImageEditActionType>, getState: () => StoreType) => {
      try {
        dispatch({ type: REACTIONS_POST_IMAGE_EDIT_REQUEST });
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
          `${BASE_URL}/reactions-images/post-images/${reactionId}`,
          { reactionName },
          config
        );

        dispatch({ type: REACTIONS_POST_IMAGE_EDIT_SUCCESS, payload: data });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: REACTIONS_POST_IMAGE_EDIT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const deletePostImageReaction =
    (reactionId: number) =>
    async (dispatch: Dispatch<ReactionsPostImageDeleteActionType>, getState: () => StoreType) => {
      try {
        dispatch({ type: REACTIONS_POST_IMAGE_DELETE_REQUEST });
        const {
          userLogin: { userInfo }
        } = getState();

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        await axios.delete(`${BASE_URL}/reactions-images/post-images/${reactionId}`, config);

        dispatch({ type: REACTIONS_POST_IMAGE_DELETE_SUCCESS });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: REACTIONS_POST_IMAGE_DELETE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const createPostImageCommentReaction =
    (commentId: number, reactionName: string) =>
    async (
      dispatch: Dispatch<ReactionsPostImageCommentCreateActionType>,
      getState: () => StoreType
    ) => {
      try {
        dispatch({ type: REACTIONS_POST_IMAGE_COMMENT_CREATE_REQUEST });
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
          `${BASE_URL}/reactions-images/image-comments/${commentId}`,
          { reactionName },
          config
        );

        dispatch({ type: REACTIONS_POST_IMAGE_COMMENT_CREATE_SUCCESS, payload: data });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: REACTIONS_POST_IMAGE_COMMENT_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const listPostImageCommentReactions =
    (commentId: number) =>
    async (
      dispatch: Dispatch<ReactionsPostImageCommentsListActionType>,
      getState: () => StoreType
    ) => {
      try {
        dispatch({ type: REACTIONS_POST_IMAGE_COMMENT_LIST_REQUEST });
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
          `${BASE_URL}/reactions-images/image-comments/${commentId}`,
          config
        );

        dispatch({
          type: REACTIONS_POST_IMAGE_COMMENT_LIST_SUCCESS,
          payload: { postImageCommentReactions: data, commentId }
        });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: REACTIONS_POST_IMAGE_COMMENT_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const editPostImageCommentReaction =
    (reactionId: number, reactionName: string) =>
    async (
      dispatch: Dispatch<ReactionsPostImageCommentEditActionType>,
      getState: () => StoreType
    ) => {
      try {
        dispatch({ type: REACTIONS_POST_IMAGE_COMMENT_EDIT_REQUEST });
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
          `${BASE_URL}/reactions-images/image-comments/${reactionId}`,
          { reactionName },
          config
        );

        dispatch({ type: REACTIONS_POST_IMAGE_COMMENT_EDIT_SUCCESS, payload: data });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: REACTIONS_POST_IMAGE_COMMENT_EDIT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };

  export const deletePostImageCommentReaction =
    (reactionId: number) =>
    async (
      dispatch: Dispatch<ReactionsPostImageCommentDeleteActionType>,
      getState: () => StoreType
    ) => {
      try {
        dispatch({ type: REACTIONS_POST_IMAGE_COMMENT_DELETE_REQUEST });
        const {
          userLogin: { userInfo }
        } = getState();

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        await axios.delete(`${BASE_URL}/reactions-images/image-comments/${reactionId}`, config);

        dispatch({ type: REACTIONS_POST_IMAGE_COMMENT_DELETE_SUCCESS });
      } catch (error) {
        axios.isAxiosError(error) &&
          dispatch({
            type: REACTIONS_POST_IMAGE_COMMENT_DELETE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          });
      }
    };