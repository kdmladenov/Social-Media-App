import CommentCreateActionType from '../../models/state/actions/CommentCreateActionType';
import CommentDeleteActionType from '../../models/state/actions/CommentDeleteActionType';
import CommentEditActionType from '../../models/state/actions/CommentEditActionType';
import CommentsListActionType from '../../models/state/actions/CommentsListActionType';
import CommentVoteActionType from '../../models/state/actions/CommentVoteActionType';
import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_RESET,
  COMMENT_CREATE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_EDIT_FAIL,
  COMMENT_EDIT_REQUEST,
  COMMENT_EDIT_RESET,
  COMMENT_EDIT_SUCCESS,
  COMMENT_VOTE_FAIL,
  COMMENT_VOTE_REQUEST,
  COMMENT_VOTE_SUCCESS,
  COMMENT_LIST_RESET
} from '../constants/commentsConstants';

export const commentCreateReducer = (state = { comment: {} }, action: CommentCreateActionType) => {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return { loading: true };
    case COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const commentsListReducer = (state = { comments: {} }, action: CommentsListActionType) => {
  //  state.postComments: {postId: comment}

  switch (action.type) {
    case COMMENT_LIST_REQUEST:
      return { loading: true };
    case COMMENT_LIST_SUCCESS:
      return {
        loading: false,
        comments: { ...state.comments, [action.payload.postId]: action.payload.comments }
      };
    case COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_LIST_RESET:
      return { comments: [] };
    default:
      return state;
  }
};

export const commentEditReducer = (state = { comment: {} }, action: CommentEditActionType) => {
  switch (action.type) {
    case COMMENT_EDIT_REQUEST:
      return { loading: true };
    case COMMENT_EDIT_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_EDIT_RESET:
      return { comment: {} };
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action: CommentDeleteActionType) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return { loading: true };
    case COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentVoteReducer = (state = {}, action: CommentVoteActionType) => {
  switch (action.type) {
    case COMMENT_VOTE_REQUEST:
      return { loading: true };
    case COMMENT_VOTE_SUCCESS:
      return { loading: false, success: true };
    case COMMENT_VOTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
