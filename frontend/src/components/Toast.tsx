import React, {  useEffect, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import './styles/Toast.css';
import useCreateDiv from '../hooks/useCreateDiv';
import getUniqueId from '../utils/getUniqueId';

import ToastProps from '../types/components/ToastProps'; 
import ToastType, { ToastRefType } from '../types/ToastType';

const Toast = React.forwardRef<ToastRefType, ToastProps>(
  ({ idDiv = 'toast_message', autoClose = true, autoClosePeriod = 10000 }, forwardedRef) => {
    const { loaded, divId } = useCreateDiv(idDiv);

    const [toasts, setToasts] = useState<ToastType[]>([]);
    const [deletingToastId, setDeletingToastId] = useState<number>();

    const deleteToast = (id: number) => setToasts(toasts.filter((toast) => toast.id !== id));

    useImperativeHandle(forwardedRef, () => ({
      createToast(toast) {
        setToasts([...toasts, { ...toast, id: getUniqueId() }]);
      }
    }));

    // Autoclose - prevents closure effect
    useEffect(() => {
      if (deletingToastId) {
        setToasts(toasts.filter((toast) => toast.id !== deletingToastId));
      }
    }, [deletingToastId]);

    useEffect(() => {
      if (autoClose && toasts.length) {
        const lastToastId = toasts[toasts.length - 1].id;
        setTimeout(() => setDeletingToastId(lastToastId), autoClosePeriod);
      }
    }, [toasts, autoClose, autoClosePeriod]);

    return loaded ? (
      ReactDOM.createPortal(
        <div className="toasts_container">
          {toasts.map((toast) =>
            divId === 'toast_friendship' ? (
              <div
                key={toast.id}
                onClick={() => deleteToast(toast.id)}
                className={`toast_friendship card flex`}
              >
                <div className="image ">
                  <img src={toast.image} alt={toast.title} />
                  {toast?.icon && <div className="badge">
                    <i className={toast.icon} />
                  </div>}
                </div>
                <div className="content">
                  <h1 className="title">{toast.title}</h1>
                </div>
              </div>
            ) : (
              <div
                key={toast.id}
                onClick={() => deleteToast(toast.id)}
                className={`toast card ${toast.type}`}
              >
                {toast.message}
              </div>
            )
          )}
        </div>,
        document.getElementById(divId)!
      )
    ) : (
      <></>
    );
  }
);

export default Toast;
