import UserInfoType from '../UserInfoType';

interface DropDownProps {
  button: JSX.Element;
  tooltipText?: string;
  // userInfo: UserInfoType
  children: React.ReactNode;
  isPointed?:boolean;
}
export default DropDownProps;
