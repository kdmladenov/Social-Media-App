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
          existingPostImageReaction.reactionPostImageId
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
  async (reactionName: string, reactionPostImageId: number, userId: number, role: RolesType) => {
    const existingPostImageReaction = await reactionsImagesData.getPostImageReactionBy(
      'reaction_post_image_id',
      +reactionPostImageId
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
      reactionPostImageId
    );

    return {
      error: null,
      updatedPostImageReaction
    };
  };

const deletePostImageReaction =
  (reactionsImagesData: ReactionsImagesData) =>
  async (reactionPostImageId: number, userId: number, role: RolesType) => {
    const existingPostImageReaction = await reactionsImagesData.getPostImageReactionBy(
      'reaction_post_image_id',
      reactionPostImageId
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

    await reactionsImagesData.deletePostImageReaction(reactionPostImageId);

    return {
      error: null,
      deletedPostImageReaction: { ...existingPostImageReaction, isDeleted: true }
    };
  };

const getAllPostImageCommentReactions =
  (reactionsImagesData: ReactionsImagesData, commentsImagesData: CommentsImagesData) =>
  async (postImageCommentId: number) => {
    const existingComment = await commentsImagesData.getBy(
      'post_image_comment_id',
      postImageCommentId
    );
    if (!existingComment) {
      return {
        error: errors.RECORD_NOT_FOUND,
        postImageCommentReactions: null
      };
    }

    const postImageCommentReactions = await reactionsImagesData.getAllPostImageCommentReactions(
      postImageCommentId
    );

    return {
      error: null,
      postImageCommentReactions
    };
  };
const createPostImageCommentReaction =
  (commentsImagesData: CommentsImagesData, reactionsImagesData: ReactionsImagesData) =>
  async (userId: number, postImageCommentId: number, reactionName: string) => {
    const existingComment = await commentsImagesData.getBy(
      'post_image_comment_id',
      postImageCommentId
    );

    if (!existingComment) {
      return {
        error: errors.RECORD_NOT_FOUND,
        createdPostImageCommentReaction: null
      };
    }

    const existingPostImageCommentReaction = await reactionsImagesData.getPostImageCommentReaction(
      +postImageCommentId,
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
            existingPostImageCommentReaction.reactionPostImageCommentId
          );

        return {
          error: null,
          createdPostImageCommentReaction: updatedPostImageCommentReaction
        };
      }
    }

    const createdPostImageCommentReaction =
      await reactionsImagesData.createPostImageCommentReaction(
        userId,
        postImageCommentId,
        reactionName
      );

    return {
      error: null,
      createdPostImageCommentReaction
    };
  };

const updatePostImageCommentReaction =
  (reactionsImagesData: ReactionsImagesData) =>
  async (
    reactionName: string,
    reactionPostImageCommentId: number,
    userId: number,
    role: RolesType
  ) => {
    const existingPostImageCommentReaction =
      await reactionsImagesData.getPostImageCommentReactionBy(
        'reaction_post_image_comment_id',
        +reactionPostImageCommentId
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
      await reactionsImagesData.updatePostImageCommentReaction(
        reactionName,
        reactionPostImageCommentId
      );

    return {
      error: null,
      updatedPostImageCommentReaction
    };
  };

const deletePostImageCommentReaction =
  (reactionsImagesData: ReactionsImagesData) =>
  async (reactionPostImageCommentId: number, userId: number, role: RolesType) => {
    const existingPostImageCommentReaction =
      await reactionsImagesData.getPostImageCommentReactionBy(
        'reaction_post_image_comment_id',
        reactionPostImageCommentId
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

    await reactionsImagesData.deletePostImageCommentReaction(reactionPostImageCommentId);

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
