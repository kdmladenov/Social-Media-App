import errors from '../constants/service-errors.js';
import ImagesData from '../models/ImagesData.js';
import PostsData from '../models/PostsData.js';

const addPostImage =
  (imagesData: ImagesData, postsData: PostsData) =>
  async (postId: number, imageUrl: string) => {
    const existingPost = await postsData.getBy('post_id', postId, 'basic');

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }
    // const existingImagesList = await imagesData.getAllPostImages(+postId);
    
    // TODO - fetch imageId
    const imageId = 10

    return {
      error: null,
      result: await imagesData.addPostImage(+postId, +imageId)
    };
  };

const deletePostImage = (imagesData: ImagesData) => async (postId: number, imageId: number) => {
  const postImageToDelete = await imagesData.getPostImage(+postId, +imageId);

  if (!postImageToDelete) {
    return {
      error: errors.RECORD_NOT_FOUND,
      deletedImage: null
    };
  }

  await imagesData.remove(+postId, +imageId);

  return {
    error: null,
    deletedImage: { ...postImageToDelete, isDeleted: 1 }
  };
};

export default {
  addPostImage,
  deletePostImage
};
