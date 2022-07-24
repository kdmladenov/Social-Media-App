import React, { LegacyRef } from 'react';
import ReactDOM from 'react-dom';
import useCreateDiv from '../hooks/useCreateDiv';
import useOutsideClick from '../hooks/useOutsideClick';
import ModalProps from '../types/components/ModalProps';

import './styles/Modal.css';


const Modal: React.FC<ModalProps> = ({ classes = '', setIsOpenModal, children }) => {
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
