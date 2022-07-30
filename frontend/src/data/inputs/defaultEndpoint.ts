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
  }
};

export default defaultEndpoint;
