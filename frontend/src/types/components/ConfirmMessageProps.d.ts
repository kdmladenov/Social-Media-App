import React from 'react';
import PostDeleteActionType from '../models/state/actions/PostDeleteActionType';
import PostRestoreActionType from '../models/state/actions/PostRestoreActionType';
import StoreType from '../models/state/StoreType';
import UserDeleteActionType from '../context/actions/UserDeleteActionType';
import UserRestoreActionType from '../context/actions/UserRestoreActionType';
import UserType from '../models/UserType';

interface ConfirmMessageProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  resourceId: number;
  action: (
    postId: number,
    updatedUserData?: UserType
  ) => (
    dispatch: Dispatch<
      PostDeleteActionType | PostRestoreActionType | UserDeleteActionType | UserRestoreActionType
    >,
    getState: () => StoreType
  ) => Promise<void>;
  actionSecondParam?: { [key: keyof UserType]: string };
}
export default ConfirmMessageProps;
