import React from 'react';
import PostImageType from '../models/PostImageType';
import UserType from '../models/UserType';
import Button from './Button';
import './styles/FriendList.css';

const FriendList: React.FC<{ screen: string; friends: UserType[] }> = ({
  screen = '',
  friends
}) => {
  return (
    <div className={`friend_list card flex_col ${screen}`}>
      <div className="header flex">
        <div className="friends_info flex_col">
          <h1>Friends</h1>
          <h3>999 friends</h3>
        </div>
        <Button classes="text"> See all friends</Button>
      </div>
      <div className="friend_list">
        {friends
          .slice(0, screen === 'profile_posts_screen' ? 9 : friends.length - 1)
          .map((friend) => (
            <div className="friend">
              <img
                // src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
                src={friend.avatar}
                alt={`${friend.firstName} ${friend.lastName}`}
              />
              <span>{`${friend.firstName} ${friend.lastName}`}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendList;
