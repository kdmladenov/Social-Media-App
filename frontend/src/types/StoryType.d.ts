interface StoryType {
  storyId: number;
  image?: string;
  imageId?: number;
  message?: string;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userAvatar: string;
  locationId?: number;
  city?: string;
  country?: string;
  feelingType?: string;
  feelingTypeId?: string;
  updatedAt?: string | Date;
  createdAt: string | Date;
  isDeleted: boolean;
  totalDBItems: number;
}

export default StoryType;
