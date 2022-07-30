import errors from '../constants/service-errors.js';
import SavedPostsData from '../models/SavedPostsData.js';
import RolesType from '../models/RolesType.js';
import rolesEnum from '../constants/roles.enum.js';
import PostsData from '../models/PostsData.js';

const getAllMySavedPosts =
  (savedPostsData: SavedPostsData) =>
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
        savedPosts: null
      };
    }

    const savedPosts = await savedPostsData.getAllMySavedPosts(
      userId,
      search,
      filter,
      sort,
      pageSize,
      page
    );

    return {
      error: null,
      savedPosts
    };
  };

const addSavedPost =
  (savedPostsData: SavedPostsData, postsData: PostsData) =>
  async (postId: number, userId: number, collection: string) => {
    const existingPost = await postsData.getBy('post_id', +postId, 'admin');

    if (!existingPost) {
      return {
        error: errors.RECORD_NOT_FOUND,
        post: null
      };
    }
    const savedPost = await savedPostsData.getSavedPost(userId, postId);
    let existingCollection = await savedPostsData.getCollection(collection, userId);

    if (savedPost) {
      return {
        error: null,
        savedPost
      };
    }

    if (!existingCollection?.collectionId) {
      existingCollection = await savedPostsData.addCollection(collection, userId);
    }

    return {
      error: null,
      savedPost: await savedPostsData.addSavedPost(postId, userId, existingCollection.collectionId)
    };
  };

const updateSavedPost =
  (savedPostsData: SavedPostsData) =>
  async (postId: number, userId: number, collection: string) => {
    const savedPost = await savedPostsData.getSavedPost(userId, postId);

    if (savedPost.userId !== userId) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        savedPost: null
      };
    }

    if (savedPost?.collection === collection) {
      return {
        error: null,
        savedPost
      };
    }

    let existingCollection = await savedPostsData.getCollection(collection, userId);

    if (!existingCollection?.collectionId) {
      existingCollection = await savedPostsData.addCollection(collection, userId);
    }

    return {
      error: null,
      savedPost: await savedPostsData.updateSavedPost(
        postId,
        userId,
        existingCollection?.collectionId
      )
    };
  };

const deleteSavedPost =
  (savedPostsData: SavedPostsData) => async (postId: number, userId: number, role: RolesType) => {
    const savedPostToDelete = await savedPostsData.getSavedPost(userId, postId);

    if (!savedPostToDelete) {
      return {
        error: errors.RECORD_NOT_FOUND,
        savedPost: null
      };
    }

    if (role !== rolesEnum.admin && savedPostToDelete.userId !== userId) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        savedPost: null
      };
    }

    await savedPostsData.removeSavedPost(postId, userId);

    return {
      error: null,
      savedPost: { ...savedPostToDelete, isDeleted: 1 }
    };
  };

const getAllUserCollections =
  (savedPostsData: SavedPostsData) =>
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
        collections: null
      };
    }

    const result = await savedPostsData.getAllUserCollections(
      userId,
      search,
      filter,
      sort,
      pageSize,
      page
    );

    return {
      error: null,
      collections: result
    };
  };

const addCollection =
  (savedPostsData: SavedPostsData) => async (userId: number, collection: string) => {
    const existingCollection = await savedPostsData.getCollection(collection, +userId);

    if (existingCollection) {
      return {
        error: null,
        createdCollection: existingCollection
      };
    }

    return {
      error: null,
      createdCollection: await savedPostsData.addCollection(collection, +userId)
    };
  };

const updateCollection =
  (savedPostsData: SavedPostsData) =>
  async (collectionId: number, userId: number, collection: string, role: RolesType) => {
    const existingCollection = await savedPostsData.getCollectionById(collectionId);

    if (existingCollection?.collection === collection) {
      return {
        error: null,
        updatedCollection: existingCollection
      };
    }

    if (existingCollection.userId !== userId && role !== rolesEnum.admin) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        updatedCollection: null
      };
    }

    await savedPostsData.updateCollection(collectionId, collection);

    return {
      error: null,
      updatedCollection: { ...existingCollection, collection }
    };
  };

const deleteCollection =
  (savedPostsData: SavedPostsData) =>
  async (collectionId: number, userId: number, role: RolesType) => {
    const collectionToDelete = await savedPostsData.getCollectionById(collectionId);

    if (!collectionToDelete) {
      return {
        error: errors.RECORD_NOT_FOUND,
        deletedCollection: null
      };
    }

    if (role !== rolesEnum.admin && collectionToDelete.userId !== userId) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        deletedCollection: null
      };
    }

    const deletedCollection = await savedPostsData.removeCollection(
      collectionToDelete.collectionId
    );

    return {
      error: null,
      deletedCollection
    };
  };

export default {
  getAllMySavedPosts,
  addSavedPost,
  updateSavedPost,
  deleteSavedPost,
  getAllUserCollections,
  addCollection,
  updateCollection,
  deleteCollection
};
