export const getFriendsHeaderText = (section: string, search: string, length: number) =>
  section === 'home' && (search === '' || search === 'search=&')
    ? 'Friends'
    : section === 'home' && length
    ? 'People Search'
    : section === 'friendRequestsReceived'
    ? 'Friend Requests Received'
    : section === 'friendRequestsSent'
    ? 'Friend Requests Sent'
    : section === 'allFriends'
    ? 'All Friends'
    : section === 'timeline'
    ? 'Timeline'
    : section === 'birthdays'
    ? 'Birthdays'
    : 'Suggestions';

export const getFriendsNoResultText = (section: string) =>
  section === 'home'
    ? ' suggestions'
    : section === 'friendRequestsReceived'
    ? ' requests received'
    : section === 'friendRequestsSent'
    ? ' requests sent'
    : section === 'allFriends'
    ? 's yet'
    : section === 'timeline'
    ? 's history yet'
    : section === 'birthdays'
    ? 's with birthdays today'
    : ' suggestions';

export const getFriendsTimelineType = (requestStatus: string, type: string) =>
  requestStatus === 'pending' && type === 'source'
    ? 'Friend Request Received on'
    : requestStatus === 'pending' && type === 'target'
    ? 'Friend Request Sent on'
    : requestStatus === 'approved'
    ? 'Friends since'
    : requestStatus === 'rejected'
    ? 'Friend Request Rejected on'
    : 'Unfriended on';

export const getFriendsTimelineCardType = (requestStatus: string, type: string) =>
  requestStatus === 'pending' && type === 'source'
    ? 'request_received'
    : requestStatus === 'pending' && type === 'target'
    ? 'request_sent'
    : requestStatus === 'approved'
    ? 'friend'
    : 'rejected';

export const getUsersWithRequestStatusType = (
  requestStatus: string,
  type: string,
  isUser: boolean
) =>
  requestStatus === 'approved'
    ? 'friend'
    : requestStatus === 'pending' && type === 'source'
    ? 'request_received'
    : requestStatus === 'pending' && type === 'target'
    ? 'request_sent'
    : requestStatus === 'rejected' || requestStatus === 'unfriended' || isUser
    ? 'excluded'
    : 'user';
