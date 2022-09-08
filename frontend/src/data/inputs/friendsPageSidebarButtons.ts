
 const friendsPageSidebarButtons: { [key: string]: string }[] = [
   {
     icon: 'fa fa-user',
     label: 'Home'
   },
   {
     icon: 'fa fa-user',
     label: 'Friend Requests Received',
     nextSection: 'friendRequestsReceived',
     leftIcon: 'fas fa-arrow-left'
   },
   {
     icon: 'fa fa-user',
     label: 'Friend Requests Sent',
     nextSection: 'friendRequestsSent',
     leftIcon: 'fas fa-arrow-left'
   },
   {
     icon: 'fa fa-user',
     label: 'Suggestions',
     nextSection: 'suggestions',
     leftIcon: 'fas fa-arrow-left'
   },
   {
     icon: 'fa fa-user',
     label: 'All Friends',
     nextSection: 'allFriends',
     leftIcon: 'fas fa-arrow-left'
   },
   {
     icon: 'fa fa-user',
     label: 'Birthdays',
     nextSection: 'birthdays',
     leftIcon: 'fas fa-arrow-left'
   }
 ];

export default friendsPageSidebarButtons;