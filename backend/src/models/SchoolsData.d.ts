import SchoolImageType from './SchoolImageType.js';
import SchoolType from './SchoolType.js';

interface SchoolsData {
  getAllMySchools: (userId: number) => Promise<SchoolType[]>;
  getBy: (column: string, value: string | number, role?: RolesType) => Promise<SchoolType>;
  create: (school: SchoolType) => Promise<SchoolType>;
  update: (updatedSchool: SchoolType) => Promise<SchoolType>;
  remove: (schoolToDelete: SchoolType) => Promise<any>;
}

export default SchoolsData;
