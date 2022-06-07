import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/InputBoxWithAvatar.css';

import Avatar from './Avatar';
import Button from './Button';
import InputBoxWithAvatarProps from '../models/components/InputBoxWithAvatarProps';

const InputBoxWithAvatar: React.FC<InputBoxWithAvatarProps> = ({
  resourceId,
  currentUserDetails,
  createAction,
  validationMin,
  validationMax,
  placeholder,
  errorMessage,
  closedButtonText
}) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(!closedButtonText);

  const isValid = content.length >= validationMin && content.length < validationMax;

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setContent(e.target.value);
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter' && isValid) {
      dispatch(createAction(resourceId, content));
      setContent('');
    }
  };

  return (
    <div className={`input_with_avatar ${!showForm ? 'button' : ''}`}>
      {showForm && (
        <Avatar
          classes="image_only"
          imageUrl={currentUserDetails?.avatar}
          fullName={currentUserDetails?.fullName}
        />
      )}
      {showForm && (
        <input
          type="textarea"
          value={content}
          placeholder={placeholder}
          onChange={inputHandler}
          onKeyUp={keyPressHandler}
        />
      )}
      {showForm && (
        <p className={content.length > 0 && !isValid ? 'show_message' : ''}>{errorMessage}</p>
      )}
      <Button classes={`${showForm ? 'icon' : 'text'}`} onClick={() => setShowForm(!showForm)}>
        {showForm ? <i className="fa fa-times" /> : closedButtonText}
      </Button>
    </div>
  );
};

export default InputBoxWithAvatar;
