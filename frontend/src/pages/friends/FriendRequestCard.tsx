import React, { useState } from 'react';
import { BASE_URL } from '../../data/constants';
import getMutualFriends from '../../utils/getMutualFriends';
import useTypedSelector from '../../hooks/useTypedSelector';
import { UserShortType } from '../../types/UserType';
import {
  createFriendRequest,
  unfriendFriend,
  updateFriendRequestStatus
} from '../../context/actions/friendsActions';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import ConfirmMessage from '../../components/ConfirmMessage';
import './styles/FriendRequestCard.css';
import Modal from '../../components/Modal';
import { useDispatch } from 'react-redux';
import Popover from '../../components/Popover';

const FriendRequestCard: React.FC<{ user: UserShortType; horizontal?: boolean; type?: string }> = ({
  user,
  horizontal = false,
  type = 'friend'
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const { user: loggedUser } = useTypedSelector((state) => state.userDetails);

  const mutualFriends =
    user?.friends && getMutualFriends(user?.friends, loggedUser)
      ? getMutualFriends(user?.friends, loggedUser)
      : [];
  const portalRefs = useTypedSelector((state) => state.portalRefs);

  const {
    portalRefsMap: { toast_friendship: toastFriendshipRef }
  } = portalRefs;

  const confirmFriendshipHandler = () => {
    dispatch(updateFriendRequestStatus(user?.userId, 'approved'));
    toastFriendshipRef.current.createToast({
      title: `You are now friends with ${user?.firstName} ${user?.lastName}`,
      image: user?.avatar,
      icon: 'fas fa-user-friends'
    });
  };
  const rejectFriendshipHandler = () => {
    dispatch(updateFriendRequestStatus(user?.userId, 'rejected'));
    toastFriendshipRef.current.createToast({
      title: `You have friendship with ${user?.firstName} ${user?.lastName}`,
      image: user?.avatar,
      icon: 'fas fa-user-friends'
    });
  };
  const requestFriendshipHandler = () => {
    dispatch(createFriendRequest(user?.userId));
    toastFriendshipRef.current.createToast({
      title: `You have sent a friend request to ${user?.firstName} ${user?.lastName}`,
      image: user?.avatar,
      icon: 'fas fa-user-friends'
    });
  };

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

  const getPopoverMutualFriends = (mutualFriends: UserShortType[], friend: UserShortType) => {
    const friendsWithoutCurrentUser = mutualFriends.filter(
      (user) => user?.userId !== friend.userId
    );

    return (
      <p className="flex">
        {`${mutualFriends.length - 1} mutual friend${
          mutualFriends.length > 2 ? 's' : ''
        } including ${friendsWithoutCurrentUser[0]?.firstName} ${
          friendsWithoutCurrentUser[0]?.lastName
        }`}
        {friendsWithoutCurrentUser?.[1]?.firstName
          ? `and ${friendsWithoutCurrentUser?.[1]?.firstName} ${friendsWithoutCurrentUser?.[1]?.lastName}`
          : ''}
      </p>
    );
  };
  return (
    <li
      className={`friend_request_card card ${type} ${horizontal ? 'horizontal' : ''}`}
      key={user?.userId}
    >
      <div className="request_avatar">
        <img
          src={user?.avatar}
          alt={`${user?.firstName} ${user?.lastName}`}
        />
      </div>
      <div className="info">
        <div className="name">
          <h2>{`${user?.firstName} ${user?.lastName}`}</h2>
        </div>
        <div className="connections flex">
          {mutualFriends?.length ? (
            <>
              <div className="friends_avatars flex">
                {mutualFriends.slice(0, 4).map((friend, index) => (
                  <Popover
                    header={<Avatar classes="image_only small" imageUrl={friend?.avatar} />}
                    direction="top"
                    key={index}
                  >
                    <>
                      <div className="avatar_container flex">
                        <Avatar classes="image_only big" imageUrl={friend?.avatar} />
                      </div>
                      <div className="popover_info flex_col">
                        <h3>{`${friend?.firstName} ${friend?.lastName}`}</h3>
                        {mutualFriends?.length > 1 ? (
                          <div className="mutual_friends flex">
                            <i className="fa fa-user"></i>
                            {getPopoverMutualFriends(mutualFriends, friend)}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="button_group flex">
                        <Button classes="white">Profile</Button>
                      </div>
                    </>
                  </Popover>
                ))}
              </div>
              <h4>{`${mutualFriends.length} mutual friend${
                mutualFriends.length > 1 ? 's' : ''
              }`}</h4>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="button_group flex_col">
          {type === 'request_received' ? (
            <>
              <Button onClick={confirmFriendshipHandler}>Confirm</Button>
              <Button onClick={rejectFriendshipHandler}>Remove</Button>
            </>
          ) : type === 'friend_suggestion' ? (
            <>
              <Button onClick={requestFriendshipHandler}>Add Friend</Button>
              <Button onClick={rejectFriendshipHandler}>Remove</Button>
            </>
          ) : type === 'friend' ? (
            <Button
              onClick={() =>
                unfriendHandler(user.userId, `unfriend ${user.firstName} ${user.lastName}`)
              }
            >
              Unfriend
            </Button>
          ) : type === 'user' ? (
            <Button onClick={requestFriendshipHandler}>Add Friend</Button>
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
