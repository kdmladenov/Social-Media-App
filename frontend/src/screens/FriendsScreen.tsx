import { spawn } from 'node:child_process';
import { text } from 'node:stream/consumers';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import FriendRequestCard from '../components/FriendRequestCard';
import FriendsSidebarMenu from '../components/FriendsSidebarMenu';
import HeaderControls from '../components/HeaderControls';
import SearchBox from '../components/SearchBox';
import useTypedSelector from '../hooks/useTypedSelector';
import defaultEndpoint from '../inputs/defaultEndpoint';
import sectionsFriendsSidebarMenu, { homeButtons } from '../inputs/sectionsFriendsSidebarMenu';
import {
  listFriends,
  listFriendsRequestsReceived,
  listFriendsRequestsSent
} from '../state/actions/friendsActions';
import './styles/FriendsScreen.css';

const FriendsScreen = () => {
  const dispatch = useDispatch();
  const [section, setSection] = useState('home');
  const [endpoint, setEndpoint] = useState(defaultEndpoint['friendsList']);

  const { loading, error, friends } = useTypedSelector((state) => state.friendsList);

  const {
    loading: loadingRequestReceived,
    error: errorRequestReceived,
    friendsRequestsReceived
  } = useTypedSelector((state) => state.friendsRequestsReceivedList);

  const {
    loading: loadingRequestSent,
    error: errorRequestSent,
    friendsRequestsSent
  } = useTypedSelector((state) => state.friendsRequestsSentList);

  const { success: unfriendSuccess } = useTypedSelector((state) => state.friendUnfriend);

  const { headerText, backButtonToLabel, backButtonTo } = sectionsFriendsSidebarMenu[section];

  useEffect(() => {
    if (section === 'allFriends') {
      const { page, pageSize, sort, search } = endpoint;
      dispatch(listFriends(`${page}${pageSize}${sort}${search}`));
    } else if (section === 'friendRequestsReceived' || section === 'home') {
      dispatch(listFriendsRequestsReceived());
    } else if (section === 'friendRequestsSent' || section === 'home') {
      dispatch(listFriendsRequestsSent());
    }
  }, [dispatch, endpoint, section, unfriendSuccess]);

  return (
    <main className="friend_screen">
      <aside className="sidebar">
        <div className="menu">
          <div className="menu_header">
            {backButtonTo && (
              <Button classes="icon flex" onClick={() => setSection(`${backButtonTo}`)}>
                <i className="fas fa-arrow-left" />
              </Button>
            )}
            {backButtonToLabel && (
              <h5 onClick={() => setSection(backButtonTo)}>{backButtonToLabel}</h5>
            )}
            {headerText && <span>{headerText}</span>}
          </div>

          <ul className="menu_content flex_col">
            {section === 'allFriends' && (
              <SearchBox
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                resource="friends"
              />
            )}
            {section === 'home'
              ? homeButtons?.map((button) => (
                  <li
                    className="button card"
                    key={button?.label}
                    onClick={() => setSection(button?.nextSection)}
                  >
                    <i className={`${button?.icon} left`} />
                    <span>{`${button?.label}`}</span>
                    {button?.label !== 'Home' && <i className="fas fa-angle-right chevron" />}
                  </li>
                ))
              : section === 'allFriends'
              ? friends?.map((user) => (
                  <FriendRequestCard user={user} horizontal={true} type="friend" />
                ))
              : section === 'friendRequestsReceived'
              ? friendsRequestsReceived?.map((user) => (
                  <FriendRequestCard user={user} horizontal={true} type="request_received" />
                ))
              : section === 'friendRequestsSent'
              ? friendsRequestsSent?.map((user) => (
                  <FriendRequestCard user={user} horizontal={true} type="request_sent" />
                ))
              : 'suggestion'}
          </ul>
        </div>

        {/* <FriendRequestCard horizontal={true}/> */}
      </aside>
      <div className="friends_container flex_col">
        {section !== 'home' && <h1>{headerText}</h1>}
        {section === 'home' ? (
          <div className="container flex_col">
            <h1>Friends requests Received</h1>
            <ul className="container flex">
              {friendsRequestsReceived?.map((user) => (
                <FriendRequestCard user={user} type="request" />
              ))}
            </ul>
            <h1>Friends requests Sent</h1>
            <ul className="container flex">
              {friendsRequestsSent?.map((user) => (
                <FriendRequestCard user={user} type="request" />
              ))}
            </ul>
          </div>
        ) : (
          <ul className="container flex">
            {section === 'allFriends'
              ? friends?.map((user) => <FriendRequestCard user={user} type="friend" />)
              : section === 'friendRequestsReceived'
              ? friendsRequestsReceived?.map((user) => (
                  <FriendRequestCard user={user} type="request" />
                ))
              : section === 'friendRequestsSent'
              ? friendsRequestsSent?.map((user) => <FriendRequestCard user={user} type="request" />)
              : 'suggestion'}
          </ul>
        )}
      </div>
    </main>
  );
};

export default FriendsScreen;
