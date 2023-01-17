import WorkplaceType from '../../WorkplaceType';

interface WorkplaceDeleteActionRequest {
  type: 'WORKPLACE_DELETE_REQUEST';
}
interface WorkplaceDeleteActionSuccess {
  type: 'WORKPLACE_DELETE_SUCCESS';
  payload: WorkplaceType;
}
interface WorkplaceDeleteActionError {
  type: 'WORKPLACE_DELETE_FAIL';
  payload: string;
}

interface WorkplaceDeleteActionReset {
  type: 'WORKPLACE_DELETE_RESET';
}

type WorkplaceDeleteActionType =
  | WorkplaceDeleteActionRequest
  | WorkplaceDeleteActionSuccess
  | WorkplaceDeleteActionError
  | WorkplaceDeleteActionReset;

export default WorkplaceDeleteActionType;
