import React, { useState } from 'react';
import { BASE_URL } from '../constants/constants';
import UserType from '../models/UserType';
import { unfriendFriend } from '../state/actions/friendsActions';
import Button from './Button';
import ConfirmMessage from './ConfirmMessage';
import DropDown from './Dropdown';
import Modal from './Modal';
import './styles/FriendRequestCard.css';

const FriendRequestCard: React.FC<{ user: UserType; horizontal?: boolean; type?: string }> = ({
  user,
  horizontal = false,
  type = 'friend'
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const unfriendHandler = (friendUserId: number, messageEnding: string) => {
    setIsModalOpen(true);
    setModalContent(
      <ConfirmMessage
        setIsModalOpen={setIsModalOpen}
        message={`Are your sure you want to ${messageEnding}?`}
        resourceId={friendUserId}
        action={unfriendFriend}
      />
    );
  };

  return (
    <li className={`friend_request_card card ${type} ${horizontal ? 'horizontal' : ''}`}>
      <div className="request_avatar">
        <img
          src={user?.avatar?.startsWith('http') ? user?.avatar : `${BASE_URL}/${user?.avatar}`}
          alt={`${user?.firstName} ${user?.lastName}`}
          crossOrigin="anonymous"
        />
      </div>
      <div className="info">
        <div className="name">
          <h2>{`${user?.firstName} ${user?.lastName}`}</h2>
        </div>
        <div className="connections">
          <h4>999 Friends</h4>
        </div>
        <div className="button_group flex_col">
          {type === 'request_received' ? (
            <>
              <Button>Confirm</Button>
              <Button>Remove</Button>
            </>
          ) : type === 'friend' ? (
            <DropDown
              button={
                <Button classes="icon item_btn flex">
                  <i className="fa fa-ellipsis-h"></i>
                </Button>
              }
            >
              <ul className="menu flex_col">
                <li
                  className="flex"
                  onClick={() =>
                    unfriendHandler(user.userId, `unfriend ${user.firstName} ${user.lastName}`)
                  }
                >
                  <i className="fas fa-trash"></i>
                  <span>{`Unfriend`}</span>
                </li>
              </ul>
            </DropDown>
          ) : (
            <></>
          )}
        </div>
      </div>
      {isModalOpen && <Modal setIsOpenModal={setIsModalOpen}>{modalContent}</Modal>}
    </li>
  );
};

export default FriendRequestCard;
