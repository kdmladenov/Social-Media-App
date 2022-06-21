import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostImageType from '../models/PostImageType';
import UserType from '../models/UserType';
import Avatar from './Avatar';
import Button from './Button';
import HeaderControls from './HeaderControls';
import './styles/FriendList.css';

const FriendList: React.FC<{ screen: string; friends: UserType[] }> = ({
  screen = '',
  friends
}) => {
  const navigate = useNavigate();

  const friendsCount =
    screen === 'profile_posts_screen' ? 9 : screen === 'profile_about_screen' ? 8 : friends.length;

  return (
    <div className={`friend_list card flex_col ${screen}`}>
      <div className="header flex">
        <div className="friends_info flex_col">
          <h1 onClick={() => navigate('/profile/friends')}>Friends</h1>
          <h3>999 friends</h3>
        </div>
        {screen === 'profile_friends_screen' && 'HeaderControls'}
        <Button classes="text" onClick={() => navigate('/profile/friends')}>
          See all friends
        </Button>
      </div>
      <div>ButtonNav Filter</div>
      <div className="list">
        {friends.slice(0, friendsCount).map((friend) => (
          <div className={`friend ${screen === 'profile_posts_screen' ? 'flex_col' : 'flex'}`}>
            {/* <img
                // src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
                src={friend.avatar}
                alt={`${friend.firstName} ${friend.lastName}`}
              /> */}
            <Avatar
              imageUrl={friend.avatar}
              firstName={friend.firstName}
              lastName={friend.lastName}
            />
            {/* <span>{`${friend.firstName} ${friend.lastName}`}</span> */}
            {screen === 'profile_friends_screen' && (
              <Button classes="icon">
                <i className="fa fa-ellipsis-h"></i>
              </Button>
            )}
          </div>
        ))}
      </div>
    Pagination
    </div>
  );
};

export default FriendList;
