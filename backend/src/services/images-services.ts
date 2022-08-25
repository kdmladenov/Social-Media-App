import errors from '../constants/service-errors.js';
import ImagesData from '../models/ImagesData.js';
import PostsData from '../models/PostsData.js';
import UsersData from '../models/UsersData.js';
import { user as userConstants } from '../constants/constants.js';
import Image from '../models/Image.js';

const uploadImage = (imagesData: ImagesData) => async (imageUrl: string) => {
  const existingImage = imagesData.getImageByURL(imageUrl);

  if (existingImage) {
    return {
      error: null,
      image: existingImage
    };
  }

  return {
    error: null,
    image: await imagesData.uploadImage(imageUrl)
  };
};

const addPostImage =
  (imagesData: ImagesData, postsData: PostsData) => async (postId: number, image: Image) => {
    const existingPost = await postsData.getBy('post_id', postId, 'basic');

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    return {
      error: null,
      result: await imagesData.addPostImage(+postId, +image.postImageId)
    };
  };

  const getAllPostImages =
    (imagesData: ImagesData) =>
    async (
      postId: number
    ) => {

      const postImages = await imagesData.getAllPostImages(postId);

      return {
        error: null,
        postImages
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

const addUserAvatar = (usersData: UsersData) => async (userId: number, imageUrl: string) => {
  const existingUser = await usersData.getBy('user_id', userId, false, 'admin');

  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const updatedUser = { ...existingUser, avatar: imageUrl };
  await usersData.updateUser(updatedUser);

  return {
    error: null,
    result: updatedUser
  };
};

const deleteUserAvatar = (usersData: UsersData) => async (userId: number) => {
  const existingUser = await usersData.getBy('user_id', userId, false, 'admin');

  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const updatedUser = { ...existingUser, avatar: userConstants.DEFAULT_AVATAR };
  await usersData.updateUser(updatedUser);

  return {
    error: null,
    result: updatedUser.avatar
  };
};

export default {
  uploadImage,
  addPostImage,
  getAllPostImages,
  deletePostImage,
  addUserAvatar,
  deleteUserAvatar
};
