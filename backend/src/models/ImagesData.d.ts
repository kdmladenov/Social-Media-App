import PostImageType from './PostImageType.js';
import PostType from './PostType.js';

interface ImagesData {
  getPostImage: (postId: number, imageId: number, role?: RolesType) => Promise<any>;
  addPostImage: (
    postId: number,
    imageId: number
  ) => Promise<{
    postId: number;
    imageId: number;
  }>;
  // getAllPostImages: (postId: number) => Promise<any>;
  remove: (postId: number, imageId: number) => Promise<any>;
}

export default ImagesData;