import FeelingTypes from './FeelingTypes';

interface WorkplaceType {
  workplaceId: number;
  userId: number;
  companyName: string;
  position: string;
  cityId: number;
  city: string;
  country: string;
  startDate: string | Date;
  endDate: string | Date;
  isDeleted: boolean;
}

export default WorkplaceType;
