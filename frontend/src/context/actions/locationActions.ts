import axios from 'axios';
import { Dispatch } from 'redux';

import { BASE_URL } from '../../data/constants';
import LocationCreateActionType from '../../types/context/actions/LocationCreateActionType';
import LocationDetailsActionType from '../../types/context/actions/LocationDetailsActionType';
import LocationsListActionType from '../../types/context/actions/LocationsListActionType';
import StoreType from '../../types/context/StoreType';
import LocationType from '../../types/LocationType';
import {
  LOCATION_CREATE_FAIL,
  LOCATION_CREATE_REQUEST,
  LOCATION_CREATE_SUCCESS,
  LOCATION_DETAILS_FAIL,
  LOCATION_DETAILS_REQUEST,
  LOCATION_DETAILS_SUCCESS,
  LOCATION_LIST_FAIL,
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS
} from '../constants/locationConstants';

export const getLocationDetails =
  (locationId: number) =>
  async (dispatch: Dispatch<LocationDetailsActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: LOCATION_DETAILS_REQUEST
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

      const { data } = await axios.get(`${BASE_URL}/location/${locationId}`, config);

      dispatch({
        type: LOCATION_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: LOCATION_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const listAllLocations =
  (endpoint = '') =>
  async (dispatch: Dispatch<LocationsListActionType>, getState: () => StoreType) => {
    try {
      dispatch({
        type: LOCATION_LIST_REQUEST
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
      console.log(endpoint, 'endpoint');
      const { data } = await axios.get(`${BASE_URL}/locations?${endpoint}`, config);
      console.log(data, 'data');
      dispatch({
        type: LOCATION_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: LOCATION_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };

export const createLocation =
  (locationData: LocationType) =>
  async (dispatch: Dispatch<LocationCreateActionType>, getState: () => StoreType) => {
    try {
      dispatch({ type: LOCATION_CREATE_REQUEST });
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(`${BASE_URL}/locations`, { locationData }, config);

      dispatch({ type: LOCATION_CREATE_SUCCESS, payload: data });
    } catch (error) {
      axios.isAxiosError(error) &&
        dispatch({
          type: LOCATION_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
    }
  };
