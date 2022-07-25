import EndpointType from '../EndpointType';

interface DropdownSelectProps {
  updateQuery: (prop: string, value: string) => void;
  query: EndpointType;
  name: keyof EndpointType;
  labelStart: string;
  optionsMap: { label: number | string; value: string }[];
}
export default DropdownSelectProps;
