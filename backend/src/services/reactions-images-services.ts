import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import PostsData from '../models/PostsData.js';
import RolesType from '../models/RolesType.js';
import ReactionsData from '../models/ReactionsData.js';
import CommentsData from '../models/CommentsData.js';
import ImagesData from '../models/ImagesData.js';
import ReactionsImagesData from '../models/ReactionsImagesData.js';

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
  async (userId: number, postId: number, imageId:number, reactionName: string) => {
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

// const getAllCommentReactions =
//   (reactionsData: ReactionsData, commentsData: CommentsData) => async (commentId: number) => {
//     const existingComment = await commentsData.getBy('comment_id', commentId);

//     if (!existingComment) {
//       return {
//         error: errors.RECORD_NOT_FOUND,
//         commentReactions: null
//       };
//     }

//     const commentReactions = await reactionsData.getAllCommentReactions(commentId);

//     return {
//       error: null,
//       commentReactions
//     };
//   };

// const createCommentReaction =
//   (commentsData: CommentsData, reactionsData: ReactionsData) =>
//   async (userId: number, commentId: number, reactionName: string) => {
//     const existingComment = await commentsData.getBy('comment_id', commentId);

//     if (!existingComment) {
//       return {
//         error: errors.RECORD_NOT_FOUND,
//         createdCommentReaction: null
//       };
//     }

//     const existingReaction = await reactionsData.getCommentReactionBy('comment_id', +commentId, +userId);

//     if (existingReaction) {
//       if (existingReaction.reactionName === reactionName) {
//         return {
//           error: null,
//           createdCommentReaction: existingReaction
//         };
//       }

//       if (existingReaction.reactionName !== reactionName) {
//         const updatedCommentReaction = await reactionsData.updateCommentReaction(
//           reactionName,
//           existingReaction.reactionId
//         );

//         return {
//           error: null,
//           createdCommentReaction: updatedCommentReaction
//         };
//       }
//     }

//     const createdCommentReaction = await reactionsData.createCommentReaction(
//       userId,
//       commentId,
//       reactionName
//     );

//     return {
//       error: null,
//       createdCommentReaction
//     };
//   };

// const updateCommentReaction =
//   (reactionsData: ReactionsData) =>
//   async (reactionName: string, reactionId: number, userId: number, role: RolesType) => {
//     const existingReaction = await reactionsData.getCommentReactionBy('reaction_id', +reactionId);

//     if (!existingReaction) {
//       return {
//         error: errors.RECORD_NOT_FOUND,
//         updatedCommentReaction: null
//       };
//     }

//     // checks if the user isProfileOwner or is admin
//     if (+existingReaction.userId !== +userId && role !== rolesEnum.admin) {
//       return {
//         error: errors.OPERATION_NOT_PERMITTED,
//         updatedCommentReaction: null
//       };
//     }

//     const updatedCommentReaction = await reactionsData.updateCommentReaction(
//       reactionName,
//       reactionId
//     );

//     return {
//       error: null,
//       updatedCommentReaction
//     };
//   };

// const deleteCommentReaction =
//   (reactionsData: ReactionsData) => async (reactionId: number, userId: number, role: RolesType) => {
//     const existingReaction = await reactionsData.getCommentReactionBy('reaction_id', reactionId);

//     if (!existingReaction) {
//       return {
//         error: errors.RECORD_NOT_FOUND,
//         deletedCommentReaction: null
//       };
//     }

//     // checks if the user isProfileOwner or is admin
//     if (+existingReaction.userId !== +userId && role !== rolesEnum.admin) {
//       return {
//         error: errors.OPERATION_NOT_PERMITTED,
//         deletedCommentReaction: null
//       };
//     }

//     await reactionsData.deleteCommentReaction(reactionId);

//     return {
//       error: null,
//       deletedCommentReaction: { ...existingReaction, isDeleted: true }
//     };
//   };

export default {
  getAllPostImageReactions,
  createPostImageReaction,
  updatePostImageReaction,
  deletePostImageReaction,
  // getAllCommentReactions,
  // createCommentReaction,
  // updateCommentReaction,
  // deleteCommentReaction
};
