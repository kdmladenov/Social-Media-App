import SchoolType from '../../SchoolType';

interface SchoolDetailsActionRequest {
  type: 'SCHOOL_DETAILS_REQUEST';
}
interface SchoolDetailsActionSuccess {
  type: 'SCHOOL_DETAILS_SUCCESS';
  payload: SchoolType;
}
interface SchoolDetailsActionError {
  type: 'SCHOOL_DETAILS_FAIL';
  payload: string;
}
interface SchoolDetailsActionReset {
  type: 'SCHOOL_DETAILS_RESET';
}

type SchoolDetailsActionType =
  | SchoolDetailsActionRequest
  | SchoolDetailsActionSuccess
  | SchoolDetailsActionError
  | SchoolDetailsActionReset;

export default SchoolDetailsActionType;
