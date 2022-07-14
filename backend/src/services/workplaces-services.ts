import errors from '../constants/service-errors.js';
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
  async (workplaceId: number, userId: number, role: RolesType) => {
    const workplace = await workplacesData.getBy('workplace_id', workplaceId, role);

    if (!workplace) {
      return {
        error: errors.RECORD_NOT_FOUND,
        workplace: null
      };
    }

    if (role !== rolesEnum.admin && workplace.userId !== userId) {
      // const isProfileOwnerFriend = true; //TODO find if user is a friend

      // if (!isProfileOwnerFriend) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        workplace: null
        // };
      };
    }

    return {
      error: null,
      workplace
    };
  };

const createWorkplace =
  (workplacesData: WorkplacesData, usersData: UsersData) =>
  async (data: WorkplaceType, userId: number) => {
    // create city and country
    if (data.city && data.country) {
      let existingCity = await usersData.getLocation(data.city);

      if (!existingCity) {
        existingCity = await usersData.createLocation(data.city, data.country);
      }
    }

    return {
      error: null,
      workplace: await workplacesData.create({ ...data, userId })
    };
  };

const updateWorkplace =
  (workplacesData: WorkplacesData, usersData: UsersData) =>
  async (workplaceId: number, userId: number, role: RolesType, updatedData: WorkplaceType) => {
    const existingWorkplace = await workplacesData.getBy('workplace_id', +workplaceId, 'admin');

    if (!existingWorkplace) {
      return {
        error: errors.RECORD_NOT_FOUND,
        workplace: null
      };
    }

    if (role !== rolesEnum.admin && existingWorkplace.userId !== userId) {
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

    const updated = { ...existingWorkplace, ...updatedData };
    const result = await workplacesData.update(updated);

    return {
      error: null,
      result
    };
  };

const deleteWorkplace =
  (workplacesData: WorkplacesData) =>
  async (workplaceId: number, userId: number, role: RolesType) => {
    const workplaceToDelete = await workplacesData.getBy('workplace_id', workplaceId, 'admin');

    if (role !== rolesEnum.admin && workplaceToDelete.userId !== userId) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        workplace: null
      };
    }

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
