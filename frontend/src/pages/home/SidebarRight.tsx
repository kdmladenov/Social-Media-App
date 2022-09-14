import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Accordion from '../../components/Accordion';
import Avatar from '../../components/Avatar';
import { listFriends } from '../../context/actions/friendsActions';
import useTypedSelector from '../../hooks/useTypedSelector';
import FriendType from '../../types/FriendType';
import './styles/SidebarRight.css';

const SidebarRight: React.FC = () => {
  const dispatch = useDispatch();
  const [friendsListSuccess, setFriendsListSuccess] = useState<boolean>(false);
  const [birthdayList, setBirthdayList] = useState<FriendType[]>([]);

  const { friends } = useTypedSelector((state) => state.friendsList);

  useEffect(() => {
    if (!friends?.length && !friendsListSuccess) {
      dispatch(listFriends());
      setFriendsListSuccess(true);
    } else {
      setBirthdayList(
        friends?.filter(
          (friend) =>
            new Date(friend.dateOfBirth).getMonth() === new Date().getMonth() &&
            new Date(friend.dateOfBirth).getDate() === new Date().getDate()
        )
      );
    }
  }, [dispatch, friends, friendsListSuccess]);

  return (
    <section className="sidebar_right">
      <Accordion key="user">
        <Accordion.Item isOpen={true}>
          <Accordion.Header>
            <Accordion.Title>
              <h3>Birthdays</h3>
            </Accordion.Title>
            <Accordion.ButtonGroup></Accordion.ButtonGroup>
          </Accordion.Header>
          <Accordion.Body>
            {birthdayList?.length
              ? `${birthdayList?.[0].firstName} ${birthdayList?.[0].lastName}${
                  birthdayList?.length > 1 ? ` and ${birthdayList?.length - 1}  other ` : ''
                } have birthday today.`
              : 'You have no friends with birthday today'}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item isOpen={true}>
          <Accordion.Header>
            <Accordion.Title>
              <h3>Friends</h3>
            </Accordion.Title>
            <Accordion.ButtonGroup></Accordion.ButtonGroup>
          </Accordion.Header>
          <Accordion.Body>
            {friends?.map((friend) => (
              <Avatar
                imageUrl={friend.avatar}
                firstName={friend.firstName}
                lastName={friend.lastName}
                key={friend.userId}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  );
};

export default SidebarRight;
