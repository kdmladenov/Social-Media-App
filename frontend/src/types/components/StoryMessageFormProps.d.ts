import FormInputDataType from '../FormInputDataType';

interface StoryMessageFormProps {
  inputData: FormInputDataType;
  screen?: string;
  resourceId?: number;
  updateAction?: TODO;
  validateInput?: {
    [key: string]: (value: string, match?: string) => string;
  };
}
export default StoryMessageFormProps;
