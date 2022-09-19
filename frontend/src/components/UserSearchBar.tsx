import React, { useEffect, useState } from 'react';

import './styles/UserSearchBar.css';
import useThrottle from '../hooks/useThrottle';
import { RESET_BTN_THRESHOLD_SHOW_CHAR_COUNT, THROTTLE_DELAY } from '../data/constants';

import Tooltip from './Tooltip';
import defaultEndpoint from '../data/inputs/defaultEndpoint';
import useTypedSelector from '../hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { useDispatch } from 'react-redux';
import { listUsers } from '../context/actions/userActions';
import { listFriendRequests } from '../context/actions/friendsActions';
import UserType from '../types/UserType';
import useOutsideClick from '../hooks/useOutsideClick';

const UserSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [endpoint, setEndpoint] = useState(defaultEndpoint['usersList']);

  // const { friendsRequestsList } = useTypedSelector((state) => state.friendsRequestsList);
  const { users } = useTypedSelector((state) => state.userList);
  // const { user: currentUser } = useTypedSelector((state) => state.userDetails);

  // const usersWithRequestStatus = users?.map((user) => {
  //   return {friendsRequestsList?.find((userWithRequest) => userWithRequest.userId === user.userId)
  //     ?.requestStatus === 'approved' ? 'friend' : '';}
  // });

  const buttonPressHandler = (user: UserType) => {
    navigate(`/profile/${user?.userId}/posts`);
    setSearchTerm('');
  };

  const resetInputButtonHandler = () => {
    setSearchTerm('');
    setEndpoint({ ...endpoint, search: `search=&` });
  };

  const keywordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // Throttle (debounce) searches
  useThrottle(() => setEndpoint({ ...endpoint, search: `search=${searchTerm}&` }), THROTTLE_DELAY, [
    searchTerm
  ]);

  let nodeRef = useOutsideClick(() => {
    resetInputButtonHandler();
  });

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listUsers(`${page}${pageSize}${sort}${search}`));
    // dispatch(listFriendRequests());
  }, [dispatch, endpoint]);

  return (
    <div className="search_bar flex_col" ref={nodeRef}>
      <div className={`search_input flex`}>
        <input
          type="text"
          value={searchTerm}
          onChange={keywordInputHandler}
          placeholder={`Search people...`}
        />
        {searchTerm.length >= RESET_BTN_THRESHOLD_SHOW_CHAR_COUNT && (
          <button type="button" className="reset_btn" onClick={resetInputButtonHandler}>
            <Tooltip text="Clear">
              <i className="fa fa-times" aria-hidden="true" />
            </Tooltip>
          </button>
        )}
      </div>
      {searchTerm.length >= RESET_BTN_THRESHOLD_SHOW_CHAR_COUNT ? (
        <ul className="dropdown flex_col">
          {users?.length > 0 ? (
            users?.map((user) => (
              <li
                key={`${user?.userId}`}
                className="dropdown_btn"
                onClick={() => buttonPressHandler(user)}
              >
                <Avatar
                  imageUrl={user?.avatar}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  additionalInfo=""
                />
              </li>
            ))
          ) : (
            <li>Nothing found</li>
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserSearchBar;
