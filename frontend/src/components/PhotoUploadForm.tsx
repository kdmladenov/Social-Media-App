import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { DEFAULT_UPLOAD_PHOTO_MESSAGE, IMAGE } from '../data/constants';
import PostCreateActionType from '../types/context/actions/PostCreateActionType';
import PostImagesUploadActionType from '../types/context/actions/PostImagesUploadActionType';
import StoryCreateActionType from '../types/context/actions/StoryCreateActionType';
import UserAvatarUpdateActionType from '../types/context/actions/UserAvatarUpdateActionType';
import UserCoverUpdateActionType from '../types/context/actions/UserCoverUpdateActionType';
import StoreType from '../types/context/StoreType';
import { validateSelectedFile } from '../utils/validateSelectedFile';
import Button from './Button';
import Divider from './Divider';

import './styles/PhotoUploadForm.css';

const PhotoUploadForm: React.FC<{
  resourceId: number;
  multiple?: boolean;
  name?: string;
  title?: string;
  updateAction: (
    userId: number,
    mode: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.DragEvent<HTMLDivElement>,
    imageAddress?: string
  ) => (
    dispatch: Dispatch<
      | UserAvatarUpdateActionType
      | UserCoverUpdateActionType
      | StoryCreateActionType
      | PostCreateActionType
      | PostImagesUploadActionType
    >,
    getState: () => StoreType
  ) => Promise<void>;
}> = ({ resourceId, multiple = false, name = '', updateAction, title }) => {
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState(DEFAULT_UPLOAD_PHOTO_MESSAGE);
  const isUrlValid = IMAGE.IMAGE_URL_REGEX.test(imageURL);

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = (event.target as HTMLInputElement).files;
    let areAllFilesValid = true;
    if (selectedFiles?.length !== 0) {
      setMessage(DEFAULT_UPLOAD_PHOTO_MESSAGE);
      for (const singleFile of selectedFiles!) {
        areAllFilesValid = areAllFilesValid && validateSelectedFile(singleFile, setMessage);
      }
      areAllFilesValid && dispatch(updateAction(resourceId, 'file_upload', event));
    }
  };
  const handleDrag = (e: React.DragEvent<HTMLFormElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const selectedFiles = (e as React.DragEvent<HTMLDivElement>).dataTransfer.files;
    let areAllFilesValid = true;

    if (e?.dataTransfer?.files?.[0]) {
      setMessage(DEFAULT_UPLOAD_PHOTO_MESSAGE);
      for (const singleFile of selectedFiles!) {
        areAllFilesValid = areAllFilesValid && validateSelectedFile(singleFile, setMessage);
      }
      areAllFilesValid && dispatch(updateAction(resourceId, 'file_upload', e));
    }
  };

  const addImageUrlHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(updateAction(resourceId, 'add_image_url', e, imageURL));
    setImageURL('');
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      dispatch(updateAction(resourceId, 'add_image_url', e, imageURL));
      setImageURL('');
    }
  };

  return (
    <section className="image_upload_form flex_col">
      {title && (
        <div className="header flex">
          <h4>{title}</h4>
        </div>
      )}
      <div className="input_group flex_col">
        <form
          className="file_upload flex"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="upload" className="flex_col">
            <i className="fa fa-image"></i>
            <p>Add Photos</p>
            <span>or</span>
            <span>drag and drop</span>
            <span className={`${message !== DEFAULT_UPLOAD_PHOTO_MESSAGE ? 'error_message' : ''}`}>
              {message}
            </span>
          </label>
          <input
            id="upload"
            type="file"
            multiple={multiple}
            name={name}
            onChange={uploadImage}
            accept={'image/*'}
          />
          {dragActive && (
            <div
              className="drag_file"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
        <Divider>
          <h6>or</h6>
        </Divider>
        <form className="image_url">
          <input
            type="url"
            placeholder="Add image url"
            pattern={IMAGE.IMAGE_URL_PATTERN}
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            onKeyUp={(e) => keyPressHandler(e)}
          />
          {isUrlValid ? (
            <Button type="submit" classes="add_button flex blue" onClick={addImageUrlHandler}>
              Add
            </Button>
          ) : (
            <></>
          )}
        </form>
      </div>
    </section>
  );
};

export default PhotoUploadForm;
