interface PaginationProps {
  updateQuery: (prop: string, value: string) => void;
  currentPage: number;
  pageSize: number;
  totalItems?: number;
}
export default PaginationProps;
