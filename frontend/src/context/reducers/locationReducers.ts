import LocationCreateActionType from '../../types/context/actions/LocationCreateActionType';
import LocationDetailsActionType from '../../types/context/actions/LocationDetailsActionType';
import LocationsListActionType from '../../types/context/actions/LocationsListActionType';
import {
  LOCATION_DETAILS_FAIL,
  LOCATION_DETAILS_REQUEST,
  LOCATION_DETAILS_SUCCESS,
  LOCATION_LIST_FAIL,
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_RESET,
  LOCATION_LIST_SUCCESS,
  LOCATION_CREATE_REQUEST,
  LOCATION_CREATE_SUCCESS,
  LOCATION_CREATE_FAIL
} from '../constants/locationConstants';


export const locationCreateReducer = (state = {}, action: LocationCreateActionType) => {
  switch (action.type) {
    case LOCATION_CREATE_REQUEST:
      return { loading: true };
    case LOCATION_CREATE_SUCCESS:
      return { loading: false, success: true, location: action.payload };
    case LOCATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const locationDetailsReducer = (state = { location: {} }, action: LocationDetailsActionType) => {
  switch (action.type) {
    case LOCATION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case LOCATION_DETAILS_SUCCESS:
      return { loading: false, location: action.payload };
    case LOCATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const locationsListReducer = (state = { locations: [] }, action: LocationsListActionType) => {
  switch (action.type) {
    case LOCATION_LIST_REQUEST:
      return { loading: true };
    case LOCATION_LIST_SUCCESS:
      return { loading: false, locations: action.payload };
    case LOCATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    case LOCATION_LIST_RESET:
      return { locations: [] };
    default:
      return state;
  }
};
