import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import FriendRequestCard from './FriendRequestCard';
import SearchBox from '../../components/SearchBox';
import useTypedSelector from '../../hooks/useTypedSelector';
import defaultEndpoint from '../../data/inputs/defaultEndpoint';
import friendsPageSidebarButtons from '../../data/inputs/friendsPageSidebarButtons';
import {
  listFriends,
  listFriendsRequestsReceived,
  listFriendsRequestsSent,
  listFriendsSuggestions
} from '../../context/actions/friendsActions';
import './styles/FriendsPage.css';

const FriendsPage = () => {
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

  const {
    loading: loadingSuggestions,
    error: errorSuggestions,
    friendsSuggestions
  } = useTypedSelector((state) => state.friendsSuggestionsList);

  const { success: unfriendSuccess } = useTypedSelector((state) => state.friendUnfriend);
  const { success: requestSuccess } = useTypedSelector((state) => state.friendRequestCreate);
  const { success: updateSuccess } = useTypedSelector((state) => state.friendRequestStatusUpdate);

  // const { headerText, backButtonToLabel, backButtonTo } = sectionsFriendsSidebarMenu[section];

  const headerText =
    section === 'home'
      ? 'Friends'
      : section === 'friendRequestsReceived'
      ? 'Friend Requests Received'
      : section === 'friendRequestsSent'
      ? 'Friend Requests Sent'
      : section === 'allFriends'
      ? 'All Friends'
      : 'Suggestions';

  useEffect(() => {
    if (section === 'allFriends') {
      const { page, pageSize, sort, search } = endpoint;
      dispatch(listFriends(`${page}${pageSize}${sort}${search}`));
    } else if (section === 'home') {
      dispatch(listFriendsRequestsReceived());
      dispatch(listFriendsSuggestions());
    } else if (section === 'friendRequestsReceived') {
      dispatch(listFriendsRequestsReceived());
    } else if (section === 'friendRequestsSent') {
      dispatch(listFriendsRequestsSent());
    } else if (section === 'suggestions') {
      dispatch(listFriendsSuggestions());
    }
  }, [dispatch, endpoint, section, unfriendSuccess, requestSuccess, updateSuccess]);

  return (
    <main className="friend_page">
      <aside className="sidebar">
        <div className="menu">
          <div className="menu_header">
            {section !== 'home' && (
              <>
                <Button classes="icon flex" onClick={() => setSection(`home`)}>
                  <i className="fas fa-arrow-left" />
                </Button>

                <h5 onClick={() => setSection(`home`)}>{'Friends'}</h5>
              </>
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
              ? friendsPageSidebarButtons?.map((button) => (
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
              : friendsSuggestions?.map((user) => (
                  <FriendRequestCard user={user} horizontal={true} type="friend_suggestion" />
                ))}
          </ul>
        </div>

        {/* <FriendRequestCard horizontal={true}/> */}
      </aside>
      <div className="friends_container flex_col">
        {section !== 'home' && <h1>{headerText}</h1>}
        {section === 'home' ? (
          <div className="flex_col">
            {friendsRequestsReceived?.length ? (
              <>
                <h1>Friends requests Received</h1>
                <ul className="container flex">
                  {friendsRequestsReceived?.map((user) => (
                    <FriendRequestCard user={user} type="request_received" />
                  ))}
                </ul>
              </>
            ) : (
              <></>
            )}

            {friendsSuggestions?.length ? (
              <>
                <h1>Friends suggestions</h1>
                <ul className="container flex">
                  {friendsSuggestions?.map((user) => (
                    <FriendRequestCard user={user} type="friend_suggestion" />
                  ))}
                </ul>
              </>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <ul className="container flex">
            {section === 'allFriends'
              ? friends?.map((user) => <FriendRequestCard user={user} type="friend" />)
              : section === 'friendRequestsReceived'
              ? friendsRequestsReceived?.map((user) => (
                  <FriendRequestCard user={user} type="request_received" />
                ))
              : section === 'friendRequestsSent'
              ? friendsRequestsSent?.map((user) => (
                  <FriendRequestCard user={user} type="request_sent" />
                ))
              : friendsSuggestions?.map((user) => (
                  <FriendRequestCard user={user} type="friend_suggestion" />
                ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default FriendsPage;
