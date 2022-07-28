import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import PostsData from '../models/PostsData.js';
import CommentsData from '../models/CommentsData.js';
import RolesType from '../models/RolesType.js';
import ImagesData from '../models/ImagesData.js';
import CommentsImagesData from '../models/CommentsImagesData.js';

const getAllPostImageComments =
  (commentsImagesData: CommentsImagesData, imagesData: ImagesData) =>
  async (
    postId: number,
    imageId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => {
    const existingPostImage = await imagesData.getPostImage(postId, imageId);
    if (!existingPostImage) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const comments = await commentsImagesData.getAllPostImageComments(
      postId,
      imageId,
      search,
      sort,
      page,
      pageSize
    );

    return {
      error: null,
      result: comments
    };
  };

const createPostImageComment =
  (imagesData: ImagesData, commentsImagesData: CommentsImagesData) =>
  async (
    content: string,
    authorId: number,
    postId: number,
    imageId: number,
    replyTo: number | null
  ) => {
    const existingPostImage = await imagesData.getPostImage(postId, imageId);
    if (!existingPostImage) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const comment = await commentsImagesData.createPostImageComment(
      content,
      authorId,
      postId,
      imageId,
      replyTo
    );

    return {
      error: null,
      result: comment
    };
  };

const updatePostImageComment =
  (commentsImagesData: CommentsImagesData) =>
  async (content: string, postImageCommentId: number, authorId: number, role: RolesType) => {
    const existingComment = await commentsImagesData.getPostImageCommentBy(
      'post_image_comment_id',
      postImageCommentId
    );

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

    await commentsImagesData.updatePostImageComment(content, postImageCommentId, authorId, role);

    return {
      error: null,
      result: updated
    };
  };

const deletePostImageComment =
  (commentsImagesData: CommentsImagesData) =>
  async (postImageCommentId: number, authorId: number, role: RolesType) => {
    const existingComment = await commentsImagesData.getPostImageCommentBy(
      'post_image_comment_id',
      postImageCommentId
    );

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

    await commentsImagesData.removePostImageComment(postImageCommentId, authorId, role);

    return {
      error: null,
      result: { ...existingComment, isDeleted: true }
    };
  };

export default {
  getAllPostImageComments,
  createPostImageComment,
  updatePostImageComment,
  deletePostImageComment
};
