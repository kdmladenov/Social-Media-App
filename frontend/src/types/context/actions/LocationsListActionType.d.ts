import LocationType from '../../LocationType';

interface LocationsListActionRequest {
  type: 'LOCATION_LIST_REQUEST';
}
interface LocationsListActionSuccess {
  type: 'LOCATION_LIST_SUCCESS';
  payload: LocationType[];
  success?: boolean;
}
interface LocationsListActionError {
  type: 'LOCATION_LIST_FAIL';
  payload: string;
}
interface LocationsListActionReset {
  type: 'LOCATION_LIST_RESET';
  success?: boolean;
}

type LocationsListActionType =
  | LocationsListActionRequest
  | LocationsListActionSuccess
  | LocationsListActionError
  | LocationsListActionReset;

export default LocationsListActionType;
