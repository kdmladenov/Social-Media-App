import CollectionType from '../../CollectionType';

interface CollectionUpdateActionRequest {
  type: 'COLLECTION_UPDATE_REQUEST';
}
interface CollectionUpdateActionSuccess {
  type: 'COLLECTION_UPDATE_SUCCESS';
  payload: CollectionType;
}
interface CollectionUpdateActionError {
  type: 'COLLECTION_UPDATE_FAIL';
  payload: string;
}
interface CollectionUpdateActionReset {
  type: 'COLLECTION_UPDATE_RESET';
}

type CollectionUpdateActionType =
  | CollectionUpdateActionRequest
  | CollectionUpdateActionSuccess
  | CollectionUpdateActionError
  | CollectionUpdateActionReset;

export default CollectionUpdateActionType;
