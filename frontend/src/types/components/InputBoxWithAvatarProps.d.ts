interface InputBoxWithAvatarProps {
  resourceId?: number;
  subResourceId?: number;
  replyTo?: number | null;
  currentUserDetails: TODO;
  createAction: TODO;
  validationMin: number;
  validationMax: number;
  placeholder: string;
  errorMessage: string;
  closedButtonText?: string;
  closedAtStart?: boolean;
  onClick?: () => void;
}
export default InputBoxWithAvatarProps;
