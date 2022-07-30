import CollectionType from '../../CollectionType';

interface CollectionCreateActionRequest {
  type: 'COLLECTION_CREATE_REQUEST';
}
interface CollectionCreateActionSuccess {
  type: 'COLLECTION_CREATE_SUCCESS';
  payload: CollectionType;
}
interface CollectionCreateActionError {
  type: 'COLLECTION_CREATE_FAIL';
  payload: string;
}

type CollectionCreateActionType =
  | CollectionCreateActionRequest
  | CollectionCreateActionSuccess
  | CollectionCreateActionError;

export default CollectionCreateActionType;
