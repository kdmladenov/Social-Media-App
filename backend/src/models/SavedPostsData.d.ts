interface SavedPostsData {
  getAllMySavedPosts: (
    userId: number,
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number
  ) => Promise<SavedPostType[]>;
  getSavedPost: (userId: number, postId: number, role?: RolesType) => Promise<SavedPostType>;
  getAllSavedPostsByCollectionId: (userId: number, collectionId: number) => Promise<SavedPostType>;
  addSavedPost: (postId: number, userId: number, collectionId: number) => Promise<SavedPostType>;
  updateSavedPost: (postId: number, userId: number, collectionId: number) => Promise<SavedPostType>;
  removeSavedPost: (postId: number, userId: number) => Promise<void>;
  restoreSavedPost: (postId: number, userId: number) => Promise<void>;
  getAllUserCollections: (
    userId: number,
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number
  ) => Promise<CollectionType[]>;
  getCollection: (collection: string, userId: number) => Promise<CollectionType>;
  getCollectionById: (collectionId: number) => Promise<CollectionType>;
  addCollection: (collection: string, userId: number) => Promise<CollectionType>;
  updateCollection: (collectionId: number, collection: string) => Promise<void>;
  removeCollection: (collectionId: number) => Promise<void>;
}

export default SavedPostsData;
