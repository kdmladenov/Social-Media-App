import FriendRequestCreateActionType from '../../types/context/actions/FriendRequestCreateActionType';
import FriendRequestStatusUpdateActionType from '../../types/context/actions/FriendRequestStatusUpdateActionType';
import FriendsListActionType from '../../types/context/actions/FriendsListActionType';
import FriendsRequestsReceivedListActionType from '../../types/context/actions/FriendsRequestsReceivedListActionType';
import FriendsRequestsSentListActionType from '../../types/context/actions/FriendsRequestsSentListActionType';
import FriendsSuggestionsListActionType from '../../types/context/actions/FriendsSuggestionsListActionType';
import FriendUnfriendActionType from '../../types/context/actions/FriendUnfriendActionType';
import {
  FRIENDS_LIST_FAIL,
  FRIENDS_LIST_REQUEST,
  FRIENDS_LIST_RESET,
  FRIENDS_LIST_SUCCESS,
  FRIEND_REQUEST_CREATE_FAIL,
  FRIEND_REQUEST_CREATE_REQUEST,
  FRIEND_REQUEST_CREATE_SUCCESS,
  FRIENDS_REQUESTS_SENT_REQUEST,
  FRIENDS_REQUESTS_SENT_SUCCESS,
  FRIENDS_REQUESTS_SENT_FAIL,
  FRIENDS_REQUESTS_SENT_RESET,
  FRIENDS_REQUESTS_RECEIVED_REQUEST,
  FRIENDS_REQUESTS_RECEIVED_SUCCESS,
  FRIENDS_REQUESTS_RECEIVED_FAIL,
  FRIENDS_REQUESTS_RECEIVED_RESET,
  FRIEND_REQUEST_STATUS_UPDATE_REQUEST,
  FRIEND_REQUEST_STATUS_UPDATE_SUCCESS,
  FRIEND_REQUEST_STATUS_UPDATE_FAIL,
  FRIEND_REQUEST_STATUS_UPDATE_RESET,
  FRIEND_UNFRIEND_REQUEST,
  FRIEND_UNFRIEND_SUCCESS,
  FRIEND_UNFRIEND_FAIL,
  FRIENDS_SUGGESTIONS_LIST_REQUEST,
  FRIENDS_SUGGESTIONS_LIST_SUCCESS,
  FRIENDS_SUGGESTIONS_LIST_FAIL,
  FRIENDS_SUGGESTIONS_LIST_RESET
} from '../constants/friendConstants';

export const friendRequestCreateReducer = (state = {}, action: FriendRequestCreateActionType) => {
  switch (action.type) {
    case FRIEND_REQUEST_CREATE_REQUEST:
      return { loading: true };
    case FRIEND_REQUEST_CREATE_SUCCESS:
      return { loading: false, success: true, friendRequest: action.payload };
    case FRIEND_REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const friendsListReducer = (state = { friends: [] }, action: FriendsListActionType) => {
  switch (action.type) {
    case FRIENDS_LIST_REQUEST:
      return { loading: true };
    case FRIENDS_LIST_SUCCESS:
      return { loading: false, friends: action.payload };
    case FRIENDS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case FRIENDS_LIST_RESET:
      return { friends: [] };
    default:
      return state;
  }
};

export const friendsSuggestionsListReducer = (
  state = { friendsSuggestions: [] },
  action: FriendsSuggestionsListActionType
) => {
  switch (action.type) {
    case FRIENDS_SUGGESTIONS_LIST_REQUEST:
      return { loading: true };
    case FRIENDS_SUGGESTIONS_LIST_SUCCESS:
      return { loading: false, friendsSuggestions: action.payload };
    case FRIENDS_SUGGESTIONS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case FRIENDS_SUGGESTIONS_LIST_RESET:
      return { friendsSuggestions: [] };
    default:
      return state;
  }
};

export const friendsRequestsSentListReducer = (
  state = { friendRequestsSent: [] },
  action: FriendsRequestsSentListActionType
) => {
  switch (action.type) {
    case FRIENDS_REQUESTS_SENT_REQUEST:
      return { loading: true };
    case FRIENDS_REQUESTS_SENT_SUCCESS:
      return { loading: false, friendsRequestsSent: action.payload };
    case FRIENDS_REQUESTS_SENT_FAIL:
      return { loading: false, error: action.payload };
    case FRIENDS_REQUESTS_SENT_RESET:
      return { friendRequestsSent: [] };
    default:
      return state;
  }
};

export const friendsRequestsReceivedListReducer = (
  state = { friendRequestsReceived: [] },
  action: FriendsRequestsReceivedListActionType
) => {
  switch (action.type) {
    case FRIENDS_REQUESTS_RECEIVED_REQUEST:
      return { loading: true };
    case FRIENDS_REQUESTS_RECEIVED_SUCCESS:
      return { loading: false, friendsRequestsReceived: action.payload };
    case FRIENDS_REQUESTS_RECEIVED_FAIL:
      return { loading: false, error: action.payload };
    case FRIENDS_REQUESTS_RECEIVED_RESET:
      return { friendRequestsReceived: [] };
    default:
      return state;
  }
};

export const friendRequestStatusUpdateReducer = (
  state = {},
  action: FriendRequestStatusUpdateActionType
) => {
  switch (action.type) {
    case FRIEND_REQUEST_STATUS_UPDATE_REQUEST:
      return { loading: true };
    case FRIEND_REQUEST_STATUS_UPDATE_SUCCESS:
      return { loading: false, school: action.payload, success: true };
    case FRIEND_REQUEST_STATUS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case FRIEND_REQUEST_STATUS_UPDATE_RESET:
      return { };
    default:
      return state;
  }
};

export const friendUnfriendReducer = (state = {}, action: FriendUnfriendActionType) => {
  switch (action.type) {
    case FRIEND_UNFRIEND_REQUEST:
      return { loading: true };
    case FRIEND_UNFRIEND_SUCCESS:
      return { loading: false, success: true };
    case FRIEND_UNFRIEND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
