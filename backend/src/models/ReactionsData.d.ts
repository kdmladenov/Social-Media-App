import ReactionType from './ReactionType';

interface ReactionsData {
  getAllPostReactions: (postId: number) => Promise<ReactionType[]>;
  getPostReactionBy: (column: string, value: string | number, userId?: number ) => Promise<ReactionsType>;
  createPostReaction: (
    userId: number,
    postId: number,
    reactionName: string
  ) => Promise<ReactionType>;
  updatePostReaction: (reactionName: string, reactionId: number) => Promise<ReactionType>;
  deletePostReaction: (reactionId: number) => Promise<void>;
  getAllCommentReactions: (commentId: number) => Promise<ReactionType[]>;
  getCommentReactionBy: (column: string, value: string | number, userId?: number) => Promise<ReactionsType>;
  createCommentReaction: (
    userId: number,
    commentId: number,
    reactionName: string
  ) => Promise<ReactionType>;
  updateCommentReaction: (reactionName: string, reactionId: number) => Promise<ReactionType>;
  deleteCommentReaction: (reactionId: number) => Promise<void>;
}

export default ReactionsData;
