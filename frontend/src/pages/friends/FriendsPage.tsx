import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import FriendRequestCard from './FriendRequestCard';
import SearchBox from '../../components/SearchBox';
import useTypedSelector from '../../hooks/useTypedSelector';
import defaultEndpoint from '../../data/inputs/defaultEndpoint';
import friendsPageSidebarButtons from '../../data/inputs/friendsPageSidebarButtons';
import {
  listFriendRequests,
  listFriends,
  listFriendsRequestsReceived,
  listFriendsRequestsSent,
  listFriendsSuggestions
} from '../../context/actions/friendsActions';
import './styles/FriendsPage.css';
import { listUsers } from '../../context/actions/userActions';
import {
  getFriendsHeaderText,
  getFriendsNoResultText,
  getUsersWithRequestStatusType
} from '../../utils/getFriendsPageText';
import FriendshipTimeline from './FriendshipTimeline';
import BirthdaysTimeline from './BirthdaysTimeline';

const FriendsPage = () => {
  const dispatch = useDispatch();
  const [section, setSection] = useState('home');
  const [friendsEndpoint, setFriendsEndpoint] = useState(defaultEndpoint['friendsList']);
  const [usersEndpoint, setUsersEndpoint] = useState(defaultEndpoint['usersList']);

  const { friends } = useTypedSelector((state) => state.friendsList);
  const { friendsRequestsList } = useTypedSelector((state) => state.friendsRequestsList);
  const { users } = useTypedSelector((state) => state.userList);
  const { user: currentUser } = useTypedSelector((state) => state.userDetails);
  const { friendsRequestsReceived } = useTypedSelector(
    (state) => state.friendsRequestsReceivedList
  );
  const { friendsRequestsSent } = useTypedSelector((state) => state.friendsRequestsSentList);
  const { friendsSuggestions } = useTypedSelector((state) => state.friendsSuggestionsList);
  const { success: unfriendSuccess } = useTypedSelector((state) => state.friendUnfriend);
  const { success: requestSuccess } = useTypedSelector((state) => state.friendRequestCreate);
  const { success: updateSuccess } = useTypedSelector((state) => state.friendRequestStatusUpdate);

  const headerText = getFriendsHeaderText(section, usersEndpoint.search, users?.length);

  const usersWithRequestStatus = users?.map((user) => {
    const usersWithRequest = friendsRequestsList?.find(
      (userWithRequest) => userWithRequest.userId === user.userId
    );
    if (usersWithRequest?.requestStatus) {
      return {
        ...user,
        type: `${getUsersWithRequestStatusType(
          usersWithRequest.requestStatus,
          usersWithRequest.type,
          usersWithRequest.userId === currentUser.userId
        )}`
      };
    }
    return {
      ...user,
      type: user.userId === currentUser.userId ? 'current_user' : 'user'
    };
  });

  const homeSuggestionsAndRequests = (
    <div className="flex_col">
      <>
        <h1>Friend Requests Received</h1>
        {friendsRequestsReceived?.length ? (
          <ul className="container flex">
            {friendsRequestsReceived?.map((user) => (
              <FriendRequestCard user={user} type="request_received" />
            ))}
          </ul>
        ) : (
          <span>You have no pending received friend requests</span>
        )}
      </>
      <>
        <h1>Friends Suggestions</h1>
        {friendsSuggestions?.length ? (
          <ul className="container flex">
            {friendsSuggestions?.map((user) => (
              <FriendRequestCard user={user} type="friend_suggestion" />
            ))}
          </ul>
        ) : (
          <span>You have no friend suggestions</span>
        )}
      </>
    </div>
  );

  useEffect(() => {
    if (section === 'allFriends' || section === 'birthdays') {
      const { page, pageSize, sort, search } = friendsEndpoint;
      dispatch(listFriends(`${page}${pageSize}${sort}${search}`));
    } else if (section === 'home') {
      dispatch(listFriendsRequestsReceived());
      dispatch(listFriendsSuggestions());
      const { page, pageSize, sort, search } = usersEndpoint;
      dispatch(listUsers(`${page}${pageSize}${sort}${search}`));
      dispatch(listFriendRequests());
    } else if (section === 'friendRequestsReceived') {
      dispatch(listFriendsRequestsReceived());
    } else if (section === 'friendRequestsSent') {
      dispatch(listFriendsRequestsSent());
    } else if (section === 'timeline') {
      dispatch(listFriendRequests());
    } else if (section === 'suggestions') {
      dispatch(listFriendsSuggestions());
    }
  }, [
    dispatch,
    friendsEndpoint,
    usersEndpoint,
    section,
    unfriendSuccess,
    requestSuccess,
    updateSuccess
  ]);

  return (
    <main className={`friend_page ${section}`}>
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
            {(section === 'allFriends' || section === 'home') && (
              <SearchBox
                updateQuery={(prop, value) =>
                  section === 'allFriends'
                    ? setFriendsEndpoint({ ...friendsEndpoint, [prop]: value })
                    : setUsersEndpoint({ ...usersEndpoint, [prop]: value })
                }
                resource={section === 'allFriends' ? 'friends' : 'people'}
              />
            )}
            {section === 'home' ? (
              friendsPageSidebarButtons?.map((button) => (
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
            ) : section === 'allFriends' ? (
              friends?.map((user) => (
                <FriendRequestCard user={user} horizontal={true} type="friend" />
              ))
            ) : section === 'friendRequestsReceived' ? (
              friendsRequestsReceived?.map((user) => (
                <FriendRequestCard user={user} horizontal={true} type="request_received" />
              ))
            ) : section === 'friendRequestsSent' ? (
              friendsRequestsSent?.map((user) => (
                <FriendRequestCard user={user} horizontal={true} type="request_sent" />
              ))
            ) : section === 'birthdays' ? (
              friends
                ?.filter(
                  (friend) =>
                    new Date(friend.dateOfBirth).getMonth() === new Date().getMonth() &&
                    new Date(friend.dateOfBirth).getDate() === new Date().getDate()
                )
                ?.map((user) => <FriendRequestCard user={user} horizontal={true} type="friend" />)
            ) : section === 'suggestions' ? (
              friendsSuggestions?.map((user) => (
                <FriendRequestCard user={user} horizontal={true} type="friend_suggestion" />
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </aside>
      <div className="friends_container flex_col">
        {section === 'home' &&
        (usersEndpoint.search === '' || usersEndpoint.search === 'search=&') ? (
          homeSuggestionsAndRequests
        ) : (
          <>
            <h1>{headerText}</h1>
            <ul className="container flex">
              {section === 'home' && users?.length ? (
                usersWithRequestStatus?.map((user) => (
                  <FriendRequestCard user={user} type={`${user.type}`} />
                ))
              ) : section === 'allFriends' && friends?.length ? (
                friends?.map((user) => <FriendRequestCard user={user} type="friend" />)
              ) : section === 'friendRequestsReceived' && friendsRequestsReceived?.length ? (
                friendsRequestsReceived?.map((user) => (
                  <FriendRequestCard user={user} type="request_received" />
                ))
              ) : section === 'friendRequestsSent' && friendsRequestsSent?.length ? (
                friendsRequestsSent?.map((user) => (
                  <FriendRequestCard user={user} type="request_sent" />
                ))
              ) : section === 'timeline' && friendsRequestsList?.length ? (
                <FriendshipTimeline friendsRequestsList={friendsRequestsList} />
              ) : section === 'birthdays' && friends?.length ? (
                <BirthdaysTimeline friends={friends} />
              ) : section === 'suggestions' && friendsSuggestions?.length ? (
                friendsSuggestions?.map((user) => (
                  <FriendRequestCard user={user} type="friend_suggestion" />
                ))
              ) : (
                <h4>{`You have no friend${getFriendsNoResultText(section)}`}</h4>
              )}
            </ul>
          </>
        )}
      </div>
    </main>
  );
};

export default FriendsPage;
