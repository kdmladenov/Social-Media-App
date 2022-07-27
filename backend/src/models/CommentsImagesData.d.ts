import CommentImageType from './CommentImageType.js';
import CommentType from './CommentType.js';

interface CommentsImagesData {
  create: (
    content: string,
    authorId: number,
    postId: number,
    imageId: number,
    replyTo: number | null
  ) => Promise<any>;
  getAll: (
    postId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => Promise<CommentImageType[]>;
  getBy: (column: string, value: string | number) => Promise<CommentImageType>;
  update: (
    content: string,
    postImageCommentId: number,
    authorId: number,
    role: RolesType
  ) => Promise<CommentType>;
  remove: (postImageCommentId: number, authorId: number, role: RolesType) => Promise<CommentType>;
}

export default CommentsImagesData;
