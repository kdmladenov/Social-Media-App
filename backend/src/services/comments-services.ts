import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import PostsData from '../models/PostsData.js';
import CommentsData from '../models/CommentsData.js';
import RolesType from '../models/RolesType.js';

const getAllComments =
  (commentsData: CommentsData, postsData: PostsData) =>
  async (postId: number, search: string, sort: string, page: number, pageSize: number) => {
    const existingPost = await postsData.getBy('post_id', postId);

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const comments = await commentsData.getAll(postId, search, sort, page, pageSize);

    return {
      error: null,
      result: comments
    };
  };

const createComment =
  (postsData: PostsData, commentsData: CommentsData) =>
  async (content: string, authorId: number, postId: number, replyTo: number | null) => {
    const existingPost = await postsData.getBy('post_id', postId);
    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const comment = await commentsData.create(content, authorId, postId, replyTo);

    return {
      error: null,
      result: comment
    };
  };

const updateComment =
  (commentsData: CommentsData) =>
  async (content: string, commentId: number, authorId: number, role: RolesType) => {
    const existingComment = await commentsData.getBy('comment_id', commentId);

    if (!existingComment) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    // checks if the user has asked the comment or is admin
    if (+existingComment.authorId !== +authorId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    const updated = {
      ...existingComment,
      content,
      dateEdited: new Date()
    };

    await commentsData.update(content, commentId, authorId, role);

    return {
      error: null,
      result: updated
    };
  };

const deleteComment =
  (commentsData: CommentsData) => async (commentId: number, authorId: number, role: RolesType) => {
    const existingComment = await commentsData.getBy('comment_id', commentId);

    if (!existingComment) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    // checks if the user has asked the comment or is admin
    if (+existingComment.authorId !== +authorId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    await commentsData.remove(commentId, authorId, role);

    return {
      error: null,
      result: { ...existingComment, isDeleted: true }
    };
  };

const voteComment =
  (commentsData: CommentsData) =>
  async (reactionName: string, commentId: number, userId: number) => {
    const existingCommentVote = await commentsData.getVoteBy('comment_id', commentId, userId);

    if (existingCommentVote) {
      const result = await commentsData.updateVote(reactionName, commentId, userId);
      return {
        error: null,
        result
      };
    }

    const result = await commentsData.createVote(reactionName, commentId, userId);
    return {
      error: null,
      result
    };
  };

const unVoteComment =
  (commentsData: CommentsData) => async (commentId: number, userId: number, role: RolesType) => {
    const existingCommentVote = await commentsData.getVoteBy('comment_id', commentId, userId);

    if (!existingCommentVote) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }
    // The user is not admin or has created the comment vote
    if (existingCommentVote.userId !== userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    await commentsData.removeVote(commentId, userId);

    return {
      error: null,
      result: { message: `Vote was successfully removed.` }
    };
  };

export default {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  voteComment,
  unVoteComment
};
