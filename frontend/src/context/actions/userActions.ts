import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../data/constants';
import ForgottenPasswordActionType from '../../types/context/actions/ForgottenPasswordActionType';
import PasswordResetActionType from '../../types/context/actions/PasswordResetActionType';
import UserAvatarDeleteActionType from '../../types/context/actions/UserAvatarDeleteActionType';
import UserAvatarUpdateActionType from '../../types/context/actions/UserAvatarUpdateActionType';
import UserDeleteActionType from '../../types/context/actions/UserDeleteActionType';
import UserDetailsActionType from '../../types/context/actions/UserDetailsActionType';
import UserListActionType from '../../types/context/actions/UserListActionType';
import UserLoginActionType from '../../types/context/actions/UserLoginActionType';
import UserRegisterActionType from '../../types/context/actions/UserRegisterActionType';
import UserRestoreActionType from '../../types/context/actions/UserRestoreActionType';
import UserUpdateProfileActionType from '../../types/context/actions/UserUpdateProfileActionType';
import StoreType from '../../types/context/StoreType';
import UserType from '../../types/UserType';
import {
  FORGOTTEN_PASSWORD_FAIL,
  FORGOTTEN_PASSWORD_REQUEST,
  FORGOTTEN_PASSWORD_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  USER_DELETE_AVATAR_FAIL,
  USER_DELETE_AVATAR_REQUEST,
  USER_DELETE_AVATAR_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESTORE_FAIL,
  USER_RESTORE_REQUEST,
  USER_RESTORE_SUCCESS,
  USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants';

export const login =
  (loginData: { email: string; password: string }) =>
  async (dispatch: Dispatch<UserLoginActionType>) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post(`${BASE_URL}/auth/login`, loginData, config);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const logout =
  () =>
  async (dispatch: Dispatch<UserLoginActionType | UserDetailsActionType | UserListActionType>) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LIST_RESET });
  };

export const register =
  (_: number, registerData: UserType) =>
  async (dispatch: Dispatch<UserRegisterActionType | UserLoginActionType>) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data: registrationData } = await axios.post(
        `${BASE_URL}/users`,
        registerData,
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: registrationData
      });

      // Auto login after the registration
      const { data: loginData } = await axios.post(
        `${BASE_URL}/auth/login`,
        { email: registerData.email, password: registerData.password },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: loginData
      });

      localStorage.setItem('userInfo', JSON.stringify(loginData));
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const getUserDetails =
  (userId: number) =>
  async (dispatch: Dispatch<UserDetailsActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST
      });

      // access to the logged in user info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/users/${userId}`, config);

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: USER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const updateUserProfile =
  (userId: number, updatedUserData: UserType) =>
  async (dispatch: Dispatch<UserUpdateProfileActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(`${BASE_URL}/users/${userId}`, updatedUserData, config);

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: USER_UPDATE_PROFILE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listUsers =
  (endpoint = '') =>
  async (dispatch: Dispatch<UserListActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST
      });
      // access to the logged in user info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/users?${endpoint}`, config);

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: USER_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteUser =
  (userId: number) =>
  async (dispatch: Dispatch<UserDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST
      });
      // access to the logged in user info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/users/${userId}`, config);

      dispatch({
        type: USER_DELETE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: USER_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const restoreUser =
  (userId: number) =>
  async (dispatch: Dispatch<UserRestoreActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: USER_RESTORE_REQUEST
      });
      // access to the logged in user info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.patch(`${BASE_URL}/users/${userId}/restore`, {}, config);

      dispatch({
        type: USER_RESTORE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: USER_RESTORE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const updateUserAvatar =
  (
    userId: number,
    mode: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.DragEvent<HTMLDivElement>,
    imageAddress?: string
  ) =>
  async (dispatch: Dispatch<UserAvatarUpdateActionType>, getState: () => StoreType) => {
    // mode: 'file_upload' or 'add_image_url'
    let imageUrl = imageAddress || '';

    try {
      dispatch({
        type: USER_UPDATE_AVATAR_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      if (mode === 'file_upload') {
        // Case file upload
        const file =
          (event.target as HTMLInputElement).files?.[0] ||
          (event as React.DragEvent<HTMLDivElement>).dataTransfer.files?.[0];
        const formData = new FormData();
        formData.append('avatar', file!);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const uploadedImageURL = await axios.post(
          `${BASE_URL}/users/avatars/upload`,
          formData,
          config
        );

        imageUrl = uploadedImageURL.data;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/users/${userId}/avatars`,
        { imageUrl },
        config
      );

      dispatch({
        type: USER_UPDATE_AVATAR_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: USER_UPDATE_AVATAR_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteUserAvatar =
  (userId: number) =>
  async (dispatch: Dispatch<UserAvatarDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: USER_DELETE_AVATAR_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`${BASE_URL}/users/${userId}/avatars`, config);

      dispatch({
        type: USER_DELETE_AVATAR_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: USER_DELETE_AVATAR_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const forgotPassword =
  (email: string) => async (dispatch: Dispatch<ForgottenPasswordActionType>) => {
    try {
      dispatch({ type: FORGOTTEN_PASSWORD_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios.post(`${BASE_URL}/users/forgotten-password`, email, config);

      dispatch({
        type: FORGOTTEN_PASSWORD_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: FORGOTTEN_PASSWORD_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const resetPassword =
  (resetData: { password: string; reenteredPassword: string; userId: number; token: string }) =>
  async (dispatch: Dispatch<PasswordResetActionType | UserLoginActionType>) => {
    const { password, reenteredPassword, userId, token } = resetData;

    try {
      dispatch({ type: PASSWORD_RESET_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/users/reset-password/${userId}/${token}`,
        { password, reenteredPassword },
        config
      );

      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: data.message
      });

      // Login after reset success
      login({ email: data.email, password });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: PASSWORD_RESET_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };
