import ReactionsCommentCreateActionType from '../../models/state/actions/ReactionsCommentCreateActionType';
import ReactionsCommentDeleteActionType from '../../models/state/actions/ReactionsCommentDeleteActionType';
import ReactionsCommentEditActionType from '../../models/state/actions/ReactionsCommentEditActionType';
import ReactionsCommentsListActionType from '../../models/state/actions/ReactionsCommentsListActionType';
import ReactionsPostCreateActionType from '../../models/state/actions/ReactionsPostCreateActionType';
import ReactionsPostDeleteActionType from '../../models/state/actions/ReactionsPostDeleteActionType';
import ReactionsPostEditActionType from '../../models/state/actions/ReactionsPostEditActionType';
import ReactionsPostListActionType from '../../models/state/actions/ReactionsPostListActionType';
import {
  REACTIONS_COMMENT_LIST_FAIL,
  REACTIONS_COMMENT_LIST_REQUEST,
  REACTIONS_COMMENT_LIST_SUCCESS,
  REACTIONS_COMMENT_CREATE_FAIL,
  REACTIONS_COMMENT_CREATE_REQUEST,
  REACTIONS_COMMENT_CREATE_RESET,
  REACTIONS_COMMENT_CREATE_SUCCESS,
  REACTIONS_COMMENT_DELETE_FAIL,
  REACTIONS_COMMENT_DELETE_REQUEST,
  REACTIONS_COMMENT_DELETE_SUCCESS,
  REACTIONS_COMMENT_EDIT_FAIL,
  REACTIONS_COMMENT_EDIT_REQUEST,
  REACTIONS_COMMENT_EDIT_RESET,
  REACTIONS_COMMENT_EDIT_SUCCESS,
  REACTIONS_POST_CREATE_REQUEST,
  REACTIONS_POST_CREATE_SUCCESS,
  REACTIONS_POST_CREATE_FAIL,
  REACTIONS_POST_CREATE_RESET,
  REACTIONS_POST_LIST_REQUEST,
  REACTIONS_POST_LIST_SUCCESS,
  REACTIONS_POST_LIST_FAIL,
  REACTIONS_POST_EDIT_REQUEST,
  REACTIONS_POST_EDIT_SUCCESS,
  REACTIONS_POST_EDIT_FAIL,
  REACTIONS_POST_EDIT_RESET,
  REACTIONS_POST_DELETE_REQUEST,
  REACTIONS_POST_DELETE_SUCCESS,
  REACTIONS_POST_DELETE_FAIL
} from '../constants/reactionsConstants';

export const postReactionCreateReducer = (
  state = { postReaction: {} },
  action: ReactionsPostCreateActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_CREATE_REQUEST:
      return { loading: true };
    case REACTIONS_POST_CREATE_SUCCESS:
      return { loading: false, success: true, postReaction: action.payload };
    case REACTIONS_POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REACTIONS_POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postReactionsListReducer = (
  state = { postReactions: [] },
  action: ReactionsPostListActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_LIST_REQUEST:
      return { loading: true };
    case REACTIONS_POST_LIST_SUCCESS:
      return {
        loading: false,
        postReactions: { ...state.postReactions, [action.payload.postId]: action.payload.reactions }
      };
    case REACTIONS_POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postReactionEditReducer = (
  state = { postReaction: {} },
  action: ReactionsPostEditActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_EDIT_REQUEST:
      return { loading: true };
    case REACTIONS_POST_EDIT_SUCCESS:
      return { loading: false, success: true, postReaction: action.payload };
    case REACTIONS_POST_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case REACTIONS_POST_EDIT_RESET:
      return { postReaction: {} };
    default:
      return state;
  }
};

export const postReactionDeleteReducer = (state = {}, action: ReactionsPostDeleteActionType) => {
  switch (action.type) {
    case REACTIONS_POST_DELETE_REQUEST:
      return { loading: true };
    case REACTIONS_POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REACTIONS_POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentReactionCreateReducer = (
  state = { commentReaction: {} },
  action: ReactionsCommentCreateActionType
) => {
  switch (action.type) {
    case REACTIONS_COMMENT_CREATE_REQUEST:
      return { loading: true };
    case REACTIONS_COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, commentReaction: action.payload };
    case REACTIONS_COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REACTIONS_COMMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const commentReactionsListReducer = (
  state = { commentReactions: [] },
  action: ReactionsCommentsListActionType
) => {
  switch (action.type) {
    case REACTIONS_COMMENT_LIST_REQUEST:
      return { loading: true };
    case REACTIONS_COMMENT_LIST_SUCCESS:
      return {
        loading: false,
        commentReactions: {
          ...state.commentReactions,
          [action.payload.commentId]: action.payload.reactions
        }
      };
    case REACTIONS_COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentReactionEditReducer = (
  state = { commentReaction: {} },
  action: ReactionsCommentEditActionType
) => {
  switch (action.type) {
    case REACTIONS_COMMENT_EDIT_REQUEST:
      return { loading: true };
    case REACTIONS_COMMENT_EDIT_SUCCESS:
      return { loading: false, success: true, commentReaction: action.payload };
    case REACTIONS_COMMENT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case REACTIONS_COMMENT_EDIT_RESET:
      return { comment: {} };
    default:
      return state;
  }
};

export const commentReactionDeleteReducer = (
  state = {},
  action: ReactionsCommentDeleteActionType
) => {
  switch (action.type) {
    case REACTIONS_COMMENT_DELETE_REQUEST:
      return { loading: true };
    case REACTIONS_COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REACTIONS_COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
