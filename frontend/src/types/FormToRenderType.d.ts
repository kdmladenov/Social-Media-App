interface FormToRenderType {
  key: string;
  config: {
    formElement?: string;
    options?: {
      label: string;
      value: string;
    }[];
    label: string;
    min?: number;
    max?: number;
    step?: number;
    type?: string;
    placeholder: string;
    value: string;
    validations: ValidationsType;
    valid: boolean;
    touched: boolean;
  };
}

export default FormToRenderType;