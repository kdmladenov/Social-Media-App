import PostType from './PostType';

interface SavedPostType extends PostType {
  collectionId: number;
  collection: string;
  authorId: number;
  authorFirstName: string;
  authorLastName: string;
  authorAvatar: string;
}

export default SavedPostType;
