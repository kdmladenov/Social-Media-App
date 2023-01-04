import FormInputDataType from './FormInputDataType';
import SchoolType from './SchoolType';
import UserType from './UserType';
import WorkplaceType from './WorkplaceType';

export interface createButtonType {
  subsectionKey: string;
  label: string;
  inputData: FormInputDataType;
}

export default interface ProfileItemType {
  subsectionKey?: keyof UserType;
  label?: string;
  icon?: string;
  spanText?: string;
  labelText?: string;
  inputData?: FormInputDataType;
  resource?: UserType | SchoolType | WorkplaceType;
  resourceId?: number;
  subResourceId?: number;
  title?: string;
  addButton?: createButtonType;
}


