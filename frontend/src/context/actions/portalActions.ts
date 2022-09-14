import { Dispatch } from 'redux';
import AddToPortalRefsActionType from '../../types/context/actions/AddToPortalRefsActionType';
import { ToastRefType } from '../../types/ToastType';
import { ADD_TO_PORTAL_REFS } from '../constants/portalsConstants';

export const addToPortalRefs =
  (portalRef: { toast_friendship: React.RefObject<ToastRefType> }) =>
  async (dispatch: Dispatch<AddToPortalRefsActionType>) => {
    dispatch({
      type: ADD_TO_PORTAL_REFS,
      payload: portalRef
    });
  };
