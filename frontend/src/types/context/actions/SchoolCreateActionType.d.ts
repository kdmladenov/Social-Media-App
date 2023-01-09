import UserType from '../../UserType';

interface SchoolCreateActionRequest {
  type: 'SCHOOL_CREATE_REQUEST';
}
interface SchoolCreateActionSuccess {
  type: 'SCHOOL_CREATE_SUCCESS';
  payload: UserType;
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
