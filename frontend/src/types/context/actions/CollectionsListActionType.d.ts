import CollectionType from '../../CollectionType';

interface CollectionsListActionRequest {
  type: 'COLLECTIONS_LIST_REQUEST';
}
interface CollectionsListActionSuccess {
  type: 'COLLECTIONS_LIST_SUCCESS';
  payload: CollectionType[];
  success?: boolean;
}
interface CollectionsListActionError {
  type: 'COLLECTIONS_LIST_FAIL';
  payload: string;
}
interface CollectionsListActionReset {
  type: 'COLLECTIONS_LIST_RESET';
  success?: boolean;
}

type CollectionsListActionType =
  | CollectionsListActionRequest
  | CollectionsListActionSuccess
  | CollectionsListActionError
  | CollectionsListActionReset;

export default CollectionsListActionType;
