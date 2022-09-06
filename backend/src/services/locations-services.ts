import LocationsData from '../models/LocationsData.js';

const getAllLocations =
  (locationsData: LocationsData) =>
  async (search: string, sort: string, page: number, pageSize: number) => {
    const result = await locationsData.getAllLocations(search, sort, page, pageSize);

    return result;
  };

export default {
  getAllLocations
};
