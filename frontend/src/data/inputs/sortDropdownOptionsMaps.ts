export const postListSortOptionsMap = [
  { label: 'Price: Low to High', value: 'sort=price asc&' },
  { label: 'Price: High to Low', value: 'sort=price desc&' },
  { label: 'Sales: High to Low', value: 'sort=salesCount desc&' },
  { label: 'Popularity: High to Low', value: 'sort=visitedCount desc&' },
  { label: 'Most wished', value: 'sort=wishedCount desc&' },
  { label: 'Avg. Customer Rating', value: 'sort=rating desc&' },
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' }
];

export const commentsSortOptionsMap = [
  { label: 'Newest first', value: 'sort=dateCreated desc&' },
  { label: 'Oldest first', value: 'sort=dateCreated asc&' },
  { label: 'Most liked', value: 'sort=thumbsUp desc&' },
  { label: 'Most disliked', value: 'sort=thumbsDown desc&' }
];

export const adminUserListSortOptionsMap = [
  { label: 'User Id: Low to High', value: 'sort=user_id asc&' },
  { label: 'User Id: High to Low', value: 'sort=user_id desc&' },
  { label: 'Name: A to Z', value: 'sort=full_name asc&' },
  { label: 'Name: Z to A', value: 'sort=full_name desc&' }
];


export const adminPostListSortOptionsMap = [
  { label: 'Post Id: Low to High', value: 'sort=postId asc&' },
  { label: 'Post Id: High to Low', value: 'sort=postId desc&' },
  { label: 'Price: Low to High', value: 'sort=price asc&' },
  { label: 'Price: High to Low', value: 'sort=price desc&' }
];
