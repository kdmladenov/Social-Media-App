import React from 'react';

import './styles/EditButtons.css';

import Button from './Button';
import Tooltip from './Tooltip';
import EditButtonsProps from '../models/components/EditButtonsProps';

const EditButtons: React.FC<EditButtonsProps> = ({
  createMode = false,
  editMode = false,
  isUserAuthorized = false,
  handleEditButton,
  handleCloseButton,
  handleDeleteButton,
  handleSaveButton,
  disabledSaveButton
}) => {
  return (
    <div className="edit_buttons">
      {!createMode && !editMode && isUserAuthorized && (
        <Button classes="icon" onClick={handleEditButton}>
          <Tooltip direction="top" text="Edit">
            <i className="fa fa-edit" />
          </Tooltip>
        </Button>
      )}
      {(createMode || (editMode && isUserAuthorized)) && (
        <div className="button_group_edit">
          {handleCloseButton && (
            <Button classes="icon" onClick={handleCloseButton}>
              <Tooltip direction="top" text="Cancel">
                <i className="fa fa-times" />
              </Tooltip>
            </Button>
          )}
          {!createMode && (
            <Button classes="icon">
              <Tooltip direction="top" text="Delete">
                <i className="fas fa-trash" onClick={handleDeleteButton} />
              </Tooltip>
            </Button>
          )}
          <Button classes="icon" onClick={handleSaveButton} disabled={disabledSaveButton}>
            <Tooltip direction="top" text="Save">
              <i className="fa fa-save" />
            </Tooltip>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditButtons;
