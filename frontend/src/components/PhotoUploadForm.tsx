import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IMAGE } from '../constants/constants';
import UserType from '../models/UserType';
import { updateUserAvatarReducer } from '../state/actions/userActions';
import Button from './Button';
import Divider from './Divider';
import './styles/PhotoUploadForm.css';
import Tooltip from './Tooltip';

const PhotoUploadForm: React.FC<{ user: UserType; multiple?: boolean }> = ({
  user,
  multiple = false
}) => {
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const isUrlValid = IMAGE.IMAGE_URL_REGEX.test(imageURL);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateUserAvatarReducer(user?.userId, 'file_upload', e));
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
    if (e?.dataTransfer?.files?.[0]) {
      dispatch(updateUserAvatarReducer(user?.userId, 'file_upload', e));
      setImageURL('');
    }
  };

  const addImageUrlHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(updateUserAvatarReducer(user?.userId, 'add_image_url', e, imageURL));
    setImageURL('');
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      dispatch(updateUserAvatarReducer(user?.userId, 'add_image_url', e, imageURL));
      setImageURL('');
    }
  };

  return (
    <section className="image_upload_form flex_col">
      <div className="header flex">
        <h4>Change avatar</h4>
      </div>
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
          </label>
          <input
            id="upload"
            type="file"
            multiple={multiple}
            onChange={uploadImage}
            accept={'image/jpeg, image/jpg, image/png'}
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
