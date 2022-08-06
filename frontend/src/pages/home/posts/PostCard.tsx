import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/PostCard.css';

import PostCardFooter from './PostCardFooter';
import PostType from '../../../types/PostType';
import Avatar from '../../../components/Avatar';
import { BASE_URL } from '../../../data/constants';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Slider from '../../../components/Slider';
import DropDown from '../../../components/Dropdown';
import {
  createCollection,
  createSavedPost,
  listCollections,
  listSavedPosts
} from '../../../context/actions/savedPostsActions';
import { useDispatch } from 'react-redux';
import FormComponent from '../../../components/FormComponent';
import useTypedSelector from '../../../hooks/useTypedSelector';
import createCollectionInitialInputState from '../../../data/inputs/createCollectionInitialInputState';
import changePostCollectionInitialInputState from '../../../data/inputs/changePostCollectionInitialInputState';
import { COLLECTION_UPDATE_RESET } from '../../../context/constants/savedPostsConstants';

const PostCard: React.FC<{ post: PostType; dropDown?: JSX.Element; screen?: string }> = ({
  post,
  dropDown,
  screen
}) => {
  const dispatch = useDispatch();

  const [selectedPostImageIndex, setSelectedPostImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const { success: savedPostCreateSuccess } = useTypedSelector((state) => state.savedPostCreate);
  const { collections } = useTypedSelector((state) => state.collectionsList);
  const { savedPosts } = useTypedSelector((state) => state.savedPostsList);

  const { postId, userFirstName, userLastName, userAvatar, message, images } = post;

  const isPostSaved = !!savedPosts?.filter((savedPost) => savedPost.postId === postId).length;

  const imageModalHandler = (imageId: number) => {
    setSelectedPostImageIndex(post?.images.findIndex((image) => image.imageId === imageId));
    setIsModalOpen(true);
  };

  const savePostHandler = (postId: number) => {
    setIsMenuModalOpen(true);

    setModalContent(
      <div className="create_collection flex_col">
        <FormComponent
          inputData={changePostCollectionInitialInputState(
            collections?.length
              ? collections.map((collection) => collection.collection)
              : ['For later']
          )}
          resourceId={postId}
          createAction={createSavedPost}
          mode={'create'}
        />
        <span className="message">Or</span>
        <FormComponent
          inputData={createCollectionInitialInputState}
          createAction={createSavedPost}
          resourceId={postId}
          mode={'create'}
        />
      </div>
    );
  };

  const postCardDropdown = (
    <DropDown
      button={
        <Button classes="icon item_btn flex">
          <i className="fa fa-ellipsis-h"></i>
        </Button>
      }
    >
      <ul className="menu flex_col">
        <li onClick={() => savePostHandler(postId)}>Save Post</li>
      </ul>
    </DropDown>
  );

  const getImagesClass = () =>
    images.length === 1
      ? ''
      : images.length === 2
      ? 'two'
      : images.length === 2
      ? 'two'
      : images.length === 3
      ? 'three'
      : images.length === 4
      ? 'four'
      : 'more';

  useEffect(() => {
    if (screen !== 'saved_posts') {
      dispatch(listCollections());
      dispatch(listSavedPosts());
    }
    savedPostCreateSuccess && setIsMenuModalOpen(false);
  }, [dispatch, savedPostCreateSuccess, screen]);

  return (
    <div className="post_card card">
      <div className="post_header">
        <Avatar imageUrl={userAvatar} firstName={userFirstName} lastName={userLastName} />
        {postId}
        {dropDown ? dropDown : !isPostSaved && postCardDropdown}
      </div>
      <div className="message">
        <Link to={`/posts/${postId}`}>{message}</Link>
      </div>
      <ul className={`images ${getImagesClass()}`}>
        {images.map((image, index) => (
          <li className={`image${index + 1}`} onClick={() => imageModalHandler(image?.imageId)}>
            <img
              crossOrigin="anonymous"
              src={image?.image?.startsWith('http') ? image?.image : `${BASE_URL}/${image?.image}`}
              alt="post"
            />
            {images?.length > 4 && <span>{`+${images.length - 4} more`}</span>}
          </li>
        ))}
      </ul>
      <PostCardFooter postId={postId} />
      {isMenuModalOpen && <Modal setIsOpenModal={setIsMenuModalOpen}>{modalContent}</Modal>}
      {isModalOpen && (
        <Modal classes="post_images" setIsOpenModal={setIsModalOpen}>
          <>
            <aside className="post_images_sidebar flex_col">
              <div className="post_images_header">
                <Avatar
                  imageUrl={userAvatar}
                  firstName={userFirstName}
                  lastName={userLastName}
                  classes="big"
                />
              </div>
              <PostCardFooter
                postId={postId}
                imageId={images[selectedPostImageIndex].imageId}
                type="image"
              />
            </aside>
            <div className="post_images_container">
              <Slider
                dots={false}
                slideIndex={selectedPostImageIndex}
                setSlideIndex={setSelectedPostImageIndex}
              >
                {images?.map((image) => (
                  <Slider.Item item={image} button_controls={true} />
                ))}
              </Slider>
            </div>
          </>
        </Modal>
      )}
    </div>
  );
};

export default PostCard;
