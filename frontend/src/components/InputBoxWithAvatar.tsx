import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/InputBoxWithAvatar.css';

import Avatar from './Avatar';
import Button from './Button';
import InputBoxWithAvatarProps from '../models/components/InputBoxWithAvatarProps';

const InputBoxWithAvatar: React.FC<InputBoxWithAvatarProps> = ({
  resourceId,
  replyTo,
  currentUserDetails,
  createAction,
  validationMin,
  validationMax,
  placeholder,
  errorMessage,
  closedButtonText,
  closedAtStart
}) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(!closedAtStart);

  const isValid = content.length >= validationMin && content.length < validationMax;

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setContent(e.target.value);
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter' && isValid) {
      dispatch(createAction(resourceId, content, replyTo && replyTo));
      setContent('');
    }
  };

  return (
    <div className={`input_with_avatar ${!showForm ? 'button' : ''}`}>
      {showForm ? (
        <>
          <Avatar
            classes="image_only"
            imageUrl={currentUserDetails?.avatar}
            firstName={currentUserDetails?.firstName}
            lastName={currentUserDetails?.lastName}
          />

          <input
            type="textarea"
            value={content}
            placeholder={placeholder}
            onChange={inputHandler}
            onKeyUp={keyPressHandler}
          />

          <p className={content.length > 0 && !isValid ? 'show_message' : ''}>{errorMessage}</p>

          <Button classes="icon" onClick={() => setShowForm(!showForm)}>
            <i className="fa fa-times" />
          </Button>
        </>
      ) : (
        <Button classes="text" onClick={() => setShowForm(!showForm)}>
          {closedButtonText}
        </Button>
      )}
    </div>
  );
};

export default InputBoxWithAvatar;
