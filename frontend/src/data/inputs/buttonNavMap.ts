const buttonNavMap = {
  home: [
    { name: 'Home', path: '/', icon: 'fa fa-home' },
    { name: 'Profile', path: '/profile/posts', icon: 'fa fa-user' },
    { name: 'Friends', path: '/friends', icon: 'fas fa-user-friends' },
    { name: 'Saved Posts', path: '/saved', icon: 'fa fa-bookmark' }
  ],
  profile: [
    { name: 'Posts', path: '/profile/posts' },
    { name: 'About', path: '/profile/about' },
    { name: 'Friends', path: '/profile/friends' },
    { name: 'Photos', path: '/profile/photos' }
  ]
};

export default buttonNavMap;
