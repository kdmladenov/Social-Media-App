import SchoolType from '../../SchoolType';

interface SchoolUpdateActionRequest {
  type: 'SCHOOL_UPDATE_REQUEST';
}
interface SchoolUpdateActionSuccess {
  type: 'SCHOOL_UPDATE_SUCCESS';
  payload: SchoolType;
}
interface SchoolUpdateActionError {
  type: 'SCHOOL_UPDATE_FAIL';
  payload: string;
}
interface SchoolUpdateActionReset {
  type: 'SCHOOL_UPDATE_RESET';
}

type SchoolUpdateActionType =
  | SchoolUpdateActionRequest
  | SchoolUpdateActionSuccess
  | SchoolUpdateActionError
  | SchoolUpdateActionReset;

export default SchoolUpdateActionType;
