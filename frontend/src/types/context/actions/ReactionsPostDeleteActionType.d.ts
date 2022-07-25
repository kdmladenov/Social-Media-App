interface ReactionsPostDeleteActionRequest {
  type: 'REACTIONS_POST_DELETE_REQUEST';
}
interface ReactionsPostDeleteActionSuccess {
  type: 'REACTIONS_POST_DELETE_SUCCESS';
}
interface ReactionsPostDeleteActionError {
  type: 'REACTIONS_POST_DELETE_FAIL';
  payload: string;
}

type ReactionsPostDeleteActionType =
  | ReactionsPostDeleteActionRequest
  | ReactionsPostDeleteActionSuccess
  | ReactionsPostDeleteActionError;

export default ReactionsPostDeleteActionType;
