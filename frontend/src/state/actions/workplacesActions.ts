import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../constants/constants';
import WorkplaceDeleteActionType from '../../models/state/actions/WorkplaceDeleteActionType';
import WorkplaceDetailsActionType from '../../models/state/actions/WorkplaceDetailsActionType';
import WorkplaceListActionType from '../../models/state/actions/WorkplaceListActionType';
import WorkplaceCreateActionType from '../../models/state/actions/WorkplaceCreateActionType';
import WorkplaceUpdateActionType from '../../models/state/actions/WorkplaceUpdateActionType';
import StateType from '../../models/state/StateType';
import WorkplaceType from '../../models/WorkplaceType';
import {
  WORKPLACE_DELETE_FAIL,
  WORKPLACE_DELETE_REQUEST,
  WORKPLACE_DELETE_SUCCESS,
  WORKPLACE_DETAILS_FAIL,
  WORKPLACE_DETAILS_REQUEST,
  WORKPLACE_DETAILS_SUCCESS,
  WORKPLACE_LIST_FAIL,
  WORKPLACE_LIST_REQUEST,
  WORKPLACE_LIST_SUCCESS,
  WORKPLACE_CREATE_FAIL,
  WORKPLACE_CREATE_REQUEST,
  WORKPLACE_CREATE_SUCCESS,
  WORKPLACE_UPDATE_FAIL,
  WORKPLACE_UPDATE_REQUEST,
  WORKPLACE_UPDATE_SUCCESS
} from '../constants/workplaceConstants';

export const createWorkplace =
  ( createData: WorkplaceType) =>
  async (dispatch: Dispatch<WorkplaceCreateActionType>, getState: () => StateType) => {
    try {
      dispatch({ type: WORKPLACE_CREATE_REQUEST });

      // access to the logged in user info
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(`${BASE_URL}/workplaces`, createData, config);

      dispatch({
        type: WORKPLACE_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: WORKPLACE_CREATE_FAIL,
          payload: error?.response?.data?.message ? error.response.data.message : error.message
        });
    }
  };

export const getWorkplaceDetails =
  (workplaceId: number) =>
  async (dispatch: Dispatch<WorkplaceDetailsActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: WORKPLACE_DETAILS_REQUEST
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

      const { data } = await axios.get(`${BASE_URL}/workplaces/${workplaceId}`, config);

      dispatch({
        type: WORKPLACE_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: WORKPLACE_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const updateWorkplace =
  (workplaceId: number, updatedWorkplaceData: WorkplaceType) =>
  async (dispatch: Dispatch<WorkplaceUpdateActionType>, getState: () => StateType) => {
    console.log(workplaceId, updatedWorkplaceData, 'updateWorkplaceAction');
    try {
      dispatch({
        type: WORKPLACE_UPDATE_REQUEST
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
        `${BASE_URL}/workplaces/${workplaceId}`,
        updatedWorkplaceData,
        config
      );

      dispatch({
        type: WORKPLACE_UPDATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: WORKPLACE_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listWorkplaces =
  (endpoint = '') =>
  async (dispatch: Dispatch<WorkplaceListActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: WORKPLACE_LIST_REQUEST
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

      const { data } = await axios.get(`${BASE_URL}/workplaces?${endpoint}`, config);

      dispatch({
        type: WORKPLACE_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: WORKPLACE_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const deleteWorkplace =
  (workplaceId: number) =>
  async (dispatch: Dispatch<WorkplaceDeleteActionType>, getState: () => StateType) => {
    try {
      dispatch({
        type: WORKPLACE_DELETE_REQUEST
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

      await axios.delete(`${BASE_URL}/workplaces/${workplaceId}`, config);

      dispatch({
        type: WORKPLACE_DELETE_SUCCESS
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: WORKPLACE_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
