import CommentType from './CommentType.js';
import VoteType from './VoteType.js';

interface CommentsData {
  getAll: (
    postId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => Promise<CommentType[]>;
  getBy: (column: string, value: string | number) => Promise<CommentType>;
  create: (
    content: string,
    authorId: number,
    postId: number,
    replyTo: number | null
  ) => Promise<CommentType>;
  update: (
    content: string,
    commentId: number,
    authorId: number,
    role: RolesType
  ) => Promise<CommentType>;
  remove: (commentId: number, authorId: number, role: RolesType) => Promise<any>;
  getVoteBy: (column: string, value: string | number, userId: number) => Promise<VoteType>;
  createVote: (reactionName: string, commentId: number, userId: number) => Promise<VoteType>;
  updateVote: (reactionName: string, commentId: number, userId: number) => Promise<VoteType>;
  removeVote: (commentId: number, userId: number) => Promise<void>;
}

export default CommentsData;
