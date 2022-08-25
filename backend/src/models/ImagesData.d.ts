import PostImageType from './PostImageType.js';
import PostType from './PostType.js';

interface ImagesData {
  getPostImage: (postId: number, imageId: number, role?: RolesType) => Promise<any>;
  uploadImage: (imageUrl: string) => Promise<any>;
  getImage: (imageId: number) => Promise<any>;
  getImageByURL: (image: string) => Promise<any>;
  getAllPostImages: (postId: number) => Promise<any>;
  addPostImage: (
    postId: number,
    imageId: number
  ) => Promise<{
    postId: number;
    imageId: number;
  }>;
  remove: (postId: number, imageId: number) => Promise<any>;
}

export default ImagesData;