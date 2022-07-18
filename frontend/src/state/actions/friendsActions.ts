import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../constants/constants';
import StateType from '../../models/state/StateType';
import {
  FRIENDS_LIST_FAIL,
  FRIENDS_LIST_REQUEST,
  FRIENDS_LIST_SUCCESS,
  FRIENDS_REQUESTS_RECEIVED_FAIL,
  FRIENDS_REQUESTS_RECEIVED_REQUEST,
  FRIENDS_REQUESTS_RECEIVED_SUCCESS,
  FRIENDS_REQUESTS_SENT_FAIL,
  FRIENDS_REQUESTS_SENT_REQUEST,
  FRIENDS_REQUESTS_SENT_SUCCESS,
  FRIENDS_SUGGESTIONS_LIST_FAIL,
  FRIENDS_SUGGESTIONS_LIST_REQUEST,
  FRIENDS_SUGGESTIONS_LIST_SUCCESS,
  FRIEND_REQUEST_CREATE_FAIL,
  FRIEND_REQUEST_CREATE_REQUEST,
  FRIEND_REQUEST_CREATE_SUCCESS,
  FRIEND_REQUEST_STATUS_UPDATE_FAIL,
  FRIEND_REQUEST_STATUS_UPDATE_REQUEST,
  FRIEND_REQUEST_STATUS_UPDATE_SUCCESS,
  FRIEND_UNFRIEND_FAIL,
  FRIEND_UNFRIEND_REQUEST,
  FRIEND_UNFRIEND_SUCCESS
} from '../constants/friendConstants';
import FriendRequestCreateActionType from '../../models/state/actions/FriendRequestCreateActionType';
import FriendsListActionType from '../../models/state/actions/FriendsListActionType';
import FriendsRequestsSentListActionType from '../../models/state/actions/FriendsRequestsSentListActionType';
import FriendsRequestsReceivedListActionType from '../../models/state/actions/FriendsRequestsReceivedListActionType';
import FriendRequestStatusUpdateActionType from '../../models/state/actions/FriendRequestStatusUpdateActionType';
import FriendUnfriendActionType from '../../models/state/actions/FriendUnfriendActionType';
import FriendsSuggestionsListActionType from '../../models/state/actions/FriendsSuggestionsListActionType';

export const createFriendRequest =
  (requestorId: number) =>
  async (dispatch: Dispatch<FriendRequestCreateActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: FRIEND_REQUEST_CREATE_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(`${BASE_URL}/friends/${requestorId}`, {}, config);

      dispatch({
        type: FRIEND_REQUEST_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: FRIEND_REQUEST_CREATE_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const listFriends =
  (endpoint = '') =>
  async (dispatch: Dispatch<FriendsListActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: FRIENDS_LIST_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/friends?${endpoint}`, config);

      dispatch({
        type: FRIENDS_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: FRIENDS_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listFriendsSuggestions =
  () => async (dispatch: Dispatch<FriendsSuggestionsListActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: FRIENDS_SUGGESTIONS_LIST_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/friends/suggestions`, config);

      dispatch({
        type: FRIENDS_SUGGESTIONS_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: FRIENDS_SUGGESTIONS_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listFriendsRequestsSent =
  () =>
  async (dispatch: Dispatch<FriendsRequestsSentListActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: FRIENDS_REQUESTS_SENT_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/friends/requests/sent`, config);

      dispatch({
        type: FRIENDS_REQUESTS_SENT_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: FRIENDS_REQUESTS_SENT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listFriendsRequestsReceived =
  () =>
  async (dispatch: Dispatch<FriendsRequestsReceivedListActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: FRIENDS_REQUESTS_RECEIVED_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/friends/requests/received`, config);

      dispatch({
        type: FRIENDS_REQUESTS_RECEIVED_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: FRIENDS_REQUESTS_RECEIVED_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const updateFriendRequestStatus =
  (requestorId: number, requestStatus: 'approved' | 'pending' | 'rejected' | 'unfriended') =>
  async (dispatch: Dispatch<FriendRequestStatusUpdateActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: FRIEND_REQUEST_STATUS_UPDATE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(
        `${BASE_URL}/friends/${requestorId}/${requestStatus}`,
        {},
        config
      );

      dispatch({
        type: FRIEND_REQUEST_STATUS_UPDATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: FRIEND_REQUEST_STATUS_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const unfriendFriend =
  (friendId: number) =>
  async (dispatch: Dispatch<FriendUnfriendActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: FRIEND_UNFRIEND_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/friends/${friendId}`, config);

      dispatch({
        type: FRIEND_UNFRIEND_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: FRIEND_UNFRIEND_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
