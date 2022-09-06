import UserInfoType from './UserInfoType.js';
import UserType from './UserType.js';

interface LocationsData {
  getAllLocations: (
    search: string,
    sort: string,
    page: number,
    pageSize: number,
  ) => Promise<LocationType[]>;
  getLocation: (city: string) => Promise<LocationType>;
  createLocation: (city: string, country: string) => Promise<LocationType>;
}

export default LocationsData;
