interface CollectionDeleteActionRequest {
  type: 'COLLECTION_DELETE_REQUEST';
}
interface CollectionDeleteActionSuccess {
  type: 'COLLECTION_DELETE_SUCCESS';
}
interface CollectionDeleteActionError {
  type: 'COLLECTION_DELETE_FAIL';
  payload: string;
}

type CollectionDeleteActionType =
  | CollectionDeleteActionRequest
  | CollectionDeleteActionSuccess
  | CollectionDeleteActionError;

export default CollectionDeleteActionType;
