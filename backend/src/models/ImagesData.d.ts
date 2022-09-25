import PostImageType from './PostImageType.js';
import PostType from './PostType.js';

interface ImagesData {
  getPostImage: (postId: number, imageId: number, role?: RolesType) => Promise<any>;
  uploadImage: (imageUrl: string) => Promise<any>;
  getImage: (imageId: number) => Promise<any>;
  getImageByURL: (image: string) => Promise<any>;
  getAllPostImages: (postId: number) => Promise<any>;
  getAllUserImages: (
    userId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => Promise<any>;
  addPostImage: (postId: number, image: string) => Promise<any>;
  remove: (postId: number, imageId: number) => Promise<any>;
}

export default ImagesData;
