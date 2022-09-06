import PostImageType from './PostImageType.js';
import PostType, { newPostType } from './PostType.js';

interface PostsData {
  getAllMyPosts: (
    userId: number,
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number
  ) => Promise<PostType[]>;
  getBy: (column: string, value: string | number, role?: RolesType) => Promise<PostType>;
  create: (userId: number, createData: newPostType) => Promise<PostType>;
  tagFriendToPost: (userId: number, postId: number) => Promise<any>;
  update: (updatedPost: PostType) => Promise<PostType>;
  remove: (postToDelete: PostType) => Promise<any>;
}

export default PostsData;
