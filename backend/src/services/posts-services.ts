import errors from '../constants/service-errors.js';
import Image from '../models/Image.js';
import PostType, { newPostType } from '../models/PostType.js';
import PostsData from '../models/PostsData.js';
import RolesType from '../models/RolesType.js';
import rolesEnum from '../constants/roles.enum.js';
import UsersData from '../models/UsersData.js';
import LocationsData from '../models/LocationsData.js';
import UserType from '../models/UserType.js';
import ImagesData from '../models/ImagesData.js';
import imagesServices from '../services/images-services.js';

const getAllMyPosts =
  (postsData: PostsData) =>
  async (
    userId: number,
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number
  ) => {
    const isProfileOwnerFriend = true; //TODO find if user is a friend

    if (!isProfileOwnerFriend) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        post: null
      };
    }

    const result = await postsData.getAllMyPosts(userId, search, filter, sort, pageSize, page);

    return {
      error: null,
      posts: result
    };
  };

const getPostById =
  (postsData: PostsData) =>
  async (postId: number, userId: number, isProfileOwner: boolean, role: RolesType) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      const isProfileOwnerFriend = true; //TODO find if user is a friend

      if (!isProfileOwnerFriend) {
        return {
          error: errors.OPERATION_NOT_PERMITTED,
          post: null
        };
      }
    }

    const post = await postsData.getBy('post_id', postId, role);

    if (!post) {
      return {
        error: errors.RECORD_NOT_FOUND,
        post: null
      };
    }

    return {
      error: null,
      post
    };
  };

const createPost =
  (postsData: PostsData, locationsData: LocationsData, imagesData: ImagesData) =>
  async (userId: number, createData: newPostType) => {
    // create city and country
    if (createData?.city && createData?.country) {
      let existingCity = await locationsData.getLocation(createData.city);

      if (!existingCity) {
        existingCity = await locationsData.createLocation(createData.city, createData.country);
      }
    }  

    
    const newPost = await postsData.create(userId, createData);

    
    if (createData?.taggedFriends) {
      await Promise.all(
        createData.taggedFriends.map((taggedFriend: UserType) =>
          postsData.tagFriendToPost(taggedFriend.userId, newPost.postId)
        )
      );
    }

    await Promise.all(createData.images.map((image) => imagesData.uploadImage(image)));

    await Promise.all(
      createData.images.map((image) => imagesData.addPostImage(+newPost.postId, image))
    );

    const finalPost = await postsData.getBy('post_id', newPost.postId);

    
    return {
      error: null,
      post: finalPost
    };
  };

const updatePost =
  (postsData: PostsData, usersData: UsersData, locationsData: LocationsData) =>
  async (
    postId: number,
    userId: number,
    isProfileOwner: boolean,
    role: RolesType,
    updatedData: PostType
  ) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        post: null
      };
    }

    // create city and country
    if (updatedData.city && updatedData.country) {
      let existingCity = await locationsData.getLocation(updatedData.city);

      if (!existingCity) {
        existingCity = await locationsData.createLocation(updatedData.city, updatedData.country);
      }
    }

    const existingPost = await postsData.getBy('post_id', +postId, 'admin');

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        post: null
      };
    }

    const updated = { ...existingPost, ...updatedData };
    const result = await postsData.update(updated);

    return {
      error: null,
      result
    };
  };

const deletePost =
  (postsData: PostsData) => async (postId: number, isProfileOwner: boolean, role: RolesType) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        post: null
      };
    }

    const postToDelete = await postsData.getBy('post_id', postId, 'admin');

    if (!postToDelete) {
      return {
        error: errors.RECORD_NOT_FOUND,
        post: null
      };
    }

    await postsData.remove(postToDelete);

    return {
      error: null,
      post: { ...postToDelete, isDeleted: 1 }
    };
  };

export default {
  getAllMyPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
