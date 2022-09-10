import LocationType from '../../LocationType';

interface LocationCreateActionRequest {
  type: 'LOCATION_CREATE_REQUEST';
}
interface LocationCreateActionSuccess {
  type: 'LOCATION_CREATE_SUCCESS';
  payload: LocationType;
}
interface LocationCreateActionError {
  type: 'LOCATION_CREATE_FAIL';
  payload: string;
}

type LocationCreateActionType =
  | LocationCreateActionRequest
  | LocationCreateActionSuccess
  | LocationCreateActionError;

export default LocationCreateActionType;
