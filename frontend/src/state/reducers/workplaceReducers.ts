
import WorkplaceCreateActionType from '../../models/state/actions/WorkplaceCreateActionType';
import WorkplaceDeleteActionType from '../../models/state/actions/WorkplaceDeleteActionType';
import WorkplaceDetailsActionType from '../../models/state/actions/WorkplaceDetailsActionType';
import WorkplaceListActionType from '../../models/state/actions/WorkplaceListActionType';
import WorkplaceUpdateActionType from '../../models/state/actions/WorkplaceUpdateActionType';
import {
  WORKPLACE_DELETE_FAIL,
  WORKPLACE_DELETE_REQUEST,
  WORKPLACE_DELETE_SUCCESS,
  WORKPLACE_DETAILS_FAIL,
  WORKPLACE_DETAILS_REQUEST,
  WORKPLACE_DETAILS_RESET,
  WORKPLACE_DETAILS_SUCCESS,
  WORKPLACE_LIST_FAIL,
  WORKPLACE_LIST_REQUEST,
  WORKPLACE_LIST_RESET,
  WORKPLACE_LIST_SUCCESS,
  WORKPLACE_CREATE_FAIL,
  WORKPLACE_CREATE_REQUEST,
  WORKPLACE_CREATE_SUCCESS,
  WORKPLACE_UPDATE_FAIL,
  WORKPLACE_UPDATE_REQUEST,
  WORKPLACE_UPDATE_RESET,
  WORKPLACE_UPDATE_SUCCESS
} from '../constants/workplaceConstants';



export const workplaceCreateReducer = (state = {}, action: WorkplaceCreateActionType) => {
  switch (action.type) {
    case WORKPLACE_CREATE_REQUEST:
      return { loading: true };
    case WORKPLACE_CREATE_SUCCESS:
      return { loading: false, success: true, workplace: action.payload };
    case WORKPLACE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workplaceDetailsReducer = (state = { workplace: {} }, action: WorkplaceDetailsActionType) => {
  switch (action.type) {
    case WORKPLACE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case WORKPLACE_DETAILS_SUCCESS:
      return { loading: false, workplace: action.payload };
    case WORKPLACE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case WORKPLACE_DETAILS_RESET:
      return { workplace: {} };
    default:
      return state;
  }
};

export const workplaceUpdateReducer = (state = {}, action: WorkplaceUpdateActionType) => {
  switch (action.type) {
    case WORKPLACE_UPDATE_REQUEST:
      return { loading: true };
    case WORKPLACE_UPDATE_SUCCESS:
      return { loading: false, workplace: action.payload, success: true };
    case WORKPLACE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case WORKPLACE_UPDATE_RESET:
      return { workplace: {} };
    default:
      return state;
  }
};

export const workplaceListReducer = (state = { workplaces: [] }, action: WorkplaceListActionType) => {
  switch (action.type) {
    case WORKPLACE_LIST_REQUEST:
      return { loading: true };
    case WORKPLACE_LIST_SUCCESS:
      return { loading: false, workplaces: action.payload };
    case WORKPLACE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case WORKPLACE_LIST_RESET:
      return { workplaces: [] };
    default:
      return state;
  }
};

export const workplaceDeleteReducer = (state = {}, action: WorkplaceDeleteActionType) => {
  switch (action.type) {
    case WORKPLACE_DELETE_REQUEST:
      return { loading: true };
    case WORKPLACE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WORKPLACE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
