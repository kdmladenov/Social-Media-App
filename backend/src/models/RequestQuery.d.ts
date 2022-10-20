interface RequestQuery {
  postId: number;
  search: string;
  filter: string | string[];
  sort: string;
  page: number;
  pageSize: number;
  role: RolesType;
  userId: number
}

export default RequestQuery;
