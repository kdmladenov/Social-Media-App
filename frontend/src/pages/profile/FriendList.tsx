import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listFriends, unfriendFriend } from '../../context/actions/friendsActions';
import defaultEndpoint from '../../data/inputs/defaultEndpoint';
import { friendsListPageSizeOptionsMap } from '../../data/inputs/pageSizeOptionsMap';
import { friendsListSortOptionsMap } from '../../data/inputs/sortDropdownOptionsMaps';
import useTypedSelector from '../../hooks/useTypedSelector';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import DropDown from '../../components/Dropdown';
import HeaderControls from '../../components/HeaderControls';
import ConfirmMessage from '../../components/ConfirmMessage';
import Pagination from '../../components/Pagination';

import './styles/FriendList.css';
import Modal from '../../components/Modal';
import UserType from '../../types/UserType';

const FriendList: React.FC<{ screen: string; user: UserType }> = ({ screen = '', user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['friendsList'],
    pageSize: screen === 'profile_posts_screen' ? 'pageSize=9&' : 'pageSize=10&'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const { friends } = useTypedSelector((state) => state.friendsList);
  const { success: unfriendSuccess } = useTypedSelector((state) => state.friendUnfriend);
  const { userInfo } = useTypedSelector((state) => state.userLogin);

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

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listFriends(`${page}${pageSize}${sort}${search}`, user?.userId));
  }, [dispatch, endpoint, unfriendSuccess, user?.userId]);

  return (
    <div className={`friend_list card flex_col ${screen}`}>
      <div className="header flex">
        <div className="friends_info flex_col">
          <h1 onClick={() => navigate('/profile/friends')}>Friends</h1>
          <h3>{`${user?.friends?.length} friends`}</h3>
        </div>
        {screen === 'profile_friends_screen' && (
          <HeaderControls
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            query={endpoint}
            resource="friends"
            pageSizeOptionsMap={friendsListPageSizeOptionsMap}
            sortOptionsMap={friendsListSortOptionsMap}
          />
        )}
        {userInfo?.userId === user?.userId && (
          <Button
            classes="text"
            onClick={() =>
              navigate(screen === 'profile_friends_screen' ? '/friends' : '/profile/friends')
            }
          >
            {screen === 'profile_friends_screen' ? 'Friends Details' : 'See All Friends'}
          </Button>
        )}
      </div>
      <ul>
        {friends?.length > 0 ? (
          friends.map((friend) => (
            <li
              className={`friend ${screen === 'profile_posts_screen' ? 'flex_col' : 'flex'}`}
              key={friend?.userId}
            >
              <Avatar
                imageUrl={friend.avatar}
                firstName={friend.firstName}
                lastName={friend.lastName}
              />
              {screen === 'profile_friends_screen' && (
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
                        unfriendHandler(
                          friend.userId,
                          `unfriend ${friend.firstName} ${friend.lastName}`
                        )
                      }
                    >
                      <i className="fas fa-trash"></i>
                      <span>{`Unfriend`}</span>
                    </li>
                  </ul>
                </DropDown>
              )}
            </li>
          ))
        ) : (
          <h3>No friends to show</h3>
        )}
      </ul>
      <div className="footer">
        <Pagination
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
          pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
          totalItems={friends?.[0]?.totalDBItems}
        />
      </div>
      {isModalOpen && <Modal setIsOpenModal={setIsModalOpen}>{modalContent}</Modal>}
    </div>
  );
};

export default FriendList;
