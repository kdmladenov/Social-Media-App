import WorkplaceType from '../../WorkplaceType';

interface WorkplaceDetailsActionRequest {
  type: 'WORKPLACE_DETAILS_REQUEST';
}
interface WorkplaceDetailsActionSuccess {
  type: 'WORKPLACE_DETAILS_SUCCESS';
  payload: WorkplaceType;
}
interface WorkplaceDetailsActionError {
  type: 'WORKPLACE_DETAILS_FAIL';
  payload: string;
}
interface WorkplaceDetailsActionReset {
  type: 'WORKPLACE_DETAILS_RESET';
}

type WorkplaceDetailsActionType =
  | WorkplaceDetailsActionRequest
  | WorkplaceDetailsActionSuccess
  | WorkplaceDetailsActionError
  | WorkplaceDetailsActionReset;

export default WorkplaceDetailsActionType;
