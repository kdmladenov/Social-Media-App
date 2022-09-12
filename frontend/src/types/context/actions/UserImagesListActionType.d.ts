import UserType from '../../UserType';

interface UserImagesListActionRequest {
  type: 'USER_IMAGES_LIST_REQUEST';
}
interface UserImagesListActionSuccess {
  type: 'USER_IMAGES_LIST_SUCCESS';
  payload: UserType[];
}
interface UserImagesListActionError {
  type: 'USER_IMAGES_LIST_FAIL';
  payload: string;
}
interface UserImagesListActionReset {
  type: 'USER_IMAGES_LIST_RESET';
}

type UserImagesListActionType =
  | UserImagesListActionRequest
  | UserImagesListActionSuccess
  | UserImagesListActionError
  | UserImagesListActionReset;

export default UserImagesListActionType;
