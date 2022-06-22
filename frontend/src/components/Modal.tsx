import React, { LegacyRef } from 'react';
import ReactDOM from 'react-dom';

import './styles/Modal.css';
import useCreateDiv from '../hooks/useCreateDiv';
import ModalProps from '../models/components/ModalProps';
import useOutsideClick from '../hooks/useOutsideClick';

const Modal: React.FC<ModalProps> = ({ classes, setIsOpenModal, children }) => {
  const { loaded, divId } = useCreateDiv('modal');

  let nodeRef: LegacyRef<HTMLDivElement> = useOutsideClick(() => setIsOpenModal(false));

  return loaded ? (
    ReactDOM.createPortal(
      <>
        <div ref={nodeRef} className={`modal_container flex ${classes ? classes : ''}`}>
          {children}
          <button className="close_modal_btn" onClick={() => setIsOpenModal(false)}>
            <i className="fa fa-times" />
          </button>
        </div>
        <div className="background" />
      </>,

      document.getElementById(divId)!
    )
  ) : (
    <></>
  );
};

export default Modal;
