import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UserType from '../models/UserType';
import { updateUserAvatarReducer } from '../state/actions/userActions';
import Button from './Button';
import Divider from './Divider';
import './styles/PhotoUploadForm.css';

const PhotoUploadForm: React.FC<{ user: UserType; multiple?: boolean }> = ({
  user,
  multiple = false
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [dragActive, setDragActive] = useState(false);

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
      setImage('');
    }
  };

  const addImageUrlHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(updateUserAvatarReducer(user?.userId, 'add_image_url', e, image));
    setImage('');
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      dispatch(updateUserAvatarReducer(user?.userId, 'add_image_url', e, image));
      setImage('');
    }
  };

  return (
    <section className="image_upload_form flex_col">
      <div className="header flex">
        <h4>Change avatar</h4>
      </div>
      <div className="input_group">
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
        <div className="image_url">
          <Button onClick={addImageUrlHandler} disabled={!image}>
            Add Image URL
          </Button>
          <input
            type="text"
            placeholder="Enter image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            onKeyUp={(e) => keyPressHandler(e)}
          />
        </div>
      </div>
    </section>
  );
};

export default PhotoUploadForm;
