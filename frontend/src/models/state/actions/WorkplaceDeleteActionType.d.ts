interface WorkplaceDeleteActionRequest {
  type: 'WORKPLACE_DELETE_REQUEST';
}
interface WorkplaceDeleteActionSuccess {
  type: 'WORKPLACE_DELETE_SUCCESS';
}
interface WorkplaceDeleteActionError {
  type: 'WORKPLACE_DELETE_FAIL';
  payload: string;
}

type WorkplaceDeleteActionType =
  | WorkplaceDeleteActionRequest
  | WorkplaceDeleteActionSuccess
  | WorkplaceDeleteActionError;

export default WorkplaceDeleteActionType;
