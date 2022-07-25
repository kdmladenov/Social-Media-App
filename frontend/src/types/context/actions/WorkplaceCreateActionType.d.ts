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

type WorkplaceCreateActionType =
  | WorkplaceCreateActionRequest
  | WorkplaceCreateActionSuccess
  | WorkplaceCreateActionError;

export default WorkplaceCreateActionType;
