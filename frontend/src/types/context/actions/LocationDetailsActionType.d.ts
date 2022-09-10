import LocationType from '../../LocationType';

interface LocationDetailsActionRequest {
  type: 'LOCATION_DETAILS_REQUEST';
}

interface LocationDetailsActionSuccess {
  type: 'LOCATION_DETAILS_SUCCESS';
  payload: LocationType;
}
interface LocationDetailsActionError {
  type: 'LOCATION_DETAILS_FAIL';
  payload: string;
}

type LocationDetailsActionType =
  | LocationDetailsActionRequest
  | LocationDetailsActionSuccess
  | LocationDetailsActionError;

export default LocationDetailsActionType;
