import WorkplaceImageType from './WorkplaceImageType.js';
import WorkplaceType from './WorkplaceType.js';

interface WorkplacesData {
  getAllMyWorkplaces: (userId: number) => Promise<WorkplaceType[]>;
  getBy: (column: string, value: string | number, role?: RolesType) => Promise<WorkplaceType>;
  create: (workplace: WorkplaceType) => Promise<WorkplaceType>;
  update: (updatedWorkplace: WorkplaceType) => Promise<WorkplaceType>;
  remove: (workplaceToDelete: WorkplaceType) => Promise<any>;
}

export default WorkplacesData;
