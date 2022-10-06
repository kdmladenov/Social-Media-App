import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../data/constants';
import StoreType from '../../types/context/StoreType';
import {
  FRIENDS_LIST_FAIL,
  FRIENDS_LIST_REQUEST,
  FRIENDS_LIST_SUCCESS,
  FRIENDS_REQUESTS_LIST_FAIL,
  FRIENDS_REQUESTS_LIST_REQUEST,
  FRIENDS_REQUESTS_LIST_SUCCESS,
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
import FriendRequestCreateActionType from '../../types/context/actions/FriendRequestCreateActionType';
import FriendsListActionType from '../../types/context/actions/FriendsListActionType';
import FriendsRequestsSentListActionType from '../../types/context/actions/FriendsRequestsSentListActionType';
import FriendsRequestsReceivedListActionType from '../../types/context/actions/FriendsRequestsReceivedListActionType';
import FriendRequestStatusUpdateActionType from '../../types/context/actions/FriendRequestStatusUpdateActionType';
import FriendUnfriendActionType from '../../types/context/actions/FriendUnfriendActionType';
import FriendsSuggestionsListActionType from '../../types/context/actions/FriendsSuggestionsListActionType';
import FriendsRequestsListActionType from '../../types/context/actions/FriendsRequestsListActionType';

export const createFriendRequest =
  (requestorId: number) =>
  async (dispatch: Dispatch<FriendRequestCreateActionType>, getState: () => StoreType) => {
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
  (endpoint = '', userId?: number) =>
  async (dispatch: Dispatch<FriendsListActionType>, getState: () => StoreType) => {
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

      const { data } = await axios.get(
        `${BASE_URL}/friends/${userId ? userId : userInfo?.userId}?${endpoint}`,
        config
      );

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

export const listFriendRequests =
  () => async (dispatch: Dispatch<FriendsRequestsListActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: FRIENDS_REQUESTS_LIST_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/friends/requests/all`, config);

      dispatch({
        type: FRIENDS_REQUESTS_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: FRIENDS_REQUESTS_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listFriendsSuggestions =
  () => async (dispatch: Dispatch<FriendsSuggestionsListActionType>, getState: () => StoreType) => {
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

      const { data } = await axios.get(`${BASE_URL}/friends/suggestions/all`, config);

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
  async (dispatch: Dispatch<FriendsRequestsSentListActionType>, getState: () => StoreType) => {
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
  async (dispatch: Dispatch<FriendsRequestsReceivedListActionType>, getState: () => StoreType) => {
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
  async (dispatch: Dispatch<FriendRequestStatusUpdateActionType>, getState: () => StoreType) => {
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
  async (dispatch: Dispatch<FriendUnfriendActionType>, getState: () => StoreType) => {
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
