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
  getPostImageReactionBy: (
    column: string,
    value: string | number,
    userId?: number
  ) => Promise<ReactionsType>;
  deletePostImageReaction: (reactionPostImageId: number) => Promise<void>;
}

export default ReactionsImagesData;
