import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../data/constants';
import SchoolDeleteActionType from '../../types/context/actions/SchoolDeleteActionType';
import SchoolDetailsActionType from '../../types/context/actions/SchoolDetailsActionType';
import SchoolListActionType from '../../types/context/actions/SchoolListActionType';
import SchoolCreateActionType from '../../types/context/actions/SchoolCreateActionType';
import SchoolUpdateActionType from '../../types/context/actions/SchoolUpdateActionType';
import StoreType from '../../types/context/StoreType';
import SchoolType from '../../types/SchoolType';
import {
  SCHOOL_DELETE_FAIL,
  SCHOOL_DELETE_REQUEST,
  SCHOOL_DELETE_SUCCESS,
  SCHOOL_DETAILS_FAIL,
  SCHOOL_DETAILS_REQUEST,
  SCHOOL_DETAILS_SUCCESS,
  SCHOOL_LIST_FAIL,
  SCHOOL_LIST_REQUEST,
  SCHOOL_LIST_SUCCESS,
  SCHOOL_CREATE_FAIL,
  SCHOOL_CREATE_REQUEST,
  SCHOOL_CREATE_SUCCESS,
  SCHOOL_UPDATE_FAIL,
  SCHOOL_UPDATE_REQUEST,
  SCHOOL_UPDATE_SUCCESS
} from '../constants/schoolConstants';

export const createSchool =
  (_: number, createData: SchoolType) =>
  async (dispatch: Dispatch<SchoolCreateActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: SCHOOL_CREATE_REQUEST });

      // access to the logged in school info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(`${BASE_URL}/schools`, createData, config);

      dispatch({
        type: SCHOOL_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: SCHOOL_CREATE_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const getSchoolDetails =
  (schoolId: number) =>
  async (dispatch: Dispatch<SchoolDetailsActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: SCHOOL_DETAILS_REQUEST
      });

      // access to the logged in school info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/schools/${schoolId}`, config);

      dispatch({
        type: SCHOOL_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: SCHOOL_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const updateSchool =
  (schoolId: number, updatedSchoolData: SchoolType) =>
  async (dispatch: Dispatch<SchoolUpdateActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: SCHOOL_UPDATE_REQUEST
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

      const { data } = await axios.put(
        `${BASE_URL}/schools/${schoolId}`,
        updatedSchoolData,
        config
      );

      dispatch({
        type: SCHOOL_UPDATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: SCHOOL_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listSchools =
  (endpoint = '') =>
  async (dispatch: Dispatch<SchoolListActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: SCHOOL_LIST_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${BASE_URL}/schools?${endpoint}`, config);

      dispatch({
        type: SCHOOL_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: SCHOOL_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteSchool =
  (schoolId: number) =>
  async (dispatch: Dispatch<SchoolDeleteActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: SCHOOL_DELETE_REQUEST
      });
      // access to the logged in school info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.delete(`${BASE_URL}/schools/${schoolId}`, config);

      dispatch({
        type: SCHOOL_DELETE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: SCHOOL_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
