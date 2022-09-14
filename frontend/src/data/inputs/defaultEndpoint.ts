const defaultEndpoint = {
  postsMy: {
    page: 'page=1&',
    pageSize: 'pageSize=1&',
    sort: 'sort=createdAt desc&',
    filter: [],
    search: ''
  },
  postComments: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=createdAt desc&',
    filter: [],
    search: ''
  },
  storiesMy: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=createdAt desc&',
    filter: [],
    search: ''
  },
  friendsList: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=firstName desc&',
    filter: [],
    search: ''
  },
  savedPosts: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=firstName desc&',
    filter: [],
    search: ''
  },
  locations: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=location_id asc&',
    search: ''
  },
  usersList: {
    page: 'page=1&',
    pageSize: 'pageSize=12&',
    sort: 'sort=first_name asc&',
    search: ''
  }
};

export default defaultEndpoint;
