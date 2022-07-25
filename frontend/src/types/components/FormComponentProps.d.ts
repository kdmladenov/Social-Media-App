import FormInputDataType from '../FormInputDataType';
import PostType from '../PostType';
import SchoolType from '../SchoolType';
import PostDetailsActionType from '../context/actions/PostDetailsActionType';
import UserDetailsActionType from '../context/actions/UserDetailsActionType';
import UserType from '../UserType';
import WorkplaceType from '../WorkplaceType';

interface ResourceType extends UserType, PostType, SchoolType, WorkplaceType {}

interface FormComponentProps {
  inputData: FormInputDataType;
  screen?: string;
  resource?: UserType | SchoolType | WorkplaceType | PostType;
  resourceId?: number;
  subResourceId?: number;
  updateAction?: TODO;
  createAction?: TODO;
  authorizationAction?: TODO;
  getDetailsAction?: (
    resourceId: number
  ) => (
    dispatch: Dispatch<PostDetailsActionType | UserDetailsActionType>,
    getState: () => StoreType
  ) => Promise<void>;
  successUpdate?: boolean;
  validateInput?: {
    [key: string]: (value: string, match?: string) => string;
  };
  resetPasswordToken?: string;
  mode?: string;
}
export default FormComponentProps;
