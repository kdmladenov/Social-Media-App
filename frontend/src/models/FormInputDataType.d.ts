import ValidationsType from './ValidationsType';

interface FormInputDataType {
  [key: string]: {
    formElement?: string;
    label: string;
    options?: {
      label: string;
      value: string;
    }[];
    type?: string;
    placeholder: string;
    value: string;
    validations: ValidationsType;
    valid: boolean;
    touched: boolean;
    accordionOpen?: boolean | undefined;
  };
}
export default FormInputDataType;
