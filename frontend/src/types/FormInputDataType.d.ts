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
    max?: number;
    min?: number;
    step?: number;
    placeholder: string;
    value: string;
    validations: ValidationsType;
    valid: boolean;
    touched: boolean;
    accordionOpen?: boolean | undefined;
  };
}
export default FormInputDataType;
