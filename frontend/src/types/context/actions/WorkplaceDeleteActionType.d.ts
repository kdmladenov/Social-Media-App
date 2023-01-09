import UserType from '../../UserType';

interface WorkplaceDeleteActionRequest {
  type: 'WORKPLACE_DELETE_REQUEST';
}
interface WorkplaceDeleteActionSuccess {
  type: 'WORKPLACE_DELETE_SUCCESS';
  payload: UserType;
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
