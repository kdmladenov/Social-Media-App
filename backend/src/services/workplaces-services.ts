import errors from '../constants/service-errors.js';
import Image from '../models/Image.js';
import WorkplaceType from '../models/WorkplaceType.js';
import WorkplacesData from '../models/WorkplacesData.js';
import RolesType from '../models/RolesType.js';
import rolesEnum from '../constants/roles.enum.js';
import UsersData from '../models/UsersData.js';

const getAllMyWorkplaces = (workplacesData: WorkplacesData) => async (userId: number) => {
  const isProfileOwnerFriend = true; //TODO find if user is a friend

  if (!isProfileOwnerFriend) {
    return {
      error: errors.OPERATION_NOT_PERMITTED,
      workplace: null
    };
  }

  const result = await workplacesData.getAllMyWorkplaces(userId);

  return {
    error: null,
    workplaces: result
  };
};

const getWorkplaceById =
  (workplacesData: WorkplacesData) =>
  async (workplaceId: number, isProfileOwner: boolean, role: RolesType) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      const isProfileOwnerFriend = true; //TODO find if user is a friend

      if (!isProfileOwnerFriend) {
        return {
          error: errors.OPERATION_NOT_PERMITTED,
          workplace: null
        };
      }
    }

    const workplace = await workplacesData.getBy('workplace_id', workplaceId, role);

    if (!workplace) {
      return {
        error: errors.RECORD_NOT_FOUND,
        workplace: null
      };
    }

    return {
      error: null,
      workplace
    };
  };

const createWorkplace =
  (workplacesData: WorkplacesData, usersData: UsersData) => async (data: WorkplaceType) => {
    // create city and country
    if (data.city && data.country) {
      let existingCity = await usersData.getLocation(data.city);

      if (!existingCity) {
        existingCity = await usersData.createLocation(data.city, data.country);
      }
    }

    return {
      error: null,
      workplace: await workplacesData.create(data)
    };
  };

const updateWorkplace =
  (workplacesData: WorkplacesData, usersData: UsersData) =>
  async (
    workplaceId: number,
    userId: number,
    isProfileOwner: boolean,
    role: RolesType,
    updatedData: WorkplaceType
  ) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        workplace: null
      };
    }

    // create city and country
    if (updatedData.city && updatedData.country) {
      let existingCity = await usersData.getLocation(updatedData.city);

      if (!existingCity) {
        existingCity = await usersData.createLocation(updatedData.city, updatedData.country);
      }
    }

    const existingWorkplace = await workplacesData.getBy('workplace_id', +workplaceId, 'admin');

    if (!existingWorkplace) {
      return {
        error: errors.RECORD_NOT_FOUND,
        workplace: null
      };
    }

    const updated = { ...existingWorkplace, ...updatedData };
    const result = await workplacesData.update(updated);

    return {
      error: null,
      result
    };
  };

const deleteWorkplace =
  (workplacesData: WorkplacesData) =>
  async (workplaceId: number, isProfileOwner: boolean, role: RolesType) => {
    if (role !== rolesEnum.admin && !isProfileOwner) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        workplace: null
      };
    }

    const workplaceToDelete = await workplacesData.getBy('workplace_id', workplaceId, 'admin');

    if (!workplaceToDelete) {
      return {
        error: errors.RECORD_NOT_FOUND,
        workplace: null
      };
    }

    await workplacesData.remove(workplaceToDelete);

    return {
      error: null,
      workplace: { ...workplaceToDelete, isDeleted: 1 }
    };
  };

export default {
  getAllMyWorkplaces,
  getWorkplaceById,
  createWorkplace,
  updateWorkplace,
  deleteWorkplace
};
