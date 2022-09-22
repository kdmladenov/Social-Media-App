import EndpointType from '../EndpointType';

interface HeaderControlsProps {
  updateQuery: (prop: string, value: string) => void;
  query: EndpointType;
  resource?: string;
  pageSizeOptionsMap?: { label: number | string; value: string }[];
  sortOptionsMap: { label: string; value: string }[];
  ratingFilterOptionsMap?: { label: string; value: string }[];
  isGrayBackground?: boolean;
  breadcrumbsPaths?: { label: string; path: string }[];
  horizontalCards?: boolean;
  setHorizontalCards?: Dispatch<SetStateAction<boolean>>;
}
export default HeaderControlsProps;
