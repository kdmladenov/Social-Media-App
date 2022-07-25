interface EditButtonsProps {
  createMode?: boolean = false;
  editMode?: boolean = false;
  isUserAuthorized?: boolean = false;
  handleEditButton: Dispatch<SetStateAction<boolean>>;
  handleCloseButton: () => void;
  handleDeleteButton: () => void;
  disabledDelete?: boolean;
  handleSaveButton: () => void;
  disabledSaveButton?: boolean;
}
export default EditButtonsProps;
