import SchoolType from '../../SchoolType';

interface SchoolListActionRequest {
  type: 'SCHOOL_LIST_REQUEST';
}
interface SchoolListActionSuccess {
  type: 'SCHOOL_LIST_SUCCESS';
  payload: SchoolType[];
}
interface SchoolListActionError {
  type: 'SCHOOL_LIST_FAIL';
  payload: string;
}
interface SchoolListActionReset {
  type: 'SCHOOL_LIST_RESET';
}

type SchoolListActionType =
  | SchoolListActionRequest
  | SchoolListActionSuccess
  | SchoolListActionError
  | SchoolListActionReset;

export default SchoolListActionType;
