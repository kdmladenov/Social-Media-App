import CommentCreateActionType from '../../types/context/actions/CommentCreateActionType';
import CommentDeleteActionType from '../../types/context/actions/CommentDeleteActionType';
import CommentEditActionType from '../../types/context/actions/CommentEditActionType';
import CommentsListActionType from '../../types/context/actions/CommentsListActionType';
import ImageCommentCreateActionType from '../../types/context/actions/ImageCommentCreateActionType';
import ImageCommentDeleteActionType from '../../types/context/actions/ImageCommentDeleteActionType';
import ImageCommentEditActionType from '../../types/context/actions/ImageCommentEditActionType';
import ImageCommentsListActionType from '../../types/context/actions/ImageCommentsListActionType';
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
  COMMENT_LIST_RESET,
  IMAGE_COMMENT_CREATE_REQUEST,
  IMAGE_COMMENT_CREATE_SUCCESS,
  IMAGE_COMMENT_CREATE_FAIL,
  IMAGE_COMMENT_CREATE_RESET,
  IMAGE_COMMENT_LIST_REQUEST,
  IMAGE_COMMENT_LIST_SUCCESS,
  IMAGE_COMMENT_LIST_FAIL,
  IMAGE_COMMENT_LIST_RESET,
  IMAGE_COMMENT_EDIT_REQUEST,
  IMAGE_COMMENT_EDIT_SUCCESS,
  IMAGE_COMMENT_EDIT_FAIL,
  IMAGE_COMMENT_EDIT_RESET,
  IMAGE_COMMENT_DELETE_REQUEST,
  IMAGE_COMMENT_DELETE_SUCCESS,
  IMAGE_COMMENT_DELETE_FAIL
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

export const imageCommentCreateReducer = (state = { imageComment: {} }, action: ImageCommentCreateActionType) => {
  switch (action.type) {
    case IMAGE_COMMENT_CREATE_REQUEST:
      return { loading: true };
    case IMAGE_COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, imageComment: action.payload };
    case IMAGE_COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case IMAGE_COMMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const imageCommentsListReducer = (
  state = { imageComments: {} },
  action: ImageCommentsListActionType
) => {
  //  state.postComments: {postId: imageComment}

  switch (action.type) {
    case IMAGE_COMMENT_LIST_REQUEST:
      return { loading: true };
    case IMAGE_COMMENT_LIST_SUCCESS:
      return {
        loading: false,
        imageComments: {
          ...state.imageComments,
          [`${action.payload.postId}/${action.payload.imageId}`]: action.payload.imageComments
        }
      };
    case IMAGE_COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case IMAGE_COMMENT_LIST_RESET:
      return { imageComments: [] };
    default:
      return state;
  }
};

export const imageCommentEditReducer = (
  state = { imageComment: {} },
  action: ImageCommentEditActionType
) => {
  switch (action.type) {
    case IMAGE_COMMENT_EDIT_REQUEST:
      return { loading: true };
    case IMAGE_COMMENT_EDIT_SUCCESS:
      return { loading: false, success: true, imageComment: action.payload };
    case IMAGE_COMMENT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case IMAGE_COMMENT_EDIT_RESET:
      return { imageComment: {} };
    default:
      return state;
  }
};

export const imageCommentDeleteReducer = (state = {}, action: ImageCommentDeleteActionType) => {
  switch (action.type) {
    case IMAGE_COMMENT_DELETE_REQUEST:
      return { loading: true };
    case IMAGE_COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case IMAGE_COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
