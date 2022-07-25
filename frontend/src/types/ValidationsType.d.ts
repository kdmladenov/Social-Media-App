interface ValidationsType {
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  maxDate?: Date;
  format?: RegEx;
}
export default ValidationsType;
