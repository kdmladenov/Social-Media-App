import CommentImageType from './CommentImageType.js';
import CommentType from './CommentType.js';

interface CommentsImagesData {
  createPostImageComment: (
    content: string,
    authorId: number,
    postId: number,
    imageId: number,
    replyTo: number | null
  ) => Promise<any>;
  getAllPostImageComments: (
    postId: number,
    imageId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => Promise<CommentImageType[]>;
  getPostImageCommentBy: (column: string, value: string | number) => Promise<CommentImageType>;
  updatePostImageComment: (
    content: string,
    postImageCommentId: number,
    authorId: number,
    role: RolesType
  ) => Promise<CommentType>;
  removePostImageComment: (
    postImageCommentId: number,
    authorId: number,
    role: RolesType
  ) => Promise<CommentType>;
}

export default CommentsImagesData;
