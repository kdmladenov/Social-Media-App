import StoryImageType from './StoryImageType.js';
import StoryType from './StoryType.js';

interface StoriesData {
  getAllMyStories: (
    userId: number,
    search: string,
    filter: string | string[],
    sort: string,
    pageSize: number,
    page: number
  ) => Promise<StoryType[]>;
  getBy: (column: string, value: string | number, role?: RolesType) => Promise<StoryType>;
  create: (image: string, userId: number) => Promise<StoryType>;
  update: (updatedStory: StoryType) => Promise<StoryType>;
  remove: (storyToDelete: StoryType) => Promise<any>;
}

export default StoriesData;
