export const userMenuMap = (userId: number) => [
  { path: '/', label: 'Home' },
  { path: `/profile/${userId}/posts`, label: 'Profile' },
  { path: '/friends', label: 'Friends' },
  { path: '/saved', label: 'Saved Posts' }
];