interface ReactionsPostImageDeleteActionRequest {
  type: 'REACTIONS_POST_IMAGE_DELETE_REQUEST';
}
interface ReactionsPostImageDeleteActionSuccess {
  type: 'REACTIONS_POST_IMAGE_DELETE_SUCCESS';
}
interface ReactionsPostImageDeleteActionError {
  type: 'REACTIONS_POST_IMAGE_DELETE_FAIL';
  payload: string;
}

type ReactionsPostImageDeleteActionType =
  | ReactionsPostImageDeleteActionRequest
  | ReactionsPostImageDeleteActionSuccess
  | ReactionsPostImageDeleteActionError;

export default ReactionsPostImageDeleteActionType;
