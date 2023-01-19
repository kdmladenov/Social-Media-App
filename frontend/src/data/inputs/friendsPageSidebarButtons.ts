const friendsPageSidebarButtons: { [key: string]: string }[] = [
  // {
  //   icon: 'fa fa-user',
  //   label: 'Home'
  // },
  {
    icon: 'fas fa-user-check',
    label: 'Friend Requests Received',
    nextSection: 'friendRequestsReceived'
  },
  {
    icon: 'fas fa-user-check',
    label: 'Friend Requests Sent',
    nextSection: 'friendRequestsSent'
  },
  {
    icon: 'fas fa-user-tag',
    label: 'Suggestions',
    nextSection: 'suggestions'
  },
  {
    icon: 'fas fa-user-friends',
    label: 'All Friends',
    nextSection: 'allFriends'
  },
  {
    icon: 'fa fa-history',
    label: 'Friendship History',
    nextSection: 'timeline'
  },
  {
    icon: 'fa fa-birthday-cake',
    label: 'Upcoming Birthdays',
    nextSection: 'birthdays'
  }
];

export default friendsPageSidebarButtons;
