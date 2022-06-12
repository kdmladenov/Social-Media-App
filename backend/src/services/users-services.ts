import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

import { DB_CONFIG, PRIVATE_KEY } from '../../config.js';

import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import { user as userConstants } from '../constants/constants.js';
import { forgotPassword } from '../constants/constants.js';
import UsersData from '../models/UsersData.js';
import UserType from '../models/UserType.js';
import RolesType from '../models/RolesType.js';

const getUser =
  (usersData: UsersData) => async (userId: number, isProfileOwner: boolean, role: RolesType) => {
    const user = await usersData.getBy('user_id', userId, isProfileOwner, role);
    if (!user) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    return {
      error: null,
      result: user
    };
  };

const getAllUsers =
  (usersData: UsersData) =>
  async (search: string, sort: string, page: number, pageSize: number, role: RolesType) => {
    const result = await usersData.getAll(search, sort, page, pageSize, role);

    return result;
  };

// register
const createUser = (usersData: UsersData) => async (user: UserType) => {
  if (user.password !== user.reenteredPassword) {
    return {
      error: errors.BAD_REQUEST,
      result: null
    };
  }

  const existingUser = await usersData.getBy('email', user.email, true);

  if (existingUser) {
    return {
      error: errors.DUPLICATE_RECORD,
      result: null
    };
  }

  // TODO location
  const hashedPassword = await bcrypt.hash(user.password, 10);

  return {
    error: null,
    result: await usersData.create({ ...user, password: hashedPassword })
  };
};

// login
const login = (usersData: UsersData) => async (email: string, password: string) => {
  const user = await usersData.loginUser(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      error: errors.INVALID_LOGIN,
      result: null
    };
  }

  return {
    error: null,
    result: user
  };
};

// change password
const changePassword =
  (usersData: UsersData) =>
  async (
    passwordData: { password: string; reenteredPassword: string; currentPassword: string },
    userId: number,
    role: RolesType
  ) => {
    const existingUser = await usersData.getBy('user_id', userId);
    if (!existingUser) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const { password: savedPassword } = await usersData.getPasswordBy('user_id', userId);
    const { password, reenteredPassword, currentPassword } = passwordData;
    // not matching passwords or the user is not admin
    if (
      password !== reenteredPassword ||
      (!(await bcrypt.compare(currentPassword, savedPassword)) && role !== rolesEnum.admin)
    ) {
      return {
        error: errors.BAD_REQUEST,
        result: null
      };
    }

    const update = await bcrypt.hash(password, 10);
    await usersData.updatePassword(userId, update);
    return {
      error: null,
      result: { message: 'The password was successfully changed' }
    };
  };

// update profile
const update = (usersData: UsersData) => async (userUpdate: UserType, userId: number) => {
  let existingUser = await usersData.getBy('user_id', userId, true);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  if (userUpdate.email) {
    const user = await usersData.getBy('email', userUpdate.email, true);
    if (user?.userId !== userId) {
      return {
        error: errors.DUPLICATE_RECORD,
        result: null
      };
    }
  }

  // update home city and country
  if (userUpdate.homeCity && userUpdate.homeCountry) {
    let existingCity = await usersData.getLocation(userUpdate.homeCity);

    if (!existingCity) {
      existingCity = await usersData.createLocation(userUpdate.homeCity, userUpdate.homeCountry);
    }

    if (existingCity.city !== existingUser.homeCity) {
      userUpdate = { ...userUpdate, homeCityId: existingCity.locationId };
    }
  }

  // update current city and country
  if (userUpdate.currentCity && userUpdate.currentCountry) {
    let existingCity = await usersData.getLocation(userUpdate.currentCity);

    if (!existingCity) {
      existingCity = await usersData.createLocation(
        userUpdate.currentCity,
        userUpdate.currentCountry
      );
    }

    if (existingCity.city !== existingUser.currentCity) {
      userUpdate = { ...userUpdate, currentCityId: existingCity.locationId };
    }
  }

  const updatedData = { ...existingUser, ...userUpdate, userId };

  await usersData.updateUser(updatedData);

  return {
    error: null,
    result: updatedData
  };
};

// delete user
const deleteUser = (usersData: UsersData) => async (userId: number) => {
  const existingUser = await usersData.getBy('user_id', userId);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  await usersData.remove(userId);

  return {
    error: null,
    result: existingUser
  };
};

const logout = (usersData: UsersData) => async (token: string) => {
  await usersData.logoutUser(token);
};

// restore deleted user
const restoreUser = (usersData: UsersData) => async (deletedUserId: number) => {
  const existingDeletedUser = await usersData.getBy('user_id', +deletedUserId, false, 'admin');
  if (!existingDeletedUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  await usersData.restore(deletedUserId);

  return {
    error: null,
    result: existingDeletedUser
  };
};

// forgotten password
const forgottenPassword = (usersData: UsersData) => async (email: string) => {
  const existingUser = await usersData.getBy('email', email, true);
  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const { password: savedPassword } = await usersData.getPasswordBy('user_id', existingUser.userId);
  const newPrivateKey = PRIVATE_KEY + savedPassword;
  const payload = {
    email: existingUser.email,
    id: existingUser.userId
  };

  const token = jwt.sign(payload, newPrivateKey, {
    expiresIn: forgotPassword.tokenExpiration
  });

  const link = `http://${DB_CONFIG.host}:${forgotPassword.frontEndPort}/resetPassword/${existingUser.userId}/${token}`;
  // Sending mail with reset link
  const transporter = nodemailer.createTransport({
    service: forgotPassword.emailService,
    auth: {
      user: DB_CONFIG.adminEmail,
      pass: DB_CONFIG.adminEmailPassword
    }
  });
  const options = {
    from: DB_CONFIG.adminEmail,
    to: `${existingUser.email}`,
    subject: 'Password reset link.',
    text: `Dear ${
      existingUser.firstName
    },\nA request has been received to reset yor password. You can do that by clicking on the below link (valid for ${forgotPassword.tokenExpiration.slice(
      0,
      -1
    )} minutes).\n
${link}\nIf you did not initiate the request, just ignore this email - your password will not be changed.`
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      return;
    }
    console.log(`Sent: + ${info.response}`);
  });

  return {
    error: null,
    result: { message: options }
  };
};

// reset password
const resetPassword =
  (usersData: UsersData) =>
  async (password: string, reenteredPassword: string, userId: number, token: string) => {
    const existingUser = await usersData.getBy('user_id', userId, true);
    if (!existingUser) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const { password: savedPassword } = await usersData.getPasswordBy('user_id', userId);
    const newPrivateKey = PRIVATE_KEY + savedPassword;
    const payload = jwt.verify(token, newPrivateKey);

    if (password !== reenteredPassword || !payload) {
      return {
        error: errors.BAD_REQUEST,
        result: null
      };
    }

    const updated = await bcrypt.hash(password, 10);
    await usersData.updatePassword(userId, updated);

    // Sending confirmation mail for the reset password
    const transporter = nodemailer.createTransport({
      service: forgotPassword.emailService,
      auth: {
        user: DB_CONFIG.adminEmail,
        pass: DB_CONFIG.adminEmailPassword
      }
    });

    const options = {
      from: DB_CONFIG.adminEmail,
      to: `${existingUser.email}`,
      subject: 'Your password has been reset.',
      text: `Dear ${existingUser.firstName},\nYour password has been reset.\nThank you!`
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        return;
      }
      console.log(`Sent: + ${info.response}`);
    });

    return {
      error: null,
      result: { email: existingUser.email, message: 'The password was successfully reset' }
    };
  };

const addUserAvatar = (usersData: UsersData) => async (userId: number, imageUrl: string) => {
  const existingUser = await usersData.getBy('user_id', userId, false, 'admin');

  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const updatedUser = { ...existingUser, avatar: imageUrl };
  await usersData.updateUser(updatedUser);

  return {
    error: null,
    result: updatedUser
  };
};

const deleteUserAvatar = (usersData: UsersData) => async (userId: number) => {
  const existingUser = await usersData.getBy('user_id', userId, false, 'admin');

  if (!existingUser) {
    return {
      error: errors.RECORD_NOT_FOUND,
      result: null
    };
  }

  const updatedUser = { ...existingUser, avatar: userConstants.DEFAULT_AVATAR };
  await usersData.updateUser(updatedUser);

  return {
    error: null,
    result: updatedUser.avatar
  };
};

export default {
  getUser,
  getAllUsers,
  createUser,
  login,
  changePassword,
  update,
  deleteUser,
  restoreUser,
  logout,
  forgottenPassword,
  resetPassword,
  addUserAvatar,
  deleteUserAvatar
};
