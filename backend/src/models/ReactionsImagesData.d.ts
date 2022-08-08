import ReactionType from './ReactionType';

interface ReactionsImagesData {
  getAllPostImageReactions: (postId: number, imageId: number) => Promise<ReactionType[]>;
  getPostImageReactionBy: (
    column: string,
    value: string | number,
    userId?: number
  ) => Promise<ReactionsType>;
  getPostImageReaction: (
    postId: number,
    imageId: number,
    userId?: number
  ) => Promise<ReactionsType>;
  createPostImageReaction: (
    userId: number,
    postId: number,
    imageId: number,
    reactionName: string
  ) => Promise<ReactionType>;
  updatePostImageReaction: (reactionName: string, reactionId: number) => Promise<ReactionType>;
  deletePostImageReaction: (reactionId: number) => Promise<void>;
  getAllPostImageCommentReactions: (commentId: number) => Promise<ReactionType[]>;
  getPostImageCommentReactionBy: (
    column: string,
    value: string | number,
    userId?: number
  ) => Promise<ReactionsType>;
  getPostImageCommentReaction: (commentId: number, userId?: number) => Promise<ReactionsType>;
  createPostImageCommentReaction: (
    userId: number,
    commentId: number,
    reactionName: string
  ) => Promise<ReactionType>;
  updatePostImageCommentReaction: (
    reactionName: string,
    reactionId: number
  ) => Promise<ReactionType>;
  deletePostImageCommentReaction: (reactionId: number) => Promise<void>;
}

export default ReactionsImagesData;
