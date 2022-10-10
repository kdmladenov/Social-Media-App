export const postListSortOptionsMap = [
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' }
];

export const commentsSortOptionsMap = [
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' },
  { label: 'Most liked', value: 'sort=thumbsUp desc&' },
  { label: 'Most disliked', value: 'sort=thumbsDown desc&' }
];

export const friendsListSortOptionsMap = [
  { label: 'Name - A-Z', value: 'sort=firstName asc&' },
  { label: 'Name - Z-A', value: 'sort=firstName desc&' },
  { label: 'Friendship - Newest first', value: 'sort=updatedAt desc&' },
  { label: 'Friendship - Oldest first', value: 'sort=updatedAt asc&' }
];

export const imagesListSortOptionsMap = [
  { label: 'Newest first', value: 'sort=createdAt desc&' },
  { label: 'Oldest first', value: 'sort=createdAt asc&' }
];

