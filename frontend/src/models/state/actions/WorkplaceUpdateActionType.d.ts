import WorkplaceType from '../../WorkplaceType';

interface WorkplaceUpdateActionRequest {
  type: 'WORKPLACE_UPDATE_REQUEST';
}
interface WorkplaceUpdateActionSuccess {
  type: 'WORKPLACE_UPDATE_SUCCESS';
  payload: WorkplaceType;
}
interface WorkplaceUpdateActionError {
  type: 'WORKPLACE_UPDATE_FAIL';
  payload: string;
}
interface WorkplaceUpdateActionReset {
  type: 'WORKPLACE_UPDATE_RESET';
}

type WorkplaceUpdateActionType =
  | WorkplaceUpdateActionRequest
  | WorkplaceUpdateActionSuccess
  | WorkplaceUpdateActionError
  | WorkplaceUpdateActionReset;

export default WorkplaceUpdateActionType;
