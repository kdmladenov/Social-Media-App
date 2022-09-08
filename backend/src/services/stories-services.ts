import errors from '../constants/service-errors.js';
import Image from '../models/Image.js';
import StoryType from '../models/StoryType.js';
import StoryImagesData from '../models/StoryImagesData.js';
import StoriesData from '../models/StoriesData.js';
import RolesType from '../models/RolesType.js';
import rolesEnum from '../constants/roles.enum.js';
import UsersData from '../models/UsersData.js';
import LocationsData from '../models/LocationsData.js';

const getAllMyStories =
  (storiesData: StoriesData) =>
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
        story: null
      };
    }

    const result = await storiesData.getAllMyStories(userId, search, filter, sort, pageSize, page);

    return {
      error: null,
      stories: result
    };
  };

const getStoryById =
  (storiesData: StoriesData) =>
  async (storyId: number, userId: number, isProfileOwner: boolean, role: RolesType) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      const isProfileOwnerFriend = true; //TODO find if user is a friend

      if (!isProfileOwnerFriend) {
        return {
          error: errors.OPERATION_NOT_PERMITTED,
          story: null
        };
      }
    }

    const story = await storiesData.getBy('story_id', storyId, role);

    if (!story) {
      return {
        error: errors.RECORD_NOT_FOUND,
        story: null
      };
    }

    return {
      error: null,
      story
    };
  };

const createStory =
  (storiesData: StoriesData, usersData: UsersData, locationsData: LocationsData) =>
  async (image: string, userId: number) => {
    // create city and country
    // if (data.city && data.country) {
    //   let existingCity = await locationsData.getLocation(data.city);

    //   if (!existingCity) {
    //     existingCity = await locationsData.createLocation(data.city, data.country);
    //   }
    // }

    return {
      error: null,
      story: await storiesData.create(image, userId)
    };
  };

const updateStory =
  (storiesData: StoriesData, usersData: UsersData, locationsData: LocationsData) =>
  async (
    storyId: number,
    userId: number,
    isProfileOwner: boolean,
    role: RolesType,
    updatedStoryData: StoryType
  ) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        story: null
      };
    }

    // create city and country
    if (updatedStoryData.city && updatedStoryData.country) {
      let existingCity = await locationsData.getLocation(updatedStoryData.city);

      if (!existingCity) {
        existingCity = await locationsData.createLocation(
          updatedStoryData.city,
          updatedStoryData.country
        );
      }
    }

    const existingStory = await storiesData.getBy('story_id', +storyId, 'admin');

    if (!existingStory) {
      return {
        error: errors.RECORD_NOT_FOUND,
        story: null
      };
    }

    const updated = { ...existingStory, ...updatedStoryData };
    const result = await storiesData.update(updated);

    return {
      error: null,
      result
    };
  };

const deleteStory =
  (storiesData: StoriesData) =>
  async (storyId: number, isProfileOwner: boolean, role: RolesType) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        story: null
      };
    }

    const storyToDelete = await storiesData.getBy('story_id', storyId, 'admin');

    if (!storyToDelete) {
      return {
        error: errors.RECORD_NOT_FOUND,
        story: null
      };
    }

    await storiesData.remove(storyToDelete);

    return {
      error: null,
      story: { ...storyToDelete, isDeleted: 1 }
    };
  };

const getAllStoryImages =
  (storiesImagesData: StoryImagesData, storiesData: StoriesData) => async (storyId: number) => {
    const existingStory = await storiesData.getBy('story_id', +storyId, 'basic');

    if (!existingStory) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    return {
      error: null,
      result: await storiesImagesData.getAllStoryImages(+storyId)
    };
  };

const addStoryImage =
  (storiesImagesData: StoryImagesData, storiesData: StoriesData) =>
  async (storyId: number, imageUrl: string) => {
    const existingStory = await storiesData.getBy('story_id', storyId, 'basic');

    if (!existingStory) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const existingImagesList = await storiesImagesData.getAllStoryImages(+storyId);

    const isMainImage = existingImagesList.length === 0 ? 1 : 0;

    return {
      error: null,
      result: await storiesImagesData.addStoryImage(+storyId, imageUrl, +isMainImage)
    };
  };

const deleteStoryImage = (storiesImagesData: StoryImagesData) => async (storyImageId: number) => {
  const storyImageToDelete = await storiesImagesData.getStoryImageBy(
    'story_image_id',
    +storyImageId,
    'basic'
  );

  if (!storyImageToDelete) {
    return {
      error: errors.RECORD_NOT_FOUND,
      deletedImage: null
    };
  }

  await storiesImagesData.remove(+storyImageId);

  return {
    error: null,
    deletedImage: { ...storyImageToDelete, isDeleted: 1 }
  };
};

// const setStoryImageAsMain = (storiesImagesData: StoryImagesData) => async (storyImageId: number) => {
//   const newMainStoryImage = await storiesImagesData.getStoryImageBy('story_image_id', +storyImageId);

//   if (!newMainStoryImage) {
//     return {
//       error: errors.RECORD_NOT_FOUND,
//       newMainImage: null
//     };
//   }
//   const allStoryImages = await storiesImagesData.getAllStoryImages(+newMainStoryImage.storyId);

//   const oldMainStory = allStoryImages.filter((image: Image) => image.isMain)[0];

//   await storiesImagesData.update({ ...oldMainStory, isMain: 0 });

//   return {
//     error: null,
//     newMainImage: await storiesImagesData.update({ ...newMainStoryImage, isMain: 1 })
//   };
// };

export default {
  getAllMyStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
  addStoryImage,
  getAllStoryImages,
  deleteStoryImage
  // setStoryImageAsMain
};
