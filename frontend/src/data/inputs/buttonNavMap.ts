const buttonNavMap = {
  home: [
    { name: 'Home', path: '/', icon: 'fa fa-home' },
    { name: 'Profile', path: '/profile/posts', icon: 'fa fa-user' },
    { name: 'Friends', path: '/friends', icon: 'fa fa-user' },
    { name: 'Followers', path: '/followers', icon: 'fa fa-user' }
  ],
  profile: [
    { name: 'Posts', path: '/profile/posts' },
    { name: 'About', path: '/profile/about' },
    { name: 'Friends', path: '/profile/friends' },
    { name: 'Photos', path: '/profile/photos' }
  ]
};

export default buttonNavMap;
