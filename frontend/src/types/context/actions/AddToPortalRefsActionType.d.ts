import { ToastRefType } from '../../ToastType';

type AddToPortalRefsActionType = {
  type: 'ADD_TO_PORTAL_REFS';
  payload: { toast_friendship: React.RefObject<ToastRefType> };
};

export default AddToPortalRefsActionType;
