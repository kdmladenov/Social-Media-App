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
  updatePostImageReaction: (
    reactionName: string,
    reactionPostImageId: number
  ) => Promise<ReactionType>;
  deletePostImageReaction: (reactionPostImageId: number) => Promise<void>;
  getAllPostImageCommentReactions: (postImageCommentId: number) => Promise<ReactionType[]>;
  getPostImageCommentReactionBy: (
    column: string,
    value: string | number,
    userId?: number
  ) => Promise<ReactionsType>;
  getPostImageCommentReaction: (
    postImageCommentId: number,
    userId?: number
  ) => Promise<ReactionsType>;
  createPostImageCommentReaction: (
    userId: number,
    postImageCommentId: number,
    reactionName: string
  ) => Promise<ReactionType>;
  updatePostImageCommentReaction: (
    reactionName: string,
    reactionPostImageCommentId: number
  ) => Promise<ReactionType>;
  deletePostImageCommentReaction: (reactionPostImageCommentId: number) => Promise<void>;
}

export default ReactionsImagesData;
