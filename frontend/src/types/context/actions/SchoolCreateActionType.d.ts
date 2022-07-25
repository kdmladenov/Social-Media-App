import SchoolType from '../../SchoolType';

interface SchoolCreateActionRequest {
  type: 'SCHOOL_CREATE_REQUEST';
}
interface SchoolCreateActionSuccess {
  type: 'SCHOOL_CREATE_SUCCESS';
  payload: SchoolType;
}
interface SchoolCreateActionError {
  type: 'SCHOOL_CREATE_FAIL';
  payload: string;
}

type SchoolCreateActionType =
  | SchoolCreateActionRequest
  | SchoolCreateActionSuccess
  | SchoolCreateActionError;

export default SchoolCreateActionType;
