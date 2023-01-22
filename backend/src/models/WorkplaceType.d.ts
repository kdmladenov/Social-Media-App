import FeelingTypes from './FeelingTypes';

interface WorkplaceType {
  workplaceId: number;
  userId: number;
  companyName: string;
  position: string;
  cityId: number;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  isDeleted: boolean;
}

export default WorkplaceType;
