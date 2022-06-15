import errors from '../constants/service-errors.js';
import Image from '../models/Image.js';
import PostType from '../models/PostType.js';
import PostImagesData from '../models/PostImagesData.js';
import PostsData from '../models/PostsData.js';
import RolesType from '../models/RolesType.js';
import rolesEnum from '../constants/roles.enum.js';
import UsersData from '../models/UsersData.js';

const getAllPosts =
  (postsData: PostsData) =>
  async (
    userId: number,
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number,
    role: RolesType,
    isProfileOwner: boolean
  ) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      const isProfileOwnerFriend = true; //TODO find if user is a friend

      if (!isProfileOwnerFriend) {
        return {
          error: errors.OPERATION_NOT_PERMITTED,
          post: null
        };
      }
    }
    const result = await postsData.getAllPosts(search, filter, sort, pageSize, page, role);

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

const createPost = (postsData: PostsData, usersData: UsersData) => async (data: PostType) => {
  // create city and country
  if (data.city && data.country) {
    let existingCity = await usersData.getLocation(data.city);

    if (!existingCity) {
      existingCity = await usersData.createLocation(data.city, data.country);
    }
  }

  return {
    error: null,
    post: await postsData.create(data)
  };
};

const updatePost =
  (postsData: PostsData, usersData: UsersData) =>
  async (
    postId: number,
    userId: number,
    isProfileOwner: boolean,
    role: RolesType,
    updatedData: PostType
  ) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      const isProfileOwnerFriend = true; //TODO find if user is a friend

      if (!isProfileOwnerFriend) {
        return {
          error: errors.OPERATION_NOT_PERMITTED,
          post: null
        };
      }
    }

    // create city and country
    if (updatedData.city && updatedData.country) {
      let existingCity = await usersData.getLocation(updatedData.city);

      if (!existingCity) {
        existingCity = await usersData.createLocation(updatedData.city, updatedData.country);
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

const getAllPostImages =
  (postsImagesData: PostImagesData, postsData: PostsData) => async (postId: number) => {
    const existingPost = await postsData.getBy('post_id', +postId, 'basic');

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    return {
      error: null,
      result: await postsImagesData.getAllPostImages(+postId)
    };
  };

const addPostImage =
  (postsImagesData: PostImagesData, postsData: PostsData) =>
  async (postId: number, imageUrl: string) => {
    const existingPost = await postsData.getBy('post_id', postId, 'basic');

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const existingImagesList = await postsImagesData.getAllPostImages(+postId);

    const isMainImage = existingImagesList.length === 0 ? 1 : 0;

    return {
      error: null,
      result: await postsImagesData.addPostImage(+postId, imageUrl, +isMainImage)
    };
  };

const deletePostImage = (postsImagesData: PostImagesData) => async (postImageId: number) => {
  const postImageToDelete = await postsImagesData.getPostImageBy(
    'post_image_id',
    +postImageId,
    'basic'
  );

  if (!postImageToDelete) {
    return {
      error: errors.RECORD_NOT_FOUND,
      deletedImage: null
    };
  }

  await postsImagesData.remove(+postImageId);

  return {
    error: null,
    deletedImage: { ...postImageToDelete, isDeleted: 1 }
  };
};

const setPostImageAsMain = (postsImagesData: PostImagesData) => async (postImageId: number) => {
  const newMainPostImage = await postsImagesData.getPostImageBy('post_image_id', +postImageId);

  if (!newMainPostImage) {
    return {
      error: errors.RECORD_NOT_FOUND,
      newMainImage: null
    };
  }
  const allPostImages = await postsImagesData.getAllPostImages(+newMainPostImage.postId);

  const oldMainPost = allPostImages.filter((image: Image) => image.isMain)[0];

  await postsImagesData.update({ ...oldMainPost, isMain: 0 });

  return {
    error: null,
    newMainImage: await postsImagesData.update({ ...newMainPostImage, isMain: 1 })
  };
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addPostImage,
  getAllPostImages,
  deletePostImage,
  setPostImageAsMain
};
