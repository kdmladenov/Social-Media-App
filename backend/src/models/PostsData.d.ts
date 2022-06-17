import PostImageType from './PostImageType.js';
import PostType from './PostType.js';

interface PostsData {
  getAllPosts: (
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number,
    role: RolesType
  ) => Promise<PostType[]>;
  getBy: (column: string, value: string | number, role?: RolesType) => Promise<PostType>;
  create: (post: PostType) => Promise<PostType>;
  update: (updatedPost: PostType) => Promise<PostType>;
  remove: (postToDelete: PostType) => Promise<any>;
}

export default PostsData;
