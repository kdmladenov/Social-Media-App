import { useState } from 'react';
import MessageProps from '../models/components/MessageProps';
import './styles/Message.css';
import Tooltip from './Tooltip';

const Message: React.FC<MessageProps> = ({ type, children }) => {
  const [showMessage, setShowMessage] = useState(true);

  return showMessage ? (
    <div className={`message_container ${type}`}>
      <i
        className={`fa ${
          type === 'error'
            ? 'fa-times-circle'
            : type === 'success'
            ? 'fa-check-circle'
            : type === 'info'
            ? 'fa-info-circle'
            : 'fa-exclamation-circle'
        }`}
      />
      <div className="message">{children}</div>
      <Tooltip direction="top" text="close">
        <i onClick={() => setShowMessage(!showMessage)} className="fa fa-times" />
      </Tooltip>
    </div>
  ) : (
    <></>
  );
};

export default Message;
