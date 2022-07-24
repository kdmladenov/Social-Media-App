import React from 'react';
import { useDispatch } from 'react-redux';
import ConfirmMessageProps from '../types/components/ConfirmMessageProps';
import Button from './Button';

import './styles/ConfirmMessage.css';

const ConfirmMessage: React.FC<ConfirmMessageProps> = ({
  setIsModalOpen,
  message,
  resourceId,
  actionSecondParam,
  action
}) => {
  const dispatch = useDispatch();

  return (
    <div className="confirm flex_col">
      <span className="message">{message}</span>
      <div className="button_group">
        <Button
          classes="rounded blue_light"
          onClick={() => {
            dispatch(action(resourceId, actionSecondParam));
            setIsModalOpen(false);
          }}
        >
          Yes
        </Button>
        <Button classes="rounded blue_light" onClick={() => setIsModalOpen(false)}>
          No
        </Button>
      </div>
    </div>
  );
};

export default ConfirmMessage;
