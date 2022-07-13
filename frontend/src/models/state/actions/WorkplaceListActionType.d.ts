import WorkplaceType from '../../WorkplaceType';

interface WorkplaceListActionRequest {
  type: 'WORKPLACE_LIST_REQUEST';
}
interface WorkplaceListActionSuccess {
  type: 'WORKPLACE_LIST_SUCCESS';
  payload: WorkplaceType[];
}
interface WorkplaceListActionError {
  type: 'WORKPLACE_LIST_FAIL';
  payload: string;
}
interface WorkplaceListActionReset {
  type: 'WORKPLACE_LIST_RESET';
}

type WorkplaceListActionType =
  | WorkplaceListActionRequest
  | WorkplaceListActionSuccess
  | WorkplaceListActionError
  | WorkplaceListActionReset;

export default WorkplaceListActionType;
