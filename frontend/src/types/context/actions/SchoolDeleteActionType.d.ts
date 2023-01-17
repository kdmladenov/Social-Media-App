import SchoolType from '../../SchoolType';

interface SchoolDeleteActionRequest {
  type: 'SCHOOL_DELETE_REQUEST';
}
interface SchoolDeleteActionSuccess {
  type: 'SCHOOL_DELETE_SUCCESS';
  payload: SchoolType;
}
interface SchoolDeleteActionError {
  type: 'SCHOOL_DELETE_FAIL';
  payload: string;
}
interface SchoolDeleteActionReset {
  type: 'SCHOOL_DELETE_RESET';
}

type SchoolDeleteActionType =
  | SchoolDeleteActionRequest
  | SchoolDeleteActionSuccess
  | SchoolDeleteActionError
  | SchoolDeleteActionReset;

export default SchoolDeleteActionType;
