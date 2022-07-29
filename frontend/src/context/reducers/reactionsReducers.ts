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
  REACTIONS_POST_DELETE_FAIL,
  REACTIONS_POST_IMAGE_CREATE_REQUEST,
  REACTIONS_POST_IMAGE_CREATE_SUCCESS,
  REACTIONS_POST_IMAGE_CREATE_FAIL,
  REACTIONS_POST_IMAGE_CREATE_RESET,
  REACTIONS_POST_IMAGE_LIST_REQUEST,
  REACTIONS_POST_IMAGE_LIST_SUCCESS,
  REACTIONS_POST_IMAGE_LIST_FAIL,
  REACTIONS_POST_IMAGE_EDIT_REQUEST,
  REACTIONS_POST_IMAGE_EDIT_SUCCESS,
  REACTIONS_POST_IMAGE_EDIT_FAIL,
  REACTIONS_POST_IMAGE_EDIT_RESET,
  REACTIONS_POST_IMAGE_DELETE_REQUEST,
  REACTIONS_POST_IMAGE_DELETE_SUCCESS,
  REACTIONS_POST_IMAGE_DELETE_FAIL,
  REACTIONS_POST_IMAGE_COMMENT_LIST_REQUEST,
  REACTIONS_POST_IMAGE_COMMENT_LIST_SUCCESS,
  REACTIONS_POST_IMAGE_COMMENT_LIST_FAIL,
  REACTIONS_POST_IMAGE_COMMENT_EDIT_REQUEST,
  REACTIONS_POST_IMAGE_COMMENT_EDIT_SUCCESS,
  REACTIONS_POST_IMAGE_COMMENT_EDIT_FAIL,
  REACTIONS_POST_IMAGE_COMMENT_EDIT_RESET,
  REACTIONS_POST_IMAGE_COMMENT_DELETE_REQUEST,
  REACTIONS_POST_IMAGE_COMMENT_DELETE_SUCCESS,
  REACTIONS_POST_IMAGE_COMMENT_DELETE_FAIL,
  REACTIONS_POST_IMAGE_COMMENT_CREATE_REQUEST,
  REACTIONS_POST_IMAGE_COMMENT_CREATE_SUCCESS,
  REACTIONS_POST_IMAGE_COMMENT_CREATE_FAIL,
  REACTIONS_POST_IMAGE_COMMENT_CREATE_RESET
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

export const postImageReactionCreateReducer = (
  state = { postImageReaction: {} },
  action: ReactionsPostImageCreateActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_IMAGE_CREATE_REQUEST:
      return { loading: true };
    case REACTIONS_POST_IMAGE_CREATE_SUCCESS:
      return { loading: false, success: true, postImageReaction: action.payload };
    case REACTIONS_POST_IMAGE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REACTIONS_POST_IMAGE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postImageReactionsListReducer = (
  state = { postImageReactions: [] },
  action: ReactionsPostImageListActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_IMAGE_LIST_REQUEST:
      return { loading: true };
    case REACTIONS_POST_IMAGE_LIST_SUCCESS:
      return {
        loading: false,
        postImageReactions: {
          ...state.postImageReactions,
          [`${action.payload.postId}/${action.payload.imageId}`]: action.payload.postImageReactions
        }
      };
    case REACTIONS_POST_IMAGE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postImageReactionEditReducer = (
  state = { postImageReaction: {} },
  action: ReactionsPostImageEditActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_IMAGE_EDIT_REQUEST:
      return { loading: true };
    case REACTIONS_POST_IMAGE_EDIT_SUCCESS:
      return { loading: false, success: true, postImageReaction: action.payload };
    case REACTIONS_POST_IMAGE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case REACTIONS_POST_IMAGE_EDIT_RESET:
      return { postImageReaction: {} };
    default:
      return state;
  }
};

export const postImageReactionDeleteReducer = (
  state = {},
  action: ReactionsPostImageDeleteActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_IMAGE_DELETE_REQUEST:
      return { loading: true };
    case REACTIONS_POST_IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REACTIONS_POST_IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentPostImageReactionCreateReducer = (
  state = { postImageCommentReaction: {} },
  action: ReactionsPostImageCommentCreateActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_IMAGE_COMMENT_CREATE_REQUEST:
      return { loading: true };
    case REACTIONS_POST_IMAGE_COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, postImageCommentReaction: action.payload };
    case REACTIONS_POST_IMAGE_COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REACTIONS_POST_IMAGE_COMMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const commentPostImageReactionsListReducer = (
  state = { postImageCommentReactions: [] },
  action: ReactionsPostImageCommentsListActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_IMAGE_COMMENT_LIST_REQUEST:
      return { loading: true };
    case REACTIONS_POST_IMAGE_COMMENT_LIST_SUCCESS:
      return {
        loading: false,
        postImageCommentReactions: {
          ...state.postImageCommentReactions,
          [action.payload.commentId]: action.payload.postImageCommentReactions
        }
      };
    case REACTIONS_POST_IMAGE_COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentPostImageReactionEditReducer = (
  state = { postImageCommentReaction: {} },
  action: ReactionsPostImageCommentEditActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_IMAGE_COMMENT_EDIT_REQUEST:
      return { loading: true };
    case REACTIONS_POST_IMAGE_COMMENT_EDIT_SUCCESS:
      return { loading: false, success: true, postImageCommentReaction: action.payload };
    case REACTIONS_POST_IMAGE_COMMENT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case REACTIONS_POST_IMAGE_COMMENT_EDIT_RESET:
      return { comment: {} };
    default:
      return state;
  }
};

export const commentPostImageReactionDeleteReducer = (
  state = {},
  action: ReactionsPostImageCommentDeleteActionType
) => {
  switch (action.type) {
    case REACTIONS_POST_IMAGE_COMMENT_DELETE_REQUEST:
      return { loading: true };
    case REACTIONS_POST_IMAGE_COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REACTIONS_POST_IMAGE_COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
