import errors from '../constants/service-errors.js';
import ImagesData from '../models/ImagesData.js';
import PostsData from '../models/PostsData.js';
import UsersData from '../models/UsersData.js';
import { user as userConstants } from '../constants/constants.js';
import Image from '../models/Image.js';
import RolesType from '../models/RolesType.js';
import rolesEnum from '../constants/roles.enum.js';

const uploadImage = (imagesData: ImagesData) => async (imageUrl: string) => {
  const existingImage = await imagesData.getImageByURL(imageUrl);

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
// const uploadImages = (imagesData: ImagesData) => async (images: string[]) => {
//   const uploadedImages = [] as { imageId: number; image: string; createdAt: string | Date }[];

//   images.forEach(async (imageUrl: string) => {
//     const existingImage = await imagesData.getImageByURL(imageUrl);

//     if (existingImage) {
//       return {
//         error: null,
//         image: existingImage
//       };
//     }
//     uploadedImages.push(await imagesData.uploadImage(imageUrl));
//   });

//   return {
//     error: null,
//     images: uploadedImages
//   };
// };

const addPostImages =
  (imagesData: ImagesData, postsData: PostsData) => async (postId: number, images: string[]) => {
    const existingPost = await postsData.getBy('post_id', postId, 'basic');

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }
    await Promise.all(images.map((image: string) => uploadImage(imagesData)(image)));

    await Promise.all(images.map((image: string) => imagesData.addPostImage(+postId, image)));

    return {
      error: null,
      result: await imagesData.getAllPostImages(+postId)
    };
  };

const getAllPostImages = (imagesData: ImagesData) => async (postId: number) => {
  const postImages = await imagesData.getAllPostImages(+postId);

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

const getAllUserImages =
  (imagesData: ImagesData, usersData: UsersData) =>
  async (
    userId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number
    
  ) => {
    const existingUser = await usersData.getBy('user_id', userId, false, 'admin');

    if (!existingUser) {
      return {
        error: errors.RECORD_NOT_FOUND,
        userImages: null
      };
    }

    const userImages = await imagesData.getAllUserImages(+userId, search, sort, +page, +pageSize);

    return {
      error: null,
      userImages
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

const addUserCover = (usersData: UsersData) => async (userId: number, imageUrl: string) => {
  const existingUser = await usersData.getBy('user_id', userId, false, 'admin');

  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const updatedUser = { ...existingUser, cover: imageUrl };
  await usersData.updateUser(updatedUser);

  return {
    error: null,
    result: updatedUser
  };
};

export default {
  uploadImage,
  // uploadImages,
  addPostImages,
  getAllPostImages,
  getAllUserImages,
  deletePostImage,
  addUserAvatar,
  deleteUserAvatar,
  addUserCover
};
