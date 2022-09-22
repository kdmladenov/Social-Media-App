const buttonNavMap = (userId: number, screen: string) =>
  screen === 'home'
    ? [
        { name: 'Home', path: '/', icon: 'fa fa-home' },
        { name: 'Profile', path: `/profile/${userId}/posts`, icon: 'fa fa-user' },
        { name: 'Friends', path: '/friends', icon: 'fas fa-user-friends' },
        { name: 'Saved Posts', path: '/saved', icon: 'fa fa-bookmark' }
      ]
    : screen === 'profile'
    ? [
        { name: 'Posts', path: `/profile/${userId}/posts` },
        { name: 'About', path: `/profile/${userId}/about` },
        { name: 'Friends', path: `/profile/${userId}/friends` },
        { name: 'Photos', path: `/profile/${userId}/photos` }
      ]
    : [];

export default buttonNavMap;
