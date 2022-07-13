interface SchoolDeleteActionRequest {
  type: 'SCHOOL_DELETE_REQUEST';
}
interface SchoolDeleteActionSuccess {
  type: 'SCHOOL_DELETE_SUCCESS';
}
interface SchoolDeleteActionError {
  type: 'SCHOOL_DELETE_FAIL';
  payload: string;
}

type SchoolDeleteActionType =
  | SchoolDeleteActionRequest
  | SchoolDeleteActionSuccess
  | SchoolDeleteActionError;

export default SchoolDeleteActionType;
