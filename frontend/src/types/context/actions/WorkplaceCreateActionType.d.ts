import WorkplaceType from '../../WorkplaceType';

interface WorkplaceCreateActionRequest {
  type: 'WORKPLACE_CREATE_REQUEST';
}
interface WorkplaceCreateActionSuccess {
  type: 'WORKPLACE_CREATE_SUCCESS';
  payload: WorkplaceType;
}
interface WorkplaceCreateActionError {
  type: 'WORKPLACE_CREATE_FAIL';
  payload: string;
}

interface WorkplaceCreateActionReset {
  type: 'WORKPLACE_CREATE_RESET';
}

type WorkplaceCreateActionType =
  | WorkplaceCreateActionRequest
  | WorkplaceCreateActionSuccess
  | WorkplaceCreateActionError
  | WorkplaceCreateActionReset;

export default WorkplaceCreateActionType;
