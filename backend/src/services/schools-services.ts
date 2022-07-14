import errors from '../constants/service-errors.js';
import Image from '../models/Image.js';
import SchoolType from '../models/SchoolType.js';
import SchoolsData from '../models/SchoolsData.js';
import RolesType from '../models/RolesType.js';
import rolesEnum from '../constants/roles.enum.js';
import UsersData from '../models/UsersData.js';

const getAllMySchools = (schoolsData: SchoolsData) => async (userId: number) => {
  const isProfileOwnerFriend = true; //TODO find if user is a friend

  if (!isProfileOwnerFriend) {
    return {
      error: errors.OPERATION_NOT_PERMITTED,
      school: null
    };
  }

  const result = await schoolsData.getAllMySchools(userId);

  return {
    error: null,
    schools: result
  };
};

const getSchoolById =
  (schoolsData: SchoolsData) => async (schoolId: number, userId: number, role: RolesType) => {
    const school = await schoolsData.getBy('school_id', schoolId, role);

    if (!school) {
      return {
        error: errors.RECORD_NOT_FOUND,
        school: null
      };
    }

    if (role !== rolesEnum.admin && school.userId !== userId) {
      // const isProfileOwnerFriend = true; //TODO find if user is a friend

      // if (!isProfileOwnerFriend) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        school: null
      };
      // }
    }

    return {
      error: null,
      school
    };
  };

const createSchool =
  (schoolsData: SchoolsData, usersData: UsersData) => async (data: SchoolType, userId: number) => {
    // create city and country
    if (data.city && data.country) {
      let existingCity = await usersData.getLocation(data.city);

      if (!existingCity) {
        existingCity = await usersData.createLocation(data.city, data.country);
      }
    }

    return {
      error: null,
      school: await schoolsData.create({ ...data, userId })
    };
  };

const updateSchool =
  (schoolsData: SchoolsData, usersData: UsersData) =>
  async (schoolId: number, userId: number, role: RolesType, updatedData: SchoolType) => {
    const existingSchool = await schoolsData.getBy('school_id', +schoolId, 'admin');

    if (!existingSchool) {
      return {
        error: errors.RECORD_NOT_FOUND,
        school: null
      };
    }

    if (role !== rolesEnum.admin && existingSchool.userId !== userId) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        school: null
      };
    }

    // create city and country
    if (updatedData.city && updatedData.country) {
      let existingCity = await usersData.getLocation(updatedData.city);

      if (!existingCity) {
        existingCity = await usersData.createLocation(updatedData.city, updatedData.country);
      }
    }

    const updated = { ...existingSchool, ...updatedData };
    const result = await schoolsData.update(updated);

    return {
      error: null,
      result
    };
  };

const deleteSchool =
  (schoolsData: SchoolsData) => async (schoolId: number, userId: number, role: RolesType) => {
    const schoolToDelete = await schoolsData.getBy('school_id', schoolId, 'admin');

    if (!schoolToDelete) {
      return {
        error: errors.RECORD_NOT_FOUND,
        school: null
      };
    }

    if (role !== rolesEnum.admin && schoolToDelete.userId !== userId) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        school: null
      };
    }

    await schoolsData.remove(schoolToDelete);

    return {
      error: null,
      school: { ...schoolToDelete, isDeleted: 1 }
    };
  };

export default {
  getAllMySchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool
};
