
interface EndpointType {
  page: string;
  pageSize: string;
  sort: string;
  search: string;
  filter?: string[];
  role?: string;
  rating?: string 
}
export default EndpointType;
