import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import PostsData from '../models/PostsData.js';
import RolesType from '../models/RolesType.js';
import ReactionsData from '../models/ReactionsData.js';
import CommentsData from '../models/CommentsData.js';

const getAllPostReactions =
  (reactionsData: ReactionsData, postsData: PostsData) => async (postId: number) => {
    const existingPost = await postsData.getBy('post_id', postId);

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        postReactions: null
      };
    }

    const postReactions = await reactionsData.getAllPostReactions(postId);

    return {
      error: null,
      postReactions
    };
  };

const createPostReaction =
  (postsData: PostsData, reactionsData: ReactionsData) =>
  async (userId: number, postId: number, reactionName: string) => {
    const existingPost = await postsData.getBy('post_id', postId);

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        createdPostReaction: null
      };
    }

    const createdPostReaction = await reactionsData.createPostReaction(
      userId,
      postId,
      reactionName
    );

    return {
      error: null,
      createdPostReaction
    };
  };

const updatePostReaction =
  (reactionsData: ReactionsData) =>
  async (reactionName: string, reactionId: number, userId: number, role: RolesType) => {
    const existingReaction = await reactionsData.getPostReactionBy('reaction_id', +reactionId);

    if (!existingReaction) {
      return {
        error: errors.RECORD_NOT_FOUND,
        updatedPostReaction: null
      };
    }

    // checks if the user isProfileOwner or is admin
    if (+existingReaction.userId !== +userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        updatedPostReaction: null
      };
    }

    const updatedPostReaction = await reactionsData.updatePostReaction(reactionName, reactionId);

    return {
      error: null,
      updatedPostReaction
    };
  };

const deletePostReaction =
  (reactionsData: ReactionsData) => async (reactionId: number, userId: number, role: RolesType) => {
    const existingReaction = await reactionsData.getPostReactionBy('reaction_id', reactionId);

    if (!existingReaction) {
      return {
        error: errors.RECORD_NOT_FOUND,
        deletedPostReaction: null
      };
    }

    // checks if the user isProfileOwner or is admin
    if (+existingReaction.userId !== +userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        deletedPostReaction: null
      };
    }

    await reactionsData.deletePostReaction(reactionId);

    return {
      error: null,
      deletedPostReaction: { ...existingReaction, isDeleted: true }
    };
  };

  const getAllCommentReactions =
    (reactionsData: ReactionsData, commentsData: CommentsData) => async (commentId: number) => {
      const existingComment = await commentsData.getBy('comment_id', commentId);

      if (!existingComment) {
        return {
          error: errors.RECORD_NOT_FOUND,
          commentReactions: null
        };
      }

      const commentReactions = await reactionsData.getAllCommentReactions(commentId);

      return {
        error: null,
        commentReactions
      };
    };

  const createCommentReaction =
    (commentsData: CommentsData, reactionsData: ReactionsData) =>
    async (userId: number, commentId: number, reactionName: string) => {
      const existingComment = await commentsData.getBy('comment_id', commentId);

      if (!existingComment) {
        return {
          error: errors.RECORD_NOT_FOUND,
          createdCommentReaction: null
        };
      }

      const createdCommentReaction = await reactionsData.createCommentReaction(
        userId,
        commentId,
        reactionName
      );

      return {
        error: null,
        createdCommentReaction
      };
    };

  const updateCommentReaction =
    (reactionsData: ReactionsData) =>
    async (reactionName: string, reactionId: number, userId: number, role: RolesType) => {
      const existingReaction = await reactionsData.getCommentReactionBy('reaction_id', +reactionId);

      if (!existingReaction) {
        return {
          error: errors.RECORD_NOT_FOUND,
          updatedCommentReaction: null
        };
      }

      // checks if the user isProfileOwner or is admin
      if (+existingReaction.userId !== +userId && role !== rolesEnum.admin) {
        return {
          error: errors.OPERATION_NOT_PERMITTED,
          updatedCommentReaction: null
        };
      }

      const updatedCommentReaction = await reactionsData.updateCommentReaction(reactionName, reactionId);

      return {
        error: null,
        updatedCommentReaction
      };
    };

  const deleteCommentReaction =
    (reactionsData: ReactionsData) =>
    async (reactionId: number, userId: number, role: RolesType) => {
      const existingReaction = await reactionsData.getCommentReactionBy('reaction_id', reactionId);

      if (!existingReaction) {
        return {
          error: errors.RECORD_NOT_FOUND,
          deletedCommentReaction: null
        };
      }

      // checks if the user isProfileOwner or is admin
      if (+existingReaction.userId !== +userId && role !== rolesEnum.admin) {
        return {
          error: errors.OPERATION_NOT_PERMITTED,
          deletedCommentReaction: null
        };
      }

      await reactionsData.deleteCommentReaction(reactionId);

      return {
        error: null,
        deletedCommentReaction: { ...existingReaction, isDeleted: true }
      };
    };

export default {
  getAllPostReactions,
  createPostReaction,
  updatePostReaction,
  deletePostReaction,
  getAllCommentReactions,
  createCommentReaction,
  updateCommentReaction,
  deleteCommentReaction
};
