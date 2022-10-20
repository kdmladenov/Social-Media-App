import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import PostsData from '../models/PostsData.js';
import RolesType from '../models/RolesType.js';
import ReactionsData from '../models/ReactionsData.js';
import CommentsData from '../models/CommentsData.js';
import ImagesData from '../models/ImagesData.js';
import ReactionsImagesData from '../models/ReactionsImagesData.js';
import CommentsImagesData from '../models/CommentsImagesData.js';

const getAllPostImageReactions =
  (reactionsImagesData: ReactionsImagesData, imagesData: ImagesData) =>
  async (postId: number, imageId: number) => {
    const existingImage = await imagesData.getPostImage(postId, imageId);
    if (!existingImage) {
      return {
        error: errors.RECORD_NOT_FOUND,
        postImageReactions: null
      };
    }

    const postImageReactions = await reactionsImagesData.getAllPostImageReactions(postId, imageId);

    return {
      error: null,
      postImageReactions
    };
  };

const createPostImageReaction =
  (imagesData: ImagesData, reactionsImagesData: ReactionsImagesData) =>
  async (userId: number, postId: number, imageId: number, reactionName: string) => {
    const existingImage = await imagesData.getPostImage(postId, imageId);

    if (!existingImage) {
      return {
        error: errors.RECORD_NOT_FOUND,
        createdPostImageReaction: null
      };
    }

    const existingPostImageReaction = await reactionsImagesData.getPostImageReaction(
      +postId,
      +imageId,
      +userId
    );

    if (existingPostImageReaction) {
      if (existingPostImageReaction.reactionName === reactionName) {
        return {
          error: null,
          createdPostImageReaction: existingPostImageReaction
        };
      }

      if (existingPostImageReaction.reactionName !== reactionName) {
        const updatedPostImageReaction = await reactionsImagesData.updatePostImageReaction(
          reactionName,
          existingPostImageReaction.reactionId
        );

        return {
          error: null,
          createdPostImageReaction: updatedPostImageReaction
        };
      }
    }

    const createdPostImageReaction = await reactionsImagesData.createPostImageReaction(
      userId,
      postId,
      imageId,
      reactionName
    );

    return {
      error: null,
      createdPostImageReaction
    };
  };

const updatePostImageReaction =
  (reactionsImagesData: ReactionsImagesData) =>
  async (reactionName: string, reactionId: number, userId: number, role: RolesType) => {
    const existingPostImageReaction = await reactionsImagesData.getPostImageReactionBy(
      'reaction_post_image_id',
      +reactionId
    );

    if (!existingPostImageReaction) {
      return {
        error: errors.RECORD_NOT_FOUND,
        updatedPostImageReaction: null
      };
    }

    // checks if the user isProfileOwner or is admin
    if (+existingPostImageReaction.userId !== +userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        updatedPostImageReaction: null
      };
    }

    const updatedPostImageReaction = await reactionsImagesData.updatePostImageReaction(
      reactionName,
      reactionId
    );

    return {
      error: null,
      updatedPostImageReaction
    };
  };

const deletePostImageReaction =
  (reactionsImagesData: ReactionsImagesData) =>
  async (reactionId: number, userId: number, role: RolesType) => {
    const existingPostImageReaction = await reactionsImagesData.getPostImageReactionBy(
      'reaction_post_image_id',
      reactionId
    );

    if (!existingPostImageReaction) {
      return {
        error: errors.RECORD_NOT_FOUND,
        deletedPostImageReaction: null
      };
    }

    // checks if the user isProfileOwner or is admin
    if (+existingPostImageReaction.userId !== +userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        deletedPostImageReaction: null
      };
    }

    await reactionsImagesData.deletePostImageReaction(reactionId);

    return {
      error: null,
      deletedPostImageReaction: { ...existingPostImageReaction, isDeleted: true }
    };
  };

const getAllPostImageCommentReactions =
  (reactionsImagesData: ReactionsImagesData, commentsImagesData: CommentsImagesData) =>
  async (commentId: number) => {
    const existingComment = await commentsImagesData.getPostImageCommentBy(
      'post_image_comment_id',
      commentId
    );
    if (!existingComment) {
      return {
        error: errors.RECORD_NOT_FOUND,
        postImageCommentReactions: null
      };
    }

    const postImageCommentReactions = await reactionsImagesData.getAllPostImageCommentReactions(
      commentId
    );

    return {
      error: null,
      postImageCommentReactions
    };
  };
const createPostImageCommentReaction =
  (commentsImagesData: CommentsImagesData, reactionsImagesData: ReactionsImagesData) =>
  async (userId: number, commentId: number, reactionName: string) => {
    const existingComment = await commentsImagesData.getPostImageCommentBy(
      'post_image_comment_id',
      commentId
    );

    if (!existingComment) {
      return {
        error: errors.RECORD_NOT_FOUND,
        createdPostImageCommentReaction: null
      };
    }

    const existingPostImageCommentReaction = await reactionsImagesData.getPostImageCommentReaction(
      +commentId,
      +userId
    );

    if (existingPostImageCommentReaction) {
      if (existingPostImageCommentReaction.reactionName === reactionName) {
        return {
          error: null,
          createdPostImageCommentReaction: existingPostImageCommentReaction
        };
      }

      if (existingPostImageCommentReaction.reactionName !== reactionName) {
        const updatedPostImageCommentReaction =
          await reactionsImagesData.updatePostImageCommentReaction(
            reactionName,
            existingPostImageCommentReaction.reactionId
          );

        return {
          error: null,
          createdPostImageCommentReaction: updatedPostImageCommentReaction
        };
      }
    }

    const createdPostImageCommentReaction =
      await reactionsImagesData.createPostImageCommentReaction(userId, commentId, reactionName);

    return {
      error: null,
      createdPostImageCommentReaction
    };
  };

const updatePostImageCommentReaction =
  (reactionsImagesData: ReactionsImagesData) =>
  async (reactionName: string, commentId: number, userId: number, role: RolesType) => {
    const existingPostImageCommentReaction =
      await reactionsImagesData.getPostImageCommentReactionBy(
        'post_image_comment_id',
        +commentId,
        +userId
      );
    if (!existingPostImageCommentReaction) {
      return {
        error: errors.RECORD_NOT_FOUND,
        updatedPostImageCommentReaction: null
      };
    }

    // checks if the user isProfileOwner or is admin
    if (+existingPostImageCommentReaction.userId !== +userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        updatedPostImageCommentReaction: null
      };
    }

    const updatedPostImageCommentReaction =
      await reactionsImagesData.updatePostImageCommentReaction(reactionName, commentId);

    return {
      error: null,
      updatedPostImageCommentReaction
    };
  };

const deletePostImageCommentReaction =
  (reactionsImagesData: ReactionsImagesData) =>
  async (reactionId: number, userId: number, role: RolesType) => {
    const existingPostImageCommentReaction =
      await reactionsImagesData.getPostImageCommentReactionBy(
        'reaction_post_image_comment_id',
        reactionId
      );

    if (!existingPostImageCommentReaction) {
      return {
        error: errors.RECORD_NOT_FOUND,
        deletedPostImageCommentReaction: null
      };
    }

    // checks if the user isProfileOwner or is admin
    if (+existingPostImageCommentReaction.userId !== +userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        deletedPostImageCommentReaction: null
      };
    }

    await reactionsImagesData.deletePostImageCommentReaction(reactionId);

    return {
      error: null,
      deletedPostImageCommentReaction: { ...existingPostImageCommentReaction, isDeleted: true }
    };
  };

export default {
  getAllPostImageReactions,
  createPostImageReaction,
  updatePostImageReaction,
  deletePostImageReaction,
  getAllPostImageCommentReactions,
  createPostImageCommentReaction,
  updatePostImageCommentReaction,
  deletePostImageCommentReaction
};
